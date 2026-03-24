import * as SQLite from 'expo-sqlite';

let db = null;

export const getDatabase = async () => {
  if (db) return db;
  db = await SQLite.openDatabaseAsync('petpill.db');
  await initDatabase(db);
  return db;
};

const initDatabase = async (database) => {
  await database.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS pets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      species TEXT NOT NULL,
      breed TEXT DEFAULT '',
      age_years INTEGER DEFAULT 0,
      age_months INTEGER DEFAULT 0,
      weight REAL DEFAULT 0,
      weight_unit TEXT DEFAULT 'lbs',
      gender TEXT DEFAULT '',
      photo TEXT DEFAULT '',
      color TEXT DEFAULT '',
      microchip_id TEXT DEFAULT '',
      notes TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS medications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      dosage TEXT DEFAULT '',
      dosage_unit TEXT DEFAULT 'mg',
      frequency TEXT DEFAULT 'once_daily',
      custom_frequency_hours INTEGER DEFAULT 0,
      specific_days TEXT DEFAULT '',
      times_of_day TEXT DEFAULT '["08:00"]',
      start_date TEXT NOT NULL,
      end_date TEXT DEFAULT '',
      total_supply INTEGER DEFAULT 0,
      remaining_supply INTEGER DEFAULT 0,
      refill_reminder_at INTEGER DEFAULT 5,
      photo TEXT DEFAULT '',
      notes TEXT DEFAULT '',
      category TEXT DEFAULT '',
      with_food INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS medication_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      medication_id INTEGER NOT NULL,
      pet_id INTEGER NOT NULL,
      scheduled_time TEXT NOT NULL,
      actual_time TEXT DEFAULT '',
      status TEXT DEFAULT 'pending',
      notes TEXT DEFAULT '',
      given_by TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE,
      FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS health_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      value TEXT DEFAULT '',
      unit TEXT DEFAULT '',
      notes TEXT DEFAULT '',
      date TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS vet_appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id INTEGER NOT NULL,
      vet_name TEXT DEFAULT '',
      vet_phone TEXT DEFAULT '',
      vet_address TEXT DEFAULT '',
      appointment_date TEXT NOT NULL,
      appointment_time TEXT DEFAULT '',
      reason TEXT DEFAULT '',
      notes TEXT DEFAULT '',
      is_completed INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS vaccinations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      date_given TEXT NOT NULL,
      next_due_date TEXT DEFAULT '',
      vet_name TEXT DEFAULT '',
      batch_number TEXT DEFAULT '',
      notes TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS weight_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id INTEGER NOT NULL,
      weight REAL NOT NULL,
      unit TEXT DEFAULT 'lbs',
      date TEXT NOT NULL,
      notes TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS price_alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      medication_name TEXT NOT NULL,
      target_price REAL DEFAULT 0,
      pharmacy TEXT DEFAULT '',
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      value TEXT DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS caregivers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT DEFAULT '',
      email TEXT DEFAULT '',
      relationship TEXT DEFAULT '',
      can_give_meds INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

// ==================== PET OPERATIONS ====================

export const addPet = async (pet) => {
  const database = await getDatabase();
  const result = await database.runAsync(
    `INSERT INTO pets (name, species, breed, age_years, age_months, weight, weight_unit, gender, photo, color, microchip_id, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [pet.name, pet.species, pet.breed || '', pet.age_years || 0, pet.age_months || 0,
     pet.weight || 0, pet.weight_unit || 'lbs', pet.gender || '', pet.photo || '',
     pet.color || '', pet.microchip_id || '', pet.notes || '']
  );
  return result.lastInsertRowId;
};

export const getPets = async () => {
  const database = await getDatabase();
  return await database.getAllAsync('SELECT * FROM pets ORDER BY created_at DESC');
};

export const getPetById = async (id) => {
  const database = await getDatabase();
  return await database.getFirstAsync('SELECT * FROM pets WHERE id = ?', [id]);
};

export const updatePet = async (id, pet) => {
  const database = await getDatabase();
  await database.runAsync(
    `UPDATE pets SET name=?, species=?, breed=?, age_years=?, age_months=?, weight=?, weight_unit=?, gender=?, photo=?, color=?, microchip_id=?, notes=?, updated_at=CURRENT_TIMESTAMP
     WHERE id=?`,
    [pet.name, pet.species, pet.breed || '', pet.age_years || 0, pet.age_months || 0,
     pet.weight || 0, pet.weight_unit || 'lbs', pet.gender || '', pet.photo || '',
     pet.color || '', pet.microchip_id || '', pet.notes || '', id]
  );
};

export const deletePet = async (id) => {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM pets WHERE id = ?', [id]);
};

// ==================== MEDICATION OPERATIONS ====================

export const addMedication = async (med) => {
  const database = await getDatabase();
  const result = await database.runAsync(
    `INSERT INTO medications (pet_id, name, dosage, dosage_unit, frequency, custom_frequency_hours, specific_days, times_of_day, start_date, end_date, total_supply, remaining_supply, refill_reminder_at, photo, notes, category, with_food)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [med.pet_id, med.name, med.dosage || '', med.dosage_unit || 'mg', med.frequency || 'once_daily',
     med.custom_frequency_hours || 0, med.specific_days || '', JSON.stringify(med.times_of_day || ['08:00']),
     med.start_date, med.end_date || '', med.total_supply || 0, med.remaining_supply || 0,
     med.refill_reminder_at || 5, med.photo || '', med.notes || '', med.category || '', med.with_food || 0]
  );
  return result.lastInsertRowId;
};

export const getMedicationsByPet = async (petId) => {
  const database = await getDatabase();
  return await database.getAllAsync(
    'SELECT * FROM medications WHERE pet_id = ? AND is_active = 1 ORDER BY created_at DESC',
    [petId]
  );
};

export const getAllActiveMedications = async () => {
  const database = await getDatabase();
  return await database.getAllAsync(
    `SELECT m.*, p.name as pet_name, p.species as pet_species
     FROM medications m JOIN pets p ON m.pet_id = p.id
     WHERE m.is_active = 1 ORDER BY m.created_at DESC`
  );
};

export const updateMedication = async (id, med) => {
  const database = await getDatabase();
  await database.runAsync(
    `UPDATE medications SET name=?, dosage=?, dosage_unit=?, frequency=?, custom_frequency_hours=?, specific_days=?, times_of_day=?, start_date=?, end_date=?, total_supply=?, remaining_supply=?, refill_reminder_at=?, photo=?, notes=?, category=?, with_food=?, updated_at=CURRENT_TIMESTAMP
     WHERE id=?`,
    [med.name, med.dosage || '', med.dosage_unit || 'mg', med.frequency || 'once_daily',
     med.custom_frequency_hours || 0, med.specific_days || '', JSON.stringify(med.times_of_day || ['08:00']),
     med.start_date, med.end_date || '', med.total_supply || 0, med.remaining_supply || 0,
     med.refill_reminder_at || 5, med.photo || '', med.notes || '', med.category || '', med.with_food || 0, id]
  );
};

export const deactivateMedication = async (id) => {
  const database = await getDatabase();
  await database.runAsync('UPDATE medications SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
};

export const deleteMedication = async (id) => {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM medications WHERE id = ?', [id]);
};

export const getLastMedicationId = async () => {
  const database = await getDatabase();
  const result = await database.getFirstAsync(
    'SELECT id FROM medications ORDER BY id DESC LIMIT 1'
  );
  return result?.id || null;
};

export const decrementSupply = async (id) => {
  const database = await getDatabase();
  await database.runAsync(
    'UPDATE medications SET remaining_supply = MAX(0, remaining_supply - 1), updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [id]
  );
};

export const getMedicationsNeedingRefill = async () => {
  const database = await getDatabase();
  return await database.getAllAsync(
    `SELECT m.*, p.name as pet_name FROM medications m JOIN pets p ON m.pet_id = p.id
     WHERE m.is_active = 1 AND m.total_supply > 0 AND m.remaining_supply <= m.refill_reminder_at`
  );
};

// ==================== MEDICATION LOG OPERATIONS ====================

export const addMedicationLog = async (log) => {
  const database = await getDatabase();
  const result = await database.runAsync(
    `INSERT INTO medication_logs (medication_id, pet_id, scheduled_time, actual_time, status, notes, given_by)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [log.medication_id, log.pet_id, log.scheduled_time, log.actual_time || '',
     log.status || 'pending', log.notes || '', log.given_by || '']
  );
  return result.lastInsertRowId;
};

export const getMedicationLogsForDate = async (date) => {
  const database = await getDatabase();
  return await database.getAllAsync(
    `SELECT ml.*, m.name as med_name, m.dosage, m.dosage_unit, m.with_food, m.category,
     p.name as pet_name, p.species as pet_species
     FROM medication_logs ml
     JOIN medications m ON ml.medication_id = m.id
     JOIN pets p ON ml.pet_id = p.id
     WHERE ml.scheduled_time LIKE ?
     ORDER BY ml.scheduled_time ASC`,
    [`${date}%`]
  );
};

export const updateMedicationLogStatus = async (id, status, actualTime = '') => {
  const database = await getDatabase();
  await database.runAsync(
    'UPDATE medication_logs SET status = ?, actual_time = ? WHERE id = ?',
    [status, actualTime || new Date().toISOString(), id]
  );
};

export const getStreak = async (petId) => {
  const database = await getDatabase();
  const logs = await database.getAllAsync(
    `SELECT DISTINCT DATE(scheduled_time) as log_date
     FROM medication_logs
     WHERE pet_id = ? AND status = 'taken'
     ORDER BY log_date DESC`,
    [petId]
  );

  let streak = 0;
  const today = new Date();

  for (let i = 0; i < logs.length; i++) {
    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);
    const expected = expectedDate.toISOString().split('T')[0];

    if (logs[i]?.log_date === expected) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
};

export const getMedicationHistory = async (medicationId, limit = 30) => {
  const database = await getDatabase();
  return await database.getAllAsync(
    `SELECT * FROM medication_logs WHERE medication_id = ? ORDER BY scheduled_time DESC LIMIT ?`,
    [medicationId, limit]
  );
};

// ==================== HEALTH LOG OPERATIONS ====================

export const addHealthLog = async (log) => {
  const database = await getDatabase();
  const result = await database.runAsync(
    `INSERT INTO health_logs (pet_id, type, value, unit, notes, date) VALUES (?, ?, ?, ?, ?, ?)`,
    [log.pet_id, log.type, log.value || '', log.unit || '', log.notes || '', log.date]
  );
  return result.lastInsertRowId;
};

export const getHealthLogs = async (petId, type = null) => {
  const database = await getDatabase();
  if (type) {
    return await database.getAllAsync(
      'SELECT * FROM health_logs WHERE pet_id = ? AND type = ? ORDER BY date DESC',
      [petId, type]
    );
  }
  return await database.getAllAsync(
    'SELECT * FROM health_logs WHERE pet_id = ? ORDER BY date DESC',
    [petId]
  );
};

// ==================== WEIGHT LOG OPERATIONS ====================

export const addWeightLog = async (log) => {
  const database = await getDatabase();
  const result = await database.runAsync(
    'INSERT INTO weight_logs (pet_id, weight, unit, date, notes) VALUES (?, ?, ?, ?, ?)',
    [log.pet_id, log.weight, log.unit || 'lbs', log.date, log.notes || '']
  );
  return result.lastInsertRowId;
};

export const getWeightLogs = async (petId) => {
  const database = await getDatabase();
  return await database.getAllAsync(
    'SELECT * FROM weight_logs WHERE pet_id = ? ORDER BY date DESC',
    [petId]
  );
};

// ==================== VET APPOINTMENT OPERATIONS ====================

export const addVetAppointment = async (apt) => {
  const database = await getDatabase();
  const result = await database.runAsync(
    `INSERT INTO vet_appointments (pet_id, vet_name, vet_phone, vet_address, appointment_date, appointment_time, reason, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [apt.pet_id, apt.vet_name || '', apt.vet_phone || '', apt.vet_address || '',
     apt.appointment_date, apt.appointment_time || '', apt.reason || '', apt.notes || '']
  );
  return result.lastInsertRowId;
};

export const getUpcomingAppointments = async () => {
  const database = await getDatabase();
  const today = new Date().toISOString().split('T')[0];
  return await database.getAllAsync(
    `SELECT va.*, p.name as pet_name, p.species as pet_species
     FROM vet_appointments va JOIN pets p ON va.pet_id = p.id
     WHERE va.appointment_date >= ? AND va.is_completed = 0
     ORDER BY va.appointment_date ASC`,
    [today]
  );
};

export const completeAppointment = async (id) => {
  const database = await getDatabase();
  await database.runAsync('UPDATE vet_appointments SET is_completed = 1 WHERE id = ?', [id]);
};

export const deleteAppointment = async (id) => {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM vet_appointments WHERE id = ?', [id]);
};

// ==================== VACCINATION OPERATIONS ====================

export const addVaccination = async (vac) => {
  const database = await getDatabase();
  const result = await database.runAsync(
    `INSERT INTO vaccinations (pet_id, name, date_given, next_due_date, vet_name, batch_number, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [vac.pet_id, vac.name, vac.date_given, vac.next_due_date || '', vac.vet_name || '',
     vac.batch_number || '', vac.notes || '']
  );
  return result.lastInsertRowId;
};

export const getVaccinations = async (petId) => {
  const database = await getDatabase();
  return await database.getAllAsync(
    'SELECT * FROM vaccinations WHERE pet_id = ? ORDER BY date_given DESC',
    [petId]
  );
};

// ==================== CAREGIVER OPERATIONS ====================

export const addCaregiver = async (cg) => {
  const database = await getDatabase();
  const result = await database.runAsync(
    'INSERT INTO caregivers (name, phone, email, relationship, can_give_meds) VALUES (?, ?, ?, ?, ?)',
    [cg.name, cg.phone || '', cg.email || '', cg.relationship || '', cg.can_give_meds ? 1 : 0]
  );
  return result.lastInsertRowId;
};

export const getCaregivers = async () => {
  const database = await getDatabase();
  return await database.getAllAsync('SELECT * FROM caregivers ORDER BY name ASC');
};

export const deleteCaregiver = async (id) => {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM caregivers WHERE id = ?', [id]);
};

// ==================== SETTINGS OPERATIONS ====================

export const setSetting = async (key, value) => {
  const database = await getDatabase();
  await database.runAsync(
    'INSERT OR REPLACE INTO user_settings (key, value) VALUES (?, ?)',
    [key, value]
  );
};

export const getSetting = async (key) => {
  const database = await getDatabase();
  const result = await database.getFirstAsync(
    'SELECT value FROM user_settings WHERE key = ?',
    [key]
  );
  return result?.value || null;
};

// ==================== SCHEDULE GENERATION ====================

export const generateDailySchedule = async (date) => {
  const database = await getDatabase();
  const dateStr = date || new Date().toISOString().split('T')[0];

  // Check if logs already exist for this date
  const existing = await database.getAllAsync(
    'SELECT COUNT(*) as count FROM medication_logs WHERE scheduled_time LIKE ?',
    [`${dateStr}%`]
  );

  if (existing[0]?.count > 0) return;

  // Get all active medications
  const meds = await database.getAllAsync(
    `SELECT m.*, p.name as pet_name FROM medications m JOIN pets p ON m.pet_id = p.id WHERE m.is_active = 1`
  );

  const dayOfWeek = new Date(dateStr).getDay();

  for (const med of meds) {
    // Check frequency
    let shouldSchedule = true;

    if (med.frequency === 'every_other_day') {
      const startDate = new Date(med.start_date);
      const currentDate = new Date(dateStr);
      const diffDays = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
      shouldSchedule = diffDays % 2 === 0;
    } else if (med.frequency === 'weekly') {
      const startDate = new Date(med.start_date);
      shouldSchedule = startDate.getDay() === dayOfWeek;
    } else if (med.frequency === 'custom' && med.specific_days) {
      const days = JSON.parse(med.specific_days);
      shouldSchedule = days.includes(dayOfWeek);
    }

    // Check end date
    if (med.end_date && dateStr > med.end_date) {
      shouldSchedule = false;
    }

    if (med.start_date > dateStr) {
      shouldSchedule = false;
    }

    if (shouldSchedule) {
      const times = JSON.parse(med.times_of_day || '["08:00"]');
      for (const time of times) {
        const scheduledTime = `${dateStr}T${time}:00`;
        await addMedicationLog({
          medication_id: med.id,
          pet_id: med.pet_id,
          scheduled_time: scheduledTime,
          status: 'pending',
        });
      }
    }
  }
};

// ==================== STATS ====================

export const getDashboardStats = async () => {
  const database = await getDatabase();
  const today = new Date().toISOString().split('T')[0];

  const petCount = await database.getFirstAsync('SELECT COUNT(*) as count FROM pets');
  const activeMeds = await database.getFirstAsync('SELECT COUNT(*) as count FROM medications WHERE is_active = 1');

  const todayLogs = await database.getFirstAsync(
    `SELECT
      COUNT(*) as total,
      SUM(CASE WHEN status = 'taken' THEN 1 ELSE 0 END) as taken,
      SUM(CASE WHEN status = 'missed' THEN 1 ELSE 0 END) as missed,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending
     FROM medication_logs WHERE scheduled_time LIKE ?`,
    [`${today}%`]
  );

  const refillNeeded = await database.getFirstAsync(
    `SELECT COUNT(*) as count FROM medications
     WHERE is_active = 1 AND total_supply > 0 AND remaining_supply <= refill_reminder_at`
  );

  return {
    petCount: petCount?.count || 0,
    activeMeds: activeMeds?.count || 0,
    todayTotal: todayLogs?.total || 0,
    todayTaken: todayLogs?.taken || 0,
    todayMissed: todayLogs?.missed || 0,
    todayPending: todayLogs?.pending || 0,
    refillNeeded: refillNeeded?.count || 0,
  };
};
