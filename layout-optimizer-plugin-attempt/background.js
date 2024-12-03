chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
      optimizationEnabled: true,
      debugMode: false
    });
  });