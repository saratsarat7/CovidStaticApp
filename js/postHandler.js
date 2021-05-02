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
    var userName = document.getElementById("name");
    var userPhone = document.getElementById("phone");
    var userArea = document.getElementById("autocomplete");
    var userRequest = document.getElementById("reqType");
    var userLong = document.getElementById("longitude");
    var userLat = document.getElementById("latitude");
}