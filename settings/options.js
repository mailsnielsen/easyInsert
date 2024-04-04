function saveOptions(e) {
    e.preventDefault();

    let obj = JSON.parse(document.querySelector("#allocation").value);

    browser.storage.sync.set({
        allocation: obj
    });
}

function restoreOptions() {

    function setCurrentChoice(result) {
        let string = JSON.stringify(result.allocation)
        document.querySelector("#allocation").value = string || "{}";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
        alert(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get("allocation");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);