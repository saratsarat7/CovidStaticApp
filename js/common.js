function postPreview (value, need) {
    var post_data = "";
    var phone;
    if (need == "helper") {
        phone = value["helper_phone_number"];
        var name = value["helper_name"];
        var type = value["help_type"];
        var area = value["helper_area"];
    
        post_data = name.concat(" can help with ");
        post_data = post_data.concat(type);
        if (String(area).length > 0) {
            post_data = post_data.concat(" near ");
            post_data = post_data.concat(area);
        }
        post_data = post_data.concat(" you can call them on ");
        post_data = post_data.concat(phone);
    } else {
        phone = value["seeker_phone_number"];
        var name = value["seeker_name"];
        var type = value["help_type"];
        var area = value["seeker_area"];
    
        post_data = name.concat(" wants ");
        post_data = post_data.concat(type);
        if (String(area).length > 0) {
            post_data = post_data.concat(" near ");
            post_data = post_data.concat(area);
        }
        post_data = post_data.concat(" you can call them on ");
        post_data = post_data.concat(phone);
    }
    return post_data, phone;
}

function noResults(htmlNode) {
    htmlNode.innerHTML = "There seems to be no posts available in your location,"
            + " please increase the radious slider or try again later.";

}

function addTime(value) {
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
        post_time = String(hour);
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
    postTimeStamp.style.fontSize = "0.7rem";
    return postTimeStamp;
}