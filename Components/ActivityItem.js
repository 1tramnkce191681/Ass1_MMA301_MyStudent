import { Pressable, StyleSheet, Text, View } from 'react-native';

const ActivityItem = ({ item, onToggle, darkMode }) => {
  return (
    <Pressable
      style={[
        styles.container,
        darkMode && styles.darkContainer,
        item.completed && styles.completedContainer
      ]}
      onPress={() => onToggle(item.id)}
    >
      <View style={styles.info}>
        <Text style={[styles.title, darkMode && styles.darkText]}>
          {item.title}
        </Text>

        <Text style={[styles.duration, darkMode && styles.darkSecondaryText]}>
          {item.duration}
        </Text>
      </View>

      <Text style={styles.status}>
        {item.completed ? '✓' : '○'}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2
  },
  darkContainer: {
    backgroundColor: '#1f1f1f'
  },
  completedContainer: {
    opacity: 0.7
  },
  info: {
    flex: 1
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4
  },
  duration: {
    fontSize: 14
  },
  status: {
    fontSize: 28,
    marginLeft: 10
  },
  darkText: {
    color: '#ffffff'
  },
  darkSecondaryText: {
    color: '#bbbbbb'
  }
});

export default ActivityItem;