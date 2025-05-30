import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { calculate, createHistoryEntry } from '../utils/calculatorUtils';

/**
 * Component History hiển thị lịch sử tính toán
 * @param {array} history - Mảng lịch sử tính toán
 * @param {object} styles - Styles object
 * @param {function} onDelete - Hàm xóa entry
 * @param {function} onEdit - Hàm sửa entry
 */
const History = ({ history, styles, onDelete, onEdit }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  if (history.length === 0) {
    return null;
  }

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>Lịch sử / History:</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {history.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                setEditIndex(index);
                // Lấy phần biểu thức trước dấu = nếu có
                const expr = item.split('=')[0].trim();
                setEditValue(expr);
              }}
            >
              <Text style={styles.historyItem}>{item}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(index)}>
              <Text style={{ color: 'red', marginLeft: 8 }}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {/* Modal sửa */}
      <Modal visible={editIndex !== null} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000099' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text>Sửa phép tính:</Text>
            <TextInput
              value={editValue}
              onChangeText={setEditValue}
              style={{ borderWidth: 1, borderColor: '#ccc', marginVertical: 10, padding: 5 }}
              placeholder="Ví dụ: 9 + 5"
            />
            <Button
              title="Cập nhật"
              onPress={() => {
                // Regex: số phép toán số, VD: 9 + 5
                const match = editValue.match(/^\s*(-?\d+(?:\.\d+)?)\s*([+\-×÷])\s*(-?\d+(?:\.\d+)?)\s*$/);
                if (match) {
                  const first = parseFloat(match[1]);
                  const operator = match[2];
                  const second = parseFloat(match[3]);
                  const result = calculate(first, second, operator);
                  const newEntry = createHistoryEntry(first, operator, second, result);
                  onEdit(editIndex, newEntry);
                  setEditIndex(null);
                } else {
                  Alert.alert('Lỗi', 'Vui lòng nhập đúng định dạng: số phép toán số (VD: 9 + 5)');
                }
              }}
            />
            <Button title="Hủy" color="gray" onPress={() => setEditIndex(null)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default History;
