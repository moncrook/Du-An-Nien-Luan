/**
 * 描述: 业务逻辑处理 - 任务相关接口
 * 作者: Jack Chen
 * 日期: 2020-06-20
*/

const { querySql, queryOne } = require('../utils/index');
const boom = require('boom');
const { validationResult } = require('express-validator');
const { 
  CODE_ERROR,
  CODE_SUCCESS 
} = require('../utils/constant'); // Đã xóa PRIVATE_KEY và JWT_EXPIRED

// Đã xóa jwt và decode không sử dụng

// Truy vấn danh sách nhiệm vụ (Tasks)
function queryTaskList(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
    let { pageSize, pageNo, status } = req.query;
    pageSize = pageSize ? pageSize : 1;
    pageNo = pageNo ? pageNo : 1;
    status = (status || status == 0) ? status : null;

    let query = `select d.id, d.title, d.content, d.status, d.is_major, d.gmt_create, d.gmt_expire from sys_task d`;
    querySql(query)
    .then(data => {
      if (!data || data.length === 0) {
        res.json({ 
          code: CODE_ERROR, 
          msg: 'Không có dữ liệu', 
          data: null 
        })
      } else {
        let total = data.length; 
        let n = (pageNo - 1) * pageSize;

        if (status) {
          let query_1 = `select d.id, d.title, d.content, d.status, d.is_major, d.gmt_create, d.gmt_expire from sys_task d where status='${status}' order by d.gmt_create desc`;
          querySql(query_1)
          .then(result_1 => {
            console.log('Phân trang 1===', result_1);
            if (!result_1 || result_1.length === 0) {
              res.json({ 
                code: CODE_SUCCESS, 
                msg: 'Không có dữ liệu', 
                data: null 
              })
            } else {
              let query_2 = query_1 + ` limit ${n} , ${pageSize}`;
              querySql(query_2)
              .then(result_2 => {
                console.log('Phân trang 2===', result_2);
                if (!result_2 || result_2.length === 0) {
                  res.json({ 
                    code: CODE_SUCCESS, 
                    msg: 'Không có dữ liệu', 
                    data: null 
                  })
                } else {
                  res.json({ 
                    code: CODE_SUCCESS, 
                    msg: 'Lấy dữ liệu thành công', 
                    data: {
                      rows: result_2,
                      total: result_1.length,
                      pageNo: parseInt(pageNo),
                      pageSize: parseInt(pageSize),
                    } 
                  })
                }
              })
            }
          })
        } else {
          let query_3 = query + ` order by d.gmt_create desc limit ${n} , ${pageSize}`;
          querySql(query_3)
          .then(result_3 => {
            console.log('Phân trang 2===', result_3);
            if (!result_3 || result_3.length === 0) {
              res.json({ 
                code: CODE_SUCCESS, 
                msg: 'Không có dữ liệu', 
                data: null 
              })
            } else {
              res.json({ 
                code: CODE_SUCCESS, 
                msg: 'Lấy dữ liệu thành công', 
                data: {
                  rows: result_3,
                  total: total,
                  pageNo: parseInt(pageNo),
                  pageSize: parseInt(pageSize),
                } 
              })
            }
          })
        }
      }
    })
  }
}

// Thêm mới nhiệm vụ
function addTask(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
    let { title, content, gmt_expire } = req.body;
    findTask(title, 1)
    .then(task => {
      if (task) {
        res.json({ 
          code: CODE_ERROR, 
          msg: 'Tên nhiệm vụ không được trùng lặp', 
          data: null 
        })
      } else {
        const query = `insert into sys_task(title, content, status, is_major, gmt_expire) values('${title}', '${content}', 0, 0, '${gmt_expire}')`;
        querySql(query)
        .then(data => {
          if (!data || data.length === 0) {
            res.json({ 
              code: CODE_ERROR, 
              msg: 'Thêm dữ liệu thất bại', 
              data: null 
            })
          } else {
            res.json({ 
              code: CODE_SUCCESS, 
              msg: 'Thêm dữ liệu thành công', 
              data: null 
            })
          }
        })
      }
    })

  }
}

