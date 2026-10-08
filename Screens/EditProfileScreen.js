import { useEffect, useState } from 'react';
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import { useProfile } from '../Context/ProfileContext';
import { useTheme } from '../Context/ThemeContext';

const EditProfileScreen = ({ navigation }) => {
  const { profile, updateProfile } = useProfile();
  const { theme } = useTheme();

  const darkMode = theme === 'dark';

  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [bio, setBio] = useState(profile.bio);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setName(profile.name);
    setAvatar(profile.avatar);
    setBio(profile.bio);
  }, [profile]);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (name.trim().length < 2) {
      newErrors.name = 'Name must contain at least 2 characters.';
    }

    if (!bio.trim()) {
      newErrors.bio = 'Bio is required.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const updatedProfile = {
      ...profile,
      name: name.trim(),
      avatar: avatar.trim() || '👩‍💻',
      bio: bio.trim()
    };

    const saved = await updateProfile(updatedProfile);

    if (saved) {
      Alert.alert('Success', 'Profile saved successfully.');
      navigation.goBack();
    } else {
      Alert.alert(
        'Save failed',
        'The profile could not be saved. Please try again.'
      );
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.label, darkMode && styles.darkText]}>
        Name
      </Text>

      <TextInput
        style={[styles.input, darkMode && styles.darkInput]}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor={darkMode ? '#aaaaaa' : '#777777'}
      />

      {errors.name && (
        <Text style={styles.error}>{errors.name}</Text>
      )}

      <Text style={[styles.label, darkMode && styles.darkText]}>
        Avatar
      </Text>

      <TextInput
        style={[styles.input, darkMode && styles.darkInput]}
        value={avatar}
        onChangeText={setAvatar}
        placeholder="Example: 👩‍💻"
        placeholderTextColor={darkMode ? '#aaaaaa' : '#777777'}
      />

      <Text style={[styles.label, darkMode && styles.darkText]}>
        Bio
      </Text>

      <TextInput
        style={[
          styles.input,
          styles.bioInput,
          darkMode && styles.darkInput
        ]}
        value={bio}
        onChangeText={setBio}
        placeholder="Enter your bio"
        placeholderTextColor={darkMode ? '#aaaaaa' : '#777777'}
        multiline
      />

      {errors.bio && (
        <Text style={styles.error}>{errors.bio}</Text>
      )}

      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 14,
    fontSize: 16
  },
  darkInput: {
    backgroundColor: '#1f1f1f',
    borderColor: '#555555',
    color: '#ffffff'
  },
  bioInput: {
    minHeight: 100,
    textAlignVertical: 'top'
  },
  error: {
    color: '#d32f2f',
    marginTop: 5
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 25
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: '#777777'
  },
  saveButton: {
    backgroundColor: '#333333'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  },
  darkText: {
    color: '#ffffff'
  }
});

export default EditProfileScreen;