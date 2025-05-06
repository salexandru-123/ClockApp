// import {Clock, Alarm, Timer, Chronometer} from './components/index.js'

const nav = document.querySelector('nav');
const tabs = document.querySelectorAll('.app__tab');
const sections = document.querySelectorAll('.app__feature');

// Clock()
// Alarm()
// Timer()
// Chronometer()
nav.addEventListener('click', function(e){
    e.preventDefault()
    const clicked = e.target.closest('.app__tab')
    if(!clicked) return
    //remove the active class of all sections
    sections.forEach(element=>{
        element.classList.remove('app__active');
    });
    
    //set the clicked button relative section active
    [...sections]
        .find(el=>
        el.id === `feature--${e.target.dataset.id}`)
        .classList.add('app__active')
    
    tabs.forEach(tab=>tab.classList.remove('active__tab'));
    e.target.closest('.app__tab')
        .classList.add('active__tab')
})