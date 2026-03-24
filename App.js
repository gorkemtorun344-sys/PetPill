import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';
import { requestNotificationPermissions } from './src/utils/notifications';
import { getDatabase } from './src/database/database';
import { initAudio } from './src/utils/sounds';
import { COLORS, FONTS } from './src/constants/theme';
import { t } from './src/i18n/i18n';
import { logError } from './src/utils/logger';

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.loadingEmoji}>💊🐾</Text>
    <Text style={styles.loadingTitle}>PetPill</Text>
    <Text style={styles.loadingSubtitle}>{t('loading_subtitle')}</Text>
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
      await initAudio();
      await new Promise(resolve => setTimeout(resolve, 800));
    } catch (e) {
      logError('App initialization error:', e);
    } finally {
      setIsReady(true);
    }
  };

  if (!isReady) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <AppProvider>
            <NavigationContainer>
              <StatusBar style="dark" backgroundColor={COLORS.background} />
              <AppNavigator />
            </NavigationContainer>
          </AppProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingEmoji: {
    fontSize: 64,
    marginBottom: 16,
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
