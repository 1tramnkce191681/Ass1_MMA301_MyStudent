import { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useProfile } from '../Context/ProfileContext';
import { useTheme } from '../Context/ThemeContext';
import { loadActivities } from '../Services/storage';

const defaultActivities = [
  { id: '1', title: 'Study', duration: '2 hours', completed: false },
  { id: '2', title: 'Coding', duration: '3 hours', completed: false },
  { id: '3', title: 'Badminton', duration: '1 hour', completed: true },
  { id: '4', title: 'Music', duration: '1 hour', completed: false },
];

const HomeScreen = ({ navigation }) => {
  const { profile } = useProfile();
  const { colors, isDark } = useTheme();
  const [stats, setStats] = useState({ total: 4, completed: 1 });

  useFocusEffect(
    useCallback(() => {
      const fetchStats = async () => {
        const saved = await loadActivities();
        const list = saved && saved.length > 0 ? saved : defaultActivities;
        const completedCount = list.filter((a) => a.completed).length;
        setStats({
          total: list.length,
          completed: completedCount,
        });
      };
      fetchStats();
    }, [])
  );

  const percent = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Header Greeting */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.universityTag,
              { backgroundColor: isDark ? 'rgba(99, 102, 241, 0.15)' : '#EEF2FF' },
            ]}
          >
            <Ionicons name="school" size={13} color={colors.primary} />
            <Text style={[styles.universityTagText, { color: colors.primary }]}>
              {profile.university || 'FPT University'}
            </Text>
          </View>
          <Text style={[styles.greeting, { color: colors.text }]}>
            Xin chào, {profile.name ? profile.name.split(' ').slice(-1)[0] : 'Bạn'}! 👋
          </Text>
          <Text style={[styles.subGreeting, { color: colors.textSecondary }]}>
            Chào mừng bạn đến với MyStudent Hub
          </Text>
        </View>

        {/* Mini Avatar Button */}
        <Pressable
          style={[
            styles.avatarBtn,
            {
              backgroundColor: isDark ? '#1E293B' : '#EEF2FF',
              borderColor: colors.primary,
            },
          ]}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.avatarEmoji}>{profile.avatar || '👩‍💻'}</Text>
        </Pressable>
      </View>

      {/* Hero Overview Card */}
      <View
        style={[
          styles.heroCard,
          {
            backgroundColor: isDark ? '#1E293B' : '#4F46E5',
            borderColor: isDark ? '#334155' : '#4338CA',
          },
        ]}
      >
        <View style={styles.heroTop}>
          <View style={styles.heroBadge}>
            <Ionicons name="sparkles" size={14} color="#FBBF24" />
            <Text style={styles.heroBadgeText}>TIẾN ĐỘ HÔM NAY</Text>
          </View>
          <Text style={styles.heroPercentText}>{percent}%</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
        </View>

        {/* Stats Row */}
        <View style={styles.heroStatsRow}>
          <View style={styles.heroStatItem}>
            <Text style={styles.heroStatValue}>{stats.total}</Text>
            <Text style={styles.heroStatLabel}>Hoạt động</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStatItem}>
            <Text style={styles.heroStatValue}>{stats.completed}</Text>
            <Text style={styles.heroStatLabel}>Hoàn thành</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStatItem}>
            <Text style={styles.heroStatValue}>{stats.total - stats.completed}</Text>
            <Text style={styles.heroStatLabel}>Đang làm</Text>
          </View>
        </View>
      </View>

      {/* Quick Navigation Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Tính năng ứng dụng
        </Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textMuted }]}>
          Truy cập nhanh
        </Text>
      </View>

      {/* Navigation Feature Cards */}
      <View style={styles.cardsList}>
        {/* Card 1: Profile */}
        <Pressable
          style={({ pressed }) => [
            styles.navCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
              shadowColor: colors.shadowColor,
              opacity: pressed ? 0.92 : 1,
            },
          ]}
          onPress={() => navigation.navigate('Profile')}
        >
          <View
            style={[
              styles.navCardIconBox,
              { backgroundColor: isDark ? 'rgba(99, 102, 241, 0.15)' : '#EEF2FF' },
            ]}
          >
            <Ionicons name="person" size={24} color={colors.primary} />
          </View>
          <View style={styles.navCardContent}>
            <View style={styles.navCardTitleRow}>
              <Text style={[styles.navCardTitle, { color: colors.text }]}>
                Hồ sơ cá nhân
              </Text>
              <View
                style={[
                  styles.cardPill,
                  { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' },
                ]}
              >
                <Text style={[styles.cardPillText, { color: colors.primary }]}>
                  {profile.major ? profile.major.split(' ')[0] : 'SE'}
                </Text>
              </View>
            </View>
            <Text style={[styles.navCardDesc, { color: colors.textSecondary }]}>
              Xem thông tin thẻ sinh viên, ngành học & tiểu sử
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </Pressable>

        {/* Card 2: Activity */}
        <Pressable
          style={({ pressed }) => [
            styles.navCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
              shadowColor: colors.shadowColor,
              opacity: pressed ? 0.92 : 1,
            },
          ]}
          onPress={() => navigation.navigate('Activity')}
        >
          <View
            style={[
              styles.navCardIconBox,
              { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5' },
            ]}
          >
            <Ionicons name="checkbox" size={24} color={colors.success} />
          </View>
          <View style={styles.navCardContent}>
            <View style={styles.navCardTitleRow}>
              <Text style={[styles.navCardTitle, { color: colors.text }]}>
                Hoạt động & Nhiệm vụ
              </Text>
              <View
                style={[
                  styles.cardPill,
                  { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.2)' : '#DCFCE7' },
                ]}
              >
                <Text style={[styles.cardPillText, { color: colors.success }]}>
                  {stats.completed}/{stats.total} Đã xong
                </Text>
              </View>
            </View>
            <Text style={[styles.navCardDesc, { color: colors.textSecondary }]}>
              Theo dõi việc cần làm, thêm mới và quản lý tiến độ
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </Pressable>

        {/* Card 3: Settings */}
        <Pressable
          style={({ pressed }) => [
            styles.navCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
              shadowColor: colors.shadowColor,
              opacity: pressed ? 0.92 : 1,
            },
          ]}
          onPress={() => navigation.navigate('Settings')}
        >
          <View
            style={[
              styles.navCardIconBox,
              { backgroundColor: isDark ? 'rgba(245, 158, 11, 0.15)' : '#FFFBEB' },
            ]}
          >
            <Ionicons name="settings-sharp" size={24} color={colors.warning} />
          </View>
          <View style={styles.navCardContent}>
            <View style={styles.navCardTitleRow}>
              <Text style={[styles.navCardTitle, { color: colors.text }]}>
                Cài đặt hệ thống
              </Text>
              <View
                style={[
                  styles.cardPill,
                  { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' },
                ]}
              >
                <Text style={[styles.cardPillText, { color: colors.warning }]}>
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </Text>
              </View>
            </View>
            <Text style={[styles.navCardDesc, { color: colors.textSecondary }]}>
              Tùy chỉnh giao diện Sáng/Tối & thông tin ứng dụng
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </Pressable>
      </View>

      {/* Motivational Banner */}
      <View
        style={[
          styles.tipCard,
          {
            backgroundColor: isDark ? '#161F30' : '#F8FAFC',
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.tipIconWrapper}>
          <Ionicons name="bulb-outline" size={22} color={colors.warning} />
        </View>
        <View style={styles.tipContent}>
          <Text style={[styles.tipTitle, { color: colors.text }]}>
            Góc sinh viên FPT
          </Text>
          <Text style={[styles.tipText, { color: colors.textSecondary }]}>
            "Học tập đều đặn mỗi ngày là chìa khóa để trở thành một Software Engineer xuất sắc! 🚀"
          </Text>
        </View>
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
    paddingBottom: 36,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
    marginRight: 12,
  },
  universityTag: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 8,
  },
  universityTagText: {
    fontSize: 12,
    fontWeight: '700',
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  subGreeting: {
    fontSize: 13,
    marginTop: 2,
  },
  avatarBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  avatarEmoji: {
    fontSize: 26,
  },
  heroCard: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 24,
    elevation: 6,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    borderWidth: 1,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  heroBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroPercentText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 4,
    marginBottom: 18,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#34D399',
    borderRadius: 4,
  },
  heroStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
  },
  heroStatItem: {
    alignItems: 'center',
  },
  heroStatValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  heroStatLabel: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  heroStatDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionHeader: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  cardsList: {
    gap: 12,
    marginBottom: 20,
  },
  navCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    elevation: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  navCardIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  navCardContent: {
    flex: 1,
    marginRight: 8,
  },
  navCardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  navCardTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  cardPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  cardPillText: {
    fontSize: 10,
    fontWeight: '700',
  },
  navCardDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  tipCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    gap: 12,
  },
  tipIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  tipText: {
    fontSize: 12,
    lineHeight: 18,
    fontStyle: 'italic',
  },
});

export default HomeScreen;