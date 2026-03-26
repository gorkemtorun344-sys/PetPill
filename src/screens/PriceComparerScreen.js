import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, Linking, Alert, ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import { COLORS, SPACING, FONTS, RADIUS, SHADOWS, COMMON_MEDICATIONS } from '../constants/theme';
import CuteCard from '../components/CuteCard';
import CuteButton from '../components/CuteButton';
import { useLanguage } from '../context/LanguageContext';

// ── Location → currency + local pharmacy chains ──────────────────────────────
const LOCATION_CONFIG = {
  TR: {
    currency: '₺', flag: '🇹🇷', multiplier: 32.5,
    label: 'Turkey',
    pharmacies: [
      { id: 1, name: 'Yurtdışı Eczane',     logo: '🏥', rating: '4.8', deliveryDays: '2-3 gün', affiliateBase: 'https://google.com/search?q=' },
      { id: 2, name: 'Koçak Farma',          logo: '💊', rating: '4.6', deliveryDays: '1-2 gün', affiliateBase: 'https://google.com/search?q=' },
      { id: 3, name: 'Eczane.com',           logo: '🌿', rating: '4.5', deliveryDays: '3-5 gün', affiliateBase: 'https://google.com/search?q=' },
      { id: 4, name: 'Dr. Eczane',           logo: '🩺', rating: '4.4', deliveryDays: '2-4 gün', affiliateBase: 'https://google.com/search?q=' },
      { id: 5, name: 'VetFarma TR',          logo: '🐾', rating: '4.7', deliveryDays: '1-3 gün', affiliateBase: 'https://google.com/search?q=' },
    ],
  },
  DE: {
    currency: '€', flag: '🇩🇪', multiplier: 0.93,
    label: 'Germany',
    pharmacies: [
      { id: 1, name: 'DocMorris',       logo: '🏥', rating: '4.8', deliveryDays: '1-2 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 2, name: 'Shop Apotheke',   logo: '💊', rating: '4.7', deliveryDays: '1-3 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 3, name: 'Zur Rose',        logo: '🌹', rating: '4.5', deliveryDays: '2-4 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 4, name: 'PetVet Online',   logo: '🐾', rating: '4.6', deliveryDays: '2-3 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 5, name: 'MedPets DE',      logo: '🩺', rating: '4.4', deliveryDays: '3-5 days', affiliateBase: 'https://google.com/search?q=' },
    ],
  },
  FR: {
    currency: '€', flag: '🇫🇷', multiplier: 0.93,
    label: 'France',
    pharmacies: [
      { id: 1, name: 'PharmaVet',       logo: '🏥', rating: '4.7', deliveryDays: '1-2 jours', affiliateBase: 'https://google.com/search?q=' },
      { id: 2, name: 'MaPharmacie',     logo: '💊', rating: '4.6', deliveryDays: '2-3 jours', affiliateBase: 'https://google.com/search?q=' },
      { id: 3, name: 'VetPharma FR',    logo: '🐾', rating: '4.5', deliveryDays: '1-3 jours', affiliateBase: 'https://google.com/search?q=' },
      { id: 4, name: 'Medpets France',  logo: '🩺', rating: '4.4', deliveryDays: '2-4 jours', affiliateBase: 'https://google.com/search?q=' },
      { id: 5, name: 'PharmaClic',      logo: '🌿', rating: '4.3', deliveryDays: '3-5 jours', affiliateBase: 'https://google.com/search?q=' },
    ],
  },
  SA: {
    currency: '﷼', flag: '🇸🇦', multiplier: 3.75,
    label: 'Saudi Arabia',
    pharmacies: [
      { id: 1, name: 'Nahdi Medical',    logo: '🏥', rating: '4.8', deliveryDays: '1-2 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 2, name: 'Al Dawaa',         logo: '💊', rating: '4.6', deliveryDays: '2-3 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 3, name: 'United Pharm',     logo: '🌿', rating: '4.5', deliveryDays: '2-4 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 4, name: 'VetCare Arabia',   logo: '🐾', rating: '4.4', deliveryDays: '3-5 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 5, name: 'MedPlus KSA',     logo: '🩺', rating: '4.3', deliveryDays: '2-5 days', affiliateBase: 'https://google.com/search?q=' },
    ],
  },
  GB: {
    currency: '£', flag: '🇬🇧', multiplier: 0.79,
    label: 'United Kingdom',
    pharmacies: [
      { id: 1, name: 'VioVet',          logo: '🏥', rating: '4.8', deliveryDays: '1-2 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 2, name: 'MedicAnimal',     logo: '💊', rating: '4.7', deliveryDays: '1-3 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 3, name: 'PetDrugs Online', logo: '🐾', rating: '4.6', deliveryDays: '2-3 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 4, name: 'Animed Direct',   logo: '🩺', rating: '4.5', deliveryDays: '1-2 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 5, name: 'Vetissimo UK',    logo: '🌿', rating: '4.3', deliveryDays: '3-4 days', affiliateBase: 'https://google.com/search?q=' },
    ],
  },
  US: {
    currency: '$', flag: '🇺🇸', multiplier: 1,
    label: 'United States',
    pharmacies: [
      { id: 1, name: 'Chewy Pharmacy',   logo: '🏪', rating: '4.9', deliveryDays: '1-3 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 2, name: '1800PetMeds',      logo: '💊', rating: '4.7', deliveryDays: '2-5 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 3, name: 'PetCareRx',        logo: '🏥', rating: '4.6', deliveryDays: '2-4 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 4, name: 'VetRxDirect',      logo: '🩺', rating: '4.5', deliveryDays: '3-5 days', affiliateBase: 'https://google.com/search?q=' },
      { id: 5, name: 'EntirelyPets',     logo: '🐾', rating: '4.4', deliveryDays: '3-6 days', affiliateBase: 'https://google.com/search?q=' },
    ],
  },
};

const DEFAULT_CONFIG = LOCATION_CONFIG.US;

// ─────────────────────────────────────────────────────────────────────────────

const PriceComparerScreen = ({ route }) => {
  const initialQuery = route?.params?.searchQuery || '';
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationConfig, setLocationConfig] = useState(null);
  const [detectingLocation, setDetectingLocation] = useState(true);

  useEffect(() => {
    detectLocation();
  }, []);

  useEffect(() => {
    if (initialQuery && locationConfig) {
      handleSearch(initialQuery);
    }
  }, [initialQuery, locationConfig]);

  const detectLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationConfig(DEFAULT_CONFIG);
        setDetectingLocation(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
      const [geo] = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      const countryCode = geo?.isoCountryCode?.toUpperCase() || 'US';
      setLocationConfig(LOCATION_CONFIG[countryCode] || DEFAULT_CONFIG);
    } catch (e) {
      console.log('Location detection failed, using default:', e.message);
      setLocationConfig(DEFAULT_CONFIG);
    } finally {
      setDetectingLocation(false);
    }
  };

  const config = locationConfig || DEFAULT_CONFIG;
  const cur = config.currency;

  const filteredSuggestions = searchQuery.length >= 2
    ? COMMON_MEDICATIONS.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const getBasePrice = (name) => {
    const n = name.toLowerCase();
    if (n.includes('heartgard')) return 45;
    if (n.includes('nexgard'))   return 55;
    if (n.includes('apoquel'))   return 75;
    if (n.includes('bravecto'))  return 48;
    if (n.includes('vetmedin'))  return 90;
    if (n.includes('insulin'))   return 120;
    if (n.includes('revolution'))return 42;
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return 20 + Math.abs(hash % 80);
  };

  const generatePrices = (medName) => {
    const basePriceUSD = getBasePrice(medName);
    const baseLocal = basePriceUSD * config.multiplier;

    return config.pharmacies.map(pharmacy => {
      const variance = (Math.random() - 0.3) * baseLocal * 0.4;
      const price = Math.max(baseLocal + variance, baseLocal * 0.5);
      const hasDiscount = Math.random() > 0.6;
      const discountPct = hasDiscount ? Math.floor(Math.random() * 20 + 5) : 0;

      return {
        ...pharmacy,
        price: parseFloat(price.toFixed(2)),
        originalPrice: hasDiscount ? parseFloat((price * (1 + discountPct / 100)).toFixed(2)) : null,
        discount: discountPct,
        inStock: Math.random() > 0.15,
        freeShipping: Math.random() > 0.5,
        couponCode: Math.random() > 0.7 ? `SAVE${Math.floor(Math.random() * 20 + 5)}` : null,
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
      const priceResults = generatePrices(query.trim());
      setResults(priceResults);
      setSearching(false);
      setRecentSearches(prev =>
        [query.trim(), ...prev.filter(s => s !== query.trim())].slice(0, 10)
      );
    }, 800);
  };

  const handleBuy = (pharmacy, medName) => {
    const url = pharmacy.affiliateBase + encodeURIComponent(medName);
    Alert.alert(
      `${t('price_open_store')} ${pharmacy.name} 🛒`,
      `${t('price_open_store_msg', { name: pharmacy.name, med: medName })}`,
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
      <Text style={styles.title}>{t('price_header')}</Text>
      <Text style={styles.subtitle}>{t('price_subtitle')}</Text>

      {/* Location banner */}
      <View style={styles.locationBanner}>
        {detectingLocation ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <>
            <Text style={styles.locationFlag}>{config.flag}</Text>
            <Text style={styles.locationText}>
              {t('price_location_label')}{config.label} · {cur}
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
          <Text style={styles.recentTitle}>{t('price_recent')}</Text>
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
          <Text style={styles.popularTitle}>{t('price_popular')}</Text>
          {COMMON_MEDICATIONS.slice(0, 8).map((med, i) => (
            <TouchableOpacity
              key={i}
              style={styles.popularItem}
              onPress={() => { setSearchQuery(med.name); handleSearch(med.name); }}
            >
              <Text style={styles.popularName}>💊 {med.name}</Text>
              <Text style={styles.popularCat}>{med.category}</Text>
            </TouchableOpacity>
          ))}
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
              {t('price_found', { count: results.length })} for "{searchQuery}"
            </Text>
            <Text style={styles.resultsSubtitle}>
              {t('price_best_label', { price: `${cur}${lowestPrice.toFixed(2)}` })}
            </Text>
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
                    <Text style={styles.pharmacyLogo}>{pharmacy.logo}</Text>
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
                    fullWidth
                    size="medium"
                    style={styles.shopBtn}
                  />
                ) : (
                  <CuteButton
                    title={t('price_out_of_stock')}
                    variant="ghost"
                    fullWidth
                    size="medium"
                    disabled
                    style={styles.shopBtn}
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
  content: { padding: SPACING.lg },
  title: { fontSize: FONTS.sizes.title, fontWeight: '800', color: COLORS.text, marginTop: SPACING.sm },
  subtitle: { fontSize: FONTS.sizes.md, color: COLORS.textLight, marginBottom: SPACING.md },

  locationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primarySoft,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  locationFlag: { fontSize: 20 },
  locationText: { fontSize: FONTS.sizes.sm, color: COLORS.primary, fontWeight: '600' },

  searchContainer: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.sm },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  searchIcon: { fontSize: 18, marginRight: SPACING.sm },
  searchInput: { flex: 1, paddingVertical: SPACING.md, fontSize: FONTS.sizes.lg, color: COLORS.text },
  clearBtn: { fontSize: 18, color: COLORS.textMuted, padding: SPACING.sm },
  searchBtn: { alignSelf: 'center' },

  suggestions: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  suggestionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  suggestionName: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.text },
  suggestionCat: { fontSize: FONTS.sizes.xs, color: COLORS.secondary },

  recentSection: { marginBottom: SPACING.xl },
  recentTitle: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.sm },
  recentChips: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  recentChip: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  recentChipText: { fontSize: FONTS.sizes.sm, color: COLORS.primary, fontWeight: '600' },

  popularSection: { marginTop: SPACING.sm },
  popularTitle: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md },
  popularItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  popularName: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.text },
  popularCat: { fontSize: FONTS.sizes.xs, color: COLORS.secondary, fontWeight: '500' },

  loadingContainer: { alignItems: 'center', paddingVertical: SPACING.xxxl },
  loadingText: { fontSize: FONTS.sizes.lg, color: COLORS.textLight, marginTop: SPACING.md },

  resultsHeader: { marginBottom: SPACING.lg },
  resultsTitle: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text },
  resultsSubtitle: { fontSize: FONTS.sizes.md, color: COLORS.textLight, marginTop: 2 },
  bestPrice: { color: COLORS.success, fontWeight: '800' },

  pharmacyCard: { marginBottom: SPACING.md },
  cheapestCard: { borderWidth: 2, borderColor: COLORS.success },
  bestPriceBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    zIndex: 1,
  },
  bestPriceBadgeText: { color: COLORS.white, fontSize: FONTS.sizes.xs, fontWeight: '700' },
  pharmacyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  pharmacyInfo: { flexDirection: 'row', alignItems: 'center' },
  pharmacyLogo: { fontSize: 28, marginRight: SPACING.md },
  pharmacyName: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text },
  ratingRow: { flexDirection: 'row', gap: SPACING.sm, marginTop: 2 },
  rating: { fontSize: FONTS.sizes.xs, color: COLORS.textLight },
  delivery: { fontSize: FONTS.sizes.xs, color: COLORS.textLight },
  priceSection: { alignItems: 'flex-end' },
  originalPrice: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
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
  disclaimer: { marginTop: SPACING.sm },
  disclaimerText: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, lineHeight: 18, textAlign: 'center' },
});

export default PriceComparerScreen;
