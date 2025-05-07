import {app} from './components/index.js'
const nav = document.querySelector('nav');
const tabs = document.querySelectorAll('.app__tab');
const mainSection = document.getElementsByTagName('main');
app.get(1)(mainSection);
    

nav.addEventListener('click', function(e){
    e.preventDefault()
    const clicked = e.target.closest('.app__tab')
    if(!clicked) return

    // render the correct app tab
    const currentFeature = mainSection.firstChildNode();
    
    
    if(currentFeature!=null) mainSection.removeChild(currentFeature);
    console.log(e.target.dataset.id);
    
    app.get(Number(e.target.dataset.id))(mainSection);
    
    tabs.forEach(tab=>tab.classList.remove('active__tab'));
    e.target.closest('.app__tab')
        .classList.add('active__tab')
})