import React from 'react';
import { View } from 'react-native';
import Header from './Header';
import History from './History';
import Display from './Display';
import ButtonGrid from './ButtonGrid';

/**
 * Component Calculator chính - tổng hợp tất cả các component con
 * @param {object} calculatorState - State của calculator
 * @param {object} themeState - State của theme
 * @param {object} styles - Styles object
 */
const Calculator = ({ calculatorState, themeState, styles }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* Header với nút toggle theme và shake info */}
      <Header
        themeState={themeState}
        styles={styles}
      />

      {/* Lịch sử tính toán */}
      <History
        history={calculatorState.history}
        styles={styles}
        onDelete={calculatorState.deleteHistoryEntry}
        onEdit={calculatorState.editHistoryEntry}
      />

      {/* Màn hình hiển thị kết quả */}
      <Display
        display={calculatorState.display}
        expression={calculatorState.expression}
        styles={styles}
      />

      {/* Lưới các nút bấm */}
      <ButtonGrid
        calculatorState={calculatorState}
        styles={styles}
      />
    </View>
  );
};

export default Calculator;
