import { formatHour, pad, minToSec, hoursToSec } from "./functions.js";
const Alarm = function(container){
    container.innerHTML = 
        `<section id="feature--3" class="app__feature" data-sect="3">
            <h1>Alarm</h1>
            <article id="alarm-setter">
                <div class="time-unit" data-type="hours" data-max="23" data-min="0">00</div>:
                
				<div class="time-unit" data-type="minutes" data-max="59" data-min="0">00</div>
                
				<div id="dropdown"></div>
            </article>
            <article class='alarms-container'>
                
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
}
export default Alarm;