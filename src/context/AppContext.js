import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as DB from '../database/database';
import { rescheduleAllMedications } from '../utils/notifications';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [activePet, setActivePet] = useState(null);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

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
    loadPets,
    loadTodaySchedule,
    loadDashboardStats,
    refreshAll,
    markMedication,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
