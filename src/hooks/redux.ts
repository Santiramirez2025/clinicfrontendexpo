import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hooks for specific slices
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  
  return {
    ...auth,
    dispatch,
  };
};

export const usePatients = () => {
  const dispatch = useAppDispatch();
  const patients = useAppSelector((state) => state.patients);
  
  return {
    ...patients,
    dispatch,
  };
};

export const useAppointments = () => {
  const dispatch = useAppDispatch();
  const appointments = useAppSelector((state) => state.appointments);
  
  return {
    ...appointments,
    dispatch,
  };
};

export const useMedical = () => {
  const dispatch = useAppDispatch();
  const medical = useAppSelector((state) => state.medical);
  
  return {
    ...medical,
    dispatch,
  };
};

export const useSettings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  
  return {
    ...settings,
    dispatch,
  };
};
