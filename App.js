import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { ProfileProvider, useProfile } from './Context/ProfileContext';
import { ThemeProvider, useTheme } from './Context/ThemeContext';
import AppNavigator from './Navigation/AppNavigator';
const AppContent = () => {
  const { isLoading: profileLoading } = useProfile();
  const { isLoading: themeLoading } = useTheme();

  if (profileLoading || themeLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading...
        </Text>
      </View>
    );
  }

  return <AppNavigator />;
};

export default function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <AppContent />
      </ProfileProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16
  }
});