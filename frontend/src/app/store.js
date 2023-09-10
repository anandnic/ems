import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import deptReducer from '../features/depts/deptSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    depts: deptReducer,
  },
})
