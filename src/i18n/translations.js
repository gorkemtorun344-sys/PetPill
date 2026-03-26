const translations = {
  en: {
    // Navigation tabs
    tab_home: 'Home',
    tab_pets: 'Pets',
    tab_meds: 'Meds',
    tab_prices: 'Prices',
    tab_health: 'Health',
    tab_more: 'More',
    // Common
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    remove: 'Remove',
    close: 'Close',
    back: 'Back',
    ok: 'OK',
    yes: 'Yes',
    no: 'No',
    add: 'Add',
    edit: 'Edit',
    oops: 'Oops!',
    error: 'Error',
    coming_soon: 'Coming Soon!',
    // Greetings
    good_morning: 'Good Morning',
    good_afternoon: 'Good Afternoon',
    good_evening: 'Good Evening',
    // Home Screen
    home_welcome_title: 'Welcome to PetPill!',
    home_welcome_desc: 'Add your first pet to start managing their medications and health.',
    home_add_pet_btn: '+ Add Your Pet',
    home_today: 'Today',
    home_day_streak: 'Day Streak',
    home_pets: 'Pets',
    home_progress: "Today's Progress 🎯",
    home_perfect: '% complete 🎉 Perfect!',
    home_complete: '% complete',
    home_schedule: "Today's Schedule 📋",
    home_see_all: 'See All →',
    home_no_meds: '🎉 No medications scheduled for today!',
    home_vet_visits: 'Upcoming Vet Visits 🏥',
    home_refill_needed: '⚠️ Refill Needed',
    home_compare_prices: 'Compare Prices →',
    home_sos: '🚨 SOS',
    home_mark_given_title: 'Give Medication? 💊',
    home_mark_given_msg: 'Mark this medication as given?',
    home_given_btn: '✅ Yes, Given!',
    home_skip_title: 'Skip Medication? ⏭️',
    home_skip_msg: 'Are you sure you want to skip this dose?',
    home_skip_btn: 'Skip',
    home_snooze_title: 'Snooze Reminder ⏰',
    home_snooze_msg: 'Snooze for how long?',
    home_snooze_5: '5 minutes',
    home_snooze_15: '15 minutes',
    home_snooze_30: '30 minutes',
    home_emergency_title: '🚨 Emergency Poison Hotline',
    home_emergency_msg: 'Call ASPCA Animal Poison Control?\n\n(888) 426-4435\n\nNote: A consultation fee may apply.',
    home_call_now: '📞 Call Now',
    // Pets Screen
    pets_header: 'My Pets 🐾',
    pets_add_btn: '+ Add Pet',
    pets_empty_title: 'No Pets Yet',
    pets_empty_desc: 'Add your first furry (or scaly) friend to start tracking their health!',
    pets_add_first_btn: '+ Add Your First Pet',
    pets_active_meds: '💊 {count} active medications',
    pets_delete_title: 'Delete {name}? 😢',
    pets_delete_msg: 'This will remove all their medications, health records, and appointments. This cannot be undone.',
    // Medications Screen
    meds_header: 'Medications 💊',
    meds_add_btn: '+ Add',
    meds_all: 'All',
    meds_need_refill: 'Need Refill',
    meds_empty_title: 'No Medications',
    meds_empty_desc: 'Add a medication to start tracking.',
    meds_add_empty_btn: '+ Add Medication',
    meds_refill_empty_title: 'All Stocked Up!',
    meds_refill_empty_desc: 'None of your medications need refilling right now.',
    meds_dosage: 'Dosage',
    meds_frequency: 'Frequency',
    meds_times: 'Times',
    meds_refill_now: 'Refill now!',
    meds_running_low: 'Running low',
    meds_with_food: '🍽️ Give with food',
    meds_buy_refill: '🛒 Buy Refill',
    meds_stop_btn: '⏹️ Stop',
    meds_stop_title: 'Stop {name}?',
    meds_stop_msg: 'This will deactivate {name} for {pet}. No more reminders will be sent.',
    meds_stop_confirm: 'Stop Medication',
    meds_interaction_title: '⚠️ Drug Interaction Warning',
    meds_add_pet_first: 'Add a Pet First',
    meds_add_pet_msg: 'You need to add a pet before you can manage medications.',
    // Add Medication Screen
    add_med_header: '💊 Add Medication',
    add_med_select_pet: 'Select Pet 🐾',
    add_med_info: 'Medication Info 💊',
    add_med_name_placeholder: 'e.g., Heartgard Plus, Apoquel',
    add_med_dosage_label: 'Dosage',
    add_med_frequency: '⏰ Frequency',
    add_med_times: '🕐 Time(s) of Day',
    add_med_duration: 'Duration 📅',
    add_med_start: 'Start Date',
    add_med_end: 'End Date (optional)',
    add_med_end_helper: 'Leave empty for ongoing',
    add_med_supply: 'Supply Tracking 📦',
    add_med_total_supply: 'Total Supply',
    add_med_supply_helper: 'Number of doses',
    add_med_refill_at: 'Remind to Refill At',
    add_med_refill_helper: 'Doses remaining',
    add_med_instructions: 'Special Instructions 📝',
    add_med_with_food: 'Give with food',
    add_med_notes_placeholder: 'Any special instructions, side effects to watch for...',
    add_med_save_btn: '💊 Add Medication',
    add_med_saved_title: 'Medication Added! 💊',
    add_med_saved_msg: "You'll receive reminders at the scheduled times.",
    add_med_saved_ok: 'Great! ✨',
    add_med_no_pet: 'Please select a pet',
    add_med_no_name: 'Please enter the medication name',
    add_med_error: 'Failed to save medication. Please try again.',
    // Health Tracker
    health_header: 'Health Tracker 📊',
    health_weight_tab: '⚖️ Weight',
    health_symptoms_tab: '🩺 Symptoms',
    health_vaccines_tab: '💉 Vaccines',
    health_log_weight: 'Log Weight ⚖️',
    health_weight_placeholder: 'Weight',
    health_notes_placeholder: 'Notes (optional)',
    health_log_weight_btn: '📏 Log Weight',
    health_weight_history: 'Weight History',
    health_log_symptoms: 'Log Symptoms 🩺',
    health_symptoms_hint: "Select all symptoms you've noticed today:",
    health_symptoms_notes: 'Additional notes...',
    health_log_symptoms_btn: '📋 Log Symptoms',
    health_recent_symptoms: 'Recent Symptoms',
    health_add_vaccine: 'Add Vaccination 💉',
    health_vaccine_name: 'Vaccine Name',
    health_vaccine_placeholder: 'e.g., Rabies, DHPP, FVRCP',
    health_vaccine_due: 'Next Due Date',
    health_vaccine_due_placeholder: 'YYYY-MM-DD (optional)',
    health_add_vaccine_btn: '💉 Add Vaccination',
    health_vaccine_records: 'Vaccination Records',
    health_vaccine_given: 'Given: {date}',
    health_vaccine_due_label: '📅 Due {date}',
    health_vaccine_overdue: '⚠️ Overdue',
    health_weight_saved: 'Weight has been logged.',
    health_symptoms_saved: 'Symptoms have been recorded.',
    health_vaccine_saved: 'Vaccination has been logged.',
    health_no_weight: 'Please enter a weight',
    health_no_symptoms: 'Please select at least one symptom',
    health_no_vaccine_name: 'Please enter the vaccination name',
    health_add_pet_first: 'Add a Pet First',
    health_add_pet_msg: 'You need to add a pet before tracking their health.',
    // Settings Screen
    settings_header: 'Settings ⚙️',
    settings_premium_title: 'Upgrade to PetPill Premium',
    settings_premium_desc: 'Unlimited pets, health reports, price alerts & more!',
    settings_premium_price: '$4.99/month',
    settings_premium_active: '🌟 Premium Active — Thank you!',
    settings_caregivers: 'Caregivers 👨‍👩‍👧',
    settings_caregivers_desc: 'Add family members who also take care of your pets',
    settings_add_caregiver: '+ Add Caregiver',
    settings_caregiver_name: 'Name',
    settings_caregiver_phone: 'Phone',
    settings_caregiver_relation: 'Relationship',
    settings_caregiver_relation_placeholder: 'e.g., Spouse, Child, Pet Sitter',
    settings_caregiver_added: 'has been added as a caregiver.',
    settings_remove_caregiver_title: 'Remove {name}?',
    settings_remove_caregiver_msg: 'They will no longer be listed as a caregiver.',
    settings_app_settings: 'App Settings 🔧',
    settings_language: 'Language',
    settings_language_desc: 'Change app language',
    settings_quick_actions: 'Quick Actions 🚀',
    settings_export: 'Export Health Report',
    settings_export_desc: 'Generate PDF for vet visits',
    settings_emergency: 'Emergency Contacts',
    settings_emergency_desc: 'Poison hotline & emergency vets',
    settings_share: 'Share PetPill',
    settings_share_desc: 'Tell your pet-loving friends!',
    settings_about: 'About 💝',
    settings_version: 'Version 1.0.0',
    settings_tagline: 'Made with love for pet parents everywhere 💕',
    settings_support: 'Contact Support',
    settings_rate: 'Rate PetPill',
    settings_rate_desc: 'Help us help more pets!',
    settings_legal: 'Legal 📋',
    settings_privacy: 'Privacy Policy',
    settings_privacy_desc: 'How we protect your data',
    settings_terms: 'Terms of Service',
    settings_terms_desc: 'Usage terms and conditions',
    settings_emergency_title: '🚨 Emergency Numbers',
    settings_emergency_msg: 'ASPCA Poison Control: (888) 426-4435\nPet Poison Helpline: (855) 764-7661\n\nNote: Consultation fees may apply.',
    settings_call_aspca: '📞 Call ASPCA',
    settings_export_title: 'Export Pet Data 📄',
    settings_export_confirm: "Generate a PDF report with all your pet's health data, medication history, and vaccination records. Perfect for vet visits!",
    settings_export_pdf_btn: '📄 Export PDF',
    settings_export_coming: 'PDF export will be available in the next update.',
    settings_caregiver_name_required: 'Please enter a name',
    settings_caregiver_added_title: 'Added! 👨‍👩‍👧',
    settings_upgrade_title: '🌟 PetPill Premium',
    settings_upgrade_msg: 'Get unlimited pets, detailed health reports, price alerts, and ad-free experience!\n\n$4.99/month or $39.99/year',
    settings_maybe_later: 'Maybe Later',
    settings_upgrade_btn: '🌟 Upgrade Now',
    settings_welcome_premium: 'You now have access to all premium features!',
    // Price Comparer
    price_header: 'Price Comparer 💰',
    price_subtitle: 'Find the best deals on pet medications',
    price_search_placeholder: 'Search medication name...',
    price_search_btn: 'Search',
    price_searching: 'Finding best prices... 🔍',
    price_recent: 'Recent Searches 🕐',
    price_popular: 'Popular Medications 🌟',
    price_found: '{count} pharmacies found',
    price_best_label: 'Best price: ${price}',
    price_best_badge: '🏆 Best Price',
    price_out_of_stock: 'Out of Stock',
    price_free_shipping: '🚚 Free Shipping',
    price_shop_now: '🛒 Shop Now',
    price_disclaimer: '💡 Prices are estimates and may vary.',
    // Language Screen
    lang_title: 'Language',
    lang_subtitle: 'Select your preferred language',
    lang_saved: 'Language updated!',
    lang_saved_msg: 'The app language has been changed.',
  },

  tr: {
    tab_home: 'Ana Sayfa',
    tab_pets: 'Evcil Hayvan',
    tab_meds: 'İlaçlar',
    tab_prices: 'Fiyatlar',
    tab_health: 'Sağlık',
    tab_more: 'Daha Fazla',
    cancel: 'İptal',
    save: 'Kaydet',
    delete: 'Sil',
    remove: 'Kaldır',
    close: 'Kapat',
    back: 'Geri',
    ok: 'Tamam',
    yes: 'Evet',
    no: 'Hayır',
    add: 'Ekle',
    edit: 'Düzenle',
    oops: 'Hata!',
    error: 'Hata',
    coming_soon: 'Yakında!',
    good_morning: 'Günaydın',
    good_afternoon: 'İyi Öğleden Sonralar',
    good_evening: 'İyi Akşamlar',
    home_welcome_title: "PetPill'e Hoş Geldiniz!",
    home_welcome_desc: 'İlaç ve sağlık takibine başlamak için ilk evcil hayvanınızı ekleyin.',
    home_add_pet_btn: '+ Evcil Hayvan Ekle',
    home_today: 'Bugün',
    home_day_streak: 'Gün Serisi',
    home_pets: 'Evcil Hayvan',
    home_progress: 'Bugünün İlerlemesi 🎯',
    home_perfect: '% tamamlandı 🎉 Mükemmel!',
    home_complete: '% tamamlandı',
    home_schedule: 'Bugünün Programı 📋',
    home_see_all: 'Tümünü Gör →',
    home_no_meds: '🎉 Bugün planlanmış ilaç yok!',
    home_vet_visits: 'Yaklaşan Veteriner Ziyaretleri 🏥',
    home_refill_needed: '⚠️ Yenileme Gerekli',
    home_compare_prices: 'Fiyat Karşılaştır →',
    home_sos: '🚨 ACİL',
    home_mark_given_title: 'İlaç Verilsin mi? 💊',
    home_mark_given_msg: 'Bu ilacı verildi olarak işaretle?',
    home_given_btn: '✅ Evet, Verildi!',
    home_skip_title: 'İlaç Atlansin mi? ⏭️',
    home_skip_msg: 'Bu dozu atlamak istediğinden emin misin?',
    home_skip_btn: 'Atla',
    home_snooze_title: 'Hatırlatıcıyı Ertele ⏰',
    home_snooze_msg: 'Ne kadar süre erteleyelim?',
    home_snooze_5: '5 dakika',
    home_snooze_15: '15 dakika',
    home_snooze_30: '30 dakika',
    home_emergency_title: '🚨 Acil Zehir Hattı',
    home_emergency_msg: 'ASPCA Hayvan Zehir Kontrolü aransın mı?\n\n(888) 426-4435\n\nNot: Danışma ücreti alınabilir.',
    home_call_now: '📞 Şimdi Ara',
    pets_header: 'Evcil Hayvanlarım 🐾',
    pets_add_btn: '+ Ekle',
    pets_empty_title: 'Henüz Evcil Hayvan Yok',
    pets_empty_desc: 'Sağlık takibine başlamak için ilk tüylü (ya da pullu) dostunu ekle!',
    pets_add_first_btn: '+ İlk Hayvanı Ekle',
    pets_active_meds: '💊 {count} aktif ilaç',
    pets_delete_title: "{name}'i Sil? 😢",
    pets_delete_msg: 'Tüm ilaçlar, sağlık kayıtları ve randevular silinecek. Bu işlem geri alınamaz.',
    meds_header: 'İlaçlar 💊',
    meds_add_btn: '+ Ekle',
    meds_all: 'Tümü',
    meds_need_refill: 'Yenileme Gerekli',
    meds_empty_title: 'İlaç Yok',
    meds_empty_desc: 'Takibe başlamak için ilaç ekleyin.',
    meds_add_empty_btn: '+ İlaç Ekle',
    meds_refill_empty_title: 'Hepsi Tamam!',
    meds_refill_empty_desc: 'Şu an yenilenmesi gereken ilaç yok.',
    meds_dosage: 'Doz',
    meds_frequency: 'Sıklık',
    meds_times: 'Saatler',
    meds_refill_now: 'Hemen yenile!',
    meds_running_low: 'Azalıyor',
    meds_with_food: '🍽️ Yemekle birlikte ver',
    meds_buy_refill: '🛒 Yenile',
    meds_stop_btn: '⏹️ Durdur',
    meds_stop_title: '{name} Durdurulsun mu?',
    meds_stop_msg: '{name} ilacı {pet} için durdurulacak. Artık hatırlatma gönderilmeyecek.',
    meds_stop_confirm: 'İlacı Durdur',
    meds_interaction_title: '⚠️ İlaç Etkileşim Uyarısı',
    meds_add_pet_first: 'Önce Evcil Hayvan Ekle',
    meds_add_pet_msg: 'İlaç eklemeden önce evcil hayvan eklemelisiniz.',
    add_med_header: '💊 İlaç Ekle',
    add_med_select_pet: 'Evcil Hayvan Seç 🐾',
    add_med_info: 'İlaç Bilgisi 💊',
    add_med_name_placeholder: 'ör: Heartgard Plus, Apoquel',
    add_med_dosage_label: 'Doz',
    add_med_frequency: '⏰ Sıklık',
    add_med_times: '🕐 Günlük Saatler',
    add_med_duration: 'Süre 📅',
    add_med_start: 'Başlangıç Tarihi',
    add_med_end: 'Bitiş Tarihi (isteğe bağlı)',
    add_med_end_helper: 'Devam eden için boş bırakın',
    add_med_supply: 'Stok Takibi 📦',
    add_med_total_supply: 'Toplam Stok',
    add_med_supply_helper: 'Doz sayısı',
    add_med_refill_at: 'Yenileme Hatırlatması',
    add_med_refill_helper: 'Kalan doz',
    add_med_instructions: 'Özel Talimatlar 📝',
    add_med_with_food: 'Yemekle birlikte ver',
    add_med_notes_placeholder: 'Özel talimatlar, izlenecek yan etkiler...',
    add_med_save_btn: '💊 İlaç Ekle',
    add_med_saved_title: 'İlaç Eklendi! 💊',
    add_med_saved_msg: 'Planlanan saatlerde hatırlatma alacaksınız.',
    add_med_saved_ok: 'Harika! ✨',
    add_med_no_pet: 'Lütfen bir evcil hayvan seçin',
    add_med_no_name: 'Lütfen ilaç adını girin',
    add_med_error: 'İlaç kaydedilemedi. Lütfen tekrar deneyin.',
    health_header: 'Sağlık Takibi 📊',
    health_weight_tab: '⚖️ Ağırlık',
    health_symptoms_tab: '🩺 Semptomlar',
    health_vaccines_tab: '💉 Aşılar',
    health_log_weight: 'Ağırlık Kaydet ⚖️',
    health_weight_placeholder: 'Ağırlık',
    health_notes_placeholder: 'Notlar (isteğe bağlı)',
    health_log_weight_btn: '📏 Ağırlık Kaydet',
    health_weight_history: 'Ağırlık Geçmişi',
    health_log_symptoms: 'Semptom Kaydet 🩺',
    health_symptoms_hint: 'Bugün fark ettiğin tüm semptomları seç:',
    health_symptoms_notes: 'Ek notlar...',
    health_log_symptoms_btn: '📋 Semptomları Kaydet',
    health_recent_symptoms: 'Son Semptomlar',
    health_add_vaccine: 'Aşı Ekle 💉',
    health_vaccine_name: 'Aşı Adı',
    health_vaccine_placeholder: 'ör: Kuduz, DHPP, FVRCP',
    health_vaccine_due: 'Sonraki Tarih',
    health_vaccine_due_placeholder: 'YYYY-AA-GG (isteğe bağlı)',
    health_add_vaccine_btn: '💉 Aşı Ekle',
    health_vaccine_records: 'Aşı Kayıtları',
    health_vaccine_given: 'Yapıldı: {date}',
    health_vaccine_due_label: '📅 {date} tarihinde',
    health_vaccine_overdue: '⚠️ Gecikmiş',
    health_weight_saved: 'Ağırlık kaydedildi.',
    health_symptoms_saved: 'Semptomlar kaydedildi.',
    health_vaccine_saved: 'Aşı kaydedildi.',
    health_no_weight: 'Lütfen ağırlık girin',
    health_no_symptoms: 'Lütfen en az bir semptom seçin',
    health_no_vaccine_name: 'Lütfen aşı adını girin',
    health_add_pet_first: 'Önce Evcil Hayvan Ekle',
    health_add_pet_msg: 'Sağlık takibinden önce evcil hayvan eklemelisiniz.',
    settings_header: 'Ayarlar ⚙️',
    settings_premium_title: "PetPill Premium'a Geç",
    settings_premium_desc: 'Sınırsız hayvan, sağlık raporları, fiyat uyarıları ve daha fazlası!',
    settings_premium_price: '$4.99/ay',
    settings_premium_active: '🌟 Premium Aktif — Teşekkürler!',
    settings_caregivers: 'Bakıcılar 👨‍👩‍👧',
    settings_caregivers_desc: 'Evcil hayvanlarınıza bakan aile üyelerini ekleyin',
    settings_add_caregiver: '+ Bakıcı Ekle',
    settings_caregiver_name: 'İsim',
    settings_caregiver_phone: 'Telefon',
    settings_caregiver_relation: 'İlişki',
    settings_caregiver_relation_placeholder: 'ör: Eş, Çocuk, Bakıcı',
    settings_caregiver_added: 'bakıcı olarak eklendi.',
    settings_remove_caregiver_title: '{name} Kaldırılsın mı?',
    settings_remove_caregiver_msg: 'Artık bakıcı listesinde yer almayacak.',
    settings_app_settings: 'Uygulama Ayarları 🔧',
    settings_language: 'Dil',
    settings_language_desc: 'Uygulama dilini değiştir',
    settings_quick_actions: 'Hızlı İşlemler 🚀',
    settings_export: 'Sağlık Raporu Dışa Aktar',
    settings_export_desc: 'Veteriner ziyaretleri için PDF oluştur',
    settings_emergency: 'Acil İletişim',
    settings_emergency_desc: 'Zehir hattı ve acil veterinerler',
    settings_share: "PetPill'i Paylaş",
    settings_share_desc: 'Evcil hayvan seven arkadaşlarına söyle!',
    settings_about: 'Hakkında 💝',
    settings_version: 'Sürüm 1.0.0',
    settings_tagline: 'Evcil hayvan sahipleri için sevgiyle yapıldı 💕',
    settings_support: 'Destek',
    settings_rate: "PetPill'i Değerlendir",
    settings_rate_desc: 'Daha fazla hayvana yardım etmemize yardım et!',
    settings_legal: 'Yasal 📋',
    settings_privacy: 'Gizlilik Politikası',
    settings_privacy_desc: 'Verilerinizi nasıl koruduğumuz',
    settings_terms: 'Kullanım Koşulları',
    settings_terms_desc: 'Kullanım şartları ve koşullar',
    settings_emergency_title: '🚨 Acil Numaralar',
    settings_emergency_msg: 'ASPCA Zehir Kontrolü: (888) 426-4435\nEvcil Hayvan Zehir Hattı: (855) 764-7661\n\nNot: Danışma ücretleri geçerli olabilir.',
    settings_call_aspca: '📞 ASPCA\'yı Ara',
    settings_export_title: 'Evcil Hayvan Verilerini Dışa Aktar 📄',
    settings_export_confirm: "Tüm sağlık verileri, ilaç geçmişi ve aşı kayıtlarıyla bir PDF raporu oluşturun. Veteriner ziyaretleri için mükemmel!",
    settings_export_pdf_btn: '📄 PDF Aktar',
    settings_export_coming: 'PDF dışa aktarma bir sonraki güncellemede kullanılabilir olacak.',
    settings_caregiver_name_required: 'Lütfen bir isim girin',
    settings_caregiver_added_title: 'Eklendi! 👨‍👩‍👧',
    settings_upgrade_title: '🌟 PetPill Premium',
    settings_upgrade_msg: 'Sınırsız hayvan, detaylı sağlık raporları, fiyat uyarıları ve reklamsız deneyim!\n\n$4.99/ay veya $39.99/yıl',
    settings_maybe_later: 'Belki Sonra',
    settings_upgrade_btn: '🌟 Şimdi Yükselt',
    settings_welcome_premium: 'Artık tüm premium özelliklere erişiminiz var!',
    price_header: 'Fiyat Karşılaştırıcı 💰',
    price_subtitle: 'Evcil hayvan ilaçlarında en iyi fırsatları bulun',
    price_search_placeholder: 'İlaç adı ara...',
    price_search_btn: 'Ara',
    price_searching: 'En iyi fiyatlar aranıyor... 🔍',
    price_recent: 'Son Aramalar 🕐',
    price_popular: 'Popüler İlaçlar 🌟',
    price_found: '{count} eczane bulundu',
    price_best_label: 'En iyi fiyat: ${price}',
    price_best_badge: '🏆 En İyi Fiyat',
    price_out_of_stock: 'Stokta Yok',
    price_free_shipping: '🚚 Ücretsiz Kargo',
    price_shop_now: '🛒 Şimdi Al',
    price_disclaimer: '💡 Fiyatlar tahminidir ve değişebilir.',
    lang_title: 'Dil',
    lang_subtitle: 'Tercih ettiğiniz dili seçin',
    lang_saved: 'Dil güncellendi!',
    lang_saved_msg: 'Uygulama dili değiştirildi.',
  },

  de: {
    tab_home: 'Startseite',
    tab_pets: 'Haustiere',
    tab_meds: 'Medikamente',
    tab_prices: 'Preise',
    tab_health: 'Gesundheit',
    tab_more: 'Mehr',
    cancel: 'Abbrechen',
    save: 'Speichern',
    delete: 'Löschen',
    remove: 'Entfernen',
    close: 'Schließen',
    back: 'Zurück',
    ok: 'OK',
    yes: 'Ja',
    no: 'Nein',
    add: 'Hinzufügen',
    edit: 'Bearbeiten',
    oops: 'Hoppla!',
    error: 'Fehler',
    coming_soon: 'Demnächst!',
    good_morning: 'Guten Morgen',
    good_afternoon: 'Guten Tag',
    good_evening: 'Guten Abend',
    home_welcome_title: 'Willkommen bei PetPill!',
    home_welcome_desc: 'Füge dein erstes Haustier hinzu, um Medikamente und Gesundheit zu verwalten.',
    home_add_pet_btn: '+ Haustier hinzufügen',
    home_today: 'Heute',
    home_day_streak: 'Tage-Serie',
    home_pets: 'Haustiere',
    home_progress: 'Heutiger Fortschritt 🎯',
    home_perfect: '% abgeschlossen 🎉 Perfekt!',
    home_complete: '% abgeschlossen',
    home_schedule: 'Heutiger Zeitplan 📋',
    home_see_all: 'Alle anzeigen →',
    home_no_meds: '🎉 Heute keine Medikamente geplant!',
    home_vet_visits: 'Bevorstehende Tierarztbesuche 🏥',
    home_refill_needed: '⚠️ Nachfüllen erforderlich',
    home_compare_prices: 'Preise vergleichen →',
    home_sos: '🚨 SOS',
    home_mark_given_title: 'Medikament gegeben? 💊',
    home_mark_given_msg: 'Dieses Medikament als gegeben markieren?',
    home_given_btn: '✅ Ja, gegeben!',
    home_skip_title: 'Medikament überspringen? ⏭️',
    home_skip_msg: 'Bist du sicher, dass du diese Dosis überspringen möchtest?',
    home_skip_btn: 'Überspringen',
    home_snooze_title: 'Erinnerung verschieben ⏰',
    home_snooze_msg: 'Wie lange verschieben?',
    home_snooze_5: '5 Minuten',
    home_snooze_15: '15 Minuten',
    home_snooze_30: '30 Minuten',
    home_emergency_title: '🚨 Notfall-Giftstoffhotline',
    home_emergency_msg: 'ASPCA Tier-Giftkontrolle anrufen?\n\n(888) 426-4435\n\nHinweis: Beratungsgebühren können anfallen.',
    home_call_now: '📞 Jetzt anrufen',
    pets_header: 'Meine Haustiere 🐾',
    pets_add_btn: '+ Hinzufügen',
    pets_empty_title: 'Noch keine Haustiere',
    pets_empty_desc: 'Füge deinen ersten pelzigen (oder schuppigen) Freund hinzu!',
    pets_add_first_btn: '+ Erstes Haustier hinzufügen',
    pets_active_meds: '💊 {count} aktive Medikamente',
    pets_delete_title: '{name} löschen? 😢',
    pets_delete_msg: 'Alle Medikamente, Gesundheitsdaten und Termine werden gelöscht. Dies kann nicht rückgängig gemacht werden.',
    meds_header: 'Medikamente 💊',
    meds_add_btn: '+ Hinzufügen',
    meds_all: 'Alle',
    meds_need_refill: 'Nachfüllen erforderlich',
    meds_empty_title: 'Keine Medikamente',
    meds_empty_desc: 'Füge ein Medikament hinzu, um mit der Verfolgung zu beginnen.',
    meds_add_empty_btn: '+ Medikament hinzufügen',
    meds_refill_empty_title: 'Alles vorrätig!',
    meds_refill_empty_desc: 'Keines deiner Medikamente muss gerade nachgefüllt werden.',
    meds_dosage: 'Dosierung',
    meds_frequency: 'Häufigkeit',
    meds_times: 'Zeiten',
    meds_refill_now: 'Jetzt nachfüllen!',
    meds_running_low: 'Wird knapp',
    meds_with_food: '🍽️ Mit Futter geben',
    meds_buy_refill: '🛒 Nachfüllen',
    meds_stop_btn: '⏹️ Stoppen',
    meds_stop_title: '{name} stoppen?',
    meds_stop_msg: '{name} wird für {pet} deaktiviert. Es werden keine weiteren Erinnerungen gesendet.',
    meds_stop_confirm: 'Medikament stoppen',
    meds_interaction_title: '⚠️ Wechselwirkungswarnung',
    meds_add_pet_first: 'Zuerst Haustier hinzufügen',
    meds_add_pet_msg: 'Du musst ein Haustier hinzufügen, bevor du Medikamente verwalten kannst.',
    add_med_header: '💊 Medikament hinzufügen',
    add_med_select_pet: 'Haustier auswählen 🐾',
    add_med_info: 'Medikamenteninformation 💊',
    add_med_name_placeholder: 'z.B. Heartgard Plus, Apoquel',
    add_med_dosage_label: 'Dosierung',
    add_med_frequency: '⏰ Häufigkeit',
    add_med_times: '🕐 Tageszeiten',
    add_med_duration: 'Dauer 📅',
    add_med_start: 'Startdatum',
    add_med_end: 'Enddatum (optional)',
    add_med_end_helper: 'Leer lassen für fortlaufend',
    add_med_supply: 'Vorrat verfolgen 📦',
    add_med_total_supply: 'Gesamtvorrat',
    add_med_supply_helper: 'Anzahl der Dosen',
    add_med_refill_at: 'Erinnerung zum Nachfüllen bei',
    add_med_refill_helper: 'Verbleibende Dosen',
    add_med_instructions: 'Besondere Anweisungen 📝',
    add_med_with_food: 'Mit Futter geben',
    add_med_notes_placeholder: 'Besondere Anweisungen, zu beobachtende Nebenwirkungen...',
    add_med_save_btn: '💊 Medikament hinzufügen',
    add_med_saved_title: 'Medikament hinzugefügt! 💊',
    add_med_saved_msg: 'Du erhältst Erinnerungen zu den geplanten Zeiten.',
    add_med_saved_ok: 'Toll! ✨',
    add_med_no_pet: 'Bitte wähle ein Haustier aus',
    add_med_no_name: 'Bitte gib den Medikamentennamen ein',
    add_med_error: 'Medikament konnte nicht gespeichert werden. Bitte erneut versuchen.',
    health_header: 'Gesundheits-Tracker 📊',
    health_weight_tab: '⚖️ Gewicht',
    health_symptoms_tab: '🩺 Symptome',
    health_vaccines_tab: '💉 Impfungen',
    health_log_weight: 'Gewicht erfassen ⚖️',
    health_weight_placeholder: 'Gewicht',
    health_notes_placeholder: 'Notizen (optional)',
    health_log_weight_btn: '📏 Gewicht speichern',
    health_weight_history: 'Gewichtsverlauf',
    health_log_symptoms: 'Symptome erfassen 🩺',
    health_symptoms_hint: 'Wähle alle heute bemerkten Symptome aus:',
    health_symptoms_notes: 'Weitere Notizen...',
    health_log_symptoms_btn: '📋 Symptome speichern',
    health_recent_symptoms: 'Letzte Symptome',
    health_add_vaccine: 'Impfung hinzufügen 💉',
    health_vaccine_name: 'Impfstoffname',
    health_vaccine_placeholder: 'z.B. Tollwut, DHPP, FVRCP',
    health_vaccine_due: 'Nächstes Fälligkeitsdatum',
    health_vaccine_due_placeholder: 'JJJJ-MM-TT (optional)',
    health_add_vaccine_btn: '💉 Impfung hinzufügen',
    health_vaccine_records: 'Impfaufzeichnungen',
    health_vaccine_given: 'Gegeben: {date}',
    health_vaccine_due_label: '📅 Fällig {date}',
    health_vaccine_overdue: '⚠️ Überfällig',
    health_weight_saved: 'Gewicht wurde gespeichert.',
    health_symptoms_saved: 'Symptome wurden aufgezeichnet.',
    health_vaccine_saved: 'Impfung wurde gespeichert.',
    health_no_weight: 'Bitte Gewicht eingeben',
    health_no_symptoms: 'Bitte mindestens ein Symptom auswählen',
    health_no_vaccine_name: 'Bitte Impfstoffname eingeben',
    health_add_pet_first: 'Zuerst Haustier hinzufügen',
    health_add_pet_msg: 'Du musst ein Haustier hinzufügen, bevor du die Gesundheit verfolgen kannst.',
    settings_header: 'Einstellungen ⚙️',
    settings_premium_title: 'Upgrade auf PetPill Premium',
    settings_premium_desc: 'Unbegrenzte Haustiere, Gesundheitsberichte, Preisalarme & mehr!',
    settings_premium_price: '$4,99/Monat',
    settings_premium_active: '🌟 Premium aktiv — Danke!',
    settings_caregivers: 'Betreuer 👨‍👩‍👧',
    settings_caregivers_desc: 'Familienmitglieder hinzufügen, die sich um deine Haustiere kümmern',
    settings_add_caregiver: '+ Betreuer hinzufügen',
    settings_caregiver_name: 'Name',
    settings_caregiver_phone: 'Telefon',
    settings_caregiver_relation: 'Beziehung',
    settings_caregiver_relation_placeholder: 'z.B. Ehepartner, Kind, Tiersitter',
    settings_caregiver_added: 'wurde als Betreuer hinzugefügt.',
    settings_remove_caregiver_title: '{name} entfernen?',
    settings_remove_caregiver_msg: 'Sie werden nicht mehr als Betreuer aufgeführt.',
    settings_app_settings: 'App-Einstellungen 🔧',
    settings_language: 'Sprache',
    settings_language_desc: 'App-Sprache ändern',
    settings_quick_actions: 'Schnellaktionen 🚀',
    settings_export: 'Gesundheitsbericht exportieren',
    settings_export_desc: 'PDF für Tierarztbesuche erstellen',
    settings_emergency: 'Notfallkontakte',
    settings_emergency_desc: 'Gifthotline und Notfalltierärzte',
    settings_share: 'PetPill teilen',
    settings_share_desc: 'Erzähl deinen tierliebenden Freunden davon!',
    settings_about: 'Über uns 💝',
    settings_version: 'Version 1.0.0',
    settings_tagline: 'Mit Liebe für Tierbesitzer überall gemacht 💕',
    settings_support: 'Support kontaktieren',
    settings_rate: 'PetPill bewerten',
    settings_rate_desc: 'Hilf uns, mehr Haustieren zu helfen!',
    settings_legal: 'Rechtliches 📋',
    settings_privacy: 'Datenschutzrichtlinie',
    settings_privacy_desc: 'Wie wir deine Daten schützen',
    settings_terms: 'Nutzungsbedingungen',
    settings_terms_desc: 'Nutzungsbedingungen',
    settings_emergency_title: '🚨 Notfallnummern',
    settings_emergency_msg: 'ASPCA Giftkontrolle: (888) 426-4435\nTier-Gifthotline: (855) 764-7661\n\nHinweis: Beratungsgebühren können anfallen.',
    settings_call_aspca: '📞 ASPCA anrufen',
    settings_export_title: 'Haustierdaten exportieren 📄',
    settings_export_confirm: "Erstellen Sie einen PDF-Bericht mit allen Gesundheitsdaten, Medikamentenhistorie und Impfunterlagen Ihres Haustieres. Perfekt für Tierarztbesuche!",
    settings_export_pdf_btn: '📄 PDF exportieren',
    settings_export_coming: 'PDF-Export wird im nächsten Update verfügbar sein.',
    settings_caregiver_name_required: 'Bitte geben Sie einen Namen ein',
    settings_caregiver_added_title: 'Hinzugefügt! 👨‍👩‍👧',
    settings_upgrade_title: '🌟 PetPill Premium',
    settings_upgrade_msg: 'Unbegrenzte Haustiere, detaillierte Gesundheitsberichte, Preisalarme und werbefreies Erlebnis!\n\n$4,99/Monat oder $39,99/Jahr',
    settings_maybe_later: 'Vielleicht später',
    settings_upgrade_btn: '🌟 Jetzt upgraden',
    settings_welcome_premium: 'Du hast jetzt Zugang zu allen Premium-Funktionen!',
    price_header: 'Preisvergleich 💰',
    price_subtitle: 'Finde die besten Angebote für Tiermedikamente',
    price_search_placeholder: 'Medikamentenname suchen...',
    price_search_btn: 'Suchen',
    price_searching: 'Beste Preise werden gesucht... 🔍',
    price_recent: 'Letzte Suchen 🕐',
    price_popular: 'Beliebte Medikamente 🌟',
    price_found: '{count} Apotheken gefunden',
    price_best_label: 'Bester Preis: ${price}',
    price_best_badge: '🏆 Bester Preis',
    price_out_of_stock: 'Nicht vorrätig',
    price_free_shipping: '🚚 Kostenloser Versand',
    price_shop_now: '🛒 Jetzt kaufen',
    price_disclaimer: '💡 Preise sind Schätzungen und können variieren.',
    lang_title: 'Sprache',
    lang_subtitle: 'Bevorzugte Sprache auswählen',
    lang_saved: 'Sprache aktualisiert!',
    lang_saved_msg: 'Die App-Sprache wurde geändert.',
  },

  fr: {
    tab_home: 'Accueil',
    tab_pets: 'Animaux',
    tab_meds: 'Médicaments',
    tab_prices: 'Prix',
    tab_health: 'Santé',
    tab_more: 'Plus',
    cancel: 'Annuler',
    save: 'Enregistrer',
    delete: 'Supprimer',
    remove: 'Retirer',
    close: 'Fermer',
    back: 'Retour',
    ok: 'OK',
    yes: 'Oui',
    no: 'Non',
    add: 'Ajouter',
    edit: 'Modifier',
    oops: 'Oups!',
    error: 'Erreur',
    coming_soon: 'Bientôt!',
    good_morning: 'Bonjour',
    good_afternoon: 'Bon après-midi',
    good_evening: 'Bonsoir',
    home_welcome_title: 'Bienvenue sur PetPill!',
    home_welcome_desc: 'Ajoutez votre premier animal pour gérer ses médicaments et sa santé.',
    home_add_pet_btn: '+ Ajouter un animal',
    home_today: "Aujourd'hui",
    home_day_streak: 'Jours consécutifs',
    home_pets: 'Animaux',
    home_progress: "Progrès d'aujourd'hui 🎯",
    home_perfect: '% complété 🎉 Parfait!',
    home_complete: '% complété',
    home_schedule: "Programme d'aujourd'hui 📋",
    home_see_all: 'Tout voir →',
    home_no_meds: "🎉 Aucun médicament prévu aujourd'hui!",
    home_vet_visits: 'Visites vétérinaires à venir 🏥',
    home_refill_needed: '⚠️ Renouvellement requis',
    home_compare_prices: 'Comparer les prix →',
    home_sos: '🚨 SOS',
    home_mark_given_title: 'Médicament donné? 💊',
    home_mark_given_msg: 'Marquer ce médicament comme donné?',
    home_given_btn: '✅ Oui, donné!',
    home_skip_title: 'Sauter le médicament? ⏭️',
    home_skip_msg: 'Êtes-vous sûr de vouloir sauter cette dose?',
    home_skip_btn: 'Sauter',
    home_snooze_title: 'Reporter le rappel ⏰',
    home_snooze_msg: 'Reporter de combien de temps?',
    home_snooze_5: '5 minutes',
    home_snooze_15: '15 minutes',
    home_snooze_30: '30 minutes',
    home_emergency_title: "🚨 Ligne d'urgence empoisonnement",
    home_emergency_msg: "Appeler le contrôle antipoison ASPCA?\n\n(888) 426-4435\n\nNote: Des frais de consultation peuvent s'appliquer.",
    home_call_now: '📞 Appeler maintenant',
    pets_header: 'Mes animaux 🐾',
    pets_add_btn: '+ Ajouter',
    pets_empty_title: 'Aucun animal',
    pets_empty_desc: 'Ajoutez votre premier ami poilu (ou écailleux) pour commencer!',
    pets_add_first_btn: '+ Ajouter mon premier animal',
    pets_active_meds: '💊 {count} médicaments actifs',
    pets_delete_title: 'Supprimer {name}? 😢',
    pets_delete_msg: 'Tous les médicaments, dossiers de santé et rendez-vous seront supprimés. Cette action est irréversible.',
    meds_header: 'Médicaments 💊',
    meds_add_btn: '+ Ajouter',
    meds_all: 'Tous',
    meds_need_refill: 'Renouvellement requis',
    meds_empty_title: 'Aucun médicament',
    meds_empty_desc: 'Ajoutez un médicament pour commencer le suivi.',
    meds_add_empty_btn: '+ Ajouter un médicament',
    meds_refill_empty_title: 'Tout est en stock!',
    meds_refill_empty_desc: "Aucun de vos médicaments n'a besoin d'être renouvelé pour l'instant.",
    meds_dosage: 'Dosage',
    meds_frequency: 'Fréquence',
    meds_times: 'Horaires',
    meds_refill_now: 'Renouveler maintenant!',
    meds_running_low: 'Stock faible',
    meds_with_food: '🍽️ Donner avec la nourriture',
    meds_buy_refill: '🛒 Renouveler',
    meds_stop_btn: '⏹️ Arrêter',
    meds_stop_title: 'Arrêter {name}?',
    meds_stop_msg: '{name} sera désactivé pour {pet}. Aucun rappel ne sera plus envoyé.',
    meds_stop_confirm: 'Arrêter le médicament',
    meds_interaction_title: "⚠️ Avertissement d'interaction médicamenteuse",
    meds_add_pet_first: "D'abord ajouter un animal",
    meds_add_pet_msg: 'Vous devez ajouter un animal avant de gérer les médicaments.',
    add_med_header: '💊 Ajouter un médicament',
    add_med_select_pet: 'Sélectionner un animal 🐾',
    add_med_info: 'Informations sur le médicament 💊',
    add_med_name_placeholder: 'ex: Heartgard Plus, Apoquel',
    add_med_dosage_label: 'Dosage',
    add_med_frequency: '⏰ Fréquence',
    add_med_times: '🕐 Horaires de prise',
    add_med_duration: 'Durée 📅',
    add_med_start: 'Date de début',
    add_med_end: 'Date de fin (optionnel)',
    add_med_end_helper: 'Laisser vide pour continu',
    add_med_supply: 'Suivi des stocks 📦',
    add_med_total_supply: 'Stock total',
    add_med_supply_helper: 'Nombre de doses',
    add_med_refill_at: 'Rappel de renouvellement à',
    add_med_refill_helper: 'Doses restantes',
    add_med_instructions: 'Instructions spéciales 📝',
    add_med_with_food: 'Donner avec la nourriture',
    add_med_notes_placeholder: 'Instructions spéciales, effets secondaires à surveiller...',
    add_med_save_btn: '💊 Ajouter le médicament',
    add_med_saved_title: 'Médicament ajouté! 💊',
    add_med_saved_msg: 'Vous recevrez des rappels aux heures prévues.',
    add_med_saved_ok: 'Super! ✨',
    add_med_no_pet: 'Veuillez sélectionner un animal',
    add_med_no_name: 'Veuillez entrer le nom du médicament',
    add_med_error: 'Impossible de sauvegarder le médicament. Veuillez réessayer.',
    health_header: 'Suivi santé 📊',
    health_weight_tab: '⚖️ Poids',
    health_symptoms_tab: '🩺 Symptômes',
    health_vaccines_tab: '💉 Vaccins',
    health_log_weight: 'Enregistrer le poids ⚖️',
    health_weight_placeholder: 'Poids',
    health_notes_placeholder: 'Notes (optionnel)',
    health_log_weight_btn: '📏 Enregistrer le poids',
    health_weight_history: 'Historique du poids',
    health_log_symptoms: 'Enregistrer les symptômes 🩺',
    health_symptoms_hint: "Sélectionnez tous les symptômes remarqués aujourd'hui:",
    health_symptoms_notes: 'Notes supplémentaires...',
    health_log_symptoms_btn: '📋 Enregistrer les symptômes',
    health_recent_symptoms: 'Symptômes récents',
    health_add_vaccine: 'Ajouter une vaccination 💉',
    health_vaccine_name: 'Nom du vaccin',
    health_vaccine_placeholder: 'ex: Rage, DHPP, FVRCP',
    health_vaccine_due: 'Prochaine date',
    health_vaccine_due_placeholder: 'AAAA-MM-JJ (optionnel)',
    health_add_vaccine_btn: '💉 Ajouter la vaccination',
    health_vaccine_records: 'Dossiers de vaccination',
    health_vaccine_given: 'Donné: {date}',
    health_vaccine_due_label: '📅 Prévu le {date}',
    health_vaccine_overdue: '⚠️ En retard',
    health_weight_saved: 'Le poids a été enregistré.',
    health_symptoms_saved: 'Les symptômes ont été enregistrés.',
    health_vaccine_saved: 'La vaccination a été enregistrée.',
    health_no_weight: 'Veuillez entrer un poids',
    health_no_symptoms: 'Veuillez sélectionner au moins un symptôme',
    health_no_vaccine_name: 'Veuillez entrer le nom du vaccin',
    health_add_pet_first: "D'abord ajouter un animal",
    health_add_pet_msg: "Vous devez ajouter un animal avant de suivre sa santé.",
    settings_header: 'Paramètres ⚙️',
    settings_premium_title: 'Passer à PetPill Premium',
    settings_premium_desc: 'Animaux illimités, rapports de santé, alertes de prix & plus!',
    settings_premium_price: '4,99$/mois',
    settings_premium_active: '🌟 Premium actif — Merci!',
    settings_caregivers: 'Aidants 👨‍👩‍👧',
    settings_caregivers_desc: 'Ajoutez des membres de la famille qui prennent soin de vos animaux',
    settings_add_caregiver: '+ Ajouter un aidant',
    settings_caregiver_name: 'Nom',
    settings_caregiver_phone: 'Téléphone',
    settings_caregiver_relation: 'Relation',
    settings_caregiver_relation_placeholder: 'ex: Conjoint, Enfant, Gardien',
    settings_caregiver_added: 'a été ajouté comme aidant.',
    settings_remove_caregiver_title: 'Retirer {name}?',
    settings_remove_caregiver_msg: "Ils ne seront plus listés comme aidants.",
    settings_app_settings: "Paramètres de l'app 🔧",
    settings_language: 'Langue',
    settings_language_desc: "Changer la langue de l'application",
    settings_quick_actions: 'Actions rapides 🚀',
    settings_export: 'Exporter le rapport de santé',
    settings_export_desc: 'Générer un PDF pour les visites vétérinaires',
    settings_emergency: "Contacts d'urgence",
    settings_emergency_desc: "Ligne antipoison et vétérinaires d'urgence",
    settings_share: 'Partager PetPill',
    settings_share_desc: 'Parlez-en à vos amis qui aiment les animaux!',
    settings_about: 'À propos 💝',
    settings_version: 'Version 1.0.0',
    settings_tagline: 'Fait avec amour pour les propriétaires de animaux partout 💕',
    settings_support: 'Contacter le support',
    settings_rate: 'Évaluer PetPill',
    settings_rate_desc: "Aidez-nous à aider plus d'animaux!",
    settings_legal: 'Mentions légales 📋',
    settings_privacy: 'Politique de confidentialité',
    settings_privacy_desc: 'Comment nous protégeons vos données',
    settings_terms: "Conditions d'utilisation",
    settings_terms_desc: "Conditions générales d'utilisation",
    settings_emergency_title: '🚨 Numéros d\'urgence',
    settings_emergency_msg: 'ASPCA Antipoison: (888) 426-4435\nLigne antipoison animaux: (855) 764-7661\n\nNote: Des frais de consultation peuvent s\'appliquer.',
    settings_call_aspca: "📞 Appeler l'ASPCA",
    settings_export_title: 'Exporter les données 📄',
    settings_export_confirm: "Générez un rapport PDF avec toutes les données de santé, l'historique des médicaments et les dossiers de vaccination. Parfait pour les visites chez le vétérinaire!",
    settings_export_pdf_btn: '📄 Exporter PDF',
    settings_export_coming: "L'export PDF sera disponible dans la prochaine mise à jour.",
    settings_caregiver_name_required: 'Veuillez entrer un nom',
    settings_caregiver_added_title: 'Ajouté! 👨‍👩‍👧',
    settings_upgrade_title: '🌟 PetPill Premium',
    settings_upgrade_msg: "Animaux illimités, rapports de santé détaillés, alertes de prix et expérience sans pub!\n\n4,99$/mois ou 39,99$/an",
    settings_maybe_later: 'Peut-être plus tard',
    settings_upgrade_btn: '🌟 Mettre à niveau',
    settings_welcome_premium: 'Vous avez maintenant accès à toutes les fonctionnalités premium!',
    price_header: 'Comparateur de prix 💰',
    price_subtitle: 'Trouvez les meilleures offres sur les médicaments',
    price_search_placeholder: 'Rechercher un médicament...',
    price_search_btn: 'Rechercher',
    price_searching: 'Recherche des meilleurs prix... 🔍',
    price_recent: 'Recherches récentes 🕐',
    price_popular: 'Médicaments populaires 🌟',
    price_found: '{count} pharmacies trouvées',
    price_best_label: 'Meilleur prix: ${price}',
    price_best_badge: '🏆 Meilleur prix',
    price_out_of_stock: 'Rupture de stock',
    price_free_shipping: '🚚 Livraison gratuite',
    price_shop_now: '🛒 Acheter',
    price_disclaimer: '💡 Les prix sont des estimations et peuvent varier.',
    lang_title: 'Langue',
    lang_subtitle: 'Sélectionnez votre langue préférée',
    lang_saved: 'Langue mise à jour!',
    lang_saved_msg: "La langue de l'application a été changée.",
  },

  ar: {
    tab_home: 'الرئيسية',
    tab_pets: 'الحيوانات',
    tab_meds: 'الأدوية',
    tab_prices: 'الأسعار',
    tab_health: 'الصحة',
    tab_more: 'المزيد',
    cancel: 'إلغاء',
    save: 'حفظ',
    delete: 'حذف',
    remove: 'إزالة',
    close: 'إغلاق',
    back: 'رجوع',
    ok: 'حسناً',
    yes: 'نعم',
    no: 'لا',
    add: 'إضافة',
    edit: 'تعديل',
    oops: 'عذراً!',
    error: 'خطأ',
    coming_soon: 'قريباً!',
    good_morning: 'صباح الخير',
    good_afternoon: 'مساء الخير',
    good_evening: 'مساء النور',
    home_welcome_title: '!مرحباً بك في PetPill',
    home_welcome_desc: 'أضف حيوانك الأليف الأول لبدء إدارة أدويته وصحته.',
    home_add_pet_btn: '+ إضافة حيوان أليف',
    home_today: 'اليوم',
    home_day_streak: 'أيام متتالية',
    home_pets: 'الحيوانات',
    home_progress: '🎯 تقدم اليوم',
    home_perfect: '% مكتمل 🎉 ممتاز!',
    home_complete: '% مكتمل',
    home_schedule: '📋 جدول اليوم',
    home_see_all: '← عرض الكل',
    home_no_meds: '!🎉 لا توجد أدوية مجدولة اليوم',
    home_vet_visits: '🏥 زيارات البيطري القادمة',
    home_refill_needed: '⚠️ يحتاج إعادة تعبئة',
    home_compare_prices: '← مقارنة الأسعار',
    home_sos: '🚨 طوارئ',
    home_mark_given_title: '💊 إعطاء الدواء؟',
    home_mark_given_msg: 'هل تريد تحديد هذا الدواء كمُعطى؟',
    home_given_btn: '✅ نعم، تم إعطاؤه!',
    home_skip_title: '⏭️ تخطي الدواء؟',
    home_skip_msg: 'هل أنت متأكد من تخطي هذه الجرعة؟',
    home_skip_btn: 'تخطي',
    home_snooze_title: '⏰ تأجيل التذكير',
    home_snooze_msg: 'كم من الوقت للتأجيل؟',
    home_snooze_5: '5 دقائق',
    home_snooze_15: '15 دقيقة',
    home_snooze_30: '30 دقيقة',
    home_emergency_title: '🚨 خط طوارئ التسمم',
    home_emergency_msg: 'هل تريد الاتصال بمركز تحكم السموم ASPCA؟\n\n(888) 426-4435\n\nملاحظة: قد تُطبق رسوم استشارة.',
    home_call_now: '📞 اتصل الآن',
    pets_header: '🐾 حيواناتي الأليفة',
    pets_add_btn: '+ إضافة',
    pets_empty_title: 'لا توجد حيوانات بعد',
    pets_empty_desc: 'أضف صديقك الأول لبدء تتبع صحته!',
    pets_add_first_btn: '+ إضافة أول حيوان',
    pets_active_meds: '💊 {count} أدوية نشطة',
    pets_delete_title: 'حذف {name}؟ 😢',
    pets_delete_msg: 'سيتم حذف جميع الأدوية والسجلات الصحية والمواعيد. لا يمكن التراجع.',
    meds_header: '💊 الأدوية',
    meds_add_btn: '+ إضافة',
    meds_all: 'الكل',
    meds_need_refill: 'يحتاج تعبئة',
    meds_empty_title: 'لا توجد أدوية',
    meds_empty_desc: 'أضف دواءً لبدء التتبع.',
    meds_add_empty_btn: '+ إضافة دواء',
    meds_refill_empty_title: 'المخزون كافٍ!',
    meds_refill_empty_desc: 'لا يحتاج أي من أدويتك إلى إعادة تعبئة الآن.',
    meds_dosage: 'الجرعة',
    meds_frequency: 'التكرار',
    meds_times: 'الأوقات',
    meds_refill_now: 'أعد التعبئة الآن!',
    meds_running_low: 'المخزون ينفد',
    meds_with_food: '🍽️ أعطه مع الطعام',
    meds_buy_refill: '🛒 إعادة تعبئة',
    meds_stop_btn: '⏹️ إيقاف',
    meds_stop_title: 'إيقاف {name}؟',
    meds_stop_msg: 'سيتم تعطيل {name} لـ {pet}. لن تُرسل تذكيرات أخرى.',
    meds_stop_confirm: 'إيقاف الدواء',
    meds_interaction_title: '⚠️ تحذير تفاعل الأدوية',
    meds_add_pet_first: 'أضف حيواناً أولاً',
    meds_add_pet_msg: 'يجب إضافة حيوان أليف قبل إدارة الأدوية.',
    add_med_header: '💊 إضافة دواء',
    add_med_select_pet: '🐾 اختر الحيوان الأليف',
    add_med_info: '💊 معلومات الدواء',
    add_med_name_placeholder: 'مثال: Heartgard Plus',
    add_med_dosage_label: 'الجرعة',
    add_med_frequency: '⏰ التكرار',
    add_med_times: '🕐 أوقات اليوم',
    add_med_duration: '📅 المدة',
    add_med_start: 'تاريخ البدء',
    add_med_end: 'تاريخ الانتهاء (اختياري)',
    add_med_end_helper: 'اتركه فارغاً للاستمرار',
    add_med_supply: '📦 تتبع المخزون',
    add_med_total_supply: 'إجمالي المخزون',
    add_med_supply_helper: 'عدد الجرعات',
    add_med_refill_at: 'تذكير إعادة التعبئة عند',
    add_med_refill_helper: 'الجرعات المتبقية',
    add_med_instructions: '📝 تعليمات خاصة',
    add_med_with_food: 'أعطه مع الطعام',
    add_med_notes_placeholder: 'تعليمات خاصة، آثار جانبية للمراقبة...',
    add_med_save_btn: '💊 إضافة الدواء',
    add_med_saved_title: '💊 تمت إضافة الدواء!',
    add_med_saved_msg: 'ستتلقى تذكيرات في الأوقات المحددة.',
    add_med_saved_ok: 'رائع! ✨',
    add_med_no_pet: 'الرجاء اختيار حيوان أليف',
    add_med_no_name: 'الرجاء إدخال اسم الدواء',
    add_med_error: 'فشل حفظ الدواء. الرجاء المحاولة مجدداً.',
    health_header: '📊 متتبع الصحة',
    health_weight_tab: '⚖️ الوزن',
    health_symptoms_tab: '🩺 الأعراض',
    health_vaccines_tab: '💉 التطعيمات',
    health_log_weight: '⚖️ تسجيل الوزن',
    health_weight_placeholder: 'الوزن',
    health_notes_placeholder: 'ملاحظات (اختياري)',
    health_log_weight_btn: '📏 حفظ الوزن',
    health_weight_history: 'تاريخ الوزن',
    health_log_symptoms: '🩺 تسجيل الأعراض',
    health_symptoms_hint: 'اختر جميع الأعراض التي لاحظتها اليوم:',
    health_symptoms_notes: 'ملاحظات إضافية...',
    health_log_symptoms_btn: '📋 حفظ الأعراض',
    health_recent_symptoms: 'الأعراض الأخيرة',
    health_add_vaccine: '💉 إضافة تطعيم',
    health_vaccine_name: 'اسم اللقاح',
    health_vaccine_placeholder: 'مثال: داء الكلب، DHPP',
    health_vaccine_due: 'الموعد التالي',
    health_vaccine_due_placeholder: 'YYYY-MM-DD (اختياري)',
    health_add_vaccine_btn: '💉 إضافة التطعيم',
    health_vaccine_records: 'سجلات التطعيم',
    health_vaccine_given: 'أُعطي: {date}',
    health_vaccine_due_label: '📅 موعده {date}',
    health_vaccine_overdue: '⚠️ متأخر',
    health_weight_saved: 'تم تسجيل الوزن.',
    health_symptoms_saved: 'تم تسجيل الأعراض.',
    health_vaccine_saved: 'تم تسجيل التطعيم.',
    health_no_weight: 'الرجاء إدخال الوزن',
    health_no_symptoms: 'الرجاء اختيار عرض واحد على الأقل',
    health_no_vaccine_name: 'الرجاء إدخال اسم اللقاح',
    health_add_pet_first: 'أضف حيواناً أولاً',
    health_add_pet_msg: 'يجب إضافة حيوان أليف قبل تتبع صحته.',
    settings_header: '⚙️ الإعدادات',
    settings_premium_title: 'الترقية إلى PetPill Premium',
    settings_premium_desc: 'حيوانات غير محدودة، تقارير صحية، تنبيهات أسعار والمزيد!',
    settings_premium_price: '$4.99/شهر',
    settings_premium_active: '🌟 Premium نشط — شكراً!',
    settings_caregivers: '👨‍👩‍👧 مقدمو الرعاية',
    settings_caregivers_desc: 'أضف أفراد العائلة الذين يرعون حيواناتك',
    settings_add_caregiver: '+ إضافة مقدم رعاية',
    settings_caregiver_name: 'الاسم',
    settings_caregiver_phone: 'الهاتف',
    settings_caregiver_relation: 'العلاقة',
    settings_caregiver_relation_placeholder: 'مثال: زوج، طفل، مربي',
    settings_caregiver_added: 'تمت إضافته كمقدم رعاية.',
    settings_remove_caregiver_title: 'إزالة {name}؟',
    settings_remove_caregiver_msg: 'لن يكون مدرجاً كمقدم رعاية بعد الآن.',
    settings_app_settings: '🔧 إعدادات التطبيق',
    settings_language: 'اللغة',
    settings_language_desc: 'تغيير لغة التطبيق',
    settings_quick_actions: '🚀 إجراءات سريعة',
    settings_export: 'تصدير التقرير الصحي',
    settings_export_desc: 'إنشاء PDF لزيارات البيطري',
    settings_emergency: 'جهات الطوارئ',
    settings_emergency_desc: 'خط السموم وأطباء بيطريون للطوارئ',
    settings_share: 'مشاركة PetPill',
    settings_share_desc: 'أخبر أصدقاءك محبي الحيوانات!',
    settings_about: '💝 حول',
    settings_version: 'الإصدار 1.0.0',
    settings_tagline: 'صُنع بمحبة لأصحاب الحيوانات الأليفة في كل مكان 💕',
    settings_support: 'تواصل مع الدعم',
    settings_rate: 'تقييم PetPill',
    settings_rate_desc: 'ساعدنا على مساعدة المزيد من الحيوانات!',
    settings_legal: '📋 قانوني',
    settings_privacy: 'سياسة الخصوصية',
    settings_privacy_desc: 'كيف نحمي بياناتك',
    settings_terms: 'شروط الخدمة',
    settings_terms_desc: 'شروط وأحكام الاستخدام',
    settings_emergency_title: '🚨 أرقام الطوارئ',
    settings_emergency_msg: 'ASPCA للسموم: (888) 426-4435\nخط سموم الحيوانات: (855) 764-7661\n\nملاحظة: قد تُطبق رسوم استشارة.',
    settings_call_aspca: '📞 اتصل بـ ASPCA',
    settings_export_title: 'تصدير بيانات الحيوان 📄',
    settings_export_confirm: 'إنشاء تقرير PDF بجميع بيانات صحة حيوانك الأليف وتاريخ الأدوية وسجلات التطعيم. مثالي لزيارات الطبيح البيطري!',
    settings_export_pdf_btn: '📄 تصدير PDF',
    settings_export_coming: 'سيتوفر تصدير PDF في التحديث القادم.',
    settings_caregiver_name_required: 'الرجاء إدخال اسم',
    settings_caregiver_added_title: 'تمت الإضافة! 👨‍👩‍👧',
    settings_upgrade_title: '🌟 PetPill Premium',
    settings_upgrade_msg: 'حيوانات غير محدودة، تقارير صحية مفصلة، تنبيهات أسعار وتجربة بدون إعلانات!\n\n$4.99/شهر أو $39.99/سنة',
    settings_maybe_later: 'ربما لاحقاً',
    settings_upgrade_btn: '🌟 ترقِّ الآن',
    settings_welcome_premium: 'لديك الآن وصول إلى جميع الميزات المميزة!',
    price_header: '💰 مقارنة الأسعار',
    price_subtitle: 'اعثر على أفضل العروض على أدوية الحيوانات',
    price_search_placeholder: 'ابحث عن اسم دواء...',
    price_search_btn: 'بحث',
    price_searching: 'جارٍ البحث عن أفضل الأسعار... 🔍',
    price_recent: '🕐 عمليات البحث الأخيرة',
    price_popular: '🌟 الأدوية الشائعة',
    price_found: 'تم العثور على {count} صيدليات',
    price_best_label: 'أفضل سعر: ${price}',
    price_best_badge: '🏆 أفضل سعر',
    price_out_of_stock: 'غير متوفر',
    price_free_shipping: '🚚 شحن مجاني',
    price_shop_now: '🛒 اشتر الآن',
    price_disclaimer: '💡 الأسعار تقريبية وقد تتغير.',
    lang_title: 'اللغة',
    lang_subtitle: 'اختر لغتك المفضلة',
    lang_saved: '!تم تحديث اللغة',
    lang_saved_msg: 'تم تغيير لغة التطبيق.',
    // Privacy & Terms
    privacy_title: 'سياسة الخصوصية',
    privacy_updated: 'آخر تحديث: مارس 2026',
    privacy_h1: '1. مقدمة',
    privacy_b1: 'تلتزم PetPill (PP) بحماية خصوصيتك. تشرح هذه السياسة كيف نتعامل مع بياناتك.',
    privacy_h2: '2. البيانات التي نجمعها',
    privacy_b2: 'يخزن PP جميع البيانات محلياً على جهازك فقط. لا نجمع أو ننقل أي بيانات شخصية إلى خوادم خارجية. تشمل البيانات:\n\n• ملفات الحيوانات الأليفة\n• جداول الأدوية والجرعات\n• سجلات التطعيم والصحة\n• تفاصيل مواعيد البيطري\n• معلومات الاتصال بمقدمي الرعاية\n• صور الحيوانات (محلياً فقط)',
    privacy_h3: '3. أذونات الجهاز',
    privacy_b3: 'قد يطلب PP الأذونات التالية:\n\n• الكاميرا والمكتبة: لالتقاط صور حيواناتك. تُخزن محلياً ولا تُرفع.\n• الموقع: للبحث عن عيادات بيطرية قريبة. لا يُخزن أو يُنقل.\n• الإشعارات: لتذكيرات الأدوية والمواعيد. تُجدول محلياً.',
    privacy_h4: '4. تخزين البيانات والأمان',
    privacy_b4: 'تُخزن جميع بياناتك محلياً على جهازك. إذا أزلت التطبيق، ستُحذف البيانات نهائياً.',
    privacy_h5: '5. خدمات الطرف الثالث',
    privacy_b5: 'لا يشارك PP بياناتك مع أي طرف ثالث. التطبيق يعمل بالكامل دون اتصال بالإنترنت.',
    privacy_h6: '6. خصوصية الأطفال',
    privacy_b6: 'لا يجمع PP معلومات شخصية عن الأطفال دون 13 عاماً.',
    privacy_h7: '7. التغييرات على هذه السياسة',
    privacy_b7: 'قد نحدّث هذه السياسة من وقت لآخر. ستنعكس أي تغييرات في التطبيق.',
    privacy_h8: '8. تواصل معنا',
    privacy_b8: 'إذا كان لديك أسئلة، تواصل معنا على:\n\nsupport@petpill.app',
    terms_title: 'شروط الخدمة',
    terms_updated: 'آخر تحديث: مارس 2026',
    terms_h1: '1. قبول الشروط',
    terms_b1: 'بتنزيل أو استخدام PP، فإنك توافق على هذه الشروط.',
    terms_h2: '2. وصف الخدمة',
    terms_b2: 'PP هو تطبيق لمساعدة أصحاب الحيوانات على إدارة جداول الأدوية والسجلات الصحية.',
    terms_h3: '3. إخلاء المسؤولية الطبية',
    terms_b3: 'PP أداة للتتبع والتذكير فقط. لا يقدم نصائح طبية بيطرية. استشر طبيباً بيطرياً مؤهلاً دائماً.',
    terms_h4: '4. مسؤوليات المستخدم',
    terms_b4: 'أنت مسؤول عن:\n\n• دقة المعلومات التي تدخلها\n• اتباع تعليمات البيطري للأدوية\n• التحقق من الجرعات مع بيطريك',
    terms_h5: '5. البيانات والخصوصية',
    terms_b5: 'تُخزن جميع البيانات محلياً. لا نجمع بياناتك أو نصل إليها. راجع سياسة الخصوصية.',
    terms_h6: '6. الميزات المميزة',
    terms_b6: 'قد يقدم PP ميزات مميزة عبر المشتريات داخل التطبيق. تُدار الاشتراكات من خلال Google Play.',
    terms_h7: '7. حدود المسؤولية',
    terms_b7: 'يُقدَّم PP "كما هو" دون ضمانات. لسنا مسؤولين عن أي أضرار ناجمة عن استخدام التطبيق.',
    terms_h8: '8. التغييرات على الشروط',
    terms_b8: 'نحتفظ بالحق في تعديل هذه الشروط. الاستمرار في استخدام التطبيق يعني قبولك للشروط الجديدة.',
    terms_h9: '9. تواصل',
    terms_b9: 'للأسئلة حول هذه الشروط:\n\nsupport@petpill.app',
  },
};

