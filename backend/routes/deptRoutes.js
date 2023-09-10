const express = require('express')
const router = express.Router()
const {
  getDepts,
  setDept,
  updateDept,
  deleteDept,
} = require('../controllers/deptController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getDepts).post(protect, setDept)
router.route('/:id').delete(protect, deleteDept).put(protect, updateDept)

module.exports = router
