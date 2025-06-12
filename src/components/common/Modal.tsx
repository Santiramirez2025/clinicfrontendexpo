import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import Button from './Button';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  animationType?: 'slide' | 'fade' | 'none';
  actions?: Array<{
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  }>;
}

const { height: screenHeight } = Dimensions.get('window');

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  size = 'medium',
  animationType = 'slide',
  actions,
}) => {
  const getModalHeight = () => {
    switch (size) {
      case 'small':
        return screenHeight * 0.4;
      case 'medium':
        return screenHeight * 0.6;
      case 'large':
        return screenHeight * 0.8;
      case 'fullscreen':
        return screenHeight;
      default:
        return screenHeight * 0.6;
    }
  };

  return (
    <RNModal
      visible={visible}
      animationType={animationType}
      transparent={size !== 'fullscreen'}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />
      
      {size === 'fullscreen' ? (
        <View style={styles.fullscreenContainer}>
          {title && (
            <View style={styles.fullscreenHeader}>
              <Text style={styles.fullscreenTitle}>{title}</Text>
              {showCloseButton && (
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          <ScrollView style={styles.fullscreenContent}>
            {children}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.overlay}>
          <View style={[
            styles.modal,
            { maxHeight: getModalHeight() }
          ]}>
            {title && (
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {showCloseButton && (
                  <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
            
            {actions && actions.length > 0 && (
              <View style={styles.footer}>
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    title={action.label}
                    onPress={action.onPress}
                    variant={action.variant || 'primary'}
                    style={[
                      styles.actionButton,
                      index < actions.length - 1 && styles.actionButtonMargin
                    ]}
                  />
                ))}
              </View>
            )}
          </View>
        </View>
      )}
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  fullscreenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  fullscreenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  fullscreenContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  actionButton: {
    flex: 1,
  },
  actionButtonMargin: {
    marginRight: 12,
  },
});

export default Modal;