// Privacy & Terms translations added to each language inline below
translations.en.privacy_title = 'Privacy Policy';
translations.en.privacy_updated = 'Last updated: March 2026';
translations.en.privacy_h1 = '1. Introduction';
translations.en.privacy_b1 = 'PetPill (PP) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.';
translations.en.privacy_h2 = '2. Information We Collect';
translations.en.privacy_b2 = 'PP stores all data locally on your device only. We do NOT collect, transmit, or store any personal data externally. This includes:\n\n• Pet profiles (name, species, breed, weight)\n• Medication schedules and dosage information\n• Vaccination and health records\n• Vet appointment details\n• Caregiver contact information\n• Pet photos (stored locally only)';
translations.en.privacy_h3 = '3. Device Permissions';
translations.en.privacy_b3 = 'PP may request:\n\n• Camera & Photos: To take or select pet photos. Never uploaded.\n• Location: To find nearby vet clinics. Never stored or transmitted.\n• Notifications: For medication and appointment reminders. Scheduled locally.';
translations.en.privacy_h4 = '4. Data Storage & Security';
translations.en.privacy_b4 = 'All data is stored locally on your device. We have no access to your data. Uninstalling the app permanently deletes all data.';
translations.en.privacy_h5 = '5. Third-Party Services';
translations.en.privacy_b5 = 'PP does not share your data with any third parties. No analytics, advertising, or tracking. The app functions entirely offline.';
translations.en.privacy_h6 = '6. Children\'s Privacy';
translations.en.privacy_b6 = 'PP does not knowingly collect information from children under 13.';
translations.en.privacy_h7 = '7. Changes to This Policy';
translations.en.privacy_b7 = 'We may update this Privacy Policy from time to time. Any changes will be reflected in the app.';
translations.en.privacy_h8 = '8. Contact Us';
translations.en.privacy_b8 = 'For questions about this Privacy Policy:\n\nsupport@petpill.app';
translations.en.terms_title = 'Terms of Service';
translations.en.terms_updated = 'Last updated: March 2026';
translations.en.terms_h1 = '1. Acceptance of Terms';
translations.en.terms_b1 = 'By downloading or using PP, you agree to these Terms of Service.';
translations.en.terms_h2 = '2. Description of Service';
translations.en.terms_b2 = 'PP is a mobile app to help pet owners manage medication schedules, health records, and vet appointments.';
translations.en.terms_h3 = '3. Medical Disclaimer';
translations.en.terms_b3 = 'PP is a tracking and reminder tool only. It does NOT provide veterinary medical advice. Always consult a qualified veterinarian.';
translations.en.terms_h4 = '4. User Responsibilities';
translations.en.terms_b4 = 'You are responsible for:\n\n• Accuracy of information entered\n• Following your vet\'s medication instructions\n• Verifying dosages with your vet';
translations.en.terms_h5 = '5. Data & Privacy';
translations.en.terms_b5 = 'All data is stored locally. We do not collect or access your data. See our Privacy Policy for details.';
translations.en.terms_h6 = '6. Premium Features';
translations.en.terms_b6 = 'PP may offer premium features via in-app purchases managed through Google Play or the App Store.';
translations.en.terms_h7 = '7. Limitation of Liability';
translations.en.terms_b7 = 'PP is provided "as is" without warranties. We are not liable for damages arising from use of this app.';
translations.en.terms_h8 = '8. Changes to Terms';
translations.en.terms_b8 = 'We may modify these terms at any time. Continued use constitutes acceptance of new terms.';
translations.en.terms_h9 = '9. Contact';
translations.en.terms_b9 = 'For questions about these Terms:\n\nsupport@petpill.app';

