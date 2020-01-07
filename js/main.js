$(document).ready(function() {
    console.log("ready");

    //Datepicker function from https://jqueryui.com/datepicker/#icon-trigger
    $(function() {
        $( "#datepicker" ).datepicker({
        showOn: "button",     
        buttonText: "Select date",
        format: "dd/mm/yyyy"
        });
    } );

    $("#newPlayerName").hide();
    $("#enterButton").hide();
    $("#newPlayer").click(function() {
        $("#newPlayerName").toggle();
        $("#enterButton").toggle();
    }); 

});


//const baseURL = "https://swapi.co/api/"
function getData(type, cb) {
    var xhr = new XMLHttpRequest();
    console.log("xhr declare");
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
        console.log("getData function");
        data.forEach(function(item) {
            el.innerHTML += `
            <div class="form-row">
                <div class="form-group col-5">
                    <input type="text" value="${item}">
                </div>
                <div class="form-group col-2">
                    <input type="number">
                </div>
                <div class="form-group col-2">
                    <input type="number">
                </div>
                <div class="form-group col-2">
                    <input type="number">
                </div>
            </div>
            `;

            
            console.log(item);
            
        });
        
    });
}

