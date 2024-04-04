// Immediately Invoked Function Expression (IIFE) to avoid polluting the global scope
(function () {
    // Check if the script has already run to avoid running it multiple times
    if (window.hasRun) {
        return;
    }
    // Set a flag in the window object to indicate that the script has run
    window.hasRun = true;

    // Function to convert a string to a boolean value
    function convertBoolean(value) {
        // Define an array of strings that should be considered as true
        const checked = ['x', 'ja', 'true', '1', 'checked'];
        // Convert the input value to lowercase to ensure case-insensitive comparison
        value = value.toLowerCase();
        // Check if the value is in the array of true strings
        return value === checked.find((element) => element === value);
    }

    // Function to update an HTML element with a given value
    function updateElement(key, value) {
        // Get the element by its ID
        const element = document.getElementById(key);
        // Check the type of the element and update it accordingly
        if (element.tagName === 'SELECT') {
            // If the element is a select, find the option that matches the value and select it
            for (let i = 0; i < element.options.length; i++) {
                if (element.options[i].text === value) {
                    element.options[i].selected = true;
                }
            }
        } else if (element.type === 'checkbox') {
            // If the element is a checkbox, convert the value to a boolean and check/uncheck the checkbox
            element.checked = convertBoolean(value);
        } else if (element.type === 'text') {
            // If the element is a text input, set its value
            element.value = value;
        }
    }

    // Function to insert data into the page
    function insert(object) {
        // Iterate over the keys in the object
        for (const key in object) {
            // Check if the key is a direct property of the object to avoid iterating over prototype properties
            if (object.hasOwnProperty(key)) {
                // Update the corresponding element with the value
                updateElement(key, object[key]);
            }
        }
    }

    // Listen for messages from the background script
    browser.runtime.onMessage.addListener((message) => {
        // Check if the message is an insert command
        if (message.command === "insert") {
            // Insert the data from the message into the page
            insert(message.data);
        }
    });
})();