// Turkish
translations.tr.privacy_title = 'Gizlilik Politikası';
translations.tr.privacy_updated = 'Son güncelleme: Mart 2026';
translations.tr.privacy_h1 = '1. Giriş';
translations.tr.privacy_b1 = 'PetPill (PP) gizliliğinizi korumaya kararlıdır. Bu politika bilgilerinizi nasıl işlediğimizi açıklar.';
translations.tr.privacy_h2 = '2. Topladığımız Bilgiler';
translations.tr.privacy_b2 = 'PP tüm verileri yalnızca cihazınızda yerel olarak saklar. Hiçbir kişisel veri dışarıya gönderilmez:\n\n• Evcil hayvan profilleri\n• İlaç takvimleri ve dozaj bilgileri\n• Aşı ve sağlık kayıtları\n• Veteriner randevu detayları\n• Bakıcı iletişim bilgileri\n• Evcil hayvan fotoğrafları (yalnızca yerel)';
translations.tr.privacy_h3 = '3. Cihaz İzinleri';
translations.tr.privacy_b3 = 'PP şu izinleri isteyebilir:\n\n• Kamera ve Fotoğraf: Evcil hayvan fotoğrafları için. Hiçbiri yüklenmez.\n• Konum: Yakın veteriner klinikleri bulmak için. Saklanmaz.\n• Bildirimler: İlaç ve randevu hatırlatmaları için. Yerel olarak zamanlanır.';
translations.tr.privacy_h4 = '4. Veri Depolama ve Güvenlik';
translations.tr.privacy_b4 = 'Tüm veriler cihazınızda yerel olarak saklanır. Verilerinize erişimimiz yoktur. Uygulamayı kaldırırsanız veriler kalıcı olarak silinir.';
translations.tr.privacy_h5 = '5. Üçüncü Taraf Hizmetler';
translations.tr.privacy_b5 = 'PP verilerinizi üçüncü taraflarla paylaşmaz. Analitik, reklam veya takip hizmeti kullanılmaz.';
translations.tr.privacy_h6 = '6. Çocukların Gizliliği';
translations.tr.privacy_b6 = 'PP, 13 yaş altı çocuklardan bilerek bilgi toplamaz.';
translations.tr.privacy_h7 = '7. Bu Politikadaki Değişiklikler';
translations.tr.privacy_b7 = 'Bu politikayı zaman zaman güncelleyebiliriz. Değişiklikler uygulamada yansıtılacaktır.';
translations.tr.privacy_h8 = '8. Bize Ulaşın';
translations.tr.privacy_b8 = 'Bu politika hakkında sorularınız için:\n\nsupport@petpill.app';
translations.tr.terms_title = 'Kullanım Koşulları';
translations.tr.terms_updated = 'Son güncelleme: Mart 2026';
translations.tr.terms_h1 = '1. Koşulların Kabulü';
translations.tr.terms_b1 = "PP'yi indirerek veya kullanarak bu Kullanım Koşullarını kabul etmiş olursunuz.";
translations.tr.terms_h2 = '2. Hizmet Açıklaması';
translations.tr.terms_b2 = 'PP, evcil hayvan sahiplerinin ilaç takvimlerini, sağlık kayıtlarını ve veteriner randevularını yönetmesine yardımcı olan bir mobil uygulamadır.';
translations.tr.terms_h3 = '3. Tıbbi Sorumluluk Reddi';
translations.tr.terms_b3 = "PP yalnızca bir takip ve hatırlatma aracıdır. Veteriner tıbbi tavsiyesi sağlamaz. Her zaman nitelikli bir veterinere danışın.";
translations.tr.terms_h4 = '4. Kullanıcı Sorumlulukları';
translations.tr.terms_b4 = 'Şunlardan siz sorumlusunuz:\n\n• Girdiğiniz bilgilerin doğruluğu\n• Veterinerinizin ilaç talimatlarını takip etmek\n• Dozları veterinerinizle doğrulamak';
translations.tr.terms_h5 = '5. Veri ve Gizlilik';
translations.tr.terms_b5 = 'Tüm veriler yerel olarak saklanır. Verilerinizi toplamıyor veya erişmiyoruz. Gizlilik Politikamıza bakın.';
translations.tr.terms_h6 = '6. Premium Özellikler';
translations.tr.terms_b6 = "PP, Google Play üzerinden uygulama içi satın alımlar yoluyla premium özellikler sunabilir.";
translations.tr.terms_h7 = '7. Sorumluluk Sınırlaması';
translations.tr.terms_b7 = "PP 'olduğu gibi' sunulmaktadır. Uygulamanın kullanımından kaynaklanan zararlardan sorumlu değiliz.";
translations.tr.terms_h8 = '8. Koşullardaki Değişiklikler';
translations.tr.terms_b8 = 'Bu koşulları istediğimiz zaman değiştirebiliriz. Kullanmaya devam etmek yeni koşulları kabul ettiğiniz anlamına gelir.';
translations.tr.terms_h9 = '9. İletişim';
translations.tr.terms_b9 = 'Bu Kullanım Koşulları hakkında sorularınız için:\n\nsupport@petpill.app';

