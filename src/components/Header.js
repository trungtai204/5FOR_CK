import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

/**
 * Component Header chỉ chứa nút toggle theme và nút lịch sử
 * @param {object} themeState - State của theme
 * @param {object} styles - Styles object
 * @param {function} onShowHistory - Hàm mở lịch sử
 */
const Header = ({ themeState, styles, onShowHistory }) => {
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
        onPress={onShowHistory}
      >
        <Text style={styles.historyButtonText}>🕑 Lịch sử</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
