import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#c5a059', // Gold from previous design
    },
    secondary: {
      main: '#741b1b', // Burgundy
    },
    background: {
      default: mode === 'light' ? '#fdfbf7' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: 'Georgia, serif' },
    h2: { fontFamily: 'Georgia, serif' },
    h3: { fontFamily: 'Georgia, serif' },
  },
});
