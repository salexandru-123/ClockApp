import { formatHour, formatSeconds } from "../functions.js";
function hiddenSwitch(firstElement, secondElement){
	firstElement.classList.toggle('hidden');
	secondElement.classList.toggle('hidden');
}
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
			<span class='countdown-time'>${new Date(this.remainingTime*1000).toISOString().slice(11,19)}</span>
			<button class='countdown-start history-btn'>&#10148;</button>
			<button class='countdown-pause history-btn hidden'>&#8214;</button>
			<button class='countdown-reset history-btn'>&#8634;</button>
			<button class='countdown-remove history-btn'>X</button>
		
		`
		this.elementContainer.appendChild(this.htmlContent);
		this.startBtn = this.htmlContent.querySelector('.countdown-start');
		this.startBtn.addEventListener('click',this.startTimer.bind(this));

		this.pauseBtn = this.htmlContent.querySelector('.countdown-pause');
		this.pauseBtn.addEventListener('click',this.pauseTimer.bind(this));

		this.resetBtn = this.htmlContent.querySelector('.countdown-reset');
		this.resetBtn.addEventListener('click',this.resetTimer.bind(this));
		
		this.removeBtn = this.htmlContent.querySelector('.countdown-remove')
		this.removeBtn.addEventListener('click', this.removeTimer.bind(this));

		this.timeElement = this.htmlContent.querySelector('.countdown-time');
		if(this.isRunning) this.startTimer.call(this)
	}
	// We have to remake the class to adapt to timer history integration.
	countdownTimer(){
		this.remainingTime--;
		this.timeElement.innerHTML = formatSeconds(this.remainingTime);
		
		console.log(this.remainingTime);
		
		if(this.remainingTime === 0){
			this.timeElement.innerHTML = formatSeconds(this.startingTime);
			this.remainingTime = this.startingTime;
			clearInterval(this.timer);
			alert(`Countdown ${this.id} has completed.`)
			return
		}
		return
	}
	pauseTimer(){
		hiddenSwitch(this.startBtn, this.pauseBtn);
		if(this.isRunning){
			this.isRunning = false;
			clearInterval(this.timer)
		}
	}
	resetTimer(){
		hiddenSwitch(this.startBtn, this.pauseBtn);
		this.isRunning = false;
		this.remainingTime = this.startingTime;
		clearInterval(this.timer);
		this.timeElement.innerHTML = new Date(this.remainingTime*1000).toISOString().slice(11,19);
	}
	startTimer(){
		hiddenSwitch(this.startBtn, this.pauseBtn);
		if(!this.isRunning) this.isRunning = true;
		this.timer = setInterval(this.countdownTimer.bind(this), 1000);
	}
	removeTimer(){
		this.htmlContent.parentNode.removeChild(this.htmlContent);
		
		clearInterval(this.timer);
	}
}
export default Countdown;