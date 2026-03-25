import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { logError } from './logger';

// Configure notification behavior (wrapped in try-catch for Expo Go compatibility)
try {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
} catch (e) {
  logError('Failed to set notification handler (expected in Expo Go):', e);
}

export const requestNotificationPermissions = async () => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return false;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('medications', {
        name: 'Medication Reminders',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF8FAB',
        sound: 'default',
      });

      await Notifications.setNotificationChannelAsync('refills', {
        name: 'Refill Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        lightColor: '#FFD166',
      });

      await Notifications.setNotificationChannelAsync('appointments', {
        name: 'Vet Appointments',
        importance: Notifications.AndroidImportance.HIGH,
        lightColor: '#74B9FF',
      });
    }

    return true;
  } catch (e) {
    logError('Failed to request notification permissions:', e);
    return false;
  }
};

export const scheduleMedicationReminder = async (medication, pet, time, date) => {
  try {
    const [hours, minutes] = time.split(':').map(Number);

    const triggerDate = new Date(date);
    triggerDate.setHours(hours, minutes, 0, 0);

    // Don't schedule if in the past
    if (triggerDate <= new Date()) return null;

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `💊 Time for ${pet.name}'s Medication!`,
        body: `Give ${medication.name} (${medication.dosage} ${medication.dosage_unit}) to ${pet.name}${medication.with_food ? ' 🍽️ with food' : ''}`,
        data: {
          type: 'medication',
          medicationId: medication.id,
          petId: pet.id,
        },
        sound: 'default',
        ...(Platform.OS === 'android' && { channelId: 'medications' }),
      },
      trigger: {
        type: 'date',
        date: triggerDate,
      },
    });

    return id;
  } catch (e) {
    logError('Failed to schedule medication reminder:', e);
    return null;
  }
};

export const scheduleRefillReminder = async (medication, pet) => {
  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `⚠️ ${medication.name} Running Low!`,
        body: `Only ${medication.remaining_supply} doses left for ${pet.name}. Time to order a refill!`,
        data: {
          type: 'refill',
          medicationId: medication.id,
          petId: pet.id,
        },
        sound: 'default',
        ...(Platform.OS === 'android' && { channelId: 'refills' }),
      },
      trigger: {
        type: 'timeInterval',
        seconds: 1,
      },
    });

    return id;
  } catch (e) {
    logError('Failed to schedule refill reminder:', e);
    return null;
  }
};

export const scheduleAppointmentReminder = async (appointment, pet) => {
  try {
    const appointmentDate = new Date(appointment.appointment_date);

    // Remind 1 day before
    const dayBefore = new Date(appointmentDate);
    dayBefore.setDate(dayBefore.getDate() - 1);
    dayBefore.setHours(9, 0, 0, 0);

    if (dayBefore > new Date()) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `🏥 Vet Appointment Tomorrow!`,
          body: `${pet.name} has a vet appointment tomorrow${appointment.appointment_time ? ` at ${appointment.appointment_time}` : ''}${appointment.reason ? ` — ${appointment.reason}` : ''}`,
          data: {
            type: 'appointment',
            appointmentId: appointment.id,
            petId: pet.id,
          },
          sound: 'default',
          ...(Platform.OS === 'android' && { channelId: 'appointments' }),
        },
        trigger: {
          type: 'date',
          date: dayBefore,
        },
      });
    }

    // Remind morning of
    const morningOf = new Date(appointmentDate);
    morningOf.setHours(8, 0, 0, 0);

    if (morningOf > new Date()) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `🏥 Vet Visit Today!`,
          body: `${pet.name}'s appointment is today${appointment.appointment_time ? ` at ${appointment.appointment_time}` : ''}. Don't forget to bring their health records!`,
          data: {
            type: 'appointment',
            appointmentId: appointment.id,
            petId: pet.id,
          },
          sound: 'default',
          ...(Platform.OS === 'android' && { channelId: 'appointments' }),
        },
        trigger: {
          type: 'date',
          date: morningOf,
        },
      });
    }
  } catch (e) {
    logError('Failed to schedule appointment reminder:', e);
  }
};

