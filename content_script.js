// Function to add a button
function add_button() {

    console.log('Adding button');
    let button = document.getElementById('lyrics-button');
    if (button) {
        return 'Button already added';
    } else {
        const ownerDiv = document.getElementById('owner');
        button = document.createElement('button');
        button.id = "lyrics-button";
        button.textContent = "Lyrics";
        button.title = "Search for lyrics";

        button.style.padding = "0px";
        button.style.paddingLeft = '16px';
        button.style.paddingRight = '16px';
        button.style.marginLeft = '8px';        
        button.style.border = '0px';
        button.style.backgroundColor = '#272727';
        button.style.color = '#F1F1F1';
        button.style.fontFamily = "Roboto, Arial, sans-serif";
        button.style.fontSize = '14px';
        button.style.lineHeight = '36px';
        button.style.willChange = 'opacity';
        button.style.whiteSpace = 'nowrap';
        button.style.textTransform = 'none';
        button.style.fontWeight = 500;
        button.style.cursor = "pointer";
        button.style.borderRadius = '18px';

        button.addEventListener("mouseover", (event) => {
            event.target.style.backgroundColor = "#3f3f3f";
        });

        button.addEventListener("mouseout", (event) => {
            event.target.style.backgroundColor = "#272727";
        });

        ownerDiv.appendChild(button);

        return 'Button added';
    }
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