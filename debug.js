// debug.js - Ejecutar en tu proyecto
const { execSync } = require('child_process');

console.log('🔍 CHECKING FOR ERRORS...\n');

try {
  // Check TypeScript errors
  console.log('📝 TypeScript Check:');
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log('✅ No TypeScript errors\n');
} catch (e) {
  console.log('❌ TypeScript errors found\n');
}

try {
  // Check ESLint errors  
  console.log('🧹 ESLint Check:');
  execSync('npx eslint . --ext .ts,.tsx', { stdio: 'inherit' });
  console.log('✅ No ESLint errors\n');
} catch (e) {
  console.log('❌ ESLint errors found\n');
}

try {
  // Check for common React Native issues
  console.log('⚛️ React Native Check:');
  execSync('npx react-native doctor', { stdio: 'inherit' });
  console.log('✅ React Native setup OK\n');
} catch (e) {
  console.log('❌ React Native issues found\n');
}