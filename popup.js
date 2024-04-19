let input = document.getElementById("radio-input");

input.addEventListener('change', e => setValue(e.target.value));

async function setValue(value) {
    await browser.storage.local.set({value});
}

async function init() {
    let value;
    let gettingItem = browser.storage.local.get('value');
    gettingItem.then(item => {
        value = item['value'];
    }).catch(error => {
        console.log(error);
        value = 'all';
        setValue(value); 
    }).finally(() => {
    input.value = value;
    document.getElementById(value).checked = true;
    });
}

init().catch(e => console.log(e));