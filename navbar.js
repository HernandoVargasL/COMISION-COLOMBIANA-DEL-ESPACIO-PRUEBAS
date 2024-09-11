
const dropDownButtons = document.querySelectorAll(".nav-bar-toggle-igac, .navbarnavigac li a");
const nav = document.querySelector(".navbarigac");
const navLogos = document.querySelector(".navbarigac .logos");
const dropDownMenu = document.querySelector(".navbarnavigac");
const dropDowntoggle = document.querySelector(".dropdownToggle");
const dropDown = document.querySelector(".dropDown");
const linklist = document.querySelector("#link-list")
const logoIgac = document.querySelector(".navbar-brand-igac")
const barraIgac = document.querySelector(".barra_gov")


document.addEventListener('DOMContentLoaded', function() {
    const dropDownButtons = document.querySelectorAll(".nav-bar-toggle-igac, .navbarnavigac li a");
    const dropDownMenu = document.querySelector(".navbarnavigac");

    dropDownButtons.forEach(element => {
        element.addEventListener('click', function(event) {
            dropDownMenu.classList.toggle('expandMenu');
        });
    });
});

(function setActiveLink() {
    const items = document.querySelectorAll('#link-list li');

    function setActiveClass(event) {
        items.forEach(item => item.classList.remove('active'));
        event.currentTarget.classList.add('active');
        const link = event.currentTarget.querySelector('a');
        if (link) {
            window.location.hash = link.getAttribute('href');
        }
    }

    items.forEach(item => {
        item.addEventListener('click', setActiveClass);
    });

    function initializeActiveClass() {
        const currentHash = window.location.hash;
        items.forEach(item => {
            const link = item.querySelector('a');
            if (link && link.getAttribute('href') === currentHash) {
                item.classList.add('active');
            }
        });
    }

    initializeActiveClass();
})();

// Tablet responsive
function tabletSize(x) {
    if (x.matches) {
        dropDownMenu.append(linklist);
    } else {
        linklist.remove()
        nav.append(linklist);
    }
}  
var x = window.matchMedia("(max-width: 1292px)")
tabletSize(x)
x.addListener(tabletSize)


// Mobile responsive
function tabletMobile(x) {
    if (x.matches) {
        barraIgac.append(logoIgac);
    } else {
        logoIgac.remove()
        navLogos.append(logoIgac);
    }
  }
  
var x = window.matchMedia("(max-width: 721px)")
tabletMobile(x)
x.addListener(tabletMobile)