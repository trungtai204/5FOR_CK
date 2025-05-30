import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Component Button tái sử dụng cho các nút calculator
 * @param {string} title - Text hiển thị trên nút
 * @param {function} onPress - Hàm xử lý khi nhấn nút
 * @param {string} type - Loại nút (number, operator, clear, equals)
 * @param {object} styles - Styles object
 * @param {object} customStyle - Style tùy chỉnh thêm
 */
const Button = ({ title, onPress, type = 'number', styles, customStyle = {} }) => {
  const handlePress = async () => {
    try {
      // Thêm phản hồi rung khác nhau tùy theo loại nút
      switch (type) {
        case 'number':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'operator':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'clear':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        case 'equals':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        default:
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      onPress();
    } catch (error) {
      // Nếu có lỗi với haptic feedback, vẫn thực hiện onPress
      onPress();
    }
  };

  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    switch (type) {
      case 'number':
        baseStyle.push(styles.numberButton);
        break;
      case 'operator':
        baseStyle.push(styles.operatorButton);
        break;
      case 'clear':
        baseStyle.push(styles.clearButton);
        break;
      case 'equals':
        baseStyle.push(styles.equalsButton);
        break;
      default:
        baseStyle.push(styles.numberButton);
    }
    
    if (customStyle) {
      baseStyle.push(customStyle);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.buttonText];
    
    switch (type) {
      case 'number':
        baseStyle.push(styles.numberButtonText);
        break;
      case 'operator':
        baseStyle.push(styles.operatorButtonText);
        break;
      case 'clear':
        baseStyle.push(styles.clearButtonText);
        break;
      case 'equals':
        baseStyle.push(styles.equalsButtonText);
        break;
      default:
        baseStyle.push(styles.numberButtonText);
    }
    
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={getTextStyle()}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
