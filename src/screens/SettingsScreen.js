import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Alert, Linking, Share, Modal, FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SPACING, FONTS, RADIUS, SHADOWS } from '../constants/theme';
import CuteCard from '../components/CuteCard';
import CuteButton from '../components/CuteButton';
import CuteInput from '../components/CuteInput';
import { useApp } from '../context/AppContext';
import * as DB from '../database/database';
import { t } from '../i18n/i18n';
import { LANGUAGES } from '../i18n/i18n';
import { playSuccess, playPremium, playTap } from '../utils/sounds';

const SettingsScreen = ({ navigation }) => {
  const { isPremium, activatePremium, pets, refreshAll, language, changeLanguage, soundOn, toggleSound } = useApp();
  const [caregivers, setCaregivers] = useState([]);
  const [showAddCaregiver, setShowAddCaregiver] = useState(false);
  const [cgName, setCgName] = useState('');
  const [cgPhone, setCgPhone] = useState('');
  const [cgRelation, setCgRelation] = useState('');
  const [showLangModal, setShowLangModal] = useState(false);

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
      Alert.alert(t('oops'), t('enter_name'));
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
      playSuccess();
      Alert.alert(`${t('caregiver_added')} 👨‍👩‍👧`, `${cgName} ${t('has_been_added')}`);
    } catch (e) { console.error(e); }
  };

  const handleDeleteCaregiver = (cg) => {
    Alert.alert(`${t('remove')} ${cg.name}?`, t('remove_caregiver_msg'), [
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
    // Instant premium activation - no payment flow
    playPremium();
    activatePremium();
    Alert.alert(`${t('welcome_premium')} 🎉`, t('premium_activated'));
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${t('share_message')} 🐾💊`,
      });
    } catch (e) { console.error(e); }
  };

  const handleExportData = () => {
    Alert.alert(
      `${t('export_pet_data')} 📄`,
      t('export_description'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: `📄 ${t('export_pdf')}`,
          onPress: () => {
            Alert.alert(t('coming_soon'), t('pdf_coming_soon'));
          },
        },
      ]
    );
  };

  const handleEmergency = () => {
    Alert.alert(
      `🚨 ${t('emergency_numbers')}`,
      t('emergency_numbers_body'),
      [
        { text: t('close') },
        { text: `📞 ${t('call_aspca_btn')}`, onPress: () => Linking.openURL('tel:8884264435') },
      ]
    );
  };

  const handleLanguageSelect = (langCode) => {
    changeLanguage(langCode);
    playTap();
    setShowLangModal(false);
  };

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('settings')} ⚙️</Text>

      {/* Premium Banner */}
      {!isPremium && (
        <CuteCard
          variant="pink"
          onPress={handleUpgrade}
          style={styles.premiumCard}
        >
          <Text style={styles.premiumEmoji}>🌟</Text>
          <Text style={styles.premiumTitle}>{t('upgrade_premium')}</Text>
          <Text style={styles.premiumDesc}>{t('premium_desc')}</Text>
          <View style={styles.premiumPrice}>
            <Text style={styles.premiumPriceText}>{t('premium_price')}</Text>
          </View>
        </CuteCard>
      )}

      {isPremium && (
        <CuteCard variant="mint">
          <Text style={{ textAlign: 'center', fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text }}>
            🌟 {t('premium_active')}
          </Text>
        </CuteCard>
      )}

      {/* Language Selector */}
      <Text style={styles.sectionTitle}>{t('language')} 🌍</Text>
      <CuteCard onPress={() => setShowLangModal(true)}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>{currentLang.flag}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>{t('select_language')}</Text>
            <Text style={styles.menuDesc}>{currentLang.nativeName}</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      {/* Sound Toggle */}
      <TouchableOpacity onPress={() => { toggleSound(); playTap(); }}>
        <CuteCard>
          <View style={styles.menuItem}>
            <Text style={styles.menuEmoji}>{soundOn ? '🔊' : '🔇'}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuTitle}>{t('sound_effects')}</Text>
              <Text style={styles.menuDesc}>{soundOn ? 'ON' : 'OFF'}</Text>
            </View>
            <View style={[styles.toggleSwitch, soundOn && styles.toggleSwitchOn]}>
              <View style={[styles.toggleKnob, soundOn && styles.toggleKnobOn]} />
            </View>
          </View>
        </CuteCard>
      </TouchableOpacity>

      {/* Caregivers */}
      <Text style={styles.sectionTitle}>{t('caregivers')} 👨‍👩‍👧</Text>
      <Text style={styles.sectionDesc}>{t('caregivers_desc')}</Text>

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
          <Text style={styles.formTitle}>{t('add_caregiver')}</Text>
          <CuteInput label={t('name')} value={cgName} onChangeText={setCgName} placeholder={t('name')} required />
          <CuteInput label={t('phone')} value={cgPhone} onChangeText={setCgPhone} placeholder={t('phone_placeholder')} keyboardType="phone-pad" />
          <CuteInput label={t('relationship')} value={cgRelation} onChangeText={setCgRelation} placeholder={t('relationship_placeholder')} />
          <View style={styles.formActions}>
            <CuteButton title={t('cancel')} variant="ghost" onPress={() => setShowAddCaregiver(false)} style={{ flex: 1 }} />
            <CuteButton title={`✅ ${t('add')}`} variant="primary" onPress={handleAddCaregiver} style={{ flex: 1 }} />
          </View>
        </CuteCard>
      ) : (
        <CuteButton
          title={t('add_caregiver')}
          variant="outline"
          onPress={() => setShowAddCaregiver(true)}
          fullWidth
          style={{ marginTop: SPACING.sm }}
        />
      )}

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>{t('quick_actions')} 🚀</Text>

      <CuteCard onPress={handleExportData}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>📄</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>{t('export_health_report')}</Text>
            <Text style={styles.menuDesc}>{t('generate_pdf')}</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      <CuteCard onPress={handleEmergency}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>🚨</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>{t('emergency_contacts')}</Text>
            <Text style={styles.menuDesc}>{t('poison_hotline')}</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      <CuteCard onPress={handleShare}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>💌</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>{t('share_petpill')}</Text>
            <Text style={styles.menuDesc}>{t('tell_friends')}</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      {/* App Info */}
      <Text style={styles.sectionTitle}>{t('about')} 💝</Text>

      <CuteCard>
        <View style={styles.aboutSection}>
          <Text style={styles.aboutLogo}>💊🐾</Text>
          <Text style={styles.aboutName}>PetPill</Text>
          <Text style={styles.aboutVersion}>{t('version')} 1.2.0</Text>
          <Text style={styles.aboutDesc}>{t('made_with_love')} 💕</Text>
        </View>
      </CuteCard>

      <CuteCard onPress={() => Linking.openURL('mailto:support@petpill.app')}>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>📧</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>{t('contact_support')}</Text>
            <Text style={styles.menuDesc}>support@petpill.app</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      <CuteCard>
        <View style={styles.menuItem}>
          <Text style={styles.menuEmoji}>⭐</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>{t('rate_petpill')}</Text>
            <Text style={styles.menuDesc}>{t('help_more_pets')}</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      </CuteCard>

      <View style={{ height: 100 }} />

      {/* Language Modal */}
      <Modal visible={showLangModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('select_language')} 🌍</Text>
            <FlatList
              data={LANGUAGES}
              keyExtractor={item => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.langItem, language === item.code && styles.langItemActive]}
                  onPress={() => handleLanguageSelect(item.code)}
                >
                  <Text style={styles.langFlag}>{item.flag}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.langName, language === item.code && styles.langNameActive]}>{item.nativeName}</Text>
                    <Text style={styles.langEnglish}>{item.name}</Text>
                  </View>
                  {language === item.code && <Text style={styles.langCheck}>✓</Text>}
                </TouchableOpacity>
              )}
            />
            <CuteButton title={t('close')} variant="ghost" onPress={() => setShowLangModal(false)} fullWidth style={{ marginTop: SPACING.md }} />
          </View>
        </View>
      </Modal>
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
  premiumPrice: { marginTop: SPACING.md, backgroundColor: COLORS.primary, paddingHorizontal: SPACING.xl, paddingVertical: SPACING.sm, borderRadius: RADIUS.full },
  premiumPriceText: { color: COLORS.white, fontWeight: '800', fontSize: FONTS.sizes.lg },
  sectionTitle: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.text, marginTop: SPACING.xl, marginBottom: SPACING.xs },
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
  toggleSwitch: { width: 50, height: 28, borderRadius: 14, backgroundColor: COLORS.border, padding: 2, justifyContent: 'center' },
  toggleSwitchOn: { backgroundColor: COLORS.primary },
  toggleKnob: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.white },
  toggleKnobOn: { alignSelf: 'flex-end' },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: COLORS.white, borderTopLeftRadius: RADIUS.xxl, borderTopRightRadius: RADIUS.xxl, padding: SPACING.xl, maxHeight: '70%' },
  modalTitle: { fontSize: FONTS.sizes.xxl, fontWeight: '800', color: COLORS.text, textAlign: 'center', marginBottom: SPACING.lg },
  langItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.md, paddingHorizontal: SPACING.md, borderRadius: RADIUS.lg, marginBottom: SPACING.xs },
  langItemActive: { backgroundColor: COLORS.primarySoft, borderWidth: 1, borderColor: COLORS.primary },
  langFlag: { fontSize: 28, marginRight: SPACING.md },
  langName: { fontSize: FONTS.sizes.lg, fontWeight: '600', color: COLORS.text },
  langNameActive: { color: COLORS.primary, fontWeight: '700' },
  langEnglish: { fontSize: FONTS.sizes.sm, color: COLORS.textLight },
  langCheck: { fontSize: 20, color: COLORS.primary, fontWeight: '700' },
});

export default SettingsScreen;
