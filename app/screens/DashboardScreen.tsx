import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Text } from 'react-native';
import { StatusIndicator } from '../components/StatusIndicator';
import { WaveformTrace } from '../components/WaveformTrace';
import { HistoryList } from '../components/HistoryList';
import { AlertCard } from '../components/AlertCard';
import { useWebSocket } from '../hooks/useWebSocket';
import { theme } from '../config/theme';
import { Settings, ShieldAlert } from 'lucide-react-native';

interface DashboardScreenProps {
  onOpenSettings: () => void;
  onOpenSafety: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onOpenSettings, onOpenSafety }) => {
  // Initialize the WebSocket connection via hook
  useWebSocket();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.bgSurface} />
      
      {/* Top panel containing status and settings button */}
      <View style={styles.headerContainer}>
        <View style={styles.statusWrapper}>
          <StatusIndicator />
        </View>

        {/* Safety Guide Button */}
        <TouchableOpacity
          style={styles.safetyButton}
          onPress={onOpenSafety}
          activeOpacity={0.7}
          accessibilityLabel="Panduan Keselamatan Gempa"
        >
          <ShieldAlert color={theme.colors.accentAlert} size={16} />
          <Text style={styles.safetyButtonText}>PANDUAN</Text>
        </TouchableOpacity>

        {/* Settings Button */}
        <TouchableOpacity 
          style={styles.settingsButton} 
          onPress={onOpenSettings}
          activeOpacity={0.7}
          accessibilityLabel="Open Settings"
        >
          <Settings color={theme.colors.textPrimary} size={20} />
        </TouchableOpacity>
      </View>

      {/* Signature Element (Waveform Seismograph Trace) */}
      <WaveformTrace />

      {/* Historical Seismograph Log Data */}
      <View style={styles.historyWrapper}>
        <HistoryList />
      </View>

      {/* Floating alert card overlay modal when vibration is detected */}
      <AlertCard />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgBase,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.bgSurface,
    borderBottomWidth: 1,
    borderBottomColor: '#2C323D',
  },
  statusWrapper: {
    flex: 1,
  },
  safetyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.25)',
    marginRight: theme.spacing.sm,
  },
  safetyButtonText: {
    fontFamily: theme.fonts.mono,
    fontSize: 9,
    color: theme.colors.accentAlert,
    letterSpacing: 1.0,
  },
  settingsButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  historyWrapper: {
    flex: 1,
  },
});

