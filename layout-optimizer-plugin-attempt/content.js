(function() {
  class AdvancedLayoutStabilizer {
    constructor() {
      this.observeAndPreserveLayoutSpace();
    }
    
    // Observe and preserve layout space for dynamic content
    observeAndPreserveLayoutSpace() {
      const dynamicContainers = [
        document.querySelector('[data-testid="main-content"]'),
        document.querySelector('#dynamic-content-area'),
      ].filter(Boolean);
  
      dynamicContainers.forEach(container => {
        this.lockContainerDimensions(container);
      });
    }
  
    lockContainerDimensions(container) {
      const initialRect = container.getBoundingClientRect();
      container.style.position = 'relative';
      container.style.minHeight = `${initialRect.height}px`;
      container.style.minWidth = `${initialRect.width}px`;
      // Create a ghost element to maintain space
      const ghostElement = document.createElement('div');
      ghostElement.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        pointer-events: none;
        z-index: -1;
      `;
      container.appendChild(ghostElement);
    }
  }

  class NetworkLayoutShield {
    constructor() {
      this.patchFetchAndXHR();
    }
  
    patchFetchAndXHR() {
      const originalFetch = window.fetch;
      
      window.fetch = async (resource, options) => {
        const startTime = performance.now();
        // Identify potential layout-shifting resources
        const isLayoutSensitiveResource = this.isLayoutSensitiveRequest(resource);
        
        if (isLayoutSensitiveResource) {
          this.reserveCriticalLayoutSpace(resource);
        }
  
        try {
          const response = await originalFetch(resource, options);
          if (isLayoutSensitiveResource) {
            this.updateLayoutAfterLoad(resource, response);
          }
          return response;
        } catch (error) {
          this.handleNetworkError(resource, error);
          throw error;
        }
      };
    }
  
    isLayoutSensitiveRequest(resource) {
      const layoutSensitivePatterns = [
        'graphql',
        'gql.dispatch',
        'gql.blobworker',
        '/index.js',
        'primemodal',
        'shared/layout'
      ];
      return layoutSensitivePatterns.some(pattern => 
        resource.toString().includes(pattern)
      );
    }
  
    reserveCriticalLayoutSpace(resource) {
      // Create a precise placeholder
      const placeholder = document.createElement('div');
      placeholder.dataset.networkResource = resource.toString();
      placeholder.style.cssText = `
        width: 100%;
        min-height: 200px;
        background: #f0f0f0;
        opacity: 0.5;
        transition: all 0.3s ease;
      `;
      this.insertPlaceholderStrategically(placeholder);
    }
  
    insertPlaceholderStrategically(placeholder) {
      const criticalContainers = [
        document.querySelector('main'),
        document.querySelector('#main-content'),
        document.body
      ];
  
      const targetContainer = criticalContainers.find(container => container);
      if (targetContainer) {
        targetContainer.insertBefore(
          placeholder, 
          targetContainer.firstElementChild
        );
      }
    }
  
    updateLayoutAfterLoad(resource, response) {
      // Remove placeholders after content loads
      const placeholders = document.querySelectorAll(
        `[data-network-resource="${resource}"]`
      );
      placeholders.forEach(placeholder => {
        placeholder.style.height = '0';
        placeholder.style.opacity = '0';
        setTimeout(() => placeholder.remove(), 300);
      });
    }
  }

  function initializeLayoutOptimizers() {
    new AdvancedLayoutStabilizer();
    new NetworkLayoutShield();
  }

  chrome.storage.sync.get(['optimizationEnabled'], (config) => {
    if (config.optimizationEnabled) {
      document.addEventListener('DOMContentLoaded', initializeLayoutOptimizers);
    }
  });
})();