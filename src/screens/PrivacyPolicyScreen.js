import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, FONTS, RADIUS } from '../constants/theme';
import { t } from '../i18n/i18n';

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.updated}>Last updated: March 25, 2026</Text>

      <Text style={styles.heading}>1. Information We Collect</Text>
      <Text style={styles.body}>
        PetPill stores all data locally on your device. We do not collect, transmit, or store any personal information on external servers. The data you enter — including pet profiles, medication schedules, health records, and vaccination logs — remains entirely on your device.
      </Text>

      <Text style={styles.heading}>2. Data Storage</Text>
      <Text style={styles.body}>
        All app data is stored using SQLite, a local database on your device. Your data is never uploaded to any cloud service. If you uninstall the app, all locally stored data will be permanently deleted.
      </Text>

      <Text style={styles.heading}>3. Camera & Photo Access</Text>
      <Text style={styles.body}>
        PetPill may request access to your device camera and photo library solely to allow you to add photos of your pets. These photos are stored locally and are never transmitted to any server.
      </Text>

      <Text style={styles.heading}>4. Location Access</Text>
      <Text style={styles.body}>
        If granted permission, PetPill may use your location to help you find nearby veterinary clinics. Location data is used in real-time only and is never stored or shared.
      </Text>

      <Text style={styles.heading}>5. Notifications</Text>
      <Text style={styles.body}>
        PetPill uses local push notifications to remind you about medication schedules, refills, and vet appointments. These notifications are generated and scheduled entirely on your device.
      </Text>

      <Text style={styles.heading}>6. Third-Party Services</Text>
      <Text style={styles.body}>
        The Price Comparer feature contains links to third-party pharmacy websites. When you click these links, you will be redirected to external websites governed by their own privacy policies. PetPill is not responsible for the privacy practices of these external sites. Some links may contain affiliate parameters.
      </Text>

      <Text style={styles.heading}>7. Children's Privacy</Text>
      <Text style={styles.body}>
        PetPill does not knowingly collect personal information from children under 13. The app is designed for pet owners of all ages and stores data locally without any data collection.
      </Text>

      <Text style={styles.heading}>8. Data Security</Text>
      <Text style={styles.body}>
        Since all data is stored locally on your device, security depends on your device's own security measures (passcode, biometrics, encryption). We recommend keeping your device secured to protect your pet health data.
      </Text>

      <Text style={styles.heading}>9. Changes to This Policy</Text>
      <Text style={styles.body}>
        We may update this privacy policy from time to time. Any changes will be reflected in the app with an updated "Last updated" date.
      </Text>

      <Text style={styles.heading}>10. Contact Us</Text>
      <Text style={styles.body}>
        If you have questions about this privacy policy, please contact us at support@petpill.app.
      </Text>

      <Text style={styles.footer}>
        PetPill v1.2.0 — Made with love for pet parents everywhere
      </Text>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg },
  title: { fontSize: FONTS.sizes.title, fontWeight: '800', color: COLORS.text, marginTop: SPACING.sm, marginBottom: SPACING.xs },
  updated: { fontSize: FONTS.sizes.sm, color: COLORS.textMuted, marginBottom: SPACING.xl },
  heading: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text, marginTop: SPACING.lg, marginBottom: SPACING.sm },
  body: { fontSize: FONTS.sizes.md, color: COLORS.textLight, lineHeight: 22, marginBottom: SPACING.sm },
  footer: { fontSize: FONTS.sizes.sm, color: COLORS.textMuted, textAlign: 'center', marginTop: SPACING.xxxl, fontStyle: 'italic' },
});

export default PrivacyPolicyScreen;
