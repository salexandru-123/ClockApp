/**
 * A TimeDropdown object makes a dropdown element appear when clicking 
 * a time-unit.
 * 
 * Use it in combination with an event listener on a time-unit element
 * 
 * WARNING: don't use it for other purposes.
 */
import { pad } from "../functions.js";
class TimeDropdown{
    dropdownElement; // set it to the dropdown block
    timeUnitElement; // set it to the current time-unit element
    elementsContainer;
    /**
     * Constructor of TimeDropdown Object
     * 
     * Required: 
     *  - dropdown container element
     * 
     */
    constructor(dropdownContainerElement, activeTimeUnitElement=null) {
        this.dropdownElement = dropdownContainerElement;
        this.timeUnitElement = activeTimeUnitElement;
    }
    closeDropdown(){
        if(this.timeUnitElement) this.timeUnitElement.style.margin = '0';
		this.timeUnitElement = null
		this.dropdownElement.style.display = "none";
    }
    /**Method to show the dropdown of the time-unit
     * 
     * Let empty to refer to already defined object paramenter
     * 
     * @param self.timeUnitElement will be modified if given an argument to the method.
     * 
     * @param el when Empty it refers to self.timeUnitElement
     */
    showDropdown(el = this.timeUnitElement){
        // Uncomment if you need these
		// const type = el.dataset.type;
		// const min = parseInt(el.dataset.min);
		const max = parseInt(el.dataset.max);
		const rect = el.getBoundingClientRect();
		const containerRect = el.parentNode.getBoundingClientRect();
		const current = parseInt(el.textContent);
		this.dropdownElement.style.display = "inline-flex"; 
		// distance between the container and the element left side
		this.dropdownElement.style.left = `${rect.left-containerRect.left}px`;

		this.dropdownElement.innerHTML = "";
		
		// find current value's last and next 2 digits
		// then add them to the dropdown as a 'dropdown-option'
		for (let i = current - 2; i <= current + 2; i++) {
			let value = (i + (max + 1)) % (max + 1); // wrap around
			const option = document.createElement("div");
			
			option.className = "dropdown-option";
			option.textContent = pad(value);
			option.style.display = 'block';
			// make the current value in the middle display larger than the others
			if(i === current) option.style="font-size: 2.5rem; padding: 7px 12px;";
			option.onclick = () => {
				el.textContent = pad(value);
				this.dropdownElement.style.display = "none";
			};
			this.dropdownElement.appendChild(option);
		}
		this.timeUnitElement = el;
    };
    handleClick(e){
        if(this.timeUnitElement) this.timeUnitElement.style.margin = '0';
		if (e.closest(".time-unit")) {
			// this fixes the margin when clicking on the element to 
			// appear centered
            this.showDropdown(e);
			this.timeUnitElement.style.margin='0 12px 19px 0'
			
		}
    };
    handleWheel(e){
        if (this.timeUnitElement) {
			// activeElement will be set to our e.target 
			// after clicking it the first time
			let value = parseInt(this.timeUnitElement.textContent);
			let min = parseInt(this.timeUnitElement.dataset.min);
			let max = parseInt(this.timeUnitElement.dataset.max);
			// if user scrolls up, sets the previous value as 
			// current_value else the next one 
			value += e.deltaY < 0 ? -1 : 1;
			if (value > max) value = min;
			if (value < min) value = max;
			this.timeUnitElement.textContent = pad(value);
			this.showDropdown(); // refresh dropdown
		}
    };
}

export default TimeDropdown;