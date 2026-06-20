import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';
import { useEarthquakeHistory } from '../hooks/useEarthquakeHistory';
import { theme } from '../config/theme';
import { RefreshCw, Radio } from 'lucide-react-native';

export const HistoryList: React.FC = () => {
  const { history, loading, error, refresh } = useEarthquakeHistory();

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.historyCard}>
        <View style={styles.cardHeader}>
          <View style={styles.sensorBadge}>
            <Radio size={12} color={theme.colors.textPaperLight} />
            <Text style={styles.sensorText}>SENSOR: {item.sensor}</Text>
          </View>
          <Text style={styles.timeText}>{item.receivedAt}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.statusLabel}>STATUS SIGN: </Text>
          <Text style={styles.statusValue}>{item.status.toUpperCase()}</Text>
        </View>
        <Text style={styles.idText}>REF ID: {item.id}</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.pulseDot} />
        <Text style={styles.emptyHeading}>SISTEM SIAGA</Text>
        <Text style={styles.emptyText}>
          Belum ada getaran tercatat. Alat sedang siaga memantau.
        </Text>
      </View>
    );
  };

  const renderError = () => {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={refresh}
          activeOpacity={0.8}
        >
          <RefreshCw size={14} color={theme.colors.textPrimary} style={{ marginRight: 6 }} />
          <Text style={styles.retryButtonText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>LOG CATATAN SEISMIK</Text>
        {loading && <ActivityIndicator size="small" color={theme.colors.textPaperDark} />}
      </View>
      
      {error ? (
        renderError()
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          refreshing={loading}
          onRefresh={refresh}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgPaper, // Cream paper background for historical data
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.xs,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E4DD',
  },
  listTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 12,
    letterSpacing: 1.2,
    color: theme.colors.textPaperDark,
    fontWeight: 'bold',
  },
  listContent: {
    padding: theme.spacing.md,
    flexGrow: 1,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: '#E6E4DD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  sensorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F1EA',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  sensorText: {
    fontFamily: theme.fonts.monoBold,
    fontSize: 10,
    color: theme.colors.textPaperDark,
    marginLeft: 4,
  },
  timeText: {
    fontFamily: theme.fonts.mono,
    fontSize: 10,
    color: theme.colors.textPaperLight,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  statusLabel: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.colors.textPaperLight,
  },
  statusValue: {
    fontFamily: theme.fonts.monoBold,
    fontSize: 11,
    color: theme.colors.accentAlert, // Orange color to indicate vibration
  },
  idText: {
    fontFamily: theme.fonts.mono,
    fontSize: 8,
    color: theme.colors.textPaperLight,
    marginTop: theme.spacing.xs,
    textAlign: 'right',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.accentCalm,
    marginBottom: theme.spacing.md,
    opacity: 0.8,
  },
  emptyHeading: {
    fontFamily: theme.fonts.heading,
    fontSize: 12,
    letterSpacing: 1.0,
    color: theme.colors.textPaperDark,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  emptyText: {
    fontFamily: theme.fonts.subheading,
    fontSize: 12,
    color: theme.colors.textPaperLight,
    textAlign: 'center',
    lineHeight: 18,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorText: {
    fontFamily: theme.fonts.subheading,
    fontSize: 13,
    color: theme.colors.textPaperDark,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.bgBase,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  retryButtonText: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.textPrimary,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
