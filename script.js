var rtime = function (dateString) {
  var rightNow = new Date();
  var then = new Date(dateString);

  var diff = rightNow - then;
  var second = 1000;
  var minute = second * 60;
  var hour = minute * 60;
  var day = hour * 24;

  if (isNaN(diff) || diff < 0) {
    return "";
  }
  if (diff < second * 2) {
    return "right now";
  }
  if (diff < minute) {
    return Math.floor(diff / second) + " seconds ago";
  }
  if (diff < minute * 2) {
    return "about 1 minute ago";
  }
  if (diff < hour) {
    return Math.floor(diff / minute) + " minutes ago";
  }
  if (diff < hour * 2) {
    return "about 1 hour ago";
  }
  if (diff < day) {
    return Math.floor(diff / hour) + " hours ago";
  }
  if (diff > day && diff < day * 2) {
    return "yesterday";
  }
  if (diff < day * 365) {
    return Math.floor(diff / day) + " days ago";
  } else {
    return "over a year ago";
  }
};

var toWrite = "";
var httpRequest = new XMLHttpRequest();

function fetchJSONFile(path, callback) {

  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
        if (callback) callback(data);
      }
    }
  };
}

httpRequest.open('GET', "http://neapolitan.herokuapp.com/");
httpRequest.send(); 

  // this requests the file and executes a callback with the parsed result once
  //   it is available
fetchJSONFile("http://neapolitan.herokuapp.com/", function(data){
  data.statuses.forEach(function (statuses) {
    if (typeof statuses.entities.media !== 'undefined') {
      toWrite += "<div class='col-md-6 col-sm-6 col-xs-12'>" +
        "<div class='thumbnail'>" + "<div id='outer'>" +
        "<img src='" + statuses.entities.media[0].media_url + "'></div>" +
        "<div class='caption'>" +
        "<p>" + rtime(statuses.created_at) + "</p>" +
        "<h4>" + statuses.user.name + "</h4>" +
        "</div></div></div>";
    }
  var parser = new DOMParser()
  var parsedHtml = parser.parseFromString(toWrite, "text/html");
  var status = parsedHtml.childNodes[0];
  document.getElementById("content").appendChild(status);
  });
});
