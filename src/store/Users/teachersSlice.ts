// authSlice.ts
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  teachers: null,
};

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    setTeachers: (state, action) => {
      state.teachers = action.payload;
    }
  },
});

export default teachersSlice.reducer;
