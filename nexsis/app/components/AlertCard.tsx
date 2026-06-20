import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useApp } from '../context/AppContext';
import { theme } from '../config/theme';
import { AlertTriangle } from 'lucide-react-native';

export const AlertCard: React.FC = () => {
  const { isAlarmActive, activeAlert, dismissAlert } = useApp();

  if (!isAlarmActive || !activeAlert) return null;

  return (
    <Modal
      transparent={true}
      visible={isAlarmActive}
      animationType="slide"
      onRequestClose={dismissAlert}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            <AlertTriangle color={theme.colors.accentAlert} size={28} />
            <Text style={styles.headerText}>ALARM SEISMIK AKTIF</Text>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.warningMessage}>
              Getaran tinggi terdeteksi di lingkungan pemantauan.
            </Text>
            
            <View style={styles.grid}>
              <View style={styles.row}>
                <Text style={styles.label}>SENSOR:</Text>
                <Text style={styles.value}>{activeAlert.sensor}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>STATUS:</Text>
                <Text style={[styles.value, styles.alertStatus]}>
                  {activeAlert.status.toUpperCase()}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>WAKTU:</Text>
                <Text style={styles.value}>{activeAlert.receivedAt}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>EVENT ID:</Text>
                <Text style={styles.value}>{activeAlert.id}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={dismissAlert}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>MATIKAN ALARM</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  card: {
    width: '100%',
    backgroundColor: theme.colors.bgSurface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.accentAlert,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: theme.colors.accentAlert,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#302624',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.accentAlert,
  },
  headerText: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.accentAlert,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: theme.spacing.sm,
    letterSpacing: 1.5,
  },
  content: {
    padding: theme.spacing.lg,
  },
  warningMessage: {
    fontFamily: theme.fonts.subheading,
    fontSize: 14,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  grid: {
    backgroundColor: theme.colors.bgBase,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: '#2C323D',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#282F3B',
  },
  label: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.colors.textSecondary,
    letterSpacing: 1.0,
  },
  value: {
    fontFamily: theme.fonts.mono,
    fontSize: 12,
    color: theme.colors.textPrimary,
  },
  alertStatus: {
    color: theme.colors.accentAlert,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: theme.colors.accentAlert,
    paddingVertical: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 56, // Accessible touch target >44pt
  },
  buttonText: {
    fontFamily: theme.fonts.heading,
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
