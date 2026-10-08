import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../Context/ThemeContext';

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();

  const darkMode = theme === 'dark';

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>
        Welcome to MyStudent
      </Text>

      <Text style={[styles.subtitle, darkMode && styles.darkSecondaryText]}>
        Personal Profile & Activity App
      </Text>

      <View style={styles.buttonGroup}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>View Profile</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Activity')}
        >
          <Text style={styles.buttonText}>View Activity</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  darkContainer: {
    backgroundColor: '#121212'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30
  },
  buttonGroup: {
    width: '100%',
    gap: 12
  },
  button: {
    backgroundColor: '#333333',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  },
  darkText: {
    color: '#ffffff'
  },
  darkSecondaryText: {
    color: '#cccccc'
  }
});

export default HomeScreen;