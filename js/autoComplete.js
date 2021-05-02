function initAutoComplete() {
    // If user entered the location there is no need to fill in the details.
    var locationSelector = document.getElementById("locationSelector");
    var locationError = document.getElementById("locationError");

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
        locationSelector.style.display = "none";
        locationError.innerHTML = "N";
    });
}