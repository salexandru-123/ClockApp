/*
# To-Do:
  - Learn how to make the countdown work:
	- Use the countdown function used in the udemy course projects
	- Find a way to make multiple timers work simuntaneously (async) 
	and send an alert at the end of each.
  - Make a start , pause , reset button
  - Make a system to store the history of timers
  
  - Fix margin not resetting after clicking off the time-unit el

*/
import { hoursToSec, minToSec } from "./functions.js";
class Countdown{
	time;
	element;
	timer;
	timeTemp = this.time;
	/**
	 *
	 */
	constructor(time = null, element = null) {
		this.time = time;
		this.element = element;
		this.timeTemp = time;
		
	}


	countdown(){
		if(this.timeTemp===null ) this.timeTemp = this.time
		const hours = String(Math.floor(this.timeTemp / 60 / 60)).padStart(2, '0');
		const minutes = String(Math.floor(this.timeTemp / 60)).padStart(2, '0');
		const seconds = String(this.timeTemp % 60).padStart(2, '0');
		this.element.textContent= `${hours}:${minutes}:${seconds}`;
		if(this.element.getAttribute('data-hours')===null){			
			this.element.setAttribute('data-hours',hours);
			this.element.setAttribute('data-minutes',minutes);
			this.element.setAttribute('data-seconds',seconds);
		}else{
			this.element.dataset.hours = hours;
			this.element.dataset.minutes = minutes;
			this.element.dataset.seconds = seconds;
		}
		if (this.timeTemp === 0) {
			clearInterval(this.timer);
			return
		}
		this.timeTemp--;
	};
	resetTimer(){
		this.timeTemp = this.time;
		clearInterval(this.timer);
		this.timer = setInterval(this.countdown.bind(this), 1000);
	};
	pauseTimer(){
		clearInterval(this.timer);
	};
	unpauseTimer(value){
		this.timeTemp = value;
		this.timer = setInterval(this.countdown.bind(this), 1000);
	}
	startTimer(){
		this.timer = setInterval(this.countdown.bind(this), 1000);
	}
}

function htmlContent(_container){
	// load dynamic html
	_container.innerHTML = `
        <section id="feature--2" class="app__feature" data-sect="2">
            
            <h1>Timer</h1>
			
            <article id="timer">
                <div class="time-unit" data-type="hours" data-max="23" data-min="0">00</div>:
                
				<div class="time-unit" data-type="minutes" data-max="59" data-min="0">00</div>:
                
				<div class="time-unit" data-type="seconds" data-max="59" data-min="0">00</div>
              	
				<div id="dropdown"></div>
            </article>
            <div id='timer-buttons'>
                <button name="start" class="timer__btn" id="start__timer">&#10148;</button>
                
				<button name="stop"  class="timer__btn" id="stop__timer">&#9209;</button>
                
				<button name="reset" class="timer__btn" id="reset__timer">&#8634;</button>
            </div>
			<div id='timers-history'></div>
        </section>`
}


