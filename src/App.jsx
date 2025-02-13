import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
// import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
// import ThemeToggle from "./components/ThemeToggle";
// import ProgressBar from "./components/ProgressBar";
// import MissionStatement from "./components/MissionStatement";

console.log("App is rendering");

const App = () => {
  console.log("App component is rendering");
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent global styles */}
      {/* <ThemeToggle />
      <ProgressBar /> */}
      <Header />
      {/* <MissionStatement />*/}
      <About />
      <Projects />
      <Skills />
      {/* <Timeline /> */}
      <Contact /> 
    </ThemeProvider>
    
  );
};

export default App;
