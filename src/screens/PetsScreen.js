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

const PetsScreen = ({ navigation }) => {
  const { pets, loadPets } = useApp();
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
    } catch (e) {
      console.error(e);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPets();
    await loadMedCounts();
    setRefreshing(false);
  };

  const handleDeletePet = (pet) => {
    Alert.alert(
      `Delete ${pet.name}? 😢`,
      'This will remove all their medications, health records, and appointments. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
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
          title="No Pets Yet"
          message="Add your first furry (or scaly) friend to start tracking their health!"
          buttonTitle="+ Add Your First Pet"
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
        <Text style={styles.title}>My Pets 🐾</Text>
        <CuteButton
          title="+ Add Pet"
          onPress={() => navigation.navigate('AddPet')}
          size="small"
          variant="primary"
        />
      </View>

      {pets.map(pet => {
        const petType = PET_TYPES.find(t => t.id === pet.species) || PET_TYPES[PET_TYPES.length - 1];
        return (
          <TouchableOpacity
            key={pet.id}
            style={styles.petCard}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('PetDetail', { petId: pet.id })}
            onLongPress={() => handleDeletePet(pet)}
          >
            <PetAvatar pet={pet} size={70} />
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petBreed}>
                {petType.emoji} {pet.breed || petType.name}
                {pet.gender ? ` • ${pet.gender}` : ''}
              </Text>
              <Text style={styles.petDetails}>
                {pet.age_years > 0 ? `${pet.age_years}y` : ''}
                {pet.age_months > 0 ? ` ${pet.age_months}m` : ''} old
                {pet.weight > 0 ? ` • ${pet.weight} ${pet.weight_unit}` : ''}
              </Text>
              <View style={styles.medBadge}>
                <Text style={styles.medBadgeText}>
                  💊 {petMedCounts[pet.id] || 0} active medications
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
  title: {
    fontSize: FONTS.sizes.title,
    fontWeight: '800',
    color: COLORS.text,
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  petInfo: {
    flex: 1,
    marginLeft: SPACING.lg,
  },
  petName: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.text,
  },
  petBreed: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textLight,
    marginTop: 2,
  },
  petDetails: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  medBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    marginTop: SPACING.xs,
  },
  medBadgeText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.primary,
    fontWeight: '600',
  },
  arrow: {
    fontSize: 28,
    color: COLORS.textMuted,
    fontWeight: '300',
  },
});

export default PetsScreen;
