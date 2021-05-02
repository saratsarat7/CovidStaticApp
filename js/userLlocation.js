var longitude = document.getElementById("longitude");
var latitude = document.getElementById("latitude");
var locationError = document.getElementById("locationError");

// Only available in listing pages to we try to see if its available or not.
try {
    var requestType = document.getElementById("requestType");
} catch(err) {
    var requestType = null;
}

// Only for new post page.
var locationSelector = document.getElementById("locationSelector");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.")
        locationError.innerHTML = "Y";
        longitude.innerHTML = "";
        latitude.innerHTML = "";
    }
}

function showPosition(position) {
    longitude.innerHTML = position.coords.longitude;
    latitude.innerHTML = position.coords.latitude;
    locationError.innerHTML = "N";
    if (requestType !== null) {
        // This is to see where the user is landing, i.e. in "i need help" or "i can help"
        if (requestType.innerHTML == "needing") {
            getHelpers();
        } else {
            getSeekers();
        }
    }
    
}

function showError(error) {
    locationError.innerHTML = "Y";
    longitude.innerHTML = "";
    latitude.innerHTML = "";
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.")
            break;
    }
}