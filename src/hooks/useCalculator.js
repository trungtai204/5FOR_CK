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

  // Pending unary operation state
  const [pendingUnaryOp, setPendingUnaryOp] = useState(null);

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
    if (pendingUnaryOp) {
      // Nếu đang chờ số cho phép toán khoa học
      setDisplay(display === '0' ? String(num) : display + num);
      setExpression(`${pendingUnaryOp}(${display === '0' ? String(num) : display + num}`);
      setWaitingForOperand(false);
      return;
    }
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }

    // Cập nhật expression
    if (waitingForOperand) {
      const parts = expression.split(' ');
      if (parts.length >= 3) {
        setExpression(parts[0] + ' ' + parts[1] + ' ' + String(num));
      } else {
        setExpression(String(num));
      }
    } else {
      if (expression === '' || expression.includes('=')) {
        setExpression(String(num));
      } else {
        const parts = expression.split(' ');
        if (parts.length === 1) {
          setExpression(display === '0' ? String(num) : display + num);
        } else if (parts.length === 3) {
          const newNumber = display === '0' ? String(num) : display + num;
          setExpression(parts[0] + ' ' + parts[1] + ' ' + newNumber);
        }
      }
    }
  };

  const inputDecimal = () => {
    if (pendingUnaryOp) {
      setDisplay(display.includes('.') ? display : display + '.');
      setExpression(`${pendingUnaryOp}(${display.includes('.') ? display : display + '.'}`);
      setWaitingForOperand(false);
      return;
    }
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
    // Nếu vừa nhấn toán tử mà lại nhấn tiếp toán tử, bỏ qua
    if (waitingForOperand) {
      return;
    }
    const inputValue = parseFloat(display);

    // Xử lý lũy thừa xʸ
    if (nextOperation === '^') {
      setPreviousValue(inputValue);
      setOperation('^');
      setWaitingForOperand(true);
      setExpression(display + ' ^');
      return;
    }
    // Xử lý căn bậc y: ʸ√x
    if (nextOperation === 'yroot') {
      setPreviousValue(inputValue);
      setOperation('yroot');
      setWaitingForOperand(true);
      setExpression(display + ' yroot');
      return;
    }

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

      let newValue;
      if (operation === '^') {
        newValue = Math.pow(currentValue, inputValue);
      } else if (operation === 'yroot') {
        newValue = Math.pow(currentValue, 1 / inputValue);
      } else {
        newValue = calculate(currentValue, inputValue, operation);
      }

      // Add to history
      const historyEntry = createHistoryEntry(currentValue, operation, inputValue, newValue);
      setHistory(prev => [historyEntry, ...prev.slice(0, 9)]); // Keep last 10 calculations

      // Chỉ cập nhật expression, không hiển thị kết quả
      setExpression(String(newValue) + ' ' + nextOperation);
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    if (pendingUnaryOp) {
      const value = parseFloat(display);
      let result = null;
      switch (pendingUnaryOp) {
        case 'sin': result = Math.sin(value); break;
        case 'cos': result = Math.cos(value); break;
        case 'tan': result = Math.tan(value); break;
        case 'sinh': result = Math.sinh(value); break;
        case 'cosh': result = Math.cosh(value); break;
        case 'tanh': result = Math.tanh(value); break;
        case 'ln': result = Math.log(value); break;
        case 'log': result = Math.log10(value); break;
        case 'sqrt': result = Math.sqrt(value); break;
        case 'cbrt': result = Math.cbrt(value); break;
        case 'square': result = Math.pow(value, 2); break;
        case 'cube': result = Math.pow(value, 3); break;
        case 'inverse': result = 1 / value; break;
        case 'factorial': {
          let res = 1;
          for (let i = 2; i <= value; i++) res *= i;
          result = res;
          break;
        }
        case 'exp': result = Math.exp(value); break;
        case 'tenpow': result = Math.pow(10, value); break;
        case 'pi': result = Math.PI; break;
        case 'e': result = Math.E; break;
        case 'rand': result = Math.random(); break;
        default: result = value;
      }
      setDisplay(String(result));
      setExpression(`${pendingUnaryOp}(${value})`); // chỉ phép tính, không có dấu =
      // Lưu lịch sử
      const now = new Date();
      const dateStr = now.toLocaleDateString('vi-VN', {
        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
      });
      setHistory(prev => [`[${dateStr}] ${pendingUnaryOp}(${value}) = ${result}`, ...prev.slice(0, 9)]);
      setPendingUnaryOp(null);
      setWaitingForOperand(true);
      return;
    }
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      // Handle division by zero
      if (isDivisionByZero(operation, inputValue)) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert('Error', 'Cannot divide by zero');
        return;
      }

      let newValue;
      if (operation === '^') {
        newValue = Math.pow(previousValue, inputValue);
      } else if (operation === 'yroot') {
        newValue = Math.pow(previousValue, 1 / inputValue);
      } else {
        newValue = calculate(previousValue, inputValue, operation);
      }

      // Add to history
      const historyEntry = createHistoryEntry(previousValue, operation, inputValue, newValue);
      setHistory(prev => [historyEntry, ...prev.slice(0, 9)]);

      // Hiển thị kết quả khi nhấn dấu bằng
      setDisplay(String(newValue));
      setExpression(`${previousValue} ${operation} ${inputValue} = ${newValue}`);
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

  // Hàm cho phép toán một ngôi: set kết quả và chờ nhập số mới
  const inputUnaryResult = (op) => {
    setPendingUnaryOp(op);
    setDisplay('0');
    setExpression(`${op}(`);
    setWaitingForOperand(false);
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
    pendingUnaryOp,

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
    inputUnaryResult,
  };
};
