function newPost(typeValue) {
    // This is for type selection.
    var selection = document.getElementById("selection");

    // This is where user inputs his details.
    var userInput = document.getElementById("userInput");

    // Pass the data from type to user form.
    var reqType = document.getElementById("reqType");

    // Hide type selection and show next screen.
    selection.style.display = "none";
    userInput.style.display = "block";
    
    reqType.value = typeValue;
}

function callPost() {
    var api_url = "https://covid-helper.azurewebsites.net/api/create_seeker";
    
    var userName = document.getElementById("name").value;
    var userPhone = document.getElementById("phone").value;
    var userArea = document.getElementById("autocomplete").value;
    var userRequest = document.getElementById("reqType").value;
    
    var userLong = document.getElementById("longitude").innerHTML;
    var userLat = document.getElementById("latitude").innerHTML;

    var jsonData = {};
    jsonData["help_type"] = userRequest;
    jsonData["seeker_name"] = userName;
    jsonData["seeker_phone_number"] = userPhone;
    var locationData = {};
    locationData["longitude"] = parseFloat(userLong);
    locationData["lattitude"] = parseFloat(userLat);
    jsonData["seeker_location"] = locationData;
    jsonData["seeker_area"] = userArea;
    jsonData["comments"] = [];
    console.log(jsonData)

    fetch(api_url, {
        method: 'POST',
        headers: {
            'content-type': 'text/json; charset=utf-8'
        },
        body: JSON.stringify(jsonData)
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })

}