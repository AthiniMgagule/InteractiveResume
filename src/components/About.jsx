import { Container, Grid, Typography, Box, Avatar, Button, Paper } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import DownloadIcon from "@mui/icons-material/Download";

const About = () => {
  return (
    <Container id="about" sx={{ mt: 6 }}>
      {/* Section Title */}
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        About Me
      </Typography>

      <Grid container spacing={4} alignItems="center">
        {/* Profile Image */}
        <Grid item xs={12} md={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            src="/prog2.jpg"
            alt="Athini Mgagule"
            sx={{ width: 200, height: 200, border: "4px solid #7a4cc3" }}
          />
        </Grid>

        {/* About Text */}
        <Grid item xs={12} md={7}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            I am a passionate Computer Science graduate with a strong drive to create innovative technological solutions.
            My expertise lies in developing robust software applications, with a particular focus on system design and problem-solving.
          </Typography>

          {/* Highlights */}
          <Grid container spacing={3}>
            {/* Education Section */}
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
                <SchoolIcon color="primary" fontSize="large" />
                <Box>
                  <Typography variant="h6" fontWeight="bold">Education</Typography>
                  <Typography>BSc in Computer Science and Mathematics</Typography>
                  <Typography>University of Witwatersrand</Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Education Section */}
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
                <SchoolIcon color="primary" fontSize="large" />
                <Box>
                  
                  <Typography>National Senior Certificate</Typography>
                  <Typography>Leap Science and Maths School</Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Certification Section */}
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
                <WorkspacePremiumIcon color="secondary" fontSize="large" />
                <Box>
                  <Typography>HP LIFE - Data Science and Analysis Certificate of Completion</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Download Resume Button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            sx={{ mt: 3 }}
            href="/assets/AM latest CV.pdf"
            download
          >
            Download Resume
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;