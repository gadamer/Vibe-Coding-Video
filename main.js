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

  // Initialize video player
  initializeVideoPlayer();
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Add page load performance optimization
window.addEventListener('load', () => {
  // Defer non-critical resources
  setTimeout(() => {
    try {
      // Preload additional resources if needed
      const preloadLinks = [
        { rel: 'preconnect', href: 'https://cdn.plyr.io' },
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

// Video data - multiple options that are globally available
const videoOptions = [
  {
    id: 'coding-with-ai',
    title: 'How to Code with AI (For Complete Beginners)',
    description: 'Learn how to create applications without coding knowledge using AI tools.',
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=300',
    youtubeUrl: 'https://www.youtube.com/watch?v=VUN-EgQUzjM'
  },
  {
    id: 'ai-programming-basics',
    title: 'AI Programming Basics',
    description: 'The fundamentals of using AI to write code for you.',
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300',
    youtubeUrl: 'https://www.youtube.com/watch?v=Elb5aRGnJbM'
  },
  {
    id: 'chatgpt-coding',
    title: 'Coding with ChatGPT',
    description: 'How to use ChatGPT to build applications from scratch.',
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=300',
    youtubeUrl: 'https://www.youtube.com/watch?v=FlGdGXB9Jw0'
  }
];

// Initialize video player with multiple options
function initializeVideoPlayer() {
  const videoContainer = document.getElementById('video-container');
  const loadingIndicator = document.getElementById('loading-indicator');
  const videoOptionsContainer = document.getElementById('video-options');
  
  if (!videoContainer || !loadingIndicator || !videoOptionsContainer) return;
  
  // Try to load the first video
  loadVideo(videoOptions[0], videoContainer, loadingIndicator, videoOptionsContainer);
  
  // Create video selection options
  createVideoOptions(videoOptionsContainer, videoContainer, loadingIndicator);
}

// Load a specific video
function loadVideo(videoData, container, loadingElement, optionsContainer) {
  // Clear container except loading indicator
  Array.from(container.children).forEach(child => {
    if (child !== loadingElement) {
      child.remove();
    }
  });
  
  // Show loading indicator
  if (loadingElement) {
    loadingElement.style.display = 'flex';
  }
  
  // Create video element
  const video = document.createElement('video');
  video.className = 'js-player';
  video.poster = videoData.thumbnail;
  video.controls = true;
  video.style.width = '100%';
  video.style.display = 'none'; // Hide until loaded
  
  // Create source element
  const source = document.createElement('source');
  source.src = videoData.source;
  source.type = 'video/mp4';
  
  // Add fallback text
  const fallbackText = document.createTextNode('Your browser does not support the video tag.');
  
  // Assemble video element
  video.appendChild(source);
  video.appendChild(fallbackText);
  
  // Add to container
  container.appendChild(video);
  
  // Initialize Plyr
  const player = new Plyr(video, {
    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
    settings: ['captions', 'quality', 'speed'],
    blankVideo: 'data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAFttZGF0AAAAMmWIhD///8PAnFAAFPf3333331111111111111111111111111111111111111111114TTEtTKmEIZU4Q11AUXxdgIfR8uIBEEEEEEEEE11//vSbs8c5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63//w+M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jFP/j63///8M5jjP/j63///8M5jF'
  });
  
  // Set up error handling
  video.onerror = function() {
    handleVideoError(container, loadingElement, optionsContainer);
  };
  
  // Set up load event
  video.onloadeddata = function() {
    // Hide loading indicator
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
    
    // Show video
    video.style.display = 'block';
    
    // Show video options
    if (optionsContainer) {
      optionsContainer.style.display = 'flex';
    }
  };
  
  // Add a timeout in case the video doesn't load
  const timeoutId = setTimeout(() => {
    // Check if video is still loading
    if (video.readyState < 3) { // HAVE_FUTURE_DATA = 3
      handleVideoError(container, loadingElement, optionsContainer);
    }
  }, 8000); // 8 second timeout
  
  // Clear timeout when video loads
  video.addEventListener('loadeddata', () => {
    clearTimeout(timeoutId);
  });
}

// Create video selection options
function createVideoOptions(optionsContainer, videoContainer, loadingElement) {
  // Clear existing options
  optionsContainer.innerHTML = '<h3 style="width: 100%; text-align: center; margin-bottom: 1rem;">Choose a Video:</h3>';
  
  // Create thumbnail for each video option
  videoOptions.forEach(video => {
    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.className = 'video-option';
    thumbnailContainer.style.textAlign = 'center';
    
    const thumbnail = document.createElement('img');
    thumbnail.src = video.thumbnail;
    thumbnail.alt = video.title;
    thumbnail.className = 'video-thumbnail';
    thumbnail.title = video.title;
    
    const title = document.createElement('p');
    title.textContent = video.title;
    title.style.fontSize = '0.8rem';
    title.style.marginTop = '0.5rem';
    title.style.maxWidth = '160px';
    
    thumbnailContainer.appendChild(thumbnail);
    thumbnailContainer.appendChild(title);
    
    // Add click event to load this video
    thumbnailContainer.addEventListener('click', () => {
      loadVideo(video, videoContainer, loadingElement, optionsContainer);
    });
    
    optionsContainer.appendChild(thumbnailContainer);
  });
}

// Handle video loading errors
function handleVideoError(container, loadingElement, optionsContainer) {
  // Show error message in loading indicator
  if (loadingElement) {
    loadingElement.innerHTML = `
      <h3>Video Playback Issue</h3>
      <p>We're having trouble playing the video in your browser. Please try one of these options:</p>
      <div style="display: flex; gap: 1rem; margin-top: 1rem;">
        <a href="${videoOptions[0].youtubeUrl}" target="_blank" class="btn primary-btn">
          Watch on YouTube
        </a>
        <button id="try-alternate" class="btn primary-btn" style="background: rgba(255,255,255,0.2);">
          Try Alternate Video
        </button>
      </div>
    `;
    
    // Add event listener to try alternate video button
    const tryAlternateButton = document.getElementById('try-alternate');
    if (tryAlternateButton) {
      tryAlternateButton.addEventListener('click', () => {
        // Try the next video in the list
        const currentIndex = 0; // Default to first video
        const nextIndex = (currentIndex + 1) % videoOptions.length;
        loadVideo(videoOptions[nextIndex], container, loadingElement, optionsContainer);
      });
    }
  }
  
  // Show video options
  if (optionsContainer) {
    optionsContainer.style.display = 'flex';
  }
}
