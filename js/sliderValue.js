function updateTextInput(val) {
    var sliderValue = document.getElementById("sliderValue");
    sliderValue.innerHTML = val;

    // Only available in listing pages to we try to see if its available or not.
    try {
        var requestType = document.getElementById("requestType");
    } catch(err) {
        var requestType = null;
    }
    
    // Get updated requests when slider changes.
    if (requestType !== null) {
        // This is to see where the user is landing, i.e. in "i need help" or "i can help"
        if (requestType.innerHTML == "needing") {
            getHelpers();
        } else {
            getSeekers();
        }
    }
}