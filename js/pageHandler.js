function routePage (pageValue) {
    // Home Page
    var mainPage = document.getElementById("mainPage");
    // Listing Page
    var listPage = document.getElementById("listPage");
    // Type Selection
    var selection = document.getElementById("selection");
    // Post Creation
    var userInput = document.getElementById("userInput");

    // Extra Elements
    var reqType = document.getElementById("reqType");
    var locationSelector = document.getElementById("locationSelector");
    var locationError = document.getElementById("locationError");
    var needType = document.getElementById("needType");
    
    var pageValueHTML = document.getElementById("pageValueHTML");
    if (pageValue == "0") {
        if (pageValueHTML.innerHTML == "list") {
                window.location = '/';
                return;
            }
        if (pageValueHTML.innerHTML == "category" &&
            needType.innerHTML == "seeker") {
                pageValue == "I need help";
            }
        if (pageValueHTML.innerHTML == "category" &&
            needType.innerHTML == "helper") {
                pageValue == "I can help";
            }
        if (pageValueHTML.innerHTML == "post") {
                pageValue == "New Post";
            }
    }

    // Reset "new post" screen values when useris navigating again from home page.
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("autocomplete").value = "";
    document.getElementById("reqType").value = "";

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

        // Get location to query API
        getLocation();
        return;
    }

    if (pageValue == "New Post") {
        mainPage.style.display = "none";
        listPage.style.display = "none";
        selection.style.display = "block";
        userInput.style.display = "none";

        // Set where you are right now for back button operation.
        pageValueHTML.innerHTML = "category";

        return;
    }

    var request_types = ['Oxygen', 'Hospital Beds', 'Vaccine', 'Covid Test', 'Other']
    
    if (request_types.includes(pageValue)) {
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
        reqType.value = pageValue;
        return;
    }
}