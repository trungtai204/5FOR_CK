import React, { useState } from 'react';
import { View } from 'react-native';
import Button from './Button';

/**
 * Component ButtonGrid chứa tất cả các nút của calculator
 * @param {object} calculatorState - State của calculator
 * @param {object} styles - Styles object
 * @param {boolean} isScientific - Có đang ở chế độ khoa học không
 * @param {function} setIsScientific - Hàm chuyển đổi chế độ khoa học
 */
const ButtonGrid = ({ calculatorState, styles, isScientific, setIsScientific }) => {
  const {
    inputNumber,
    inputDecimal,
    handleClear,
    performOperation,
    handleEquals,
    toggleSign,
    calculatePercentage,
  } = calculatorState;

  // Hàm xử lý cho các phép toán khoa học
  const handleSquare = () => {
    const value = parseFloat(calculatorState.display);
    calculatorState.inputUnaryResult(Math.pow(value, 2));
  };
  const handleSqrt = () => {
    const value = parseFloat(calculatorState.display);
    calculatorState.inputUnaryResult(Math.sqrt(value));
  };
  const handleCube = () => {
    const value = parseFloat(calculatorState.display);
    calculatorState.inputUnaryResult(Math.pow(value, 3));
  };
  const handlePowerY = () => {
    // Đặt phép toán chờ nhập số mũ tiếp theo
    calculatorState.performOperation('^');
  };
  const handleCubeRoot = () => {
    const value = parseFloat(calculatorState.display);
    calculatorState.inputUnaryResult(Math.cbrt(value));
  };
  const handleYRoot = () => {
    // Đặt phép toán chờ nhập số mũ tiếp theo
    calculatorState.performOperation('yroot');
  };
  const handleInverse = () => {
    const value = parseFloat(calculatorState.display);
    calculatorState.inputUnaryResult(1 / value);
  };
  const handleFactorial = () => {
    const value = parseInt(calculatorState.display);
    let res = 1;
    for (let i = 2; i <= value; i++) res *= i;
    calculatorState.inputUnaryResult(res);
  };
  const handleExp = () => {
    const value = parseFloat(calculatorState.display);
    calculatorState.inputUnaryResult(Math.exp(value));
  };
  const handleTenPow = () => {
    const value = parseFloat(calculatorState.display);
    calculatorState.inputUnaryResult(Math.pow(10, value));
  };
  const handleSin = () => {
    const value = parseFloat(calculatorState.display);
    calculatorState.inputUnaryResult(Math.sin(value));
  };
  const handleCos = () => {
    const value = parseFloat(calculatorState.display);
    calculatorState.inputUnaryResult(Math.cos(value));
  };
  const handleTan = () => {
    const value = parseFloat(calculatorState.display);
    calculatorState.inputUnaryResult(Math.tan(value));
  };
  const handleSinh = () => {
    const value = parseFloat(calculatorState.display);
    calculatorState.inputUnaryResult(Math.sinh(value));
  };
  const handleCosh = () => {
    const value = parseFloat(calculatorState.display);
    calculatorState.inputUnaryResult(Math.cosh(value));
  };
  const handleTanh = () => {
    const value = parseFloat(calculatorState.display);
    calculatorState.inputUnaryResult(Math.tanh(value));
  };
  const handleLn = () => {
    const value = parseFloat(calculatorState.display);
    calculatorState.inputUnaryResult(Math.log(value));
  };
  const handleLog = () => {
    const value = parseFloat(calculatorState.display);
    calculatorState.inputUnaryResult(Math.log10(value));
  };
  const handlePi = () => {
    calculatorState.inputUnaryResult(Math.PI);
  };
  const handleE = () => {
    calculatorState.inputUnaryResult(Math.E);
  };
  const handleRand = () => {
    calculatorState.inputUnaryResult(Math.random());
  };
  // Đơn giản: Deg/Rad chỉ là placeholder, bạn có thể mở rộng thêm state nếu muốn
  const handleDegRad = () => {
    // Chưa xử lý chuyển đổi mode, chỉ là placeholder
    alert('Chức năng chuyển đổi Deg/Rad chưa được hỗ trợ!');
  };

  // Các nút khoa học (gán đúng hàm cho từng nút)
  const scientificRows = [
    [
      { title: '(', onPress: () => {}, type: 'operator' },
      { title: ')', onPress: () => {}, type: 'operator' },
      { title: 'mc', onPress: () => {}, type: 'operator' },
      { title: 'm+', onPress: () => {}, type: 'operator' },
      { title: 'm-', onPress: () => {}, type: 'operator' },
      { title: 'mr', onPress: () => {}, type: 'operator' },
    ],
    [
      { title: 'x²', onPress: handleSquare, type: 'operator' },
      { title: '²√x', onPress: handleSqrt, type: 'operator' },
      { title: 'x³', onPress: handleCube, type: 'operator' },
      { title: 'xʸ', onPress: handlePowerY, type: 'operator' },
      { title: 'eˣ', onPress: handleExp, type: 'operator' },
      { title: '10ˣ', onPress: handleTenPow, type: 'operator' },
    ],
    [
      { title: '1/x', onPress: handleInverse, type: 'operator' },
      { title: '³√x', onPress: handleCubeRoot, type: 'operator' },
      { title: 'ʸ√x', onPress: handleYRoot, type: 'operator' },
      { title: 'ln', onPress: handleLn, type: 'operator' },
      { title: 'log₁₀', onPress: handleLog, type: 'operator' },
      { title: 'π', onPress: handlePi, type: 'operator' },
    ],
    [
      { title: 'x!', onPress: handleFactorial, type: 'operator' },
      { title: 'sin', onPress: handleSin, type: 'operator' },
      { title: 'cos', onPress: handleCos, type: 'operator' },
      { title: 'tan', onPress: handleTan, type: 'operator' },
      { title: 'e', onPress: handleE, type: 'operator' },
      { title: 'Rand', onPress: handleRand, type: 'operator' },
    ],
    [
      { title: 'sinh', onPress: handleSinh, type: 'operator' },
      { title: 'cosh', onPress: handleCosh, type: 'operator' },
      { title: 'tanh', onPress: handleTanh, type: 'operator' },
      { title: 'Deg', onPress: handleDegRad, type: 'operator' },
      { title: '2ⁿᵈ', onPress: () => {}, type: 'operator' },
      { title: 'EE', onPress: () => {}, type: 'operator' },
    ],
  ];

  return (
    <View style={styles.buttonContainer}>
      {/* Nếu là chế độ khoa học, hiển thị các hàng nút khoa học */}
      {isScientific && scientificRows.map((row, idx) => (
        <View key={idx} style={styles.buttonRow}>
          {row.map((btn, i) => (
            <Button
              key={i}
              title={btn.title}
              onPress={btn.onPress}
              type={btn.type}
              styles={styles}
            />
          ))}
        </View>
      ))}

      {/* Row 1: Clear, +/-, %, ÷ */}
      <View style={styles.buttonRow}>
        <Button
          title="C"
          onPress={handleClear}
          type="clear"
          styles={styles}
        />
        <Button
          title="±"
          onPress={toggleSign}
          type="operator"
          styles={styles}
        />
        <Button
          title="%"
          onPress={calculatePercentage}
          type="operator"
          styles={styles}
        />
        <Button
          title="÷"
          onPress={() => performOperation('÷')}
          type="operator"
          styles={styles}
        />
      </View>

      {/* Row 2: 7, 8, 9, × */}
      <View style={styles.buttonRow}>
        <Button
          title="7"
          onPress={() => inputNumber(7)}
          type="number"
          styles={styles}
        />
        <Button
          title="8"
          onPress={() => inputNumber(8)}
          type="number"
          styles={styles}
        />
        <Button
          title="9"
          onPress={() => inputNumber(9)}
          type="number"
          styles={styles}
        />
        <Button
          title="×"
          onPress={() => performOperation('×')}
          type="operator"
          styles={styles}
        />
      </View>

      {/* Row 3: 4, 5, 6, - */}
      <View style={styles.buttonRow}>
        <Button
          title="4"
          onPress={() => inputNumber(4)}
          type="number"
          styles={styles}
        />
        <Button
          title="5"
          onPress={() => inputNumber(5)}
          type="number"
          styles={styles}
        />
        <Button
          title="6"
          onPress={() => inputNumber(6)}
          type="number"
          styles={styles}
        />
        <Button
          title="-"
          onPress={() => performOperation('-')}
          type="operator"
          styles={styles}
        />
      </View>

      {/* Row 4: 1, 2, 3, + */}
      <View style={styles.buttonRow}>
        <Button
          title="1"
          onPress={() => inputNumber(1)}
          type="number"
          styles={styles}
        />
        <Button
          title="2"
          onPress={() => inputNumber(2)}
          type="number"
          styles={styles}
        />
        <Button
          title="3"
          onPress={() => inputNumber(3)}
          type="number"
          styles={styles}
        />
        <Button
          title="+"
          onPress={() => performOperation('+')}
          type="operator"
          styles={styles}
        />
      </View>

      {/* Row 5: nút mode, 0, ., = */}
      <View style={styles.buttonRow}>
        <Button
          title={isScientific ? "🧮" : "🔢"}
          onPress={() => setIsScientific && setIsScientific(!isScientific)}
          type="number"
          styles={styles}
        />
        <Button
          title="0"
          onPress={() => inputNumber(0)}
          type="number"
          styles={styles}
        />
        <Button
          title="."
          onPress={inputDecimal}
          type="number"
          styles={styles}
        />
        <Button
          title="="
          onPress={handleEquals}
          type="equals"
          styles={styles}
        />
      </View>
    </View>
  );
};

export default ButtonGrid;
