let autoComplete;
function initAutoComplete() {
    const input = document.getElementById("autocomplete");
    const options = {
        componentRestrictions: {country: "IN"},
        fields: ["place_id", "geometry", "name"],
        types: ["establishment"],
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        var longitude = document.getElementById("longitude");
        var latitude = document.getElementById("latitude");
        latitude.innerHTML = place.geometry.location.lat();
        longitude.innerHTML = place.geometry.location.lng();
    });
}

// google.maps.event.addDomListener(window, 'load', function () {
//     var places = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
//     google.maps.event.addListener(places, 'place_changed', function () {
//         var place = places.getPlace();
//         var address = place.formatted_address;
//         var latitude = place.geometry.location.A;
//         var longitude = place.geometry.location.F;
//         var mesg = "Address: " + address;
//         mesg += "\nLatitude: " + latitude;
//         mesg += "\nLongitude: " + longitude;
//         alert(mesg);
//     });
// });