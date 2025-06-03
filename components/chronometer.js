import { millisecondsToX } from "./functions.js";
const Chronometer = function(container){
    
    // Chronometer functionality

    /**
     * How it should work:
     * - User starts the chronometer
     * - Chronometer counts the time in milliseconds
     * - When user stops the chronometer the time displayed should be 
     *      saved in the chronometer's history for future reference
     * 
     */
    container.innerHTML =  
        `<section id="feature--4" class="app__feature" data-sect="4">
            <h1>Chronometer</h1>
            <article class='chronometer-container'>
                <span class='chronometer'>00:00:00.000</span>
                <button class='chrono-start'>&#10148;</button>
                <button class='chrono-stop hidden'>&#8214;</button>
                <button class='chrono-reset'>&#8634;</button>
                <article class='chronometer-history'>
                    <!--
                    <span class='chrono-time' id='0'>00:01:20:0003</span>
                    <button class='chrono-delete'>X</button>
                    -->
                </article>
            </article> 
        </section>`

    // constants
    const startBtn = document.querySelector('.chrono-start');
    const stopBtn = document.querySelector('.chrono-stop');
    const resetBtn = document.querySelector('.chrono-reset');
    const chronoSpan = document.querySelector('.chronometer');

    // dynamic variables 
    let chronometer;
    let milliseconds = 0;
    // functions
    const startChronometer = ()=>{
        startBtn.classList.add('hidden');
        stopBtn.classList.remove('hidden');
        chronometer = setInterval(()=>{
            milliseconds+= 1/60;
            let hours = String(Math.floor(milliseconds  / 60 / 60)).padStart(2, '0');
            let minutes = String(Math.floor(milliseconds / 60) ).padStart(2, '0');
            let seconds = String(Math.floor(milliseconds) - Math.floor(milliseconds / 60) * 60).padStart(2, '0');
            let msVal = String(Math.floor((milliseconds - Math.floor(milliseconds))*1000)).padStart(3, '0');
            chronoSpan.textContent = `${hours}:${minutes}:${seconds}.${msVal}`
            
        },1000 / 60)
    }

    const stopChronometer = ()=>{
        startBtn.classList.remove('hidden');
        stopBtn.classList.add('hidden');
        clearInterval(chronometer);
    }
    
    const resetChronometer = ()=>{
        startBtn.classList.remove('hidden');
        stopBtn.classList.add('hidden');
        clearInterval(chronometer)
        milliseconds = 0;
        chronoSpan.textContent = '00:00:00.000'
    }
    // event listeners 
    startBtn.addEventListener('click', startChronometer)
    stopBtn.addEventListener('click', stopChronometer)
    resetBtn.addEventListener('click', resetChronometer)

}
export default Chronometer;