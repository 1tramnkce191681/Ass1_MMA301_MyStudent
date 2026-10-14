import { StyleSheet, Text, View } from 'react-native';

const ICON_MAP = {
  school: '🎓',
  'code-slash': '💻',
  'chatbubble-ellipses': '💬',
  'chatbubble-ellipses-outline': '💬',
  book: '📚',
  fitness: '🏸',
  'musical-notes': '🎵',
  sparkles: '✨',
  'sparkles-outline': '✨',
  'time-outline': '⏱️',
  'trash-outline': '🗑️',
  moon: '🌙',
  sunny: '☀️',
  person: '👤',
  'person-outline': '👤',
  checkbox: '☑️',
  'settings-sharp': '⚙️',
  settings: '⚙️',
  'bulb-outline': '💡',
  'ribbon-outline': '🎖️',
  'create-outline': '✏️',
  'list-outline': '📋',
  'happy-outline': '😊',
  'document-text-outline': '📝',
  'alert-circle': '⚠️',
  'trophy-outline': '🏆',
  'color-palette-outline': '🎨',
  'information-circle-outline': 'ℹ️',
  'shield-checkmark-outline': '🛡️',
  'cloud-done-outline': '☁️',
  'refresh-outline': '🔄',
  'add-circle-outline': '➕',
};

const Icon = ({ name, size = 18, color = '#4F46E5', style }) => {
  // Pure vector chevron
  if (name === 'chevron-forward') {
    const s = Math.max(7, size * 0.45);
    return (
      <View style={[styles.center, { width: size, height: size }, style]}>
        <View
          style={{
            width: s,
            height: s,
            borderTopWidth: 2,
            borderRightWidth: 2,
            borderColor: color,
            transform: [{ rotate: '45deg' }],
            marginLeft: -2,
          }}
        />
      </View>
    );
  }

  // Pure vector checkmark
  if (name === 'checkmark') {
    return (
      <View style={[styles.center, { width: size, height: size }, style]}>
        <Text
          style={{
            fontSize: size * 0.9,
            color,
            fontWeight: '900',
            textAlign: 'center',
            lineHeight: size,
          }}
        >
          ✓
        </Text>
      </View>
    );
  }

  // Pure vector close (X)
  if (name === 'close') {
    return (
      <View style={[styles.center, { width: size, height: size }, style]}>
        <Text
          style={{
            fontSize: size * 0.85,
            color,
            fontWeight: '800',
            textAlign: 'center',
            lineHeight: size,
          }}
        >
          ✕
        </Text>
      </View>
    );
  }

  // Pure vector plus (+)
  if (name === 'add') {
    return (
      <View style={[styles.center, { width: size, height: size }, style]}>
        <Text
          style={{
            fontSize: size * 1.1,
            color,
            fontWeight: '700',
            textAlign: 'center',
            lineHeight: size,
          }}
        >
          +
        </Text>
      </View>
    );
  }

  const glyph = ICON_MAP[name] || '📌';

  return (
    <View style={[styles.center, { width: size, height: size }, style]}>
      <Text
        style={{
          fontSize: Math.round(size * 0.85),
          textAlign: 'center',
          includeFontPadding: false,
        }}
      >
        {glyph}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Icon;
