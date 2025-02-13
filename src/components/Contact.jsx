import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Email, LinkedIn, GitHub } from '@mui/icons-material';

const Contact = () => {
  return (
    <Box id="contact" sx={{ textAlign: "center", py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Contact Me
      </Typography>
      
      <Box className="contact-icons" sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
        {/* Email Icon */}
        <IconButton
          component="a"
          href="mailto:athi200308@gmail.com"
          target="_blank"
          sx={{
            backgroundColor: "#7a4cc3", // Purple background
            color: "white",
            "&:hover": {
              backgroundColor: "#5a3a99", // Darker purple for hover
            },
          }}
        >
          <Email />
        </IconButton>

        {/* LinkedIn Icon */}
        <IconButton
          component="a"
          href="https://linkedin.com/in/athini-mgagule-8b8b362b2"
          target="_blank"
          sx={{
            backgroundColor: "#7a4cc3", // Purple background
            color: "white",
            "&:hover": {
              backgroundColor: "#5a3a99", // Darker purple for hover
            },
          }}
        >
          <LinkedIn />
        </IconButton>

        {/* GitHub Icon */}
        <IconButton
          component="a"
          href="https://github.com/AthiniMgagule"
          target="_blank"
          sx={{
            backgroundColor: "#7a4cc3", // Purple background
            color: "white",
            "&:hover": {
              backgroundColor: "#5a3a99", // Darker purple for hover
            },
          }}
        >
          <GitHub />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Contact;