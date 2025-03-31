import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    setUser: (state, action) => action.payload,  
    clearUser: () => null,                
  },
});

export const { setUser, clearUser } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
