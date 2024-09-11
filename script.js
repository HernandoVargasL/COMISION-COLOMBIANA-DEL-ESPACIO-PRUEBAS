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
    if (video) {
        function playVideo() {
            video.currentTime = 0;
            video.play();
        }
        playVideo();
        setInterval(playVideo, 120000);
    }


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
    if (logoRotatorInner) {
        logoRotatorInner.addEventListener('mouseover', () => {
            logoRotatorInner.style.animationPlayState = 'paused';
        });
    
        logoRotatorInner.addEventListener('mouseout', () => {
            logoRotatorInner.style.animationPlayState = 'running';
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.timeline-container');
    const items = document.querySelectorAll('.timeline-item');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');

    let currentIndex = 0;

    function scrollToItem(index) {
        const item = items[index];
        if (item) {
            const containerWidth = container.offsetWidth;
            const itemWidth = item.offsetWidth;
            const itemLeft = item.offsetLeft;
            const itemRight = itemLeft + itemWidth;
            const scrollLeft = itemLeft - (containerWidth / 2) + (itemWidth / 2);
            container.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    }

    function updateButtons() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === items.length - 1;
    }

    prevButton.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            scrollToItem(currentIndex);
            updateButtons();
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            scrollToItem(currentIndex);
            updateButtons();
        }
    });

    // Initialize
    scrollToItem(currentIndex);
    updateButtons();
});


// noticias

// Function to format the title for the URL
function formatTitleForUrl(title) {
    return title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Function to handle viewing news details by ID
function viewNews(id) {
    const news = newsData[id];
    if (news) {
        const formattedTitle = formatTitleForUrl(news.title);
        window.location.href = `noticias.html?id=${id}&title=${formattedTitle}`;
    } else {
        console.error('News not found for ID:', id);
    }
}

// Function to get query parameters from the URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id'),
        title: params.get('title')
    };
}

// Function to render a news item
function renderNews(newsId) {
    if (newsData[newsId]) {
        const news = newsData[newsId];
        const container = document.getElementById('newsContent');
        
        // Display title
        const titleElement = container.querySelector('.title');
        titleElement.textContent = news.title;

        // Display media
        const mediaElement = container.querySelector(news.source.endsWith('.png') ? 'img' : 'iframe');
        if (mediaElement) {
            if (news.source.endsWith('.png')) {
                mediaElement.style.display = 'block';
                mediaElement.src = news.source;
            } else {
                mediaElement.parentElement.style.display = 'block';
                mediaElement.src = news.source;
            }
        }

        // Display content
        const contentElement = container.querySelector('p');
        contentElement.innerHTML = news.content;
        container.appendChild(contentElement);

        renderRelatedNews(newsId);  // Pass the current news ID to renderRelatedNews()
    } else {
        displayNotFound();
    }
}

// Function to render related news items
function renderRelatedNews(currentNewsId) {
    const newsCardContainer = document.getElementById('noticiasCard');
    const template = document.getElementById('masNoticias').content;

    // Clear the container before appending new content
    newsCardContainer.innerHTML = '';

    Object.keys(newsData).forEach(key => {
        if (key === currentNewsId) {
            return;  // Skip the current news item
        }
        
        const data = newsData[key];
        const clone = document.importNode(template, true);

        const img = clone.querySelector('.card-img-top');
        const title = clone.querySelector('.card-title');
        const text = clone.querySelector('.card-text');
        const btn = clone.querySelector('.linkNoticia');

        if (data.source.includes('youtube')) {
            img.src = `https://img.youtube.com/vi/${data.source.split('/')[4].split('?')[0]}/0.jpg`;
            img.alt = 'Video Thumbnail';
        } else {
            img.src = data.source;
            img.alt = 'Imagen de noticia';
        }

        title.textContent = data.title;
        text.innerHTML = data.content;

        btn.onclick = () => viewNews(key);
        btn.href = '#';

        newsCardContainer.appendChild(clone);
    });
}

// Function to display a "not found" message
function displayNotFound() {
    const container = document.getElementById('newsContent');
    const titleElement = container.querySelector('.title');
    titleElement.textContent = 'Noticia no encontrada.';
}

// Event listener for when the DOM content is loaded
const { id } = getQueryParams();
if (id) {
    renderNews(id);
} else {
    displayNotFound();
}







