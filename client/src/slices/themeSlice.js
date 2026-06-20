import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkMode: localStorage.getItem('darkMode') === 'true'? true : false
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode =!state.darkMode
      localStorage.setItem('darkMode', state.darkMode)
      
      // WHY: Add/remove 'dark' class on <html> tag for Tailwind
      if (state.darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload
      localStorage.setItem('darkMode', action.payload)
      if (action.payload) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  },
})

export const { toggleDarkMode, setDarkMode } = themeSlice.actions
export default themeSlice.reducer