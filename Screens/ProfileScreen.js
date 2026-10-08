import { Pressable, StyleSheet, Text, View } from 'react-native';

import ProfileCard from '../Components/ProfileCard';
import { useProfile } from '../Context/ProfileContext';
import { useTheme } from '../Context/ThemeContext';

const ProfileScreen = ({ navigation }) => {
  const { profile } = useProfile();
  const { theme } = useTheme();

  const darkMode = theme === 'dark';

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <ProfileCard
        profile={profile}
        darkMode={darkMode}
      />

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </Pressable>
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
  }
});

export default ProfileScreen;