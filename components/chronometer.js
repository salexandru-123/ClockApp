import { millisecondsToX, saveInLocalStorage } from "./functions.js";
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
                <button class='app__btn chrono-start'>&#10148;</button>
                <button class='app__btn chrono-stop hidden'>&#8214;</button>
                <button class='app__btn chrono-reset'>&#8634;</button>
                
            </article> 
            <article class='history-container' id='chronometer-history'>
                   
                </article>
        </section>`

    // constants
    const startBtn = document.querySelector('.chrono-start');
    const stopBtn = document.querySelector('.chrono-stop');
    const resetBtn = document.querySelector('.chrono-reset');
    const chronoSpan = document.querySelector('.chronometer');
    const chronoHistory = document.getElementById('chronometer-history');

    // dynamic variables 
    let chronometer= -1;
    let milliseconds = 0;
    let chronometers = [];
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
        saveChronometer(chronoSpan);
    }
    
    const resetChronometer = ()=>{
        startBtn.classList.remove('hidden');
        stopBtn.classList.add('hidden');
        clearInterval(chronometer)
        milliseconds = 0;
        chronoSpan.textContent = '00:00:00.000'
    }
    const deleteChronometer = (e)=>{
        if(e.target.closest('.chrono-delete')){
            let chronoDiv = e.target.closest('.chronometer-container')
            chronometers = chronometers.filter(chronometer => chronometer.innerHTML != chronoDiv.innerHTML)
            chronoHistory.removeChild(chronoDiv)
            saveInLocalStorage('chronometers', chronometers)
        }
    }

    const saveChronometer = (span)=>{
        const newHistory = document.createElement('div');
        newHistory.className = `chronometer-container  history-row`;
        newHistory.id =`chronometer-${chronometers.length}`
        newHistory.innerHTML=`<span>${span.textContent}</span>
            <button class='history_button chrono-delete'>X</button>`
        console.log(newHistory);
        
        chronometers.push({innerHTML:newHistory.innerHTML});
        chronoHistory.appendChild(newHistory)
        saveInLocalStorage('chronometers',chronometers);

    } 

    const renderChronometers = ()=>{
        
        chronometers = [...JSON.parse(localStorage.getItem('chronometers', chronometers)??'[]')]
        if(chronometers.length === 0) return;
        chronometers.forEach((chronometerEl, index) => {
            let el = document.createElement('div');
            el.className = 'chronometer-container  history-row';
            el.id = `chronometer-${index}`
            el.innerHTML = chronometerEl.innerHTML
            chronoHistory.appendChild(el)})
    }
    // event listeners && function calls
    renderChronometers();
    startBtn.addEventListener('click', startChronometer)
    stopBtn.addEventListener('click', stopChronometer)
    resetBtn.addEventListener('click', resetChronometer)
    chronoHistory.addEventListener('click', deleteChronometer)
}
export default Chronometer;