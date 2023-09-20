let date = document.getElementById("date");
let month = document.getElementById("month");
let year = document.getElementById("year");
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let day = document.getElementById("day");
let temp = document.getElementById("temp");

let hourInput = document.getElementById("hourInput");
let minInput = document.getElementById("minInput");
let setAlarmButton = document.getElementById("set-alarm-button");

let searchInput = document.getElementById("search-input");
let submitButton = document.getElementById("submit-button");

let cityElement = document.getElementById("city");
let lastUpdatedElement = document.getElementById("last-updated");
let weatherIconElement = document.getElementById("weather-icon");
let conditionTextElement = document.getElementById("condition-text");
let temperatureElement = document.getElementById("temp1");
let feelsLikeElement = document.getElementById("feels-like");
let precipitationElement = document.getElementById("precipitation");
let windElement = document.getElementById("wind");
let humidityElement = document.getElementById("humidity");

let alarmTodo = document.getElementById("alarm-todo-list-container");

let stopButton = document.getElementById("stop-alarm");

let alarmInput;
let currentTime;
let snoozeKey;

// let alarmID;

// let autoSnoozeKey1;
// let autoSnoozeKey2;
// let autoSnoozeKey3;

let noAlarmsMessage = document.createElement("div");
noAlarmsMessage.classList.add("no-alarms-message");
noAlarmsMessage.textContent = "No alarms have been set on the clock.";

// Alert Functions
function showSuccessMessage(message) {
  let timeoutID;
  // Create the success alert div
  let successAlert = document.createElement("div");
  successAlert.className = "success alert top";
  successAlert.innerHTML = `
  <div class="content">
  <div class="icon">
    <svg width="50" height="50" id="Layer_1" style="enable-background: new 0 0 128 128" version="1.1" viewBox="0 0 128 128" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g><circle fill="#fff" cx="64" cy="64" r="64" /></g>
    <g>
      <path fill="#3EBD61" d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z"/>
    </g>
    </svg>
  </div>
  <p>${message}</p>
</div>
<button class="close">
  <svg height="18px" id="Layer_1" style="enable-background: new 0 0 512 512" version="1.1" viewBox="0 0 512 512" width="18px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path fill="#69727D" d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
  </svg>
</button>
`;

  document.body.appendChild(successAlert);

  let closeButton = successAlert.querySelector(".close");
  closeButton.addEventListener("click", () => {
    document.body.removeChild(successAlert);
    clearTimeout(timeoutID);
  });

  timeoutID = setTimeout(() => {
    document.body.removeChild(successAlert);
  }, 1500);
}
function showInfoMessage(message, alarmID) {
  let alarmTone = new Audio("./res/samsung_galaxy_alarm.mp3");
  alarmTone.play();
  let timeoutID;

  // Create the success alert div
  let infoAlert = document.createElement("div");
  infoAlert.className = "info alert top";
  infoAlert.innerHTML = `
  <div class="content">
  <div class="icon">
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="50" height="50" rx="25" fill="white" />
  <path d="M27 22H23V40H27V22Z" fill="#006CE3" />
  <path d="M25 18C24.2089 18 23.4355 17.7654 22.7777 17.3259C22.1199 16.8864 21.6072 16.2616 21.3045 15.5307C21.0017 14.7998 20.9225 13.9956 21.0769 13.2196C21.2312 12.4437 21.6122 11.731 22.1716 11.1716C22.731 10.6122 23.4437 10.2312 24.2196 10.0769C24.9956 9.92252 25.7998 10.0017 26.5307 10.3045C27.2616 10.6072 27.8864 11.1199 28.3259 11.7777C28.7654 12.4355 29 13.2089 29 14C29 15.0609 28.5786 16.0783 27.8284 16.8284C27.0783 17.5786 26.0609 18 25 18V18Z" fill="#006CE3" />
    </svg>
    </div>
    <i class="fa-solid fa-bell fa-shake" style="color: #ffffff;"></i><p>${message}</p>
</div>
<div id="alarm-action-button-container">
<button type="submit" id="snooze-button" onmouseover="toggleSnoozeIcon(true)" onmouseout="toggleSnoozeIcon(false)">
<img width="50" height="50" src="./res/icons8-snooze-50.png" alt="alarm-snooze" class="shaky-icon">
<img width="50" height="50" src="./res/snoozeDark50.png" alt="alarm-snooze" class="shaky-icon hover-icon"> Snooze Alarm
</button>     
 <button class="close" id="stop-alarm">
 Stop Alarm
 <svg height="18px" id="Layer_1" style="enable-background: new 0 0 512 512" version="1.1" viewBox="0 0 512 512" width="18px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
   <path fill="#69727D" d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
 </button>
</div>
`;
  document.body.appendChild(infoAlert);

  let snoozeButton = infoAlert.querySelector("#snooze-button");
  let closeButton = infoAlert.querySelector(".close");

  snoozeButton.addEventListener("click", () => {
    alarmTone.pause();
    alarmTone.currentTime = 0;
    document.body.removeChild(infoAlert);

    snoozeKey = snoozeKeyGenerator(currentTime);

    localStorage.setItem(`${alarmID}snooze${snoozeKey}`, `${alarmID}`);

    clearTimeout(timeoutID);
    //  clearTimeout(snoozeTimeoutID);
    showSuccessMessage("Alarm Snoozed for 3 mins.");
  });

  closeButton.addEventListener("click", () => {
    alarmTone.pause();
    alarmTone.currentTime = 0;

    document.body.removeChild(infoAlert);

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.includes(`${alarmID}auto`)) {
        localStorage.removeItem(key);
        i--;
      }
    }

    clearTimeout(timeoutID);
  });

  timeoutID = setTimeout(() => {
    document.body.removeChild(infoAlert);
    console.log("autoTimer Set");
  }, 30000);
}

