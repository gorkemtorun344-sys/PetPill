import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, FONTS } from '../constants/theme';

const TermsScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Terms of Service</Text>
      <Text style={styles.updated}>Last updated: March 26, 2026</Text>

      <Text style={styles.heading}>1. Acceptance of Terms</Text>
      <Text style={styles.body}>
        By downloading, installing, or using PetPill, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the app.
      </Text>

      <Text style={styles.heading}>2. Description of Service</Text>
      <Text style={styles.body}>
        PetPill is a mobile application designed to help pet owners manage their pets' medication schedules, health records, and veterinary appointments. The app stores all data locally on your device.
      </Text>

      <Text style={styles.heading}>3. Medical Disclaimer</Text>
      <Text style={styles.body}>
        PetPill is a <Text style={styles.bold}>tracking and reminder tool only</Text>. It does NOT provide veterinary medical advice, diagnosis, or treatment. Always consult a qualified veterinarian for your pet's health concerns. Never disregard professional veterinary advice or delay seeking it because of information from this app.
      </Text>

      <Text style={styles.heading}>4. User Responsibilities</Text>
      <Text style={styles.body}>
        You are responsible for:{'\n\n'}
        {'\u2022'} The accuracy of information you enter into the app{'\n'}
        {'\u2022'} Maintaining backups of your data{'\n'}
        {'\u2022'} Following your veterinarian's prescribed medication instructions{'\n'}
        {'\u2022'} Verifying medication dosages with your vet
      </Text>

      <Text style={styles.heading}>5. Data & Privacy</Text>
      <Text style={styles.body}>
        All data is stored locally on your device. We do not collect, transmit, or have access to your data. If you uninstall the app, your data will be permanently lost. Please see our Privacy Policy for more details.
      </Text>

      <Text style={styles.heading}>6. Premium Features</Text>
      <Text style={styles.body}>
        PetPill may offer premium features through in-app purchases. Subscription terms, pricing, and renewal policies will be displayed before purchase. Subscriptions are managed through Google Play or the Apple App Store.
      </Text>

      <Text style={styles.heading}>7. Limitation of Liability</Text>
      <Text style={styles.body}>
        PetPill is provided "as is" without warranties of any kind. We are not liable for any damages arising from the use of this app, including but not limited to missed medication doses, incorrect data entry, or device malfunctions.
      </Text>

      <Text style={styles.heading}>8. Changes to Terms</Text>
      <Text style={styles.body}>
        We reserve the right to modify these terms at any time. Continued use of the app after changes constitutes acceptance of the new terms.
      </Text>

      <Text style={styles.heading}>9. Contact</Text>
      <Text style={styles.body}>
        For questions about these Terms of Service, contact us at:{'\n\n'}
        support@petpill.app
      </Text>

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
  bold: {
    fontWeight: '700',
    color: COLORS.text,
  },
});

export default TermsScreen;