// German
translations.de.privacy_title = 'Datenschutzrichtlinie';
translations.de.privacy_updated = 'Zuletzt aktualisiert: März 2026';
translations.de.privacy_h1 = '1. Einleitung';
translations.de.privacy_b1 = 'PetPill (PP) ist dem Schutz Ihrer Privatsphäre verpflichtet. Diese Richtlinie erklärt, wie wir mit Ihren Daten umgehen.';
translations.de.privacy_h2 = '2. Erfasste Informationen';
translations.de.privacy_b2 = 'PP speichert alle Daten nur lokal auf Ihrem Gerät. Keine persönlichen Daten werden extern übertragen:\n\n• Tierprofile\n• Medikamentenpläne und Dosierungen\n• Impf- und Gesundheitsdaten\n• Tierarzttermine\n• Betreuerkontakte\n• Tierfotos (nur lokal)';
translations.de.privacy_h3 = '3. Gerätezugriffsrechte';
translations.de.privacy_b3 = 'PP kann folgende Berechtigungen anfordern:\n\n• Kamera & Fotos: Für Tierfotos. Werden nie hochgeladen.\n• Standort: Zum Finden nahegelegener Tierkliniken. Nie gespeichert.\n• Benachrichtigungen: Für Erinnerungen. Lokal geplant.';
translations.de.privacy_h4 = '4. Datenspeicherung & Sicherheit';
translations.de.privacy_b4 = 'Alle Daten werden lokal gespeichert. Wir haben keinen Zugriff. Deinstallation löscht alle Daten dauerhaft.';
translations.de.privacy_h5 = '5. Drittanbieterdienste';
translations.de.privacy_b5 = 'PP teilt Ihre Daten nicht. Keine Analysen, Werbung oder Tracking.';
translations.de.privacy_h6 = '6. Datenschutz für Kinder';
translations.de.privacy_b6 = 'PP sammelt wissentlich keine Daten von Kindern unter 13 Jahren.';
translations.de.privacy_h7 = '7. Änderungen dieser Richtlinie';
translations.de.privacy_b7 = 'Wir können diese Richtlinie aktualisieren. Änderungen werden in der App angezeigt.';
translations.de.privacy_h8 = '8. Kontakt';
translations.de.privacy_b8 = 'Fragen zu dieser Richtlinie:\n\nsupport@petpill.app';
translations.de.terms_title = 'Nutzungsbedingungen';
translations.de.terms_updated = 'Zuletzt aktualisiert: März 2026';
translations.de.terms_h1 = '1. Annahme der Bedingungen';
translations.de.terms_b1 = 'Durch das Herunterladen oder Verwenden von PP stimmen Sie diesen Bedingungen zu.';
translations.de.terms_h2 = '2. Dienstbeschreibung';
translations.de.terms_b2 = 'PP ist eine App zur Verwaltung von Medikamentenplänen, Gesundheitsdaten und Tierarztterminen.';
translations.de.terms_h3 = '3. Medizinischer Haftungsausschluss';
translations.de.terms_b3 = 'PP ist nur ein Tracking- und Erinnerungstool. Es bietet keine tierärztlichen Ratschläge. Konsultieren Sie immer einen Tierarzt.';
translations.de.terms_h4 = '4. Nutzerpflichten';
translations.de.terms_b4 = 'Sie sind verantwortlich für:\n\n• Richtigkeit der eingegebenen Daten\n• Befolgen der Medikamentenanweisungen\n• Überprüfung der Dosierungen';
translations.de.terms_h5 = '5. Daten & Datenschutz';
translations.de.terms_b5 = 'Alle Daten lokal gespeichert. Wir sammeln keine Daten. Siehe Datenschutzrichtlinie.';
translations.de.terms_h6 = '6. Premium-Funktionen';
translations.de.terms_b6 = 'PP kann Premium-Funktionen über In-App-Käufe via Google Play anbieten.';
translations.de.terms_h7 = '7. Haftungsbeschränkung';
translations.de.terms_b7 = 'PP wird "wie besehen" angeboten. Wir haften nicht für Schäden aus der App-Nutzung.';
translations.de.terms_h8 = '8. Änderungen der Bedingungen';
translations.de.terms_b8 = 'Wir können diese Bedingungen jederzeit ändern. Weitere Nutzung bedeutet Zustimmung.';
translations.de.terms_h9 = '9. Kontakt';
translations.de.terms_b9 = 'Fragen zu diesen Bedingungen:\n\nsupport@petpill.app';

