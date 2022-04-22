import { createTheme } from '@mui/material/styles'

export const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#d0530b',
    },
    secondary: {
      main: '#eec81d',
    },
  },
}

export const theme = createTheme(themeOptions)
