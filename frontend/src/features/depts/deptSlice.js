import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import deptService from './deptService'

const initialState = {
  depts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


export const createDept = createAsyncThunk(
  'depts/create',
  async (deptData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await deptService.createDept(deptData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const getDepts = createAsyncThunk(
  'depts/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await deptService.getDepts(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const deleteDept = createAsyncThunk(
  'depts/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await deptService.deleteDept(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deptSlice = createSlice({
  name: 'dept',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDept.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createDept.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.depts.push(action.payload)
      })
      .addCase(createDept.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getDepts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDepts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.depts = action.payload
      })
      .addCase(getDepts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteDept.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteDept.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.depts = state.depts.filter(
          (dept) => dept._id !== action.payload.id
        )
      })
      .addCase(deleteDept.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = deptSlice.actions
export default deptSlice.reducer