function showWarningMessage(error) {
  let timeoutID;
  // Create the success alert div
  let warningAlert = document.createElement("div");
  warningAlert.className = "warning alert top";
  warningAlert.innerHTML = `
    <div class="content">
      <div class="icon">
        <svg height="50" viewBox="0 0 512 512" width="50" xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff" d="M449.07,399.08,278.64,82.58c-12.08-22.44-44.26-22.44-56.35,0L51.87,399.08A32,32,0,0,0,80,446.25H420.89A32,32,0,0,0,449.07,399.08Zm-198.6-1.83a20,20,0,1,1,20-20A20,20,0,0,1,250.47,397.25ZM272.19,196.1l-5.74,122a16,16,0,0,1-32,0l-5.74-121.95v0a21.73,21.73,0,0,1,21.5-22.69h.21a21.74,21.74,0,0,1,21.73,22.7Z"/>
        </svg>
      </div>
      <p>${error}</p>
    </div>
    <button class="close">
      <svg height="18px" id="Layer_1" style="enable-background: new 0 0 512 512" version="1.1" viewBox="0 0 512 512" width="18px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <path fill="#69727D" d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
      </svg>
    </button> 
    `;
  document.body.appendChild(warningAlert);

  let closeButton = warningAlert.querySelector(".close");
  closeButton.addEventListener("click", () => {
    document.body.removeChild(warningAlert);
    clearTimeout(timeoutID);
  });

  timeoutID = setTimeout(() => {
    document.body.removeChild(warningAlert);
  }, 3000);
}
function showDangerMessage(message) {
  let pop = new Audio("./res/pop.wav");
  pop.play();
  let timeoutID;
  // Create the success alert div
  let dangerAlert = document.createElement("div");
  dangerAlert.className = "danger alert top";
  dangerAlert.innerHTML = `
    <div class="content">
      <div class="icon">
        <svg height="50" viewBox="0 0 512 512" width="50" xmlns="http://www.w3.org/2000/svg">
        <path fill="#fff" d="M449.07,399.08,278.64,82.58c-12.08-22.44-44.26-22.44-56.35,0L51.87,399.08A32,32,0,0,0,80,446.25H420.89A32,32,0,0,0,449.07,399.08Zm-198.6-1.83a20,20,0,1,1,20-20A20,20,0,0,1,250.47,397.25ZM272.19,196.1l-5.74,122a16,16,0,0,1-32,0l-5.74-121.95v0a21.73,21.73,0,0,1,21.5-22.69h.21a21.74,21.74,0,0,1,21.73,22.7Z"/>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    <button class="close">
      <svg height="18px" id="Layer_1" style="enable-background: new 0 0 512 512" version="1.1" viewBox="0 0 512 512" width="18px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <path fill="#69727D" d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
      </svg>
    </button>
  `;

  document.body.appendChild(dangerAlert);

  let closeButton = dangerAlert.querySelector(".close");
  closeButton.addEventListener("click", () => {
    document.body.removeChild(dangerAlert);
    clearTimeout(timeoutID);
  });

  timeoutID = setTimeout(() => {
    document.body.removeChild(dangerAlert);
  }, 3000);
}
function snoozeKeyGenerator(value) {
  let hours = parseInt(value.substring(0, 2), 10);
  let minutes = parseInt(value.substring(2, 4), 10);
  minutes += 3;
  if (minutes >= 60) {
    minutes = 0;
    hours += 1;
  }
  if (hours >= 24) {
    hours = 0;
  }
  let newTime = `${hours.toString().padStart(2, "0")}${minutes.toString().padStart(2, "0")}00`;
  return newTime;
}

