import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from './Icon';
import { useTheme } from '../Context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, setThemeExplicit, colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
          shadowColor: colors.shadowColor,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: isDark ? 'rgba(99, 102, 241, 0.2)' : '#EEF2FF' },
            ]}
          >
            <Icon
              name={isDark ? 'moon' : 'sunny'}
              size={20}
              color={colors.primary}
            />
          </View>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>
              Giao diện hiển thị
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Hiện tại: {isDark ? 'Chế độ Tối (Dark)' : 'Chế độ Sáng (Light)'}
            </Text>
          </View>
        </View>
      </View>

      {/* 2-Option Card Selector */}
      <View style={styles.optionsRow}>
        {/* Light Option */}
        <Pressable
          style={[
            styles.optionCard,
            {
              backgroundColor: isDark ? '#111827' : '#F8FAFC',
              borderColor: !isDark ? colors.primary : colors.border,
            },
            !isDark && styles.activeCard,
          ]}
          onPress={() => setThemeExplicit('light')}
        >
          <View style={[styles.optionIconCircle, { backgroundColor: '#FEF3C7' }]}>
            <Icon name="sunny" size={20} color="#D97706" />
          </View>
          <Text
            style={[
              styles.optionLabel,
              { color: !isDark ? colors.primary : colors.text },
            ]}
          >
            Sáng
          </Text>
          {!isDark && (
            <View style={[styles.activeDot, { backgroundColor: colors.primary }]}>
              <Icon name="checkmark" size={10} color="#FFFFFF" />
            </View>
          )}
        </Pressable>

        {/* Dark Option */}
        <Pressable
          style={[
            styles.optionCard,
            {
              backgroundColor: isDark ? '#111827' : '#F8FAFC',
              borderColor: isDark ? colors.primary : colors.border,
            },
            isDark && styles.activeCard,
          ]}
          onPress={() => setThemeExplicit('dark')}
        >
          <View style={[styles.optionIconCircle, { backgroundColor: '#312E81' }]}>
            <Icon name="moon" size={20} color="#A5B4FC" />
          </View>
          <Text
            style={[
              styles.optionLabel,
              { color: isDark ? colors.primary : colors.text },
            ]}
          >
            Tối
          </Text>
          {isDark && (
            <View style={[styles.activeDot, { backgroundColor: colors.primary }]}>
              <Icon name="checkmark" size={10} color="#FFFFFF" />
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  header: {
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  optionCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 2,
    gap: 10,
    position: 'relative',
  },
  activeCard: {
    borderWidth: 2,
  },
  optionIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
  },
  activeDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThemeToggle;