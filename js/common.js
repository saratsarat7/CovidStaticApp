function postPreview (value, need) {
    var post_data = "";
    if (need == "helper") {
        var name = value["helper_name"];
        var type = value["help_type"];
        var phone = value["helper_phone_number"];
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
        var name = value["seeker_name"];
        var type = value["help_type"];
        var phone = value["seeker_phone_number"];
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
    return post_data;
}

function noResults(htmlNode) {
    htmlNode.innerHTML = "There seems to be no posts available in your location,"
            + " please increase the radious slider or try again later.";

}