window.addEventListener("load", () => {
  let alarmFound = false;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("alarm")) {
      createAlarmElement(key, localStorage.getItem(localStorage.key(i)));
      alarmFound = true;
    }
  }

  if (!alarmFound) {
    showNoAlarmsMessage("No alarms set yet.");
    alarmFound = false;
  }
  handleLocation();

  // Call handleLocation every 1000 milliseconds (1 second)
  setInterval(handleLocation, 60000);
});

function clock() {
  let a = new Date();
  let d = a.getDate();
  let m = a.getMonth() + 1;
  let y = a.getFullYear();
  let h = a.getHours();
  let min = a.getMinutes();
  let s = a.getSeconds();
  let dy = a.getDay();
  //   console.log(m);
  let arr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let days = arr[dy];

  d = d < 10 ? "0" + d : d;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  min = min < 10 ? "0" + min : min;
  s = s < 10 ? "0" + s : s;

  date.innerHTML = d;
  month.innerHTML = m;
  year.innerHTML = y;
  hours.innerHTML = h;
  minutes.innerHTML = min;
  seconds.innerHTML = s;
  day.innerHTML = days;

  currentTime = `${h}${min}${s}`;
  let done = false;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!done) {
      if (key.includes(`alarm${currentTime}`)) {
        done = true;
        const alarmID = localStorage.getItem(key);
        showInfoMessage("Alarm!!!!", alarmID);
        //   console.log("alarm tone played", key);
        //   console.log(alarmID);

        const autoSnoozeKey1 = snoozeKeyGenerator(currentTime);
        const autoSnoozeKey2 = snoozeKeyGenerator(autoSnoozeKey1);
        const autoSnoozeKey3 = snoozeKeyGenerator(autoSnoozeKey2);

        localStorage.setItem(`${alarmID}autoSnoozeKey${autoSnoozeKey1}`, `${alarmID}`);
        localStorage.setItem(`${alarmID}autoSnoozeKey${autoSnoozeKey2}`, `${alarmID}`);
        localStorage.setItem(`${alarmID}autoSnoozeKey${autoSnoozeKey3}`, `${alarmID}`);
        console.log("autoTimer keys Set");

        if (done) {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes(`SnoozeKey${currentTime}`)) {
              localStorage.removeItem(key);
              //   console.log("auto snooze removed", key);
            }
            if (key.includes(`snooze${currentTime}`)) {
              localStorage.removeItem(key);
              //   console.log("clicked snooze removed", key);
            }
          }
        }
      }
    }
  }

  let snoozeDone = false;

  if (!done) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!snoozeDone) {
        if (key.includes(`snooze${currentTime}`)) {
          const alarmID = localStorage.getItem(key);
          showInfoMessage("Alarm!!!!", alarmID);
          //  console.log(" clicked snooze tone played", key);
          //  console.log(alarmID);
          snoozeDone = true;
          localStorage.removeItem(key);
          //  console.log("clicked snooze removed", key);

          if (snoozeDone) {
            for (let i = 0; i < localStorage.length; i++) {
              const key = localStorage.key(i);
              if (key.includes(`SnoozeKey${currentTime}`)) {
                localStorage.removeItem(key);
                //  console.log("auto snooze removed", key);
              }
            }
          }
        }
      }
    }
  }

  if (!done && !snoozeDone) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.includes(`SnoozeKey${currentTime}`)) {
        const alarmID = localStorage.getItem(key);
        showInfoMessage("Alarm!!!!", alarmID);
        //   console.log(" auto snooze tone played");
        //   console.log(alarmID);
        localStorage.removeItem(key);
        //   console.log("auto snooze removed", key);
      }
    }
  }
}

