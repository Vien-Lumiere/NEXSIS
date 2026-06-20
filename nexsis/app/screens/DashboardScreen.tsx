import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { StatusIndicator } from '../components/StatusIndicator';
import { WaveformTrace } from '../components/WaveformTrace';
import { HistoryList } from '../components/HistoryList';
import { AlertCard } from '../components/AlertCard';
import { useWebSocket } from '../hooks/useWebSocket';
import { theme } from '../config/theme';
import { Settings } from 'lucide-react-native';

interface DashboardScreenProps {
  onOpenSettings: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onOpenSettings }) => {
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
