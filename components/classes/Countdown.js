function countdownTimer(){
	return 'lolly'
}
function pauseTimer(){

}
function startTimer(){

}
function resetTimer(){

}

class Countdown{
	idOfTimer;
	isRunning;
	startingTime;
	remainingTime;
	htmlContent;
	startBtn;
	pauseBtn;
	resetBtn;
	constructor(id = Number(), runs = Boolean(), time = Number()){
		this.idOfTimer = id;
		this.isRunning = runs;
		this.startingTime = this.remainingTime = time;
	}
	// We have to remake the class to adapt to timer history integration.
	countdown = countdownTimer
	pause = pauseTimer
	reset = resetTimer
	start = startTimer
}
export default Countdown;