setInterval(clock, 1000);

//This function shows No Alarm Message in Alarm Todo//
function showNoAlarmsMessage() {
  let alarmFound = false;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("alarm")) {
      alarmFound = true;
      break;
    }
  }

  if (!alarmFound) {
    alarmTodo.appendChild(noAlarmsMessage);
  }
}
showNoAlarmsMessage();

//Click Event Listener for Set Alarm Button
setAlarmButton.addEventListener("click", setAlarm);

//This function is for setting Alarm
function setAlarm() {
  let hourValue = parseInt(hourInput.value);
  let minValue = parseInt(minInput.value);

  if (
    isNaN(hourValue) ||
    isNaN(minValue) ||
    hourValue < 0 ||
    hourValue > 23 ||
    minValue < 0 ||
    minValue > 59
  ) {
    showDangerMessage("Please enter valid hour and minute values.");
    return;
  }

  let formattedHour = (hourValue < 10 ? "0" : "") + hourValue;
  let formattedMin = (minValue < 10 ? "0" : "") + minValue;

  const alarmTime = `${formattedHour}${formattedMin}00`;
  const alarmKey = `alarm${formattedHour}${formattedMin}00`;
  alarmInput = `${formattedHour}:${formattedMin}`;

  for (let i = 0; i < localStorage.length; i++) {
    32;
    if (localStorage.key(i) == alarmKey) {
      showDangerMessage("You have already set alarm for this time.");
      return;
    }
  }

  localStorage.setItem(alarmKey, `${formattedHour}:${formattedMin}`);

  // Create DOM element for the new alarm
  createAlarmElement(alarmKey, `${formattedHour}:${formattedMin}`, alarmTime);
  showSuccessMessage("Alarm Set Successfully!");

  hourInput.value = "";
  minInput.value = "";
}

function createAlarmElement(key, value, alarmTime) {
  let setAlarmText = document.createElement("div");
  setAlarmText.classList.add("set-alarm-text");
  setAlarmText.id = key;
  setAlarmText.innerHTML = `Alarm is set for ${value} Hours.
    <button class="delete-button">
      <i class="fas fa-trash-alt"></i> <span class="icon-text">Delete</span>
    </button><br>
  `;
  //   console.log(key);
  noAlarmsMessage.remove();
  let deleteButton = setAlarmText.querySelector(".delete-button");
  deleteButton.addEventListener("click", function () {
    setAlarmText.remove();
    localStorage.removeItem(key);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(`${alarmTime}`)) {
        localStorage.removeItem(key);
        i--;
      }
    }

    showSuccessMessage("Alarm Deleted Successfully!");
    let alarmFound = false;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("alarm")) {
        alarmFound = true;
        break;
      }
    }

    if (localStorage.length === 1 || !alarmFound) {
      showNoAlarmsMessage("No alarms set yet.");
      alarmFound = false;
    }
  });
  alarmTodo.appendChild(setAlarmText);
}

