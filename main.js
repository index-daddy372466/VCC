// general variables
const mobile_limit = 1010;
// hamburger menu
let hamburger = document.getElementById('hamburger-container')
let hamburger_options = ['rotate','disappear']
let [nav,mobile_nav] = [document.getElementById('nav'),document.getElementById('nav-mobile')]
let nav_children = [...nav.children[0].children].map(x=>x.children[0]) // article elements
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

document.getElementById('problem').classList.remove('appear-section')

window.onscroll = handleScroll
let hr = document.getElementById('hr-primary')
let sections =  [...document.querySelectorAll('.section-gen')]
let sections_gen = [...document.querySelectorAll('.section-gen-link')]
let target_section
function handleScroll() {
    let X = window.scrollX, Y = window.scrollY
    
    // map sections
    sections.filter((_,p) => p > 0).map(section => {
        let sectionTop = section.getBoundingClientRect().y, sectionBottom = sectionTop + section.clientHeight;
        if(hr.getBoundingClientRect().y < sectionTop + 100) {
            section.classList.remove('appear-section');
        } else {
            section.classList.add('appear-section')
        }
    })

     for(let i = 0; i < sections_gen.length; i++){
        nav_children[i].classList.remove('target-link') // remove target link from nav list items 

        let sectionTop = sections_gen[i].getBoundingClientRect().y, sectionBottom = sectionTop + sections_gen[i].clientHeight;
        if((hr.getBoundingClientRect().y > sectionTop) && hr.getBoundingClientRect().y < sectionBottom ||
            (i==sections_gen.length - 1 && hr.getBoundingClientRect().y > sectionBottom)) {
            target_section = sections_gen[i]
            let nav_element = nav_children[i]
            nav_element.classList.add('target-link')
        }
      
     }

    // if y > top
    if(Y > document.body.scrollTop){
        mobile_nav.classList.remove('relative-nav')
        mobile_nav.classList.add('fixed-nav')
    } else {
        mobile_nav.classList.remove('fixed-nav')
        mobile_nav.classList.add('relative-nav')
    }

    
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


// navigation - remove target (map) and assign target-link to clicked element
for(let i = 0; i < nav_children.length; i++){
    console.log(nav_children[i])
    nav_children[i].onclick = e => {
        const target = e.target || window || undefined
        nav_children.map(child => child.classList.remove('target-link'));
        target.classList.add('target-link')
    }
}