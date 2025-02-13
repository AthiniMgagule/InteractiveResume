import React from 'react';
import { 
  Box, 
  Typography, 
  LinearProgress, 
  Grid, 
  Paper,
  useTheme,
  Fade
} from '@mui/material';

const SkillBar = ({ name, value, color }) => {
  return (
    <Fade in={true} timeout={1000}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1" fontWeight="medium">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {value}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: 'grey.100',
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
              backgroundColor: color,
            },
          }}
        />
      </Box>
    </Fade>
  );
};

const Skills = () => {
  const theme = useTheme();

  const hardSkills = [
    { name: 'Python', value: 90, color: theme.palette.primary.main },
    { name: 'ReactJS', value: 50, color: theme.palette.info.main },
    { name: 'Java', value: 70, color: theme.palette.secondary.main },
    { name: 'Lua', value: 60, color: theme.palette.warning.main },
    { name: 'C++', value: 80, color: theme.palette.success.main },
    { name: 'C', value: 75, color: theme.palette.secondary.dark },
    { name: 'JavaScript', value: 80, color: theme.palette.warning.dark },
    { name: 'HTML', value: 96, color: theme.palette.error.main },
    { name: 'CSS', value: 100, color: theme.palette.info.dark },
    { name: 'REST APIs', value: 85, color: theme.palette.success.light },
    { name: 'MySQL', value: 90, color: theme.palette.primary.dark },
    { name: 'SQLite3', value: 100, color: theme.palette.grey[700] },
    { name: 'Node.js', value: 80, color: theme.palette.success.dark }
  ];

  const softSkills = [
    { name: 'Creative Thinking', value: 90, color: theme.palette.secondary.light },
    { name: 'Analytical Thinking', value: 95, color: theme.palette.primary.light },
    { name: 'Problem Solving', value: 85, color: theme.palette.info.main },
    { name: 'Adaptability', value: 80, color: theme.palette.success.main },
    { name: 'Detail Oriented', value: 80, color: theme.palette.warning.main },
    { name: 'Team Player', value: 70, color: theme.palette.secondary.main },
    { name: 'Time Management', value: 100, color: theme.palette.primary.main }
  ];

  return (
    <Box
      id="skills"
      sx={{
        py: 8,
        px: { xs: 2, sm: 4 },
        backgroundColor: 'background.default'
      }}
    >
      <Typography
        variant="h2"
        sx={{
          mb: 6,
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'text.primary'
        }}
      >
        Technical Proficiency
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              height: '100%',
              backgroundColor: 'background.paper',
              borderRadius: 2
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                fontWeight: 'medium',
                color: 'text.primary'
              }}
            >
              Development Skills
            </Typography>
            <Box>
              {hardSkills.map((skill, index) => (
                <SkillBar
                  key={index}
                  name={skill.name}
                  value={skill.value}
                  color={skill.color}
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              height: '100%',
              backgroundColor: 'background.paper',
              borderRadius: 2
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                fontWeight: 'medium',
                color: 'text.primary'
              }}
            >
              Professional Skills
            </Typography>
            <Box>
              {softSkills.map((skill, index) => (
                <SkillBar
                  key={index}
                  name={skill.name}
                  value={skill.value}
                  color={skill.color}
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Skills;