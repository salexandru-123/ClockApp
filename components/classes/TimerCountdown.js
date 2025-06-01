/**This is a Countdown Class for the timer
 * 
 */
class TimerCountdown{
	id;
	time;
	
	timer;
	timeTemp = this.time;
	elementsContainer;
	element;
	startBtn;
	pauseBtn;
	deleteBtn;
	
	hours;
	minutes;
	seconds;
	
	/** Countdown Constructor
	 *
	 * Return: A Countdown object of the class.
	 * 
	 * Usage: Leave empty if you need to modify in the future
	 */
	constructor(id, mainContainer, time ) {
		this.time = time;
		this.timeTemp = time;

		this.elementsContainer = document.createElement('div');
		this.elementsContainer.id = id
		this.elementsContainer.className='timer_history', 
		this.elementsContainer.innerHTML=`
			<span class='timer-span'></span>
			<button class='start-timer-btn'>></button>
			<button class='pause-timer-btn'>P</button>
			<button class='reset-timer-btn'>R</button>
			<button class='delete-timer-btn'>X</button>
		`
		mainContainer.appendChild(this.elementsContainer);

		this.element = this.elementsContainer.querySelector('.timer-span');
		this.startBtn = this.elementsContainer.querySelector('.start-timer-btn');
		this.pauseBtn =  this.elementsContainer.querySelector('.pause-timer-btn');
		this.resetBtn =  this.elementsContainer.querySelector('.reset-timer-btn');
		this.deleteBtn =  this.elementsContainer.querySelector('.delete-timer-btn');
		
		this.#updateTimerElement()
		console.log(this.elementsContainer.innerHTML);
		
		this.startBtn.addEventListener('click', this.startTimer.bind(this))
		this.pauseBtn.addEventListener('click', this.pauseTimer.bind(this))
		this.resetBtn.addEventListener('click', this.resetTimer.bind(this))
		this.deleteBtn.addEventListener('click', this.deleteTimer.bind(this))
	}
	#updateTimerElement(){
			
			this.hours = String(Math.floor(this.timeTemp / 60 / 60)).padStart(2, '0');
			this.minutes = String(Math.floor(this.timeTemp / 60)).padStart(2, '0');
			this.seconds = String(this.timeTemp % 60).padStart(2, '0');
			this.element.innerHTML = `${this.hours}:${this.minutes}:${this.seconds}`
		}
	/**Countdown Method of Object Countdown
	 * 
	 * **Return:** 
	 * 	- 'true' if countdown ended 
	 *  - 'null' in any other case
	 * 
	 * Usage: Used together with an interval.
	 * 
	 * Required parameters: 
	 *  - @param timeTemp 
	 * 	- @param time 
	 * 	- @param element 
	 * 	- @param startBtn 
	 * 	- @param pauseBtn
	 * 	- @param resetBtn
	 */
	
	countdown(){
		if(this.timeTemp===null ) this.timeTemp = this.time
		this.#updateTimerElement()

		if (this.timeTemp === 0) {
			clearInterval(this.timer);
			this.startBtn.classList.remove('hidden');
			this.pauseBtn.classList.add('hidden');
			alert('Timer ended!')
			return true
		}
		this.timeTemp--;
	};
	deleteTimer(){
		this.elementsContainer.parentNode.removeChild(this.elementsContainer);
	}
	resetTimer(){
		this.timeTemp = this.time;
		console.log(this.time);
		
		clearInterval(this.timer);
		this.timer = setInterval(this.countdown.bind(this), 1000);
	};
	pauseTimer(){
		this.startBtn.classList.remove('hidden');
		this.pauseBtn.classList.add('hidden');
		clearInterval(this.timer);
	};
	startTimer(){
		
		this.startBtn.classList.add('hidden');
		this.pauseBtn.classList.remove('hidden');
		
		// call the countdown once before the interval to avoid 
		// 1 second delay
		if(!this.startBtn&&!this.pauseBtn){
		return console.log('No start button or pause buttn');
		
	}
		this.timeTemp--
		this.timer= setInterval(this.countdown.bind(this), 1000);
	}
}


export default TimerCountdown;