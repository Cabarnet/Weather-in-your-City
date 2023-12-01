let $body = document.querySelectorAll("body")[0];
let $a = document.querySelectorAll("a")[0];
let main = document.getElementById("main");
let city, x, y;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(weatherByCoords);
  }
  else{ 
    alert("Geolocation is not supported by this browser.");
  }
}

function changeCity(){
  window.location.href = 'change.html';
}

function cityInput(){
  let city = document.getElementById('input').value;
  cityToCoords(city);
}

function weatherByCoords(position){
  x = position.coords.latitude;
  y = position.coords.longitude;

  showWeather();
}

function cityToCoords(city){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=c4f8078bdf4f4c4bb63cd99e608c9fd2`)
    .then(result => result.json())
    .then(data => {x = data[0].lat; y = data[0].lon;})
    .then(function(){showWeather()});
}

function showWeather(){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&appid=c4f8078bdf4f4c4bb63cd99e608c9fd2`)
  .then(result => result.json())
  .then(data => {
    main.innerHTML = `<div class="main">
    <p>${(data.main.temp - 273).toFixed(1)} ℃</p>
    <p>${data.weather[0].main} in ${data.name}</p>
    <a onclick="changeCity()">Change city</a>
    </div>`;
    if(data.weather[0].main == "Sun")
    {
      $body.style.background = 'linear-gradient(150.64deg, #ffe740 0%, #fff900 100%);';
      $body.style.color = 'black';
      $a.style.color = 'black';
    };
    if(data.weather[0].main == "Clear") $body.style.background = 'linear-gradient(150.64deg, #51a7ff 0%, #0058e0 100%)';
    if(data.weather[0].main == "Clouds") $body.style.background = 'linear-gradient(150.64deg, rgb(170 171 183) 0%, rgb(131 131 131) 100%)';
    if(data.weather[0].main == "Rain") $body.style.background = 'linear-gradient(150.64deg, rgb(83 112 179) 0%, rgb(3 43 215) 100%)';
    if(data.weather[0].main == "Snow") 
    {
      $body.style.background = 'linear-gradient(150.64deg, rgb(255 255 255) 0%, rgb(241 241 241) 100%)';
      $body.style.color = 'black';
      $a.style.color = 'black';
    };
  }
  );
}


