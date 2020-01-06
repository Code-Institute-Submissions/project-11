

$( function() {
    $( "#datepicker" ).datepicker({
      showOn: "button",
      buttonImage: "images/calendar.gif",
      buttonImageOnly: true,
      buttonText: "Select date"
    });
  } );


//const baseURL = "https://swapi.co/api/"
function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "data/players.json");
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function writeToDocument(type) {
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(type, function (data) {
        data.forEach(function(item) {
            
            el.innerHTML += "<input type='text' value=" + item + "/>" + "<br>";
            console.log(item);
            
        });
        
    });
}

