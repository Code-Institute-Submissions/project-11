

var obj = { name: "John", age: 30, city: "New York" };
var myJSON = JSON.stringify(obj);
document.getElementById("myform").innerHTML = myJSON;

//const baseURL = "https://swapi.co/api/"
function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "data/transactions.json");
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function writeToDocument(type) {
    getData(type, function (data) {
        console.dir(data);

        data.forEach(function(item) {
            document.getElementById("data").innerHTML += "<p>" + item.name + "</p>";
        });
        
    });
}

