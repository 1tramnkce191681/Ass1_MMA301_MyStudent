import { StyleSheet, Text, View } from 'react-native';

import ThemeToggle from '../Components/ThemeToggle';
import { useTheme } from '../Context/ThemeContext';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();

  const darkMode = theme === 'dark';

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>
        Settings
      </Text>

      <ThemeToggle
        theme={theme}
        onToggle={toggleTheme}
        darkMode={darkMode}
      />

      <Text style={[styles.info, darkMode && styles.darkSecondaryText]}>
        Theme preference is saved locally and restored when the app starts.
      </Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20
  },
  info: {
    marginTop: 20,
    fontSize: 14,
    lineHeight: 20
  },
  darkText: {
    color: '#ffffff'
  },
  darkSecondaryText: {
    color: '#bbbbbb'
  }
});

export default SettingsScreen;