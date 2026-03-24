import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, Linking, Alert, ActivityIndicator,
} from 'react-native';
import { COLORS, SPACING, FONTS, RADIUS, SHADOWS, PHARMACY_DATA, COMMON_MEDICATIONS } from '../constants/theme';
import CuteCard from '../components/CuteCard';
import CuteButton from '../components/CuteButton';
import { t } from '../i18n/i18n';
import { playTap } from '../utils/sounds';

const PriceComparerScreen = ({ route }) => {
  const initialQuery = route?.params?.searchQuery || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => { if (initialQuery) handleSearch(initialQuery); }, [initialQuery]);

  const filteredSuggestions = searchQuery.length >= 2 ? COMMON_MEDICATIONS.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5) : [];

  const generatePrices = (medName) => {
    const basePrice = getBasePrice(medName);
    return PHARMACY_DATA.map(pharmacy => {
      const variance = (Math.random() - 0.3) * basePrice * 0.4;
      const price = Math.max(basePrice + variance, basePrice * 0.5);
      const hasDiscount = Math.random() > 0.6;
      const discountPct = hasDiscount ? Math.floor(Math.random() * 20 + 5) : 0;
      return { ...pharmacy, price: parseFloat(price.toFixed(2)), originalPrice: hasDiscount ? parseFloat((price * (1 + discountPct / 100)).toFixed(2)) : null, discount: discountPct, inStock: Math.random() > 0.15, freeShipping: Math.random() > 0.5, couponCode: Math.random() > 0.7 ? `SAVE${Math.floor(Math.random() * 20 + 5)}` : null };
    }).sort((a, b) => a.price - b.price);
  };

  const getBasePrice = (name) => {
    const n = name.toLowerCase();
    if (n.includes('heartgard')) return 45; if (n.includes('nexgard')) return 55; if (n.includes('apoquel')) return 75;
    if (n.includes('bravecto')) return 48; if (n.includes('vetmedin')) return 90; if (n.includes('insulin')) return 120;
    if (n.includes('revolution')) return 42;
    let hash = 0; for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return 20 + Math.abs(hash % 80);
  };

  const handleSearch = (query = searchQuery) => {
    if (!query.trim()) { Alert.alert(t('search'), t('enter_search')); return; }
    setSearching(true); setShowSuggestions(false);
    setTimeout(() => {
      setResults(generatePrices(query.trim())); setSearching(false);
      setRecentSearches(prev => [query.trim(), ...prev.filter(s => s !== query.trim())].slice(0, 10));
    }, 800);
  };

  const handleBuy = (pharmacy, medName) => {
    const url = pharmacy.affiliateBase + encodeURIComponent(medName);
    Alert.alert(`${pharmacy.name} ${t('open_store')} 🛒`, `${t('taken_to_store')} ${medName}.`, [
      { text: t('cancel'), style: 'cancel' },
      { text: `🛒 ${t('shop_now')}`, onPress: () => Linking.openURL(url).catch(() => Alert.alert(t('error'), t('something_went_wrong'))) },
    ]);
  };

  const lowestPrice = results.length > 0 ? results[0].price : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('price_comparer')} 💰</Text>
      <Text style={styles.subtitle}>{t('find_best_deals')}</Text>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput style={styles.searchInput} value={searchQuery} onChangeText={(val) => { setSearchQuery(val); setShowSuggestions(val.length >= 2); }} placeholder={t('search_medication')} placeholderTextColor={COLORS.textMuted} returnKeyType="search" onSubmitEditing={() => handleSearch()} />
          {searchQuery.length > 0 && <TouchableOpacity onPress={() => { setSearchQuery(''); setResults([]); }}><Text style={styles.clearBtn}>✕</Text></TouchableOpacity>}
        </View>
        <CuteButton title={t('search')} onPress={() => handleSearch()} size="medium" variant="primary" loading={searching} style={styles.searchBtn} />
      </View>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <View style={styles.suggestions}>
          {filteredSuggestions.map((med, i) => (
            <TouchableOpacity key={i} style={styles.suggestionItem} onPress={() => { setSearchQuery(med.name); setShowSuggestions(false); handleSearch(med.name); playTap(); }}>
              <Text style={styles.suggestionName}>💊 {med.name}</Text><Text style={styles.suggestionCat}>{med.category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {!searching && results.length === 0 && recentSearches.length > 0 && (
        <View style={styles.recentSection}>
          <Text style={styles.recentTitle}>{t('recent_searches')} 🕐</Text>
          <View style={styles.recentChips}>{recentSearches.map((term, i) => <TouchableOpacity key={i} style={styles.recentChip} onPress={() => { setSearchQuery(term); handleSearch(term); }}><Text style={styles.recentChipText}>{term}</Text></TouchableOpacity>)}</View>
        </View>
      )}

      {!searching && results.length === 0 && recentSearches.length === 0 && (
        <View style={styles.popularSection}>
          <Text style={styles.popularTitle}>{t('popular_medications')} 🌟</Text>
          {COMMON_MEDICATIONS.slice(0, 8).map((med, i) => <TouchableOpacity key={i} style={styles.popularItem} onPress={() => { setSearchQuery(med.name); handleSearch(med.name); }}><Text style={styles.popularName}>💊 {med.name}</Text><Text style={styles.popularCat}>{med.category}</Text></TouchableOpacity>)}
        </View>
      )}

      {searching && <View style={styles.loadingContainer}><ActivityIndicator size="large" color={COLORS.primary} /><Text style={styles.loadingText}>{t('finding_prices')} 🔍</Text></View>}

      {!searching && results.length > 0 && (
        <>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>{results.length} {t('pharmacies_found')} "{searchQuery}"</Text>
            <Text style={styles.resultsSubtitle}>{t('best_price')}: <Text style={styles.bestPrice}>${lowestPrice.toFixed(2)}</Text></Text>
          </View>

          {results.map((pharmacy, index) => {
            const isCheapest = index === 0;
            const savings = index > 0 ? (pharmacy.price - lowestPrice).toFixed(2) : 0;
            return (
              <CuteCard key={pharmacy.id} style={[styles.pharmacyCard, isCheapest && styles.cheapestCard]}>
                {isCheapest && <View style={styles.bestPriceBadge}><Text style={styles.bestPriceBadgeText}>🏆 {t('best_price_badge')}</Text></View>}
                <View style={styles.pharmacyHeader}>
                  <View style={styles.pharmacyInfo}><Text style={styles.pharmacyLogo}>{pharmacy.logo}</Text><View><Text style={styles.pharmacyName}>{pharmacy.name}</Text><View style={styles.ratingRow}><Text style={styles.rating}>⭐ {pharmacy.rating}</Text><Text style={styles.delivery}>🚚 {pharmacy.deliveryDays}</Text></View></View></View>
                  <View style={styles.priceSection}>{pharmacy.originalPrice && <Text style={styles.originalPrice}>${pharmacy.originalPrice}</Text>}<Text style={[styles.price, isCheapest && styles.priceBest]}>${pharmacy.price.toFixed(2)}</Text></View>
                </View>
                <View style={styles.pharmacyBadges}>
                  {!pharmacy.inStock && <View style={[styles.badge, styles.outOfStock]}><Text style={styles.badgeTextRed}>{t('out_of_stock')}</Text></View>}
                  {pharmacy.freeShipping && pharmacy.inStock && <View style={[styles.badge, styles.freeShipBadge]}><Text style={styles.badgeTextGreen}>🚚 {t('free_shipping')}</Text></View>}
                  {pharmacy.discount > 0 && <View style={[styles.badge, styles.discountBadge]}><Text style={styles.badgeTextPink}>-{pharmacy.discount}% {t('off')}</Text></View>}
                  {pharmacy.couponCode && <View style={[styles.badge, styles.couponBadge]}><Text style={styles.badgeTextPurple}>🎟️ {pharmacy.couponCode}</Text></View>}
                  {!isCheapest && savings > 0 && <View style={[styles.badge, styles.savingsBadge]}><Text style={styles.badgeTextGray}>+${savings} {t('vs_best')}</Text></View>}
                </View>
                {pharmacy.inStock ? <CuteButton title={`🛒 ${t('shop_now')}`} onPress={() => handleBuy(pharmacy, searchQuery)} variant={isCheapest ? 'primary' : 'outline'} fullWidth size="medium" style={styles.shopBtn} /> : <CuteButton title={t('out_of_stock')} variant="ghost" fullWidth size="medium" disabled style={styles.shopBtn} />}
              </CuteCard>
            );
          })}
          <CuteCard style={styles.disclaimer}><Text style={styles.disclaimerText}>💡 {t('price_disclaimer')} {t('commission_note')}</Text></CuteCard>
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
  subtitle: { fontSize: FONTS.sizes.md, color: COLORS.textLight, marginBottom: SPACING.lg },
  searchContainer: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.sm },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.xl, paddingHorizontal: SPACING.md, borderWidth: 2, borderColor: COLORS.border, ...SHADOWS.small },
  searchIcon: { fontSize: 18, marginRight: SPACING.sm },
  searchInput: { flex: 1, paddingVertical: SPACING.md, fontSize: FONTS.sizes.lg, color: COLORS.text },
  clearBtn: { fontSize: 18, color: COLORS.textMuted, padding: SPACING.sm },
  searchBtn: { alignSelf: 'center' },
  suggestions: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.border, marginBottom: SPACING.md, overflow: 'hidden' },
  suggestionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  suggestionName: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.text },
  suggestionCat: { fontSize: FONTS.sizes.xs, color: COLORS.secondary },
  recentSection: { marginBottom: SPACING.xl },
  recentTitle: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.sm },
  recentChips: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  recentChip: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md, borderRadius: RADIUS.full, backgroundColor: COLORS.primarySoft, borderWidth: 1, borderColor: COLORS.primaryLight },
  recentChipText: { fontSize: FONTS.sizes.sm, color: COLORS.primary, fontWeight: '600' },
  popularSection: { marginTop: SPACING.sm },
  popularTitle: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md },
  popularItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.sm, ...SHADOWS.small },
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
  bestPriceBadge: { position: 'absolute', top: -10, right: 16, backgroundColor: COLORS.success, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: RADIUS.full, zIndex: 1 },
  bestPriceBadgeText: { color: COLORS.white, fontSize: FONTS.sizes.xs, fontWeight: '700' },
  pharmacyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  pharmacyInfo: { flexDirection: 'row', alignItems: 'center' },
  pharmacyLogo: { fontSize: 28, marginRight: SPACING.md },
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
  disclaimer: { marginTop: SPACING.sm },
  disclaimerText: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, lineHeight: 18, textAlign: 'center' },
});

export default PriceComparerScreen;
