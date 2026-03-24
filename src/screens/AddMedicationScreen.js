import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { COLORS, SPACING, FONTS, RADIUS, FREQUENCY_OPTIONS, COMMON_MEDICATIONS } from '../constants/theme';
import CuteInput from '../components/CuteInput';
import CuteButton from '../components/CuteButton';
import CuteCard from '../components/CuteCard';
import { useApp } from '../context/AppContext';
import * as DB from '../database/database';
import { scheduleNotificationsForMedication } from '../utils/notifications';
import { t } from '../i18n/i18n';
import { playSuccess, playTap } from '../utils/sounds';
import { logError } from '../utils/logger';

const AddMedicationScreen = ({ navigation, route }) => {
  const preselectedPetId = route?.params?.petId;
  const { pets, refreshAll, language } = useApp();

  const [selectedPetId, setSelectedPetId] = useState(preselectedPetId || null);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [dosageUnit, setDosageUnit] = useState('mg');
  const [frequency, setFrequency] = useState('once_daily');
  const [timesOfDay, setTimesOfDay] = useState(['08:00']);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [refillAt, setRefillAt] = useState('5');
  const [category, setCategory] = useState('');
  const [withFood, setWithFood] = useState(false);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => { if (!selectedPetId && pets.length === 1) setSelectedPetId(pets[0].id); }, [pets]);

  const filteredSuggestions = name.length >= 2 ? COMMON_MEDICATIONS.filter(m => m.name.toLowerCase().includes(name.toLowerCase())).slice(0, 5) : [];

  const handleSelectSuggestion = (med) => { setName(med.name); setCategory(med.category); setShowSuggestions(false); playTap(); };

  const getTimesForFrequency = (freq) => {
    switch (freq) { case 'twice_daily': return ['08:00', '20:00']; case 'three_daily': return ['08:00', '14:00', '20:00']; default: return ['08:00']; }
  };

  const handleFrequencyChange = (freq) => { setFrequency(freq); setTimesOfDay(getTimesForFrequency(freq)); playTap(); };

  const updateTime = (index, value) => { const cleaned = value.replace(/[^0-9:]/g, ''); const newTimes = [...timesOfDay]; newTimes[index] = cleaned; setTimesOfDay(newTimes); };

  const freqLabels = {
    once_daily: t('once_daily'), twice_daily: t('twice_daily'), three_daily: t('three_daily'),
    every_other_day: t('every_other_day'), weekly: t('weekly'), biweekly: t('biweekly'), monthly: t('monthly'),
  };

  const handleSave = async () => {
    if (!selectedPetId) { Alert.alert(`${t('oops')} 🐾`, t('select_pet_error')); return; }
    if (!name.trim()) { Alert.alert(`${t('oops')} 💊`, t('enter_med_name')); return; }
    setSaving(true);
    try {
      const supply = parseInt(totalSupply) || 0;
      await DB.addMedication({
        pet_id: selectedPetId, name: name.trim(), dosage: dosage.trim(), dosage_unit: dosageUnit,
        frequency, times_of_day: timesOfDay, start_date: startDate, end_date: endDate,
        total_supply: supply, remaining_supply: supply, refill_reminder_at: parseInt(refillAt) || 5,
        category, with_food: withFood ? 1 : 0, notes: notes.trim(),
      });
      const pet = pets.find(p => p.id === selectedPetId);
      if (pet) {
        const savedMed = { id: await DB.getLastMedicationId(), name: name.trim(), dosage: dosage.trim(), dosage_unit: dosageUnit, frequency, times_of_day: timesOfDay, start_date: startDate, end_date: endDate, with_food: withFood ? 1 : 0 };
        await scheduleNotificationsForMedication(savedMed, pet);
      }
      await refreshAll();
      playSuccess();
      Alert.alert(`${t('medication_added')} 💊`, t('reminders_scheduled'), [{ text: `${t('great')} ✨`, onPress: () => navigation.goBack() }]);
    } catch (e) {
      Alert.alert(t('error'), t('failed_save_med'));
      logError('Error saving medication', e);
    } finally { setSaving(false); }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>{t('select_pet')} 🐾</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.petScroller}>
          {pets.map(pet => (
            <TouchableOpacity key={pet.id} style={[styles.petChip, selectedPetId === pet.id && styles.petChipActive]} onPress={() => { setSelectedPetId(pet.id); playTap(); }}>
              <Text style={styles.petChipEmoji}>{pet.species === 'dog' ? '🐶' : pet.species === 'cat' ? '🐱' : '🐾'}</Text>
              <Text style={[styles.petChipText, selectedPetId === pet.id && styles.petChipTextActive]}>{pet.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>{t('medication_info')} 💊</Text>
        <CuteInput label={t('medication_name')} icon="💊" value={name} onChangeText={(val) => { setName(val); setShowSuggestions(val.length >= 2); }} placeholder={t('med_name_placeholder')} required />

        {showSuggestions && filteredSuggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {filteredSuggestions.map((med, i) => (
              <TouchableOpacity key={i} style={styles.suggestionItem} onPress={() => handleSelectSuggestion(med)}>
                <Text style={styles.suggestionName}>{med.name}</Text>
                <Text style={styles.suggestionCat}>{med.category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {category ? <View style={styles.categorySelected}><Text style={styles.categorySelectedText}>📂 {category}</Text></View> : null}

        <View style={styles.row}>
          <View style={{ flex: 2 }}><CuteInput label={t('dosage_label')} icon="📏" value={dosage} onChangeText={setDosage} placeholder="e.g., 25" keyboardType="decimal-pad" /></View>
          <View style={styles.unitPicker}>
            {['mg', 'ml', 'tablet', 'drops'].map(unit => (
              <TouchableOpacity key={unit} style={[styles.unitBtn, dosageUnit === unit && styles.unitBtnActive]} onPress={() => setDosageUnit(unit)}>
                <Text style={[styles.unitText, dosageUnit === unit && styles.unitTextActive]}>{unit}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.fieldLabel}>⏰ {t('frequency_label')}</Text>
        <View style={styles.freqGrid}>
          {FREQUENCY_OPTIONS.filter(f => f.id !== 'custom').map(freq => (
            <TouchableOpacity key={freq.id} style={[styles.freqBtn, frequency === freq.id && styles.freqBtnActive]} onPress={() => handleFrequencyChange(freq.id)}>
              <Text style={[styles.freqText, frequency === freq.id && styles.freqTextActive]}>{freqLabels[freq.id] || freq.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.fieldLabel}>🕐 {t('times_of_day')}</Text>
        {timesOfDay.map((time, index) => <CuteInput key={index} value={time} onChangeText={(val) => updateTime(index, val)} placeholder="HH:MM (e.g., 08:00)" keyboardType="numbers-and-punctuation" />)}

        <Text style={styles.sectionTitle}>{t('duration')} 📅</Text>
        <View style={styles.row}>
          <View style={{ flex: 1 }}><CuteInput label={t('start_date')} icon="📅" value={startDate} onChangeText={setStartDate} placeholder="YYYY-MM-DD" /></View>
          <View style={{ flex: 1 }}><CuteInput label={t('end_date')} icon="🏁" value={endDate} onChangeText={setEndDate} placeholder="YYYY-MM-DD" helper={t('leave_empty_ongoing')} /></View>
        </View>

        <Text style={styles.sectionTitle}>{t('supply_tracking')} 📦</Text>
        <View style={styles.row}>
          <View style={{ flex: 1 }}><CuteInput label={t('total_supply')} icon="📦" value={totalSupply} onChangeText={setTotalSupply} placeholder="e.g., 30" keyboardType="numeric" helper={t('number_of_doses')} /></View>
          <View style={{ flex: 1 }}><CuteInput label={t('remind_refill_at')} icon="🔔" value={refillAt} onChangeText={setRefillAt} placeholder="5" keyboardType="numeric" helper={t('doses_remaining')} /></View>
        </View>

        <Text style={styles.sectionTitle}>{t('special_instructions')} 📝</Text>
        <TouchableOpacity style={[styles.toggleRow, withFood && styles.toggleRowActive]} onPress={() => setWithFood(!withFood)}>
          <Text style={styles.toggleEmoji}>🍽️</Text>
          <Text style={styles.toggleText}>{t('give_with_food_toggle')}</Text>
          <View style={[styles.toggleSwitch, withFood && styles.toggleSwitchOn]}><View style={[styles.toggleKnob, withFood && styles.toggleKnobOn]} /></View>
        </TouchableOpacity>
        <CuteInput label={t('notes')} icon="📝" value={notes} onChangeText={setNotes} placeholder={t('med_notes_placeholder')} multiline numberOfLines={3} />

        <CuteButton title={`💊 ${t('add_medication_btn')}`} onPress={handleSave} loading={saving} fullWidth size="large" style={styles.saveBtn} />
        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg },
  sectionTitle: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md, marginTop: SPACING.md },
  fieldLabel: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.text, marginBottom: SPACING.sm },
  petScroller: { marginBottom: SPACING.lg },
  petChip: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.sm, paddingHorizontal: SPACING.lg, borderRadius: RADIUS.full, backgroundColor: COLORS.white, borderWidth: 2, borderColor: COLORS.border, marginRight: SPACING.sm },
  petChipActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primarySoft },
  petChipEmoji: { fontSize: 20, marginRight: SPACING.xs },
  petChipText: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.textLight },
  petChipTextActive: { color: COLORS.primary },
  suggestionsContainer: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, marginTop: -SPACING.md, marginBottom: SPACING.md, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden' },
  suggestionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  suggestionName: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.text },
  suggestionCat: { fontSize: FONTS.sizes.xs, color: COLORS.secondary, fontWeight: '500' },
  categorySelected: { alignSelf: 'flex-start', backgroundColor: COLORS.secondaryLight, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: RADIUS.sm, marginBottom: SPACING.md },
  categorySelectedText: { fontSize: FONTS.sizes.sm, color: COLORS.secondary, fontWeight: '600' },
  row: { flexDirection: 'row', gap: SPACING.md },
  unitPicker: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.lg },
  unitBtn: { paddingVertical: SPACING.xs, paddingHorizontal: SPACING.sm, borderRadius: RADIUS.sm, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
  unitBtnActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primary },
  unitText: { fontSize: FONTS.sizes.xs, fontWeight: '600', color: COLORS.textLight },
  unitTextActive: { color: COLORS.white },
  freqGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.lg },
  freqBtn: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md, borderRadius: RADIUS.lg, backgroundColor: COLORS.white, borderWidth: 2, borderColor: COLORS.border },
  freqBtnActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primarySoft },
  freqText: { fontSize: FONTS.sizes.sm, fontWeight: '600', color: COLORS.textLight },
  freqTextActive: { color: COLORS.primary },
  toggleRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.lg, borderWidth: 2, borderColor: COLORS.border },
  toggleRowActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primarySoft },
  toggleEmoji: { fontSize: 24, marginRight: SPACING.md },
  toggleText: { flex: 1, fontSize: FONTS.sizes.lg, fontWeight: '600', color: COLORS.text },
  toggleSwitch: { width: 50, height: 28, borderRadius: 14, backgroundColor: COLORS.border, padding: 2, justifyContent: 'center' },
  toggleSwitchOn: { backgroundColor: COLORS.primary },
  toggleKnob: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.white },
  toggleKnobOn: { alignSelf: 'flex-end' },
  saveBtn: { marginTop: SPACING.xl },
});

export default AddMedicationScreen;
