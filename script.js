import {app} from './components/index.js'
const nav = document.querySelector('nav');
const tabs = document.querySelectorAll('.app__tab');
const mainSection = document.querySelector('main');


app.get(3)(mainSection);
    

nav.addEventListener('click', function(e){
    e.preventDefault()
    const clicked = e.target.closest('.app__tab')
    if(!clicked) return
    
    const tabIndex = e.target.dataset.id;
    // render the correct app tab and remove the current one
    const currSection = document.querySelector('section');
    if(mainSection.childNodes != null){
        mainSection.removeChild(currSection);
    }
    // This gets the id from the data-id attribute of the button clicked
    // and gives the function the main section as an argument
    app.get(Number(tabIndex))(mainSection);
    
    // make the current active tab button change style
    tabs.forEach(tab=>tab.classList.remove('active__tab'));
    e.target.closest('.app__tab')
        .classList.add('active__tab')
})