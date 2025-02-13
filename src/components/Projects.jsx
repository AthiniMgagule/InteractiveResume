import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { GitHub, OpenInNew } from "@mui/icons-material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const projects = [
  {
    title: "Kasi Kotas",
    image: "/kasikotaspreview.png",
    description:
      "Help users discover the best kota spots around Diepsloot, explore menus, and conveniently place orders for self-pickup.",
    tags: ["User UI", "Admin UI"],
    stack: ["ReactJS", "Vite", "SQLite3", "Node.js"],
    github: "https://github.com/AthiniMgagule/KasiKotas",
    demo: "https://kasikotas.netlify.app",
    status: "in-progress"
  },
  {
    title: "Secure Shellbox Chat",
    image: "/shellboxpreview.png",
    description:
      "Real-time secure chat application with end-to-end encryption and an intuitive interface.",
    tags: ["WebSockets", "Socket.IO"],
    stack: ["Java", "Encryption"],
    github: "https://github.com/AthiniMgagule/ShellboxChat",
    demo: "#",
    status: "in-progress"
  },
  {
    title: "Witsshell",
    image: "/prog5.png",
    description:
      "Features like redirection, parallel command execution, and basic command handling.",
    tags: ["WebSockets", "Socket.IO"],
    stack: ["C", "Linux", "Shell"],
    github: "https://github.com/AthiniMgagule/Witsshell",
    demo: "#",
    status: "completed"
  },
  {
    title: "Novica",
    image: "/novicapreview.png",
    description:
      "A secure platform for writers to craft, organize, and protect their work with cloud backup.",
    tags: ["AES-256 user authentication", "AWS S3", "PostgreSQL"],
    stack: ["JavaScript", "HTML", "CSS", "SQLite3", "Node.js"],
    github: "https://github.com/AthiniMgagule/Novica",
    demo: "https://nice-hill-0f4857b1e.5.azurestaticapps.net",
    status: "in-progress"
  },
  {
    title: "FundX",
    image: "/fundxpreview.png",
    description:
      "A web-based application optimizing the management of funding opportunities.",
    tags: [],
    stack: ["JavaScript", "HTML", "CSS", "SQLite3", "Node.js"],
    github: "https://github.com/AthiniMgagule/Novica",
    demo: "https://witty-wave-04f49ad0f.5.azurestaticapps.net/",
    status: "completed"
  },
];

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return {
          bgcolor: "#4caf50",
          color: "white"
        };
      case "in-progress":
        return {
          bgcolor: "#ff9800",
          color: "white"
        };
      default:
        return {
          bgcolor: "grey.500",
          color: "white"
        };
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      default:
        return "Unknown";
    }
  };

  return (
    <Card
      sx={{
        height: "500px", // Fixed height for consistent carousel
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 8,
        },
        bgcolor: "#f9f5ff",
        position: "relative",
        overflow: "hidden",
        mx: 2, // Add margin between cards
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Chip
        label={getStatusLabel(project.status)}
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 2,
          ...getStatusColor(project.status),
          fontWeight: "medium",
          textTransform: "uppercase",
          fontSize: "0.75rem",
          boxShadow: 2,
        }}
      />

      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={project.image}
          alt={project.title}
          sx={{
            height: 200,
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<GitHub />}
            href={project.github}
            target="_blank"
            sx={{ 
              bgcolor: "white",
              color: "primary.main",
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
              }
            }}
          >
            Code
          </Button>
          {project.demo !== "#" && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<OpenInNew />}
              href={project.demo}
              target="_blank"
              sx={{ 
                bgcolor: "white",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white",
                }
              }}
            >
              Demo
            </Button>
          )}
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5" component="h3" fontWeight="bold">
          {project.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          {project.description}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: "auto" }}>
          {project.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                fontWeight: "medium",
              }}
            />
          ))}
        </Box>

        <Box sx={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: 1, 
          mt: 2,
          borderTop: 1,
          borderColor: "divider",
          pt: 2
        }}>
          {project.stack.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              variant="outlined"
              size="small"
              sx={{ borderColor: "primary.main", color: "primary.main" }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const Projects = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const getSlidePercentage = () => {
    if (isMobile) return 100;  // Show 1 card on mobile
    if (isTablet) return 50;   // Show 2 cards on tablet
    return 33.33;              // Show 3 cards on desktop
  };

  return (
    <Box
      id="projects"
      sx={{
        py: 8,
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Projects
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 6 }}
        >
          Check out some of my recent work
        </Typography>

        <Box sx={{ 
          ".carousel .slide": { 
            background: "transparent",
            pt: 2, pb: 4 
          },
          ".carousel .control-dots": { 
            bottom: 0 
          },
          ".carousel .control-arrow": { 
            bgcolor: "primary.main",
            opacity: 0.8,
            '&:hover': {
              bgcolor: 'primary.dark',
              opacity: 1
            }
          }
        }}>
          <Carousel
            showArrows={true}
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={2000}
            stopOnHover={true}
            centerMode={true}
            centerSlidePercentage={getSlidePercentage()}
            swipeable={true}
            emulateTouch={true}
            selectedItem={0}
            renderArrowPrev={(clickHandler, hasPrev) =>
              hasPrev && (
                <button
                  onClick={clickHandler}
                  className="control-arrow control-prev"
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    left: 15,
                    background: '#7a4cc3',
                    opacity: 0.8,
                    border: 'none',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    cursor: 'pointer',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: isMobile ? 'none' : 'block', // Hide arrows on mobile
                  }}
                >
                  ‹
                </button>
              )
            }
            renderArrowNext={(clickHandler, hasNext) =>
              hasNext && (
                <button
                  onClick={clickHandler}
                  className="control-arrow control-next"
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    right: 15,
                    background: '#7a4cc3',
                    opacity: 0.8,
                    border: 'none',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    cursor: 'pointer',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: isMobile ? 'none' : 'block', // Hide arrows on mobile
                  }}
                >
                  ›
                </button>
              )
            }
          >
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </Carousel>
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;