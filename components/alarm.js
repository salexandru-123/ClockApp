import { formatHour, pad, minToSec, hoursToSec } from "./functions.js";
import TimeDropdown from "./classes/TimeDropdown.js";
const Alarm = function(container){
    container.innerHTML = 
        `<section id="feature--3" class="app__feature" data-sect="3">
            <h1>Alarm</h1>
            <article id="alarm-setter">
                <div class="time-unit" data-type="hours" data-max="23" data-min="0">00</div>:
                
				<div class="time-unit" data-type="minutes" data-max="59" data-min="0">00</div>
                
				<div id="dropdown"></div>
            </article>
            <article id="alarm-setter">
                <button class='app__btn' id='alarm__start'>&#10148;</button>
                <button class='app__btn hidden' id='alarm__pause'>&#8214;</button>
                <button class='app__btn' id='alarm__reset'>&#8634;</button>
            </article>
            <article id='alarms-container'>
                
            </article>
        </section>`
    // --------------------
    // Alarm functionality:

    /**How it should work:
     *  - User sets an alarm
     *  - Alarm setted gets added to the alarms-container element
     *  - Alarm waits for the specific time chosen then sends an alert 
     *      to the user
     *  - User can insert multiple alarms
     *  - More future functionalities:
     *      - Being able to set a repetitive daily alarm
     *      - User can modify, stop or reset an alarm
     */
    const alarm = document.getElementById('alarm-setter');
    const dropdown = document.getElementById('dropdown');
    const alarmsHistory = document.getElementById('alarms-container');
    const startBtn = document.getElementById('alarm__start');
    const pauseBtn = document.getElementById('alarm__pause');
    const resetBtn = document.getElementById('alarm__reset');
    const [hoursLabel, minutesLabel] = [...alarm.querySelectorAll('.time-unit')]

    // Dynamic
	let dropdownObject = new TimeDropdown(dropdown);

    const startAlarm = function(e){
        startBtn.classList.toggle('hidden');
        pauseBtn.classList.toggle('hidden');
    }
    const pauseAlarm = function(e){
        startBtn.classList.toggle('hidden');
        pauseBtn.classList.toggle('hidden');
    }
    const resetAlarm = function(e){

    }
    document.addEventListener('keydown', (e)=>{
        if(e.key ==='Enter' && dropdownObject.timeUnitElement){
            dropdownObject.closeDropdown()
        }
    })
    document.addEventListener('click', (e)=>{
        if(!e.target.closest('.time-unit')
            && !dropdown.contains(e.target)){
                dropdownObject.closeDropdown()
        }
    })
    alarm.addEventListener('click', (e)=>{
        e.preventDefault();
        dropdownObject.handleClick(e.target);
    });
    alarm.addEventListener('wheel', (e)=>{
        e.preventDefault()
        dropdownObject.handleWheel(e);
    })
    startBtn.addEventListener('click',startAlarm)
    pauseBtn.addEventListener('click',pauseAlarm)
    resetBtn.addEventListener('click',resetAlarm)
}
export default Alarm;