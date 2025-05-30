import React from 'react';
import { View, Text } from 'react-native';

/**
 * Component Display hiển thị biểu thức và kết quả tính toán
 * @param {string} display - Giá trị hiển thị (kết quả)
 * @param {string} expression - Biểu thức hiện tại
 * @param {object} styles - Styles object
 */
const Display = ({ display, expression, styles }) => {
  return (
    <View style={styles.displayContainer}>
      {/* Hiển thị biểu thức */}
      {expression && (
        <Text
          style={[styles.expression, { fontSize: 24, marginBottom: 8 }]}
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          {expression}
        </Text>
      )}

      {/* Hiển thị kết quả */}
      <Text
        style={[styles.display, { fontSize: 48, fontWeight: 'bold' }]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {display}
      </Text>
    </View>
  );
};

export default Display;
