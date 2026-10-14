import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ThemeToggle from '../Components/ThemeToggle';
import { useProfile } from '../Context/ProfileContext';
import { useTheme } from '../Context/ThemeContext';
import { resetAllData } from '../Services/storage';

const SettingsScreen = () => {
  const { colors, isDark } = useTheme();
  const { resetProfile } = useProfile();

  const handleResetData = () => {
    Alert.alert(
      'Khôi phục dữ liệu gốc',
      'Bạn có muốn đặt lại hồ sơ và dữ liệu hoạt động về trạng thái ban đầu?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đặt lại',
          style: 'destructive',
          onPress: async () => {
            await resetAllData();
            await resetProfile();
            Alert.alert('Hoàn tất 🎉', 'Dữ liệu ứng dụng đã được thiết lập lại về mặc định.');
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Section 1: Appearance */}
      <View style={styles.sectionHeader}>
        <Ionicons name="color-palette-outline" size={18} color={colors.primary} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          GIAO DIỆN & HIỂN THỊ
        </Text>
      </View>

      <View style={styles.sectionBody}>
        <ThemeToggle />
      </View>

      {/* Section 2: App & Course Info */}
      <View style={styles.sectionHeader}>
        <Ionicons name="information-circle-outline" size={18} color={colors.primary} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          THÔNG TIN ỨNG DỤNG
        </Text>
      </View>

      <View
        style={[
          styles.infoCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
            shadowColor: colors.shadowColor,
          },
        ]}
      >
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
            Tên ứng dụng
          </Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>
            MyStudent App
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
            Môn học
          </Text>
          <Text style={[styles.infoValue, { color: colors.primary }]}>
            MMA301 (Mobile Dev)
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
            Trường học
          </Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>
            FPT University
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
            Phiên bản
          </Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>
            1.0.0 (Expo SDK 57)
          </Text>
        </View>
      </View>

      {/* Section 3: Data Management */}
      <View style={styles.sectionHeader}>
        <Ionicons name="shield-checkmark-outline" size={18} color={colors.primary} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          QUẢN LÝ DỮ LIỆU
        </Text>
      </View>

      <View
        style={[
          styles.infoCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
            shadowColor: colors.shadowColor,
          },
        ]}
      >
        <View style={styles.storageNote}>
          <Ionicons name="cloud-done-outline" size={18} color={colors.success} />
          <Text style={[styles.storageNoteText, { color: colors.textSecondary }]}>
            Dữ liệu cá nhân & cài đặt giao diện được lưu trữ cục bộ an toàn qua AsyncStorage.
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.resetButton,
            {
              backgroundColor: isDark ? 'rgba(239, 68, 68, 0.12)' : '#FEF2F2',
              borderColor: isDark ? '#7F1D1D' : '#FEE2E2',
              opacity: pressed ? 0.85 : 1,
            },
          ]}
          onPress={handleResetData}
        >
          <Ionicons name="refresh-outline" size={18} color={colors.danger} />
          <Text style={[styles.resetButtonText, { color: colors.danger }]}>
            Khôi phục dữ liệu mặc định
          </Text>
        </Pressable>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textMuted }]}>
          Phát triển với ❤️ cho môn học MMA301
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  sectionBody: {
    marginBottom: 20,
  },
  infoCard: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    marginBottom: 20,
    elevation: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    width: '100%',
  },
  storageNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 16,
  },
  storageNoteText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
  },
});

export default SettingsScreen;