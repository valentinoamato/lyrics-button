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

        button.addEventListener("click", searchLyrics);

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

function searchLyrics() {
    const title = getVideoTitle();
    if (title) {
        window.open("https://genius.com/search?q="+title,"_blank");
    } else {
        console.log('Video title not found');
    }
}

function getVideoTitle() {
    const parentDiv = document.getElementById("above-the-fold");
    const elements = parentDiv.getElementsByTagName("h1")
    if (elements.length) {
        let title = elements.item(0).textContent.trim();
        title = title.replaceAll(/\(.*\)/g, "");
        title = title.replaceAll(/\[.*\]/g, "");
        title = title.replaceAll(/(ft|feat)\..*/g, "");
        title = title.replaceAll(/&*/g, "");
        title = title.replaceAll(/[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}\u{200d}]*/ug,"");
        return title.trim()
    } else {
        return false;
    }
}