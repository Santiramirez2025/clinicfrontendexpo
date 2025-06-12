import { createSlice } from '@reduxjs/toolkit';
const initialState = { patients: [], loading: false };
const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {}
});
export default patientSlice.reducer;
