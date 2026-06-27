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
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface SafetyScreenProps {
  onClose: () => void;
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const PRINCIPLE_CARDS = [
  {
    step: '01',
    title: 'MERUNDUK',
    subtitle: 'Drop',
    icon: '🦵',
    color: '#FF6B35',
    content:
      'Segera jatuhkan badan ke lantai, bertumpu pada tangan dan lutut. Posisi ini mencegah Anda kehilangan keseimbangan akibat guncangan keras dan tetap memungkinkan Anda merayap ke tempat aman.',
  },
  {
    step: '02',
    title: 'LINDUNGI',
    subtitle: 'Cover',
    icon: '🛡️',
    color: '#2DD4BF',
    content:
      'Berlindung di bawah meja yang kokoh. Jika tidak ada meja, merapat ke dinding bagian dalam bangunan dan lindungi kepala serta leher dengan kedua lengan, tas, atau bantal.',
  },
  {
    step: '03',
    title: 'BERTAHAN',
    subtitle: 'Hold On',
    icon: '✊',
    color: '#FBBF24',
    content:
      'Pegang erat kaki meja atau pelindung sampai guncangan benar-benar berhenti. Bersiaplah untuk ikut bergerak jika benda pelindung bergeser akibat gempa.',
  },
];

const LOCATION_SECTIONS = [
  {
    id: 'indoor',
    icon: '🏠',
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
    icon: '🌳',
    title: 'Di Luar Ruangan',
    accent: '#34D399',
    tips: [
      { label: 'Cari area terbuka', desc: 'Segera menjauh dari gedung, tiang listrik, pohon besar, dan papan reklame. Area paling mematikan sering tepat di luar pintu masuk gedung.' },
      { label: 'Perhatikan pijakan', desc: 'Waspadai tanah yang merekah atau lubang pembuangan yang amblas.' },
    ],
  },
  {
    id: 'driving',
    icon: '🚗',
    title: 'Saat Mengemudi',
    accent: '#FBBF24',
    tips: [
      { label: 'Menepi dengan aman', desc: 'Hindari berhenti di bawah jalan layang (overpass), jembatan, kabel listrik, terowongan, atau pohon besar.' },
      { label: 'Tetap di dalam kendaraan', desc: 'Pasang rem tangan, nyalakan lampu hazard, dan tunggu hingga guncangan berhenti. Rangka mobil memberikan perlindungan dari material yang berjatuhan.' },
    ],
  },
  {
    id: 'beach',
    icon: '🏔️',
    title: 'Di Pantai / Pegunungan',
    accent: '#60A5FA',
    tips: [
      { label: 'Di Pantai — Evakuasi segera', desc: 'Begitu guncangan berhenti, langsung lari ke dataran tinggi. Jangan menunggu sirene tsunami berbunyi atau melihat air laut surut.' },
      { label: 'Di Pegunungan — Hindari tebing', desc: 'Jauhi area tebing, lereng curam, atau perbukitan yang rawan longsor akibat guncangan.' },
    ],
  },
];

const AFTER_TIPS = [
  { icon: '🚶', text: 'Evakuasi keluar bangunan dengan tenang, terus lindungi kepala.' },
  { icon: '⚠️', text: 'Waspadai gempa susulan (aftershock) yang bisa terjadi kapan saja.' },
  { icon: '🔥', text: 'Periksa titik api dan kebocoran gas. Matikan sakelar listrik utama jika aman.' },
  { icon: '📵', text: 'Hindari menyebarkan informasi yang belum diverifikasi BMKG atau BPBD.' },
];

// ─── ACCORDION CARD ───────────────────────────────────────────────────────────
const LocationCard: React.FC<{
  section: typeof LOCATION_SECTIONS[0];
  isOpen: boolean;
  onToggle: () => void;
}> = ({ section, isOpen, onToggle }) => (
  <View style={[styles.accordionCard, { borderLeftColor: section.accent }]}>
    <TouchableOpacity
      style={styles.accordionHeader}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <Text style={styles.accordionIcon}>{section.icon}</Text>
      <Text style={styles.accordionTitle}>{section.title}</Text>
      {isOpen
        ? <ChevronUp color={section.accent} size={18} />
        : <ChevronDown color={theme.colors.textSecondary} size={18} />}
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
          <ArrowLeft color={theme.colors.textPrimary} size={20} />
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
          {PRINCIPLE_CARDS.map(card => (
            <View key={card.step} style={[styles.principleCard, { borderTopColor: card.color }]}>
              <Text style={styles.principleEmoji}>{card.icon}</Text>
              <Text style={[styles.principleStep, { color: card.color }]}>{card.step}</Text>
              <Text style={styles.principleTitle}>{card.title}</Text>
              <Text style={[styles.principleSub, { color: card.color }]}>{card.subtitle}</Text>
              <Text style={styles.principleDesc}>{card.content}</Text>
            </View>
          ))}
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
              <Text style={styles.afterEmoji}>{tip.icon}</Text>
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
  principleEmoji: { fontSize: 28, marginBottom: theme.spacing.xs },
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
  accordionIcon: { fontSize: 20 },
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
  afterEmoji: { fontSize: 20, width: 28, textAlign: 'center' },
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
