export const theme = {
  colors: {
    bgBase: '#1A1D21',        // Graphite gelap, latar utama
    bgSurface: '#232730',     // Kartu/panel, sedikit lebih terang
    bgPaper: '#F7F5F0',       // Krem kertas seismograf, untuk data/teks panjang
    accentAlert: '#FF6B35',   // Oranye-amber hangat untuk status alert
    accentCalm: '#2DD4BF',    // Teal untuk status online/normal
    accentOffline: '#6B7280', // Abu netral untuk status offline/idle
    textPrimary: '#F2F0EB',
    textSecondary: '#9A9690',
    textPaperDark: '#1A1D21', // Dark text for the light paper background
    textPaperLight: '#6B7280',// Secondary text for paper background
  },
  fonts: {
    // We will map these in App.tsx using expo-font
    heading: 'Sora_600SemiBold',
    subheading: 'Sora_400Regular',
    mono: 'JetBrainsMono_400Regular',
    monoBold: 'JetBrainsMono_700Bold',
    body: 'System',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
};
