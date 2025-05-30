import { StyleSheet } from 'react-native';
import { lightTheme, darkTheme } from '../constants/themes';

/**
 * Tạo styles động dựa trên theme và orientation
 * @param {boolean} darkMode - Có phải dark mode không
 * @param {string} orientation - Hướng màn hình (portrait/landscape)
 * @returns {object} - StyleSheet object
 */
export const getStyles = (darkMode, orientation) => {
  const isLandscape = orientation === 'landscape';
  const theme = darkMode ? darkTheme : lightTheme;

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    themeButton: {
      backgroundColor: theme.operatorBackground,
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
    },
    themeButtonText: {
      color: theme.operatorText,
      fontSize: 14,
      fontWeight: 'bold',
    },
    historyButton: {
      backgroundColor: theme.operatorBackground,
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
    },
    historyButtonText: {
      color: theme.operatorText,
      fontSize: 14,
      fontWeight: 'bold',
    },
    displayContainer: {
      flex: isLandscape ? 0.3 : 0.35,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    expression: {
      fontSize: isLandscape ? 20 : 24,
      color: theme.displayText,
      fontWeight: '300',
      textAlign: 'right',
      opacity: 0.7,
      marginBottom: 5,
      minHeight: isLandscape ? 25 : 30,
    },
    display: {
      fontSize: isLandscape ? 48 : 64,
      color: theme.displayText,
      fontWeight: '200',
      textAlign: 'right',
    },
    buttonContainer: {
      flex: isLandscape ? 0.7 : 0.65,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    buttonRow: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
      borderRadius: isLandscape ? 35 : 40,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    numberButton: {
      backgroundColor: theme.numberBackground,
    },
    operatorButton: {
      backgroundColor: theme.operatorBackground,
    },
    clearButton: {
      backgroundColor: theme.clearBackground,
    },
    equalsButton: {
      backgroundColor: theme.equalsBackground,
    },
    buttonText: {
      fontSize: isLandscape ? 24 : 32,
      fontWeight: 'bold',
    },
    numberButtonText: {
      color: theme.numberText,
    },
    operatorButtonText: {
      color: theme.operatorText,
    },
    clearButtonText: {
      color: theme.clearText,
    },
    equalsButtonText: {
      color: theme.equalsText,
    },
    historyContainer: {
      maxHeight: 150,
      backgroundColor: theme.historyBackground,
      marginHorizontal: 20,
      marginBottom: 10,
      borderRadius: 10,
      padding: 10,
    },
    historyItem: {
      color: theme.historyText,
      fontSize: 14,
      paddingVertical: 2,
    },
    historyTitle: {
      color: theme.historyText,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    zeroButton: {
      flex: 2,
      marginRight: 10,
    },
  });
};
