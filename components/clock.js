import {formatHour} from "./functions.js"
const Clock = function (container) {
    
    container.insertAdjacentHTML('beforeend',`
        <section id="feature--1" class="app__feature" data-sect="1">
            <h1>Clock</h1>
            <div class='clock'>${formatHour(new Date())}</div>
        </section>`)
    const clockElement = container.querySelector('.clock');
    const _clock = setInterval(
        ()=>{
            // display the clock each second
            // only if the active tab is the clock tab
            clockElement.innerHTML = `<span>${formatHour(new Date())}</span>`
            if(document.querySelector('.active__tab').dataset.id != '1') 
                clearInterval(_clock)
        }
        ,1000
    )

    
}
export default Clock;