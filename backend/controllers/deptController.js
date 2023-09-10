const asyncHandler = require('express-async-handler')

const Dept = require('../models/deptModel')
const User = require('../models/userModel')


const getDepts = asyncHandler(async (req, res) => {
  const depts = await Dept.find({ user: req.user.id })

  res.status(200).json(depts)
})


const setDept = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a department')
  }

  const dept = await Dept.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(dept)
})


const updateDept = asyncHandler(async (req, res) => {
  const dept = await Dept.findById(req.params.id)

  if (!dept) {
    res.status(400)
    throw new Error('Department not found')
  }


  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

 
  if (dept.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedDept = await Dept.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedDept)
})


const deleteDept = asyncHandler(async (req, res) => {
  const dept = await Dept.findById(req.params.id)

  if (!dept) {
    res.status(400)
    throw new Error('Department not found')
  }


  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }


  if (dept.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await dept.deleteOne()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getDepts,
  setDept,
  updateDept,
  deleteDept,
}
