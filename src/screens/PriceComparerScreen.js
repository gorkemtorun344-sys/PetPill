import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, Linking, Alert, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONTS, RADIUS, SHADOWS, COMMON_MEDICATIONS } from '../constants/theme';
import CuteButton from '../components/CuteButton';
import { useLanguage } from '../context/LanguageContext';
import { amazonUrl, trackedUrl } from '../config/affiliates';

// ─── Store catalogue per country ─────────────────────────────────────────────
// isAffiliate = true  → tracked Amazon link, earns commission
// isAffiliate = false → UTM-tracked direct link (negotiate deals later)
const STORES = {
  TR: [
    {
      id: 1, name: 'Amazon TR', logo: '📦', rating: '4.9',
      delivery: '1-2 gün', isAffiliate: true,
      buildUrl: (q) => amazonUrl('TR', q + ' veteriner ilaç'),
    },
    {
      id: 2, name: 'Petsepeti', logo: '🐾', rating: '4.8',
      delivery: '1-2 gün', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.petsepeti.com/search?q=', q),
    },
    {
      id: 3, name: 'Trendyol', logo: '🛒', rating: '4.7',
      delivery: '1-3 gün', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.trendyol.com/sr?q=', q),
    },
    {
      id: 4, name: 'Hepsiburada', logo: '🏪', rating: '4.6',
      delivery: '2-4 gün', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.hepsiburada.com/ara?q=', q),
    },
    {
      id: 5, name: 'Zooplus TR', logo: '🌿', rating: '4.4',
      delivery: '3-5 gün', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.zooplus.com.tr/shop/search?q=', q),
    },
  ],
  US: [
    {
      id: 1, name: 'Amazon US', logo: '📦', rating: '4.9',
      delivery: '1-2 days', isAffiliate: true,
      buildUrl: (q) => amazonUrl('US', q + ' pet medication'),
    },
    {
      id: 2, name: 'Chewy', logo: '🏪', rating: '4.9',
      delivery: '1-3 days', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.chewy.com/s?query=', q),
    },
    {
      id: 3, name: '1800PetMeds', logo: '💊', rating: '4.7',
      delivery: '2-5 days', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.1800petmeds.com/search?query=', q),
    },
    {
      id: 4, name: 'PetCareRx', logo: '🏥', rating: '4.6',
      delivery: '2-4 days', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.petcarerx.com/search?q=', q),
    },
    {
      id: 5, name: 'EntirelyPets', logo: '🐾', rating: '4.4',
      delivery: '3-6 days', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.entirelypets.com/search?query=', q),
    },
  ],
  DE: [
    {
      id: 1, name: 'Amazon DE', logo: '📦', rating: '4.9',
      delivery: '1-2 Tage', isAffiliate: true,
      buildUrl: (q) => amazonUrl('DE', q + ' Tierarzneimittel'),
    },
    {
      id: 2, name: 'Zooplus DE', logo: '🐾', rating: '4.7',
      delivery: '1-3 Tage', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.zooplus.de/shop/search?q=', q),
    },
    {
      id: 3, name: 'DocMorris', logo: '🏥', rating: '4.6',
      delivery: '1-2 Tage', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.docmorris.de/suche?query=', q),
    },
    {
      id: 4, name: 'Zooroyal', logo: '🩺', rating: '4.5',
      delivery: '2-4 Tage', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.zooroyal.de/search?q=', q),
    },
    {
      id: 5, name: 'Medpets DE', logo: '💊', rating: '4.3',
      delivery: '3-5 Tage', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.medpets.de/search?q=', q),
    },
  ],
  FR: [
    {
      id: 1, name: 'Amazon FR', logo: '📦', rating: '4.9',
      delivery: '1-2 jours', isAffiliate: true,
      buildUrl: (q) => amazonUrl('FR', q + ' médicament vétérinaire'),
    },
    {
      id: 2, name: 'Zooplus FR', logo: '🐾', rating: '4.7',
      delivery: '1-2 jours', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.zooplus.fr/shop/search?q=', q),
    },
    {
      id: 3, name: 'Wanimo', logo: '🌿', rating: '4.5',
      delivery: '2-3 jours', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.wanimo.com/recherche/?s=', q),
    },
    {
      id: 4, name: 'Medpets FR', logo: '💊', rating: '4.4',
      delivery: '2-4 jours', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.medpets.fr/search?q=', q),
    },
    {
      id: 5, name: 'Cdiscount', logo: '🏪', rating: '4.2',
      delivery: '3-5 jours', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.cdiscount.com/search/10/', q),
    },
  ],
  SA: [
    {
      id: 1, name: 'Amazon SA', logo: '📦', rating: '4.9',
      delivery: '1-3 days', isAffiliate: true,
      buildUrl: (q) => amazonUrl('SA', q + ' pet medicine'),
    },
    {
      id: 2, name: 'Nahdi Medical', logo: '🏥', rating: '4.8',
      delivery: '1-2 days', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.nahdi.sa/en/search?q=', q),
    },
    {
      id: 3, name: 'Al Dawaa', logo: '💊', rating: '4.6',
      delivery: '2-3 days', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.aldawaa.com/catalogsearch/result/?q=', q),
    },
    {
      id: 4, name: 'Noon', logo: '🛒', rating: '4.5',
      delivery: '2-4 days', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.noon.com/saudi-en/search/?q=', q),
    },
    {
      id: 5, name: 'Jarir', logo: '🌿', rating: '4.3',
      delivery: '3-5 days', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.jarir.com/sa-en/catalogsearch/result/?q=', q),
    },
  ],
  GB: [
    {
      id: 1, name: 'Amazon UK', logo: '📦', rating: '4.9',
      delivery: '1-2 days', isAffiliate: true,
      buildUrl: (q) => amazonUrl('GB', q + ' pet medication'),
    },
    {
      id: 2, name: 'VioVet', logo: '🏥', rating: '4.8',
      delivery: '1-2 days', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.viovet.co.uk/search/?query=', q),
    },
    {
      id: 3, name: 'PetDrugs Online', logo: '💊', rating: '4.7',
      delivery: '1-3 days', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.petdrugsonline.co.uk/search?searchTerm=', q),
    },
    {
      id: 4, name: 'VetUK', logo: '🩺', rating: '4.5',
      delivery: '1-2 days', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.vetuk.co.uk/search?q=', q),
    },
    {
      id: 5, name: 'Zooplus UK', logo: '🐾', rating: '4.3',
      delivery: '3-4 days', isAffiliate: false,
      buildUrl: (q) => trackedUrl('https://www.zooplus.co.uk/shop/search?q=', q),
    },
  ],
};

