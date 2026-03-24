import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as DB from '../database/database';
import { rescheduleAllMedications } from '../utils/notifications';
import { setLanguage, getLanguage } from '../i18n/i18n';
import { setSoundEnabled, isSoundEnabled } from '../utils/sounds';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [activePet, setActivePet] = useState(null);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [language, setLang] = useState('en');
  const [soundOn, setSoundOn] = useState(true);
  const [, forceUpdate] = useState(0);

  // Load saved settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedLang = await DB.getSetting('language');
      if (savedLang) {
        setLang(savedLang);
        setLanguage(savedLang);
      }
      const savedPremium = await DB.getSetting('is_premium');
      if (savedPremium === 'true') {
        setIsPremium(true);
      }
      const savedSound = await DB.getSetting('sound_enabled');
      if (savedSound !== null) {
        const enabled = savedSound !== 'false';
        setSoundOn(enabled);
        setSoundEnabled(enabled);
      }
    } catch (e) {
      console.error('Error loading settings:', e);
    }
  };

  const changeLanguage = async (langCode) => {
    setLang(langCode);
    setLanguage(langCode);
    forceUpdate(n => n + 1);
    try {
      await DB.setSetting('language', langCode);
    } catch (e) {
      console.error('Error saving language:', e);
    }
  };

  const toggleSound = async () => {
    const newVal = !soundOn;
    setSoundOn(newVal);
    setSoundEnabled(newVal);
    try {
      await DB.setSetting('sound_enabled', newVal.toString());
    } catch (e) {
      console.error('Error saving sound setting:', e);
    }
  };

  const activatePremium = async () => {
    setIsPremium(true);
    try {
      await DB.setSetting('is_premium', 'true');
    } catch (e) {
      console.error('Error saving premium:', e);
    }
  };

  const loadPets = useCallback(async () => {
    try {
      const allPets = await DB.getPets();
      setPets(allPets);
      if (allPets.length > 0 && !activePet) {
        setActivePet(allPets[0]);
      }
    } catch (e) {
      console.error('Error loading pets:', e);
    }
  }, [activePet]);

  const loadTodaySchedule = useCallback(async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      await DB.generateDailySchedule(today);
      const schedule = await DB.getMedicationLogsForDate(today);
      setTodaySchedule(schedule);
    } catch (e) {
      console.error('Error loading schedule:', e);
    }
  }, []);

  const loadDashboardStats = useCallback(async () => {
    try {
      const stats = await DB.getDashboardStats();
      setDashboardStats(stats);
    } catch (e) {
      console.error('Error loading stats:', e);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    setIsLoading(true);
    await loadPets();
    await loadTodaySchedule();
    await loadDashboardStats();
    setIsLoading(false);
  }, [loadPets, loadTodaySchedule, loadDashboardStats]);

  // On app start: reschedule all notifications for next 14 days
  useEffect(() => {
    refreshAll();
    const scheduleOnStart = async () => {
      try {
        const allPets = await DB.getPets();
        const allMeds = await DB.getAllActiveMedications();
        await rescheduleAllMedications(allMeds, allPets);
      } catch (e) {
        console.error('Reschedule error:', e);
      }
    };
    scheduleOnStart();
  }, []);

  const markMedication = async (logId, status) => {
    try {
      await DB.updateMedicationLogStatus(logId, status);
      if (status === 'taken') {
        const log = todaySchedule.find(l => l.id === logId);
        if (log) {
          await DB.decrementSupply(log.medication_id);
        }
      }
      await loadTodaySchedule();
      await loadDashboardStats();
    } catch (e) {
      console.error('Error marking medication:', e);
    }
  };

  const value = {
    pets,
    activePet,
    setActivePet,
    todaySchedule,
    dashboardStats,
    isLoading,
    isPremium,
    setIsPremium,
    activatePremium,
    loadPets,
    loadTodaySchedule,
    loadDashboardStats,
    refreshAll,
    markMedication,
    language,
    changeLanguage,
    soundOn,
    toggleSound,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
