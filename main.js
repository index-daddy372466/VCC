// general variables
const mobile_limit = 1010;
// hamburger menu
let hamburger = document.getElementById('hamburger-container')
let hamburger_options = ['rotate','disappear']
let [nav,mobile_nav] = [document.getElementById('nav'),document.getElementById('nav-mobile')]
let header = document.querySelector('header')
// click hamburger menu
hamburger.addEventListener('click',handleHamburgerMenu) 

// handle hamburger menu
function handleHamburgerMenu(e) { 
    let hamburger_children = [...hamburger.children] || [...e.currentTarget.children]
    if(document.body.clientWidth < mobile_limit) {
        let children = [...hamburger_children]
        console.log(children)
        for(let i = 0; i < children.length; i++) {

            let get_s_class // instantiate variable for s class
            switch(true){
                case i%2 == 0:
                get_s_class = [...children[i].classList].find(x=>/^s\d{1}$/gi.test(x))
                console.log(get_s_class)
                get_s_class += `-${hamburger_options[i%2]}`
                break;
                case i%2 == 1:
                get_s_class = [...children[i].classList].find(x=>/^s\d{1}$/gi.test(x))
                console.log(get_s_class)
                get_s_class += `-${hamburger_options[i%2]}`
                break;

                default:console.log(undefined)
                break;
            }

            console.log(get_s_class);
            children[i].classList.toggle(get_s_class)
            
        }
        if(children[1].classList.contains('s2-disappear')){
            showMobileNav(mobile_nav)
            hamburger_children.map(child => child.classList.remove('disabled'))
            hamburger_children.map(child => child.classList.add('enabled'))

        } else {
            hideMobileNav(mobile_nav)
            hamburger_children.map(child => child.classList.remove('enabled'))
            hamburger_children.map(child => child.classList.add('disabled'))
        }
    }
}

// click on a navitem in hamburger menu
if(document.body.clientWidth < 1010){
    let nav_children = [...mobile_nav.children]
    nav_children.map(child => {
        child.onclick = () => handleHamburgerMenu()
    })
}

function hideMobileNav(nav,bool){
    if(bool===false) return
    nav.classList.add('hide-element')
}
function showMobileNav(nav,bool){
    if(bool===false) return
    nav.classList.remove('hide-element')
}

// setTimeout(()=>{
//     document.getElementById('problem').classList.add('slide-section')
// },1200)
    document.getElementById('problem').classList.remove('appear-section')

window.onscroll = handleScroll
let hr = document.getElementById('hr-primary')
let sections =  [...document.querySelectorAll('.section-gen')]
function handleScroll() {
    let X = window.scrollX, Y = window.scrollY
    
    // map sections
    sections.filter((_,i)=>i>0).map(section => {
        let sectionTop = section.getBoundingClientRect().y, sectionBottom = sectionTop + section.clientHeight;
        if(hr.getBoundingClientRect().y < sectionTop + 100) {
            section.classList.remove('appear-section')
        } else {
            section.classList.add('appear-section')
        }
    })

    
}

function handleMobileNav(Y,header,nav){
    // if scroll Y is greater than scrollTop + 100
    if(Y > 100){
        header.classList.add('fixed-position')
        nav.classList.add('fixed-position')

    } else {
        header.classList.remove('fixed-position')
        nav.classList.remove('fixed-position')
    }
}