const COUNTRY_META = {
  TR: { currency: '₺', flag: '🇹🇷', multiplier: 32.5, label: 'Türkiye' },
  US: { currency: '$',  flag: '🇺🇸', multiplier: 1,    label: 'United States' },
  DE: { currency: '€', flag: '🇩🇪', multiplier: 0.93, label: 'Deutschland' },
  FR: { currency: '€', flag: '🇫🇷', multiplier: 0.93, label: 'France' },
  SA: { currency: '﷼', flag: '🇸🇦', multiplier: 3.75, label: 'Saudi Arabia' },
  GB: { currency: '£', flag: '🇬🇧', multiplier: 0.79, label: 'United Kingdom' },
};

const COUNTRY_ORDER = ['TR', 'US', 'DE', 'FR', 'GB', 'SA'];

// ─── Seeded price simulation ──────────────────────────────────────────────────
const getBaseUSD = (name) => {
  const n = name.toLowerCase();
  if (n.includes('heartgard'))   return 45;
  if (n.includes('nexgard'))     return 55;
  if (n.includes('apoquel'))     return 75;
  if (n.includes('bravecto'))    return 48;
  if (n.includes('vetmedin'))    return 90;
  if (n.includes('insulin'))     return 120;
  if (n.includes('revolution'))  return 42;
  if (n.includes('simparica'))   return 52;
  if (n.includes('prednisone'))  return 18;
  if (n.includes('amoxicillin')) return 22;
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return 20 + Math.abs(h % 80);
};

const seededRand = (seed, i) => ((seed * (i + 7) * 9301 + 49297) % 233280) / 233280;

