import { isRunningInExpoGo } from 'expo';
import { Platform, Alert } from 'react-native';

// expo-notifications crashes in Expo Go on Android (SDK 53+).
// All notification functions are no-ops when running in Expo Go.
const IN_EXPO_GO = isRunningInExpoGo();

let Notifications = null;

if (!IN_EXPO_GO) {
  try {
    Notifications = require('expo-notifications');
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  } catch (e) {
    console.error('Failed to load expo-notifications:', e);
  }
}

// SDK 55+ trigger formats using string literals (not enum references)
const makeDateTrigger = (date) => {
  const timestamp = date instanceof Date ? date.getTime() : date;
  return {
    type: 'date',
    date: timestamp,
  };
};

const makeIntervalTrigger = (seconds) => ({
  type: 'timeInterval',
  seconds,
  repeats: false,
});

export const requestNotificationPermissions = async () => {
  if (IN_EXPO_GO || !Notifications) {
    console.log('Notifications skipped: IN_EXPO_GO =', IN_EXPO_GO, ', Notifications =', !!Notifications);
    return false;
  }
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    console.log('Notification permission status:', existingStatus);

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      console.log('Requested permission, got:', status);
    }

    if (finalStatus !== 'granted') {
      console.log('Notification permission denied');
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
      console.log('Android notification channels created');
    }

    return true;
  } catch (e) {
    console.error('Notification permission error:', e);
    return false;
  }
};

// Send an immediate test notification to verify notifications work
export const sendTestNotification = async () => {
  if (IN_EXPO_GO || !Notifications) return null;
  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: '💊 PetPill Notifications Active!',
        body: 'You will now receive medication reminders on time.',
        sound: 'default',
        ...(Platform.OS === 'android' && { channelId: 'medications' }),
      },
      trigger: null, // null = send immediately
    });
    console.log('Test notification sent, id:', id);
    return id;
  } catch (e) {
    console.error('Test notification failed:', e);
    return null;
  }
};

export const scheduleMedicationReminder = async (medication, pet, time, date) => {
  if (IN_EXPO_GO || !Notifications) return null;
  try {
    const [hours, minutes] = time.split(':').map(Number);
    const trigger = new Date(date);
    trigger.setHours(hours, minutes, 0, 0);
    if (trigger <= new Date()) return null;

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `💊 Time for ${pet.name}'s Medication!`,
        body: `Give ${medication.name} (${medication.dosage} ${medication.dosage_unit}) to ${pet.name}${medication.with_food ? ' 🍽️ with food' : ''}`,
        data: { type: 'medication', medicationId: medication.id, petId: pet.id },
        sound: 'default',
        ...(Platform.OS === 'android' && { channelId: 'medications' }),
      },
      trigger: makeDateTrigger(trigger),
    });
    console.log('Scheduled medication reminder:', id, 'for', trigger.toISOString());
    return id;
  } catch (e) {
    console.error('scheduleMedicationReminder error:', e);
    return null;
  }
};

export const scheduleRefillReminder = async (medication, pet) => {
  if (IN_EXPO_GO || !Notifications) return null;
  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `⚠️ ${medication.name} Running Low!`,
        body: `Only ${medication.remaining_supply} doses left for ${pet.name}. Time to order a refill!`,
        data: { type: 'refill', medicationId: medication.id, petId: pet.id },
        sound: 'default',
        ...(Platform.OS === 'android' && { channelId: 'refills' }),
      },
      trigger: makeIntervalTrigger(5),
    });
    console.log('Scheduled refill reminder:', id);
    return id;
  } catch (e) {
    console.error('scheduleRefillReminder error:', e);
    return null;
  }
};

export const scheduleAppointmentReminder = async (appointment, pet) => {
  if (IN_EXPO_GO || !Notifications) return;
  const appointmentDate = new Date(appointment.appointment_date);

  const dayBefore = new Date(appointmentDate);
  dayBefore.setDate(dayBefore.getDate() - 1);
  dayBefore.setHours(9, 0, 0, 0);
  if (dayBefore > new Date()) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `🏥 Vet Appointment Tomorrow!`,
          body: `${pet.name} has a vet appointment tomorrow${appointment.appointment_time ? ` at ${appointment.appointment_time}` : ''}${appointment.reason ? ` — ${appointment.reason}` : ''}`,
          data: { type: 'appointment', appointmentId: appointment.id, petId: pet.id },
          sound: 'default',
          ...(Platform.OS === 'android' && { channelId: 'appointments' }),
        },
        trigger: makeDateTrigger(dayBefore),
      });
    } catch (e) {
      console.error('scheduleAppointmentReminder dayBefore error:', e);
    }
  }

  const morningOf = new Date(appointmentDate);
  morningOf.setHours(8, 0, 0, 0);
  if (morningOf > new Date()) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `🏥 Vet Visit Today!`,
          body: `${pet.name}'s appointment is today${appointment.appointment_time ? ` at ${appointment.appointment_time}` : ''}. Don't forget to bring their health records!`,
          data: { type: 'appointment', appointmentId: appointment.id, petId: pet.id },
          sound: 'default',
          ...(Platform.OS === 'android' && { channelId: 'appointments' }),
        },
        trigger: makeDateTrigger(morningOf),
      });
    } catch (e) {
      console.error('scheduleAppointmentReminder morningOf error:', e);
    }
  }
};

export const cancelAllNotifications = async () => {
  if (IN_EXPO_GO || !Notifications) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
};

export const getScheduledNotifications = async () => {
  if (IN_EXPO_GO || !Notifications) return [];
  return await Notifications.getAllScheduledNotificationsAsync();
};

export const scheduleNotificationsForMedication = async (medication, pet) => {
  if (IN_EXPO_GO || !Notifications || !medication || !pet) {
    console.log('scheduleNotificationsForMedication skipped:', {
      IN_EXPO_GO,
      hasNotifications: !!Notifications,
      hasMedication: !!medication,
      hasPet: !!pet,
    });
    return [];
  }

  const scheduledIds = [];
  const today = new Date();
  const startDate = new Date(medication.start_date);
  const endDate = medication.end_date ? new Date(medication.end_date) : null;

  const times = Array.isArray(medication.times_of_day)
    ? medication.times_of_day
    : JSON.parse(medication.times_of_day || '["08:00"]');

  console.log('Scheduling notifications for medication:', medication.name, 'times:', times);

  for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + dayOffset);
    const targetDateStr = targetDate.toISOString().split('T')[0];

    if (targetDate < startDate) continue;
    if (endDate && targetDate > endDate) continue;

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
          trigger: makeDateTrigger(triggerDate),
        });
        scheduledIds.push(id);
        console.log('Scheduled notification:', id, 'for', triggerDate.toISOString());
      } catch (e) {
        console.error('Failed to schedule notification for', targetDateStr, time, ':', e.message || e);
      }
    }
  }

  console.log('Total notifications scheduled:', scheduledIds.length);
  return scheduledIds;
};

export const cancelNotificationsForMedication = async (medicationId) => {
  if (IN_EXPO_GO || !Notifications) return;
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const toCancel = scheduled.filter(n => n.identifier?.startsWith(`med_${medicationId}_`));
  for (const notif of toCancel) {
    await Notifications.cancelScheduledNotificationAsync(notif.identifier);
  }
};

export const rescheduleAllMedications = async (medications, pets) => {
  if (IN_EXPO_GO || !Notifications) return;
  for (const med of medications) {
    const pet = pets.find(p => p.id === med.pet_id);
    if (pet) await scheduleNotificationsForMedication(med, pet);
  }
};
