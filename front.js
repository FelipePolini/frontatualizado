const navLinkEls = document.querySelectorAll('.nav_link');
const sectionEls = document.querySelectorAll('.section');

let currentSection = 'home';
window.addEventListener('scroll', () => {
    sectionEls.forEach(sectionEl => {
        if(window.scrollY >= sectionEl.offsetTop) {
            currentSection = sectionEl.id;
        }
    });

    navLinkEls.forEach(navLinkEl => {
        if (navLinkEl.href.include(currentSection)) {
            navLinkEl.classList.add('active');
        }
    });
});


document.querySelector('.menu-btn').addEventListener('click', () => {
    document.querySelector('.nav_list').classList.toggle('active');
});