const buildResults = (query, countryCode) => {
  const meta   = COUNTRY_META[countryCode] || COUNTRY_META.US;
  const stores = STORES[countryCode]       || STORES.US;
  const base   = getBaseUSD(query) * meta.multiplier;
  const seed   = query.split('').reduce((a, c) => a + c.charCodeAt(0), 0);

  return stores.map((store, i) => {
    const variance    = (seededRand(seed, i) - 0.3) * base * 0.4;
    const price       = Math.max(base + variance, base * 0.5);
    const hasDiscount = seededRand(seed, i + 10) > 0.55;
    const discountPct = hasDiscount ? Math.floor(seededRand(seed, i + 20) * 20 + 5) : 0;
    return {
      ...store,
      currency:      meta.currency,
      price:         parseFloat(price.toFixed(2)),
      originalPrice: hasDiscount ? parseFloat((price * (1 + discountPct / 100)).toFixed(2)) : null,
      discount:      discountPct,
      inStock:       seededRand(seed, i + 30) > 0.12,
      freeShipping:  seededRand(seed, i + 40) > 0.45,
      coupon:        seededRand(seed, i + 50) > 0.72
                       ? `SAVE${Math.floor(seededRand(seed, i + 60) * 20 + 5)}`
                       : null,
    };
  }).sort((a, b) => a.price - b.price);
};

