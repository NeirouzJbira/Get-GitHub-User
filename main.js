// github user finder
$(document).ready(function () {
  $(document).on("keypress", "#username", function (event) {
    if (event.which === 13) {
      // check the key was <enter>
      var input = $(this);
      var username = input.val();

      getGithubInfo(username);

      // clear input field
      input.val("");
    }
  });
});

function getGithubInfo(username) {
  var url = "https://api.github.com/users/" + username;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, false);
  xmlhttp.send(); // send response to browser

  showUser(xmlhttp);
}

function showUser(xmlhttp) {
  if (xmlhttp.status === 200) {
    // check if the status code is 200(Okay)

    // show the user details
    var json = xmlhttp.responseText;
    var user = JSON.parse(json);
    $("#profile .info").html(`<div>
        <img src=${user.avatar_url} width="80" height="80"/>
        <div>Login: ${user.login}</div>
        <div>ID: ${user.id}</div>
        <div>URL: ${user.html_url}</div>
        <div>Location: ${user.location}</div>
        </div>`);

    // do not display error message
    $("#profile .error").html("");
  } else {
    // show an error
    $("#profile .error").html("No such user!");

    // do not display the info
    $("#profile .info").html("");
  }
}
