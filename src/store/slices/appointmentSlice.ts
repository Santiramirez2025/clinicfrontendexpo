import { createSlice } from '@reduxjs/toolkit';
const initialState = { appointments: [], loading: false };
const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {}
});
export default appointmentSlice.reducer;
