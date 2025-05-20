import { formatHour, formatSeconds } from "../functions.js";
function hiddenSwitch(firstElement, secondElement){
	firstElement.classList.toggle('hidden');
	secondElement.classList.toggle('hidden');
}
class Timing{
	id;
	isRunning;
	htmlContent;
	elementContainer;
	timer;

	timeElement;
	startBtn;
	pauseBtn;
	resetBtn;

	
}

class Alarm extends Timing{
	alarmHour;
	/**
	 *
	 */
	constructor(id = Number(), runs = Boolean(), hour = String(), container = Object()) {
		super();
		this.id = id;
		this.isRunning = runs;
		this.alarmHour = hour;
		this.elementContainer = container
		this.htmlContent = document.createElement('div');
		this.htmlContent.classList.add('alarm-history');
		this.htmlContent.id = `alarm--${this.id}`;
		this.htmlContent.innerHTML = `
			<span class='alarm-time'>${new Date(this.remainingTime*1000).toISOString().slice(11,19)}</span>
			<button class='alarm-start history-btn'>&#10148;</button>
			<button class='alarm-pause history-btn hidden'>&#8214;</button>
			<button class='alarm-reset history-btn'>&#8634;</button>
			<button class='alarm-remove history-btn'>X</button>
		
		`
		this.elementContainer.appendChild(this.htmlContent);
		this.startBtn = this.htmlContent.querySelector('.alarm-start');
		this.startBtn.addEventListener('click',this.setAlarm.bind(this));

		this.pauseBtn = this.htmlContent.querySelector('.alarm-pause');
		this.pauseBtn.addEventListener('click',this.stopAlarm.bind(this));

		this.resetBtn = this.htmlContent.querySelector('.alarm-reset');
		this.resetBtn.addEventListener('click',this.resetAlarm.bind(this));
		
		this.removeBtn = this.htmlContent.querySelector('.alarm-remove')
		this.removeBtn.addEventListener('click', this.removeAlarm.bind(this));

		this.timeElement = this.htmlContent.querySelector('.alarm-time');
		if(this.isRunning) this.setAlarm.call(this)
	}
	countdown(){
        const hour = new Date().setHours(this.alarmHour.slice(0,2), this.alarmHour.slice(3,5))
        
        const hourISOFormat = String(new Date(hour).toISOString().slice(11,16));
        console.log('in the interval');
        
        if(hourISOFormat === String(new Date().toISOString().slice(11,16))){
            console.log('inside:',this.alarmHour);
            
            alert('alarm alarm alarm!')
            clearInterval(this.timer);
        }
    }
	setAlarm(){
		this.timer = setInterval()
	}
	removeAlarm(){

	}
	stopAlarm(){

	}
	resetAlarm(){

	}
}


class Countdown extends Timing{
	
	startingTime;
	remainingTime;

	constructor(id = Number(), runs = Boolean(), time = Number(), container = Object(), remainingTime = null){
		super()
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
		this.timeElement.innerHTML = formatSeconds(this.remainingTime, this.startingTime>3600 ? true : false);
		
		console.log(this.remainingTime);
		
		if(this.remainingTime === 0){
			this.timeElement.innerHTML = formatSeconds(this.startingTime, this.startingTime>3600 ? true : false);
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
		this.timeElement.innerHTML = formatSeconds(this.startingTime, this.startingTime>3600 ? true : false)
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