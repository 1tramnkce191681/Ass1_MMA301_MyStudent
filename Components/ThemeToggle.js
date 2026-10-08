import { Pressable, StyleSheet, Text, View } from 'react-native';

const ThemeToggle = ({ theme, onToggle, darkMode }) => {
  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View>
        <Text style={[styles.title, darkMode && styles.darkText]}>
          Theme
        </Text>

        <Text style={[styles.subtitle, darkMode && styles.darkSecondaryText]}>
          Current: {theme}
        </Text>
      </View>

      <Pressable style={styles.button} onPress={onToggle}>
        <Text style={styles.buttonText}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: '#ffffff',
    borderRadius: 12
  },
  darkContainer: {
    backgroundColor: '#1f1f1f'
  },
  title: {
    fontSize: 18,
    fontWeight: '600'
  },
  subtitle: {
    marginTop: 5,
    fontSize: 14
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#333333'
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600'
  },
  darkText: {
    color: '#ffffff'
  },
  darkSecondaryText: {
    color: '#bbbbbb'
  }
});

export default ThemeToggle;