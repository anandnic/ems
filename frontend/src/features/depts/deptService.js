import axios from 'axios'

const API_URL = '/api/depts/'


const createDept = async (deptData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, deptData, config)

  return response.data
}


const getDepts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}


const deleteDept = async (deptId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + deptId, config)

  return response.data
}

const deptService = {
  createDept,
  getDepts,
  deleteDept,
}

export default deptService
