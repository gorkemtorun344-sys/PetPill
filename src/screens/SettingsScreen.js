import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Alert, Linking, Share, Animated,
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
    Alert.alert(
      t('settings_upgrade_title'),
      t('settings_upgrade_msg'),
      [
        { text: t('settings_maybe_later'), style: 'cancel' },
        {
          text: t('settings_upgrade_btn'),
          onPress: () => {
            // In production: integrate with App Store / Google Play billing
            setIsPremium(true);
            Alert.alert('Welcome to Premium! 🎉', t('settings_welcome_premium'));
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
        { text: t('cancel'), style: 'cancel' },
        {
          text: '📄 Export PDF',
          onPress: () => {
            Alert.alert(t('coming_soon'), t('settings_export_coming'));
          },
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

      {/* Premium Banner */}
      {!isPremium && (
        <TouchableOpacity onPress={handleUpgrade} activeOpacity={0.9} style={styles.premiumCardWrapper}>
          <LinearGradient
            colors={['#1a1a2e', '#16213e', '#0f3460']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.premiumCard}
          >
            {/* Stars decoration */}
            <Text style={styles.premiumStarTL}>✦</Text>
            <Text style={styles.premiumStarTR}>✦</Text>
            <Text style={styles.premiumStarBL}>✦</Text>
            <View style={styles.premiumInner}>
              <Text style={styles.premiumCrown}>👑</Text>
              <Text style={styles.premiumTitle}>{t('settings_premium_title')}</Text>
              <Text style={styles.premiumDesc}>{t('settings_premium_desc')}</Text>
              <LinearGradient
                colors={['#FFD700', '#FFA500', '#FFD700']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.premiumPriceBadge}
              >
                <Text style={styles.premiumPriceText}>{t('settings_premium_price')}</Text>
              </LinearGradient>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {isPremium && (
        <LinearGradient
          colors={['#1a1a2e', '#16213e', '#0f3460']}
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
        </LinearGradient>
      )}

      {/* Caregivers */}
      <Text style={styles.sectionTitle}>{t('settings_caregivers')}</Text>
      <Text style={styles.sectionDesc}>
        {t('settings_caregivers_desc')}
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
          <Text style={styles.aboutLogo}>💊🐾</Text>
          <Text style={styles.aboutName}>PetPill</Text>
          <Text style={styles.aboutVersion}>{t('settings_version')}</Text>
          <Text style={styles.aboutDesc}>
            {t('settings_tagline')}
          </Text>
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
  title: { fontSize: FONTS.sizes.title, fontWeight: '800', color: COLORS.text, marginTop: SPACING.sm, marginBottom: SPACING.lg },
  premiumCardWrapper: { borderRadius: 20, marginBottom: SPACING.lg, overflow: 'hidden' },
  premiumCard: {
    borderRadius: 20,
    padding: SPACING.xl,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  premiumInner: { alignItems: 'center' },
  premiumCrown: { fontSize: 52, marginBottom: SPACING.sm },
  premiumStarTL: { position: 'absolute', top: 12, left: 16, fontSize: 14, color: '#FFD700', opacity: 0.7 },
  premiumStarTR: { position: 'absolute', top: 8, right: 20, fontSize: 20, color: '#FFD700', opacity: 0.5 },
  premiumStarBL: { position: 'absolute', bottom: 12, left: 30, fontSize: 10, color: '#FFD700', opacity: 0.6 },
  premiumTitle: { fontSize: FONTS.sizes.xl, fontWeight: '900', color: '#FFD700', textAlign: 'center', letterSpacing: 0.5 },
  premiumDesc: { fontSize: FONTS.sizes.md, color: 'rgba(255,255,255,0.75)', textAlign: 'center', marginTop: SPACING.sm },
  premiumPriceBadge: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.xl * 1.5,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.full,
  },
  premiumPriceText: { color: '#1a1a2e', fontWeight: '900', fontSize: FONTS.sizes.lg, letterSpacing: 0.5 },
  premiumActiveCard: {
    borderRadius: 20,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  premiumActiveCrown: { fontSize: 40, marginBottom: SPACING.xs },
  premiumActiveTitle: { fontSize: FONTS.sizes.lg, fontWeight: '800', color: '#FFD700', textAlign: 'center' },
  premiumActiveStars: { flexDirection: 'row', marginTop: SPACING.sm, gap: 6 },
  premiumActiveStar: { fontSize: 14, color: '#FFD700' },
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
