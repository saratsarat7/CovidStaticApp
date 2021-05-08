var longitude = document.getElementById("longitude");
var latitude = document.getElementById("latitude");
var locationError = document.getElementById("locationError");

// We need this here only as the call for API needs to be done only after the location is obtained
var needType;

// Hide below if user allowed access later
var locationSelector;

function getLocation() {
    needType = document.getElementById("needType").innerHTML;
    locationSelector = document.getElementById("locationSelector");
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.")
        genericLocationError();
    }
}

function showPosition(position) {
    longitude.innerHTML = position.coords.longitude;
    latitude.innerHTML = position.coords.latitude;
    locationError.innerHTML = "N";
    
    locationSelector.style.display = "none";
    
    // Call API based on Type
    if(needType == "seeker"){
        getHelpers();
    } else {
        getSeekers();   
    }
    
}

function showError(error) {
    locationError.innerHTML = "Y";
    longitude.innerHTML = "";
    latitude.innerHTML = "";
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.")
            alert("Location access denied !!" +
                    "\nPlease provide location access to proceed further.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.")
            genericLocationError();
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.")
            genericLocationError();
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.")
            genericLocationError();
            break;
    }
}

function genericLocationError() {
    locationError.innerHTML = "Y";
    longitude.innerHTML = "";
    latitude.innerHTML = "";
    if (confirm("Location not available, please try again or use another mobile or device. "
            + "\nIf you are using an Apple Device please click OK to know how to enable location and then come back.") == true) {
        window.location.href="https://www.youtube.com/watch?v=lRvKqkF-A_U";
    }
}