submitButton.addEventListener("click", () => {
  let city = searchInput.value;
  localStorage.setItem("city", city);
  getWeather(city);
  searchInput.value = "";
});
function getWeather(city) {
  let weatherData;
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=96827a9f6b244f0d9fe21207231209&q=${city}&aqi=no`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      weatherData = data;
      // console.log(data);
      temp.innerHTML = `${weatherData.current.temp_c}°C`;
      cityElement.textContent = `${weatherData.location.name}, ${weatherData.location.country}`;
      lastUpdatedElement.textContent = `Last Updated: ${weatherData.current.last_updated} LT`;
      weatherIconElement.src = weatherData.current.condition.icon;
      conditionTextElement.textContent = weatherData.current.condition.text;
      temperatureElement.textContent = `${weatherData.current.temp_c}°C`;
      feelsLikeElement.textContent = `Feels Like ${weatherData.current.feelslike_c}°C`;
      precipitationElement.textContent = `Precipitation: ${weatherData.current.precip_mm}mm`;
      windElement.textContent = `Wind: ${weatherData.current.wind_kph} km/h`;
      humidityElement.textContent = `Humidity: ${weatherData.current.humidity}%`;

      let sunrise = `${weatherData.forecast.forecastday[0].astro.sunrise}`;
      let sunset = `${weatherData.forecast.forecastday[0].astro.sunset}`;
      let localTime = `${weatherData.location.localtime}`;

      console.log("Local time in", city, ":", localTime);
      console.log("sunrise sunset", sunrise, sunset);
      backgroundChange(sunrise, sunset, localTime);
    })
    .catch((error) => {
      showWarningMessage("Something went wrong.");
      console.error("There was a problem with the fetch operation:", error);
    });
}

function toggleSnoozeIcon(isHovered) {
  const normalIcon = document.querySelector("#snooze-button .shaky-icon");
  const hoverIcon = document.querySelector("#snooze-button .hover-icon");

  if (isHovered) {
    normalIcon.style.display = "none";
    hoverIcon.style.display = "inline";
  } else {
    normalIcon.style.display = "inline";
    hoverIcon.style.display = "none";
  }
}

function backgroundChange(sunriseTime, sunsetTime, localTime) {
  const weatherContainer = document.getElementById("weather-background");
  const innerBorder = document.getElementById("inner-border");
  const extraInfoDiv = document.querySelectorAll("#extra-info > div");
  const alarmTodo = document.getElementById("alarm-todo");

  const sunrise = new Date(`2000-01-01 ${sunriseTime}`);
  const sunset = new Date(`2000-01-01 ${sunsetTime}`);
  const currentTime = new Date();
  const localTimes = new Date(localTime);

  const currentHourMinute = currentTime.getHours() * 60 + currentTime.getMinutes();
  const localHourMinute = localTimes.getHours() * 60 + localTimes.getMinutes();
  const sunriseHourMinute = sunrise.getHours() * 60 + sunrise.getMinutes();
  const sunsetHourMinute = sunset.getHours() * 60 + sunset.getMinutes();

  //   if (currentHourMinute >= sunriseHourMinute && currentHourMinute <= sunsetHourMinute) {
  if (localHourMinute >= sunriseHourMinute && localHourMinute <= sunsetHourMinute) {
    document.body.style.background = "linear-gradient(to top, #f1f2b5, #135058)";

    innerBorder.style.backgroundImage = `url(${"./res/day3.jpg"})`;
    innerBorder.style.backgroundSize = "100% 130%";

    weatherContainer.style.backgroundImage = `url(${"./res/day.jpg"})`;

    alarmTodo.style.background = "linear-gradient(to top, #f3904f, #3b4371)";

    extraInfoDiv.forEach((div) => {
      div.style.background = "linear-gradient(to right, #fbd786, #f7797d)";
      div.style.color = "black";
    });

    console.log("background day");
  } else {
    document.body.style.background = "linear-gradient(360deg, #030303 10%, #1f1f1f 360%)";

    innerBorder.style.backgroundImage = `url(${"./res/night_container.jpg"})`;
    innerBorder.style.backgroundSize = "cover";

    weatherContainer.style.backgroundImage = `url(${"./res/night.jpeg"})`;

    alarmTodo.style.background = "linear-gradient(to bottom, #000000, #434343)";

    for (let i = 0; i < extraInfoDiv.length; i++) {
      extraInfoDiv[i].style.background = "transparent";
      extraInfoDiv[i].style.color = "white";
    }

    console.log("background night");
  }
}

async function handleLocation() {
  let location = localStorage.getItem("city");

  try {
    if (location === null) {
      const city = await fetchLocationUsingIP();
      // console.log("Location fetched:", city);
      await getWeather(city);
      // console.log("Weather fetched for the location");
    } else {
      // console.log("Using saved location:", location);
      await getWeather(location);
      // console.log("Weather fetched for the saved location");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchLocationUsingIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    const ipAddress = data.ip;

    const ipcity = await getLocation(ipAddress);
    localStorage.setItem("city", `${ipcity}`);
    return ipcity;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function getLocation(ipAddress) {
  try {
    const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
    const data = await response.json();
    if (data.status === "success") {
      return `${data.city} ${data.country}`;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