// Chỉnh sửa nhiệm vụ
function editTask(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
    let { id, title, content, gmt_expire } = req.body;
    findTask(id, 2)
    .then(task => {
      if (task) {
        findTask(title, 1)
        .then(result => {
          if (result) {
            res.json({ 
              code: CODE_ERROR, 
              msg: 'Tên nhiệm vụ không được trùng lặp', 
              data: null 
            })
          } else {
            const query = `update sys_task set title='${title}', content='${content}', gmt_expire='${gmt_expire}' where id='${id}'`;
            querySql(query)
            .then(data => {
              if (!data || data.length === 0) {
                res.json({ 
                  code: CODE_ERROR, 
                  msg: 'Cập nhật dữ liệu thất bại', 
                  data: null 
                })
              } else {
                res.json({ 
                  code: CODE_SUCCESS, 
                  msg: 'Cập nhật dữ liệu thành công', 
                  data: null 
                })
              }
            })
          }
        })
      } else {
        res.json({ 
          code: CODE_ERROR, 
          msg: 'Tham số không hợp lệ hoặc dữ liệu không tồn tại', 
          data: null 
        })
      }
    })

  }
}

// Cập nhật trạng thái nhiệm vụ
function updateTaskStatus(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
    let { id, status } = req.body;
    findTask(id, 2)
    .then(task => {
      if (task) {
        const query = `update sys_task set status='${status}' where id='${id}'`;
        querySql(query)
        .then(data => {
          if (!data || data.length === 0) {
            res.json({ 
              code: CODE_ERROR, 
              msg: 'Thao tác dữ liệu thất bại', 
              data: null 
            })
          } else {
            res.json({ 
              code: CODE_SUCCESS, 
              msg: 'Thao tác dữ liệu thành công', 
              data: null 
            })
          }
        })
      } else {
        res.json({ 
          code: CODE_ERROR, 
          msg: 'Tham số không hợp lệ hoặc dữ liệu không tồn tại', 
          data: null 
        })
      }
    })

  }
}

// Đánh dấu / Bỏ đánh dấu sao quan trọng (Red star)
function updateMark(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
    let { id, is_major } = req.body;
    findTask(id, 2)
    .then(task => {
      if (task) {
        const query = `update sys_task set is_major='${is_major}' where id='${id}'`;
        querySql(query)
        .then(data => {
          if (!data || data.length === 0) {
            res.json({ 
              code: CODE_ERROR, 
              msg: 'Thao tác dữ liệu thất bại', 
              data: null 
            })
          } else {
            res.json({ 
              code: CODE_SUCCESS, 
              msg: 'Thao tác dữ liệu thành công', 
              data: null 
            })
          }
        })
      } else {
        res.json({ 
          code: CODE_ERROR, 
          msg: 'Tham số không hợp lệ hoặc dữ liệu không tồn tại', 
          data: null 
        })
      }
    })

  }
}

// Xóa nhiệm vụ
function deleteTask(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
    let { id, status } = req.body;
    findTask(id, 2)
    .then(task => {
      if (task) {
        const query = `update sys_task set status='${status}' where id='${id}'`;
        querySql(query)
        .then(data => {
          if (!data || data.length === 0) {
            res.json({ 
              code: CODE_ERROR, 
              msg: 'Xóa dữ liệu thất bại', 
              data: null 
            })
          } else {
            res.json({ 
              code: CODE_SUCCESS, 
              msg: 'Xóa dữ liệu thành công', 
              data: null 
            })
          }
        })
      } else {
        res.json({ 
          code: CODE_ERROR, 
          msg: 'Dữ liệu không tồn tại', 
          data: null 
        })
      }
    })

  }
}

// Kiểm tra dữ liệu có tồn tại hay không thông qua tên nhiệm vụ hoặc ID
function findTask(param, type) {
  let query; // Đã bỏ khởi tạo '= null' để hết lỗi no-useless-assignment
  if (type == 1) { // 1: Trường hợp Thêm mới, 2: Trường hợp Chỉnh sửa/Xóa
    query = `select id, title from sys_task where title='${param}'`;
  } else {
    query = `select id, title from sys_task where id='${param}'`;
  }
  return queryOne(query);
}

module.exports = {
  queryTaskList,
  addTask,
  editTask,
  updateTaskStatus,
  updateMark,
  deleteTask
}