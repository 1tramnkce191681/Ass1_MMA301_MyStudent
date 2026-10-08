import { useMemo, useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

import ActivityItem from '../Components/ActivityItem';
import { useTheme } from '../Context/ThemeContext';

const initialActivities = [
  {
    id: '1',
    title: 'Study',
    duration: '2 hours',
    completed: false
  },
  {
    id: '2',
    title: 'Coding',
    duration: '3 hours',
    completed: false
  },
  {
    id: '3',
    title: 'Badminton',
    duration: '1 hour',
    completed: true
  },
  {
    id: '4',
    title: 'Music',
    duration: '1 hour',
    completed: false
  }
];

const ActivityScreen = () => {
  const { theme } = useTheme();

  const darkMode = theme === 'dark';

  const [activities, setActivities] = useState(initialActivities);
  const [filter, setFilter] = useState('all');

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
    setActivities((currentActivities) =>
      currentActivities.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const renderItem = ({ item }) => {
    return (
      <ActivityItem
        item={item}
        onToggle={toggleActivity}
        darkMode={darkMode}
      />
    );
  };

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, darkMode && styles.darkText]}>
          No activities found.
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>
        My Activities
      </Text>

      <View style={styles.filterRow}>
        <Pressable
          style={[
            styles.filterButton,
            filter === 'all' && styles.activeFilter
          ]}
          onPress={() => setFilter('all')}
        >
          <Text style={styles.filterText}>All</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            filter === 'completed' && styles.activeFilter
          ]}
          onPress={() => setFilter('completed')}
        >
          <Text style={styles.filterText}>Completed</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            filter === 'pending' && styles.activeFilter
          ]}
          onPress={() => setFilter('pending')}
        >
          <Text style={styles.filterText}>Pending</Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredActivities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={
          filteredActivities.length === 0
            ? styles.emptyList
            : undefined
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  darkContainer: {
    backgroundColor: '#121212'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 15
  },
  filterButton: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#777777'
  },
  activeFilter: {
    backgroundColor: '#333333'
  },
  filterText: {
    color: '#ffffff',
    fontWeight: '600'
  },
  emptyList: {
    flexGrow: 1
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 17
  },
  darkText: {
    color: '#ffffff'
  }
});

export default ActivityScreen;