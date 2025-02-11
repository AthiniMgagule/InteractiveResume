document.addEventListener('DOMContentLoaded', () => {
    // script for the projects section
    const container = document.querySelector('.projects-container');
    const cards = document.querySelectorAll('.project-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    let currentIndex = 0;
  
    function updateSlider(index) {
      // Update cards
      cards.forEach(card => {
        card.classList.remove('active');
        card.style.transform = `translateX(-${index * 100}%)`;
      });
      cards[index].classList.add('active');
  
      // Update dots
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    }
  
    // Event listeners
    prevBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateSlider(currentIndex);
    });
  
    nextBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateSlider(currentIndex);
    });
  
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider(currentIndex);
      });
    });
  
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
  
    container.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });
  
    container.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
  
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left
          currentIndex = (currentIndex + 1) % cards.length;
        } else {
          // Swipe right
          currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        }
        updateSlider(currentIndex);
      }
    }
  
    // Auto-advance slider
    setInterval(() => {
      if (!document.hidden) {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider(currentIndex);
      }
    }, 5000);

    // script for the skills section
    const skillBars = document.querySelectorAll('.skill-bar');

    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        const skillBar = entry.target;
        const skillFill = skillBar.querySelector('.skill-bar-fill');
        
        // Remove loading state
        skillBar.classList.remove('loading');
        
        // Add animation class
        skillBar.classList.add('animate');
        
        // Set the width based on the data attribute
        const skillLevel = skillFill.style.width;
        skillFill.style.transform = 'translateX(0)';
        skillFill.style.width = skillLevel;
        
        // Stop observing this element
        observer.unobserve(skillBar);
        }
    });
    }, {
    threshold: 0.2, // Trigger when 20% of the element is visible
    rootMargin: '50px' // Start animation slightly before the element comes into view
    });

    // Start observing all skill bars
    skillBars.forEach(bar => {
    // Add loading state
    bar.classList.add('loading');
    
    // Start observing
    observer.observe(bar);
    });

    //script for education timeline section
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.setProperty('--delay', index);
      });
      
      document.querySelectorAll('.timeline-item').forEach(item => {
        const expandButton = item.querySelector('.timeline-expand');
        expandButton.addEventListener('click', () => {
          item.classList.toggle('active');
          const icon = expandButton.querySelector('i');
          icon.classList.toggle('fa-chevron-down');
          icon.classList.toggle('fa-chevron-up');
        });
      });
  
      document.querySelectorAll('.module-header').forEach((header) => {
      header.addEventListener('click', () => {
        const details = header.nextElementSibling;
        const isVisible = details.style.display === 'block';
        details.style.display = isVisible ? 'none' : 'block';
      });
    });
    
    // Create an intersection observer for project cards
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            projectObserver.unobserve(entry.target);
        }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Dark Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
      document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
      icon.classList.toggle('fa-moon');
      icon.classList.toggle('fa-sun');
      localStorage.setItem('theme', document.body.dataset.theme);
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.dataset.theme = savedTheme;
      if (savedTheme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
      }
    }
    
    // Progress Bar
  const progressBar = document.querySelector('.progress-fill');
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / fullHeight) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Update active section in navigation
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
        document.querySelectorAll('nav a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});

