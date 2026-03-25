import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../constants/theme';

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
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsScreen from '../screens/TermsScreen';
import LanguageScreen from '../screens/LanguageScreen';

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
  headerBackTitle: 'Back',
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
        title: route.params?.pet ? '✏️ Edit Pet' : '🐾 Add Pet',
        headerBackTitle: 'Back',
      })}
    />
    <Stack.Screen
      name="PetDetail"
      component={PetDetailScreen}
      options={{ title: '🐾 Pet Profile', headerBackTitle: 'Back' }}
    />
  </Stack.Navigator>
);

const MedicationsStack = () => (
  <Stack.Navigator screenOptions={defaultScreenOptions}>
    <Stack.Screen name="MedsList" component={MedicationsScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="AddMedication"
      component={AddMedicationScreen}
      options={{ title: '💊 Add Medication', headerBackTitle: 'Back' }}
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
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title: '🔒 Privacy Policy', headerBackTitle: 'Back' }} />
    <Stack.Screen name="Terms" component={TermsScreen} options={{ title: '📋 Terms of Service', headerBackTitle: 'Back' }} />
    <Stack.Screen name="Language" component={LanguageScreen} options={{ title: '🌐 Language', headerBackTitle: 'Back' }} />
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
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" label="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="PetsTab"
        component={PetsStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🐾" label="Pets" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="MedsTab"
        component={MedicationsStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="💊" label="Meds" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="PriceTab"
        component={PriceStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="💰" label="Prices" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="HealthTab"
        component={HealthStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="📊" label="Health" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="⚙️" label="More" focused={focused} />,
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