const Timer = function(container){
	htmlContent(container)

	// variables 

	// Constants
	
	const timerObj = new Countdown();
	const timer = document.getElementById("timer");
	const dropdown = document.getElementById("dropdown");
	const timerHistory = document.getElementById('timers-history');
	const startBtn = document.getElementById('start__timer');
	const stopBtn = document.getElementById('stop__timer');
	const resetBtn = document.getElementById('reset__timer');
	const hoursLabel = [...timer.querySelectorAll('.time-unit')].find(el=>el.dataset.type === 'hours');
	const minutsLabel = [...timer.querySelectorAll('.time-unit')].find(el=>el.dataset.type === 'minutes');
	const secondsLabel = [...timer.querySelectorAll('.time-unit')].find(el=>el.dataset.type === 'seconds');
	// Dynamic
	let activeElement = null;// will be set when clicked on a timer element
	


	// Functions

	function pad(num) {
		return String(num).padStart(2, '0');
	}
	function closeDropdown(){
		if(activeElement) activeElement.style.margin = '0';
		activeElement = null
		dropdown.style.display = "none";
	}
	
	function showDropdown(el) {
		// Uncomment if you need these
		// const type = el.dataset.type;
		// const min = parseInt(el.dataset.min);
		const max = parseInt(el.dataset.max);
		const rect = el.getBoundingClientRect();
		const containerRect = timer.getBoundingClientRect();
		const current = parseInt(el.textContent);
		let rectHeight = rect.bottom-rect.top;
		dropdown.style.display = "inline-flex";
		// distance between the container and the element left side
		dropdown.style.left = `${rect.left-containerRect.left}px`;

		dropdown.innerHTML = "";

		for (let i = current - 2; i <= current + 2; i++) {
			let value = (i + (max + 1)) % (max + 1); // wrap around
			const option = document.createElement("div");
			
			option.className = "dropdown-option";
			option.textContent = pad(value);
			option.style.display = 'block';
			if(i === current) option.style="font-size: 2.5rem; padding: 7px 12px;";
			option.onclick = () => {
				el.textContent = pad(value);
				dropdown.style.display = "none";
			};
			dropdown.appendChild(option);
		}
		activeElement = el;
	}

	function startTimer(){
		const hours = hoursLabel.textContent;
		const minutes = minutsLabel.textContent;
		const seconds = secondsLabel.textContent;
		let _time = hoursToSec(hours) + minToSec(minutes) + Number(seconds);
		

		const tempDiv = document.createElement('div');
		tempDiv.classList.add('timer_history--1');
		
		timerHistory.insertAdjacentElement('beforeend', tempDiv)
		// console.log(timerHistory.querySelector('.'+tempDiv.className));
		timerObj.time = _time;
		timerObj.element = tempDiv;
		console.log(timerObj.time, timerObj.element);
		
		timerObj.startTimer();
		

		
		// console.log(time);
		// console.log(timerHistory.querySelector('.'+tempDiv.className));
		

	}

	const resetTimer = function(){
		const timerElement = timerHistory.querySelector('.timer_history--1');
		
		timerObj.element = timerElement;
		timerObj.resetTimer();
		
	}
	const pauseTimer = function(){
		startBtn.textContent = '&#9724;';
		
		// Make the start button turno into pause and unpause button when clicking it
		// and use this function for that
		timerObj.pauseTimer();
		
	}
	const unpauseTimer = function(){
		startBtn.textContent = '&#10148;';
		const timerElement = timerHistory.querySelector('.timer_history--1');
		const hours = timerElement.dataset.hours;
		const minutes = timerElement.dataset.minutes;
		const seconds = timerElement.dataset.seconds;
		let currentTime = hoursToSec(hours) + minToSec(minutes) + Number(seconds);
		
		timerObj.unpauseTimer(currentTime);
	}
	// ------------------------------

	// Event Listeners

	// Toggle On the dropdown when clicking the time-unit element
	timer.addEventListener("click", (e) => {
		if(activeElement) activeElement.style.margin = '0';
		if (e.target.classList.contains("time-unit")) {
			e.target.style.margin='0 12px 19px 0'
			showDropdown(e.target);
		}
	});

	// Toggle Off the dropdown when clicking outside the time-unit element
	document.addEventListener("click", (e) => {
		if (!e.target.classList.contains("time-unit") 
			&& !dropdown.contains(e.target)) {
			closeDropdown()
		}
	});
	
	// Mouse Wheel functionality
	timer.addEventListener("wheel", (e) => {
		e.preventDefault();
		if (activeElement) {//activeElement will be set to our e.target after clicking it
			let value = parseInt(activeElement.textContent);
			let min = parseInt(activeElement.dataset.min);
			let max = parseInt(activeElement.dataset.max);
			value += e.deltaY < 0 ? -1 : 1;
			if (value > max) value = min;
			if (value < min) value = max;
			activeElement.textContent = pad(value);
			showDropdown(activeElement); // refresh dropdown
		}
	});
	
	// Enter key functionality
	document.addEventListener("keydown", (e) => {
		if (e.key === "Enter" && activeElement) {
			closeDropdown();
		}
	});
    
	// Start Button Event listener
	startBtn.addEventListener('click', (e)=>{
		e.preventDefault();
		startTimer();
	})
	resetBtn.addEventListener('click', resetTimer);
	stopBtn.addEventListener('click', pauseTimer);
}
export default Timer;