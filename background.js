
// Listen for URL changes in tabs
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the URL of the tab has changed
    if (changeInfo.url  && changeInfo.url.includes("://www.youtube.com/watch")) {
            callAddButtonFunction(tabId,30);
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// This function sends a message to the content script in a specific tab
function callAddButtonFunction(tabId, tries) {
    if (tries==0) {
        console.log('Failed to add button after several tries');
    } else {
        browser.tabs.sendMessage(tabId, {
            action: 'add_button'
        }).then(response => {
            console.log('Response from content script:', response);
        }).catch(async error => {
            console.error('Error sending message to content script:', error);
            await new sleep(600);
            callAddButtonFunction(tabId,tries-1);
        });
    }
}

// Call the add_button function in the content script running in the active tab
browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
    const activeTab = tabs[0];
    if (activeTab && activeTab.url.includes('youtube.com/watch')) {
        callAddButtonFunction(activeTab.id,30);
    }
});