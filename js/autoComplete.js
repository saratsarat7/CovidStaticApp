let autoComplete;
function initAutoComplete() {
    // Only available in new post page; try to see if its available or not.
    try {
        var locationSelector = document.getElementById("locationSelector");
    } catch(err) {
        var locationSelector = null;
    }

    const input = document.getElementById("autocomplete");
    const options = {
        componentRestrictions: {country: "in"},
        fields: ["geometry", "name"],
        types: ["establishment"],
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        var longitude = document.getElementById("longitude");
        var latitude = document.getElementById("latitude");
        latitude.innerHTML = place.geometry.location.lat();
        longitude.innerHTML = place.geometry.location.lng();
        if (locationSelector !== null) {
            locationSelector.style.display = "none";
        }
    });
}