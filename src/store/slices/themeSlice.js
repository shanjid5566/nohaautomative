import { createSlice } from '@reduxjs/toolkit';

const getSavedTheme = () => {
  try {
    return localStorage.getItem('theme') || 'light';
  } catch {
    return 'light';
  }
};

const initialState = {
  mode: getSavedTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },

    setTheme: (state, action) => {
      const nextMode = action?.payload;
      state.mode = nextMode === 'dark' ? 'dark' : 'light';
    },

    setPrimaryColor: (state, action) => {
      // Primary color is managed via CSS @theme tokens — no JS override needed
    },
  },
});

export const { toggleTheme, setTheme, setPrimaryColor } = themeSlice.actions;
export default themeSlice.reducer;

export const selectThemeMode = (state) => state.theme.mode;
