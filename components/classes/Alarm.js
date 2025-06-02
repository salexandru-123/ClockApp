import { hoursToSec, minToSec, saveInLocalStorage } from "../functions.js";

class AlarmCl{
    #id;
    timeToWait;
    hour;
    minute;
    alarmWaiter;
    elementsContainer;
    element;
    constructor(id, hour, minute, container){
        
        this.elementsContainer = container;
        console.log(this.elementsContainer);
        
        this.hour = hour;
        this.minute = minute;
        this.#id = id;
        this.timeToWait = this.getAlarmTime(this.hour, this.minute)
        
        this.element = document.createElement('div')
        this.element.className = 'alarm'
        this.element.id = this.Id;
        this.element.innerHTML = `
                <span class='alarm-time'>${this.hour}:${this.minute}</span>
                <button class='alarm-start'>&#10148;</button>
                <button class='alarm-stop'>&#8214;</button>
                <button class='alarm-delete'>X</button>
            `
        
        container.appendChild(this.element);

        this.startBtn = this.element.querySelector('.alarm-start');
        this.stopBtn = this.element.querySelector('.alarm-stop');
        this.deleteBtn = this.element.querySelector('.alarm-delete');
        
        
        this.startBtn.addEventListener('click', this.startAlarm.bind(this))
        this.stopBtn.addEventListener('click',this.stopAlarm.bind(this))
        this.deleteBtn.addEventListener('click', this.deleteAlarm.bind(this))
        
                
    }
    
    get Id(){return this.#id}

    getAlarmTime(hour, minute){
        const alarmTime = new Date();
        const now = new Date()
        
        alarmTime.setHours(hour,minute,0,0);
        if(alarmTime <= now){
            alarmTime.setDate(alarmTime.getDate()+1);
        }
        
        return alarmTime-now;
    }

    startAlarm(){
        this.alarmWaiter = setTimeout(()=>{
            alert('Alarm alarm alarm!');
        }, this.timeToWait);
    }
    stopAlarm(){
        clearTimeout(this.alarmWaiter);
    }
    deleteAlarm(){
        const data = localStorage.getItem('alarms');
        if(!data)  return;
        const newData = JSON.parse(data).map(obj=>obj.Id != this.Id);
        saveInLocalStorage('alarms', newData);
        this.elementsContainer.removeChild(this.element);
    }
}

export default AlarmCl;