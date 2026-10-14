import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { ProfileProvider, useProfile } from './Context/ProfileContext';
import { ThemeProvider, useTheme } from './Context/ThemeContext';
import AppNavigator from './Navigation/AppNavigator';

const AppContent = () => {
  const { isLoading: profileLoading } = useProfile();
  const { isLoading: themeLoading, colors } = useTheme();

  if (profileLoading || themeLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors?.background || '#F8FAFC' }]}>
        <View style={styles.spinnerWrapper}>
          <ActivityIndicator size="large" color={colors?.primary || '#4F46E5'} />
        </View>
        <Text style={[styles.loadingText, { color: colors?.text || '#0F172A' }]}>
          Đang khởi tạo MyStudent...
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
    alignItems: 'center',
    padding: 20
  },
  spinnerWrapper: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    marginBottom: 16
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600'
  }
});