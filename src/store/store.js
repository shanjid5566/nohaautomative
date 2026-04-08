import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import authReducer, {
  loginSuccess,
  logout,
  updateUser,
} from './slices/authSlice';
import themeReducer, { toggleTheme, setTheme } from './slices/themeSlice';
import cartReducer from './slices/cartSlice';

const listener = createListenerMiddleware();

// Auth persistence
listener.startListening({
  actionCreator: loginSuccess,
  effect: (action) => {
    const payload = action?.payload;
    if (!payload?.token || !payload?.user) {
      return;
    }
    localStorage.setItem('token', payload.token);
    localStorage.setItem('user', JSON.stringify(payload.user));
  },
});

listener.startListening({
  actionCreator: logout,
  effect: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
});

listener.startListening({
  actionCreator: updateUser,
  effect: (action, api) => {
    localStorage.setItem('user', JSON.stringify(api.getState().auth.user));
  },
});

// Theme persistence + DOM sync
listener.startListening({
  actionCreator: toggleTheme,
  effect: (action, api) => {
    const { mode } = api.getState().theme;
    localStorage.setItem('theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  },
});

listener.startListening({
  actionCreator: setTheme,
  effect: (action) => {
    const mode = action?.payload || 'light';
    localStorage.setItem('theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  },
});

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
