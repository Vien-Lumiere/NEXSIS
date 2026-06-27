import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { theme } from '../config/theme';
import Svg, { Path, Polyline, Line, Circle, Rect, Polygon } from 'react-native-svg';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface SafetyScreenProps {
  onClose: () => void;
}

// ─── CRASH-PROOF SVG ICONS ───────────────────────────────────────────────────
const IconSVG: React.FC<{ name: string; color: string; size: number }> = ({ name, color, size }) => {
  switch (name) {
    case 'ArrowLeft':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <Line x1="19" y1="12" x2="5" y2="12" />
          <Polyline points="12 19 5 12 12 5" />
        </Svg>
      );
    case 'ChevronDown':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <Polyline points="6 9 12 15 18 9" />
        </Svg>
      );
    case 'ChevronUp':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <Polyline points="18 15 12 9 6 15" />
        </Svg>
      );
    case 'ArrowDownToLine':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M12 17V3" />
          <Polyline points="6 11 12 17 18 11" />
          <Line x1="5" y1="21" x2="19" y2="21" />
        </Svg>
      );
    case 'Shield':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </Svg>
      );
    case 'Grip':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <Circle cx="12" cy="9" r="1" />
          <Circle cx="19" cy="9" r="1" />
          <Circle cx="5" cy="9" r="1" />
          <Circle cx="12" cy="15" r="1" />
          <Circle cx="19" cy="15" r="1" />
          <Circle cx="5" cy="15" r="1" />
        </Svg>
      );
    case 'Home':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <Polyline points="9 22 9 12 15 12 15 22" />
        </Svg>
      );
    case 'Trees':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M17 14V2" />
          <Path d="M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88z" />
        </Svg>
      );
    case 'Car':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <Rect x="1" y="3" width="15" height="13" />
          <Polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <Circle cx="5.5" cy="18.5" r="2.5" />
          <Circle cx="18.5" cy="18.5" r="2.5" />
        </Svg>
      );
    case 'Mountain':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 20 15 4 21 20 3 20" />
        </Svg>
      );
    case 'LogOut':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </Svg>
      );
    case 'AlertTriangle':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </Svg>
      );
    case 'Flame':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </Svg>
      );
    case 'WifiOff':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <line x1="1" y1="1" x2="23" y2="23" />
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
          <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
          <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
          <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </Svg>
      );
    default:
      return null;
  }
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const PRINCIPLE_CARDS = [
  {
    step: '01',
    title: 'MERUNDUK',
    subtitle: 'Drop',
    color: '#FF6B35',
    iconName: 'ArrowDownToLine',
    content:
      'Segera jatuhkan badan ke lantai, bertumpu pada tangan dan lutut. Posisi ini mencegah Anda kehilangan keseimbangan akibat guncangan keras dan tetap memungkinkan Anda merayap ke tempat aman.',
  },
  {
    step: '02',
    title: 'LINDUNGI',
    subtitle: 'Cover',
    color: '#2DD4BF',
    iconName: 'Shield',
    content:
      'Berlindung di bawah meja yang kokoh. Jika tidak ada meja, merapat ke dinding bagian dalam bangunan dan lindungi kepala serta leher dengan kedua lengan, tas, atau bantal.',
  },
  {
    step: '03',
    title: 'BERTAHAN',
    subtitle: 'Hold On',
    color: '#FBBF24',
    iconName: 'Grip',
    content:
      'Pegang erat kaki meja atau pelindung sampai guncangan benar-benar berhenti. Bersiaplah untuk ikut bergerak jika benda pelindung bergeser akibat gempa.',
  },
];

type LocationSection = {
  id: string;
  iconName: string;
  title: string;
  accent: string;
  tips: { label: string; desc: string }[];
};

