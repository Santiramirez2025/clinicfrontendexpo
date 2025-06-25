import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { modernColors, modernTypography, modernShadows } from '../../styles';

// ============================================================================
// FOTO DE PERFIL
// ============================================================================
interface ProfileAvatarProps {
  user: any;
  onPress: () => void;
}

export const ProfileAvatar = ({ user, onPress }: ProfileAvatarProps) => (
  <TouchableOpacity style={styles.avatarContainer} onPress={onPress}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>
        {user?.firstName?.[0] || user?.name?.[0] || 'U'}
      </Text>
      <View style={styles.avatarBadge}>
        <Ionicons name="camera" size={16} color={modernColors.white} />
      </View>
    </View>
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{user?.name || 'Usuario'}</Text>
      <Text style={styles.userEmail}>{user?.email || ''}</Text>
      {user?.vipStatus && (
        <View style={styles.vipBadge}>
          <Ionicons name="diamond" size={12} color={modernColors.accent} />
          <Text style={styles.vipText}>Miembro VIP</Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

// ============================================================================
// CAMPO DE ENTRADA
// ============================================================================
interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: any;
  error?: string;
  multiline?: boolean;
  editable?: boolean;
}

export const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  error,
  multiline = false,
  editable = true,
}: InputFieldProps) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={[
        styles.input,
        multiline && styles.inputMultiline,
        error && styles.inputError,
        !editable && styles.inputDisabled
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={modernColors.gray500}
      keyboardType={keyboardType}
      multiline={multiline}
      numberOfLines={multiline ? 3 : 1}
      editable={editable}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

// ============================================================================
// SELECTOR MÚLTIPLE
// ============================================================================
interface MultiSelectorProps {
  label: string;
  options: { id: string; label: string; icon: string }[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
}

export const MultiSelector = ({
  label,
  options,
  selectedValues,
  onSelectionChange,
}: MultiSelectorProps) => {
  const toggleSelection = (id: string) => {
    const newSelection = selectedValues.includes(id)
      ? selectedValues.filter(v => v !== id)
      : [...selectedValues, id];
    onSelectionChange(newSelection);
  };

  return (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorLabel}>{label}</Text>
      <View style={styles.optionsGrid}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionChip,
              selectedValues.includes(option.id) && styles.optionChipSelected
            ]}
            onPress={() => toggleSelection(option.id)}
          >
            <Text style={styles.optionIcon}>{option.icon}</Text>
            <Text style={[
              styles.optionText,
              selectedValues.includes(option.id) && styles.optionTextSelected
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// ============================================================================
// SWITCH DE NOTIFICACIÓN
// ============================================================================
interface NotificationSwitchProps {
  label: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  icon: string;
}

export const NotificationSwitch = ({
  label,
  description,
  value,
  onValueChange,
  icon,
}: NotificationSwitchProps) => (
  <View style={styles.switchContainer}>
    <View style={styles.switchLeft}>
      <View style={styles.switchIcon}>
        <Ionicons name={icon as any} size={20} color={modernColors.gray600} />
      </View>
      <View style={styles.switchInfo}>
        <Text style={styles.switchLabel}>{label}</Text>
        <Text style={styles.switchDescription}>{description}</Text>
      </View>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: modernColors.gray300, true: modernColors.primary + '40' }}
      thumbColor={value ? modernColors.primary : modernColors.gray500}
      ios_backgroundColor={modernColors.gray300}
    />
  </View>
);

// ============================================================================
// ELEMENTO DE MENÚ
// ============================================================================
interface MenuItemProps {
  icon: string;
  label: string;
  onPress: () => void;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export const MenuItem = ({ icon, label, onPress, isDestructive = false, isLoading = false }: MenuItemProps) => (
  <TouchableOpacity 
    style={[styles.menuItem, isDestructive && styles.logoutItem]} 
    onPress={onPress}
    disabled={isLoading}
  >
    <View style={styles.menuLeft}>
      <Ionicons 
        name={icon as any} 
        size={20} 
        color={isDestructive ? modernColors.error : modernColors.gray600} 
      />
      <Text style={[
        styles.menuText, 
        isDestructive && styles.logoutText
      ]}>
        {label}
      </Text>
    </View>
    {!isDestructive && (
      <Ionicons name="chevron-forward" size={20} color={modernColors.gray400} />
    )}
  </TouchableOpacity>
);

// ============================================================================
// ESTILOS
// ============================================================================
const styles = {
  // Avatar
  avatarContainer: {
    alignItems: 'center' as const,
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: modernColors.surface,
    borderBottomWidth: 1,
    borderBottomColor: modernColors.gray100,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: modernColors.primary + '20',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
    position: 'relative' as const,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '600' as const,
    color: modernColors.primary,
  },
  avatarBadge: {
    position: 'absolute' as const,
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: modernColors.gray600,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderWidth: 3,
    borderColor: modernColors.surface,
  },
  userInfo: {
    alignItems: 'center' as const,
  },
  userName: {
    fontSize: modernTypography.fontSizeModern.xl,
    fontWeight: '600' as const,
    color: modernColors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.gray600,
    marginBottom: 8,
  },
  vipBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: modernColors.accent + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  vipText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.accent,
    fontWeight: '600' as const,
    marginLeft: 4,
  },
  // Inputs
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '500' as const,
    color: modernColors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: modernColors.surface,
    borderWidth: 1,
    borderColor: modernColors.gray200,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.text,
    ...modernShadows.small,
  },
  inputMultiline: {
    paddingVertical: 16,
    textAlignVertical: 'top' as const,
    minHeight: 80,
  },
  inputError: {
    borderColor: modernColors.error,
  },
  inputDisabled: {
    backgroundColor: modernColors.gray100,
    color: modernColors.gray600,
  },
  errorText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.error,
    marginTop: 4,
  },
  // Selectores múltiples
  selectorContainer: {
    marginBottom: 24,
  },
  selectorLabel: {
    fontSize: modernTypography.fontSizeModern.sm,
    fontWeight: '500' as const,
    color: modernColors.text,
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 8,
  },
  optionChip: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: modernColors.surface,
    borderWidth: 1,
    borderColor: modernColors.gray200,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  optionChipSelected: {
    backgroundColor: modernColors.primary + '20',
    borderColor: modernColors.primary,
  },
  optionIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  optionText: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray700,
    fontWeight: '500' as const,
  },
  optionTextSelected: {
    color: modernColors.primary,
    fontWeight: '600' as const,
  },
  // Switches de notificación
  switchContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: modernColors.gray100,
  },
  switchLeft: {
    flex: 1,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  switchIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: modernColors.gray100,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 16,
  },
  switchInfo: {
    flex: 1,
  },
  switchLabel: {
    fontSize: modernTypography.fontSizeModern.base,
    fontWeight: '500' as const,
    color: modernColors.text,
    marginBottom: 2,
  },
  switchDescription: {
    fontSize: modernTypography.fontSizeModern.sm,
    color: modernColors.gray600,
    lineHeight: 18,
  },
  // Elementos de menú
  menuItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: modernColors.gray100,
  },
  logoutItem: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  menuLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  menuText: {
    fontSize: modernTypography.fontSizeModern.base,
    color: modernColors.text,
    marginLeft: 12,
    fontWeight: '500' as const,
  },
  logoutText: {
    color: modernColors.error,
  },
};