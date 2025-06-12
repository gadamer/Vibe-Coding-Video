// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
    }
  });
});

// Form submission
const joinForm = document.getElementById('join-form');
if (joinForm) {
  joinForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    
    // In a real application, you would send this to your backend
    console.log('Form submitted with email:', email);
    
    // Show success message
    this.innerHTML = '<p class="success-message">Thanks for joining! Check your email for confirmation.</p>';
  });
}

// Animate elements on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.about-image, .feature, .testimonial-card, .join-card, .video-container');
  
  elements.forEach(element => {
    if (!element) return; // Skip if element doesn't exist
    
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.about-image, .feature, .testimonial-card, .join-card, .video-container');
  
  elements.forEach(element => {
    if (!element) return; // Skip if element doesn't exist
    
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Trigger initial check
  animateOnScroll();
  
  // Show loading indicator while YouTube API loads
  const youtubePlayer = document.getElementById('youtube-player');
  if (youtubePlayer) {
    youtubePlayer.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100%; position: absolute; width: 100%;"><div class="loading-spinner"></div></div>';
  }
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// YouTube API integration
let player;
function onYouTubeIframeAPIReady() {
  const youtubePlayer = document.getElementById('youtube-player');
  
  if (!youtubePlayer) {
    console.error('YouTube player container not found');
    return;
  }
  
  // Clear loading indicator
  youtubePlayer.innerHTML = '';
  
  // Create player
  player = new YT.Player('youtube-player', {
    videoId: 'jfKfPfyJRdk', // Lofi Coding Session
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
      playsinline: 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  
  console.log('YouTube player initialized');
}

function onPlayerReady(event) {
  console.log('YouTube player ready');
  // You can auto-play here if needed
  // event.target.playVideo();
}

function onPlayerStateChange(event) {
  // Track player state changes if needed
  // 0 = ended, 1 = playing, 2 = paused, 3 = buffering, 5 = video cued
  console.log('Player state changed:', event.data);
}

// Add page load performance optimization
window.addEventListener('load', () => {
  // Defer non-critical resources
  setTimeout(() => {
    try {
      // Preload additional resources if needed
      const preloadLinks = [
        { rel: 'preconnect', href: 'https://www.youtube.com' },
        { rel: 'preconnect', href: 'https://www.google-analytics.com' }
      ];
      
      preloadLinks.forEach(link => {
        const preloadLink = document.createElement('link');
        preloadLink.rel = link.rel;
        preloadLink.href = link.href;
        document.head.appendChild(preloadLink);
      });
      
      console.log('Resources preloaded successfully');
      
      // Initialize analytics (placeholder for production)
      console.log('Analytics initialized');
    } catch (error) {
      console.error('Error preloading resources:', error);
    }
  }, 1000);
  
  // Log page load complete
  console.log('Page fully loaded');
});

// Add production-ready error handling
window.addEventListener('error', function(e) {
  console.error('Global error caught:', e.message);
  // In production, you would send this to your error tracking service
});
