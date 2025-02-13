import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, Button, Container } from "@mui/material";

const titles = [
  "a Software Developer",
  "an aspiring Data Analyst",
  "an aspiring Cybersecurity Specialist",
];

const Header = () => {
  const [displayText, setDisplayText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentTitle = titles[titleIndex];

    const updateText = () => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText((prev) => currentTitle.slice(0, prev.length + 1));
          timer = setTimeout(updateText, 100);
        } else {
          setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText((prev) => currentTitle.slice(0, prev.length - 1));
          timer = setTimeout(updateText, 50); // Speed of deletion
        } else {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    };

    // Start the typing effect
    updateText();

    // Cleanup the timer on component unmount or title change
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <AppBar position="static" sx={{ background: "linear-gradient(to right, #7a4cc3, #b788f7)", p: 2 }}>
      <Container>
        <Toolbar sx={{ flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold">
            ATHINI MGAGULE
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", fontSize: "1.5rem", fontWeight: "bold", mt: 1 }}>
            <Typography>I am&nbsp;</Typography>
            <Typography color="secondary">{displayText}</Typography>
            <Box sx={{ width: "8px", height: "24px", bgcolor: "white", animation: "blink 1s infinite" }} />
          </Box>
          <Box sx={{ mt: 2 }}>
            {["About", "Skills", "Timeline", "Projects", "Contact"].map((item) => (
              <Button key={item} sx={{ color: "white", mx: 1 }} href={`#${item.toLowerCase()}`}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
