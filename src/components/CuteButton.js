import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { COLORS, RADIUS, SPACING, FONTS, SHADOWS } from '../constants/theme';

const CuteButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? COLORS.primary : COLORS.white} />
      ) : (
        <View style={styles.content}>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text
            style={[
              styles.text,
              styles[`${variant}Text`],
              styles[`${size}Text`],
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...SHADOWS.small,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
    marginRight: SPACING.sm,
  },
  fullWidth: {
    width: '100%',
  },
  // Variants
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  success: {
    backgroundColor: COLORS.success,
  },
  danger: {
    backgroundColor: COLORS.danger,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  ghost: {
    backgroundColor: COLORS.primarySoft,
    shadowOpacity: 0,
    elevation: 0,
  },
  // Sizes
  small: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  medium: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  large: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xxl,
  },
  // Text styles
  text: {
    fontWeight: '700',
    textAlign: 'center',
  },
  primaryText: { color: COLORS.white },
  secondaryText: { color: COLORS.white },
  successText: { color: COLORS.white },
  dangerText: { color: COLORS.white },
  outlineText: { color: COLORS.primary },
  ghostText: { color: COLORS.primary },
  smallText: { fontSize: FONTS.sizes.sm },
  mediumText: { fontSize: FONTS.sizes.lg },
  largeText: { fontSize: FONTS.sizes.xl },
  // Disabled
  disabled: {
    opacity: 0.5,
  },
});

export default CuteButton;
