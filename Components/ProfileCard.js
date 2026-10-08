import { StyleSheet, Text, View } from 'react-native';

const ProfileCard = ({ profile, darkMode }) => {
  return (
    <View style={[styles.card, darkMode && styles.darkCard]}>
      <Text style={styles.avatar}>{profile.avatar}</Text>

      <Text style={[styles.name, darkMode && styles.darkText]}>
        {profile.name}
      </Text>

      <Text style={[styles.major, darkMode && styles.darkText]}>
        {profile.major}
      </Text>

      <Text style={[styles.university, darkMode && styles.darkText]}>
        {profile.university}
      </Text>

      <Text style={[styles.bio, darkMode && styles.darkSecondaryText]}>
        {profile.bio}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3
  },
  darkCard: {
    backgroundColor: '#1f1f1f'
  },
  avatar: {
    fontSize: 60,
    marginBottom: 10
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6
  },
  major: {
    fontSize: 16,
    marginBottom: 4
  },
  university: {
    fontSize: 15,
    marginBottom: 12
  },
  bio: {
    fontSize: 14,
    textAlign: 'center'
  },
  darkText: {
    color: '#ffffff'
  },
  darkSecondaryText: {
    color: '#cccccc'
  }
});

export default ProfileCard;