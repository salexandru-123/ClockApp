import {formatHour} from "./functions.js"
const Clock = function (container) {
    
    container.insertAdjacentHTML('beforeend',`
        <section id="feature--1" class="app__feature" data-sect="1">
            <h1>Clock</h1>
            <h1 class='app__clock'>${formatHour(new Date())}</h1>
        </section>`)
    const clockElement = container.querySelector('.app__clock');
    const _clock = setInterval(
        ()=>{
            clockElement.innerHTML = `<span>${formatHour(new Date())}</span>`
            if(document.querySelector('.active__tab').dataset.id != '1') 
                clearInterval(_clock)
        }
        ,1000
    )

    
}
export default Clock;