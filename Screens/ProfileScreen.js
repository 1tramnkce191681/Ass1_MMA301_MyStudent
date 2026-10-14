import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProfileCard from '../Components/ProfileCard';
import { useProfile } from '../Context/ProfileContext';
import { useTheme } from '../Context/ThemeContext';

const skills = ['React Native', 'JavaScript', 'Mobile UI/UX', 'AsyncStorage', 'Git'];

const ProfileScreen = ({ navigation }) => {
  const { profile } = useProfile();
  const { colors, isDark } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Main Profile Card */}
      <ProfileCard profile={profile} />

      {/* Skills & Badges Card */}
      <View
        style={[
          styles.skillsCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
            shadowColor: colors.shadowColor,
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <Ionicons name="ribbon-outline" size={18} color={colors.primary} />
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Kỹ năng & Môn học liên quan
          </Text>
        </View>

        <View style={styles.tagsContainer}>
          {skills.map((skill, index) => (
            <View
              key={index}
              style={[
                styles.skillChip,
                {
                  backgroundColor: isDark ? 'rgba(99, 102, 241, 0.15)' : '#EEF2FF',
                  borderColor: isDark ? '#312E81' : '#E0E7FF',
                },
              ]}
            >
              <Text style={[styles.skillText, { color: colors.primary }]}>
                #{skill}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsGroup}>
        {/* Primary: Edit Profile */}
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            {
              backgroundColor: colors.primary,
              shadowColor: colors.primary,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Ionicons name="create-outline" size={20} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Chỉnh sửa hồ sơ</Text>
        </Pressable>

        {/* Secondary: Go to Activities */}
        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
          onPress={() => navigation.navigate('Activity')}
        >
          <Ionicons name="list-outline" size={20} color={colors.text} />
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
            Xem danh sách hoạt động
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  skillsCard: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    marginBottom: 20,
    elevation: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  skillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  actionsGroup: {
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 8,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 8,
    borderWidth: 1.5,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
});

export default ProfileScreen;