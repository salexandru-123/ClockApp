import { formatHour, formatSeconds } from "../functions.js";

class Countdown{
	id;	// to be saved in the localstorage
	isRunning;
	startingTime;
	remainingTime;
	htmlContent; // div element
	elementContainer;

	timer; // where the interval will be stored

	timeElement;
	startBtn;
	pauseBtn;
	resetBtn;
	constructor(id = Number(), runs = Boolean(), time = Number(), container = Object(), remainingTime = null){
		this.id = id;
		this.isRunning = runs;
		this.startingTime = time;
		if(remainingTime!= null) 
			this.remainingTime = remainingTime;
		else 
			this.remainingTime = time;
		this.elementContainer = container;
		this.htmlContent = document.createElement('div');
		this.htmlContent.classList.add('timer-history');
		this.htmlContent.id = `timer--${this.id}`;
		this.htmlContent.innerHTML = `
			<span class='timer-time'>${new Date(this.remainingTime*1000).toISOString().slice(11,19)}</span>
			<button class='timer-start history-btn'>&#10148;</button>
			<button class='timer-pause history-btn'>&#8214;</button>
			<button class='timer-reset history-btn'>&#8634;</button>
		`
		this.elementContainer.appendChild(this.htmlContent);
		this.startBtn = this.htmlContent.querySelector('.timer-start');
		this.startBtn.addEventListener('click',this.startTimer.bind(this));

		this.pauseBtn = this.htmlContent.querySelector('.timer-pause');
		this.pauseBtn.addEventListener('click',this.pauseTimer.bind(this));

		this.resetBtn = this.htmlContent.querySelector('.timer-reset');
		this.resetBtn.addEventListener('click',this.resetTimer.bind(this));
		
		this.timeElement = this.htmlContent.querySelector('.timer-time');
		if(this.isRunning){
			this.startTimer();
		}
		
		

	}
	// We have to remake the class to adapt to timer history integration.
	countdownTimer(){
		console.log(this.remainingTime);
		
		this.timeElement.innerHTML = formatSeconds(this.remainingTime);
		this.remainingTime--;
		if(this.remainingTime === 0){
			this.timeElement.innerHTML = formatSeconds(this.startingTime);
			this.remainingTime = this.startingTime;
			clearInterval(this.timer);
			alert(`Timer ${this.id} has completed.`)
			return
		}
	}
	pauseTimer(){
		console.log(this);
		
		this.isRunning = false;
		clearInterval(this.timer)
	}
	resetTimer(){
		this.isRunning = false;
		this.remainingTime = this.startingTime;
		clearInterval(this.timer);
		this.countdownTimer();
		this.timer = setInterval(()=>this.countdownTimer(), 1000);
	}
	startTimer(){
		this.countdownTimer();
		this.timer = setInterval(()=>this.countdownTimer(), 1000);
	}
}
export default Countdown;