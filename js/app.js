'use strict';
import '../style/main.scss';



class Clock {
  constructor(deg, city) {
    this.deg = deg;
    this.city = city;

    setInterval(() => this.setDate(), 1000);
  }

  createClock() {

    const root = document.getElementById('root');

    const city = document.createElement('div');
    root.appendChild(city).className = 'clock-container';

    const clock = document.createElement('div');
    city.appendChild(clock).className = 'clock';

    const clockFace = document.createElement('div');
    clock.appendChild(clockFace).className = 'clock-face'
    clockFace.id = this.city;

    const markerCover = document.createElement('div');
    clockFace.appendChild(markerCover).className = 'face-cover';

    const handPin = document.createElement('div');
    clockFace.appendChild(handPin).className = 'pin';

    const handClass = ['hand hour-hand', 'hand min-hand', 'hand second-hand'];
    handClass.forEach(function(el) {
      const hands = document.createElement('div');
      hands.className = el;
      clockFace.appendChild(hands)
    })


    let sum = 0;
    for (var i = 0; i < 6; i++ ) {
      const markers = document.createElement('div');
      const clone = markers.cloneNode();
      clockFace.appendChild(clone).className = 'marker';
      let deg = 30;
      clone.style.transform = `rotate(${sum}deg)`;
      sum += deg;
    }


    const cityName = document.createElement('div');
    clock.appendChild(cityName).innerText = this.city.replace(/-/g, ' ').toUpperCase();
    cityName.className = 'city-name';
  }

  setDate() {
    const cityID = this.city
    // for each individual clock
    const hourHand = document.getElementById(`${cityID}`).firstChild.nextSibling.nextSibling;
    const minHand = hourHand.nextSibling;
    const secHand = minHand.nextSibling;

    const now = new Date();

    const seconds = now.getSeconds();
    const secDeg = ((seconds / 60) * 360) + 90; // 90 - positioning hands on Y axis (start) + secDeg each second
    secHand.style.transform = `rotate(${secDeg}deg)`;
    // 1s, 1min = 6deg

    const mins = now.getMinutes();
    // add below ((seconds / 60) * 6) and minDeg will additionally increase 0.1 each second giving smooth move of minHand between minutes over 60s
    const minDeg = ((mins / 60) * 360) + 90;
    minHand.style.transform = `rotate(${minDeg}deg)`;

    // 1h = 30deg

    const hrs = now.getHours();
    const hrsDeg = ((hrs / 12) * 360) + ((mins / 60) * 30) + 90 + this.deg  ; // + 0.5 each minute
    hourHand.style.transform = `rotate(${hrsDeg}deg)`;

    // avoiding hands from rotating back to starting position when 90deg is reached
    (secDeg === 90) ? secHand.style.transition = '0s' : secHand.style.transition = '0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)';
    (minDeg === 90) ? minHand.style.transition = '0s' : minHand.style.transition = '0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)';
  }
}

const London = new Clock(-180, 'new-york');
London.createClock();

const Warsaw = new Clock(0, 'warsaw');
Warsaw.createClock();

const Moscow = new Clock(60, 'moscow');
Moscow.createClock();

const Tokyo = new Clock(240, 'tokyo');
Tokyo.createClock();
