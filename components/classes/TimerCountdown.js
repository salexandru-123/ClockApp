

/**This is a Countdown Class for the timer
 * 
 */
class TimerCountdown{
	#id;
	time;
	
	timer;
	remainingTime = this.time;
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
		this.remainingTime = time;
		this.#id = id
		this.elementsContainer = document.createElement('div');
		this.elementsContainer.id = id
		this.elementsContainer.className='timer_history history-row' 
		this.elementsContainer.innerHTML=`
			<span class='timer-span'></span>
			<button class='history_button start-timer-btn'>&#10148;</button>
			<button class='history_button pause-timer-btn hidden'>&#8214;</button>
			<button class='history_button reset-timer-btn'>&#8634;</button>
			<button class='history_button delete-timer-btn'>X</button>
		`
		mainContainer.appendChild(this.elementsContainer);

		this.element = this.elementsContainer.querySelector('.timer-span');
		this.startBtn = this.elementsContainer.querySelector('.start-timer-btn');
		this.pauseBtn =  this.elementsContainer.querySelector('.pause-timer-btn');
		this.resetBtn =  this.elementsContainer.querySelector('.reset-timer-btn');
		this.deleteBtn =  this.elementsContainer.querySelector('.delete-timer-btn');
		
		this.#updateTimerElement()
		
		this.startBtn.addEventListener('click', this.startTimer.bind(this))
		this.pauseBtn.addEventListener('click', this.pauseTimer.bind(this))
		this.resetBtn.addEventListener('click', this.resetTimer.bind(this))
		this.deleteBtn.addEventListener('click', this.deleteTimer.bind(this))
	}

	get Id(){return this.#id;}


	#toggleButtons(){
		this.startBtn.classList.toggle('hidden');
		this.pauseBtn.classList.toggle('hidden');
	}

	#updateTimerElement(){
			
			this.hours = String(Math.floor(this.remainingTime / 60 / 60)).padStart(2, '0');
			this.minutes = String(Math.floor(this.remainingTime / 60 % 60)).padStart(2, '0');
			this.seconds = String(this.remainingTime % 60).padStart(2, '0');
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
	 *  - @param remainingTime 
	 * 	- @param time 
	 * 	- @param element 
	 * 	- @param startBtn 
	 * 	- @param pauseBtn
	 * 	- @param resetBtn
	 */
	
	countdown(){
		if(this.remainingTime===null ) this.remainingTime = this.time
		this.#updateTimerElement()

		if (this.remainingTime === 0) {
			clearInterval(this.timer);
			this.#toggleButtons()
			alert('Timer ended!')
			return true
		}
		this.remainingTime--;
	};

	deleteTimer(){
		clearInterval(this.timer);
		this.elementsContainer.parentNode.removeChild(this.elementsContainer);
	}

	resetTimer(){
		if(this.pauseBtn.classList.contains('hidden')) this.#toggleButtons()
		this.remainingTime = this.time;
		clearInterval(this.timer);
		this.timer = setInterval(this.countdown.bind(this), 1000);
	};

	pauseTimer(){
		this.#toggleButtons()
		clearInterval(this.timer);
	};

	startTimer(){
		this.#toggleButtons()
		
		// remove 1 sec from remainingTime to avoid 
		// 1 second delay
		this.remainingTime--
		this.timer= setInterval(this.countdown.bind(this), 1000);
	}
}


export default TimerCountdown;