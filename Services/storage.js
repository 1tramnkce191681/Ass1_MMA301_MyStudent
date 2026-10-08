import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = '@mystudent_profile';
const THEME_KEY = '@mystudent_theme';

export const saveProfile = async (profile) => {
  try {
    const jsonValue = JSON.stringify(profile);
    await AsyncStorage.setItem(PROFILE_KEY, jsonValue);
    return true;
  } catch (error) {
    console.log('Error saving profile:', error);
    return false;
  }
};

export const loadProfile = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(PROFILE_KEY);

    if (jsonValue === null) {
      return null;
    }

    try {
      return JSON.parse(jsonValue);
    } catch (parseError) {
      console.log('Invalid profile JSON:', parseError);
      return null;
    }
  } catch (error) {
    console.log('Error loading profile:', error);
    return null;
  }
};

export const saveTheme = async (theme) => {
  try {
    await AsyncStorage.setItem(THEME_KEY, theme);
    return true;
  } catch (error) {
    console.log('Error saving theme:', error);
    return false;
  }
};

export const loadTheme = async () => {
  try {
    const theme = await AsyncStorage.getItem(THEME_KEY);

    if (theme === 'light' || theme === 'dark') {
      return theme;
    }

    return null;
  } catch (error) {
    console.log('Error loading theme:', error);
    return null;
  }
};