import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Alert, Linking, Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SPACING, FONTS, RADIUS, SHADOWS } from '../constants/theme';
import CuteCard from '../components/CuteCard';
import CuteButton from '../components/CuteButton';
import CuteInput from '../components/CuteInput';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import * as DB from '../database/database';


const SettingsScreen = ({ navigation }) => {
  const { isPremium, setIsPremium, pets, refreshAll } = useApp();
  const { t } = useLanguage();

  const FREE_FEATURES = [
    { emoji: '🐾', text: t('pf_f1') },
    { emoji: '💊', text: t('pf_f2') },
    { emoji: '🔔', text: t('pf_f3') },
    { emoji: '📋', text: t('pf_f4') },
  ];
  const PREMIUM_FEATURES = [
    { emoji: '🐾', text: t('pf_p1') },
    { emoji: '📊', text: t('pf_p2') },
    { emoji: '💰', text: t('pf_p3') },
    { emoji: '📄', text: t('pf_p4') },
    { emoji: '👨‍👩‍👧', text: t('pf_p5') },
    { emoji: '🚫', text: t('pf_p6') },
  ];
  const [caregivers, setCaregivers] = useState([]);
  const [showAddCaregiver, setShowAddCaregiver] = useState(false);
  const [cgName, setCgName] = useState('');
  const [cgPhone, setCgPhone] = useState('');
  const [cgRelation, setCgRelation] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('yearly'); // 'monthly' | 'yearly'

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
      Alert.alert(t('oops'), 'Please enter a name');
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
      Alert.alert('Added! 👨‍👩‍👧', `${cgName} ${t('settings_caregiver_added')}`);
    } catch (e) { console.error(e); }
  };

  const handleDeleteCaregiver = (cg) => {
    Alert.alert(t('settings_remove_caregiver_title', { name: cg.name }), t('settings_remove_caregiver_msg'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('remove'), style: 'destructive',
        onPress: async () => {
          await DB.deleteCaregiver(cg.id);
          await loadCaregivers();
        },
      },
    ]);
  };

  const handleUpgrade = () => {
    const isYearly = selectedPlan === 'yearly';
    const price = isYearly ? '$39.99' : '$4.99';
    const period = isYearly ? t('premium_yearly') : t('premium_monthly');
    Alert.alert(
      `👑 ${t('premium_title')}`,
      `${price} ${period}`,
      [
        { text: t('settings_maybe_later'), style: 'cancel' },
        {
          text: t('premium_unlock'),
          onPress: () => {
            setIsPremium(true);
            Alert.alert('🎉', t('settings_welcome_premium'));
          },
        },
      ]
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: t('settings_share_message') });
    } catch (e) { console.error(e); }
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Pet Data 📄',
      'Generate a PDF report with all your pet\'s health data, medication history, and vaccination records. Perfect for vet visits!',
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: '📄 Export PDF',
          onPress: () => Alert.alert(t('coming_soon'), t('settings_export_coming')),
        },
      ]
    );
  };

  const handleEmergency = () => {
    Alert.alert(
      '🚨 Emergency Numbers',
      t('settings_emergency_msg'),
      [
        { text: t('close') },
        { text: t('settings_call_aspca'), onPress: () => Linking.openURL('tel:8884264435') },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('settings_header')}</Text>

      {/* ====== PREMIUM CARD ====== */}
      {!isPremium ? (
        <View style={styles.premiumWrapper}>
          <LinearGradient
            colors={['#2D1B69', '#5B2D8E', '#9B4FD4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.premiumCard}
          >
            {/* Decorative blobs */}
            <View style={styles.blobTL} />
            <View style={styles.blobBR} />

            {/* Badge */}
            <View style={styles.mostPopularBadge}>
              <Text style={styles.mostPopularText}>{t('premium_most_popular')}</Text>
            </View>

            {/* Crown & title */}
            <Text style={styles.premiumCrown}>👑</Text>
            <Text style={styles.premiumTitle}>{t('premium_title')}</Text>
            <Text style={styles.premiumTagline}>{t('premium_tagline')}</Text>

            {/* Free vs Premium comparison */}
            <View style={styles.compareBox}>
              {/* Free column */}
              <View style={styles.compareCol}>
                <Text style={styles.compareHeader}>{t('premium_free_col')}</Text>
                {FREE_FEATURES.map((f, i) => (
                  <View key={i} style={styles.compareRow}>
                    <Text style={styles.compareCheckFree}>✓</Text>
                    <Text style={styles.compareText}>{f.text}</Text>
                  </View>
                ))}
                {/* Show locks for premium items in free column */}
                {PREMIUM_FEATURES.slice(0, 4).map((f, i) => (
                  <View key={i} style={styles.compareRow}>
                    <Text style={styles.compareCheckLocked}>🔒</Text>
                    <Text style={styles.compareTextLocked}>{f.text}</Text>
                  </View>
                ))}
              </View>

              {/* Divider */}
              <View style={styles.compareDivider} />

              {/* Premium column */}
              <LinearGradient
                colors={['rgba(255,215,0,0.15)', 'rgba(255,165,0,0.08)']}
                style={styles.compareColPremium}
              >
                <View style={styles.premiumColHeader}>
                  <Text style={styles.compareHeaderPremium}>{t('premium_pro_col')}</Text>
                  <Text style={styles.premiumColBadge}>✦</Text>
                </View>
                {FREE_FEATURES.map((f, i) => (
                  <View key={i} style={styles.compareRow}>
                    <Text style={styles.compareCheckPremium}>✓</Text>
                    <Text style={styles.compareTextPremium}>{t(`pf_p${i + 1}`) || f.text}</Text>
                  </View>
                ))}
                {PREMIUM_FEATURES.slice(0, 4).map((f, i) => (
                  <View key={i} style={styles.compareRow}>
                    <Text style={styles.compareCheckPremium}>✓</Text>
                    <Text style={styles.compareTextPremium}>{f.text}</Text>
                  </View>
                ))}
              </LinearGradient>
            </View>

            {/* Extra premium features */}
            <View style={styles.extraFeatures}>
              {PREMIUM_FEATURES.slice(4).map((f, i) => (
                <View key={i} style={styles.extraFeatureChip}>
                  <Text style={styles.extraFeatureText}>{f.emoji} {f.text}</Text>
                </View>
              ))}
            </View>

            {/* Plan selector */}
            <View style={styles.planRow}>
              <TouchableOpacity
                style={[styles.planOption, selectedPlan === 'monthly' && styles.planOptionActive]}
                onPress={() => setSelectedPlan('monthly')}
              >
                <Text style={styles.planPrice}>$4.99</Text>
                <Text style={styles.planPeriod}>{t('premium_monthly')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.planOption, selectedPlan === 'yearly' && styles.planOptionActive]}
                onPress={() => setSelectedPlan('yearly')}
              >
                <View style={styles.saveBadge}>
                  <Text style={styles.saveText}>{t('premium_save_pct')}</Text>
                </View>
                <Text style={styles.planPrice}>$39.99</Text>
                <Text style={styles.planPeriod}>{t('premium_yearly')}</Text>
                <Text style={styles.planEquiv}>{t('premium_monthly_equiv')}</Text>
              </TouchableOpacity>
            </View>

            {/* CTA Button */}
            <TouchableOpacity onPress={handleUpgrade} activeOpacity={0.85} style={styles.ctaWrapper}>
              <LinearGradient
                colors={['#FFD700', '#FFA500', '#FF8C00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.ctaButton}
              >
                <Text style={styles.ctaText}>{t('premium_unlock')}</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Social proof */}
            <Text style={styles.socialProof}>{t('premium_proof')}</Text>
            <Text style={styles.cancelNote}>{t('premium_cancel')}</Text>
          </LinearGradient>
        </View>
      ) : (
        <LinearGradient
          colors={['#2D1B69', '#5B2D8E', '#9B4FD4']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.premiumActiveCard}
        >
          <Text style={styles.premiumActiveCrown}>👑</Text>
          <Text style={styles.premiumActiveTitle}>{t('settings_premium_active')}</Text>
          <View style={styles.premiumActiveStars}>
            {['✦', '✦', '✦', '✦', '✦'].map((s, i) => (
              <Text key={i} style={styles.premiumActiveStar}>{s}</Text>
            ))}
          </View>
          <Text style={styles.premiumActiveDesc}>{t('premium_active_desc')}</Text>
        </LinearGradient>
      )}

      {/* Caregivers */}
      <Text style={styles.sectionTitle}>{t('settings_caregivers')}</Text>
      <Text style={styles.sectionDesc}>{t('settings_caregivers_desc')}</Text>

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
          <Text style={styles.formTitle}>{t('settings_add_caregiver')}</Text>
          <CuteInput label={t('settings_caregiver_name')} value={cgName} onChangeText={setCgName} placeholder={t('settings_caregiver_name')} required />
          <CuteInput label={t('settings_caregiver_phone')} value={cgPhone} onChangeText={setCgPhone} placeholder="Phone number" keyboardType="phone-pad" />
          <CuteInput label={t('settings_caregiver_relation')} value={cgRelation} onChangeText={setCgRelation} placeholder={t('settings_caregiver_relation_placeholder')} />
          <View style={styles.formActions}>
            <CuteButton title={t('cancel')} variant="ghost" onPress={() => setShowAddCaregiver(false)} style={{ flex: 1 }} />
            <CuteButton title="✅ Add" variant="primary" onPress={handleAddCaregiver} style={{ flex: 1 }} />
          </View>
        </CuteCard>
      ) : (
        <CuteButton
          title={t('settings_add_caregiver')}
          variant="outline"
          onPress={() => setShowAddCaregiver(true)}
          fullWidth
          style={{ marginTop: SPACING.sm }}
        />
      )}

      {/* App Settings */}
      <Text style={styles.sectionTitle}>{t('settings_app_settings')}</Text>

      <CuteCard onPress={() => navigation.navigate('Language')}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>🌐</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>{t('settings_language')}</Text>
            <Text style={styles.menuDesc}>{t('settings_language_desc')}</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>{t('settings_quick_actions')}</Text>

      <CuteCard onPress={handleExportData}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>📄</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>{t('settings_export')}</Text>
            <Text style={styles.menuDesc}>{t('settings_export_desc')}</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      <CuteCard onPress={handleEmergency}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>🚨</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>{t('settings_emergency')}</Text>
            <Text style={styles.menuDesc}>{t('settings_emergency_desc')}</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      <CuteCard onPress={handleShare}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>💌</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>{t('settings_share')}</Text>
            <Text style={styles.menuDesc}>{t('settings_share_desc')}</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      {/* App Info */}
      <Text style={styles.sectionTitle}>{t('settings_about')}</Text>

      <CuteCard>
        <View style={styles.aboutSection}>
          <LinearGradient
            colors={['#FF6B9D', '#C77DFF']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.aboutLogoBadge}
          >
            <Text style={styles.aboutLogoPaw}>🐾</Text>
            <Text style={styles.aboutLogoLetters}>PP</Text>
          </LinearGradient>
          <Text style={styles.aboutName}>PetPill</Text>
          <Text style={styles.aboutVersion}>{t('settings_version')}</Text>
          <Text style={styles.aboutDesc}>{t('settings_tagline')}</Text>
        </View>
      </CuteCard>

      <CuteCard onPress={() => Linking.openURL('mailto:support@petpill.app')}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>📧</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>{t('settings_support')}</Text>
            <Text style={styles.menuDesc}>support@petpill.app</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      <CuteCard>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>⭐</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>{t('settings_rate')}</Text>
            <Text style={styles.menuDesc}>{t('settings_rate_desc')}</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      {/* Legal */}
      <Text style={styles.sectionTitle}>{t('settings_legal')}</Text>

      <CuteCard onPress={() => navigation.navigate('PrivacyPolicy')}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>🔒</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>{t('settings_privacy')}</Text>
            <Text style={styles.menuDesc}>{t('settings_privacy_desc')}</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      <CuteCard onPress={() => navigation.navigate('Terms')}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>📋</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>{t('settings_terms')}</Text>
            <Text style={styles.menuDesc}>{t('settings_terms_desc')}</Text>
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
  title: {
    fontSize: FONTS.sizes.title,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: SPACING.sm,
    marginBottom: SPACING.lg,
  },

  // ===== PREMIUM CARD =====
  premiumWrapper: {
    borderRadius: 24,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
    shadowColor: '#5B2D8E',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 16,
  },
  premiumCard: {
    borderRadius: 24,
    padding: SPACING.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  blobTL: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(155,79,212,0.3)',
  },
  blobBR: {
    position: 'absolute',
    bottom: -30,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,215,0,0.1)',
  },
  mostPopularBadge: {
    alignSelf: 'center',
    backgroundColor: '#FFD700',
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 4,
    marginBottom: SPACING.md,
  },
  mostPopularText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#2D1B69',
    letterSpacing: 1,
  },
  premiumCrown: { textAlign: 'center', fontSize: 48, marginBottom: 4 },
  premiumTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '900',
    color: '#FFD700',
    letterSpacing: 0.5,
  },
  premiumTagline: {
    textAlign: 'center',
    fontSize: FONTS.sizes.sm,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: SPACING.lg,
    marginTop: 4,
  },

  // Compare box
  compareBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  compareCol: {
    flex: 1,
    padding: SPACING.md,
  },
  compareColPremium: {
    flex: 1,
    padding: SPACING.md,
  },
  compareHeader: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  premiumColHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  compareHeaderPremium: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '900',
    color: '#FFD700',
    textAlign: 'center',
  },
  premiumColBadge: {
    fontSize: 10,
    color: '#FFD700',
    marginLeft: 4,
  },
  compareDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginVertical: SPACING.sm,
  },
  compareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  compareCheckFree: { fontSize: 12, color: 'rgba(255,255,255,0.5)', marginRight: 4, width: 16 },
  compareCheckLocked: { fontSize: 10, marginRight: 4, width: 16 },
  compareCheckPremium: { fontSize: 12, color: '#FFD700', fontWeight: '900', marginRight: 4, width: 16 },
  compareText: { fontSize: 10, color: 'rgba(255,255,255,0.5)', flex: 1 },
  compareTextLocked: { fontSize: 10, color: 'rgba(255,255,255,0.25)', flex: 1 },
  compareTextPremium: { fontSize: 10, color: 'rgba(255,255,255,0.9)', fontWeight: '600', flex: 1 },

  // Extra features chips
  extraFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: SPACING.lg,
  },
  extraFeatureChip: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.3)',
  },
  extraFeatureText: { fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: '600' },

  // Plan selector
  planRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  planOption: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
    position: 'relative',
  },
  planOptionActive: {
    borderColor: '#FFD700',
    backgroundColor: 'rgba(255,215,0,0.12)',
  },
  saveBadge: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#FF6B9D',
    borderRadius: RADIUS.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  saveText: { fontSize: 9, fontWeight: '900', color: '#fff', letterSpacing: 0.5 },
  planPrice: { fontSize: 20, fontWeight: '900', color: '#FFD700', marginTop: 4 },
  planPeriod: { fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  planEquiv: { fontSize: 9, color: 'rgba(255,215,0,0.7)', marginTop: 2 },

  // CTA
  ctaWrapper: { borderRadius: RADIUS.full, overflow: 'hidden', marginBottom: SPACING.md },
  ctaButton: {
    paddingVertical: SPACING.md + 2,
    borderRadius: RADIUS.full,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '900',
    color: '#1a0a3e',
    letterSpacing: 0.5,
  },
  socialProof: {
    textAlign: 'center',
    fontSize: FONTS.sizes.sm,
    color: 'rgba(255,255,255,0.65)',
    marginBottom: 4,
  },
  cancelNote: {
    textAlign: 'center',
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
  },

  // Premium active
  premiumActiveCard: {
    borderRadius: 20,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    shadowColor: '#5B2D8E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  premiumActiveCrown: { fontSize: 40, marginBottom: SPACING.xs },
  premiumActiveTitle: { fontSize: FONTS.sizes.lg, fontWeight: '800', color: '#FFD700', textAlign: 'center' },
  premiumActiveStars: { flexDirection: 'row', marginTop: SPACING.sm, gap: 6 },
  premiumActiveStar: { fontSize: 14, color: '#FFD700' },
  premiumActiveDesc: { fontSize: FONTS.sizes.sm, color: 'rgba(255,255,255,0.7)', marginTop: SPACING.sm },

  // Sections
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SPACING.xl,
    marginBottom: SPACING.xs,
  },
  sectionDesc: { fontSize: FONTS.sizes.md, color: COLORS.textLight, marginBottom: SPACING.md },

  // Caregivers
  caregiverRow: { flexDirection: 'row', alignItems: 'center' },
  cgName: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text },
  cgRelation: { fontSize: FONTS.sizes.sm, color: COLORS.textLight, marginTop: 2 },
  cgPhone: { fontSize: FONTS.sizes.sm, color: COLORS.primary, marginTop: 2 },
  cgDelete: { fontSize: 20, color: COLORS.textMuted, padding: SPACING.sm },
  formTitle: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md },
  formActions: { flexDirection: 'row', gap: SPACING.sm },

  // Menu items
  menuItem: { flexDirection: 'row', alignItems: 'center' },
  menuEmoji: { fontSize: 28, marginRight: SPACING.md },
  menuTitle: { fontSize: FONTS.sizes.lg, fontWeight: '600', color: COLORS.text },
  menuDesc: { fontSize: FONTS.sizes.sm, color: COLORS.textLight, marginTop: 2 },
  menuArrow: { fontSize: 28, color: COLORS.textMuted },

  // About
  aboutSection: { alignItems: 'center', paddingVertical: SPACING.md },
  aboutLogoBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  aboutLogoPaw: { fontSize: 20 },
  aboutLogoLetters: { fontSize: 12, fontWeight: '900', color: '#FFF', letterSpacing: 2 },
  aboutName: { fontSize: FONTS.sizes.xxl, fontWeight: '800', color: COLORS.text, marginTop: SPACING.xs },
  aboutVersion: { fontSize: FONTS.sizes.sm, color: COLORS.textMuted },
  aboutDesc: { fontSize: FONTS.sizes.md, color: COLORS.textLight, textAlign: 'center', marginTop: SPACING.sm },
});

export default SettingsScreen;
