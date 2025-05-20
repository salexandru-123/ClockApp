/**A function that returns a formatted string from a Date object
 * 
 * Returns a string formatted as follows:
 *  - if (short) returns a time formatted like this 'hh:mm' 
 *  - if (!short) returns a time formatted like this 'hh:mm:ss'
 * 
 * Required argument:
 *  - **date** as a Date Object
*/
import Countdown from "./classes/Countdown.js";
const formatHour = function(date, short = false){ //typeof date === Date

    if(typeof date != 'object') return
    let str;
    if(!short) {
        str = String(date.getHours()).padStart(2, '0')
        +':'+
        String(date.getMinutes()).padStart(2, '0')
        +':'+
        String(date.getSeconds()).padStart(2, '0');
    }
    else{
        str = String(date.getHours()).padStart(2, '0')
        +':'+
        String(date.getMinutes()).padStart(2, '0');
    }
    return str
}
const formatSeconds = function(secs, short = false){
    if(short) return new Date(secs*1000).toISOString().slice(11,16);
    return new Date(secs*1000).toISOString().slice(11,19);
}
const hoursToSec = function(hours){
    return Number(hours)*60*60
}
const minToSec = function(minutes){
    return Number(minutes)*60
}
function pad(num) {
    return String(num).padStart(2, '0');
}
function renderCountdowns(container, itemKey){
	
	if(!['undefined', null].includes(localStorage.getItem(itemKey))){

		return JSON.parse(localStorage.getItem(itemKey)).map(object=>new Countdown(object.id, object.isRunning, object.startingTime, container, object.remainingTime));			
	}
	return []
}
function saveCountdowns(array, itemKey){
	localStorage.setItem(itemKey, JSON.stringify(array));
}


export {
    formatHour,
    minToSec,
    hoursToSec,
    pad,
    formatSeconds,
    renderCountdowns,
    saveCountdowns,
}