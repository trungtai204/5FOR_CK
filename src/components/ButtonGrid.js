import React from 'react';
import { View } from 'react-native';
import Button from './Button';

/**
 * Component ButtonGrid chứa tất cả các nút của calculator
 * @param {object} calculatorState - State của calculator
 * @param {object} styles - Styles object
 */
const ButtonGrid = ({ calculatorState, styles }) => {
  const {
    inputNumber,
    inputDecimal,
    handleClear,
    performOperation,
    handleEquals,
    toggleSign,
    calculatePercentage,
  } = calculatorState;

  return (
    <View style={styles.buttonContainer}>
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

      {/* Row 5: 0, ., = */}
      <View style={styles.buttonRow}>
        <Button
          title="0"
          onPress={() => inputNumber(0)}
          type="number"
          styles={styles}
          customStyle={styles.zeroButton}
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
