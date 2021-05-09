var helperPosts;

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
            
            // Remove everything before loading.
            helperPosts = document.getElementById("allPosts");
            helperPosts.innerHTML = "";

            // User message
            var userText = document.createElement("span");
            userText.innerHTML = "Below people can help you in your selected location range.";
            userText.style.paddingBottom = "0.5rem";
            userText.style.width = "80%";
            helperPosts.appendChild(userText);

            if (jsonArray.length > 0) {
                jsonArray.forEach(populateSeekerHTML);
            } else {
                noResults(helperPosts);
            }

            // Show new post only after list is populated.
            document.getElementById("newPost").style.display = "block";
        } else {
            console.log("HTTP-Error: " + response.status);
            // In case of error notify user and tell they can proceed with new post
            helperPosts = document.getElementById("allPosts");
            helperPosts.innerHTML = "";

            // Show new post in case api query is not correct so they can create new.
            document.getElementById("newPost").style.display = "block";
        }
    }
}

function populateSeekerHTML (value) {
    var helperButton = document.createElement("BUTTON");
    var post_data = postPreview(value, "helper")

    // Add post details concatenated based on what we got from API.
    helperButton.innerHTML = post_data[0];

    // Create phone hyper link to call quicckly
    var phone = document.createElement("a");
    phone.href = "tel:".concat(post_data[1]);
    phone.innerHTML = post_data[1];
    helperButton.concat(phone);
    
    // Get when post was created.
    var postTimeStamp = addTime(value);

    helperButton.appendChild(document.createElement("br"));
    helperButton.appendChild(postTimeStamp);

    helperPosts.appendChild(helperButton);
}