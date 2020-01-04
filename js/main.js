

var obj = { name: "John", age: 30, city: "New York" };
var myJSON = JSON.stringify(obj);
document.getElementById("myform").innerHTML = myJSON;

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
            el.innerHTML += "<p>" + item + "</p>";
        });
        
    });
}

