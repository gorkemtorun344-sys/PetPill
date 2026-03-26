import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { useLanguage } from '../context/LanguageContext';

const TermsScreen = () => {
  const { t } = useLanguage();

  const sections = [
    { heading: t('terms_h1'), body: t('terms_b1') },
    { heading: t('terms_h2'), body: t('terms_b2') },
    { heading: t('terms_h3'), body: t('terms_b3') },
    { heading: t('terms_h4'), body: t('terms_b4') },
    { heading: t('terms_h5'), body: t('terms_b5') },
    { heading: t('terms_h6'), body: t('terms_b6') },
    { heading: t('terms_h7'), body: t('terms_b7') },
    { heading: t('terms_h8'), body: t('terms_b8') },
    { heading: t('terms_h9'), body: t('terms_b9') },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('terms_title')}</Text>
      <Text style={styles.updated}>{t('terms_updated')}</Text>

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

export default TermsScreen;
