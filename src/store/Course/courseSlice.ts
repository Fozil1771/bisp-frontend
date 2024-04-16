// authSlice.ts
import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  course_list: [],
  featured_courses: [],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.course_list = action.payload;
      state.featured_courses = action.payload.filter(course => course.isFeatured);
    },
  },
});

export default coursesSlice.reducer;
