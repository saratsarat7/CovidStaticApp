var seekerPosts;

async function getSeekers() {
    var longitude = document.getElementById("longitude").innerHTML;
    var latitude = document.getElementById("latitude").innerHTML;
    var sliderValue = document.getElementById("sliderValue").innerHTML;
    var locationError = document.getElementById("locationError").innerHTML;

    if (locationError == 'N') {
        var base_url = "https://covid-helper.azurewebsites.net/api/get_seekers?long=";
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
            
            // Remove everything before loading.
            seekerPosts = document.getElementById("allPosts");
            seekerPosts.innerHTML = "";

            // User message
            var userText = document.createElement("span");
            userText.innerHTML = "Below people need help in your selected location range.";
            userText.style.paddingBottom = "0.5rem";
            userText.style.width = "80%";
            seekerPosts.appendChild(userText);

            if (jsonArray.length > 0) {
                jsonArray.forEach(populateHelperHTML);
            } else {
                noResults(seekerPosts);
            }
            
            // Show new post only after list is populated.
            document.getElementById("newPost").style.display = "block";
        } else {
            console.log("HTTP-Error: " + response.status);
            // In case of error notify user and tell they can proceed with new post
            seekerPosts = document.getElementById("allPosts");
            seekerPosts.innerHTML = "";

            // Show new post in case api query is not correct so they can create new.
            document.getElementById("newPost").style.display = "block";
        }
    }
}

function populateHelperHTML (value) {
    var seekerButton = document.createElement("BUTTON");
    var post_data = postPreview(value, "seeker")
    
    // Add post details concatenated based on what we got from API.
    seekerButton.innerHTML = post_data;

    // Get when post was created.
    var postTimeStamp = addTime(value);

    seekerButton.appendChild(document.createElement("br"));
    seekerButton.appendChild(postTimeStamp);

    seekerPosts.appendChild(seekerButton);
}