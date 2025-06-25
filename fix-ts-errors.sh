#!/bin/bash

# Script para arreglar errores de TypeScript en ClinicSaasExpo

echo "🔧 Arreglando errores de TypeScript..."

# 1. Arreglar modernTypography - agregar propiedades faltantes
echo "📝 Actualizando typography..."
cat > src/styles/typography.ts << 'EOF'
import { Platform } from 'react-native';

export const modernTypography = {
  fontFamily: {
    primary: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
    secondary: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    accent: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto Medium',
    mono: Platform.OS === 'ios' ? 'SF Mono' : 'Roboto Mono',
  },
  // Agregar todas las propiedades faltantes
  headingLarge: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const,
  },
  headingMedium: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600' as const,
  },
  headingSmall: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
  },
  bodyLarge: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '400' as const,
  },
  bodyMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },
  letterSpacingModern: {
    tight: -0.02,
    normal: 0,
    relaxed: 0.02,
  },
};
EOF

# 2. Arreglar LinearGradient colors type
echo "🎨 Arreglando LinearGradient..."
find src -name "*.tsx" -type f -exec sed -i '' 's/colors={\[\([^]]*\)\]}/colors={[\1] as [string, string, ...string[]]}/g' {} \;

# 3. Arreglar exportaciones duplicadas en components.premium.ts
echo "🔨 Limpiando exportaciones duplicadas..."
sed -i '' '/^export {/,/^}/d' src/styles/components.premium.ts
echo "
// Exportar todo de una vez
export {
  premiumShadows,
  premiumButtons,
  premiumCards,
  premiumInputs,
  premiumBadges,
  premiumChips,
  premiumLayouts,
  premiumSpecialized,
};" >> src/styles/components.premium.ts

# 4. Arreglar exportaciones duplicadas en index.premium.ts
sed -i '' '/^export {/,/^}/d' src/styles/index.premium.ts
echo "
// Exportar todo de una vez
export {
  premiumTheme,
  themeVariants,
  premiumContextHelpers,
  premiumPresets,
  designTokens,
  premiumUtils,
};" >> src/styles/index.premium.ts

# 5. Arreglar exportaciones duplicadas en spacing.premium.ts
sed -i '' '/^export {/,/^}/d' src/styles/spacing.premium.ts
echo "
// Exportar todo de una vez
export {
  premiumLayout,
  premiumComponents,
  premiumAesthetic,
  premiumSpacingUtils,
};" >> src/styles/spacing.premium.ts

# 6. Arreglar exportaciones duplicadas en typography.premium.ts
sed -i '' '/^export {/,/^}/d' src/styles/typography.premium.ts
echo "
// Exportar todo de una vez
export {
  premiumWeights,
  premiumLineHeights,
  premiumLetterSpacing,
  contextStyles,
  themedTypography,
  responsiveSizes,
};" >> src/styles/typography.premium.ts

# 7. Arreglar tipos en useAppointments
echo "📦 Arreglando exports de tipos..."
cat >> src/hooks/useAppointments.ts << 'EOF'

// Exportar tipos que faltan
export type { 
  Appointment, 
  AppointmentFilters,
  TabType,
  AppointmentStatus,
  Treatment,
  Professional,
  AvailabilitySlot,
  AppointmentSection
};
EOF

# 8. Crear WellnessCheckIn component
echo "🏥 Creando WellnessCheckIn..."
cat > src/components/dashboard/WellnessCheckIn.tsx << 'EOF'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const WellnessCheckIn = () => {
  return (
    <View style={styles.container}>
      <Text>Wellness Check-In</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
EOF

# 9. Arreglar rescheduleAppointment call
echo "🔄 Arreglando rescheduleAppointment..."
sed -i '' 's/await rescheduleAppointment(appointmentId);/await rescheduleAppointment({ appointmentId });/g' src/screens/appointments/AppointmentScreen.tsx

# 10. Arreglar AuthUser type
echo "👤 Actualizando AuthUser type..."
find src/types -name "*.ts" -exec grep -l "AuthUser" {} \; | xargs sed -i '' '/interface AuthUser/,/}/s/}/  totalAppointments?: number;\n  referralCode?: string;\n}/g'

# 11. Arreglar ProfileStatsCard props
echo "📊 Arreglando ProfileStatsCard..."
find src/components -name "*StatsCard*" -exec sed -i '' 's/interface.*Props.*{/interface ProfileStatsCardProps {\n  totalAppointments: number;\n  beautyPoints: number;\n  memberSince: string;\n  vipStatus: boolean;/g' {} \;

# 12. Arreglar InviteFriendCard props
echo "👥 Arreglando InviteFriendCard..."
find src/components -name "*InviteFriendCard*" -exec sed -i '' 's/interface.*Props.*{/interface InviteFriendCardProps {\n  userName?: string;\n  onInvite: () => void;\n  referralCode: string;/g' {} \;

# 13. Remover backdropFilter no soportado
echo "🌫️ Removiendo backdropFilter..."
sed -i '' '/backdropFilter:/d' src/styles/components.premium.ts

# 14. Arreglar colores faltantes
echo "🎨 Agregando colores faltantes..."
find src/styles -name "*colors*" -o -name "*theme*" | xargs grep -l "premiumColors" | head -1 | xargs sed -i '' '/export const premiumColors/,/^}/s/}/  blush: {\n    50: "#FFF0F5",\n    400: "#FFB6C1",\n  },\n  luxury: {\n    400: "#D4956B",\n  },\n}/g'

echo "✅ Script completado. Ejecutando verificación..."
npx tsc --noEmit

echo "
🎯 Pasos adicionales recomendados:
1. Revisa que todos los archivos se hayan actualizado correctamente
2. Si persisten errores, ejecuta: npm run type-check
3. Considera actualizar las dependencias: npm update
"