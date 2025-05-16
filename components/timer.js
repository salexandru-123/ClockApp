/*
* This actual version works with a single timer.

# To-Do:
	- Fix the timer so that the user can set multiple timers and stop
		them independently
	- Make a system to store the history of timers:
		- USE JSON TO STORE DATA IN THE LOCALSTORAGE
		- LOOK IN CHATGPT HISTORY FOR MORE INFO
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
                <button name="add" class="app__btn" id="add__timer">&#10148;</button>
            </article>
			<article id='timers-history'>
				<!--
				<button name="pause" class="app__btn hidden" id="pause__timer">&#8214;</button>

				<button name="reset" class="app__btn" id="reset__timer">&#8634;</button>
				-->
			</article>
        </section>`
	
}
const Timer = function(container){
	htmlContent(container)
	// variables 

	// Constants
	
	const timer = document.getElementById("timer");
	const dropdown = document.getElementById("dropdown");
	const timerHistory = document.getElementById('timers-history');
	const addBtn = document.getElementById('add__timer');
	const [hoursLabel, minutesLabel, secondsLabel] = [...timer.querySelectorAll('.time-unit')]
	
	// Dynamic
	let dropdownObject = new TimeDropdown(dropdown);
	let timers = [];


	// Functions
	
	// start timer functionality
	// this method is used both for unpause and starting the timer
	// FIX THIS TO HANDLE MULTIPLE TIMERS FROM THE HISTORY
	function addNewTimer(){
		let hours,minutes,seconds;
		//	if there aren't any elements in the history
		// 	create it with the chosen time 
		// 	else get the time from the current element and start from there
		// We need to add the new timer to local storage
		hours = hoursLabel.textContent;
		minutes = minutesLabel.textContent;
		seconds = secondsLabel.textContent;
		
		const tempTimerObj = new Countdown();
		const timeInSecs = hoursToSec(hours) + minToSec(minutes) + Number(seconds);
		tempTimerObj.time = timeInSecs;
		timerHistory.insertAdjacentHTML('beforeend',
			`
				<div class='timer-history' id='timer--${timers.length}'></div>
			`)

	}

	
	// ------------------------------

	// Event Listeners

	// Toggle On the dropdown when clicking the time-unit element
	timer.addEventListener("click", (e)=>{
		e.preventDefault();
		dropdownObject.handleClick(e.target);
	}
	);
	// Mouse Wheel functionality
	timer.addEventListener("wheel", (e)=>{
		e.preventDefault();
		dropdownObject.handleWheel(e);
	}
	);
	// Toggle Off the dropdown when clicking outside the time-unit element
	document.addEventListener("click", (e) => {
		if (!e.target.closest(".time-unit") 
			&& !dropdown.contains(e.target)) {
			dropdownObject.closeDropdown();
		}
	});
	// Enter key functionality
	document.addEventListener("keydown", (e) => {
		if (e.key === "Enter" && dropdownObject.timeUnitElement) {
			dropdownObject.closeDropdown();
		}
	});
	// Buttons Event listener
	addBtn.addEventListener('click', addNewTimer);
}
export default Timer;