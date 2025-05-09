const formatHour = function(date){ //type Date
    if(typeof date != 'object') return
    return String(date.getHours()).padStart(2, '0')
    +':'+
    String(date.getMinutes()).padStart(2, '0')
    +':'+
    String(date.getSeconds()).padStart(2, '0');
}

const hoursToSec = function(hours){
    return Number(hours)*60*60
}
const minToSec = function(minutes){
    return Number(minutes)*60
}

export {
    formatHour,
    minToSec,
    hoursToSec,
}