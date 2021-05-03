function callPost() {
    
    // Basic user details
    var userName = document.getElementById("name").value;
    var userPhone = document.getElementById("phone").value;
    var userArea = document.getElementById("autocomplete").value;
    var userRequest = document.getElementById("reqType").value;
    
    // Location details
    var userLong = document.getElementById("longitude").innerHTML;
    var userLat = document.getElementById("latitude").innerHTML;
    var locationError = document.getElementById("locationError").innerHTML;

    // Device Details
    var browserFingerprint = document.getElementById("browserFingerprint").innerHTML;
    
    if (locationError == "Y") {
        alert("Location data not available please click 'Get Location Button' and grant location access (or) type in your area details acurately to create a post in your Location");
        return;
    }
    // What does the user need ?
    var needType = document.getElementById("needType").innerHTML;

    if (userName == "" || userPhone == "" || userRequest == "") {
        alert("Please fill in your details and then submit.");
        return;
    }

    // Location json data
    var locationData = {};
    locationData["longitude"] = parseFloat(userLong);
    locationData["lattitude"] = parseFloat(userLat);

    // Main request creation
    var jsonData = {};
    jsonData["help_type"] = userRequest;

    if (needType == "seeker") {
        jsonData["seeker_name"] = userName;
        jsonData["seeker_phone_number"] = userPhone;
        jsonData["seeker_location"] = locationData;
        jsonData["seeker_area"] = userArea;
        jsonData["comments"] = [];
        var api_url = "https://covid-helper.azurewebsites.net/api/create_seeker";
    } else {
        jsonData["helper_name"] = userName;
        jsonData["helper_phone_number"] = userPhone;
        jsonData["helper_location"] = locationData;
        jsonData["helper_area"] = userArea;
        var api_url = "https://covid-helper.azurewebsites.net/api/create_giver";
    }

    jsonData["device_id"] = browserFingerprint;

    fetch(api_url, {
        method: 'POST',
        headers: {
            'content-type': 'text/json; charset=utf-8'
        },
        body: JSON.stringify(jsonData)
        })
        .then(response => {
            console.log(response)
            alert("Post created successfully, going back to home.");
            window.location.href="index.html";
        })
        .catch(err => {
            console.log(err)
        })
}