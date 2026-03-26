import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, Linking, Alert, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONTS, RADIUS, SHADOWS, COMMON_MEDICATIONS } from '../constants/theme';
import CuteCard from '../components/CuteCard';
import CuteButton from '../components/CuteButton';
import { useLanguage } from '../context/LanguageContext';

// ── Location config: country code → currency + pharmacy chains ───────────────
const LOCATION_CONFIG = {
  TR: {
    currency: '₺', flag: '🇹🇷', multiplier: 32.5, label: 'Turkey',
    pharmacies: [
      { id: 1, name: 'VetFarma TR',    logo: '🐾', rating: '4.9', deliveryDays: '1-2 gün',  affiliateBase: 'https://google.com/search?q=' },
      { id: 2, name: 'Koçak Farma',    logo: '💊', rating: '4.7', deliveryDays: '1-3 gün',  affiliateBase: 'https://google.com/search?q=' },
      { id: 3, name: 'Eczane.com',     logo: '🏥', rating: '4.6', deliveryDays: '2-4 gün',  affiliateBase: 'https://google.com/search?q=' },
      { id: 4, name: 'Dr. Eczane',     logo: '🩺', rating: '4.5', deliveryDays: '2-3 gün',  affiliateBase: 'https://google.com/search?q=' },
      { id: 5, name: 'HayvanEczane',   logo: '🌿', rating: '4.4', deliveryDays: '3-5 gün',  affiliateBase: 'https://google.com/search?q=' },
    ],
  },
  DE: {
    currency: '€', flag: '🇩🇪', multiplier: 0.93, label: 'Germany',
    pharmacies: [
      { id: 1, name: 'DocMorris',      logo: '🏥', rating: '4.8', deliveryDays: '1-2 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 2, name: 'Shop Apotheke',  logo: '💊', rating: '4.7', deliveryDays: '1-3 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 3, name: 'PetVet Online',  logo: '🐾', rating: '4.6', deliveryDays: '2-3 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 4, name: 'Zur Rose',       logo: '🌹', rating: '4.5', deliveryDays: '2-4 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 5, name: 'MedPets DE',     logo: '🩺', rating: '4.3', deliveryDays: '3-5 days', affiliateBase: 'https://google.com/search?q=' },
    ],
  },
  FR: {
    currency: '€', flag: '🇫🇷', multiplier: 0.93, label: 'France',
    pharmacies: [
      { id: 1, name: 'PharmaVet',      logo: '🏥', rating: '4.7', deliveryDays: '1-2 jours', affiliateBase: 'https://google.com/search?q=' },
      { id: 2, name: 'MaPharmacie',    logo: '💊', rating: '4.6', deliveryDays: '2-3 jours', affiliateBase: 'https://google.com/search?q=' },
      { id: 3, name: 'VetPharma FR',   logo: '🐾', rating: '4.5', deliveryDays: '1-3 jours', affiliateBase: 'https://google.com/search?q=' },
      { id: 4, name: 'Medpets France', logo: '🩺', rating: '4.4', deliveryDays: '2-4 jours', affiliateBase: 'https://google.com/search?q=' },
      { id: 5, name: 'PharmaClic',     logo: '🌿', rating: '4.3', deliveryDays: '3-5 jours', affiliateBase: 'https://google.com/search?q=' },
    ],
  },
  SA: {
    currency: '﷼', flag: '🇸🇦', multiplier: 3.75, label: 'Saudi Arabia',
    pharmacies: [
      { id: 1, name: 'Nahdi Medical',  logo: '🏥', rating: '4.8', deliveryDays: '1-2 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 2, name: 'Al Dawaa',       logo: '💊', rating: '4.6', deliveryDays: '2-3 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 3, name: 'VetCare Arabia', logo: '🐾', rating: '4.5', deliveryDays: '2-4 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 4, name: 'United Pharm',   logo: '🌿', rating: '4.4', deliveryDays: '3-5 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 5, name: 'MedPlus KSA',    logo: '🩺', rating: '4.3', deliveryDays: '2-5 days', affiliateBase: 'https://google.com/search?q=' },
    ],
  },
  GB: {
    currency: '£', flag: '🇬🇧', multiplier: 0.79, label: 'United Kingdom',
    pharmacies: [
      { id: 1, name: 'VioVet',         logo: '🏥', rating: '4.8', deliveryDays: '1-2 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 2, name: 'MedicAnimal',    logo: '💊', rating: '4.7', deliveryDays: '1-3 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 3, name: 'PetDrugs Online',logo: '🐾', rating: '4.6', deliveryDays: '2-3 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 4, name: 'Animed Direct',  logo: '🩺', rating: '4.5', deliveryDays: '1-2 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 5, name: 'Vetissimo UK',   logo: '🌿', rating: '4.3', deliveryDays: '3-4 days', affiliateBase: 'https://google.com/search?q=' },
    ],
  },
  US: {
    currency: '$', flag: '🇺🇸', multiplier: 1, label: 'United States',
    pharmacies: [
      { id: 1, name: 'Chewy Pharmacy', logo: '🏪', rating: '4.9', deliveryDays: '1-3 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 2, name: '1800PetMeds',    logo: '💊', rating: '4.7', deliveryDays: '2-5 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 3, name: 'PetCareRx',      logo: '🏥', rating: '4.6', deliveryDays: '2-4 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 4, name: 'VetRxDirect',    logo: '🩺', rating: '4.5', deliveryDays: '3-5 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 5, name: 'EntirelyPets',   logo: '🐾', rating: '4.4', deliveryDays: '3-6 days', affiliateBase: 'https://google.com/search?q=' },
    ],
  },
};

