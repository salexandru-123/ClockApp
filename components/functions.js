/**A function that returns a formatted string from a Date object
 * 
 * Returns a string formatted as follows:
 *  - if (short) returns a time formatted like this 'hh:mm' 
 *  - if (!short) returns a time formatted like this 'hh:mm:ss'
 * 
 * Required argument:
 *  - **date** as a Date Object
*/
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
const hoursToSec = function(hours){
    return Number(hours)*60*60
}
const minToSec = function(minutes){
    return Number(minutes)*60
}

const millisecondsToX = function(milliseconds, timeUnit){
    if(timeUnit === 'hours'){
        return Number(milliseconds)/60/60/1000
    }
    if(timeUnit === 'minutes'){
        return Number(milliseconds)/60/1000
    }
    if(timeUnit === 'seconds'){
        return Number(milliseconds)/1000
    }
}

function pad(num) {
    return String(num).padStart(2, '0');
}

function saveInLocalStorage(key,data){
        localStorage.setItem(key,JSON.stringify(data))
}



export {
    formatHour,
    minToSec,
    hoursToSec,
    pad,
    saveInLocalStorage,
    millisecondsToX,
}