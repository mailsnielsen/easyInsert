(function () {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    /**
     * Given a URL to a beast image, remove all existing beasts, then
     * create and style an IMG node pointing to
     * that image, then insert the node into the document.
     */
    function insert(object) {
        document.getElementById('projectadmin_project_name').value = object.projectname;
        document.getElementById('projectadmin_project_number').value = object.projectnumber;
        document.getElementById('projectadmin_project_category').value = 14;
        document.getElementById('projectadmin_location').value = object.buildingplace;
        document.getElementById('projectadmin_start_date').value = object.start_date;
        document.getElementById('projectadmin_work_package_preset').value = 7;
        document.getElementById('projectadmin_client__search').value = object.customer;
        document.getElementById('projectadmin_project_phase').value = 2;
        document.getElementById('projectadmin_f_2').value = object.builder;
        document.getElementById('projectadmin_f_3').value = "Mappe";

        document.getElementById("projectadmin_client__search").click();

    }

    /**
     * Listen for messages from the background script.
     * Call "beastify()" or "reset()".
    */
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "complete") {
            insert(message.data);
        }
    });

})();