// French
translations.fr.privacy_title = 'Politique de confidentialité';
translations.fr.privacy_updated = 'Dernière mise à jour: mars 2026';
translations.fr.privacy_h1 = '1. Introduction';
translations.fr.privacy_b1 = 'PetPill (PP) est engagé à protéger votre vie privée. Cette politique explique comment nous gérons vos données.';
translations.fr.privacy_h2 = '2. Informations collectées';
translations.fr.privacy_b2 = 'PP stocke toutes les données localement sur votre appareil. Aucune donnée personnelle n\'est transmise:\n\n• Profils des animaux\n• Calendriers médicamenteux\n• Dossiers de santé et vaccinations\n• Rendez-vous vétérinaires\n• Contacts des aidants\n• Photos (stockées localement)';
translations.fr.privacy_h3 = '3. Autorisations de l\'appareil';
translations.fr.privacy_b3 = 'PP peut demander:\n\n• Caméra & Photos: Pour les photos d\'animaux. Jamais téléchargées.\n• Localisation: Pour trouver des vétérinaires. Jamais stockée.\n• Notifications: Pour les rappels. Planifiées localement.';
translations.fr.privacy_h4 = '4. Stockage et sécurité';
translations.fr.privacy_b4 = 'Toutes les données sont stockées localement. Nous n\'y avons pas accès. La désinstallation supprime définitivement toutes les données.';
translations.fr.privacy_h5 = '5. Services tiers';
translations.fr.privacy_b5 = 'PP ne partage pas vos données. Pas d\'analyse, publicité ou suivi.';
translations.fr.privacy_h6 = '6. Confidentialité des enfants';
translations.fr.privacy_b6 = 'PP ne collecte pas sciemment des données d\'enfants de moins de 13 ans.';
translations.fr.privacy_h7 = '7. Modifications';
translations.fr.privacy_b7 = 'Nous pouvons mettre à jour cette politique. Les changements seront reflétés dans l\'app.';
translations.fr.privacy_h8 = '8. Nous contacter';
translations.fr.privacy_b8 = 'Questions sur cette politique:\n\nsupport@petpill.app';
translations.fr.terms_title = 'Conditions d\'utilisation';
translations.fr.terms_updated = 'Dernière mise à jour: mars 2026';
translations.fr.terms_h1 = '1. Acceptation des conditions';
translations.fr.terms_b1 = 'En téléchargeant ou utilisant PP, vous acceptez ces conditions.';
translations.fr.terms_h2 = '2. Description du service';
translations.fr.terms_b2 = 'PP est une app pour gérer les médicaments, dossiers de santé et rendez-vous vétérinaires.';
translations.fr.terms_h3 = '3. Avertissement médical';
translations.fr.terms_b3 = 'PP est un outil de suivi uniquement. Il ne fournit pas de conseils vétérinaires. Consultez toujours un vétérinaire qualifié.';
translations.fr.terms_h4 = '4. Responsabilités';
translations.fr.terms_b4 = 'Vous êtes responsable de:\n\n• L\'exactitude des informations saisies\n• Suivre les instructions de votre vétérinaire\n• Vérifier les dosages';
translations.fr.terms_h5 = '5. Données & confidentialité';
translations.fr.terms_b5 = 'Données stockées localement. Nous n\'y avons pas accès. Voir notre politique de confidentialité.';
translations.fr.terms_h6 = '6. Fonctionnalités premium';
translations.fr.terms_b6 = 'PP peut offrir des fonctionnalités premium via achats intégrés sur Google Play.';
translations.fr.terms_h7 = '7. Limitation de responsabilité';
translations.fr.terms_b7 = 'PP est fourni "tel quel". Nous ne sommes pas responsables des dommages résultant de l\'utilisation.';
translations.fr.terms_h8 = '8. Modifications';
translations.fr.terms_b8 = 'Nous pouvons modifier ces conditions à tout moment. L\'utilisation continue vaut acceptation.';
translations.fr.terms_h9 = '9. Contact';
translations.fr.terms_b9 = 'Questions sur ces conditions:\n\nsupport@petpill.app';

