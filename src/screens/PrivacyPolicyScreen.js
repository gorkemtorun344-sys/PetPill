import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, FONTS } from '../constants/theme';

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.updated}>Last updated: March 26, 2026</Text>

      <Text style={styles.heading}>1. Introduction</Text>
      <Text style={styles.body}>
        PetPill ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application.
      </Text>

      <Text style={styles.heading}>2. Information We Collect</Text>
      <Text style={styles.body}>
        PetPill stores all data <Text style={styles.bold}>locally on your device</Text>. We do NOT collect, transmit, or store any personal data on external servers. The information you enter includes:{'\n\n'}
        {'\u2022'} Pet profiles (name, species, breed, weight, date of birth){'\n'}
        {'\u2022'} Medication schedules and dosage information{'\n'}
        {'\u2022'} Vaccination and health records{'\n'}
        {'\u2022'} Vet appointment details{'\n'}
        {'\u2022'} Caregiver contact information{'\n'}
        {'\u2022'} Pet photos (stored locally only)
      </Text>

      <Text style={styles.heading}>3. Device Permissions</Text>
      <Text style={styles.body}>
        PetPill may request the following device permissions:{'\n\n'}
        {'\u2022'} <Text style={styles.bold}>Camera & Photo Library:</Text> To take or select photos of your pets. Photos are stored locally and never uploaded.{'\n\n'}
        {'\u2022'} <Text style={styles.bold}>Location:</Text> To help you find nearby veterinary clinics. Location data is used in real-time only and is never stored or transmitted.{'\n\n'}
        {'\u2022'} <Text style={styles.bold}>Notifications:</Text> To send you medication reminders, refill alerts, and appointment notifications. All notifications are scheduled locally on your device.
      </Text>

      <Text style={styles.heading}>4. Data Storage & Security</Text>
      <Text style={styles.body}>
        All your data is stored locally on your device using an encrypted SQLite database. We do not have access to your data. If you uninstall the app, all data will be permanently deleted.
      </Text>

      <Text style={styles.heading}>5. Third-Party Services</Text>
      <Text style={styles.body}>
        PetPill does not share your data with any third parties. We do not use analytics, advertising, or tracking services. The app functions entirely offline.
      </Text>

      <Text style={styles.heading}>6. Children's Privacy</Text>
      <Text style={styles.body}>
        PetPill does not knowingly collect personal information from children under 13. The app is designed for pet owners of all ages, and all data remains on the device.
      </Text>

      <Text style={styles.heading}>7. Changes to This Policy</Text>
      <Text style={styles.body}>
        We may update this Privacy Policy from time to time. Any changes will be reflected in the app with an updated "Last updated" date.
      </Text>

      <Text style={styles.heading}>8. Contact Us</Text>
      <Text style={styles.body}>
        If you have any questions about this Privacy Policy, please contact us at:{'\n\n'}
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

export default PrivacyPolicyScreen;
