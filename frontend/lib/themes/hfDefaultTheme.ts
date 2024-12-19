import { createTheme } from '@mui/material/styles';
import { red, grey, blue } from '@mui/material/colors';
const appBarBlue = '#225A89';

export const hfTheme = createTheme(
{
  palette: 
  {
    primary: {
      main: appBarBlue, 
      light: blue[300],
    },
    secondary: {
      main: grey[900],
      light: grey[600],
    },
    error: {
      main: red.A400,
      light: red[300],
    }
  },
  typography: {
    fontFamily: 'Raleway, Arial',
    fontSize: 14,
    h1: {
        fontSize: 10
    },
    h6: {
        textAlign: "center",
        fontSize: 13,
        fontFamily: "Roboto",
    }    
  },
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: appBarBlue, 
          paddingTop: 0,
          paddingBottom: 0,
          color: "white",
          fontSize: "13px",
          fontFamily: "Arial",
          fontWeight: 500,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          my: 2,
          backgroundColor: appBarBlue, 
          color: 'white',
          fontSize: 14,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: appBarBlue, 
          color: appBarBlue,
          fontSize: 14,
        },
      },
    },
  },
});
