// general variables
const mobile_limit = 1010;
// hamburger menu
let hamburger = document.getElementById('hamburger-container')
let hamburger_options = ['rotate','disappear']
let [nav,mobile_nav] = [document.getElementById('nav'),document.getElementById('nav-mobile')]
let nav_children = [...nav.children[0].children].map(x=>x.children[0]) // article elements
let mobile_nav_children = [...mobile_nav.children[0].children].map(x=>x) // article elements
let header = document.querySelector('header')
let problemcontainer = document.getElementById('problem')

/* -------------------------- special paragraphs and phrases -------------------------- */
let rotatepara = document.querySelector(".rotate-para");



/* -------------------------- special paragraphs and phrases -------------------------- */

// window event - scroll
window.onscroll = handleScroll

// appear section on load
document.getElementById('problem').classList.remove('appear-section')

// click hamburger menu
hamburger.addEventListener('click',handleHamburgerMenu) 
if(document.body.clientWidth < 1010){
    let nav_children = [...mobile_nav.children]
    nav_children.map(child => {
        child.onclick = () => handleHamburgerMenu()
    })
}





//|   handle scroll variables
/*|*/   let hr = document.getElementById('hr-primary')
/*|*/   let sections =  [...document.querySelectorAll('.section-gen')]
/*|*/   let sections_gen = [...document.querySelectorAll('.section-gen-link')]
/*|*/   let target_section
/*|*/   let background_pos = {x:undefined,y:undefined}
/*|*/   let backgroundcounter = 0;
/*|*/  
/*|*/   let percentage = .57;
/*|*/   let starting = 200;
/*|*/   let about_bg = 'center end'
        let clouds = [...document.querySelectorAll('.cloud')]
        let hands_background = document.querySelector('.hands');
        let opacity_count = 0;
/*|*/// functions 
/*|*/     function handleHamburgerMenu(e) { 
        let hamburger_children = [...hamburger.children] || [...e.currentTarget.children]
        if(document.body.clientWidth < mobile_limit) {
            let children = [...hamburger_children]
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
/*|*/     function hideMobileNav(nav,bool){
        if(bool===false) return
        nav.classList.add('hide-element')
        }
/*|*/     function showMobileNav(nav,bool){
        if(bool===false) return
        nav.classList.remove('hide-element')
        }
/*===> */ function handleScroll() {
        let Y = window.scrollY
        
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
            if(mobile_nav_children[i])mobile_nav_children[i].classList.remove('target-link')


            let sectionTop = sections_gen[i].getBoundingClientRect().y, sectionBottom = sectionTop + sections_gen[i].clientHeight;
            let detectSection = (hr.getBoundingClientRect().y > sectionTop) && hr.getBoundingClientRect().y < sectionBottom ||
                (i==sections_gen.length - 1 && hr.getBoundingClientRect().y > sectionBottom);
            if(detectSection) {
                target_section = sections_gen[i]
                let nav_element = nav_children[i]
                let mobile_nav_element = mobile_nav_children[i]
                nav_element.classList.add('target-link')
                mobile_nav_element.classList.add('target-link');
                
                backgroundcounter = Y
                // problem container - manipulate background image 
                if(nav_element.getAttribute('href')==='#problem'){ 
                        background_pos.x = +(backgroundcounter*(percentage))*-1
                        // console.log(background_pos)
                        sections_gen[i].style.backgroundPosition = background_pos.x + "px";
                        sections_gen[i].style.backgroundColor = '#464f58ba';
                }
                if(nav_element.getAttribute('href')==='#services'){ 
                       for(let i = 0; i < clouds.length; i++){
                        if(hr.getBoundingClientRect().y > clouds[i].getBoundingClientRect().y){
                            if(clouds[i].classList.contains('cloud-left') || clouds[i].classList.contains('cloud-right')){
                                clouds[i].classList.remove('cloud-left')
                                clouds[i].classList.remove('cloud-right')
                            }
                        } else {
                            if(i%2==0){
                                clouds[i].classList.add('cloud-left')
                            }
                            else {
                                clouds[i].classList.add('cloud-right')
                            }
                        }
                       }
                }
                else {
                    if(backgroundcounter >= 0) {
                        backgroundcounter--
                    }
                    starting = 200
                }
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



    // cloud animation
    let choose = 6;
    let choices = []
    for(let i = 0; i < clouds.length; i++){
        clouds[i].classList.remove('blink-right','blink-left');

        setInterval(()=>{
            if(choose >=0){
                if(choices.indexOf(clouds[i])==-1){
                    choices.push(generateRandom(clouds))
                    choices.length > 0 ? [...choices].map((choice,idx) =>{
                        if(choice == choices[i]){
                            choice.classList.remove('blink-right','blink-left')
                            return idx % 2 == 0 ? choice.classList.add('blink-right') : choice.classList.add('blink-left')
                        }
                    }) : null;
                }
                choose -= 1
            } else {
                choices = []
                choose = 6;
            }
        }, 3000*(i+1))
    }

    function generateRandom(array){
        let index = Math.floor(Math.random() * array.length);
        return array[index]
    }


    // faq interation
    let faq_questions = document.querySelectorAll('.faq-item');
    for(let i = 0; i < faq_questions.length; i++) {
        let toggle = [...faq_questions[i].children].find(x => x.classList.contains('toggle-icon'))||[...document.querySelectorAll('.toggle-icon')][i];
        let faq_item = toggle.parentElement.parentElement;
        toggle.onclick = e => {
            console.log(e.currentTarget);
            faq_item.classList.toggle('active')
        }
    }