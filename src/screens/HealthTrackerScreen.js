import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Alert, RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SPACING, FONTS, RADIUS, SHADOWS } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import CuteCard from '../components/CuteCard';
import CuteButton from '../components/CuteButton';
import CuteInput from '../components/CuteInput';
import EmptyState from '../components/EmptyState';
import * as DB from '../database/database';

const SYMPTOM_OPTIONS = [
  { id: 'vomiting', label: 'Vomiting', emoji: '🤮' },
  { id: 'diarrhea', label: 'Diarrhea', emoji: '💩' },
  { id: 'lethargy', label: 'Lethargy', emoji: '😴' },
  { id: 'loss_appetite', label: 'Loss of Appetite', emoji: '🍽️' },
  { id: 'excessive_thirst', label: 'Excessive Thirst', emoji: '💧' },
  { id: 'limping', label: 'Limping', emoji: '🦿' },
  { id: 'scratching', label: 'Excessive Scratching', emoji: '🐾' },
  { id: 'coughing', label: 'Coughing', emoji: '😷' },
  { id: 'sneezing', label: 'Sneezing', emoji: '🤧' },
  { id: 'eye_discharge', label: 'Eye Discharge', emoji: '👁️' },
  { id: 'ear_issue', label: 'Ear Issue', emoji: '👂' },
  { id: 'skin_issue', label: 'Skin Issue', emoji: '🩹' },
  { id: 'seizure', label: 'Seizure', emoji: '⚡' },
  { id: 'behavior_change', label: 'Behavior Change', emoji: '🔄' },
];

