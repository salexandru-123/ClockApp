
const Timer = function(container){
/*
# To-Do:
  - Learn how to make the countdown work
  - Make a start , pause , reset button
  - Make a system to store the history of timers
  - Fix the scrolling to go up when scrolling up and viceversa for going down
  

*/


    container.innerHTML = `
        <section id="feature--2" class="app__feature" data-sect="2">
            
            <h1>Timer</h1>
            <div id="timer">
                <div class="time-unit" data-type="hours" data-max="23" data-min="0">00</div>:
                <div class="time-unit" data-type="minutes" data-max="59" data-min="0">00</div>:
                <div class="time-unit" data-type="seconds" data-max="59" data-min="0">00</div>
                
              <div id="dropdown"></div>
            </div>
        </section>
        `
        const timer = document.getElementById("timer");
        const dropdown = document.getElementById("dropdown");
         // will be set when clicked on a timer element
        let activeElement = null;
        
        function pad(num) {
          return String(num).padStart(2, '0');
        }
        
        function showDropdown(el) {
          const type = el.dataset.type;
          const min = parseInt(el.dataset.min);
          const max = parseInt(el.dataset.max);
          const rect = el.getBoundingClientRect();
          const containerRect = timer.getBoundingClientRect();
          const current = parseInt(el.textContent);
          let rectHeight = rect.bottom-rect.top;
          dropdown.style.display = "block";
          // there is still an issue here when changing the container height
          dropdown.style.top = `${rect.bottom - rectHeight*4}px`; 
          // distance between the container and the element left side
          dropdown.style.left = `${rect.left-containerRect.left}px`;
          dropdown.innerHTML = "";
        
          for (let i = current - 2; i <= current + 2; i++) {
            let value = (i + (max + 1)) % (max + 1); // wrap around
            const option = document.createElement("div");
            option.className = "dropdown-option";
            option.textContent = pad(value);
            option.onclick = () => {
              el.textContent = pad(value);
              dropdown.style.display = "none";
            };
            dropdown.appendChild(option);
          }
        
          activeElement = el;
        }
        
        timer.addEventListener("click", (e) => {
          if (e.target.classList.contains("time-unit")) {
            showDropdown(e.target);
          }
        });
        
        document.addEventListener("click", (e) => {
          if (!e.target.classList.contains("time-unit") && !dropdown.contains(e.target)) {
            dropdown.style.display = "none";
          }
        });
        
        timer.addEventListener("wheel", (e) => {
          e.preventDefault();
          if (activeElement) {//activeElement will be set to our e.target after clicking it
            let value = parseInt(activeElement.textContent);
            let min = parseInt(activeElement.dataset.min);
            let max = parseInt(activeElement.dataset.max);
            value += e.deltaY < 0 ? -1 : 1;
            if (value > max) value = min;
            if (value < min) value = max;
            activeElement.textContent = pad(value);
            showDropdown(activeElement); // refresh dropdown
          }
        });
        
        document.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && activeElement) {
            dropdown.style.display = "none";
            activeElement = null;
          }
        });
        
}
export default Timer;