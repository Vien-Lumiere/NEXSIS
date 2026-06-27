import { useApp } from '../context/AppContext';

export const useEarthquakeHistory = () => {
  const { history, loadingHistory, historyError, fetchHistory } = useApp();

  return {
    history,
    loading: loadingHistory,
    error: historyError,
    refresh: fetchHistory,
  };
};
