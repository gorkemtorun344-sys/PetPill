import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, RADIUS, SPACING, FONTS } from '../constants/theme';

const CuteInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  maxLength,
  secureTextEntry = false,
  error,
  helper,
  required = false,
  editable = true,
  style,
  inputStyle,
  onPress,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const InputWrapper = onPress ? TouchableOpacity : View;

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>
          {icon && <Text>{icon} </Text>}
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <InputWrapper
        onPress={onPress}
        activeOpacity={0.7}
        style={[
          styles.inputContainer,
          isFocused && styles.focused,
          error && styles.errorBorder,
          !editable && styles.disabled,
          multiline && styles.multiline,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          editable={editable && !onPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.input,
            multiline && styles.multilineInput,
            inputStyle,
          ]}
        />
      </InputWrapper>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {helper && !error && <Text style={styles.helperText}>{helper}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  required: {
    color: COLORS.danger,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  focused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primarySoft,
  },
  errorBorder: {
    borderColor: COLORS.danger,
  },
  disabled: {
    backgroundColor: COLORS.background,
    opacity: 0.7,
  },
  multiline: {
    minHeight: 100,
  },
  input: {
    padding: SPACING.md,
    fontSize: FONTS.sizes.lg,
    color: COLORS.text,
  },
  multilineInput: {
    textAlignVertical: 'top',
    minHeight: 80,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: FONTS.sizes.sm,
    marginTop: SPACING.xs,
  },
  helperText: {
    color: COLORS.textLight,
    fontSize: FONTS.sizes.sm,
    marginTop: SPACING.xs,
  },
});

export default CuteInput;
