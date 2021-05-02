async function getHelpers() {
    var longitude = document.getElementById("longitude").innerHTML;
    var latitude = document.getElementById("latitude").innerHTML;
    var sliderValue = document.getElementById("sliderValue").innerHTML;
    var locationError = document.getElementById("locationError").innerHTML;

    if (locationError == 'N') {
        var base_url = "https://covid-helper.azurewebsites.net/api/get_helpers?long=";
        var query_url  = base_url.concat(longitude);
        query_url = query_url.concat("&lat=");
        query_url = query_url.concat(latitude);
        query_url = query_url.concat("&dist=");
        query_url = query_url.concat(sliderValue);

        let response = await fetch(query_url);

        if (response.ok) {
            let text_data = await response.text();
            var list_to_string = text_data.substring(1,text_data.length - 1);
            var jsonArray = (new Function("return [" + list_to_string + "];")());
            jsonArray.forEach(populateHelperHTML);
            
            // Show new post only after list is populated.
            document.getElementById("newPost").style.display = "block";
            // Remove place holder text.
            document.getElementById("loadingHolder").remove();
        } else {
            console.log("HTTP-Error: " + response.status);
        }
    }
}

function populateSeekerHTML (value) {
    var helperPosts = document.getElementById("allPosts");
    var helperButton = document.createElement("BUTTON");
    
    var helper_name = value["helper_name"];
    var help_type = value["help_type"];
    var helper_phone_number = value["helper_phone_number"];
    var helper_area = value["helper_area"];
    
    var post_data = helper_name.concat(" wants ");
    post_data = post_data.concat(help_type);
    post_data = post_data.concat(" near ");
    post_data = post_data.concat(helper_area);
    post_data = post_data.concat(" you can call them on ");
    post_data = post_data.concat(helper_phone_number);

    helperButton.innerHTML = post_data;
    helperPosts.appendChild(helperButton);
}