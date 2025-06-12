import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  subtitle?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  showBackButton?: boolean;
  backButtonText?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  leftComponent,
  rightComponent,
  onLeftPress,
  onRightPress,
  backgroundColor = '#007AFF',
  textColor = '#FFFFFF',
  showBackButton = false,
  backButtonText = '‹ Atrás',
}) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={textColor === '#FFFFFF' ? 'light-content' : 'dark-content'}
      />
      <View style={[
        styles.header,
        { backgroundColor, paddingTop: insets.top }
      ]}>
        <View style={styles.content}>
          {/* Left Section */}
          <View style={styles.leftSection}>
            {showBackButton ? (
              <TouchableOpacity onPress={onLeftPress} style={styles.backButton}>
                <Text style={[styles.backText, { color: textColor }]}>
                  {backButtonText}
                </Text>
              </TouchableOpacity>
            ) : leftComponent ? (
              <TouchableOpacity onPress={onLeftPress}>
                {leftComponent}
              </TouchableOpacity>
            ) : (
              <View style={styles.placeholder} />
            )}
          </View>

          {/* Center Section */}
          <View style={styles.centerSection}>
            <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text style={[styles.subtitle, { color: textColor, opacity: 0.8 }]} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>

          {/* Right Section */}
          <View style={styles.rightSection}>
            {rightComponent ? (
              <TouchableOpacity onPress={onRightPress}>
                {rightComponent}
              </TouchableOpacity>
            ) : (
              <View style={styles.placeholder} />
            )}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default Header;
