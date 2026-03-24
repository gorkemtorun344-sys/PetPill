import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Alert, Image, KeyboardAvoidingView, Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SPACING, FONTS, RADIUS, SHADOWS, PET_TYPES } from '../constants/theme';
import CuteInput from '../components/CuteInput';
import CuteButton from '../components/CuteButton';
import { useApp } from '../context/AppContext';
import * as DB from '../database/database';
import { t } from '../i18n/i18n';
import { playSuccess, playTap } from '../utils/sounds';

const AddPetScreen = ({ navigation, route }) => {
  const editPet = route?.params?.pet;
  const { loadPets } = useApp();

  const [name, setName] = useState(editPet?.name || '');
  const [species, setSpecies] = useState(editPet?.species || '');
  const [breed, setBreed] = useState(editPet?.breed || '');
  const [ageYears, setAgeYears] = useState(editPet?.age_years?.toString() || '');
  const [ageMonths, setAgeMonths] = useState(editPet?.age_months?.toString() || '');
  const [weight, setWeight] = useState(editPet?.weight?.toString() || '');
  const [weightUnit, setWeightUnit] = useState(editPet?.weight_unit || 'lbs');
  const [gender, setGender] = useState(editPet?.gender || '');
  const [color, setColor] = useState(editPet?.color || '');
  const [microchipId, setMicrochipId] = useState(editPet?.microchip_id || '');
  const [photo, setPhoto] = useState(editPet?.photo || '');
  const [notes, setNotes] = useState(editPet?.notes || '');
  const [saving, setSaving] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('permission_needed'), t('photo_library_permission'));
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true, aspect: [1, 1], quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) setPhoto(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('permission_needed'), t('camera_permission'));
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 });
    if (!result.canceled && result.assets[0]) setPhoto(result.assets[0].uri);
  };

  const handlePhotoPress = () => {
    Alert.alert(`${t('add_photo')} 📸`, '', [
      { text: `📷 ${t('take_photo')}`, onPress: takePhoto },
      { text: `🖼️ ${t('choose_from_library')}`, onPress: pickImage },
      photo ? { text: `🗑️ ${t('remove_photo')}`, style: 'destructive', onPress: () => setPhoto('') } : null,
      { text: t('cancel'), style: 'cancel' },
    ].filter(Boolean));
  };

  const handleSave = async () => {
    if (!name.trim()) { Alert.alert(`${t('oops')} 🐾`, t('give_pet_name')); return; }
    if (!species) { Alert.alert(`${t('oops')} 🐾`, t('select_pet_type')); return; }

    setSaving(true);
    try {
      const petData = {
        name: name.trim(), species, breed: breed.trim(),
        age_years: parseInt(ageYears) || 0, age_months: parseInt(ageMonths) || 0,
        weight: parseFloat(weight) || 0, weight_unit: weightUnit, gender, photo,
        color: color.trim(), microchip_id: microchipId.trim(), notes: notes.trim(),
      };

      if (editPet) { await DB.updatePet(editPet.id, petData); }
      else { await DB.addPet(petData); }

      await loadPets();
      playSuccess();
      Alert.alert(
        editPet ? `${t('updated')} 🎉` : `${t('welcome')} 🎉`,
        editPet ? `${name}${t('profile_updated')}` : `${name} ${t('added_to_family')}`,
        [{ text: `${t('yay')} 🐾`, onPress: () => navigation.goBack() }]
      );
    } catch (e) {
      Alert.alert(t('error'), t('something_went_wrong'));
      console.error(e);
    } finally { setSaving(false); }
  };

  const genderOptions = [
    { key: 'Male', label: t('male'), icon: '♂️' },
    { key: 'Female', label: t('female'), icon: '♀️' },
    { key: 'Unknown', label: t('unknown'), icon: '❓' },
  ];

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.photoContainer} onPress={handlePhotoPress}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoEmoji}>📷</Text>
              <Text style={styles.photoText}>{t('add_photo')}</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>{t('basic_info')} 🐾</Text>
        <CuteInput label={t('pet_name')} icon="✨" value={name} onChangeText={setName} placeholder={t('whats_pet_name')} required />

        <Text style={styles.fieldLabel}>🐾 {t('type_of_pet')} *</Text>
        <View style={styles.speciesGrid}>
          {PET_TYPES.map(type => (
            <TouchableOpacity key={type.id} style={[styles.speciesBtn, species === type.id && styles.speciesBtnActive]} onPress={() => { setSpecies(type.id); playTap(); }}>
              <Text style={styles.speciesEmoji}>{type.emoji}</Text>
              <Text style={[styles.speciesLabel, species === type.id && styles.speciesLabelActive]}>{t(type.id)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <CuteInput label={t('breed')} icon="🏷️" value={breed} onChangeText={setBreed} placeholder={t('breed_placeholder')} />

        <Text style={styles.fieldLabel}>⚧ {t('gender')}</Text>
        <View style={styles.genderRow}>
          {genderOptions.map(g => (
            <TouchableOpacity key={g.key} style={[styles.genderBtn, gender === g.key && styles.genderBtnActive]} onPress={() => { setGender(g.key); playTap(); }}>
              <Text style={[styles.genderText, gender === g.key && styles.genderTextActive]}>{g.icon} {g.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>{t('age_weight')} 📊</Text>
        <View style={styles.row}>
          <View style={styles.halfInput}><CuteInput label={t('years')} icon="🎂" value={ageYears} onChangeText={setAgeYears} placeholder="0" keyboardType="numeric" /></View>
          <View style={styles.halfInput}><CuteInput label={t('months')} icon="📅" value={ageMonths} onChangeText={setAgeMonths} placeholder="0" keyboardType="numeric" /></View>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 2 }}><CuteInput label={t('weight')} icon="⚖️" value={weight} onChangeText={setWeight} placeholder="0" keyboardType="decimal-pad" /></View>
          <View style={styles.unitToggle}>
            {['lbs', 'kg'].map(u => (
              <TouchableOpacity key={u} style={[styles.unitBtn, weightUnit === u && styles.unitBtnActive]} onPress={() => setWeightUnit(u)}>
                <Text style={[styles.unitText, weightUnit === u && styles.unitTextActive]}>{u}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>{t('extra_details')} 📝</Text>
        <CuteInput label={t('color_markings')} icon="🎨" value={color} onChangeText={setColor} placeholder={t('color_placeholder')} />
        <CuteInput label={t('microchip_id')} icon="🔖" value={microchipId} onChangeText={setMicrochipId} placeholder={t('optional')} />
        <CuteInput label={t('notes')} icon="📝" value={notes} onChangeText={setNotes} placeholder={t('notes_placeholder')} multiline numberOfLines={3} />

        <CuteButton
          title={editPet ? `✅ ${t('update_pet')}` : `🐾 ${t('add_pet_to_family')}`}
          onPress={handleSave} loading={saving} fullWidth size="large" style={styles.saveBtn}
        />
        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg },
  photoContainer: { alignSelf: 'center', marginBottom: SPACING.xl, marginTop: SPACING.sm },
  photo: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: COLORS.primaryLight },
  photoPlaceholder: { width: 120, height: 120, borderRadius: 60, backgroundColor: COLORS.primarySoft, borderWidth: 3, borderColor: COLORS.primaryLight, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
  photoEmoji: { fontSize: 32 },
  photoText: { fontSize: FONTS.sizes.sm, color: COLORS.primary, fontWeight: '600', marginTop: 4 },
  sectionTitle: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md, marginTop: SPACING.md },
  fieldLabel: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.text, marginBottom: SPACING.sm },
  speciesGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: SPACING.lg, gap: SPACING.sm },
  speciesBtn: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md, borderRadius: RADIUS.lg, backgroundColor: COLORS.white, borderWidth: 2, borderColor: COLORS.border, alignItems: 'center', minWidth: 80 },
  speciesBtnActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primarySoft },
  speciesEmoji: { fontSize: 24 },
  speciesLabel: { fontSize: FONTS.sizes.xs, color: COLORS.textLight, fontWeight: '600', marginTop: 2 },
  speciesLabelActive: { color: COLORS.primary },
  genderRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.lg },
  genderBtn: { flex: 1, paddingVertical: SPACING.md, borderRadius: RADIUS.lg, backgroundColor: COLORS.white, borderWidth: 2, borderColor: COLORS.border, alignItems: 'center' },
  genderBtnActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primarySoft },
  genderText: { fontSize: FONTS.sizes.md, color: COLORS.textLight, fontWeight: '600' },
  genderTextActive: { color: COLORS.primary },
  row: { flexDirection: 'row', gap: SPACING.md },
  halfInput: { flex: 1 },
  unitToggle: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, marginBottom: SPACING.lg },
  unitBtn: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.lg, borderRadius: RADIUS.full, backgroundColor: COLORS.white, borderWidth: 2, borderColor: COLORS.border },
  unitBtnActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primary },
  unitText: { fontSize: FONTS.sizes.md, fontWeight: '700', color: COLORS.textLight },
  unitTextActive: { color: COLORS.white },
  saveBtn: { marginTop: SPACING.xl },
});

export default AddPetScreen;
