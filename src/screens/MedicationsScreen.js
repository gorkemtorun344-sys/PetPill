import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  RefreshControl, Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SPACING, FONTS, RADIUS, SHADOWS } from '../constants/theme';
import { MEDICATION_INTERACTIONS } from '../constants/theme';
import { useApp } from '../context/AppContext';
import CuteCard from '../components/CuteCard';
import CuteButton from '../components/CuteButton';
import EmptyState from '../components/EmptyState';
import * as DB from '../database/database';

const MedicationsScreen = ({ navigation }) => {
  const { pets } = useApp();
  const [medications, setMedications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [interactions, setInteractions] = useState([]);
  const [filter, setFilter] = useState('all'); // all, refill, inactive

  useFocusEffect(
    useCallback(() => {
      loadMedications();
    }, [])
  );

  const loadMedications = async () => {
    try {
      const meds = await DB.getAllActiveMedications();
      setMedications(meds);
      checkInteractions(meds);
    } catch (e) {
      console.error(e);
    }
  };

  const checkInteractions = (meds) => {
    const found = [];
    const medNames = meds.map(m => m.name);

    for (const interaction of MEDICATION_INTERACTIONS) {
      const match = interaction.drugs.every(d => medNames.includes(d));
      if (match) {
        found.push(interaction);
      }
    }
    setInteractions(found);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMedications();
    setRefreshing(false);
  };

  const handleDeactivate = (med) => {
    Alert.alert(
      `Stop ${med.name}?`,
      `This will deactivate ${med.name} for ${med.pet_name}. No more reminders will be sent.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Stop Medication',
          style: 'destructive',
          onPress: async () => {
            await DB.deactivateMedication(med.id);
            await loadMedications();
          },
        },
      ]
    );
  };

  const getFrequencyLabel = (freq) => {
    const labels = {
      once_daily: 'Once daily',
      twice_daily: 'Twice daily',
      three_daily: '3x daily',
      every_other_day: 'Every other day',
      weekly: 'Weekly',
      biweekly: 'Every 2 weeks',
      monthly: 'Monthly',
      custom: 'Custom',
    };
    return labels[freq] || freq;
  };

  const getRefillStatus = (med) => {
    if (med.total_supply === 0) return null;
    const pct = (med.remaining_supply / med.total_supply) * 100;
    if (pct <= 10) return { color: COLORS.danger, label: 'Refill now!', emoji: '🚨' };
    if (med.remaining_supply <= med.refill_reminder_at) return { color: COLORS.warning, label: 'Running low', emoji: '⚠️' };
    return { color: COLORS.success, label: `${med.remaining_supply} left`, emoji: '✅' };
  };

  const filteredMeds = medications.filter(med => {
    if (filter === 'refill') return med.total_supply > 0 && med.remaining_supply <= med.refill_reminder_at;
    return true;
  });

  if (pets.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          emoji="🐾"
          title="Add a Pet First"
          message="You need to add a pet before you can manage medications."
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
      <View style={styles.header}>
        <Text style={styles.title}>Medications 💊</Text>
        <CuteButton
          title="+ Add"
          onPress={() => navigation.navigate('AddMedication')}
          size="small"
          variant="primary"
        />
      </View>

      {/* Drug Interaction Warnings */}
      {interactions.length > 0 && (
        <CuteCard variant="warning" style={styles.warningCard}>
          <Text style={styles.warningTitle}>⚠️ Drug Interaction Warning</Text>
          {interactions.map((inter, i) => (
            <View key={i} style={styles.warningItem}>
              <Text style={styles.warningDrugs}>{inter.drugs.join(' + ')}</Text>
              <Text style={styles.warningText}>{inter.warning}</Text>
              <View style={[
                styles.severityBadge,
                inter.severity === 'high' ? styles.severityHigh : styles.severityMedium,
              ]}>
                <Text style={styles.severityText}>
                  {inter.severity === 'high' ? '🔴 High Risk' : '🟡 Moderate'}
                </Text>
              </View>
            </View>
          ))}
          <Text style={styles.warningDisclaimer}>
            Please consult your veterinarian about these interactions.
          </Text>
        </CuteCard>
      )}

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {[
          { id: 'all', label: 'All', count: medications.length },
          { id: 'refill', label: 'Need Refill', count: medications.filter(m => m.total_supply > 0 && m.remaining_supply <= m.refill_reminder_at).length },
        ].map(f => (
          <TouchableOpacity
            key={f.id}
            style={[styles.filterTab, filter === f.id && styles.filterTabActive]}
            onPress={() => setFilter(f.id)}
          >
            <Text style={[styles.filterText, filter === f.id && styles.filterTextActive]}>
              {f.label} ({f.count})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Medication List */}
      {filteredMeds.length === 0 ? (
        <EmptyState
          emoji="💊"
          title={filter === 'refill' ? 'All Stocked Up!' : 'No Medications'}
          message={filter === 'refill' ? 'None of your medications need refilling right now.' : 'Add a medication to start tracking.'}
          buttonTitle={filter === 'all' ? '+ Add Medication' : undefined}
          onPress={filter === 'all' ? () => navigation.navigate('AddMedication') : undefined}
        />
      ) : (
        filteredMeds.map(med => {
          const refill = getRefillStatus(med);
          let times = [];
          try { times = JSON.parse(med.times_of_day || '[]'); } catch {}

          return (
            <CuteCard key={med.id} style={styles.medCard}>
              <View style={styles.medHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.medName}>{med.name}</Text>
                  <Text style={styles.medPet}>
                    {med.pet_species === 'dog' ? '🐶' : med.pet_species === 'cat' ? '🐱' : '🐾'} {med.pet_name}
                  </Text>
                </View>
                {refill && (
                  <View style={[styles.refillBadge, { backgroundColor: refill.color + '20', borderColor: refill.color }]}>
                    <Text style={[styles.refillText, { color: refill.color }]}>{refill.emoji} {refill.label}</Text>
                  </View>
                )}
              </View>

              <View style={styles.medDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Dosage</Text>
                  <Text style={styles.detailValue}>{med.dosage} {med.dosage_unit}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Frequency</Text>
                  <Text style={styles.detailValue}>{getFrequencyLabel(med.frequency)}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Times</Text>
                  <Text style={styles.detailValue}>{times.join(', ') || '-'}</Text>
                </View>
              </View>

              {med.with_food ? (
                <View style={styles.foodBadge}>
                  <Text style={styles.foodText}>🍽️ Give with food</Text>
                </View>
              ) : null}

              {med.category ? (
                <View style={styles.catBadge}>
                  <Text style={styles.catText}>{med.category}</Text>
                </View>
              ) : null}

              <View style={styles.medActions}>
                {refill && refill.color !== COLORS.success && (
                  <CuteButton
                    title="🛒 Buy Refill"
                    size="small"
                    variant="primary"
                    onPress={() => navigation.navigate('PriceTab', { screen: 'PriceComparer', params: { searchQuery: med.name } })}
                    style={{ flex: 1 }}
                  />
                )}
                <CuteButton
                  title="⏹️ Stop"
                  size="small"
                  variant="ghost"
                  onPress={() => handleDeactivate(med)}
                  style={{ flex: 1 }}
                />
              </View>
            </CuteCard>
          );
        })
      )}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    marginTop: SPACING.sm,
  },
  title: { fontSize: FONTS.sizes.title, fontWeight: '800', color: COLORS.text },
  warningCard: { marginBottom: SPACING.lg },
  warningTitle: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.sm },
  warningItem: { marginBottom: SPACING.sm, paddingBottom: SPACING.sm, borderBottomWidth: 1, borderBottomColor: COLORS.yellow },
  warningDrugs: { fontSize: FONTS.sizes.md, fontWeight: '700', color: COLORS.text },
  warningText: { fontSize: FONTS.sizes.sm, color: COLORS.textLight, marginTop: 2, lineHeight: 18 },
  severityBadge: { alignSelf: 'flex-start', paddingHorizontal: SPACING.sm, paddingVertical: 2, borderRadius: RADIUS.sm, marginTop: SPACING.xs },
  severityHigh: { backgroundColor: '#FFEBEE' },
  severityMedium: { backgroundColor: '#FFF8E1' },
  severityText: { fontSize: FONTS.sizes.xs, fontWeight: '600' },
  warningDisclaimer: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, fontStyle: 'italic', marginTop: SPACING.xs },
  filterRow: { flexDirection: 'row', marginBottom: SPACING.lg, gap: SPACING.sm },
  filterTab: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterTabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { fontSize: FONTS.sizes.sm, fontWeight: '600', color: COLORS.textLight },
  filterTextActive: { color: COLORS.white },
  medCard: { marginBottom: SPACING.sm },
  medHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACING.sm },
  medName: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.text },
  medPet: { fontSize: FONTS.sizes.md, color: COLORS.textLight, marginTop: 2 },
  refillBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
  },
  refillText: { fontSize: FONTS.sizes.xs, fontWeight: '700' },
  medDetails: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.sm },
  detailItem: { flex: 1 },
  detailLabel: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, fontWeight: '600' },
  detailValue: { fontSize: FONTS.sizes.sm, color: COLORS.text, fontWeight: '600', marginTop: 2 },
  foodBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.peachLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.xs,
  },
  foodText: { fontSize: FONTS.sizes.xs, color: COLORS.text, fontWeight: '600' },
  catBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.secondaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  catText: { fontSize: FONTS.sizes.xs, color: COLORS.secondary, fontWeight: '600' },
  medActions: { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.md },
});

export default MedicationsScreen;
