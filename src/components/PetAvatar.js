import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../constants/theme';
import { PET_TYPES } from '../constants/theme';

const PetAvatar = ({ pet, size = 60, onPress, showName = false, isActive = false }) => {
  const petType = PET_TYPES.find(t => t.id === pet?.species) || PET_TYPES[PET_TYPES.length - 1];
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper onPress={onPress} activeOpacity={0.7} style={styles.container}>
      <View
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          isActive && styles.activeAvatar,
        ]}
      >
        {pet?.photo ? (
          <Image
            source={{ uri: pet.photo }}
            style={[styles.image, { width: size - 4, height: size - 4, borderRadius: (size - 4) / 2 }]}
          />
        ) : (
          <Text style={[styles.emoji, { fontSize: size * 0.45 }]}>{petType.emoji}</Text>
        )}
      </View>
      {showName && (
        <Text style={[styles.name, isActive && styles.activeName]} numberOfLines={1}>
          {pet?.name || 'Pet'}
        </Text>
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: SPACING.sm,
  },
  avatar: {
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.primaryLight,
    ...SHADOWS.small,
  },
  activeAvatar: {
    borderColor: COLORS.primary,
    borderWidth: 3,
    backgroundColor: COLORS.white,
  },
  image: {
    resizeMode: 'cover',
  },
  emoji: {
    textAlign: 'center',
  },
  name: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
    fontWeight: '500',
    maxWidth: 70,
    textAlign: 'center',
  },
  activeName: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});

export default PetAvatar;
