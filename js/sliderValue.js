function updateTextInput(val) {
    var sliderValue = document.getElementById("sliderValue");
    sliderValue.innerHTML = val;
    // Get updated requests when slider changes.
    getSeekers();
}