const COUNTRY_ORDER = ['TR', 'US', 'DE', 'FR', 'GB', 'SA'];

// ─────────────────────────────────────────────────────────────────────────────

const PriceComparerScreen = ({ route }) => {
  const initialQuery = route?.params?.searchQuery || '';
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [detectingLocation, setDetectingLocation] = useState(true);

  const config = LOCATION_CONFIG[selectedCountry] || LOCATION_CONFIG.US;
  const cur = config.currency;

  useEffect(() => {
    detectLocation();
  }, []);

  useEffect(() => {
    if (initialQuery && !detectingLocation) {
      handleSearch(initialQuery);
    }
  }, [initialQuery, detectingLocation]);

  const detectLocation = async () => {
    // 1. IP geolocation first (most accurate, works even in emulator)
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 5000);
      let code = null;

      try {
        const res = await fetch('https://ip-api.com/json/?fields=countryCode', { signal: ctrl.signal });
        if (res.ok) {
          const data = await res.json();
          code = data.countryCode;
        }
      } catch {
        // Try second API with fresh controller
        try {
          const ctrl2 = new AbortController();
          const timer2 = setTimeout(() => ctrl2.abort(), 3000);
          const res2 = await fetch('https://ipapi.co/json/', { signal: ctrl2.signal });
          if (res2.ok) {
            const data2 = await res2.json();
            code = data2.country_code;
          }
          clearTimeout(timer2);
        } catch {}
      }
      clearTimeout(timer);

      if (code && LOCATION_CONFIG[code.toUpperCase()]) {
        setSelectedCountry(code.toUpperCase());
        setDetectingLocation(false);
        return;
      }
    } catch (e) {
      console.log('IP geolocation failed:', e.message);
    }

    // 2. Fallback: Language → country
    const LANG_TO_COUNTRY = { tr: 'TR', de: 'DE', fr: 'FR', ar: 'SA', en: 'GB' };
    const langCountry = LANG_TO_COUNTRY[language];
    if (langCountry && LOCATION_CONFIG[langCountry]) {
      setSelectedCountry(langCountry);
    }
    setDetectingLocation(false);
  };

  const filteredSuggestions = searchQuery.length >= 2
    ? COMMON_MEDICATIONS.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const getBasePrice = (name) => {
    const n = name.toLowerCase();
    if (n.includes('heartgard'))  return 45;
    if (n.includes('nexgard'))    return 55;
    if (n.includes('apoquel'))    return 75;
    if (n.includes('bravecto'))   return 48;
    if (n.includes('vetmedin'))   return 90;
    if (n.includes('insulin'))    return 120;
    if (n.includes('revolution')) return 42;
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return 20 + Math.abs(hash % 80);
  };

  const generatePrices = (medName) => {
    const baseUSD  = getBasePrice(medName);
    const baseLocal = baseUSD * config.multiplier;
    return config.pharmacies.map(pharmacy => {
      const variance   = (Math.random() - 0.3) * baseLocal * 0.4;
      const price      = Math.max(baseLocal + variance, baseLocal * 0.5);
      const hasDiscount = Math.random() > 0.6;
      const discountPct = hasDiscount ? Math.floor(Math.random() * 20 + 5) : 0;
      return {
        ...pharmacy,
        price:         parseFloat(price.toFixed(2)),
        originalPrice: hasDiscount ? parseFloat((price * (1 + discountPct / 100)).toFixed(2)) : null,
        discount:      discountPct,
        inStock:       Math.random() > 0.15,
        freeShipping:  Math.random() > 0.5,
        couponCode:    Math.random() > 0.7 ? `SAVE${Math.floor(Math.random() * 20 + 5)}` : null,
      };
    }).sort((a, b) => a.price - b.price);
  };

  const handleSearch = (query = searchQuery) => {
    if (!query.trim()) {
      Alert.alert(t('oops'), t('price_enter_name'));
      return;
    }
    setSearching(true);
    setShowSuggestions(false);
    setTimeout(() => {
      setResults(generatePrices(query.trim()));
      setSearching(false);
      setRecentSearches(prev =>
        [query.trim(), ...prev.filter(s => s !== query.trim())].slice(0, 10)
      );
    }, 800);
  };

  const handleCountrySelect = (code) => {
    setSelectedCountry(code);
    if (results.length > 0) {
      // Re-run search with new country prices
      setTimeout(() => handleSearch(searchQuery), 50);
    }
  };

  const handleBuy = (pharmacy, medName) => {
    const url = pharmacy.affiliateBase + encodeURIComponent(medName);
    Alert.alert(
      `${t('price_open_store')} ${pharmacy.name} 🛒`,
      t('price_open_store_msg', { name: pharmacy.name, med: medName }),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('price_shop_now'),
          onPress: () => Linking.openURL(url).catch(() =>
            Alert.alert(t('error'), t('price_open_error'))
          ),
        },
      ]
    );
  };

  const lowestPrice = results.length > 0 ? results[0].price : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <LinearGradient
        colors={['#FF6B9D', '#C77DFF']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>{t('price_header')}</Text>
        <Text style={styles.headerSub}>{t('price_subtitle')}</Text>
      </LinearGradient>

      {/* Country picker */}
      <View style={styles.countrySection}>
        {detectingLocation ? (
          <View style={styles.detectingRow}>
            <ActivityIndicator size="small" color={COLORS.primary} />
            <Text style={styles.detectingText}>{t('price_detecting')}</Text>
          </View>
        ) : (
          <>
            <Text style={styles.countryLabel}>{t('price_market')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.countryScroller}>
              {COUNTRY_ORDER.map(code => {
                const cfg = LOCATION_CONFIG[code];
                const isActive = selectedCountry === code;
                return (
                  <TouchableOpacity
                    key={code}
                    onPress={() => handleCountrySelect(code)}
                    style={[styles.countryChip, isActive && styles.countryChipActive]}
                  >
                    <Text style={styles.countryFlag}>{cfg.flag}</Text>
                    <Text style={[styles.countryCode, isActive && styles.countryCodeActive]}>
                      {cfg.currency}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <Text style={styles.countryInfo}>
              {config.flag} {config.label} · {cur}
            </Text>
          </>
        )}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={(val) => {
              setSearchQuery(val);
              setShowSuggestions(val.length >= 2);
            }}
            placeholder={t('price_search_placeholder')}
            placeholderTextColor={COLORS.textMuted}
            returnKeyType="search"
            onSubmitEditing={() => handleSearch()}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => { setSearchQuery(''); setResults([]); }}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        <CuteButton
          title={t('price_search_btn')}
          onPress={() => handleSearch()}
          size="medium"
          variant="primary"
          loading={searching}
          style={styles.searchBtn}
        />
      </View>

      {/* Autocomplete */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <View style={styles.suggestions}>
          {filteredSuggestions.map((med, i) => (
            <TouchableOpacity
              key={i}
              style={styles.suggestionItem}
              onPress={() => {
                setSearchQuery(med.name);
                setShowSuggestions(false);
                handleSearch(med.name);
              }}
            >
              <Text style={styles.suggestionName}>💊 {med.name}</Text>
              <Text style={styles.suggestionCat}>{med.category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Recent Searches */}
      {!searching && results.length === 0 && recentSearches.length > 0 && (
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>{t('price_recent')}</Text>
          <View style={styles.recentChips}>
            {recentSearches.map((term, i) => (
              <TouchableOpacity
                key={i}
                style={styles.recentChip}
                onPress={() => { setSearchQuery(term); handleSearch(term); }}
              >
                <Text style={styles.recentChipText}>{term}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Popular Medications */}
      {!searching && results.length === 0 && recentSearches.length === 0 && (
        <View style={styles.popularSection}>
          <Text style={styles.sectionTitle}>{t('price_popular')}</Text>
          <View style={styles.popularGrid}>
            {COMMON_MEDICATIONS.slice(0, 8).map((med, i) => (
              <TouchableOpacity
                key={i}
                style={styles.popularItem}
                onPress={() => { setSearchQuery(med.name); handleSearch(med.name); }}
              >
                <Text style={styles.popularIcon}>💊</Text>
                <Text style={styles.popularName}>{med.name}</Text>
                <Text style={styles.popularCat}>{med.category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Loading */}
      {searching && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>{t('price_searching')}</Text>
        </View>
      )}

      {/* Results */}
      {!searching && results.length > 0 && (
        <>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>
              {t('price_found', { count: results.length })} — "{searchQuery}"
            </Text>
            <View style={styles.bestPriceRow}>
              <Text style={styles.bestPriceLabel}>{t('price_best_label', { price: `${cur}${lowestPrice.toFixed(2)}` })}</Text>
            </View>
          </View>

          {results.map((pharmacy, index) => {
            const isCheapest = index === 0;
            const savings = index > 0 ? (pharmacy.price - lowestPrice).toFixed(2) : 0;

            return (
              <CuteCard
                key={pharmacy.id}
                style={[styles.pharmacyCard, isCheapest && styles.cheapestCard]}
              >
                {isCheapest && (
                  <View style={styles.bestPriceBadge}>
                    <Text style={styles.bestPriceBadgeText}>{t('price_best_badge')}</Text>
                  </View>
                )}

                <View style={styles.pharmacyHeader}>
                  <View style={styles.pharmacyInfo}>
                    <View style={styles.pharmacyLogoCircle}>
                      <Text style={styles.pharmacyLogo}>{pharmacy.logo}</Text>
                    </View>
                    <View>
                      <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
                      <View style={styles.ratingRow}>
                        <Text style={styles.rating}>⭐ {pharmacy.rating}</Text>
                        <Text style={styles.delivery}>🚚 {pharmacy.deliveryDays}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.priceSection}>
                    {pharmacy.originalPrice && (
                      <Text style={styles.originalPrice}>{cur}{pharmacy.originalPrice}</Text>
                    )}
                    <Text style={[styles.price, isCheapest && styles.priceBest]}>
                      {cur}{pharmacy.price.toFixed(2)}
                    </Text>
                  </View>
                </View>

                <View style={styles.pharmacyBadges}>
                  {!pharmacy.inStock && (
                    <View style={[styles.badge, styles.outOfStock]}>
                      <Text style={styles.badgeTextRed}>{t('price_out_of_stock')}</Text>
                    </View>
                  )}
                  {pharmacy.freeShipping && pharmacy.inStock && (
                    <View style={[styles.badge, styles.freeShipBadge]}>
                      <Text style={styles.badgeTextGreen}>{t('price_free_shipping')}</Text>
                    </View>
                  )}
                  {pharmacy.discount > 0 && (
                    <View style={[styles.badge, styles.discountBadge]}>
                      <Text style={styles.badgeTextPink}>-{pharmacy.discount}% OFF</Text>
                    </View>
                  )}
                  {pharmacy.couponCode && (
                    <View style={[styles.badge, styles.couponBadge]}>
                      <Text style={styles.badgeTextPurple}>🎟️ {pharmacy.couponCode}</Text>
                    </View>
                  )}
                  {!isCheapest && savings > 0 && (
                    <View style={[styles.badge, styles.savingsBadge]}>
                      <Text style={styles.badgeTextGray}>+{cur}{savings} vs best</Text>
                    </View>
                  )}
                </View>

                {pharmacy.inStock ? (
                  <CuteButton
                    title={t('price_shop_now')}
                    onPress={() => handleBuy(pharmacy, searchQuery)}
                    variant={isCheapest ? 'primary' : 'outline'}
                    fullWidth size="medium" style={styles.shopBtn}
                  />
                ) : (
                  <CuteButton
                    title={t('price_out_of_stock')}
                    variant="ghost" fullWidth size="medium" disabled style={styles.shopBtn}
                  />
                )}
              </CuteCard>
            );
          })}

          <CuteCard style={styles.disclaimer}>
            <Text style={styles.disclaimerText}>{t('price_disclaimer')}</Text>
          </CuteCard>
        </>
      )}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingBottom: SPACING.lg },

  headerGradient: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: SPACING.md,
  },
  headerTitle: { fontSize: FONTS.sizes.title, fontWeight: '800', color: '#FFF', marginBottom: 4 },
  headerSub: { fontSize: FONTS.sizes.md, color: 'rgba(255,255,255,0.85)' },

  // Country picker
  countrySection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  detectingRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, paddingVertical: SPACING.sm },
  detectingText: { fontSize: FONTS.sizes.sm, color: COLORS.textLight },
  countryLabel: { fontSize: FONTS.sizes.xs, fontWeight: '700', color: COLORS.textMuted, marginBottom: SPACING.sm, letterSpacing: 0.8, textTransform: 'uppercase' },
  countryScroller: { marginBottom: SPACING.sm },
  countryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: SPACING.sm,
  },
  countryChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primarySoft,
  },
  countryFlag: { fontSize: 18 },
  countryCode: { fontSize: FONTS.sizes.sm, fontWeight: '700', color: COLORS.textLight },
  countryCodeActive: { color: COLORS.primary },
  countryInfo: { fontSize: FONTS.sizes.sm, color: COLORS.textLight, fontWeight: '600' },

  searchContainer: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.sm, paddingHorizontal: SPACING.lg },
  searchBar: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.md, borderWidth: 2, borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  searchIcon: { fontSize: 18, marginRight: SPACING.sm },
  searchInput: { flex: 1, paddingVertical: SPACING.md, fontSize: FONTS.sizes.lg, color: COLORS.text },
  clearBtn: { fontSize: 18, color: COLORS.textMuted, padding: SPACING.sm },
  searchBtn: { alignSelf: 'center' },

  suggestions: {
    marginHorizontal: SPACING.lg, backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.border,
    marginBottom: SPACING.md, overflow: 'hidden',
  },
  suggestionItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  suggestionName: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.text },
  suggestionCat: { fontSize: FONTS.sizes.xs, color: COLORS.secondary },

  recentSection: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.xl },
  sectionTitle: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.sm },
  recentChips: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  recentChip: {
    paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full, backgroundColor: COLORS.primarySoft,
    borderWidth: 1, borderColor: COLORS.primaryLight,
  },
  recentChipText: { fontSize: FONTS.sizes.sm, color: COLORS.primary, fontWeight: '600' },

  popularSection: { paddingHorizontal: SPACING.lg },
  popularGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  popularItem: {
    width: '47%',
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: SPACING.md, ...SHADOWS.small, alignItems: 'flex-start',
  },
  popularIcon: { fontSize: 22, marginBottom: 4 },
  popularName: { fontSize: FONTS.sizes.sm, fontWeight: '700', color: COLORS.text },
  popularCat: { fontSize: FONTS.sizes.xs, color: COLORS.secondary, marginTop: 2 },

  loadingContainer: { alignItems: 'center', paddingVertical: SPACING.xxxl },
  loadingText: { fontSize: FONTS.sizes.lg, color: COLORS.textLight, marginTop: SPACING.md },

  resultsHeader: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.md },
  resultsTitle: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text },
  bestPriceRow: { marginTop: 4 },
  bestPriceLabel: { fontSize: FONTS.sizes.md, color: COLORS.success, fontWeight: '700' },

  pharmacyCard: { marginHorizontal: SPACING.lg, marginBottom: SPACING.md },
  cheapestCard: { borderWidth: 2, borderColor: COLORS.success },
  bestPriceBadge: {
    position: 'absolute', top: -10, right: 16,
    backgroundColor: COLORS.success, paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs, borderRadius: RADIUS.full, zIndex: 1,
  },
  bestPriceBadgeText: { color: COLORS.white, fontSize: FONTS.sizes.xs, fontWeight: '700' },
  pharmacyHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: SPACING.sm,
  },
  pharmacyInfo: { flexDirection: 'row', alignItems: 'center' },
  pharmacyLogoCircle: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.primarySoft, alignItems: 'center',
    justifyContent: 'center', marginRight: SPACING.md,
  },
  pharmacyLogo: { fontSize: 22 },
  pharmacyName: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text },
  ratingRow: { flexDirection: 'row', gap: SPACING.sm, marginTop: 2 },
  rating: { fontSize: FONTS.sizes.xs, color: COLORS.textLight },
  delivery: { fontSize: FONTS.sizes.xs, color: COLORS.textLight },
  priceSection: { alignItems: 'flex-end' },
  originalPrice: { fontSize: FONTS.sizes.sm, color: COLORS.textMuted, textDecorationLine: 'line-through' },
  price: { fontSize: FONTS.sizes.xxl, fontWeight: '800', color: COLORS.text },
  priceBest: { color: COLORS.success },
  pharmacyBadges: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs, marginBottom: SPACING.sm },
  badge: { paddingHorizontal: SPACING.sm, paddingVertical: 2, borderRadius: RADIUS.sm },
  outOfStock: { backgroundColor: '#FFEBEE' },
  freeShipBadge: { backgroundColor: COLORS.mintLight },
  discountBadge: { backgroundColor: COLORS.primarySoft },
  couponBadge: { backgroundColor: COLORS.secondaryLight },
  savingsBadge: { backgroundColor: '#F5F5F5' },
  badgeTextRed: { fontSize: FONTS.sizes.xs, color: COLORS.danger, fontWeight: '600' },
  badgeTextGreen: { fontSize: FONTS.sizes.xs, color: COLORS.success, fontWeight: '600' },
  badgeTextPink: { fontSize: FONTS.sizes.xs, color: COLORS.primary, fontWeight: '600' },
  badgeTextPurple: { fontSize: FONTS.sizes.xs, color: COLORS.secondary, fontWeight: '600' },
  badgeTextGray: { fontSize: FONTS.sizes.xs, color: COLORS.textLight, fontWeight: '600' },
  shopBtn: { marginTop: SPACING.xs },
  disclaimer: { marginHorizontal: SPACING.lg, marginTop: SPACING.sm },
  disclaimerText: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, lineHeight: 18, textAlign: 'center' },
});

export default PriceComparerScreen;
