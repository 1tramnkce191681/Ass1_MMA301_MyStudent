import { StyleSheet, Text, View } from 'react-native';
import Icon from './Icon';
import { useTheme } from '../Context/ThemeContext';

const ProfileCard = ({ profile }) => {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
          shadowColor: colors.shadowColor,
        },
      ]}
    >
      {/* Decorative Top Accent Bar */}
      <View
        style={[
          styles.accentBar,
          { backgroundColor: isDark ? 'rgba(99, 102, 241, 0.4)' : '#6366F1' },
        ]}
      />

      {/* Avatar Container with Ring */}
      <View style={styles.avatarWrapper}>
        <View
          style={[
            styles.avatarCircle,
            {
              backgroundColor: isDark ? '#1E293B' : '#EEF2FF',
              borderColor: colors.primary,
            },
          ]}
        >
          <Text style={styles.avatar}>{profile.avatar || '👩‍💻'}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: colors.card }]}>
          <View style={styles.statusDot} />
          <Text style={[styles.statusText, { color: colors.success }]}>Active</Text>
        </View>
      </View>

      {/* Name & Title */}
      <Text style={[styles.name, { color: colors.text }]}>{profile.name}</Text>

      {/* Badges Row */}
      <View style={styles.badgeRow}>
        <View
          style={[
            styles.badge,
            { backgroundColor: isDark ? 'rgba(99, 102, 241, 0.15)' : '#EEF2FF' },
          ]}
        >
          <Icon name="school" size={14} color={colors.primary} />
          <Text style={[styles.badgeText, { color: colors.primary }]}>
            {profile.university || 'FPT University'}
          </Text>
        </View>

        <View
          style={[
            styles.badge,
            { backgroundColor: isDark ? 'rgba(6, 182, 212, 0.15)' : '#ECFEFF' },
          ]}
        >
          <Icon name="code-slash" size={14} color={colors.secondary} />
          <Text style={[styles.badgeText, { color: colors.secondary }]}>
            {profile.major || 'Software Engineering'}
          </Text>
        </View>
      </View>

      {/* Bio Box */}
      <View
        style={[
          styles.bioContainer,
          {
            backgroundColor: isDark ? '#111827' : '#F8FAFC',
            borderColor: colors.border,
            borderLeftColor: colors.primary,
          },
        ]}
      >
        <Icon
          name="chatbubble-ellipses-outline"
          size={16}
          color={colors.textSecondary}
          style={styles.bioIcon}
        />
        <Text style={[styles.bio, { color: colors.textSecondary }]}>
          "{profile.bio || 'Chưa có thông tin giới thiệu.'}"
        </Text>
      </View>

      {/* Quick Meta Grid */}
      <View style={[styles.metaGrid, { borderColor: colors.border }]}>
        <View style={styles.metaItem}>
          <Text style={[styles.metaLabel, { color: colors.textMuted }]}>MÔN HỌC</Text>
          <Text style={[styles.metaValue, { color: colors.text }]}>MMA301</Text>
        </View>

        <View style={[styles.metaDivider, { backgroundColor: colors.border }]} />

        <View style={styles.metaItem}>
          <Text style={[styles.metaLabel, { color: colors.textMuted }]}>VAI TRÒ</Text>
          <Text style={[styles.metaValue, { color: colors.text }]}>Sinh viên</Text>
        </View>

        <View style={[styles.metaDivider, { backgroundColor: colors.border }]} />

        <View style={styles.metaItem}>
          <Text style={[styles.metaLabel, { color: colors.textMuted }]}>TRẠNG THÁI</Text>
          <Text style={[styles.metaValue, { color: colors.success }]}>Online</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    elevation: 6,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 8,
  },
  avatarWrapper: {
    position: 'relative',
    marginTop: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    elevation: 3,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatar: {
    fontSize: 52,
  },
  statusBadge: {
    position: 'absolute',
    bottom: -6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 18,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bioContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderLeftWidth: 4,
    marginBottom: 20,
  },
  bioIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  bio: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  metaGrid: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaItem: {
    flex: 1,
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  metaDivider: {
    width: 1,
    height: 28,
  },
});

export default ProfileCard;