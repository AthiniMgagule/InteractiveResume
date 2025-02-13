import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#7a4cc3" },
    secondary: { main: "#b788f7" },
    background: { default: "#f4f4f4", paper: "#ffffff" },
    text: { primary: "#333", secondary: "#7a4cc3" },
  },
  typography: {
    fontFamily: "'Arial', sans-serif",
    h1: { fontSize: "2.5rem", fontWeight: "bold" },
    h2: { fontSize: "2rem", fontWeight: "bold" },
    h3: { fontSize: "1.75rem", fontWeight: "bold" },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
