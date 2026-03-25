import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SPACING, FONTS, RADIUS, SHADOWS, PET_TYPES } from '../constants/theme';
import PetAvatar from '../components/PetAvatar';
import CuteCard from '../components/CuteCard';
import CuteButton from '../components/CuteButton';
import * as DB from '../database/database';
import { t } from '../i18n/i18n';
import { useApp } from '../context/AppContext';
import { logError } from '../utils/logger';

const PetDetailScreen = ({ navigation, route }) => {
  const { petId } = route.params;
  const { language } = useApp();
  const [pet, setPet] = useState(null);
  const [medications, setMedications] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [weightLogs, setWeightLogs] = useState([]);
  const [streak, setStreak] = useState(0);

  useFocusEffect(useCallback(() => { loadPetData(); }, [petId]));

  const loadPetData = async () => {
    try {
      const p = await DB.getPetById(petId); setPet(p);
      const meds = await DB.getMedicationsByPet(petId); setMedications(meds);
      const vacs = await DB.getVaccinations(petId); setVaccinations(vacs);
      const weights = await DB.getWeightLogs(petId); setWeightLogs(weights.slice(0, 5));
      const s = await DB.getStreak(petId); setStreak(s);
    } catch (e) { logError('Error loading pet details', e); }
  };

  if (!pet) return <View style={styles.container}><Text style={{ textAlign: 'center', marginTop: 50, color: COLORS.textLight }}>{t('loading')}</Text></View>;

  const petType = PET_TYPES.find(tp => tp.id === pet.species) || PET_TYPES[PET_TYPES.length - 1];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <PetAvatar pet={pet} size={100} />
        <Text style={styles.petName}>{pet.name} {petType.emoji}</Text>
        <Text style={styles.petBreed}>{pet.breed || t(petType.id)}</Text>
        <View style={styles.infoRow}>
          {(pet.age_years > 0 || pet.age_months > 0) && <View style={styles.infoBadge}><Text style={styles.infoBadgeText}>🎂 {pet.age_years > 0 ? `${pet.age_years}y` : ''}{pet.age_months > 0 ? ` ${pet.age_months}m` : ''}</Text></View>}
          {pet.weight > 0 && <View style={styles.infoBadge}><Text style={styles.infoBadgeText}>⚖️ {pet.weight} {pet.weight_unit}</Text></View>}
          {pet.gender && <View style={styles.infoBadge}><Text style={styles.infoBadgeText}>{pet.gender === 'Male' ? '♂️' : pet.gender === 'Female' ? '♀️' : '❓'} {t(pet.gender.toLowerCase())}</Text></View>}
        </View>
      </View>

      <View style={styles.statsRow}>
        <CuteCard style={styles.statCard} variant="pink"><Text style={styles.statEmoji}>💊</Text><Text style={styles.statNum}>{medications.length}</Text><Text style={styles.statLabel}>{t('medications')}</Text></CuteCard>
        <CuteCard style={styles.statCard} variant="mint"><Text style={styles.statEmoji}>🔥</Text><Text style={styles.statNum}>{streak}</Text><Text style={styles.statLabel}>{t('day_streak')}</Text></CuteCard>
        <CuteCard style={styles.statCard} variant="lavender"><Text style={styles.statEmoji}>💉</Text><Text style={styles.statNum}>{vaccinations.length}</Text><Text style={styles.statLabel}>{t('vaccines')}</Text></CuteCard>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('active_meds')} 💊</Text>
          <CuteButton title={`+ ${t('add')}`} size="small" variant="ghost" onPress={() => navigation.navigate('MedsTab', { screen: 'AddMedication', params: { petId: pet.id } })} />
        </View>
        {medications.length === 0 ? <Text style={styles.emptyText}>{t('no_active_meds')}</Text> : medications.map(med => (
          <CuteCard key={med.id} style={styles.medCard}>
            <View style={styles.medRow}>
              <View style={styles.medInfo}><Text style={styles.medName}>{med.name}</Text><Text style={styles.medDosage}>{med.dosage} {med.dosage_unit} • {med.frequency.replace(/_/g, ' ')}</Text>{med.category && <Text style={styles.medCategory}>{med.category}</Text>}</View>
              {med.total_supply > 0 && <View style={[styles.supplyBadge, med.remaining_supply <= med.refill_reminder_at && styles.supplyLow]}><Text style={styles.supplyText}>{med.remaining_supply} {t('left')}</Text></View>}
            </View>
          </CuteCard>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{t('vaccinations')} 💉</Text></View>
        {vaccinations.length === 0 ? <Text style={styles.emptyText}>{t('no_vaccinations')}</Text> : vaccinations.map(vac => (
          <CuteCard key={vac.id} variant="peach" style={{ paddingVertical: SPACING.md }}>
            <Text style={styles.vacName}>{vac.name}</Text>
            <Text style={styles.vacDate}>{t('given')}: {new Date(vac.date_given).toLocaleDateString()}{vac.next_due_date ? ` • ${t('next')}: ${new Date(vac.next_due_date).toLocaleDateString()}` : ''}</Text>
          </CuteCard>
        ))}
      </View>

      {weightLogs.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('weight_history')} ⚖️</Text>
          {weightLogs.map((log, i) => (
            <View key={log.id} style={styles.weightRow}>
              <Text style={styles.weightDate}>{new Date(log.date).toLocaleDateString()}</Text>
              <Text style={styles.weightValue}>{log.weight} {log.unit}</Text>
              {i < weightLogs.length - 1 && <Text style={[styles.weightDiff, log.weight > weightLogs[i + 1].weight ? { color: COLORS.danger } : { color: COLORS.success }]}>{log.weight > weightLogs[i + 1].weight ? '↑' : '↓'}{Math.abs(log.weight - weightLogs[i + 1].weight).toFixed(1)}</Text>}
            </View>
          ))}
        </View>
      )}

      {pet.notes && <CuteCard variant="pink" style={styles.notesCard}><Text style={styles.notesTitle}>📝 {t('notes')}</Text><Text style={styles.notesText}>{pet.notes}</Text></CuteCard>}
      {pet.microchip_id && <CuteCard><Text style={styles.chipText}>🔖 {t('microchip_id')}: {pet.microchip_id}</Text></CuteCard>}

      <View style={styles.actionRow}>
        <CuteButton title={`✏️ ${t('edit_pet')}`} variant="outline" size="medium" onPress={() => navigation.navigate('AddPet', { pet })} style={{ flex: 1 }} />
        <CuteButton title={`🗑️ ${t('delete_this')}`} variant="danger" size="medium" onPress={() => {
          Alert.alert(`${t('delete')} ${pet.name}?`, t('cannot_be_undone'), [
            { text: t('cancel'), style: 'cancel' },
            { text: t('delete'), style: 'destructive', onPress: async () => { await DB.deletePet(pet.id); navigation.goBack(); } },
          ]);
        }} style={{ flex: 1, marginLeft: SPACING.sm }} />
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg },
  header: { alignItems: 'center', marginBottom: SPACING.lg, marginTop: SPACING.sm },
  petName: { fontSize: FONTS.sizes.title, fontWeight: '800', color: COLORS.text, marginTop: SPACING.md },
  petBreed: { fontSize: FONTS.sizes.lg, color: COLORS.textLight, marginTop: 2 },
  infoRow: { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.md },
  infoBadge: { backgroundColor: COLORS.primarySoft, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: RADIUS.full },
  infoBadgeText: { fontSize: FONTS.sizes.sm, fontWeight: '600', color: COLORS.text },
  statsRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.lg },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: SPACING.md },
  statEmoji: { fontSize: 22, marginBottom: 2 },
  statNum: { fontSize: FONTS.sizes.xxl, fontWeight: '800', color: COLORS.text },
  statLabel: { fontSize: FONTS.sizes.xs, color: COLORS.textLight, fontWeight: '600' },
  section: { marginBottom: SPACING.lg },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  sectionTitle: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.text },
  emptyText: { fontSize: FONTS.sizes.md, color: COLORS.textMuted, textAlign: 'center', paddingVertical: SPACING.lg },
  medCard: { paddingVertical: SPACING.md },
  medRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  medInfo: { flex: 1 },
  medName: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text },
  medDosage: { fontSize: FONTS.sizes.sm, color: COLORS.textLight, marginTop: 2 },
  medCategory: { fontSize: FONTS.sizes.xs, color: COLORS.secondary, fontWeight: '600', marginTop: 2 },
  supplyBadge: { backgroundColor: COLORS.mintLight, paddingHorizontal: SPACING.sm, paddingVertical: SPACING.xs, borderRadius: RADIUS.sm },
  supplyLow: { backgroundColor: '#FFEBEE' },
  supplyText: { fontSize: FONTS.sizes.xs, fontWeight: '600', color: COLORS.text },
  vacName: { fontSize: FONTS.sizes.md, fontWeight: '700', color: COLORS.text },
  vacDate: { fontSize: FONTS.sizes.sm, color: COLORS.textLight, marginTop: 2 },
  weightRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACING.sm, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  weightDate: { fontSize: FONTS.sizes.md, color: COLORS.textLight },
  weightValue: { fontSize: FONTS.sizes.md, fontWeight: '700', color: COLORS.text },
  weightDiff: { fontSize: FONTS.sizes.sm, fontWeight: '600' },
  notesCard: { marginBottom: SPACING.md },
  notesTitle: { fontSize: FONTS.sizes.md, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.xs },
  notesText: { fontSize: FONTS.sizes.md, color: COLORS.textLight, lineHeight: 22 },
  chipText: { fontSize: FONTS.sizes.md, color: COLORS.text, fontWeight: '600' },
  actionRow: { flexDirection: 'row', marginTop: SPACING.lg, gap: SPACING.sm },
});

export default PetDetailScreen;
