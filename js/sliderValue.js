function updateTextInput(val) {
    var sliderValue = document.getElementById("sliderValue");
    sliderValue.innerHTML = val;

    // Only available in listing pages to we try to see if its available or not.
    var requestType = document.getElementById("needType");
    
    // This is to see where the user is landing, i.e. in "i need help" or "i can help"
    if (requestType.innerHTML == "seeker") {
        getHelpers();
    } else {
        getSeekers();
    }
}