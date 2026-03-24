import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, RADIUS, SHADOWS, SPACING, FONTS } from '../constants/theme';

const MedicationCard = ({ log, onTake, onSkip, onSnooze }) => {
  const getStatusStyle = () => {
    switch (log.status) {
      case 'taken':
        return { bg: '#E8F5E9', border: COLORS.success, icon: '✅', label: 'Given' };
      case 'missed':
        return { bg: '#FFEBEE', border: COLORS.danger, icon: '❌', label: 'Missed' };
      case 'skipped':
        return { bg: '#F5F5F5', border: COLORS.textMuted, icon: '⏭️', label: 'Skipped' };
      default:
        return { bg: COLORS.white, border: COLORS.primaryLight, icon: '💊', label: 'Pending' };
    }
  };

  const status = getStatusStyle();
  const time = log.scheduled_time ? new Date(log.scheduled_time) : null;
  const timeStr = time
    ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  const isPending = log.status === 'pending';

  return (
    <View style={[styles.card, { backgroundColor: status.bg, borderLeftColor: status.border }]}>
      <View style={styles.topRow}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeIcon}>🕐</Text>
          <Text style={styles.time}>{timeStr}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: status.border }]}>
          <Text style={styles.statusText}>{status.icon} {status.label}</Text>
        </View>
      </View>

      <View style={styles.medInfo}>
        <Text style={styles.medName}>{log.med_name || 'Medication'}</Text>
        <Text style={styles.dosage}>
          {log.dosage} {log.dosage_unit} {log.with_food ? '🍽️ With food' : ''}
        </Text>
        <Text style={styles.petName}>
          For: {log.pet_name} {log.pet_species === 'dog' ? '🐶' : log.pet_species === 'cat' ? '🐱' : '🐾'}
        </Text>
        {log.category ? (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{log.category}</Text>
          </View>
        ) : null}
      </View>

      {isPending && (
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionBtn, styles.takeBtn]} onPress={() => onTake?.(log.id)}>
            <Text style={styles.takeBtnText}>✅ Give Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.snoozeBtn]} onPress={() => onSnooze?.(log.id)}>
            <Text style={styles.snoozeBtnText}>⏰ Snooze</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.skipBtn]} onPress={() => onSkip?.(log.id)}>
            <Text style={styles.skipBtnText}>⏭️ Skip</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginVertical: SPACING.sm,
    borderLeftWidth: 4,
    ...SHADOWS.small,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  time: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  statusText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
  },
  medInfo: {
    marginBottom: SPACING.sm,
  },
  medName: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  dosage: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  petName: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textLight,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.secondaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    marginTop: SPACING.xs,
  },
  categoryText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
    gap: SPACING.sm,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  takeBtn: {
    backgroundColor: COLORS.success,
  },
  takeBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: FONTS.sizes.sm,
  },
  snoozeBtn: {
    backgroundColor: COLORS.yellowLight,
    borderWidth: 1,
    borderColor: COLORS.yellow,
  },
  snoozeBtnText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: FONTS.sizes.sm,
  },
  skipBtn: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: COLORS.textMuted,
  },
  skipBtnText: {
    color: COLORS.textLight,
    fontWeight: '700',
    fontSize: FONTS.sizes.sm,
  },
});

export default MedicationCard;
