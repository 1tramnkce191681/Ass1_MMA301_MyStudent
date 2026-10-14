import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useProfile } from '../Context/ProfileContext';
import { useTheme } from '../Context/ThemeContext';

const AVATAR_PRESETS = ['👩‍💻', '👨‍💻', '🧑‍🎓', '🚀', '💡', '🎨', '📚', '⚡', '🌟', '🎧', '🤖', '🎯'];

const EditProfileScreen = ({ navigation }) => {
  const { profile, updateProfile } = useProfile();
  const { colors, isDark } = useTheme();

  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [bio, setBio] = useState(profile.bio);

  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setName(profile.name);
    setAvatar(profile.avatar);
    setBio(profile.bio);
  }, [profile]);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên.';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Họ và tên phải có ít nhất 2 ký tự.';
    }

    if (!bio.trim()) {
      newErrors.bio = 'Vui lòng nhập phần giới thiệu bản thân.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    setIsSaving(true);
    const updatedProfile = {
      ...profile,
      name: name.trim(),
      avatar: avatar.trim() || '👩‍💻',
      bio: bio.trim(),
    };

    const saved = await updateProfile(updatedProfile);
    setIsSaving(false);

    if (saved) {
      Alert.alert('Thành công 🎉', 'Hồ sơ của bạn đã được cập nhật.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert('Lỗi', 'Không thể lưu hồ sơ lúc này. Vui lòng thử lại.');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Live Preview Box */}
        <View
          style={[
            styles.previewBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
              shadowColor: colors.shadowColor,
            },
          ]}
        >
          <View
            style={[
              styles.avatarPreviewCircle,
              {
                backgroundColor: isDark ? '#1E293B' : '#EEF2FF',
                borderColor: colors.primary,
              },
            ]}
          >
            <Text style={styles.previewAvatarEmoji}>{avatar || '👩‍💻'}</Text>
          </View>
          <Text style={[styles.previewName, { color: colors.text }]}>
            {name || 'Tên hiển thị'}
          </Text>
          <Text style={[styles.previewHint, { color: colors.textMuted }]}>
            Xem trước giao diện hồ sơ
          </Text>
        </View>

        {/* Quick Emoji Avatar Selector */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>
            Chọn Avatar nhanh
          </Text>
          <View style={styles.emojiGrid}>
            {AVATAR_PRESETS.map((emoji, index) => {
              const isSelected = avatar === emoji;
              return (
                <Pressable
                  key={index}
                  style={[
                    styles.emojiBtn,
                    {
                      backgroundColor: isDark ? '#161F30' : '#F1F5F9',
                      borderColor: isSelected ? colors.primary : 'transparent',
                    },
                    isSelected && styles.emojiBtnSelected,
                  ]}
                  onPress={() => setAvatar(emoji)}
                >
                  <Text style={styles.emojiBtnText}>{emoji}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Custom Avatar Text Input */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>
            Hoặc nhập biểu tượng / Emoji khác
          </Text>
          <View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: colors.card,
                borderColor:
                  focusedField === 'avatar' ? colors.primary : colors.inputBorder,
              },
            ]}
          >
            <Ionicons
              name="happy-outline"
              size={20}
              color={focusedField === 'avatar' ? colors.primary : colors.textMuted}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={avatar}
              onChangeText={setAvatar}
              placeholder="Nhập 1 emoji (Ví dụ: 👩‍💻, 🚀)"
              placeholderTextColor={colors.textMuted}
              onFocus={() => setFocusedField('avatar')}
              onBlur={() => setFocusedField(null)}
            />
          </View>
        </View>

        {/* Name Input */}
        <View style={styles.section}>
          <View style={styles.labelRow}>
            <Text style={[styles.label, { color: colors.text }]}>
              Họ và tên <Text style={{ color: colors.danger }}>*</Text>
            </Text>
          </View>
          <View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: colors.card,
                borderColor: errors.name
                  ? colors.danger
                  : focusedField === 'name'
                  ? colors.primary
                  : colors.inputBorder,
              },
            ]}
          >
            <Ionicons
              name="person-outline"
              size={20}
              color={
                errors.name
                  ? colors.danger
                  : focusedField === 'name'
                  ? colors.primary
                  : colors.textMuted
              }
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
              }}
              placeholder="Nhập họ và tên đầy đủ"
              placeholderTextColor={colors.textMuted}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
            />
          </View>
          {errors.name && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle" size={14} color={colors.danger} />
              <Text style={[styles.errorText, { color: colors.danger }]}>
                {errors.name}
              </Text>
            </View>
          )}
        </View>

        {/* Bio Input */}
        <View style={styles.section}>
          <View style={styles.labelRow}>
            <Text style={[styles.label, { color: colors.text }]}>
              Giới thiệu bản thân (Bio) <Text style={{ color: colors.danger }}>*</Text>
            </Text>
            <Text style={[styles.charCount, { color: colors.textMuted }]}>
              {bio.length}/200
            </Text>
          </View>
          <View
            style={[
              styles.inputWrapper,
              styles.bioWrapper,
              {
                backgroundColor: colors.card,
                borderColor: errors.bio
                  ? colors.danger
                  : focusedField === 'bio'
                  ? colors.primary
                  : colors.inputBorder,
              },
            ]}
          >
            <Ionicons
              name="document-text-outline"
              size={20}
              color={
                errors.bio
                  ? colors.danger
                  : focusedField === 'bio'
                  ? colors.primary
                  : colors.textMuted
              }
              style={[styles.inputIcon, { marginTop: 12 }]}
            />
            <TextInput
              style={[styles.input, styles.bioInput, { color: colors.text }]}
              value={bio}
              onChangeText={(text) => {
                if (text.length <= 200) {
                  setBio(text);
                  if (errors.bio) setErrors((prev) => ({ ...prev, bio: null }));
                }
              }}
              placeholder="Chia sẻ mục tiêu học tập, sở thích..."
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
              onFocus={() => setFocusedField('bio')}
              onBlur={() => setFocusedField(null)}
            />
          </View>
          {errors.bio && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle" size={14} color={colors.danger} />
              <Text style={[styles.errorText, { color: colors.danger }]}>
                {errors.bio}
              </Text>
            </View>
          )}
        </View>

        {/* Bottom Buttons */}
        <View style={styles.buttonRow}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.cancelButton,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={handleCancel}
          >
            <Ionicons name="close" size={18} color={colors.text} />
            <Text style={[styles.cancelButtonText, { color: colors.text }]}>
              Hủy
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.saveButton,
              {
                backgroundColor: colors.primary,
                opacity: pressed || isSaving ? 0.85 : 1,
              },
            ]}
            onPress={handleSave}
            disabled={isSaving}
          >
            <Ionicons name="checkmark" size={18} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>
              {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  previewBox: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
    elevation: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  avatarPreviewCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  previewAvatarEmoji: {
    fontSize: 40,
  },
  previewName: {
    fontSize: 18,
    fontWeight: '800',
  },
  previewHint: {
    fontSize: 12,
    marginTop: 3,
  },
  section: {
    marginBottom: 18,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  charCount: {
    fontSize: 12,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emojiBtn: {
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  emojiBtnSelected: {
    transform: [{ scale: 1.08 }],
  },
  emojiBtnText: {
    fontSize: 22,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 12,
  },
  bioWrapper: {
    alignItems: 'flex-start',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 14,
  },
  bioInput: {
    minHeight: 90,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    paddingLeft: 4,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  cancelButton: {
    borderWidth: 1.5,
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  saveButton: {
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default EditProfileScreen;