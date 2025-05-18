import { formatHour, formatSeconds } from "../functions.js";

class Countdown{
	idOfTimer;	// to be saved in the localstorage
	isRunning;
	startingTime;
	remainingTime;
	htmlContent; // div element
	
	timer; // where the interval will be stored

	timeElement;
	startBtn;
	pauseBtn;
	resetBtn;
	constructor(id = Number(), runs = Boolean(), time = Number()){
		this.idOfTimer = id;
		this.isRunning = runs;
		this.startingTime = time;
		this.remainingTime = time;
		this.htmlContent = document.createElement('div');
		this.htmlContent.classList.add('timer-history');
		this.htmlContent.id = `timer--${this.idOfTimer}`;
		this.htmlContent.innerHTML = `
			<span class='timer-time'>${new Date(this.remainingTime*1000).toISOString().slice(11,19)}</span>
			<button class='timer-start'>&#10148;</button>
			<button class='timer-pause'>&#8214;</button>
			<button class='timer-reset'>&#8634;</button>
		`
		this.startBtn = this.htmlContent.querySelector('.timer-start');
		this.pauseBtn = this.htmlContent.querySelector('.timer-pause');
		this.resetBtn = this.htmlContent.querySelector('.timer-start');
		this.timeElement = this.htmlContent.querySelector('.timer-time');
}
	// We have to remake the class to adapt to timer history integration.
	countdownTimer(){
		if(this.remainingTime === 0){
			this.timeElement.innerHTML = formatSeconds(this.startingTime);
			this.remainingTime = this.startingTime;
			clearInterval(timer);
			alert(`Timer ${this.idOfTimer} has completed.`)
			return
		}
		
		this.timeElement.innerHTML = formatSeconds(this.remainingTime);
		this.remainingTime--;
	}
	pauseTimer(){
		clearInterval(timer)
	}
	resetTimer(){
		this.remainingTime = this.startingTime;
		clearInterval(timer);
		this.countdownTimer.bind(this);
		timer = setInterval(this.countdownTimer.bind(this), 1000);
	}
	startTimer(){
		this.remainingTime--;
		this.countdownTimer.bind(this);
		timer = setInterval(this.countdownTimer.bind(this), 1000);
	}
}
export default Countdown;