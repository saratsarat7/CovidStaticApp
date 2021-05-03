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
            jsonArray.forEach(populateHelperHTML);
            
            // Show new post only after list is populated.
            document.getElementById("newPost").style.display = "block";
        } else {
            console.log("HTTP-Error: " + response.status);
        }
    }
}

function populateHelperHTML (value) {
    var seekerButton = document.createElement("BUTTON");
    
    var seeker_name = value["seeker_name"];
    var help_type = value["help_type"];
    var seeker_phone_number = value["seeker_phone_number"];
    var seeker_area = value["seeker_area"];

    var post_data = seeker_name.concat(" wants ");
    post_data = post_data.concat(help_type);
    post_data = post_data.concat(" near ");
    post_data = post_data.concat(seeker_area);
    post_data = post_data.concat(" you can call them on ");
    post_data = post_data.concat(seeker_phone_number);

    // Add post details concatenated based on what we got from API.
    seekerButton.innerHTML = post_data;

    // Get when post was created.
    var date_time = String(value["date_time"]).split(" ");
    var date = date_time[0];
    var time = date_time[1];
    var hour = parseInt(time.substr(0,2));
    if (hour > 12) {
        post_time = String(hour-12);
        post_time = post_time.concat(":")
        post_time = post_time.concat(time.substr(3,2));
        post_time = post_time.concat(" PM");
    } else {
        post_time = String(hour-12);
        post_time = post_time.concat(":")
        post_time = post_time.concat(time.substr(3,2));
        post_time = post_time.concat(" AM");
    }
    var postTimeStamp = document.createElement("span");
    var post_data = "Post created on : ";
    post_data = post_data.concat(date);
    post_data = post_data.concat(" at ");
    post_data = post_data.concat(post_time);
    postTimeStamp.innerHTML = post_data;
    postTimeStamp.style.color = "black";

    seekerButton.appendChild(document.createElement("br"));
    seekerButton.appendChild(postTimeStamp);

    seekerPosts.appendChild(seekerButton);
}