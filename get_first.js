function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

console.log('Getting first search result...');
let gettingItem = browser.storage.local.get('task');
browser.storage.local.remove('task');
let url;
gettingItem.then(item => url = item['task'])
    .catch(error => console.log('Failed to get task: '+error))
    .finally(async () => {
        if (url!==decodeURIComponent(window.location.href)) {
            console.log('Error: URLs do not match')
            return;
        }

        const maxAttempts = 100;
        const delay = 50;
        await sleep(delay);
        let attempts = 1;
        url = document.getElementsByTagName("a").item(14).href;
        while ((url=="https://genius.com/about") && (attempts!=maxAttempts)) {
            await sleep(delay);
            url = document.getElementsByTagName("a").item(14).href;
            attempts++;
        }
        if (attempts==maxAttempts) {
            console.log("Error: top result not found after many attempts");
        } else {
            window.open(url,"_self");
        }
    });