import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import Calculator from './src/components/Calculator';
import { useCalculator } from './src/hooks/useCalculator';
import { useTheme } from './src/hooks/useTheme';
import { getStyles } from './src/styles/AppStyles';

export default function App() {
  const calculatorState = useCalculator();
  const themeState = useTheme();

  const styles = getStyles(themeState.darkMode, calculatorState.orientation);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={themeState.darkMode ? "light" : "dark"} />
      <Calculator
        calculatorState={calculatorState}
        themeState={themeState}
        styles={styles}
      />
    </SafeAreaView>
  );
}
