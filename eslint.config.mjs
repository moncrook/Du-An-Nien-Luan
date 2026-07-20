import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest, // Nạp sẵn biến môi trường Jest (describe, test, expect, jest...)
      },
    },
    rules: {
      'no-unused-vars': 'warn', // Cảnh báo thay vì báo lỗi dừng chương trình khi thừa biến
    },
  },
  {
    // Bỏ qua kiểm tra thư mục node_modules và coverage
    ignores: ['node_modules/', 'coverage/'],
  },
];