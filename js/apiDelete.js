async function deletePost (buttonDetails) {
    // console.log(buttonDetails);
    var parentRow = buttonDetails.target.parentNode;
    var myClickedButton = buttonDetails.target;
    var buttonID = myClickedButton.firstElementChild.innerHTML;
    
    var api_url = "https://covid-helper.azurewebsites.net/api/delete_post?id=";
    api_url = api_url.concat(buttonID);

    let response = await fetch(api_url);

    if (response.ok) {
        alert("Post Deleted.")
        // Remove current button which was clicked as its deleted now.
        parentRow.remove();
    } else {
        console.log("HTTP-Error: " + response.status);
    }
}