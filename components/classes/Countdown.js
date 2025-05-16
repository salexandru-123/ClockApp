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
	startBtn;
	pauseBtn;
	resetBtn;
	// We have to remake the class to adapt to timer history integration.
	countdown = countdownTimer
	pause = pauseTimer
	reset = resetTimer
	start = startTimer
}
export default Countdown;