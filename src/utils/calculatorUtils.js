/**
 * Các hàm tiện ích cho Calculator
 * Xử lý logic tính toán cơ bản
 */

/**
 * Thực hiện phép tính dựa trên toán tử
 * @param {number} firstValue - Giá trị đầu tiên
 * @param {number} secondValue - Giá trị thứ hai  
 * @param {string} operation - Toán tử (+, -, ×, ÷, =)
 * @returns {number} - Kết quả phép tính
 */
export const calculate = (firstValue, secondValue, operation) => {
  switch (operation) {
    case '+':
      return firstValue + secondValue;
    case '-':
      return firstValue - secondValue;
    case '×':
      return firstValue * secondValue;
    case '÷':
      return firstValue / secondValue;
    case '=':
      return secondValue;
    default:
      return secondValue;
  }
};

/**
 * Kiểm tra xem có phải phép chia cho 0 không
 * @param {string} operation - Toán tử
 * @param {number} value - Giá trị để kiểm tra
 * @returns {boolean} - True nếu là chia cho 0
 */
export const isDivisionByZero = (operation, value) => {
  return operation === '÷' && value === 0;
};

/**
 * Format số để hiển thị (loại bỏ số 0 thừa)
 * @param {number} number - Số cần format
 * @returns {string} - Số đã được format
 */
export const formatNumber = (number) => {
  if (number % 1 === 0) {
    return number.toString();
  }
  return parseFloat(number.toFixed(10)).toString();
};

/**
 * Tạo entry cho lịch sử tính toán
 * @param {number} firstValue - Giá trị đầu
 * @param {string} operation - Toán tử
 * @param {number} secondValue - Giá trị thứ hai
 * @param {number} result - Kết quả
 * @returns {string} - Chuỗi lịch sử
 */
export const createHistoryEntry = (firstValue, operation, secondValue, result) => {
  return `${formatNumber(firstValue)} ${operation} ${formatNumber(secondValue)} = ${formatNumber(result)}`;
};
