/*
* This actual version works with a single timer.

# To-Do:
	- Fix the timer so that the user can set multiple timers and stop
		them independently
	- Make a system to store the history of timers
	- Let the user reuse old timers and add a start pause and reset 
  		button on each of them
  

*/
import { hoursToSec, minToSec, pad} from "./functions.js";
import Countdown from "./classes/Countdown.js";
import TimeDropdown from "./classes/TimeDropdown.js"
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

            <article id='timer-buttons'>
                <button name="start" class="app__btn" id="start__timer">&#10148;</button>
                
				<button name="pause" class="app__btn hidden" id="pause__timer">&#8214;</button>

				<button name="reset" class="app__btn" id="reset__timer">&#8634;</button>
            </article>
			<article id='timers-history'>
			
			</article>
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
	const [hoursLabel, minutesLabel, secondsLabel] = [...timer.querySelectorAll('.time-unit')]
	
	// Dynamic
	let dropdownObject = new TimeDropdown(dropdown);


	// Functions

	// start timer functionality
	// this method is used both for unpause and starting the timer
	// FIX THIS TO HANDLE MULTIPLE TIMERS FROM THE HISTORY
	function startTimer(){
		let tempDiv,hours,minutes,seconds;
		
		
		//	if there aren't any elements in the history
		// 	create it with the chosen time 
		// 	else get the time from the current element and start from there
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
		// we pass in the start,pause btn element to dynamically switch them
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
	timer.addEventListener("click", (e)=>{
		e.preventDefault();
		dropdownObject.handleClick(e.target);
	}
	)
	// 	(e) => {
	// 	if(dropdownObject.timeUnitElement) dropdownObject.timeUnitElement.style.margin = '0';
	// 	if (e.target.closest(".time-unit")) {
	// 		// this fixes the margin when clicking on the element to 
	// 		// appear centered
	// 		e.target.style.margin='0 12px 19px 0'
	// 		dropdownObject.showDropdown(e.target);
	// 		dropdownObject.timeUnitElement = e.target
	// 	}
	// });


	// Toggle Off the dropdown when clicking outside the time-unit element
	document.addEventListener("click", (e) => {
		if (!e.target.closest(".time-unit") 
			&& !dropdown.contains(e.target)) {
			dropdownObject.closeDropdown();
		}
	});
	
	// Mouse Wheel functionality
	timer.addEventListener("wheel", (e)=>{
		e.preventDefault();
		dropdownObject.handleWheel(e);
	}
);
	
	// Enter key functionality
	document.addEventListener("keydown", (e) => {
		if (e.key === "Enter" && dropdownObject.timeUnitElement) {
			dropdownObject.closeDropdown();
		}
	});
    
	// Buttons Event listener
	startBtn.addEventListener('click', startTimer.bind());
	pauseBtn.addEventListener('click', timerObj.pauseTimer);
	resetBtn.addEventListener('click', resetTimer);
}
export default Timer;