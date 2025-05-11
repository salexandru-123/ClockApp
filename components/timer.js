/*
# To-Do:
  - Make a system to store the history of timers
  - Let the user reuse old timers and add a start pause and reset 
  	button on each of them
  

*/
import { hoursToSec, minToSec, pad} from "./functions.js";
import Countdown from "./classes/Countdown.js";
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
                
				<button name="pause" class="timer__btn hidden" id="pause__timer">&#8214;</button>

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
	const resetBtn = document.getElementById('reset__timer');
	const pauseBtn = document.getElementById('pause__timer');
	const hoursLabel = [...timer.querySelectorAll('.time-unit')].find(el=>el.dataset.type === 'hours');
	const minutesLabel = [...timer.querySelectorAll('.time-unit')].find(el=>el.dataset.type === 'minutes');
	const secondsLabel = [...timer.querySelectorAll('.time-unit')].find(el=>el.dataset.type === 'seconds');
	
	// Dynamic
	let activeElement = null;// will be set when clicked on a timer element
	


	// Functions

	
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
	
	// start timer functionality
	function startTimer(e,index = null){
		let tempDiv,hours,minutes,seconds;
		if(timerHistory.childElementCount===0){
			hours = hoursLabel.textContent;
			minutes = minutesLabel.textContent;
			seconds = secondsLabel.textContent;
			tempDiv = document.createElement('div');
			tempDiv.classList.add('timer_history--1');
			timerHistory.insertAdjacentElement('beforeend', tempDiv)
		}
		else{
			tempDiv = timerHistory.querySelector(`.timer_history--1`);
			[hours, minutes, seconds] = tempDiv.textContent.split(':').map(val => Number(val));
		}
		const _time = hoursToSec(hours) + minToSec(minutes) + Number(seconds);
		timerObj.time = _time;
		timerObj.element = tempDiv;
		timerObj.startTimer(startBtn, pauseBtn);
	}

	// reset timer functionality
	const resetTimer = function(){
		const timerElement = timerHistory.querySelector('.timer_history--1');	
		timerObj.element = timerElement;
		timerObj.resetTimer();
		
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
    
	// Buttons Event listener
	startBtn.addEventListener('click',startTimer.bind());
	pauseBtn.addEventListener('click', timerObj.pauseTimer);
	resetBtn.addEventListener('click', resetTimer);
}
export default Timer;