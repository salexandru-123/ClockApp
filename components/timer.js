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
	
	/**
	 *
	 */
	constructor(time = null, element = null) {
		if(!time || !element) return;
		this.time = time;
		this.element = element;
	}

	/**Get: Return time in seconds of the object
	 * Set: Value needs to be an integer
	 */
	// Time(value=null){
	// 	if(value!=null && typeof value === 'number'){
	// 		this.time = value;
	// 		return;
	// 	}
	// 	return this.time
	// }
	/**Get: Returns the element used by the object
	 * Set: Value needs to be an object
	 */
	// Element(value=null){
	// 	if(value!=null){
	// 		this.element = value;
	// 		return;
	// 	}
	// 	return this.element;
	// }

	countdown(){
		console.log(this.element);
		const hours = String(Math.floor(this.time / 60 / 60)).padStart(2, '0');
		const minutes = String(Math.floor(this.time / 60)).padStart(2, '0');
		const seconds = String(this.time % 60).padStart(2, '0');
		this.element.textContent = `${hours}:${minutes}:${seconds}`;
		if (this.time === 0) {
			clearInterval(this.timer);
		}
		this.time--;
	};
	resetTimer(){
		this.time = 180;
		clearInterval(this.timer);
		this.countdown();
		this.timer = setInterval(countdown, 1000);
	};
	stopTimer(){
		clearInterval(this.timer);
	};
	startTimer(){
		this.timer = setInterval(this.countdown, 1000);
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
			if(i === current) 
				option.style="font-size: 2.5rem; padding: 7px 12px;";
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
		const seconds = minutsLabel.textContent;
		let time = hoursToSec(hours) + minToSec(minutes) + Number(seconds);
		
		const timerTemp = new Countdown(time,timerHistory.querySelector('.'+tempDiv.className));
		const tempDiv = document.createElement('div');
		
		tempDiv.classList.add('timer_history--1');
		timerHistory.insertAdjacentElement('beforeend',tempDiv)

		
		console.log(time);
		console.log(timerHistory.querySelector('.'+tempDiv.className));
		

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
}
export default Timer;