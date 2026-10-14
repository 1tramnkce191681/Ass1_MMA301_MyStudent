import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ActivityItem from '../Components/ActivityItem';
import { useTheme } from '../Context/ThemeContext';
import { loadActivities, saveActivities } from '../Services/storage';

const initialActivities = [
  { id: '1', title: 'Study', duration: '2 hours', completed: false },
  { id: '2', title: 'Coding', duration: '3 hours', completed: false },
  { id: '3', title: 'Badminton', duration: '1 hour', completed: true },
  { id: '4', title: 'Music', duration: '1 hour', completed: false },
];

const PRESET_DURATIONS = ['30 phút', '1 giờ', '2 giờ', '3 giờ'];

const ActivityScreen = () => {
  const { colors, isDark } = useTheme();

  const [activities, setActivities] = useState(initialActivities);
  const [filter, setFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDuration, setNewDuration] = useState('1 giờ');

  // Load saved activities on mount
  useEffect(() => {
    const hydrate = async () => {
      const saved = await loadActivities();
      if (saved && Array.isArray(saved) && saved.length > 0) {
        setActivities(saved);
      }
    };
    hydrate();
  }, []);

  const persistActivities = async (updated) => {
    setActivities(updated);
    await saveActivities(updated);
  };

  const completedCount = useMemo(
    () => activities.filter((a) => a.completed).length,
    [activities]
  );
  const pendingCount = activities.length - completedCount;
  const percent =
    activities.length > 0
      ? Math.round((completedCount / activities.length) * 100)
      : 0;

  const filteredActivities = useMemo(() => {
    if (filter === 'completed') {
      return activities.filter((item) => item.completed);
    }
    if (filter === 'pending') {
      return activities.filter((item) => !item.completed);
    }
    return activities;
  }, [activities, filter]);

  const toggleActivity = (id) => {
    const updated = activities.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    persistActivities(updated);
  };

  const deleteActivity = (id) => {
    Alert.alert('Xóa hoạt động', 'Bạn có chắc chắn muốn xóa hoạt động này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          const updated = activities.filter((item) => item.id !== id);
          persistActivities(updated);
        },
      },
    ]);
  };

  const handleAddActivity = () => {
    if (!newTitle.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập tên hoạt động.');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      duration: newDuration.trim() || '1 giờ',
      completed: false,
    };

    const updated = [newItem, ...activities];
    persistActivities(updated);
    setNewTitle('');
    setShowAddForm(false);
  };

  const renderItem = ({ item }) => {
    return (
      <ActivityItem
        item={item}
        onToggle={toggleActivity}
        onDelete={deleteActivity}
      />
    );
  };

  const renderEmptyState = () => {
    return (
      <View
        style={[
          styles.emptyContainer,
          {
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <View
          style={[
            styles.emptyIconCircle,
            { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' },
          ]}
        >
          <Ionicons
            name={filter === 'completed' ? 'trophy-outline' : 'sparkles-outline'}
            size={36}
            color={colors.primary}
          />
        </View>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>
          {filter === 'completed'
            ? 'Chưa có hoạt động hoàn thành'
            : filter === 'pending'
            ? 'Tuyệt vời! Không còn việc tồn đọng'
            : 'Chưa có hoạt động nào'}
        </Text>
        <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
          {filter === 'completed'
            ? 'Hãy tích chọn hoàn thành các hoạt động trong danh sách.'
            : 'Nhấn "+ Thêm mới" bên dưới để lập kế hoạch hoạt động sinh viên.'}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Progress & Overview Card */}
        <View
          style={[
            styles.progressCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
              shadowColor: colors.shadowColor,
            },
          ]}
        >
          <View style={styles.progressHeader}>
            <View>
              <Text style={[styles.progressTitle, { color: colors.text }]}>
                Tiến độ hoạt động
              </Text>
              <Text style={[styles.progressSubtitle, { color: colors.textSecondary }]}>
                Đã hoàn thành {completedCount}/{activities.length} nhiệm vụ
              </Text>
            </View>
            <View
              style={[
                styles.percentBadge,
                { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.2)' : '#DCFCE7' },
              ]}
            >
              <Text style={[styles.percentBadgeText, { color: colors.success }]}>
                {percent}%
              </Text>
            </View>
          </View>

          {/* Progress Bar Track */}
          <View
            style={[
              styles.barTrack,
              { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' },
            ]}
          >
            <View
              style={[
                styles.barFill,
                {
                  width: `${percent}%`,
                  backgroundColor: colors.success,
                },
              ]}
            />
          </View>
        </View>

        {/* Filter Pills & Add Button Bar */}
        <View style={styles.actionHeaderRow}>
          <View style={styles.filterGroup}>
            <Pressable
              style={[
                styles.filterTab,
                {
                  backgroundColor:
                    filter === 'all'
                      ? colors.primary
                      : isDark
                      ? '#161F30'
                      : '#FFFFFF',
                  borderColor:
                    filter === 'all' ? colors.primary : colors.cardBorder,
                },
              ]}
              onPress={() => setFilter('all')}
            >
              <Text
                style={[
                  styles.filterTabText,
                  { color: filter === 'all' ? '#FFFFFF' : colors.textSecondary },
                ]}
              >
                Tất cả ({activities.length})
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.filterTab,
                {
                  backgroundColor:
                    filter === 'pending'
                      ? colors.primary
                      : isDark
                      ? '#161F30'
                      : '#FFFFFF',
                  borderColor:
                    filter === 'pending' ? colors.primary : colors.cardBorder,
                },
              ]}
              onPress={() => setFilter('pending')}
            >
              <Text
                style={[
                  styles.filterTabText,
                  {
                    color:
                      filter === 'pending' ? '#FFFFFF' : colors.textSecondary,
                  },
                ]}
              >
                Cần làm ({pendingCount})
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.filterTab,
                {
                  backgroundColor:
                    filter === 'completed'
                      ? colors.primary
                      : isDark
                      ? '#161F30'
                      : '#FFFFFF',
                  borderColor:
                    filter === 'completed' ? colors.primary : colors.cardBorder,
                },
              ]}
              onPress={() => setFilter('completed')}
            >
              <Text
                style={[
                  styles.filterTabText,
                  {
                    color:
                      filter === 'completed' ? '#FFFFFF' : colors.textSecondary,
                  },
                ]}
              >
                Đã xong ({completedCount})
              </Text>
            </Pressable>
          </View>

          {/* Toggle Add Button */}
          <Pressable
            style={[
              styles.addToggleBtn,
              {
                backgroundColor: showAddForm
                  ? colors.cardMuted
                  : colors.primary,
              },
            ]}
            onPress={() => setShowAddForm(!showAddForm)}
          >
            <Ionicons
              name={showAddForm ? 'close' : 'add'}
              size={20}
              color={showAddForm ? colors.text : '#FFFFFF'}
            />
          </Pressable>
        </View>

        {/* Expandable Add Activity Form */}
        {showAddForm && (
          <View
            style={[
              styles.addCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
                shadowColor: colors.shadowColor,
              },
            ]}
          >
            <Text style={[styles.addCardTitle, { color: colors.text }]}>
              Thêm hoạt động mới
            </Text>

            <TextInput
              style={[
                styles.addInput,
                {
                  backgroundColor: isDark ? '#111827' : '#F8FAFC',
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
              placeholder="Tên hoạt động (vd: Coding, Ôn tập MMA301...)"
              placeholderTextColor={colors.textMuted}
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <View style={styles.durationSelector}>
              <Text style={[styles.durationLabel, { color: colors.textSecondary }]}>
                Thời lượng:
              </Text>
              <View style={styles.durationChips}>
                {PRESET_DURATIONS.map((dur) => (
                  <Pressable
                    key={dur}
                    style={[
                      styles.durChip,
                      {
                        backgroundColor:
                          newDuration === dur
                            ? colors.primary
                            : isDark
                            ? '#1E293B'
                            : '#F1F5F9',
                      },
                    ]}
                    onPress={() => setNewDuration(dur)}
                  >
                    <Text
                      style={[
                        styles.durChipText,
                        {
                          color:
                            newDuration === dur ? '#FFFFFF' : colors.textSecondary,
                        },
                      ]}
                    >
                      {dur}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Pressable
              style={[styles.confirmAddBtn, { backgroundColor: colors.primary }]}
              onPress={handleAddActivity}
            >
              <Ionicons name="add-circle-outline" size={18} color="#FFFFFF" />
              <Text style={styles.confirmAddBtnText}>Thêm vào danh sách</Text>
            </Pressable>
          </View>
        )}

        {/* Activity List */}
        <FlatList
          data={filteredActivities}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={[
            styles.listContent,
            filteredActivities.length === 0 && styles.emptyListContent,
          ]}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  progressCard: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    marginBottom: 16,
    elevation: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  progressSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  percentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentBadgeText: {
    fontSize: 14,
    fontWeight: '800',
  },
  barTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  actionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    gap: 8,
  },
  filterGroup: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '700',
  },
  addToggleBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCard: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 16,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  addCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  addInput: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    fontSize: 14,
    marginBottom: 12,
  },
  durationSelector: {
    marginBottom: 14,
  },
  durationLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  durationChips: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  durChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  durChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  confirmAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    borderRadius: 12,
    gap: 6,
  },
  confirmAddBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    borderRadius: 20,
    borderWidth: 1,
    marginVertical: 20,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default ActivityScreen;