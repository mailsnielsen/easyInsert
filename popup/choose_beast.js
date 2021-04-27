
/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
    document.addEventListener("click", (e) => {
        if (e.target.id == 'submit') {
            browser.tabs.query({ active: true, currentWindow: true })
                .then(complete)
        };

        function complete(tabs) {
            var str = document.getElementById("input").value
            var data = str.split('\t');

            var number = data[0].split('/');

            var object = {
                projectname: data[1] + ', ' + data[7] + ' _' + data[6],
                projectnumber: 'P' + pad(number[0], 3) + '-' + number[1],
                buildingplace: getAddress(data[7]),
                start_date: data[8],
                builder: data[1] + ', ' + getAddress(data[2]),
                customer: searchFor(data[3]),
            }


            browser.tabs.sendMessage(tabs[0].id, {
                command: "complete",
                data: object
            });
        }
    });

    function searchFor(client) {
        switch (client) {
            case 'SL-FL':
                return 'Kreis SL-FL';
                break;

            case 'FL':
                return 'Stadt Flensburg';
                break;

            case 'SL':
                return 'Stadt Schleswig';
                break;

            case 'NF':
                return 'Kreis NF';
                break;

            case 'GM.SH':
                return 'Gebäudemanagement';
                break;

            default:
                break;
        }
    }


    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    function getAddress(data) {
        var object = data.split(',')
        var address = object[1].trim() + ', ' + object[0].trim()

        var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?types=address&language=de&access_token=pk.eyJ1IjoibWFrZXNvbHV0aW9uIiwiYSI6ImNraG04ZjNsdzAzOHcydGwxY3llNjVvOGwifQ.V5DClgJpSRQPIja1lwy4rg"
        var options = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }

        // content.fetch(url, options)
        //     .then(response => response.json())
        //     .then(data => {
        //         address = data.features[0];
        //     });

        return address;
    }
}


/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({ file: "/content_scripts/beastify.js" })
    .then(listenForClicks)
    .catch();