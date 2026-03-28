/**
 * PetPill Affiliate Marketing Configuration
 *
 * HOW TO EARN MONEY:
 * 1. Sign up for Amazon Associates in each country you target
 * 2. Replace the placeholder tag values below with your real affiliate tags
 * 3. Every purchase made through PetPill earns 3-8% commission
 *
 * SIGN UP LINKS:
 *   Turkey  → https://gelirortakligi.amazon.com.tr
 *   USA     → https://affiliate-program.amazon.com
 *   Germany → https://partnernet.amazon.de
 *   France  → https://partenaires.amazon.fr
 *   UK      → https://affiliate-program.amazon.co.uk
 *   Saudi   → https://affiliate-program.amazon.sa
 *
 * Chewy (USA, 4-8% commission) → https://www.chewy.com/affiliates
 * Zooplus EU (3-6%)            → https://www.awin.com  (search Zooplus)
 */

export const AMAZON_TAGS = {
  TR: 'petpill-tr-20',  // ← replace with your Amazon TR tag
  US: 'petpill-us-20',  // ← replace with your Amazon US tag
  DE: 'petpilld-21',    // ← replace with your Amazon DE tag
  FR: 'petpillf-21',    // ← replace with your Amazon FR tag
  GB: 'petpillg-21',    // ← replace with your Amazon UK tag
  SA: 'petpills-21',    // ← replace with your Amazon SA tag
};

const AMAZON_DOMAINS = {
  TR: 'amazon.com.tr',
  US: 'amazon.com',
  DE: 'amazon.de',
  FR: 'amazon.fr',
  GB: 'amazon.co.uk',
  SA: 'amazon.sa',
};

/** Build a tracked Amazon affiliate search URL */
export const amazonUrl = (countryCode, query) => {
  const tag    = AMAZON_TAGS[countryCode]    || AMAZON_TAGS.US;
  const domain = AMAZON_DOMAINS[countryCode] || AMAZON_DOMAINS.US;
  return `https://www.${domain}/s?k=${encodeURIComponent(query)}&tag=${tag}&ref=petpill_app`;
};

/** Build a UTM-tracked direct store URL (no commission yet, but tracks clicks) */
export const trackedUrl = (baseUrl, query) =>
  `${baseUrl}${encodeURIComponent(query)}&utm_source=petpill&utm_medium=app&utm_campaign=price_compare`;
