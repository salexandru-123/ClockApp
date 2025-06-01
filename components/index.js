import Clock from './clock.js'
import Alarm from "./alarm.js";
import Chronometer from "./chronometer.js";
import Timer from "./timer.js";


// each given id will correspond with one of these function
// each botton on the bottom side of the window have a data-id attribute
// with a respective id of the app.
export const app = new Map([
    [1,Clock],
    [2,Timer],
    [3,Alarm],
    [4,Chronometer],
])