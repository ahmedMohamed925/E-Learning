import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCourses } from '../../api/courses.js';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCourses();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        // Handle both array and object responses
        const payload = action.payload;
        if (Array.isArray(payload)) {
          state.list = payload;
        } else if (payload && Array.isArray(payload.courses)) {
          state.list = payload.courses;
        } else if (payload && payload.data && Array.isArray(payload.data)) {
          state.list = payload.data;
        } else {
          console.warn('Unexpected courses response format:', payload);
          state.list = [];
        }
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = coursesSlice.actions;
export default coursesSlice.reducer;