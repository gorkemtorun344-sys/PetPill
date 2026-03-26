import React, { useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, RefreshControl,
  TouchableOpacity, Alert, Linking,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SPACING, FONTS, SHADOWS, RADIUS } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import PetAvatar from '../components/PetAvatar';
import MedicationCard from '../components/MedicationCard';
import CuteCard from '../components/CuteCard';
import EmptyState from '../components/EmptyState';
import * as DB from '../database/database';

const HomeScreen = ({ navigation }) => {
  const {
    pets, activePet, setActivePet, todaySchedule,
    dashboardStats, refreshAll, markMedication, isLoading,
  } = useApp();
  const { t } = useLanguage();
  const [refreshing, setRefreshing] = useState(false);
  const [streak, setStreak] = useState(0);
  const [upcomingApts, setUpcomingApts] = useState([]);
  const [refillAlerts, setRefillAlerts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadExtras();
      refreshAll();
    }, [activePet])
  );

  const loadExtras = async () => {
    try {
      if (activePet) {
        const s = await DB.getStreak(activePet.id);
        setStreak(s);
      }
      const apts = await DB.getUpcomingAppointments();
      setUpcomingApts(apts.slice(0, 3));
      const refills = await DB.getMedicationsNeedingRefill();
      setRefillAlerts(refills);
    } catch (e) {
      console.error(e);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshAll();
    await loadExtras();
    setRefreshing(false);
  };

  const handleTake = (logId) => {
    Alert.alert(t('home_mark_given_title'), t('home_mark_given_msg'), [
      { text: t('cancel'), style: 'cancel' },
      { text: t('home_given_btn'), onPress: () => markMedication(logId, 'taken') },
    ]);
  };

  const handleSkip = (logId) => {
    Alert.alert(t('home_skip_title'), t('home_skip_msg'), [
      { text: t('cancel'), style: 'cancel' },
      { text: t('home_skip_btn'), style: 'destructive', onPress: () => markMedication(logId, 'skipped') },
    ]);
  };

  const handleSnooze = (logId) => {
    Alert.alert(t('home_snooze_title'), t('home_snooze_msg'), [
      { text: t('home_snooze_5'), onPress: () => Alert.alert('Snoozed! ⏰', 'You\'ll be reminded in 5 minutes') },
      { text: t('home_snooze_15'), onPress: () => Alert.alert('Snoozed! ⏰', 'You\'ll be reminded in 15 minutes') },
      { text: t('home_snooze_30'), onPress: () => Alert.alert('Snoozed! ⏰', 'You\'ll be reminded in 30 minutes') },
      { text: t('cancel'), style: 'cancel' },
    ]);
  };

  const callEmergency = () => {
    Alert.alert(
      t('home_emergency_title'),
      t('home_emergency_msg'),
      [
        { text: t('cancel'), style: 'cancel' },
        { text: t('home_call_now'), onPress: () => Linking.openURL('tel:8884264435') },
      ]
    );
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('good_morning');
    if (hour < 17) return t('good_afternoon');
    return t('good_evening');
  };

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  // No pets yet
  if (pets.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          emoji="🐾"
          title={t('home_welcome_title')}
          message={t('home_welcome_desc')}
          buttonTitle={t('home_add_pet_btn')}
          onPress={() => navigation.navigate('PetsTab', { screen: 'AddPet' })}
        />
      </View>
    );
  }

  const completionRate = dashboardStats.todayTotal > 0
    ? Math.round((dashboardStats.todayTaken / dashboardStats.todayTotal) * 100)
    : 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{getGreeting()} 🌸</Text>
          <Text style={styles.date}>{todayStr}</Text>
        </View>
        <TouchableOpacity style={styles.emergencyBtn} onPress={callEmergency}>
          <Text style={styles.emergencyText}>{t('home_sos')}</Text>
        </TouchableOpacity>
      </View>

      {/* Pet Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.petScroller}>
        {pets.map(pet => (
          <PetAvatar
            key={pet.id}
            pet={pet}
            size={56}
            showName
            isActive={activePet?.id === pet.id}
            onPress={() => setActivePet(pet)}
          />
        ))}
        <TouchableOpacity
          style={styles.addPetBtn}
          onPress={() => navigation.navigate('PetsTab', { screen: 'AddPet' })}
        >
          <Text style={styles.addPetPlus}>+</Text>
          <Text style={styles.addPetLabel}>Add</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Stats Cards */}
      <View style={styles.statsRow}>
        <CuteCard style={styles.statCard} variant="pink">
          <Text style={styles.statEmoji}>💊</Text>
          <Text style={styles.statNumber}>{dashboardStats.todayTaken || 0}/{dashboardStats.todayTotal || 0}</Text>
          <Text style={styles.statLabel}>{t('home_today')}</Text>
        </CuteCard>
        <CuteCard style={styles.statCard} variant="mint">
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={styles.statNumber}>{streak}</Text>
          <Text style={styles.statLabel}>{t('home_day_streak')}</Text>
        </CuteCard>
        <CuteCard style={styles.statCard} variant="lavender">
          <Text style={styles.statEmoji}>🐾</Text>
          <Text style={styles.statNumber}>{dashboardStats.petCount || 0}</Text>
          <Text style={styles.statLabel}>{t('home_pets')}</Text>
        </CuteCard>
      </View>

      {/* Completion Bar */}
      {dashboardStats.todayTotal > 0 && (
        <CuteCard style={styles.progressCard}>
          <Text style={styles.progressTitle}>{t('home_progress')}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${completionRate}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {completionRate}{completionRate === 100 ? t('home_perfect') : t('home_complete')}
          </Text>
        </CuteCard>
      )}

      {/* Refill Alerts */}
      {refillAlerts.length > 0 && (
        <CuteCard variant="warning" style={styles.alertCard}>
          <Text style={styles.alertTitle}>{t('home_refill_needed')}</Text>
          {refillAlerts.map(med => (
            <Text key={med.id} style={styles.alertText}>
              {med.name} for {med.pet_name} — {med.remaining_supply} doses left
            </Text>
          ))}
          <TouchableOpacity
            onPress={() => navigation.navigate('PriceTab')}
            style={styles.alertAction}
          >
            <Text style={styles.alertActionText}>{t('home_compare_prices')}</Text>
          </TouchableOpacity>
        </CuteCard>
      )}

      {/* Today's Schedule */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t('home_schedule')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MedsTab')}>
          <Text style={styles.seeAll}>{t('home_see_all')}</Text>
        </TouchableOpacity>
      </View>

      {todaySchedule.length === 0 ? (
        <CuteCard variant="pink">
          <Text style={{ textAlign: 'center', color: COLORS.textLight, fontSize: FONTS.sizes.md }}>
            {t('home_no_meds')}
          </Text>
        </CuteCard>
      ) : (
        todaySchedule.map(log => (
          <MedicationCard
            key={log.id}
            log={log}
            onTake={handleTake}
            onSkip={handleSkip}
            onSnooze={handleSnooze}
          />
        ))
      )}

      {/* Upcoming Appointments */}
      {upcomingApts.length > 0 && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home_vet_visits')}</Text>
          </View>
          {upcomingApts.map(apt => (
            <CuteCard key={apt.id} variant="peach">
              <Text style={styles.aptDate}>
                📅 {new Date(apt.appointment_date).toLocaleDateString('en-US', {
                  weekday: 'short', month: 'short', day: 'numeric'
                })}
                {apt.appointment_time ? ` at ${apt.appointment_time}` : ''}
              </Text>
              <Text style={styles.aptPet}>{apt.pet_name} — {apt.reason || 'Checkup'}</Text>
              {apt.vet_name ? <Text style={styles.aptVet}>🩺 {apt.vet_name}</Text> : null}
            </CuteCard>
          ))}
        </>
      )}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    marginTop: SPACING.sm,
  },
  greeting: {
    fontSize: FONTS.sizes.title,
    fontWeight: '800',
    color: COLORS.text,
  },
  date: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textLight,
    marginTop: 2,
  },
  emergencyBtn: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  emergencyText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.danger,
  },
  petScroller: {
    marginBottom: SPACING.lg,
  },
  addPetBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.sm,
  },
  addPetPlus: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: '700',
  },
  addPetLabel: {
    fontSize: 10,
    color: COLORS.primary,
    marginTop: -2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  progressCard: {
    marginBottom: SPACING.sm,
  },
  progressTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  progressBar: {
    height: 12,
    backgroundColor: COLORS.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 6,
  },
  progressText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
    textAlign: 'center',
    fontWeight: '600',
  },
  alertCard: {
    marginBottom: SPACING.sm,
  },
  alertTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  alertText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  alertAction: {
    marginTop: SPACING.sm,
  },
  alertActionText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: FONTS.sizes.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.text,
  },
  seeAll: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
  aptDate: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.text,
  },
  aptPet: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textLight,
    marginTop: 2,
  },
  aptVet: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textLight,
    marginTop: 2,
  },
});

export default HomeScreen;
