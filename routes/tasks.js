
const express = require('express');
const router = express.Router();
const service = require('../services/taskService');

// API Lấy danh sách nhiệm vụ
router.get('/queryTaskList', service.queryTaskList);

// API Thêm mới nhiệm vụ
router.post('/addTask', service.addTask);

// API Chỉnh sửa nội dung nhiệm vụ
router.put('/editTask', service.editTask);

// API Cập nhật trạng thái nhiệm vụ (Hoàn thành / Chưa hoàn thành)
router.put('/updateTaskStatus', service.updateTaskStatus);

// API Đánh dấu / Bỏ đánh dấu sao quan trọng (Red star)
router.put('/updateMark', service.updateMark);

// API Xóa nhiệm vụ
router.delete('/deleteTask', service.deleteTask);

module.exports = router;