const LOCATION_SECTIONS: LocationSection[] = [
  {
    id: 'indoor',
    iconName: 'Home',
    title: 'Di Dalam Ruangan',
    accent: '#2DD4BF',
    tips: [
      { label: 'Jangan lari keluar', desc: 'Berlari saat tanah berguncang berisiko terkena reruntuhan atau pecahan kaca. Berlindunglah di tempat.' },
      { label: 'Jauhi area bahaya', desc: 'Menjauhlah dari jendela kaca, rak buku tinggi, lemari, atau lampu gantung yang bisa jatuh.' },
      { label: 'Hindari lift', desc: 'Gunakan tangga darurat hanya setelah guncangan berhenti. Jika sudah di dalam lift, tekan semua tombol lantai dan segeralah keluar begitu pintu terbuka.' },
      { label: 'Di dapur', desc: 'Segera matikan kompor jika sedang memasak untuk mencegah kebakaran.' },
    ],
  },
  {
    id: 'outdoor',
    iconName: 'Trees',
    title: 'Di Luar Ruangan',
    accent: '#34D399',
    tips: [
      { label: 'Cari area terbuka', desc: 'Segera menjauh dari gedung, tiang listrik, pohon besar, dan papan reklame. Area paling mematikan sering tepat di luar pintu masuk gedung.' },
      { label: 'Perhatikan pijakan', desc: 'Waspadai tanah yang merekah atau lubang pembuangan yang amblas.' },
    ],
  },
  {
    id: 'driving',
    iconName: 'Car',
    title: 'Saat Mengemudi',
    accent: '#FBBF24',
    tips: [
      { label: 'Menepi dengan aman', desc: 'Hindari berhenti di bawah jalan layang (overpass), jembatan, kabel listrik, terowongan, atau pohon besar.' },
      { label: 'Tetap di dalam kendaraan', desc: 'Pasang rem tangan, nyalakan lampu hazard, dan tunggu hingga guncangan berhenti. Rangka mobil memberikan perlindungan dari material yang berjatuhan.' },
    ],
  },
  {
    id: 'beach',
    iconName: 'Mountain',
    title: 'Di Pantai / Pegunungan',
    accent: '#60A5FA',
    tips: [
      { label: 'Di Pantai — Evakuasi segera', desc: 'Begitu guncangan berhenti, langsung lari ke dataran tinggi. Jangan menunggu sirene tsunami berbunyi atau melihat air laut surut.' },
      { label: 'Di Pegunungan — Hindari tebing', desc: 'Jauhi area tebing, lereng curam, atau perbukitan yang rawan longsor akibat guncangan.' },
    ],
  },
];

type AfterTip = {
  iconName: string;
  text: string;
};

const AFTER_TIPS: AfterTip[] = [
  { iconName: 'LogOut',        text: 'Evakuasi keluar bangunan dengan tenang, terus lindungi kepala.' },
  { iconName: 'AlertTriangle', text: 'Waspadai gempa susulan (aftershock) yang bisa terjadi kapan saja.' },
  { iconName: 'Flame',         text: 'Periksa titik api dan kebocoran gas. Matikan sakelar listrik utama jika aman.' },
  { iconName: 'WifiOff',       text: 'Hindari menyebarkan informasi yang belum diverifikasi BMKG atau BPBD.' },
];

// ─── ACCORDION CARD ───────────────────────────────────────────────────────────
const LocationCard: React.FC<{
  section: LocationSection;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ section, isOpen, onToggle }) => (
  <View style={[styles.accordionCard, { borderLeftColor: section.accent }]}>
    <TouchableOpacity
      style={styles.accordionHeader}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={[styles.accordionIconBox, { backgroundColor: section.accent + '18' }]}>
        <IconSVG name={section.iconName} color={section.accent} size={16} />
      </View>
      <Text style={styles.accordionTitle}>{section.title}</Text>
      <View style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}>
        <IconSVG name="ChevronDown" color={theme.colors.textSecondary} size={18} />
      </View>
    </TouchableOpacity>

    {isOpen && (
      <View style={styles.accordionBody}>
        {section.tips.map((tip, idx) => (
          <View key={idx} style={styles.tipRow}>
            <View style={[styles.tipDot, { backgroundColor: section.accent }]} />
            <View style={styles.tipContent}>
              <Text style={[styles.tipLabel, { color: section.accent }]}>{tip.label}</Text>
              <Text style={styles.tipDesc}>{tip.desc}</Text>
            </View>
          </View>
        ))}
      </View>
    )}
  </View>
);

