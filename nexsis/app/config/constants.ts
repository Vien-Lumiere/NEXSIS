export const STORAGE_KEYS = {
  API_URL: '@nexsis_api_url',
  WS_URL: '@nexsis_ws_url',
  API_KEY: '@nexsis_api_key',
};

// Default fallbacks (can be updated in Settings page)
export const DEFAULT_CONFIG = {
  API_URL: 'http://10.0.2.2:5000', // Default Android Emulator loopback to local server
  WS_URL: 'ws://10.0.2.2:5000',
  API_KEY: '',
};
