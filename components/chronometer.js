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
            <article class='chronometer-container'>
                <span class='chronometer'>00:00:00</span>
                <button class='chrono-start'>&#10148;</button>
                <button class='chrono-stop'>&#8214;</button>
                <button class='chrono-reset'>&#8634;</button>
                <article class='chronometer-history'>
                    <!--
                    <span class='chrono-time' id='0'>00:01:20:0003</span>
                    <button class='chrono-delete'>X</button>
                    -->
                </article>
            </article> 
        </section>`
}
export default Chronometer;