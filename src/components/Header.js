import React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';

/**
 * Component Header chứa nút toggle theme và thông tin shake
 * @param {object} themeState - State của theme
 * @param {object} styles - Styles object
 */
const Header = ({ themeState, styles }) => {
  const showShakeInfo = () => {
    Alert.alert(
      'Shake Detection', 
      'Lắc điện thoại để xóa màn hình calculator!\n\nShake your phone to clear the calculator!',
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.themeButton} 
        onPress={themeState.toggleDarkMode}
      >
        <Text style={styles.themeButtonText}>
          {themeState.darkMode ? '☀️ Light' : '🌙 Dark'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.historyButton}
        onPress={showShakeInfo}
      >
        <Text style={styles.historyButtonText}>📱 Shake Info</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
