var holdValue;

// Home Page
var mainPage = document.getElementById("mainPage");
// Listing Page
var listPage = document.getElementById("listPage");
// Type Selection
var selection = document.getElementById("selection");
// Post Creation
var userInput = document.getElementById("userInput");
// My Requests
var myRequests = document.getElementById("myRequests");
// Options page main DIV
var options = document.getElementById("options");

function addOption(value){
    var oneOption = document.createElement("BUTTON");
    oneOption.className = "flex-item";
    oneOption.value = value;
    oneOption.innerHTML = value;
    oneOption.onclick = function() {
        routePage(this.value);
    };
    options.appendChild(oneOption);
}

function routePage (pageValue) {
    // Extra Elements
    var reqType = document.getElementById("reqType");
    var locationSelector = document.getElementById("locationSelector");
    var locationError = document.getElementById("locationError");
    var needType = document.getElementById("needType");
    
    var pageValueHTML = document.getElementById("pageValueHTML");
    if (pageValue == "0") {
        holdValue = pageValue;
        if (pageValueHTML.innerHTML == "list") {
                window.location.href="mainHome.html";
                return;
            }
        if (pageValueHTML.innerHTML == "category" &&
            needType.innerHTML == "seeker") {
                pageValue = "I need help";
            }
        if (pageValueHTML.innerHTML == "category" &&
            needType.innerHTML == "helper") {
                pageValue = "I can help";
            }
        if (pageValueHTML.innerHTML == "post") {
                pageValue = "New Post";
            }
    }

    if (pageValue == "My Requests") {
        mainPage.style.display = "none";
        listPage.style.display = "none";
        selection.style.display = "none";
        userInput.style.display = "none";
        myRequests.style.display = "block";

        // Set where you are right now for back button operation.
        pageValueHTML.innerHTML = "list";

        // Get my requests for this device.
        getMyRequest();
        return;
    }

    if (pageValue == "I need help" || pageValue == "I can help") {
        mainPage.style.display = "none";
        listPage.style.display = "block";
        selection.style.display = "none";
        userInput.style.display = "none";
        
        // Set where you are right now for back button operation.
        pageValueHTML.innerHTML = "list";

        // Set type of request, helper or seeker
        if (pageValue == "I need help") {
            needType.innerHTML = "seeker";
        } else {
            needType.innerHTML = "helper";
        }
        if (holdValue !== "0") {
            // Get location to query API
            getLocation();
        }
        return;
    }

    var request_types = ['Oxygen', 'Hospital Beds', 'Vaccine', 'Covid Test', 'Other']

    if (pageValue == "New Post") {
        mainPage.style.display = "none";
        listPage.style.display = "none";
        selection.style.display = "block";
        userInput.style.display = "none";

        // Remove previous options when page is reloading
        options.innerHTML = ""

        // Load categories from about list in the page.
        request_types.forEach(addOption);

        // Set where you are right now for back button operation.
        pageValueHTML.innerHTML = "category";
        return;
    }
    
    if (request_types.includes(pageValue)) {
        // Reset "new post" screen values when useris navigating again from home page.
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("autocomplete").value = "";
        document.getElementById("reqType").value = "";

        mainPage.style.display = "none";
        listPage.style.display = "none";
        selection.style.display = "none";
        userInput.style.display = "block";

        // Set where you are right now for back button operation.
        pageValueHTML.innerHTML = "post";

        // Show location button if location is not read already.
        if (locationError.innerHTML == "N") {
            locationSelector.style.display = "none";
        }

        // Set request type value
        if (pageValue == "Other") {
            reqType.value = "";
        } else {
            reqType.value = pageValue;
        }
        return;
    }
}