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
import { COLORS, FONTS } from './src/constants/theme';

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    {/* PP Logo Badge */}
    <LinearGradient
      colors={['#FF6B9D', '#FF8E53', '#FF6B9D']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.logoBadge}
    >
      <Text style={styles.logoText}>PP</Text>
    </LinearGradient>
    <Text style={styles.loadingTitle}>PetPill</Text>
    <Text style={styles.loadingSubtitle}>Caring for your pets, one pill at a time 🐾</Text>
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
      // Initialize database
      await getDatabase();

      // Request notification permissions
      await requestNotificationPermissions();

      // Small delay for splash feel
      await new Promise(resolve => setTimeout(resolve, 800));
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
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadge: {
    width: 96,
    height: 96,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  loadingTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.primary,
  },
  loadingSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 8,
  },
  spinner: {
    marginTop: 24,
  },
});
