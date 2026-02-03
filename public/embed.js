(function() {
  'use strict';

  // Prevent multiple initializations
  if (window.AIChatbotInitialized) {
    console.warn('AI Chatbot already initialized');
    return;
  }
  window.AIChatbotInitialized = true;

  // Default configuration
  const defaultConfig = {
    primaryColor: '0066cc',
    position: 'bottom-right',
    greeting: 'Hello! How can I help you today?',
    businessName: 'ABC Real Estate'
  };

  // Initialize chatbot function
  window.initAIChatbot = function(userConfig) {
    const config = { ...defaultConfig, ...userConfig };

    // Remove # from color if present
    if (config.primaryColor && config.primaryColor.startsWith('#')) {
      config.primaryColor = config.primaryColor.substring(1);
    }

    // Determine the base URL (use environment variable or current script source)
    let baseUrl = 'http://localhost:3000';
    
    // Try to get the base URL from the script tag
    const scriptTag = document.querySelector('script[src*="embed.js"]');
    if (scriptTag) {
      const scriptSrc = scriptTag.getAttribute('src');
      try {
        const url = new URL(scriptSrc, window.location.href);
        baseUrl = url.origin;
      } catch (e) {
        console.warn('Could not parse script URL, using default');
      }
    }

    // Build widget URL with configuration parameters
    const params = new URLSearchParams({
      primaryColor: config.primaryColor,
      position: config.position,
      greeting: config.greeting,
      businessName: config.businessName
    });

    const widgetUrl = `${baseUrl}/widget?${params.toString()}`;

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'ai-chatbot-iframe';
    iframe.src = widgetUrl;
    iframe.style.cssText = `
      position: fixed;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border: none;
      z-index: 999999;
      pointer-events: none;
      background: transparent;
    `;

    // Make chatbot elements interactive
    iframe.style.pointerEvents = 'auto';

    // Handle responsive sizing
    function updateIframeSize() {
      if (window.innerWidth < 768) {
        iframe.style.width = '100%';
        iframe.style.height = '100%';
      } else {
        iframe.style.width = '100%';
        iframe.style.height = '100%';
      }
    }

    updateIframeSize();
    window.addEventListener('resize', updateIframeSize);

    // Append iframe to body
    if (document.body) {
      document.body.appendChild(iframe);
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        document.body.appendChild(iframe);
      });
    }

    console.log('AI Chatbot initialized successfully');
  };

  // Auto-initialize if data attributes are present on script tag
  const currentScript = document.currentScript || document.querySelector('script[src*="embed.js"]');
  if (currentScript) {
    const autoInit = currentScript.getAttribute('data-auto-init');
    if (autoInit !== 'false') {
      const config = {
        primaryColor: currentScript.getAttribute('data-primary-color') || defaultConfig.primaryColor,
        position: currentScript.getAttribute('data-position') || defaultConfig.position,
        greeting: currentScript.getAttribute('data-greeting') || defaultConfig.greeting,
        businessName: currentScript.getAttribute('data-business-name') || defaultConfig.businessName
      };

      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          window.initAIChatbot(config);
        });
      } else {
        window.initAIChatbot(config);
      }
    }
  }
})();
