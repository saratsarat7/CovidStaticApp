var myRequests;
let response;
var base_url;
var query_url;

async function getMyRequest() {
    var browserFingerprint = document.getElementById("browserFingerprint").innerHTML;
    
    base_url = "https://covid-helper.azurewebsites.net/api/get_seekers?device_id=";
    query_url  = base_url.concat(browserFingerprint);
    response = await fetch(query_url);

    if (response.ok) {
        let text_data = await response.text();
        var list_to_string = text_data.substring(1,text_data.length - 1);
        var jsonArray = (new Function("return [" + list_to_string + "];")());
        
        // Remove everything before loading.
        seekerPosts = document.getElementById("myPosts");
        seekerPosts.innerHTML = "";
        jsonArray.forEach(populateMyNeeds);
    } else {
        console.log("HTTP-Error: " + response.status);
    }

    base_url = "https://covid-helper.azurewebsites.net/api/get_helpers?device_id=";
    query_url  = base_url.concat(browserFingerprint);

    response = await fetch(query_url);

    if (response.ok) {
        let text_data = await response.text();
        var list_to_string = text_data.substring(1,text_data.length - 1);
        var jsonArray = (new Function("return [" + list_to_string + "];")());
        
        // Remove everything before loading.
        helperPosts = document.getElementById("myPosts");
        jsonArray.forEach(populateMyHelps);
    } else {
        console.log("HTTP-Error: " + response.status);
    }
}

function populateMyNeeds (value) {
    var rowData = document.createElement("div");
    rowData.className += "container_requests_row";
    
    var deleteButton = document.createElement("BUTTON");
    deleteButton.className += "del_button";
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function(event) {
        deletePost(event);
    };

    var postID = document.createElement("span");
    postID.style.display = "none";
    postID.innerHTML = value["_id"];
    
    deleteButton.appendChild(postID);

    var leftData = document.createElement("BUTTON");
    leftData.className += "text_button";

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
    leftData.innerHTML = post_data;

    rowData.appendChild(leftData);
    rowData.appendChild(deleteButton);

    seekerPosts.appendChild(rowData);
}

function populateMyHelps (value) {
    var rowData = document.createElement("div");
    rowData.className += "container_requests_row";
    
    var deleteButton = document.createElement("BUTTON");
    deleteButton.className += "del_button";
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function(event) {
        deletePost(event);
    };

    var postID = document.createElement("span");
    postID.style.display = "none";
    postID.innerHTML = value["_id"];
    
    deleteButton.appendChild(postID);

    var leftData = document.createElement("BUTTON");
    leftData.className += "text_button";

    var helper_name = value["helper_name"];
    var help_type = value["help_type"];
    var helper_phone_number = value["helper_phone_number"];
    var helper_area = value["helper_area"];
    
    var post_data = helper_name.concat(" can help with ");
    post_data = post_data.concat(help_type);
    post_data = post_data.concat(" near ");
    post_data = post_data.concat(helper_area);
    post_data = post_data.concat(" you can call them on ");
    post_data = post_data.concat(helper_phone_number);
    leftData.innerHTML = post_data;

    rowData.appendChild(leftData);
    rowData.appendChild(deleteButton);

    seekerPosts.appendChild(rowData);
}