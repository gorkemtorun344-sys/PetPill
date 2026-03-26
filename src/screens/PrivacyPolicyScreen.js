import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { useLanguage } from '../context/LanguageContext';

const PrivacyPolicyScreen = () => {
  const { t } = useLanguage();

  const sections = [
    { heading: t('privacy_h1'), body: t('privacy_b1') },
    { heading: t('privacy_h2'), body: t('privacy_b2') },
    { heading: t('privacy_h3'), body: t('privacy_b3') },
    { heading: t('privacy_h4'), body: t('privacy_b4') },
    { heading: t('privacy_h5'), body: t('privacy_b5') },
    { heading: t('privacy_h6'), body: t('privacy_b6') },
    { heading: t('privacy_h7'), body: t('privacy_b7') },
    { heading: t('privacy_h8'), body: t('privacy_b8') },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('privacy_title')}</Text>
      <Text style={styles.updated}>{t('privacy_updated')}</Text>

      {sections.map((section, index) => (
        <View key={index}>
          <Text style={styles.heading}>{section.heading}</Text>
          <Text style={styles.body}>{section.body}</Text>
        </View>
      ))}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg },
  title: {
    fontSize: FONTS.sizes.title,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  updated: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.xl,
  },
  heading: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  body: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textLight,
    lineHeight: 22,
  },
});

export default PrivacyPolicyScreen;
