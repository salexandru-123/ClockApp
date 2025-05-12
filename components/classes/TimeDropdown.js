/**
 * A TimeDropdown object makes a dropdown element appear when clicking 
 * a time-unit.
 * 
 * Use it in combination with an event listener on a time-unit element
 * 
 * WARNING: don't use it for other purposes.
 */
class TimeDropdown{
    dropdownElement; // set it to the dropdown block
    timeUnitElement; // set it to the current time-unit element
    /**
     * Constructor of TimeDropdown Object
     * Requires: 
     *  - dropdown container element
     *  - active time-unit element
     * 
     */
    constructor(dropdownContainerElement, activeTimeUnitElement) {
        this.dropdownElement = dropdownContainerElement;
        this.timeUnitElement = activeTimeUnitElement;
    }
    closeDropdown(){
        if(this.timeUnitElement) this.timeUnitElement.style.margin = '0';
		this.timeUnitElement = null
		this.dropdownElement.style.display = "none";
    }
    showDropdown(el){
        // Uncomment if you need these
		// const type = el.dataset.type;
		// const min = parseInt(el.dataset.min);
		const max = parseInt(el.dataset.max);
		const rect = el.getBoundingClientRect();
		const containerRect = timer.getBoundingClientRect();
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
    }
}