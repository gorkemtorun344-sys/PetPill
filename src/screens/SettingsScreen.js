import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Alert, Linking, Share,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SPACING, FONTS, RADIUS, SHADOWS } from '../constants/theme';
import CuteCard from '../components/CuteCard';
import CuteButton from '../components/CuteButton';
import CuteInput from '../components/CuteInput';
import { useApp } from '../context/AppContext';
import * as DB from '../database/database';

const SettingsScreen = ({ navigation }) => {
  const { isPremium, setIsPremium, pets, refreshAll } = useApp();
  const [caregivers, setCaregivers] = useState([]);
  const [showAddCaregiver, setShowAddCaregiver] = useState(false);
  const [cgName, setCgName] = useState('');
  const [cgPhone, setCgPhone] = useState('');
  const [cgRelation, setCgRelation] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadCaregivers();
    }, [])
  );

  const loadCaregivers = async () => {
    try {
      const cgs = await DB.getCaregivers();
      setCaregivers(cgs);
    } catch (e) { console.error(e); }
  };

  const handleAddCaregiver = async () => {
    if (!cgName.trim()) {
      Alert.alert('Oops!', 'Please enter a name');
      return;
    }
    try {
      await DB.addCaregiver({
        name: cgName.trim(),
        phone: cgPhone.trim(),
        relationship: cgRelation.trim(),
        can_give_meds: true,
      });
      setCgName('');
      setCgPhone('');
      setCgRelation('');
      setShowAddCaregiver(false);
      await loadCaregivers();
      Alert.alert('Added! 👨‍👩‍👧', `${cgName} has been added as a caregiver.`);
    } catch (e) { console.error(e); }
  };

  const handleDeleteCaregiver = (cg) => {
    Alert.alert(`Remove ${cg.name}?`, 'They will no longer be listed as a caregiver.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove', style: 'destructive',
        onPress: async () => {
          await DB.deleteCaregiver(cg.id);
          await loadCaregivers();
        },
      },
    ]);
  };

  const handleUpgrade = () => {
    Alert.alert(
      '🌟 PetPill Premium',
      'Get unlimited pets, detailed health reports, price alerts, and ad-free experience!\n\n$4.99/month or $39.99/year',
      [
        { text: 'Maybe Later', style: 'cancel' },
        {
          text: '🌟 Upgrade Now',
          onPress: () => {
            // In production: integrate with App Store / Google Play billing
            setIsPremium(true);
            Alert.alert('Welcome to Premium! 🎉', 'You now have access to all premium features!');
          },
        },
      ]
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'I use PetPill to track my pet\'s medications and health! It\'s free and super cute 🐾💊 Download it here: [App Store Link]',
      });
    } catch (e) { console.error(e); }
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Pet Data 📄',
      'Generate a PDF report with all your pet\'s health data, medication history, and vaccination records. Perfect for vet visits!',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: '📄 Export PDF',
          onPress: () => {
            Alert.alert('Coming Soon!', 'PDF export will be available in the next update.');
          },
        },
      ]
    );
  };

  const handleEmergency = () => {
    Alert.alert(
      '🚨 Emergency Numbers',
      'ASPCA Poison Control: (888) 426-4435\nPet Poison Helpline: (855) 764-7661\n\nNote: Consultation fees may apply.',
      [
        { text: 'Close' },
        { text: '📞 Call ASPCA', onPress: () => Linking.openURL('tel:8884264435') },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Settings ⚙️</Text>

      {/* Premium Banner */}
      {!isPremium && (
        <CuteCard
          variant="pink"
          onPress={handleUpgrade}
          style={styles.premiumCard}
        >
          <Text style={styles.premiumEmoji}>🌟</Text>
          <Text style={styles.premiumTitle}>Upgrade to PetPill Premium</Text>
          <Text style={styles.premiumDesc}>
            Unlimited pets, health reports, price alerts & more!
          </Text>
          <View style={styles.premiumPrice}>
            <Text style={styles.premiumPriceText}>$4.99/month</Text>
          </View>
        </CuteCard>
      )}

      {isPremium && (
        <CuteCard variant="mint">
          <Text style={{ textAlign: 'center', fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text }}>
            🌟 Premium Active — Thank you!
          </Text>
        </CuteCard>
      )}

      {/* Caregivers */}
      <Text style={styles.sectionTitle}>Caregivers 👨‍👩‍👧</Text>
      <Text style={styles.sectionDesc}>
        Add family members who also take care of your pets
      </Text>

      {caregivers.map(cg => (
        <CuteCard key={cg.id}>
          <View style={styles.caregiverRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cgName}>{cg.name}</Text>
              {cg.relationship ? <Text style={styles.cgRelation}>{cg.relationship}</Text> : null}
              {cg.phone ? <Text style={styles.cgPhone}>📞 {cg.phone}</Text> : null}
            </View>
            <TouchableOpacity onPress={() => handleDeleteCaregiver(cg)}>
              <Text style={styles.cgDelete}>✕</Text>
            </TouchableOpacity>
          </View>
        </CuteCard>
      ))}

      {showAddCaregiver ? (
        <CuteCard variant="lavender">
          <Text style={styles.formTitle}>Add Caregiver</Text>
          <CuteInput label="Name" value={cgName} onChangeText={setCgName} placeholder="Name" required />
          <CuteInput label="Phone" value={cgPhone} onChangeText={setCgPhone} placeholder="Phone number" keyboardType="phone-pad" />
          <CuteInput label="Relationship" value={cgRelation} onChangeText={setCgRelation} placeholder="e.g., Spouse, Child, Pet Sitter" />
          <View style={styles.formActions}>
            <CuteButton title="Cancel" variant="ghost" onPress={() => setShowAddCaregiver(false)} style={{ flex: 1 }} />
            <CuteButton title="✅ Add" variant="primary" onPress={handleAddCaregiver} style={{ flex: 1 }} />
          </View>
        </CuteCard>
      ) : (
        <CuteButton
          title="+ Add Caregiver"
          variant="outline"
          onPress={() => setShowAddCaregiver(true)}
          fullWidth
          style={{ marginTop: SPACING.sm }}
        />
      )}

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions 🚀</Text>

      <CuteCard onPress={handleExportData}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>📄</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Export Health Report</Text>
            <Text style={styles.menuDesc}>Generate PDF for vet visits</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      <CuteCard onPress={handleEmergency}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>🚨</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Emergency Contacts</Text>
            <Text style={styles.menuDesc}>Poison hotline & emergency vets</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      <CuteCard onPress={handleShare}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>💌</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Share PetPill</Text>
            <Text style={styles.menuDesc}>Tell your pet-loving friends!</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      {/* App Info */}
      <Text style={styles.sectionTitle}>About 💝</Text>

      <CuteCard>
        <View style={styles.aboutSection}>
          <Text style={styles.aboutLogo}>💊🐾</Text>
          <Text style={styles.aboutName}>PetPill</Text>
          <Text style={styles.aboutVersion}>Version 1.0.0</Text>
          <Text style={styles.aboutDesc}>
            Made with love for pet parents everywhere 💕
          </Text>
        </View>
      </CuteCard>

      <CuteCard onPress={() => Linking.openURL('mailto:support@petpill.app')}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>📧</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Contact Support</Text>
            <Text style={styles.menuDesc}>support@petpill.app</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      <CuteCard>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>⭐</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Rate PetPill</Text>
            <Text style={styles.menuDesc}>Help us help more pets!</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      {/* Legal */}
      <Text style={styles.sectionTitle}>Legal 📋</Text>

      <CuteCard onPress={() => navigation.navigate('PrivacyPolicy')}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>🔒</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Privacy Policy</Text>
            <Text style={styles.menuDesc}>How we protect your data</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      <CuteCard onPress={() => navigation.navigate('Terms')}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>📋</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Terms of Service</Text>
            <Text style={styles.menuDesc}>Usage terms and conditions</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      <View style={{ height: 150 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg },
  title: { fontSize: FONTS.sizes.title, fontWeight: '800', color: COLORS.text, marginTop: SPACING.sm, marginBottom: SPACING.lg },
  premiumCard: { alignItems: 'center', paddingVertical: SPACING.xl },
  premiumEmoji: { fontSize: 48, marginBottom: SPACING.sm },
  premiumTitle: { fontSize: FONTS.sizes.xl, fontWeight: '800', color: COLORS.text, textAlign: 'center' },
  premiumDesc: { fontSize: FONTS.sizes.md, color: COLORS.textLight, textAlign: 'center', marginTop: SPACING.xs },
  premiumPrice: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  premiumPriceText: { color: COLORS.white, fontWeight: '800', fontSize: FONTS.sizes.lg },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SPACING.xl,
    marginBottom: SPACING.xs,
  },
  sectionDesc: { fontSize: FONTS.sizes.md, color: COLORS.textLight, marginBottom: SPACING.md },
  caregiverRow: { flexDirection: 'row', alignItems: 'center' },
  cgName: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text },
  cgRelation: { fontSize: FONTS.sizes.sm, color: COLORS.textLight, marginTop: 2 },
  cgPhone: { fontSize: FONTS.sizes.sm, color: COLORS.primary, marginTop: 2 },
  cgDelete: { fontSize: 20, color: COLORS.textMuted, padding: SPACING.sm },
  formTitle: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md },
  formActions: { flexDirection: 'row', gap: SPACING.sm },
  menuItem: { flexDirection: 'row', alignItems: 'center' },
  menuEmoji: { fontSize: 28, marginRight: SPACING.md },
  menuTitle: { fontSize: FONTS.sizes.lg, fontWeight: '600', color: COLORS.text },
  menuDesc: { fontSize: FONTS.sizes.sm, color: COLORS.textLight, marginTop: 2 },
  menuArrow: { fontSize: 28, color: COLORS.textMuted },
  aboutSection: { alignItems: 'center', paddingVertical: SPACING.md },
  aboutLogo: { fontSize: 48 },
  aboutName: { fontSize: FONTS.sizes.xxl, fontWeight: '800', color: COLORS.text, marginTop: SPACING.sm },
  aboutVersion: { fontSize: FONTS.sizes.sm, color: COLORS.textMuted },
  aboutDesc: { fontSize: FONTS.sizes.md, color: COLORS.textLight, textAlign: 'center', marginTop: SPACING.sm },
});

export default SettingsScreen;
