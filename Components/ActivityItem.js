import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from './Icon';
import { useTheme } from '../Context/ThemeContext';

const getActivityMeta = (title = '') => {
  const lower = title.toLowerCase();
  if (lower.includes('code') || lower.includes('lập trình') || lower.includes('dev')) {
    return {
      icon: 'code-slash',
      bgLight: '#EEF2FF',
      color: '#4F46E5',
      emoji: '💻',
    };
  }
  if (lower.includes('study') || lower.includes('học') || lower.includes('read') || lower.includes('sách')) {
    return {
      icon: 'book',
      bgLight: '#EFF6FF',
      color: '#2563EB',
      emoji: '📚',
    };
  }
  if (
    lower.includes('badminton') ||
    lower.includes('sport') ||
    lower.includes('gym') ||
    lower.includes('chạy') ||
    lower.includes('thể thao')
  ) {
    return {
      icon: 'fitness',
      bgLight: '#FEF2F2',
      color: '#EF4444',
      emoji: '🏸',
    };
  }
  if (lower.includes('music') || lower.includes('nhạc') || lower.includes('sing') || lower.includes('đàn')) {
    return {
      icon: 'musical-notes',
      bgLight: '#FDF4FF',
      color: '#C026D3',
      emoji: '🎵',
    };
  }
  return {
    icon: 'sparkles',
    bgLight: '#F0FDF4',
    color: '#059669',
    emoji: '✨',
  };
};

const ActivityItem = ({ item, onToggle, onDelete }) => {
  const { colors, isDark } = useTheme();
  const meta = getActivityMeta(item.title);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: item.completed ? (isDark ? '#1E3A2F' : '#D1FAE5') : colors.cardBorder,
          shadowColor: colors.shadowColor,
          opacity: pressed ? 0.9 : 1,
        },
        item.completed && {
          backgroundColor: isDark ? 'rgba(6, 78, 59, 0.12)' : '#F0FDF4',
        },
      ]}
      onPress={() => onToggle(item.id)}
    >
      {/* Category Icon Squircle */}
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : meta.bgLight,
          },
        ]}
      >
        <Icon name={meta.icon} size={20} color={meta.color} />
      </View>

      {/* Title & Duration */}
      <View style={styles.info}>
        <Text
          style={[
            styles.title,
            { color: colors.text },
            item.completed && [
              styles.completedTitle,
              { color: colors.textMuted },
            ],
          ]}
          numberOfLines={1}
        >
          {item.title}
        </Text>

        <View style={styles.metaRow}>
          <View
            style={[
              styles.durationChip,
              {
                backgroundColor: isDark ? '#1E293B' : '#F1F5F9',
              },
            ]}
          >
            <Icon name="time-outline" size={12} color={colors.textSecondary} />
            <Text style={[styles.durationText, { color: colors.textSecondary }]}>
              {item.duration || '30 mins'}
            </Text>
          </View>

          {item.completed && (
            <View
              style={[
                styles.completedTag,
                { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.2)' : '#DCFCE7' },
              ]}
            >
              <Text style={[styles.completedTagText, { color: colors.success }]}>
                Hoàn thành
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Action / Checkbox button */}
      <View style={styles.actions}>
        <View
          style={[
            styles.checkbox,
            item.completed
              ? { backgroundColor: colors.success, borderColor: colors.success }
              : { borderColor: colors.border, backgroundColor: 'transparent' },
          ]}
        >
          {item.completed && (
            <Icon name="checkmark" size={16} color="#FFFFFF" />
          )}
        </View>

        {onDelete && (
          <Pressable
            hitSlop={8}
            onPress={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            style={styles.deleteBtn}
          >
            <Icon name="trash-outline" size={16} color={colors.danger} />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1.5,
    elevation: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  durationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
  },
  completedTag: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  completedTagText: {
    fontSize: 10,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    padding: 4,
  },
});

export default ActivityItem;