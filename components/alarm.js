import { saveInLocalStorage } from "./functions.js";
import AlarmCl from "./classes/Alarm.js";
import TimeDropdown from "./classes/TimeDropdown.js";
const Alarm = function(container){
    container.innerHTML = 
        `<section id="feature--3" class="app__feature" data-sect="3">
            <h1>Alarm</h1>
            <article id="alarm-setter">
                <div class="time-unit" data-type="hours" data-max="23" data-min="0">00</div>:
                
				<div class="time-unit" data-type="minutes" data-max="59" data-min="0">00</div>
                
				<div id="dropdown"></div>

                <button class='app__btn' id='alarm__start'>+</button>

            </article>
            <article class='history-container' id='alarms-container'>
                
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
    const [hoursLabel, minutesLabel] = [...alarm.querySelectorAll('.time-unit')]
    

    // Dynamic
	let dropdownObject = new TimeDropdown(dropdown);
    let alarms = []
    //Functions
    function startNewAlarm(){
        let tempObj = new AlarmCl(alarms.length, hoursLabel.textContent, minutesLabel.textContent, alarmsHistory)
        alarms.push(tempObj);
        tempObj.startAlarm();
        saveInLocalStorage('alarms', alarms);

    }
    
    function renderAlarms(){
        const data = localStorage.getItem('alarms')
        if(!data) return;
        alarms = [...JSON.parse(data).map((obj)=>new AlarmCl(obj.Id, obj.hour, obj.minute, alarmsHistory))];
        
        
    }
    // ------------------------------------------
    // Event Listeners && Function calls
    renderAlarms()
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
    startBtn.addEventListener('click',startNewAlarm)
    alarmsHistory.addEventListener('click', function(e){
        
    })
}
export default Alarm;