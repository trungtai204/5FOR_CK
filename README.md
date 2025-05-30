# 🧮 Calculator App - React Native

Ứng dụng máy tính cá nhân được xây dựng bằng React Native với Expo, đáp ứng đầy đủ yêu cầu đề thi.

## 📁 Cấu trúc thư mục

```
CalculatorApp/
├── App.js                          # Component chính của ứng dụng
├── src/
│   ├── components/                 # Các component UI
│   │   ├── Calculator.js           # Component calculator chính
│   │   ├── Header.js              # Header với nút theme và shake info
│   │   ├── Display.js             # Màn hình hiển thị kết quả
│   │   ├── History.js             # Hiển thị lịch sử tính toán
│   │   ├── Button.js              # Component nút bấm tái sử dụng
│   │   └── ButtonGrid.js          # Lưới các nút calculator
│   ├── hooks/                     # Custom hooks
│   │   ├── useCalculator.js       # Hook quản lý logic calculator
│   │   └── useTheme.js            # Hook quản lý theme
│   ├── utils/                     # Các hàm tiện ích
│   │   └── calculatorUtils.js     # Logic tính toán
│   ├── constants/                 # Hằng số
│   │   └── themes.js              # Định nghĩa light/dark theme
│   └── styles/                    # Styles
│       └── AppStyles.js           # Styles chính của app
└── README.md                      # File này
```

## ✨ Tính năng đã implement

### 🧩 Phần 1: Giao diện người dùng (UI) - 2 điểm
- ✅ Thiết kế giao diện đơn giản, thân thiện
- ✅ Màn hình hiển thị phép tính và kết quả
- ✅ Các nút số 0-9, phép toán +, -, ×, ÷, =, C, dấu chấm thập phân
- ✅ Hiển thị đẹp trên cả Android và iOS
- ✅ Responsive design cho portrait và landscape

### ⚙️ Phần 2: Xử lý chức năng - 3.5 điểm
- ✅ Xử lý chính xác các phép tính cơ bản: +, -, ×, ÷
- ✅ Hiển thị biểu thức và kết quả rõ ràng
- ✅ Validation input (không cho nhập nhiều toán tử liên tiếp)
- ✅ Xử lý chia cho 0 (không crash, hiển thị thông báo lỗi)
- ✅ Hỗ trợ số thập phân
- ✅ Nút C xóa toàn bộ phép tính
- ✅ Logic tính toán tối ưu, dễ bảo trì

### 🎁 Phần 3: Tính năng cộng thêm (Bonus) - 0.5 điểm
- ✅ Dark Mode / Light Mode toggle
- ✅ Giao diện thay đổi theo orientation (portrait ↔ landscape)
- ✅ Hiển thị lịch sử các phép tính (3 phép tính gần nhất)

### 🔥 Phần 4: Tính năng nâng cao (Bonus nâng cao) – +1 điểm
- ✅ **Vibration API**: Rung khi nhấn nút C hoặc lỗi chia cho 0
- ✅ **Gyroscope**: Lắc điện thoại để xóa calculator (shake-to-clear)

## 🚀 Cách chạy ứng dụng

1. **Cài đặt dependencies:**
   ```bash
   cd CalculatorApp
   npm install
   ```

2. **Chạy ứng dụng:**
   ```bash
   npm start
   ```

3. **Chạy trên thiết bị:**
   - Quét QR code bằng Expo Go app
   - Hoặc chạy trên simulator: `npm run ios` / `npm run android`

## 🛠️ Công nghệ sử dụng

- **React Native** với **Expo**
- **expo-haptics** - Vibration feedback
- **expo-sensors** - Gyroscope cho shake detection
- **Custom hooks** - Quản lý state và logic
- **Component-based architecture** - Dễ bảo trì và mở rộng

## 📱 Hướng dẫn sử dụng

1. **Tính toán cơ bản**: Nhấn số → toán tử → số → =
2. **Xóa**: Nhấn nút C hoặc lắc điện thoại
3. **Dark mode**: Nhấn nút 🌙 Dark / ☀️ Light
4. **Xem lịch sử**: Tự động hiển thị 3 phép tính gần nhất
5. **Shake info**: Nhấn nút 📱 để xem hướng dẫn lắc điện thoại

## 🎯 Điểm mạnh của kiến trúc

- **Modular**: Mỗi component có trách nhiệm riêng biệt
- **Reusable**: Component Button có thể tái sử dụng
- **Maintainable**: Logic tách biệt khỏi UI
- **Scalable**: Dễ dàng thêm tính năng mới
- **Clean Code**: Code có comment và tổ chức rõ ràng
