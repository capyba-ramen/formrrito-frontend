import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#22211F',
    },
    secondary: {
      main: '#F8F8F8',
      light: '#FFEFBE',
      contrastText: '#FF4B4B',
    },
  },
});

theme.shadows[1] = '0 2px 9px 0 rgba(0, 0, 0, 0.1)';

export default theme;
