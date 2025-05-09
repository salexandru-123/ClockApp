import { formatHour } from "./components/functions"

const tempDiv = document.createElement('div');
tempDiv.classList.add('timer_history--1');
document.querySelector('#timers-history').insertAdjacentElement('beforeend',tempDiv)

const test = () => setInterval(()=>{
    tempDiv.textContent = formatHour(new Date())
},1000);

const stopTest = () => clearInterval(test);

document.getElementById('start__timer').addEventListener('click',test)

document.getElementById('stop__timer').addEventListener('click',stopTest)