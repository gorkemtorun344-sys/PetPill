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
      Alert.alert('Permission Needed', 'Please allow access to your photo library to add a pet photo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      setPhoto(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Needed', 'Please allow camera access to take a pet photo.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handlePhotoPress = () => {
    Alert.alert('Add Photo 📸', 'Choose an option', [
      { text: '📷 Take Photo', onPress: takePhoto },
      { text: '🖼️ Choose from Library', onPress: pickImage },
      photo ? { text: '🗑️ Remove Photo', style: 'destructive', onPress: () => setPhoto('') } : null,
      { text: 'Cancel', style: 'cancel' },
    ].filter(Boolean));
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Oops! 🐾', 'Please give your pet a name!');
      return;
    }
    if (!species) {
      Alert.alert('Oops! 🐾', 'Please select what type of pet they are!');
      return;
    }

    setSaving(true);
    try {
      const petData = {
        name: name.trim(),
        species,
        breed: breed.trim(),
        age_years: parseInt(ageYears) || 0,
        age_months: parseInt(ageMonths) || 0,
        weight: parseFloat(weight) || 0,
        weight_unit: weightUnit,
        gender,
        photo,
        color: color.trim(),
        microchip_id: microchipId.trim(),
        notes: notes.trim(),
      };

      if (editPet) {
        await DB.updatePet(editPet.id, petData);
      } else {
        await DB.addPet(petData);
      }

      await loadPets();
      Alert.alert(
        editPet ? 'Updated! 🎉' : 'Welcome! 🎉',
        editPet ? `${name}'s profile has been updated!` : `${name} has been added to your family!`,
        [{ text: 'Yay! 🐾', onPress: () => navigation.goBack() }]
      );
    } catch (e) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        {/* Photo Picker */}
        <TouchableOpacity style={styles.photoContainer} onPress={handlePhotoPress}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoEmoji}>📷</Text>
              <Text style={styles.photoText}>Add Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Basic Info */}
        <Text style={styles.sectionTitle}>Basic Info 🐾</Text>

        <CuteInput
          label="Pet Name"
          icon="✨"
          value={name}
          onChangeText={setName}
          placeholder="What's your pet's name?"
          required
        />

        {/* Species Selector */}
        <Text style={styles.fieldLabel}>🐾 Type of Pet *</Text>
        <View style={styles.speciesGrid}>
          {PET_TYPES.map(type => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.speciesBtn,
                species === type.id && styles.speciesBtnActive,
              ]}
              onPress={() => setSpecies(type.id)}
            >
              <Text style={styles.speciesEmoji}>{type.emoji}</Text>
              <Text style={[
                styles.speciesLabel,
                species === type.id && styles.speciesLabelActive,
              ]}>{type.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <CuteInput
          label="Breed"
          icon="🏷️"
          value={breed}
          onChangeText={setBreed}
          placeholder="e.g., Golden Retriever, Persian"
        />

        {/* Gender */}
        <Text style={styles.fieldLabel}>⚧ Gender</Text>
        <View style={styles.genderRow}>
          {['Male', 'Female', 'Unknown'].map(g => (
            <TouchableOpacity
              key={g}
              style={[styles.genderBtn, gender === g && styles.genderBtnActive]}
              onPress={() => setGender(g)}
            >
              <Text style={[styles.genderText, gender === g && styles.genderTextActive]}>
                {g === 'Male' ? '♂️' : g === 'Female' ? '♀️' : '❓'} {g}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Age */}
        <Text style={styles.sectionTitle}>Age & Weight 📊</Text>
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <CuteInput
              label="Years"
              icon="🎂"
              value={ageYears}
              onChangeText={setAgeYears}
              placeholder="0"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.halfInput}>
            <CuteInput
              label="Months"
              icon="📅"
              value={ageMonths}
              onChangeText={setAgeMonths}
              placeholder="0"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 2 }}>
            <CuteInput
              label="Weight"
              icon="⚖️"
              value={weight}
              onChangeText={setWeight}
              placeholder="0"
              keyboardType="decimal-pad"
            />
          </View>
          <View style={styles.unitToggle}>
            <TouchableOpacity
              style={[styles.unitBtn, weightUnit === 'lbs' && styles.unitBtnActive]}
              onPress={() => setWeightUnit('lbs')}
            >
              <Text style={[styles.unitText, weightUnit === 'lbs' && styles.unitTextActive]}>lbs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.unitBtn, weightUnit === 'kg' && styles.unitBtnActive]}
              onPress={() => setWeightUnit('kg')}
            >
              <Text style={[styles.unitText, weightUnit === 'kg' && styles.unitTextActive]}>kg</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Extra Details */}
        <Text style={styles.sectionTitle}>Extra Details 📝</Text>

        <CuteInput
          label="Color / Markings"
          icon="🎨"
          value={color}
          onChangeText={setColor}
          placeholder="e.g., Golden, Black & White"
        />

        <CuteInput
          label="Microchip ID"
          icon="🔖"
          value={microchipId}
          onChangeText={setMicrochipId}
          placeholder="Optional"
        />

        <CuteInput
          label="Notes"
          icon="📝"
          value={notes}
          onChangeText={setNotes}
          placeholder="Allergies, special needs, favorite treats..."
          multiline
          numberOfLines={3}
        />

        {/* Save Button */}
        <CuteButton
          title={editPet ? '✅ Update Pet' : '🐾 Add Pet to Family'}
          onPress={handleSave}
          loading={saving}
          fullWidth
          size="large"
          style={styles.saveBtn}
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
  },
  photoContainer: {
    alignSelf: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.sm,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: COLORS.primaryLight,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 3,
    borderColor: COLORS.primaryLight,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoEmoji: {
    fontSize: 32,
  },
  photoText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
    marginTop: SPACING.md,
  },
  fieldLabel: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  speciesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  speciesBtn: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    minWidth: 80,
  },
  speciesBtnActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primarySoft,
  },
  speciesEmoji: {
    fontSize: 24,
  },
  speciesLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 2,
  },
  speciesLabelActive: {
    color: COLORS.primary,
  },
  genderRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  genderBtnActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primarySoft,
  },
  genderText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  genderTextActive: {
    color: COLORS.primary,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  halfInput: {
    flex: 1,
  },
  unitToggle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  unitBtn: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  unitBtnActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  unitText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  unitTextActive: {
    color: COLORS.white,
  },
  saveBtn: {
    marginTop: SPACING.xl,
  },
});

export default AddPetScreen;