// ── Price screen extra keys ─────────────────────────────────────────────────
translations.en.price_location_label  = '📍 Showing prices for ';
translations.en.price_enter_name      = 'Please enter a medication name';
translations.en.price_open_store      = 'Open';
translations.en.price_open_store_msg  = "You'll be taken to {name} to purchase {med}.";
translations.en.price_open_error      = 'Could not open the store. Please try again.';

translations.tr.price_location_label  = '📍 Fiyatlar için gösteriliyor: ';
translations.tr.price_enter_name      = 'Lütfen bir ilaç adı girin';
translations.tr.price_open_store      = 'Aç';
translations.tr.price_open_store_msg  = "{name} mağazasına giderek {med} satın alacaksınız.";
translations.tr.price_open_error      = 'Mağaza açılamadı. Lütfen tekrar deneyin.';

translations.de.price_location_label  = '📍 Preise für: ';
translations.de.price_enter_name      = 'Bitte gib einen Medikamentennamen ein';
translations.de.price_open_store      = 'Öffnen';
translations.de.price_open_store_msg  = "Du wirst zu {name} weitergeleitet, um {med} zu kaufen.";
translations.de.price_open_error      = 'Geschäft konnte nicht geöffnet werden. Bitte erneut versuchen.';

translations.fr.price_location_label  = '📍 Prix pour: ';
translations.fr.price_enter_name      = 'Veuillez entrer un nom de médicament';
translations.fr.price_open_store      = 'Ouvrir';
translations.fr.price_open_store_msg  = "Vous serez redirigé vers {name} pour acheter {med}.";
translations.fr.price_open_error      = "Impossible d'ouvrir le magasin. Veuillez réessayer.";

