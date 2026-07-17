import { createTheme } from "@mui/material/styles";

const rootTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0068Ab",
    },
    secondary: {
      main: "#ee7623",
    },
    error: {
      main: "#c73f3f",
    },
  },
  components: {
    MuiList: {
      defaultProps: {
        dense: true,
      },
    },
    MuiMenuItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", Arial, san-serif',
    fontSize: 14,
    h4: { fontFamily: '"Roboto", Arial, san-serif' },
    h6: { fontFamily: '"Roboto", Arial, san-serif', fontSize: 12 },
    h5: { fontFamily: '"Roboto", Arial, san-serif' },
    subtitle2: { fontSize: 4, fontFamily: '"Roboto", Arial, san-serif' },
  },
});

export default rootTheme;
