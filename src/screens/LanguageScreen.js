import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { COLORS, SPACING, FONTS, RADIUS } from '../constants/theme';
import { useLanguage } from '../context/LanguageContext';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
];

const LanguageScreen = ({ navigation }) => {
  const { language, changeLanguage, t } = useLanguage();

  const handleSelect = async (lang) => {
    await changeLanguage(lang.code);
    Alert.alert(
      lang.flag + ' ' + lang.name,
      t('lang_saved_msg'),
      [{ text: t('ok'), onPress: () => navigation.goBack() }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.subtitle}>{t('lang_subtitle')}</Text>
      {LANGUAGES.map((lang) => {
        const isSelected = language === lang.code;
        return (
          <TouchableOpacity key={lang.code} onPress={() => handleSelect(lang)} activeOpacity={0.7}>
            <View style={[styles.card, isSelected && styles.cardActive]}>
              <Text style={styles.flag}>{lang.flag}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.langName, isSelected && styles.langNameActive]}>{lang.name}</Text>
                <Text style={styles.langNative}>{lang.nativeName}</Text>
              </View>
              {isSelected && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
      <View style={{ height: 60 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg },
  subtitle: { fontSize: FONTS.sizes.md, color: COLORS.textLight, marginBottom: SPACING.lg },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardActive: { borderColor: COLORS.primary, backgroundColor: '#FFF0F3' },
  flag: { fontSize: 36, marginRight: SPACING.md },
  langName: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text },
  langNameActive: { color: COLORS.primary },
  langNative: { fontSize: FONTS.sizes.sm, color: COLORS.textLight, marginTop: 2 },
  checkmark: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center',
  },
  checkmarkText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});

export default LanguageScreen;
