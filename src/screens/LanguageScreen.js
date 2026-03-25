import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SPACING, FONTS, RADIUS } from '../constants/theme';
import CuteCard from '../components/CuteCard';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Turkish', nativeName: 'Turkce', flag: '🇹🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Espanol', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Francais', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Portugues', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Russkiy', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', nativeName: 'Nihongo', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: 'Hangugeo', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', nativeName: 'Zhongwen', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'Al-Arabiyya', flag: '🇸🇦' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
];

const LanguageScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const saved = await AsyncStorage.getItem('petpill_language');
      if (saved) setSelectedLanguage(saved);
    } catch (e) {
      console.error('Failed to load language:', e);
    }
  };

  const handleSelectLanguage = async (langCode) => {
    try {
      await AsyncStorage.setItem('petpill_language', langCode);
      setSelectedLanguage(langCode);
      const lang = LANGUAGES.find(l => l.code === langCode);
      Alert.alert(
        'Language Updated! ' + lang.flag,
        `Language set to ${lang.name}. Full translation support coming in the next update!`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (e) {
      console.error('Failed to save language:', e);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.subtitle}>
        Select your preferred language
      </Text>

      {LANGUAGES.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          onPress={() => handleSelectLanguage(lang.code)}
        >
          <CuteCard style={[
            styles.langCard,
            selectedLanguage === lang.code && styles.langCardActive,
          ]}>
            <View style={styles.langRow}>
              <Text style={styles.flag}>{lang.flag}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.langName}>{lang.name}</Text>
                <Text style={styles.langNative}>{lang.nativeName}</Text>
              </View>
              {selectedLanguage === lang.code && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </View>
          </CuteCard>
        </TouchableOpacity>
      ))}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textLight,
    marginBottom: SPACING.lg,
  },
  langCard: {
    marginBottom: SPACING.xs,
  },
  langCardActive: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  langName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  langNative: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textLight,
    marginTop: 2,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 16,
  },
});

export default LanguageScreen;
