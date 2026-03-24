import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../constants/theme';

const CuteCard = ({ children, style, onPress, variant = 'default' }) => {
  const cardStyle = [
    styles.card,
    variant === 'pink' && styles.pinkCard,
    variant === 'mint' && styles.mintCard,
    variant === 'peach' && styles.peachCard,
    variant === 'lavender' && styles.lavenderCard,
    variant === 'warning' && styles.warningCard,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={cardStyle}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginVertical: SPACING.sm,
    ...SHADOWS.medium,
  },
  pinkCard: {
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  mintCard: {
    backgroundColor: COLORS.mintLight,
    borderWidth: 1,
    borderColor: COLORS.mint,
  },
  peachCard: {
    backgroundColor: COLORS.peachLight,
    borderWidth: 1,
    borderColor: COLORS.peach,
  },
  lavenderCard: {
    backgroundColor: COLORS.secondaryLight,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  warningCard: {
    backgroundColor: COLORS.yellowLight,
    borderWidth: 1,
    borderColor: COLORS.yellow,
  },
});

export default CuteCard;
