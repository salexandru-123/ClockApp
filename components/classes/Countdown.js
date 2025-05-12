/**This is a Countdown Class for the timer
 * 
 */
class Countdown{
	time;
	element;
	timer;
	timeTemp = this.time;
	startBtn;
	pauseBtn;
	/** Countdown Constructor
	 *
	 * Return: A Countdown object of the class.
	 * 
	 * Usage: Leave empty if you need to modify in the future
	 */
	constructor(time = null, element = null) {
		this.time = time;
		this.element = element;
		this.timeTemp = time;
		
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
	 */
	countdown(){
		if(this.timeTemp===null ) this.timeTemp = this.time
		const hours = String(Math.floor(this.timeTemp / 60 / 60)).padStart(2, '0');
		const minutes = String(Math.floor(this.timeTemp / 60)).padStart(2, '0');
		const seconds = String(this.timeTemp % 60).padStart(2, '0');
		this.element.textContent= `${hours}:${minutes}:${seconds}`;	
		this.startBtn.classList.add('hidden');
		this.pauseBtn.classList.remove('hidden');
		if (this.timeTemp === 0) {
			clearInterval(this.timer);
			this.startBtn.classList.remove('hidden');
			this.pauseBtn.classList.add('hidden');
			alert('Timer ended!')
			return true
		}
		this.timeTemp--;
	};
	resetTimer(){
		this.timeTemp = this.time;
		console.log(this.time);
		
		clearInterval(this.timer);
		this.countdown.bind(this);
		this.timer = setInterval(this.countdown.bind(this), 1000);
	};
	pauseTimer(){
		this.startBtn.classList.remove('hidden');
		this.pauseBtn.classList.add('hidden');
		clearInterval(this.timer);
	};
	startTimer(startButton, pauseButton){
		// call the countdown once before the interval to avoid 
		// 1 second delay
		console.log(this.startBtn);
		
		if(!this.startBtn&&!this.pauseBtn){
		this.startBtn = startButton;
		this.pauseBtn = pauseButton;
	}
		this.countdown.bind(this);
		this.timer= setInterval(this.countdown.bind(this), 1000);
	}
}


export default Countdown;