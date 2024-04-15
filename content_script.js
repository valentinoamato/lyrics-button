// Function to add a button
function add_button() {

    console.log('Adding button');
    const ownerDiv = document.getElementById('owner'); 
    const button = document.createElement('button');
    button.textContent = "Lyrics"

    ownerDiv.appendChild(button);
}

// Listen for messages from the background script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'add_button') {
        // Call the add_button function
        add_button();
        // Send a response back to the background script (
        sendResponse({ status: 'Button added' });
    }
});