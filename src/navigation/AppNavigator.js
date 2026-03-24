import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../constants/theme';
import { t } from '../i18n/i18n';
import { useApp } from '../context/AppContext';

// Screens
import HomeScreen from '../screens/HomeScreen';
import PetsScreen from '../screens/PetsScreen';
import AddPetScreen from '../screens/AddPetScreen';
import PetDetailScreen from '../screens/PetDetailScreen';
import MedicationsScreen from '../screens/MedicationsScreen';
import AddMedicationScreen from '../screens/AddMedicationScreen';
import PriceComparerScreen from '../screens/PriceComparerScreen';
import HealthTrackerScreen from '../screens/HealthTrackerScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: COLORS.background,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTintColor: COLORS.text,
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: FONTS.sizes.xl,
  },
  headerBackTitle: t('back'),
  cardStyle: { backgroundColor: COLORS.background },
};

// ==================== STACK NAVIGATORS ====================

const HomeStack = () => (
  <Stack.Navigator screenOptions={defaultScreenOptions}>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const PetsStack = () => (
  <Stack.Navigator screenOptions={defaultScreenOptions}>
    <Stack.Screen name="PetsList" component={PetsScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="AddPet"
      component={AddPetScreen}
      options={({ route }) => ({
        title: route.params?.pet ? `✏️ ${t('edit_pet')}` : `🐾 ${t('add_pet')}`,
        headerBackTitle: t('back'),
      })}
    />
    <Stack.Screen
      name="PetDetail"
      component={PetDetailScreen}
      options={{ title: `🐾 ${t('pet_profile')}`, headerBackTitle: t('back') }}
    />
  </Stack.Navigator>
);

const MedicationsStack = () => (
  <Stack.Navigator screenOptions={defaultScreenOptions}>
    <Stack.Screen name="MedsList" component={MedicationsScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="AddMedication"
      component={AddMedicationScreen}
      options={{ title: `💊 ${t('add_medication_btn')}`, headerBackTitle: t('back') }}
    />
  </Stack.Navigator>
);

const PriceStack = () => (
  <Stack.Navigator screenOptions={defaultScreenOptions}>
    <Stack.Screen name="PriceComparer" component={PriceComparerScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const HealthStack = () => (
  <Stack.Navigator screenOptions={defaultScreenOptions}>
    <Stack.Screen name="HealthTracker" component={HealthTrackerScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator screenOptions={defaultScreenOptions}>
    <Stack.Screen name="SettingsMain" component={SettingsScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

// ==================== TAB ICON ====================

const TabIcon = ({ emoji, label, focused }) => (
  <View style={styles.tabIcon}>
    <Text style={[styles.tabEmoji, focused && styles.tabEmojiActive]}>{emoji}</Text>
    <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{label}</Text>
  </View>
);

// ==================== MAIN NAVIGATOR ====================

const AppNavigator = () => {
  const { language } = useApp();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" label={t('home')} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="PetsTab"
        component={PetsStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🐾" label={t('pets')} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="MedsTab"
        component={MedicationsStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="💊" label={t('meds')} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="PriceTab"
        component={PriceStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="💰" label={t('prices')} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="HealthTab"
        component={HealthStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="📊" label={t('health')} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="⚙️" label={t('more')} focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopWidth: 0,
    height: 85,
    paddingTop: 8,
    paddingBottom: 20,
    ...SHADOWS.medium,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabEmoji: {
    fontSize: 22,
    opacity: 0.5,
  },
  tabEmojiActive: {
    opacity: 1,
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '600',
    marginTop: 2,
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});

export default AppNavigator;