translations.ar.price_location_label  = '📍 عرض الأسعار لـ: ';
translations.ar.price_enter_name      = 'الرجاء إدخال اسم الدواء';
translations.ar.price_open_store      = 'فتح';
translations.ar.price_open_store_msg  = 'سيتم نقلك إلى {name} لشراء {med}.';
translations.ar.price_open_error      = 'تعذر فتح المتجر. يرجى المحاولة مرة أخرى.';

// ── Share message ─────────────────────────────────────────────────────────────
translations.en.settings_share_message = "I use PetPill to manage my pet's medications & health! It's free and super cute 🐾💊";
translations.tr.settings_share_message = "Evcil hayvanımın ilaçlarını ve sağlığını PetPill ile takip ediyorum! Ücretsiz ve çok sevimli 🐾💊";
translations.de.settings_share_message = "Ich verwalte die Medikamente meines Haustieres mit PetPill! Kostenlos und super süß 🐾💊";
translations.fr.settings_share_message = "J'utilise PetPill pour gérer les médicaments de mon animal! C'est gratuit et trop mignon 🐾💊";
translations.ar.settings_share_message = "أستخدم PetPill لإدارة أدوية وصحة حيواني الأليف! مجاني ورائع 🐾💊";

// ── Price Comparer – market/detecting keys ────────────────────────────────────
translations.en.price_market   = 'Select Market';
translations.en.price_detecting = 'Detecting your location...';
translations.tr.price_market   = 'Pazar Seç';
translations.tr.price_detecting = 'Konumunuz algılanıyor...';
translations.de.price_market   = 'Markt auswählen';
translations.de.price_detecting = 'Standort wird ermittelt...';
translations.fr.price_market   = 'Sélectionner le marché';
translations.fr.price_detecting = 'Détection de votre position...';
translations.ar.price_market   = 'اختر السوق';
translations.ar.price_detecting = 'جارٍ تحديد موقعك...';

