import { createSlice } from '@reduxjs/toolkit';
const initialState = { records: [], loading: false };
const medicalSlice = createSlice({
  name: 'medical',
  initialState,
  reducers: {}
});
export default medicalSlice.reducer;
