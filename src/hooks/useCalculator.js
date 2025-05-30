import { useState, useEffect } from 'react';
import { Dimensions, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Gyroscope } from 'expo-sensors';
import { calculate, isDivisionByZero, createHistoryEntry } from '../utils/calculatorUtils';

/**
 * Custom hook quản lý state và logic của Calculator
 * Bao gồm: tính toán, lịch sử, orientation, gyroscope
 */
export const useCalculator = () => {
  // State chính của calculator
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState(''); // Biểu thức hiện tại
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);
  const [orientation, setOrientation] = useState('portrait');

  // Gyroscope state
  const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
  const [shakeDetected, setShakeDetected] = useState(false);

  // Screen dimensions
  const screenData = Dimensions.get('window');
  const [screenWidth, setScreenWidth] = useState(screenData.width);
  const [screenHeight, setScreenHeight] = useState(screenData.height);

  // Handle orientation changes
  useEffect(() => {
    const onChange = (result) => {
      setScreenWidth(result.window.width);
      setScreenHeight(result.window.height);
      setOrientation(result.window.width > result.window.height ? 'landscape' : 'portrait');
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  // Gyroscope setup for shake detection
  useEffect(() => {
    let subscription;

    const startGyroscope = async () => {
      const { status } = await Gyroscope.requestPermissionsAsync();
      if (status === 'granted') {
        Gyroscope.setUpdateInterval(100);
        subscription = Gyroscope.addListener(gyroscopeData => {
          setGyroData(gyroscopeData);

          // Detect shake (high rotation on any axis)
          const threshold = 2.0;
          if (Math.abs(gyroscopeData.x) > threshold ||
              Math.abs(gyroscopeData.y) > threshold ||
              Math.abs(gyroscopeData.z) > threshold) {
            if (!shakeDetected) {
              setShakeDetected(true);
              handleClear();
              // Reset shake detection after 1 second
              setTimeout(() => setShakeDetected(false), 1000);
            }
          }
        });
      }
    };

    startGyroscope();

    return () => {
      subscription && subscription.remove();
    };
  }, [shakeDetected]);

  // Calculator functions
  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }

    // Cập nhật expression
    if (waitingForOperand) {
      // Nếu đang chờ operand, thay thế expression với số mới
      const parts = expression.split(' ');
      if (parts.length >= 3) {
        // Có dạng "số operator "
        setExpression(parts[0] + ' ' + parts[1] + ' ' + String(num));
      } else {
        setExpression(String(num));
      }
    } else {
      // Nếu không chờ operand, cập nhật số hiện tại
      if (expression === '' || expression.includes('=')) {
        setExpression(String(num));
      } else {
        const parts = expression.split(' ');
        if (parts.length === 1) {
          // Chỉ có số
          setExpression(display === '0' ? String(num) : display + num);
        } else if (parts.length === 3) {
          // Có dạng "số operator số"
          const newNumber = display === '0' ? String(num) : display + num;
          setExpression(parts[0] + ' ' + parts[1] + ' ' + newNumber);
        }
      }
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }

    // Cập nhật expression tương tự như inputNumber
    const newDisplay = waitingForOperand ? '0.' : (display.indexOf('.') === -1 ? display + '.' : display);

    if (waitingForOperand) {
      const parts = expression.split(' ');
      if (parts.length >= 3) {
        setExpression(parts[0] + ' ' + parts[1] + ' ' + '0.');
      } else {
        setExpression('0.');
      }
    } else if (display.indexOf('.') === -1) {
      if (expression === '' || expression.includes('=')) {
        setExpression(newDisplay);
      } else {
        const parts = expression.split(' ');
        if (parts.length === 1) {
          setExpression(newDisplay);
        } else if (parts.length === 3) {
          setExpression(parts[0] + ' ' + parts[1] + ' ' + newDisplay);
        }
      }
    }
  };

  const handleClear = () => {
    // Vibration feedback for clear
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    setDisplay('0');
    setExpression('');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setExpression(display + ' ' + nextOperation);
    } else if (operation) {
      const currentValue = previousValue || 0;

      // Handle division by zero
      if (isDivisionByZero(operation, inputValue)) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert('Error', 'Cannot divide by zero');
        return;
      }

      const newValue = calculate(currentValue, inputValue, operation);

      // Add to history
      const historyEntry = createHistoryEntry(currentValue, operation, inputValue, newValue);
      setHistory(prev => [historyEntry, ...prev.slice(0, 9)]); // Keep last 10 calculations

      setDisplay(String(newValue));
      setExpression(String(newValue) + ' ' + nextOperation);
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      // Handle division by zero
      if (isDivisionByZero(operation, inputValue)) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert('Error', 'Cannot divide by zero');
        return;
      }

      const newValue = calculate(previousValue, inputValue, operation);

      // Add to history
      const historyEntry = createHistoryEntry(previousValue, operation, inputValue, newValue);
      setHistory(prev => [historyEntry, ...prev.slice(0, 9)]);

      setDisplay(String(newValue));
      setExpression(createHistoryEntry(previousValue, operation, inputValue, newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const toggleSign = () => {
    const newDisplay = display.charAt(0) === '-' ? display.slice(1) : '-' + display;
    setDisplay(newDisplay);

    // Cập nhật expression
    if (expression === '' || expression.includes('=')) {
      setExpression(newDisplay);
    } else {
      const parts = expression.split(' ');
      if (parts.length === 1) {
        setExpression(newDisplay);
      } else if (parts.length === 2) {
        setExpression(parts[0] + ' ' + parts[1] + ' ' + newDisplay);
      } else if (parts.length === 3) {
        setExpression(parts[0] + ' ' + parts[1] + ' ' + newDisplay);
      }
    }
  };

  const calculatePercentage = () => {
    const value = parseFloat(display) / 100;
    const newDisplay = String(value);
    setDisplay(newDisplay);

    // Cập nhật expression
    if (expression === '' || expression.includes('=')) {
      setExpression(newDisplay);
    } else {
      const parts = expression.split(' ');
      if (parts.length === 1) {
        setExpression(newDisplay);
      } else if (parts.length === 2) {
        setExpression(parts[0] + ' ' + parts[1] + ' ' + newDisplay);
      } else if (parts.length === 3) {
        setExpression(parts[0] + ' ' + parts[1] + ' ' + newDisplay);
      }
    }
  };

  // Xóa 1 entry lịch sử
  const deleteHistoryEntry = (index) => {
    setHistory(prev => prev.filter((_, i) => i !== index));
  };

  // Sửa 1 entry lịch sử
  const editHistoryEntry = (index, newEntry) => {
    setHistory(prev => prev.map((item, i) => i === index ? newEntry : item));
  };

  return {
    // State
    display,
    expression,
    history,
    orientation,
    screenWidth,
    screenHeight,
    gyroData,

    // Functions
    inputNumber,
    inputDecimal,
    handleClear,
    performOperation,
    handleEquals,
    toggleSign,
    calculatePercentage,
    deleteHistoryEntry,
    editHistoryEntry,
  };
};
