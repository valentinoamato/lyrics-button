// Function to add a button
function add_button() {

    console.log('Adding button');
    let button = document.getElementById('lyrics-button');
    if (button) {
        return 'Button already added';
    } 
    button = document.createElement('button');
    const ownerDiv = document.getElementById('owner'); 
    button.textContent = "Lyrics"
    button.id = "lyrics-button"

    ownerDiv.appendChild(button);

    return 'Button added';
}

// Listen for messages from the background script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'add_button') {
        // Call the add_button function
        const status = add_button();
        // Send a response back to the background script (
        sendResponse({ status: status});
    }
});