export const cancelAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (e) {
    logError('Failed to cancel all notifications:', e);
  }
};

export const getScheduledNotifications = async () => {
  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (e) {
    logError('Failed to get scheduled notifications:', e);
    return [];
  }
};

// Schedule all upcoming reminders for a medication (next 14 days)
export const scheduleNotificationsForMedication = async (medication, pet) => {
  if (!medication || !pet) return [];

  const scheduledIds = [];

  try {
    const today = new Date();
    const startDate = new Date(medication.start_date);
    const endDate = medication.end_date ? new Date(medication.end_date) : null;

    const times = Array.isArray(medication.times_of_day)
      ? medication.times_of_day
      : JSON.parse(medication.times_of_day || '["08:00"]');

    // Schedule for next 14 days
    for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + dayOffset);
      const targetDateStr = targetDate.toISOString().split('T')[0];

      // Respect start/end date
      if (targetDate < startDate) continue;
      if (endDate && targetDate > endDate) continue;

      // Check frequency
      let shouldSchedule = true;
      if (medication.frequency === 'every_other_day') {
        const diffDays = Math.floor((targetDate - startDate) / (1000 * 60 * 60 * 24));
        shouldSchedule = diffDays % 2 === 0;
      } else if (medication.frequency === 'weekly') {
        shouldSchedule = startDate.getDay() === targetDate.getDay();
      } else if (medication.frequency === 'biweekly') {
        const diffDays = Math.floor((targetDate - startDate) / (1000 * 60 * 60 * 24));
        shouldSchedule = diffDays % 14 === 0;
      } else if (medication.frequency === 'monthly') {
        shouldSchedule = startDate.getDate() === targetDate.getDate();
      }

      if (!shouldSchedule) continue;

      for (const time of times) {
        const [hours, minutes] = time.split(':').map(Number);
        const triggerDate = new Date(targetDate);
        triggerDate.setHours(hours, minutes, 0, 0);

        // Skip if already past
        if (triggerDate <= new Date()) continue;

        try {
          const id = await Notifications.scheduleNotificationAsync({
            identifier: `med_${medication.id}_${targetDateStr}_${time.replace(':', '')}`,
            content: {
              title: `💊 Time for ${pet.name}'s Medication!`,
              body: `Give ${medication.name}${medication.dosage ? ` (${medication.dosage} ${medication.dosage_unit || 'mg'})` : ''}${medication.with_food ? ' 🍽️ with food' : ''}`,
              data: { type: 'medication', medicationId: medication.id, petId: pet.id },
              sound: 'default',
              ...(Platform.OS === 'android' && { channelId: 'medications' }),
            },
            trigger: {
              type: 'date',
              date: triggerDate,
            },
          });
          scheduledIds.push(id);
        } catch (e) {
          // Skip if this exact notification already exists
        }
      }
    }
  } catch (e) {
    logError('Failed to schedule notifications for medication:', e);
  }

  return scheduledIds;
};

// Cancel all notifications for a specific medication
export const cancelNotificationsForMedication = async (medicationId) => {
  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    const toCancel = scheduled.filter(n =>
      n.identifier?.startsWith(`med_${medicationId}_`)
    );
    for (const notif of toCancel) {
      await Notifications.cancelScheduledNotificationAsync(notif.identifier);
    }
  } catch (e) {
    logError('Failed to cancel notifications for medication:', e);
  }
};

// Reschedule all medications (call this on app start daily)
export const rescheduleAllMedications = async (medications, pets) => {
  try {
    for (const med of medications) {
      const pet = pets.find(p => p.id === med.pet_id);
      if (pet) {
        await scheduleNotificationsForMedication(med, pet);
      }
    }
  } catch (e) {
    logError('Failed to reschedule all medications:', e);
  }
};
