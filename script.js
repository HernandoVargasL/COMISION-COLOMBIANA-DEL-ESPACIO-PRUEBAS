document.addEventListener("DOMContentLoaded", function() {
    /*swiper*/
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    /*video*/
    const video = document.getElementById('backgroundVideo');    
    function playVideo() {
        video.currentTime = 0;
        video.play();
    }
    playVideo();
    setInterval(playVideo, 120000);


    /*navegacion*/
    const offset = 60;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition - offset;

                window.scrollBy({
                top: offsetPosition,
                behavior: "smooth"
                });

                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
    
    function checkScrolling() {
        const skipTop = document.querySelector('.skip-top');
        window.addEventListener('scroll', function () {
            if (window.scrollY >= 60) {
                skipTop.style.bottom = '20px';
            } else {
                skipTop.style.bottom = '';
            }
        }, false);
    }
    
    checkScrolling();

    // Manejar el desplazamiento al cargar la página con un hash en la URL
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition - offset;

            window.scrollBy({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }

    const logoRotatorInner = document.querySelector('.icon-container');

    logoRotatorInner.addEventListener('mouseover', () => {
        logoRotatorInner.style.animationPlayState = 'paused';
    });

    logoRotatorInner.addEventListener('mouseout', () => {
        logoRotatorInner.style.animationPlayState = 'running';
    });
});




