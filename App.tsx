import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useFonts, Sora_400Regular, Sora_600SemiBold } from '@expo-google-fonts/sora';
import { JetBrainsMono_400Regular, JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono';
import { AppProvider } from './app/context/AppContext';
import { DashboardScreen } from './app/screens/DashboardScreen';
import { SettingsScreen } from './app/screens/SettingsScreen';
import { SafetyScreen } from './app/screens/SafetyScreen';
import { setupNotificationHandler, registerForPushNotificationsAsync } from './app/services/notifications';
import { theme } from './app/config/theme';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'settings' | 'safety'>('dashboard');

  // Load custom premium fonts
  const [fontsLoaded] = useFonts({
    Sora_400Regular,
    Sora_600SemiBold,
    JetBrainsMono_400Regular,
    JetBrainsMono_700Bold,
  });

  useEffect(() => {
    // Setup foreground notifications handler
    setupNotificationHandler();

    // Register push notification permissions on mount
    registerForPushNotificationsAsync();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.accentAlert} />
      </View>
    );
  }

  return (
    <AppProvider>
      <View style={styles.container}>
        {currentScreen === 'dashboard' ? (
          <DashboardScreen
            onOpenSettings={() => setCurrentScreen('settings')}
            onOpenSafety={() => setCurrentScreen('safety')}
          />
        ) : currentScreen === 'settings' ? (
          <SettingsScreen onClose={() => setCurrentScreen('dashboard')} />
        ) : (
          <SafetyScreen onClose={() => setCurrentScreen('dashboard')} />
        )}
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgBase,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: theme.colors.bgBase,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
