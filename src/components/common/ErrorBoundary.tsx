import React, { Component, ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, errorInfo: any, retry: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
  showErrorDetails?: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Actualiza el state para mostrar la UI de error
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Captura detalles del error
    this.setState({
      error,
      errorInfo,
    });

    // Log del error para debugging
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error info:', errorInfo);

    // Callback personalizado para manejo de errores
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // En producción, enviar error a servicio de crash reporting
    if (!__DEV__) {
      // crashlyticsService.recordError(error, 'ErrorBoundary');
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReportError = () => {
    const { error, errorInfo } = this.state;
    
    Alert.alert(
      'Reportar Error',
      '¿Deseas reportar este error para ayudarnos a mejorarlo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Reportar',
          onPress: () => {
            // Aquí implementarías el envío del reporte
            console.log('Reporting error:', error);
            Alert.alert('Gracias', 'El error ha sido reportado.');
          },
        },
      ]
    );
  };

  renderErrorDetails = () => {
    const { error, errorInfo } = this.state;
    const { showErrorDetails = __DEV__ } = this.props;

    if (!showErrorDetails || !error) return null;

    return (
      <ScrollView style={styles.errorDetails}>
        <Text style={styles.errorDetailsTitle}>Detalles del Error:</Text>
        
        <View style={styles.errorSection}>
          <Text style={styles.errorSectionTitle}>Mensaje:</Text>
          <Text style={styles.errorText}>{error.message}</Text>
        </View>

        <View style={styles.errorSection}>
          <Text style={styles.errorSectionTitle}>Stack Trace:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Text style={styles.errorText}>{error.stack}</Text>
          </ScrollView>
        </View>

        {errorInfo && (
          <View style={styles.errorSection}>
            <Text style={styles.errorSectionTitle}>Component Stack:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Text style={styles.errorText}>{errorInfo.componentStack}</Text>
            </ScrollView>
          </View>
        )}
      </ScrollView>
    );
  };

  renderDefaultErrorUI = () => {
    const { error } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          {/* Error Icon */}
          <View style={styles.errorIcon}>
            <Text style={styles.errorIconText}>⚠️</Text>
          </View>

          {/* Error Message */}
          <Text style={styles.errorTitle}>¡Ups! Algo salió mal</Text>
          <Text style={styles.errorMessage}>
            La aplicación encontró un error inesperado. No te preocupes, 
            nuestro equipo ha sido notificado.
          </Text>

          {/* Error Code (if available) */}
          {error && (
            <Text style={styles.errorCode}>
              Código de error: {error.name || 'UNKNOWN_ERROR'}
            </Text>
          )}

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={this.handleRetry}
            >
              <Text style={styles.primaryButtonText}>Reintentar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={this.handleReportError}
            >
              <Text style={styles.secondaryButtonText}>Reportar Error</Text>
            </TouchableOpacity>
          </View>

          {/* Error Details (Development) */}
          {this.renderErrorDetails()}
        </View>
      </View>
    );
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Si hay un fallback personalizado, usarlo
      if (fallback) {
        return fallback(error!, errorInfo, this.handleRetry);
      }

      // Usar UI de error por defecto
      return this.renderDefaultErrorUI();
    }

    // No hay error, renderizar children normalmente
    return children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    maxWidth: '100%',
  },
  errorIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  errorIconText: {
    fontSize: 40,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  errorCode: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'monospace',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Error Details Styles
  errorDetails: {
    maxHeight: 200,
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  errorDetailsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  errorSection: {
    marginBottom: 12,
  },
  errorSectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  errorText: {
    fontSize: 11,
    color: '#4B5563',
    fontFamily: 'monospace',
    lineHeight: 16,
  },
});

export default ErrorBoundary;

// Hook personalizado para usar con functional components
export const useErrorHandler = () => {
  const handleError = (error: Error, errorInfo?: any) => {
    console.error('Handled error:', error);
    
    if (!__DEV__) {
      // Enviar a servicio de crash reporting
      // crashlyticsService.recordError(error, 'useErrorHandler');
    }
  };

  return { handleError };
};

// HOC para envolver componentes con ErrorBoundary
export const withErrorBoundary = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryConfig?: Partial<ErrorBoundaryProps>
) => {
  const ComponentWithErrorBoundary = (props: P) => (
    <ErrorBoundary {...errorBoundaryConfig}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return ComponentWithErrorBoundary;
};