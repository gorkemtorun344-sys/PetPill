import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  RefreshControl, Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SPACING, FONTS, SHADOWS, RADIUS } from '../constants/theme';
import { PET_TYPES } from '../constants/theme';
import { useApp } from '../context/AppContext';
import PetAvatar from '../components/PetAvatar';
import CuteButton from '../components/CuteButton';
import EmptyState from '../components/EmptyState';
import * as DB from '../database/database';
import { t } from '../i18n/i18n';
import { playTap } from '../utils/sounds';

const PetsScreen = ({ navigation }) => {
  const { pets, loadPets, language } = useApp();
  const [refreshing, setRefreshing] = useState(false);
  const [petMedCounts, setPetMedCounts] = useState({});

  useFocusEffect(
    useCallback(() => {
      loadPets();
      loadMedCounts();
    }, [])
  );

  const loadMedCounts = async () => {
    try {
      const counts = {};
      for (const pet of pets) {
        const meds = await DB.getMedicationsByPet(pet.id);
        counts[pet.id] = meds.length;
      }
      setPetMedCounts(counts);
    } catch (e) { console.error(e); }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPets();
    await loadMedCounts();
    setRefreshing(false);
  };

  const handleDeletePet = (pet) => {
    Alert.alert(
      `${t('delete')} ${pet.name}? 😢`,
      t('delete_pet_msg'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: async () => {
            await DB.deletePet(pet.id);
            await loadPets();
          },
        },
      ]
    );
  };

  if (pets.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          emoji="🐾"
          title={t('no_pets_yet')}
          message={t('no_pets_msg')}
          buttonTitle={t('add_first_pet')}
          onPress={() => navigation.navigate('AddPet')}
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
        <Text style={styles.title}>{t('my_pets')} 🐾</Text>
        <CuteButton
          title={t('add_pet')}
          onPress={() => { playTap(); navigation.navigate('AddPet'); }}
          size="small"
          variant="primary"
        />
      </View>

      {pets.map(pet => {
        const petType = PET_TYPES.find(tp => tp.id === pet.species) || PET_TYPES[PET_TYPES.length - 1];
        return (
          <TouchableOpacity
            key={pet.id}
            style={styles.petCard}
            activeOpacity={0.7}
            onPress={() => { playTap(); navigation.navigate('PetDetail', { petId: pet.id }); }}
            onLongPress={() => handleDeletePet(pet)}
          >
            <PetAvatar pet={pet} size={70} />
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petBreed}>
                {petType.emoji} {pet.breed || t(petType.id)}
                {pet.gender ? ` • ${t(pet.gender.toLowerCase())}` : ''}
              </Text>
              <Text style={styles.petDetails}>
                {pet.age_years > 0 ? `${pet.age_years}${t('years').charAt(0)}` : ''}
                {pet.age_months > 0 ? ` ${pet.age_months}${t('months').charAt(0)}` : ''} {t('old')}
                {pet.weight > 0 ? ` • ${pet.weight} ${pet.weight_unit}` : ''}
              </Text>
              <View style={styles.medBadge}>
                <Text style={styles.medBadgeText}>
                  💊 {petMedCounts[pet.id] || 0} {t('active_medications')}
                </Text>
              </View>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        );
      })}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg, marginTop: SPACING.sm },
  title: { fontSize: FONTS.sizes.title, fontWeight: '800', color: COLORS.text },
  petCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.xl, padding: SPACING.lg, marginBottom: SPACING.md, ...SHADOWS.medium },
  petInfo: { flex: 1, marginLeft: SPACING.lg },
  petName: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.text },
  petBreed: { fontSize: FONTS.sizes.md, color: COLORS.textLight, marginTop: 2 },
  petDetails: { fontSize: FONTS.sizes.sm, color: COLORS.textMuted, marginTop: 2 },
  medBadge: { alignSelf: 'flex-start', backgroundColor: COLORS.primarySoft, paddingHorizontal: SPACING.sm, paddingVertical: 2, borderRadius: RADIUS.sm, marginTop: SPACING.xs },
  medBadgeText: { fontSize: FONTS.sizes.xs, color: COLORS.primary, fontWeight: '600' },
  arrow: { fontSize: 28, color: COLORS.textMuted, fontWeight: '300' },
});

export default PetsScreen;
