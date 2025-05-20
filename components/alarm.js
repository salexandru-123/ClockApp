import { formatHour, pad, minToSec, hoursToSec } from "./functions.js";
import TimeDropdown from "./classes/TimeDropdown.js";
import { renderCountdowns, saveCountdowns} from "./functions.js";
import Countdown from "./classes/Countdown.js";

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
                <button class='app__btn' id='alarm__add'>&#10148;</button>
            </article>
            <article id='alarms-container'>
                <!--
                <button class='app__btn hidden' id='alarm__pause'>&#8214;</button>
                <button class='app__btn' id='alarm__reset'>&#8634;</button>
                -->
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
    const addBtn = document.getElementById('alarm__add');
    const [hoursLabel, minutesLabel] = [...alarm.querySelectorAll('.time-unit')]
    
    // Dynamic
	let dropdownObject = new TimeDropdown(dropdown);
    let alarms = []
    let alarmInterval;
    renderCountdowns(alarmsHistory, 'alarms')
    // Functions
    const waitForAlarm = function(alarmTime, interval){
        const hour = new Date().setHours(alarmTime.slice(0,2), alarmTime.slice(3,5))
        
        const hourISOFormat = String(new Date(hour).toISOString().slice(11,16));
        console.log('in the interval');
        
        if(hourISOFormat === String(new Date().toISOString().slice(11,16))){
            console.log('inside:',alarmTime);
            
            alert('alarm alarm alarm!')
            clearInterval(interval);
        }
    }
    const addAlarm = function(e){
        const alarm_hour = hoursLabel.textContent+':'+minutesLabel.textContent;
        
        alarmInterval = setInterval(()=>waitForAlarm(alarm_hour, alarmInterval) ,1000)
        alarms.push({
            id: alarms.length,
            hour: alarm_hour,
            loop: false,
            running: true,
            timer: alarmInterval,
        });
        saveCountdowns(alarms,'alarms');
    }
    
    addBtn.addEventListener('click',addAlarm)


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
    }
export default Alarm;