// ─── Component ────────────────────────────────────────────────────────────────
const PriceComparerScreen = ({ route }) => {
  const initialQuery = route?.params?.searchQuery || '';
  const { t, language } = useLanguage();

  const [query, setQuery]                     = useState(initialQuery);
  const [results, setResults]                 = useState([]);
  const [searching, setSearching]             = useState(false);
  const [recentSearches, setRecentSearches]   = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [country, setCountry]                 = useState('US');
  const [detecting, setDetecting]             = useState(true);

  // ── Location detection ──────────────────────────────────────────────────
  useEffect(() => { detectLocation(); }, []);

  useEffect(() => {
    if (initialQuery && !detecting) runSearch(initialQuery);
  }, [initialQuery, detecting]);

  // sync language → country when language changes (only before user picks manually)
  useEffect(() => {
    if (!detecting) {
      const map = { tr: 'TR', de: 'DE', fr: 'FR', ar: 'SA', en: 'US' };
      const c   = map[language];
      if (c) setCountry(c);
    }
  }, [language]);

  const detectLocation = async () => {
    const langMap = { tr: 'TR', de: 'DE', fr: 'FR', ar: 'SA', en: 'US' };
    const fallback = langMap[language] || 'US';

    const services = [
      'https://ip-api.com/json/?fields=countryCode',
      'https://ipapi.co/json/',
      'https://ipwho.is/',
    ];

    for (const url of services) {
      try {
        const ctrl  = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 3500);
        const res   = await fetch(url, { signal: ctrl.signal });
        clearTimeout(timer);
        if (res.ok) {
          const data = await res.json();
          const code = (data?.countryCode || data?.country_code || data?.country)
                         ?.toUpperCase()?.slice(0, 2);
          if (code && STORES[code]) {
            setCountry(code);
            setDetecting(false);
            return;
          }
        }
      } catch (_) {}
    }

    setCountry(fallback);
    setDetecting(false);
  };

  // ── Search ──────────────────────────────────────────────────────────────
  const runSearch = (q = query) => {
    if (!q.trim()) {
      Alert.alert(t('oops'), t('price_enter_name'));
      return;
    }
    setSearching(true);
    setShowSuggestions(false);
    setTimeout(() => {
      setResults(buildResults(q.trim(), country));
      setSearching(false);
      setRecentSearches(prev =>
        [q.trim(), ...prev.filter(s => s !== q.trim())].slice(0, 10),
      );
    }, 600);
  };

  const handleCountryChange = (code) => {
    setCountry(code);
    if (results.length > 0 && query.trim()) {
      setTimeout(() => setResults(buildResults(query.trim(), code)), 50);
    }
  };

  // ── Open store ─────────────────────────────────────────────────────────
  const openStore = (store, medName) => {
    const url = store.buildUrl(medName);
    Linking.openURL(url).catch(() => {
      // Fallback: Google search
      const fallback = `https://www.google.com/search?q=${encodeURIComponent(medName + ' ' + store.name + ' buy')}`;
      Linking.openURL(fallback).catch(() =>
        Alert.alert('Error', 'Could not open the store. Please try again.'),
      );
    });
  };

  // ── Suggestions ────────────────────────────────────────────────────────
  const suggestions = query.length >= 2
    ? (COMMON_MEDICATIONS || [])
        .filter(m => m.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6)
    : [];

  const meta    = COUNTRY_META[country] || COUNTRY_META.US;
  const lowest  = results.length ? results[0].price : null;

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <LinearGradient
        colors={['#FF6B9D', '#C77DFF']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>{t('price_header')}</Text>
        <Text style={styles.headerSub}>{t('price_subtitle')}</Text>
        {lowest !== null && (
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>
              {t('price_best_from')} {meta.currency}{lowest.toFixed(2)}
            </Text>
          </View>
        )}
      </LinearGradient>

      {/* Country selector */}
      <View style={styles.section}>
        {detecting ? (
          <View style={styles.detectRow}>
            <ActivityIndicator size="small" color={COLORS.primary} />
            <Text style={styles.detectText}>{t('price_detecting')}</Text>
          </View>
        ) : (
          <>
            <Text style={styles.sectionLabel}>{t('price_market')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {COUNTRY_ORDER.map(code => {
                const m = COUNTRY_META[code];
                const active = country === code;
                return (
                  <TouchableOpacity
                    key={code}
                    onPress={() => handleCountryChange(code)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <Text style={styles.chipFlag}>{m.flag}</Text>
                    <Text style={[styles.chipCurrency, active && styles.chipCurrencyActive]}>
                      {m.currency}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <Text style={styles.marketInfo}>
              {meta.flag} {meta.label} · {meta.currency}
            </Text>
          </>
        )}
      </View>

      {/* Search bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={(v) => { setQuery(v); setShowSuggestions(v.length >= 2); }}
            placeholder={t('price_search_placeholder')}
            placeholderTextColor={COLORS.textMuted}
            returnKeyType="search"
            onSubmitEditing={() => runSearch()}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => { setQuery(''); setResults([]); setShowSuggestions(false); }}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => runSearch()}
          disabled={searching}
        >
          {searching
            ? <ActivityIndicator size="small" color="#fff" />
            : <Text style={styles.searchBtnText}>{t('price_search_btn')}</Text>
          }
        </TouchableOpacity>
      </View>

      {/* Autocomplete suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <View style={styles.suggestions}>
          {suggestions.map((m, i) => (
            <TouchableOpacity
              key={i}
              style={styles.suggestionItem}
              onPress={() => { setQuery(m.name); setShowSuggestions(false); runSearch(m.name); }}
            >
              <Text style={styles.suggestionText}>💊 {m.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Recent searches */}
      {!results.length && recentSearches.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('price_recent')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentSearches.map((s, i) => (
              <TouchableOpacity
                key={i}
                style={styles.recentChip}
                onPress={() => { setQuery(s); runSearch(s); }}
              >
                <Text style={styles.recentText}>🕐 {s}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Popular meds */}
      {!results.length && !searching && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('price_popular')}</Text>
          <View style={styles.popularGrid}>
            {['Apoquel', 'NexGard', 'Heartgard', 'Bravecto', 'Simparica', 'Revolution'].map((med) => (
              <TouchableOpacity
                key={med}
                style={styles.popularChip}
                onPress={() => { setQuery(med); runSearch(med); }}
              >
                <Text style={styles.popularText}>💊 {med}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Results */}
      {results.length > 0 && (
        <View style={styles.section}>
          <View style={styles.resultsHeader}>
            <Text style={styles.sectionLabel}>
              {t('price_results_for')} "{query}"
            </Text>
            <Text style={styles.storeCount}>{results.length} {t('price_stores')}</Text>
          </View>

          {/* Affiliate disclosure */}
          <View style={styles.disclosure}>
            <Text style={styles.disclosureText}>
              ℹ️ {t('price_disclosure')}
            </Text>
          </View>

          {results.map((store, idx) => (
            <View
              key={store.id}
              style={[styles.storeCard, idx === 0 && styles.storeCardBest]}
            >
              {/* Best price badge */}
              {idx === 0 && (
                <View style={styles.bestBadge}>
                  <Text style={styles.bestBadgeText}>🏆 {t('price_best_deal')}</Text>
                </View>
              )}

              <View style={styles.storeRow}>
                {/* Left: store info */}
                <View style={styles.storeLeft}>
                  <View style={styles.storeNameRow}>
                    <Text style={styles.storeLogo}>{store.logo}</Text>
                    <Text style={styles.storeName}>{store.name}</Text>
                    {store.isAffiliate && (
                      <View style={styles.partnerBadge}>
                        <Text style={styles.partnerText}>Partner</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.storeMetaRow}>
                    <Text style={styles.storeRating}>⭐ {store.rating}</Text>
                    <Text style={styles.storeDot}>·</Text>
                    <Text style={styles.storeDelivery}>🚚 {store.delivery}</Text>
                  </View>

                  {store.freeShipping && (
                    <Text style={styles.freeShipping}>✅ {t('price_free_shipping')}</Text>
                  )}
                  {store.coupon && (
                    <View style={styles.couponRow}>
                      <Text style={styles.couponIcon}>🎟️</Text>
                      <Text style={styles.couponCode}>{store.coupon}</Text>
                    </View>
                  )}
                </View>

                {/* Right: price + button */}
                <View style={styles.storeRight}>
                  {store.originalPrice && (
                    <Text style={styles.originalPrice}>
                      {store.currency}{store.originalPrice.toFixed(2)}
                    </Text>
                  )}
                  <View style={styles.priceRow}>
                    <Text style={[styles.price, !store.inStock && styles.priceOos]}>
                      {store.currency}{store.price.toFixed(2)}
                    </Text>
                    {store.discount > 0 && (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>-{store.discount}%</Text>
                      </View>
                    )}
                  </View>

                  <Text style={[styles.stockStatus, !store.inStock && styles.outOfStock]}>
                    {store.inStock ? `✅ ${t('price_in_stock')}` : `❌ ${t('price_out_of_stock')}`}
                  </Text>

                  <TouchableOpacity
                    style={[
                      styles.shopBtn,
                      idx === 0 && styles.shopBtnBest,
                      !store.inStock && styles.shopBtnOos,
                    ]}
                    onPress={() => openStore(store, query)}
                  >
                    <Text style={styles.shopBtnText}>
                      {t('price_shop_now')} →
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          {/* Price disclaimer */}
          <Text style={styles.disclaimer}>
            * {t('price_disclaimer')}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background || '#FFF5F8' },
  content:   { paddingBottom: 40 },

  header: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 4 },
  headerSub:   { fontSize: 14, color: 'rgba(255,255,255,0.85)' },
  headerBadge: {
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: 20,
  },
  headerBadgeText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  section:      { paddingHorizontal: SPACING.md, paddingTop: SPACING.md },
  sectionLabel: { fontSize: 14, fontWeight: '700', color: COLORS.text || '#333', marginBottom: 8 },

  detectRow: { flexDirection: 'row', alignItems: 'center', padding: SPACING.sm },
  detectText: { marginLeft: 8, color: COLORS.textMuted || '#999', fontSize: 14 },

  chip: {
    alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20, backgroundColor: '#f0f0f0', marginRight: 8,
  },
  chipActive:    { backgroundColor: COLORS.primary || '#FF6B9D' },
  chipFlag:      { fontSize: 18 },
  chipCurrency:  { fontSize: 12, fontWeight: '600', color: '#555' },
  chipCurrencyActive: { color: '#fff' },
  marketInfo:    { fontSize: 13, color: COLORS.textMuted || '#999', marginTop: 6 },

  searchRow:   { flexDirection: 'row', paddingHorizontal: SPACING.md, paddingTop: SPACING.md, gap: 8 },
  searchBox:   {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: RADIUS.lg, paddingHorizontal: 12,
    borderWidth: 1.5, borderColor: '#f0c0d8',
    ...SHADOWS?.small,
  },
  searchIcon:  { fontSize: 16, marginRight: 6 },
  searchInput: { flex: 1, fontSize: 15, color: COLORS.text || '#333', paddingVertical: 10 },
  clearBtn:    { fontSize: 16, color: '#aaa', paddingHorizontal: 4 },
  searchBtn:   {
    backgroundColor: COLORS.primary || '#FF6B9D',
    borderRadius: RADIUS.lg, paddingHorizontal: 16, paddingVertical: 12,
    justifyContent: 'center', alignItems: 'center',
  },
  searchBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  suggestions: {
    marginHorizontal: SPACING.md, backgroundColor: '#fff',
    borderRadius: RADIUS.md, elevation: 4, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
  },
  suggestionItem: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  suggestionText: { fontSize: 14, color: COLORS.text || '#333' },

  recentChip: {
    backgroundColor: '#fff0f5', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
    marginRight: 8, borderWidth: 1, borderColor: '#ffd0e5',
  },
  recentText: { fontSize: 13, color: COLORS.primary || '#FF6B9D' },

  popularGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  popularChip: {
    backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1.5, borderColor: '#ffd0e5',
  },
  popularText: { fontSize: 13, color: COLORS.text || '#333', fontWeight: '600' },

  resultsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  storeCount:    { fontSize: 13, color: COLORS.textMuted || '#999' },

  disclosure: {
    backgroundColor: '#fffbe6', borderRadius: RADIUS.md,
    padding: 8, marginBottom: 12, borderLeftWidth: 3, borderLeftColor: '#f0c020',
  },
  disclosureText: { fontSize: 11, color: '#888' },

  storeCard: {
    backgroundColor: '#fff', borderRadius: RADIUS.lg, padding: 14, marginBottom: 12,
    borderWidth: 1.5, borderColor: '#f5e0ea',
    ...SHADOWS?.small,
  },
  storeCardBest: { borderColor: '#FF6B9D', borderWidth: 2 },

  bestBadge: {
    backgroundColor: '#FF6B9D', alignSelf: 'flex-start',
    paddingHorizontal: 10, paddingVertical: 3,
    borderRadius: 10, marginBottom: 8,
  },
  bestBadgeText: { color: '#fff', fontWeight: '700', fontSize: 12 },

  storeRow:    { flexDirection: 'row', justifyContent: 'space-between' },
  storeLeft:   { flex: 1, paddingRight: 12 },
  storeRight:  { alignItems: 'flex-end' },

  storeNameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' },
  storeLogo:    { fontSize: 18, marginRight: 6 },
  storeName:    { fontSize: 15, fontWeight: '700', color: COLORS.text || '#333' },

  partnerBadge: {
    backgroundColor: '#fff3cd', borderRadius: 8,
    paddingHorizontal: 6, paddingVertical: 2, marginLeft: 6,
  },
  partnerText: { fontSize: 10, color: '#856404', fontWeight: '600' },

  storeMetaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  storeRating:  { fontSize: 12, color: '#555' },
  storeDot:     { fontSize: 12, color: '#ccc', marginHorizontal: 4 },
  storeDelivery:{ fontSize: 12, color: '#555' },

  freeShipping: { fontSize: 11, color: '#28a745', marginBottom: 2 },

  couponRow:  { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  couponIcon: { fontSize: 12, marginRight: 4 },
  couponCode: {
    fontSize: 11, fontWeight: '700', color: '#e05800',
    backgroundColor: '#fff3e8', paddingHorizontal: 6, paddingVertical: 1,
    borderRadius: 4, borderWidth: 1, borderColor: '#ffd0a0',
  },

  originalPrice: { fontSize: 12, color: '#aaa', textDecorationLine: 'line-through', marginBottom: 2 },
  priceRow:      { flexDirection: 'row', alignItems: 'center', gap: 6 },
  price:         { fontSize: 20, fontWeight: '800', color: COLORS.primary || '#FF6B9D' },
  priceOos:      { color: '#aaa' },

  discountBadge: { backgroundColor: '#28a745', borderRadius: 6, paddingHorizontal: 5, paddingVertical: 2 },
  discountText:  { fontSize: 11, color: '#fff', fontWeight: '700' },

  stockStatus:  { fontSize: 11, color: '#28a745', marginVertical: 4 },
  outOfStock:   { color: '#dc3545' },

  shopBtn: {
    backgroundColor: COLORS.primary || '#FF6B9D',
    borderRadius: RADIUS.md, paddingHorizontal: 16, paddingVertical: 8,
    marginTop: 4,
  },
  shopBtnBest: { backgroundColor: '#FF6B9D' },
  shopBtnOos:  { backgroundColor: '#ccc' },
  shopBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  disclaimer: {
    fontSize: 11, color: '#bbb', textAlign: 'center',
    marginTop: 8, marginHorizontal: SPACING.md,
  },
});

export default PriceComparerScreen;
