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
import { hoursToSec, minToSec, saveInLocalStorage} from "./functions.js";
import TimerCountdown from "./classes/TimerCountdown.js";
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

				<button name="start" class="app__btn" id="start__timer">+</button>
            </article>

			<article class='history-container' id='timers-history'>
			
			</article>
        </section>`
	
}


const Timer = function(container){
	let timers = [];
	htmlContent(container)
	// variables 

	// Constants
	
	const timer = document.getElementById("timer");
	const dropdown = document.getElementById("dropdown");
	const timerHistory = document.getElementById('timers-history');
	const startBtn = document.getElementById('start__timer');
	const [hoursLabel, minutesLabel, secondsLabel] = [...timer.querySelectorAll('.time-unit')]
	
	// Dynamic
	let dropdownObject = new TimeDropdown(dropdown);


	// Functions

	function startNewTimer(){
		const _time = hoursToSec( hoursLabel.textContent) + minToSec(minutesLabel.textContent) + Number(secondsLabel.textContent);
		if(!_time) return

		const timerObj = new TimerCountdown(timers.length, timerHistory, _time);
		timers.push(timerObj)
		timerObj.startTimer();
		saveInLocalStorage('timers', timers);
	}
	function renderLocalStorageData(key, objectClass, elementsContainer,  dataContainer = null){
		const data = localStorage.getItem(key);
		if(!data) return;
		if(dataContainer === null) return JSON.parse(data).map((obj)=>new objectClass(obj.Id, elementsContainer, obj.time))
		dataContainer = JSON.parse(data).map((obj)=>new objectClass(obj.Id, elementsContainer, obj.time))

	}
	renderLocalStorageData('timers',TimerCountdown,timerHistory,timers);
	
	

	function deleteTimer(id){
		timers.splice(id, 1);
		console.log(timers);
		saveInLocalStorage('timers', timers);
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
	startBtn.addEventListener('click', startNewTimer);
	timerHistory.addEventListener('click', function(e){
		e.preventDefault()
		const clicked = e.target.closest('.delete-timer-btn');
		console.log(e.target);
		
		if(!clicked) return;
		deleteTimer(e.target.closest('.timer_history').id);
	})
}	
export default Timer;