// ─── SCREEN ───────────────────────────────────────────────────────────────────
export const SafetyScreen: React.FC<SafetyScreenProps> = ({ onClose }) => {
  const [openSection, setOpenSection] = useState<string | null>('indoor');

  const toggleSection = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenSection(prev => (prev === id ? null : id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.bgSurface} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton} activeOpacity={0.7}>
          <IconSVG name="ArrowLeft" color={theme.colors.textPrimary} size={20} />
        </TouchableOpacity>
        <View style={styles.headerTextGroup}>
          <Text style={styles.headerTitle}>PANDUAN KESELAMATAN</Text>
          <Text style={styles.headerSub}>Standar BMKG · Drop Cover Hold On</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Prinsip Utama ── */}
        <Text style={styles.sectionLabel}>PRINSIP UTAMA</Text>
        <View style={styles.principleRow}>
          {PRINCIPLE_CARDS.map((card) => {
            return (
              <View key={card.step} style={[styles.principleCard, { borderTopColor: card.color }]}>
                <View style={[styles.principleIconBox, { backgroundColor: card.color + '1A' }]}>
                  <IconSVG name={card.iconName} color={card.color} size={22} />
                </View>
                <Text style={[styles.principleStep, { color: card.color }]}>{card.step}</Text>
                <Text style={styles.principleTitle}>{card.title}</Text>
                <Text style={[styles.principleSub, { color: card.color }]}>{card.subtitle}</Text>
                <Text style={styles.principleDesc}>{card.content}</Text>
              </View>
            );
          })}
        </View>

        {/* ── Tindakan Berdasarkan Lokasi ── */}
        <Text style={[styles.sectionLabel, { marginTop: theme.spacing.xl }]}>
          TINDAKAN BERDASARKAN LOKASI
        </Text>
        {LOCATION_SECTIONS.map(section => (
          <LocationCard
            key={section.id}
            section={section}
            isOpen={openSection === section.id}
            onToggle={() => toggleSection(section.id)}
          />
        ))}

        {/* ── Setelah Guncangan Berhenti ── */}
        <Text style={[styles.sectionLabel, { marginTop: theme.spacing.xl }]}>
          SETELAH GUNCANGAN BERHENTI
        </Text>
        <View style={styles.afterCard}>
          {AFTER_TIPS.map((tip, idx) => (
            <View key={idx} style={[styles.afterRow, idx !== 0 && styles.afterRowBorder]}>
              <View style={styles.afterIconBox}>
                <IconSVG name={tip.iconName} color={theme.colors.accentAlert} size={16} />
              </View>
              <Text style={styles.afterText}>{tip.text}</Text>
            </View>
          ))}
        </View>

        {/* ── Source badge ── */}
        <View style={styles.sourceBadge}>
          <Text style={styles.sourceText}>
            Sumber: BMKG · Standar Internasional · BPBD
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bgBase },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.bgSurface,
    borderBottomWidth: 1,
    borderBottomColor: '#2C323D',
    paddingRight: theme.spacing.md,
  },
  backButton: {
    width: 48,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextGroup: { flex: 1 },
  headerTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 13,
    color: theme.colors.textPrimary,
    letterSpacing: 1.4,
  },
  headerSub: {
    fontFamily: theme.fonts.mono,
    fontSize: 10,
    color: theme.colors.accentCalm,
    letterSpacing: 0.5,
    marginTop: 2,
  },

  /* Scroll */
  scroll: { padding: theme.spacing.md, paddingBottom: theme.spacing.xxl },

  /* Section label */
  sectionLabel: {
    fontFamily: theme.fonts.mono,
    fontSize: 10,
    color: theme.colors.textSecondary,
    letterSpacing: 1.5,
    marginBottom: theme.spacing.sm,
  },

  /* Principle cards */
  principleRow: { gap: theme.spacing.sm },
  principleCard: {
    backgroundColor: theme.colors.bgSurface,
    borderRadius: theme.borderRadius.lg,
    borderTopWidth: 3,
    padding: theme.spacing.md,
  },
  principleIconBox: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  principleStep: {
    fontFamily: theme.fonts.monoBold,
    fontSize: 11,
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  principleTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 18,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  principleSub: {
    fontFamily: theme.fonts.mono,
    fontSize: 11,
    letterSpacing: 0.8,
    marginBottom: theme.spacing.sm,
    textTransform: 'uppercase',
  },
  principleDesc: {
    fontFamily: theme.fonts.subheading,
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },

  /* Accordion */
  accordionCard: {
    backgroundColor: theme.colors.bgSurface,
    borderRadius: theme.borderRadius.lg,
    borderLeftWidth: 3,
    marginBottom: theme.spacing.sm,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  accordionIconBox: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accordionTitle: {
    flex: 1,
    fontFamily: theme.fonts.heading,
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  accordionBody: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  tipRow: { flexDirection: 'row', gap: theme.spacing.sm, alignItems: 'flex-start' },
  tipDot: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  tipContent: { flex: 1 },
  tipLabel: { fontFamily: theme.fonts.heading, fontSize: 13, marginBottom: 2 },
  tipDesc: {
    fontFamily: theme.fonts.subheading,
    fontSize: 12,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },

  /* After section */
  afterCard: {
    backgroundColor: theme.colors.bgSurface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  afterRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  afterRowBorder: {
    borderTopWidth: 1,
    borderTopColor: '#2C323D',
  },
  afterIconBox: {
    width: 28,
    height: 28,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: 'rgba(255,107,53,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  afterText: {
    flex: 1,
    fontFamily: theme.fonts.subheading,
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },

  /* Source */
  sourceBadge: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(45,212,191,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(45,212,191,0.15)',
    alignItems: 'center',
  },
  sourceText: {
    fontFamily: theme.fonts.mono,
    fontSize: 10,
    color: theme.colors.accentCalm,
    letterSpacing: 0.6,
  },
});