// ── Premium paywall ────────────────────────────────────────────────────────────
translations.en.premium_most_popular  = '⭐ MOST POPULAR';
translations.en.premium_title         = 'PetPill Premium';
translations.en.premium_tagline       = 'Everything your pet deserves 🐾';
translations.en.premium_free_col      = 'Free';
translations.en.premium_pro_col       = 'Premium';
translations.en.premium_unlock        = '🌟 Unlock Premium Now';
translations.en.premium_proof         = '❤️ Loved by 10,000+ happy pet owners';
translations.en.premium_cancel        = 'Cancel anytime · No commitment';
translations.en.premium_monthly       = 'per month';
translations.en.premium_yearly        = 'per year';
translations.en.premium_save_pct      = 'SAVE 33%';
translations.en.premium_monthly_equiv = '≈ $3.33/mo';
translations.en.premium_active_desc   = 'You have access to all premium features 🎉';
translations.en.pf_f1 = 'Up to 2 pets';
translations.en.pf_f2 = 'Basic medication tracking';
translations.en.pf_f3 = 'Medication reminders';
translations.en.pf_f4 = 'Basic health log';
translations.en.pf_p1 = 'Unlimited pets';
translations.en.pf_p2 = 'Advanced health charts & reports';
translations.en.pf_p3 = 'Price drop alerts for meds';
translations.en.pf_p4 = 'PDF health report for vet visits';
translations.en.pf_p5 = 'Unlimited caregiver sharing';
translations.en.pf_p6 = 'Completely ad-free';

translations.tr.premium_most_popular  = '⭐ EN POPÜLER';
translations.tr.premium_title         = 'PetPill Premium';
translations.tr.premium_tagline       = 'Evcil dostunuz için her şey 🐾';
translations.tr.premium_free_col      = 'Ücretsiz';
translations.tr.premium_pro_col       = 'Premium';
translations.tr.premium_unlock        = '🌟 Premium\'u Aç';
translations.tr.premium_proof         = '❤️ 10.000+ mutlu evcil hayvan sahibi tarafından sevildi';
translations.tr.premium_cancel        = 'İstediğin zaman iptal et · Taahhüt yok';
translations.tr.premium_monthly       = 'aylık';
translations.tr.premium_yearly        = 'yıllık';
translations.tr.premium_save_pct      = '%33 TASARRUF';
translations.tr.premium_monthly_equiv = '≈ $3.33/ay';
translations.tr.premium_active_desc   = 'Tüm premium özelliklere erişiminiz var 🎉';
translations.tr.pf_f1 = 'En fazla 2 evcil hayvan';
translations.tr.pf_f2 = 'Temel ilaç takibi';
translations.tr.pf_f3 = 'İlaç hatırlatmaları';
translations.tr.pf_f4 = 'Temel sağlık günlüğü';
translations.tr.pf_p1 = 'Sınırsız evcil hayvan';
translations.tr.pf_p2 = 'Gelişmiş sağlık grafikleri ve raporları';
translations.tr.pf_p3 = 'İlaç fiyat düşüş uyarıları';
translations.tr.pf_p4 = 'Veteriner için PDF sağlık raporu';
translations.tr.pf_p5 = 'Sınırsız bakıcı paylaşımı';
translations.tr.pf_p6 = 'Tamamen reklamsız';

translations.de.premium_most_popular  = '⭐ BELIEBTESTE';
translations.de.premium_title         = 'PetPill Premium';
translations.de.premium_tagline       = 'Alles was dein Haustier verdient 🐾';
translations.de.premium_free_col      = 'Kostenlos';
translations.de.premium_pro_col       = 'Premium';
translations.de.premium_unlock        = '🌟 Premium freischalten';
translations.de.premium_proof         = '❤️ Von 10.000+ glücklichen Tierbesitzern geliebt';
translations.de.premium_cancel        = 'Jederzeit kündbar · Keine Verpflichtung';
translations.de.premium_monthly       = 'pro Monat';
translations.de.premium_yearly        = 'pro Jahr';
translations.de.premium_save_pct      = '33% SPAREN';
translations.de.premium_monthly_equiv = '≈ 3,33$/Mo';
translations.de.premium_active_desc   = 'Sie haben Zugriff auf alle Premium-Funktionen 🎉';
translations.de.pf_f1 = 'Bis zu 2 Haustiere';
translations.de.pf_f2 = 'Grundlegende Medikamentenverfolgung';
translations.de.pf_f3 = 'Medikamentenerinnerungen';
translations.de.pf_f4 = 'Grundlegendes Gesundheitstagebuch';
translations.de.pf_p1 = 'Unbegrenzte Haustiere';
translations.de.pf_p2 = 'Erweiterte Gesundheitsdiagramme & Berichte';
translations.de.pf_p3 = 'Preisalarm für Medikamente';
translations.de.pf_p4 = 'PDF-Gesundheitsbericht für den Tierarzt';
translations.de.pf_p5 = 'Unbegrenztes Pflegeteam';
translations.de.pf_p6 = 'Komplett werbefrei';

translations.fr.premium_most_popular  = '⭐ LE PLUS POPULAIRE';
translations.fr.premium_title         = 'PetPill Premium';
translations.fr.premium_tagline       = 'Tout ce que votre animal mérite 🐾';
translations.fr.premium_free_col      = 'Gratuit';
translations.fr.premium_pro_col       = 'Premium';
translations.fr.premium_unlock        = '🌟 Débloquer Premium';
translations.fr.premium_proof         = "❤️ Aimé par 10 000+ propriétaires d'animaux heureux";
translations.fr.premium_cancel        = 'Annulez à tout moment · Sans engagement';
translations.fr.premium_monthly       = 'par mois';
translations.fr.premium_yearly        = 'par an';
translations.fr.premium_save_pct      = 'ÉCONOMISER 33%';
translations.fr.premium_monthly_equiv = '≈ 3,33$/mois';
translations.fr.premium_active_desc   = 'Vous avez accès à toutes les fonctionnalités premium 🎉';
translations.fr.pf_f1 = "Jusqu'à 2 animaux";
translations.fr.pf_f2 = 'Suivi basique des médicaments';
translations.fr.pf_f3 = 'Rappels de médicaments';
translations.fr.pf_f4 = 'Journal de santé de base';
translations.fr.pf_p1 = 'Animaux illimités';
translations.fr.pf_p2 = 'Graphiques de santé avancés & rapports';
translations.fr.pf_p3 = 'Alertes de baisse de prix';
translations.fr.pf_p4 = 'Rapport PDF pour les visites vétérinaires';
translations.fr.pf_p5 = "Partage d'aidants illimité";
translations.fr.pf_p6 = 'Entièrement sans publicité';

translations.ar.premium_most_popular  = '⭐ الأكثر شيوعًا';
translations.ar.premium_title         = 'PetPill Premium';
translations.ar.premium_tagline       = 'كل ما يستحقه حيوانك الأليف 🐾';
translations.ar.premium_free_col      = 'مجاني';
translations.ar.premium_pro_col       = 'بريميوم';
translations.ar.premium_unlock        = '🌟 فتح Premium الآن';
translations.ar.premium_proof         = '❤️ محبوب من أكثر من 10,000 صاحب حيوان أليف سعيد';
translations.ar.premium_cancel        = 'إلغاء في أي وقت · بدون التزام';
translations.ar.premium_monthly       = 'في الشهر';
translations.ar.premium_yearly        = 'في السنة';
translations.ar.premium_save_pct      = 'وفّر 33%';
translations.ar.premium_monthly_equiv = '≈ 3.33$/شهر';
translations.ar.premium_active_desc   = 'لديك إمكانية الوصول إلى جميع الميزات المميزة 🎉';
translations.ar.pf_f1 = 'حتى حيوانين أليفين';
translations.ar.pf_f2 = 'تتبع الأدوية الأساسية';
translations.ar.pf_f3 = 'تذكيرات الأدوية';
translations.ar.pf_f4 = 'سجل صحي أساسي';
translations.ar.pf_p1 = 'حيوانات أليفة غير محدودة';
translations.ar.pf_p2 = 'مخططات صحية متقدمة وتقارير';
translations.ar.pf_p3 = 'تنبيهات انخفاض أسعار الأدوية';
translations.ar.pf_p4 = 'تقرير PDF للزيارات البيطرية';
translations.ar.pf_p5 = 'مشاركة مقدمي رعاية غير محدودة';
translations.ar.pf_p6 = 'خالٍ تمامًا من الإعلانات';

export default translations;
