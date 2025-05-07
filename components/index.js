import Clock from './clock.js'
import Alarm from "./alarm.js";
import Chronometer from "./chronometer.js";
import Timer from "./timer.js";



export const app = new Map([
    [1,Clock],
    [2,Timer],
    [3,Alarm],
    [4,Chronometer],
])