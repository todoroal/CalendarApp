
$.getJSON(
    "https://api.openweathermap.org/data/2.5/weather?q=Vienna,at&units=metric&APPID=5c5c17b14308b0e9c08fc15d50d6c6dd",
    function(data){
        var icon = "https://api.openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        var temp = data.main.temp;
        var description = data.weather[0].description;

        console.log(temp);
        console.log(icon);
        console.log(data);

        $("#icon").attr("src", icon)
        $("#description").append(description);
        $("#temp").append(temp);
    }
);
/*
fetch('https://api.openweathermap.org/data/2.5/weather?q=Vienna,at&units=metric&APPID=5c5c17b14308b0e9c08fc15d50d6c6dd',{
    method: 'GET',
    header: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify()
})
.then(res => {
    res.json()
})
.then(data => {
    var icon = "https://api.openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        var temp = data.main.temp;
        var description = data.weather[0].description;

        $("#icon").attr("src", icon)
        $("#description").append(description);
        $("#temp").append(temp);
})*/