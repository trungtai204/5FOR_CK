import React, { useState } from 'react';
import { View, Modal, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import Header from './Header';
import History from './History';
import Display from './Display';
import ButtonGrid from './ButtonGrid';
import Button from './Button';

/**
 * Component Calculator chính - tổng hợp tất cả các component con
 * @param {object} calculatorState - State của calculator
 * @param {object} themeState - State của theme
 * @param {object} styles - Styles object
 */
const Calculator = ({ calculatorState, themeState, styles }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [isScientific, setIsScientific] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* Header với nút toggle theme và nút lịch sử */}
      <Header
        themeState={themeState}
        styles={styles}
        onShowHistory={() => setShowHistory(true)}
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
        isScientific={isScientific}
        setIsScientific={setIsScientific}
      />

      {/* Lịch sử tính toán dưới dạng Modal */}
      <Modal visible={showHistory} animationType="slide" onRequestClose={() => setShowHistory(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: styles.historyContainer?.backgroundColor || '#fff' }}>
          {/* Nút Quay lại ở đầu modal */}
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: styles.historyContainer?.backgroundColor || '#fff' }}>
            <TouchableOpacity
              style={styles.themeButton}
              onPress={() => setShowHistory(false)}
            >
              <Text style={styles.themeButtonText}>←</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Header themeState={themeState} styles={styles} />
            </View>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 12, paddingTop: 8 }}>
            <History
              history={calculatorState.history}
              styles={styles}
              onDelete={calculatorState.deleteHistoryEntry}
              onEdit={calculatorState.editHistoryEntry}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default Calculator;
