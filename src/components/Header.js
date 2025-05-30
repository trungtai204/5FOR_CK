import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

/**
 * Component Header chứa nút toggle theme và thông tin shake
 * @param {object} themeState - State của theme
 * @param {object} styles - Styles object
 */
const Header = ({ themeState, styles }) => {
  const [isLocked, setIsLocked] = useState(false);

  const showShakeInfo = () => {
    Alert.alert(
      'Shake Detection', 
      'Lắc điện thoại để xóa màn hình calculator!\n\nShake your phone to clear the calculator!',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const toggleRotationLock = async () => {
    try {
      if (isLocked) {
        // Mở khóa xoay màn hình
        await ScreenOrientation.unlockAsync();
        setIsLocked(false);
      } else {
        // Khóa xoay màn hình ở hướng hiện tại
        const currentOrientation = await ScreenOrientation.getOrientationAsync();
        await ScreenOrientation.lockAsync(currentOrientation);
        setIsLocked(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Không thể thay đổi chế độ xoay màn hình');
    }
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

      <TouchableOpacity
        style={styles.historyButton}
        onPress={toggleRotationLock}
      >
        <Text style={styles.historyButtonText}>
          {isLocked ? '🔒 Unlock' : '🔓 Lock'} Rotation
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
