// DOM Elements

const time = document.getElementById('time');
const ampmTime = document.getElementById('ampm');
const greeting = document.getElementById('greeting');
const userName = document.getElementById('user-name');
const focus = document.getElementById('focus');

// Option for AM or PM

const showAMorPM = true;

// This is to display the current time.

function currentTime() {
  let today = new Date(),
   hour = today.getHours(),
   mins = today.getMinutes(),
   secs = today.getSeconds();

   // This will set AM or PM

   const amPm = hour >= 12 ? 'PM' : 'AM';

   // 12hr format
   hour = hour % 12 || 12;

   // Output the time

   time.innerHTML = `${hour}<span>:</span>${addZero(mins)}<span>:</span>${addZero(secs)}`;
   ampmTime.innerHTML = `${showAMorPM ? amPm : ''}`;
   setTimeout(currentTime, 1000);
}

// Function to add zero's to the minutes and seconds in single digits.

function addZero(num) {
  return (parseInt(num, 10) < 10 ? '0' : '') + num;
}

// Set the background and greeting to the time of day.

function setBgGreeting () {
  let today = new Date(),
    hour = today.getHours();

    if(hour < 12) {
      // Morning
      
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?sunrise')";
      document.body.style.color = 'white';
      greeting.textContent = 'Good Morning';
    } else if (hour < 18) {
      // Afternoon
      
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?afternoon,landscape')";      
      greeting.textContent = 'Good Afternoon'; 
      document.body.style.color = 'white';
      
    } else {
      
      // Evening
      
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?night')";
      greeting.textContent = 'Good Evening';
      document.body.style.color = 'white';
    }
}

// Get the name of user

function getName () {
  if(localStorage.getItem('userName') === null) {
    userName.textContent = "[Enter Your Name]";
  } else {
    userName.textContent = localStorage.getItem('userName');
  }
  // userName.textContent = "Name"
}


// Set the name of the user

function setName(e) {
  if (e.key == 'Enter') {
    // Check if ENTER is pressed.
    // if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('userName', e.target.innerText);
      userName.blur();
      var brs = document.getElementsByTagName('br');
        while (brs.length) {
        brs[0].parentNode.removeChild(brs[0]);
}
    
  } else {
    localStorage.setItem('userName', e.target.innerText)

  }


}


// Listeners

userName.addEventListener('keyup', setName);
userName.addEventListener('blur', setName);

/*

http://api.openweathermap.org/data/2.5/weather?q=Sydney&units=metric&appid=7b069d76e3865c86d3513410c18a4226

*/

let weather = {
  apiKey: "7b069d76e3865c86d3513410c18a4226",
  fetchWeather: function(city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q="
       + city
       + "&units=metric&appid=" 
       + this.apiKey
      )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data) {
      const { name } = data;
      const { country } = data.sys;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      
      document.querySelector('.city').innerText = `Weather in ${name}, ${country}`;
      document.querySelector('.icon').src = `https://openweathermap.org/img/w/${icon}.png`
      document.querySelector('.description').innerText = description;
      document.querySelector('.temp').innerText = `${Math.round(temp)}°C`;
      document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
      document.querySelector('.wind').innerText = `Wind Speed: ${speed}km/h`;
      document.querySelector('.weather').classList.remove('loading');
      // document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?city%20of%20" + name + "')";
      document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${name}")`;
      
    },
    search: function () {
      this.fetchWeather(document.querySelector('.search-box').value);
    },
};
document
  .querySelector('.searchbtn')
  .addEventListener('click', function () {
    let inputShape = document.querySelector('.card');
    let cardTimeShape = document.querySelector('.card-time');
    cardTimeShape.classList.add('card-time-ani');
    cardTimeShape.classList.remove('.card-time');
    inputShape.classList.add('card-ani');
    inputShape.classList.remove('.card');
    let emptyBox = document.querySelector('input');
      emptyBox.innerHTML = '';
      weather.search();
  });

  document.querySelector('.search-box').addEventListener("keyup", function (event) {
    if (event.key == 'Enter') {
      let inputShape = document.querySelector('.card');
      let cardTimeShape = document.querySelector('.card-time');
      cardTimeShape.classList.add('card-time-ani');
      cardTimeShape.classList.remove('.card-time');
      inputShape.classList.add('card-ani');
      inputShape.classList.remove('.card');
      let emptyBox = document.querySelector('input');
      emptyBox.innerText = '';
      weather.search();
      
    }
    
  })

// Change background on button click

document.querySelector('.shift-bg1').addEventListener('click', function() {
  document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?cyberpunk")`;
  return;
})

document.querySelector('.shift-bg2').addEventListener('click', function() {
  document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?nature")`;
})

document.querySelector('.shift-bg3').addEventListener('click', function() {
   document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?city")`;
})


// Drop down background changer

document.querySelector('.dropbtn').addEventListener('click', function () {
  let dropBtn = document.querySelector('.dropbtn');
  
  if(dropBtn.classList) {
    let bgDrop = document.querySelector('.change-bg');
    let bgBtn1 = document.querySelector('.shift-bg1');
    let bgBtn2 = document.querySelector('.shift-bg2');
    let bgBtn3 = document.querySelector('.shift-bg3');
    bgBtn1.classList.toggle('shift-hide');
    bgBtn2.classList.toggle('shift-hide');
    bgBtn3.classList.toggle('shift-hide');
    bgDrop.classList.toggle('dropdown-bg');
    dropBtn.classList.toggle('dropbtn-rotate');
  }
 }  
);






// Search Duckduckgo Directly.

document.querySelector('.websr-btn').addEventListener('click', function () {
  let onlineSearch = document.querySelector('.online-search');
  let searchResult = onlineSearch.value;
  window.open(`https://duckduckgo.com/?q=${searchResult}&t=hc&va=u&ia=web`, "_blank");
  onlineSearch.value = '';
})

document.querySelector('.online-search').addEventListener('keyup', function (event) {
  if (event.key == 'Enter') {
  let onlineSearch = document.querySelector('.online-search');
  let searchResult = onlineSearch.value;
  window.open(`https://duckduckgo.com/?q=${searchResult}&t=hc&va=u&ia=web`, "_blank");
  onlineSearch.value = '';
  }
})




// Dock buttons open in a new tab.


let dockContainer = document.querySelectorAll('.dock__btn');
dockContainer.forEach(dockContainer => dockContainer.addEventListener('click', function (e) {
    let item = e.currentTarget.id;
    window.open(`https://www.${item}.com`, '_blank');
}));


// Docker pop up // Mobile devices

document.querySelector('.popup__btn').addEventListener('click', function () {
  let popBtn = document.querySelector('.popup__btn');
 
    if (popBtn.classList) {
      let dockPop = document.querySelector('.dock');
      let shortcutPop = document.querySelector('.shortcut-container');
    dockPop.classList.toggle('popup__menu');
    shortcutPop.classList.toggle('popup__short');
    popBtn.classList.toggle('pop__rotate');
    popBtn.classList.toggle('popup__btn-move');
  }
})




// Run the app

currentTime();
setBgGreeting();
getName();
