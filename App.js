import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { AppProvider } from './src/context/AppContext';
import { LanguageProvider } from './src/context/LanguageContext';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';
import { requestNotificationPermissions } from './src/utils/notifications';
import { getDatabase } from './src/database/database';
import { COLORS } from './src/constants/theme';

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    {/* Background soft blobs */}
    <View style={styles.blobTL} />
    <View style={styles.blobBR} />

    {/* Floating sparkles */}
    <Text style={[styles.sparkle, { top: '22%', left: '18%' }]}>✨</Text>
    <Text style={[styles.sparkle, { top: '20%', right: '16%', fontSize: 14 }]}>🌸</Text>
    <Text style={[styles.sparkle, { bottom: '28%', left: '14%', fontSize: 13 }]}>💫</Text>
    <Text style={[styles.sparkle, { bottom: '25%', right: '18%', fontSize: 12 }]}>⭐</Text>

    {/* Logo */}
    <View style={styles.logoWrapper}>
      {/* Outer glow ring */}
      <LinearGradient
        colors={['#FFDDE8', '#E8C5FF', '#FFD6E0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.logoGlowRing}
      />
      {/* Main gradient circle */}
      <LinearGradient
        colors={['#FF6B9D', '#C77DFF', '#FF9EC4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.logoCircle}
      >
        {/* White inner card */}
        <View style={styles.logoInner}>
          <Text style={styles.logoPaw}>🐾</Text>
          <Text style={styles.logoLetters}>PP</Text>
        </View>
      </LinearGradient>
      {/* Small pill badge */}
      <View style={styles.pillBadge}>
        <Text style={styles.pillBadgeText}>💊</Text>
      </View>
    </View>

    <Text style={styles.loadingTitle}>PetPill</Text>
    <Text style={styles.loadingSubtitle}>Caring for your pets, one pill at a time 🌸</Text>
    <ActivityIndicator size="large" color={COLORS.primary} style={styles.spinner} />
  </View>
);

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      await getDatabase();
      await requestNotificationPermissions();
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (e) {
      console.error('App initialization error:', e);
    } finally {
      setIsReady(true);
    }
  };

  if (!isReady) {
    return <LoadingScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <LanguageProvider>
          <SafeAreaProvider>
            <AppProvider>
              <NavigationContainer>
                <StatusBar style="dark" backgroundColor={COLORS.background} />
                <AppNavigator />
              </NavigationContainer>
            </AppProvider>
          </SafeAreaProvider>
        </LanguageProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFF8FA',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  // Decorative background blobs
  blobTL: {
    position: 'absolute',
    top: -80,
    left: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#FFD6E8',
    opacity: 0.5,
  },
  blobBR: {
    position: 'absolute',
    bottom: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#E8D5FF',
    opacity: 0.5,
  },
  sparkle: {
    position: 'absolute',
    fontSize: 18,
    opacity: 0.7,
  },
  // Logo
  logoWrapper: {
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoGlowRing: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    opacity: 0.6,
  },
  logoCircle: {
    width: 108,
    height: 108,
    borderRadius: 54,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 14,
  },
  logoInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPaw: {
    fontSize: 30,
    marginBottom: -2,
  },
  logoLetters: {
    fontSize: 17,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 3,
    marginTop: 2,
  },
  pillBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  pillBadgeText: {
    fontSize: 18,
  },
  loadingTitle: {
    fontSize: 38,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  loadingSubtitle: {
    fontSize: 13,
    color: '#C49EBD',
    marginTop: 6,
  },
  spinner: {
    marginTop: 28,
  },
});
