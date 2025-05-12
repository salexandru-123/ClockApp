const Chronometer = function(container){
    
    // Chronometer functionality

    /**
     * How it should work:
     * - User starts the chronometer
     * - Chronometer counts the time in milliseconds
     * - When user stops the chronometer the time displayed should be 
     *      saved in the chronometer's history for future reference
     * 
     */
    container.innerHTML =  
        `<section id="feature--4" class="app__feature" data-sect="4">
            <h1>Chronometer</h1>    
        </section>`
}
export default Chronometer;