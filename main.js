// general variables
const mobile_limit = 1010;

/* -------------------------------- Hamburger Menu --------------------------------  */

// hamburger menu
let hamburger = document.getElementById('hamburger-container')
let hamburger_options = ['rotate','disappear']

// click hamburger menu
hamburger.addEventListener('click',handleHamburgerMenu) 

// handle hamburger menu
function handleHamburgerMenu(e) { 
    let hamburger_children = [...e.currentTarget.children]
    console.log(e.target)
    console.log(hamburger_children)
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

    }
}

/* -------------------------------- Hamburger Menu --------------------------------  */
