const weather = document.querySelector(".js-weather");

const API_KEY = "8c55b38e758452fafd8d3475b50a179d";

const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json(); //JSON 데이터를 가져오는거임 그 저 주소 카피에서 브라우저에 띄우면 나오는 정보 있잖아 그걸 response 에서 가져오고 싶은거임
    })
    .then(function (json) {
      // 요 위에것도 기다리게 할거임 그래서 then 한번 더 쓸거.
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}°C
       ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

//그냥 밑에 함수에 localStorage써도 되는데 니코는 쪼개서 만드는게 좋다네.
function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  }; // 꼭 Obj 붙여야되는거 아니야. 그냥 알기 쉬우라고.
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
