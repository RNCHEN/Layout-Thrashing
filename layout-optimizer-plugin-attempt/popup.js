document.addEventListener('DOMContentLoaded', () => {
    const optimizationToggle = document.getElementById('optimizationToggle');
    const debugModeToggle = document.getElementById('debugModeToggle');
    // Load current setting
    chrome.storage.sync.get(['optimizationEnabled', 'debugMode'], (config) => {
      optimizationToggle.checked = config.optimizationEnabled;
      debugModeToggle.checked = config.debugMode;
    });
  
    // Save settings on toggle
    optimizationToggle.addEventListener('change', (e) => {
      chrome.storage.sync.set({ 
        optimizationEnabled: e.target.checked 
      });
    });
  
    debugModeToggle.addEventListener('change', (e) => {
      chrome.storage.sync.set({ 
        debugMode: e.target.checked 
      });
    });
  });