const HealthTrackerScreen = ({ navigation }) => {
  const { pets, activePet, setActivePet } = useApp();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('weight');
  const [weightLogs, setWeightLogs] = useState([]);
  const [healthLogs, setHealthLogs] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Weight form
  const [newWeight, setNewWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('lbs');
  const [weightNote, setWeightNote] = useState('');

  // Symptom form
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomNotes, setSymptomNotes] = useState('');

  // Vaccination form
  const [vacName, setVacName] = useState('');
  const [vacNextDue, setVacNextDue] = useState('');

  useFocusEffect(
    useCallback(() => {
      if (activePet) loadData();
    }, [activePet])
  );

  const loadData = async () => {
    try {
      if (!activePet) return;
      const w = await DB.getWeightLogs(activePet.id);
      setWeightLogs(w);
      const h = await DB.getHealthLogs(activePet.id);
      setHealthLogs(h);
      const v = await DB.getVaccinations(activePet.id);
      setVaccinations(v);
    } catch (e) { console.error(e); }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleAddWeight = async () => {
    if (!newWeight.trim()) {
      Alert.alert(t('oops'), t('health_no_weight'));
      return;
    }
    try {
      await DB.addWeightLog({
        pet_id: activePet.id,
        weight: parseFloat(newWeight),
        unit: weightUnit,
        date: new Date().toISOString().split('T')[0],
        notes: weightNote.trim(),
      });
      setNewWeight('');
      setWeightNote('');
      await loadData();
      Alert.alert('Recorded! ⚖️', t('health_weight_saved'));
    } catch (e) { console.error(e); }
  };

  const handleLogSymptoms = async () => {
    if (selectedSymptoms.length === 0) {
      Alert.alert(t('oops'), t('health_no_symptoms'));
      return;
    }
    try {
      for (const sym of selectedSymptoms) {
        await DB.addHealthLog({
          pet_id: activePet.id,
          type: 'symptom',
          value: sym,
          notes: symptomNotes.trim(),
          date: new Date().toISOString(),
        });
      }
      setSelectedSymptoms([]);
      setSymptomNotes('');
      await loadData();
      Alert.alert('Logged! 📋', t('health_symptoms_saved'));
    } catch (e) { console.error(e); }
  };

  const handleAddVaccination = async () => {
    if (!vacName.trim()) {
      Alert.alert(t('oops'), t('health_no_vaccine_name'));
      return;
    }
    try {
      await DB.addVaccination({
        pet_id: activePet.id,
        name: vacName.trim(),
        date_given: new Date().toISOString().split('T')[0],
        next_due_date: vacNextDue,
      });
      setVacName('');
      setVacNextDue('');
      await loadData();
      Alert.alert('Recorded! 💉', t('health_vaccine_saved'));
    } catch (e) { console.error(e); }
  };

  const toggleSymptom = (id) => {
    setSelectedSymptoms(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  if (pets.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          emoji="🐾"
          title={t('health_add_pet_first')}
          message={t('health_add_pet_msg')}
          buttonTitle="+ Add Pet"
          onPress={() => navigation.navigate('PetsTab', { screen: 'AddPet' })}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
    >
      <Text style={styles.title}>{t('health_header')}</Text>

      {/* Pet Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.petRow}>
        {pets.map(pet => (
          <TouchableOpacity
            key={pet.id}
            style={[styles.petChip, activePet?.id === pet.id && styles.petChipActive]}
            onPress={() => setActivePet(pet)}
          >
            <Text>{pet.species === 'dog' ? '🐶' : pet.species === 'cat' ? '🐱' : '🐾'} {pet.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {[
          { id: 'weight', label: t('health_weight_tab') },
          { id: 'symptoms', label: t('health_symptoms_tab') },
          { id: 'vaccines', label: t('health_vaccines_tab') },
        ].map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Weight Tab */}
      {activeTab === 'weight' && (
        <>
          <CuteCard variant="pink" style={styles.formCard}>
            <Text style={styles.formTitle}>{t('health_log_weight')}</Text>
            <View style={styles.row}>
              <View style={{ flex: 2 }}>
                <CuteInput
                  value={newWeight}
                  onChangeText={setNewWeight}
                  placeholder={t('health_weight_placeholder')}
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.unitRow}>
                {['lbs', 'kg'].map(u => (
                  <TouchableOpacity
                    key={u}
                    style={[styles.unitBtn, weightUnit === u && styles.unitBtnActive]}
                    onPress={() => setWeightUnit(u)}
                  >
                    <Text style={[styles.unitText, weightUnit === u && styles.unitTextActive]}>{u}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <CuteInput
              value={weightNote}
              onChangeText={setWeightNote}
              placeholder={t('health_notes_placeholder')}
            />
            <CuteButton title={t('health_log_weight_btn')} onPress={handleAddWeight} fullWidth />
          </CuteCard>

          {/* Weight Chart (simple text-based) */}
          {weightLogs.length > 0 && (
            <CuteCard>
              <Text style={styles.chartTitle}>{t('health_weight_history')}</Text>
              {weightLogs.slice(0, 10).map((log, i) => {
                const maxW = Math.max(...weightLogs.map(l => l.weight));
                const pct = (log.weight / maxW) * 100;
                return (
                  <View key={log.id} style={styles.chartRow}>
                    <Text style={styles.chartDate}>
                      {new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </Text>
                    <View style={styles.chartBarBg}>
                      <View style={[styles.chartBar, { width: `${pct}%` }]} />
                    </View>
                    <Text style={styles.chartValue}>{log.weight} {log.unit}</Text>
                  </View>
                );
              })}
            </CuteCard>
          )}
        </>
      )}

      {/* Symptoms Tab */}
      {activeTab === 'symptoms' && (
        <>
          <CuteCard variant="mint" style={styles.formCard}>
            <Text style={styles.formTitle}>{t('health_log_symptoms')}</Text>
            <Text style={styles.formHint}>{t('health_symptoms_hint')}</Text>
            <View style={styles.symptomGrid}>
              {SYMPTOM_OPTIONS.map(sym => (
                <TouchableOpacity
                  key={sym.id}
                  style={[
                    styles.symptomBtn,
                    selectedSymptoms.includes(sym.id) && styles.symptomBtnActive,
                  ]}
                  onPress={() => toggleSymptom(sym.id)}
                >
                  <Text style={styles.symptomEmoji}>{sym.emoji}</Text>
                  <Text style={[
                    styles.symptomLabel,
                    selectedSymptoms.includes(sym.id) && styles.symptomLabelActive,
                  ]}>{sym.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <CuteInput
              value={symptomNotes}
              onChangeText={setSymptomNotes}
              placeholder={t('health_symptoms_notes')}
              multiline
            />
            <CuteButton title={t('health_log_symptoms_btn')} onPress={handleLogSymptoms} fullWidth variant="success" />
          </CuteCard>

          {/* Symptom History */}
          {healthLogs.filter(l => l.type === 'symptom').length > 0 && (
            <CuteCard>
              <Text style={styles.chartTitle}>{t('health_recent_symptoms')}</Text>
              {healthLogs.filter(l => l.type === 'symptom').slice(0, 15).map(log => {
                const sym = SYMPTOM_OPTIONS.find(s => s.id === log.value);
                return (
                  <View key={log.id} style={styles.historyRow}>
                    <Text style={styles.historyEmoji}>{sym?.emoji || '❓'}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.historyLabel}>{sym?.label || log.value}</Text>
                      <Text style={styles.historyDate}>
                        {new Date(log.date).toLocaleDateString()}
                        {log.notes ? ` — ${log.notes}` : ''}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </CuteCard>
          )}
        </>
      )}

      {/* Vaccines Tab */}
      {activeTab === 'vaccines' && (
        <>
          <CuteCard variant="lavender" style={styles.formCard}>
            <Text style={styles.formTitle}>{t('health_add_vaccine')}</Text>
            <CuteInput
              label={t('health_vaccine_name')}
              value={vacName}
              onChangeText={setVacName}
              placeholder={t('health_vaccine_placeholder')}
              required
            />
            <CuteInput
              label={t('health_vaccine_due')}
              value={vacNextDue}
              onChangeText={setVacNextDue}
              placeholder={t('health_vaccine_due_placeholder')}
            />
            <CuteButton title={t('health_add_vaccine_btn')} onPress={handleAddVaccination} fullWidth variant="secondary" />
          </CuteCard>

          {vaccinations.length > 0 && (
            <CuteCard>
              <Text style={styles.chartTitle}>{t('health_vaccine_records')}</Text>
              {vaccinations.map(vac => (
                <View key={vac.id} style={styles.vacRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.vacName}>{vac.name}</Text>
                    <Text style={styles.vacDate}>{t('health_vaccine_given', { date: new Date(vac.date_given).toLocaleDateString() })}</Text>
                  </View>
                  {vac.next_due_date ? (
                    <View style={[
                      styles.dueBadge,
                      new Date(vac.next_due_date) < new Date() ? styles.dueOverdue : styles.dueUpcoming,
                    ]}>
                      <Text style={styles.dueText}>
                        {new Date(vac.next_due_date) < new Date() ? t('health_vaccine_overdue') : t('health_vaccine_due_label', { date: new Date(vac.next_due_date).toLocaleDateString() })}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ))}
            </CuteCard>
          )}
        </>
      )}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg },
  title: { fontSize: FONTS.sizes.title, fontWeight: '800', color: COLORS.text, marginTop: SPACING.sm, marginBottom: SPACING.sm },
  petRow: { marginBottom: SPACING.md },
  petChip: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: SPACING.sm,
  },
  petChipActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primarySoft },
  tabRow: { flexDirection: 'row', marginBottom: SPACING.lg, gap: SPACING.sm },
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  tabActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primarySoft },
  tabText: { fontSize: FONTS.sizes.sm, fontWeight: '600', color: COLORS.textLight },
  tabTextActive: { color: COLORS.primary },
  formCard: { marginBottom: SPACING.lg },
  formTitle: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.sm },
  formHint: { fontSize: FONTS.sizes.md, color: COLORS.textLight, marginBottom: SPACING.md },
  row: { flexDirection: 'row', gap: SPACING.md, alignItems: 'center' },
  unitRow: { flex: 1, flexDirection: 'row', gap: SPACING.xs, marginBottom: SPACING.lg },
  unitBtn: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  unitBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  unitText: { fontSize: FONTS.sizes.sm, fontWeight: '700', color: COLORS.textLight },
  unitTextActive: { color: COLORS.white },
  symptomGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.lg },
  symptomBtn: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    minWidth: 100,
  },
  symptomBtnActive: { borderColor: COLORS.coral, backgroundColor: '#FFEBEE' },
  symptomEmoji: { fontSize: 22 },
  symptomLabel: { fontSize: FONTS.sizes.xs, color: COLORS.textLight, fontWeight: '600', marginTop: 2 },
  symptomLabelActive: { color: COLORS.coral },
  chartTitle: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md },
  chartRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  chartDate: { width: 60, fontSize: FONTS.sizes.xs, color: COLORS.textLight },
  chartBarBg: { flex: 1, height: 16, backgroundColor: COLORS.border, borderRadius: 8, overflow: 'hidden', marginHorizontal: SPACING.sm },
  chartBar: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 8 },
  chartValue: { width: 70, fontSize: FONTS.sizes.xs, fontWeight: '700', color: COLORS.text, textAlign: 'right' },
  historyRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.sm, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  historyEmoji: { fontSize: 24, marginRight: SPACING.md },
  historyLabel: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.text },
  historyDate: { fontSize: FONTS.sizes.xs, color: COLORS.textLight, marginTop: 2 },
  vacRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  vacName: { fontSize: FONTS.sizes.md, fontWeight: '700', color: COLORS.text },
  vacDate: { fontSize: FONTS.sizes.xs, color: COLORS.textLight, marginTop: 2 },
  dueBadge: { paddingHorizontal: SPACING.sm, paddingVertical: SPACING.xs, borderRadius: RADIUS.sm },
  dueOverdue: { backgroundColor: '#FFEBEE' },
  dueUpcoming: { backgroundColor: COLORS.mintLight },
  dueText: { fontSize: FONTS.sizes.xs, fontWeight: '600' },
});

export default HealthTrackerScreen;
