
// Listen for URL changes in tabs
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the URL of the tab has changed
    if (changeInfo.url  && changeInfo.url.includes("://www.youtube.com/watch")) {
            callAddButtonFunction(tabId);
    }
});

// This function sends a message to the content script in a specific tab
function callAddButtonFunction(tabId) {
    browser.tabs.sendMessage(tabId, {
        action: 'add_button'
    }).then(response => {
        console.log('Response from content script:', response);
    }).catch(error => {
        console.error('Error sending message to content script:', error);
    });
}

// Call the add_button function in the content script running in the active tab
browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
    const activeTab = tabs[0];
    if (activeTab && activeTab.url.includes('youtube.com/watch')) {
        callAddButtonFunction(activeTab.id);
    }
});