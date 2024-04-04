// Use the async keyword to declare an asynchronous function
async function listen() {
    // Declare a variable to hold the configuration
    let config = [];

    // Use a try-catch block to handle errors
    try {
        // Use the await keyword to wait for the promise to resolve
        const result = await browser.storage.sync.get("allocation");
        // Assign the result to the config variable
        config = result.allocation;
    } catch (error) {
        // Log the error to the console
        console.log(`Error: ${error}`);
        // Alert the user of the error
        alert(`Error: ${error}`);
    }

    // Add an event listener to the submit button
    document.getElementById('submit').addEventListener("click", async () => {
        // Query the active tab
        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        // Call the parseAndInsert function with the tabs as argument
        parseAndInsert(tabs);
    });

    // Declare a function to parse the input and insert the data
    function parseAndInsert(tabs) {
        // Declare a constant for the delimiter
        const delimiter = '\t';
        // Get the value of the input field
        const str = document.getElementById("input").value;
        // Split the string into an array using the delimiter
        const data = str.split(delimiter);
        // Build an object from the data
        const obj = buildObject(data);

        // Send a message to the content script in the active tab
        browser.tabs.sendMessage(tabs[0].id, {
            command: "insert",
            data: obj
        });
    }

    // Declare a function to build an object from the data
    function buildObject(data) {
        // Use the map function to create an array of key-value pairs
        // Then use Object.fromEntries to create an object from the array
        return Object.fromEntries(data.map((value, index) => [config[index], value]));
    }
}

// Execute a script in the active tab
browser.tabs.executeScript({ file: "/content_scripts/eventHandler.js" })
    // Use the then method to call the listen function when the promise resolves
    .then(listen)
    // Use the catch method to handle any errors
    .catch((error) => {
        // Log the error to the console
        console.log(`Error: ${error}`);
    });