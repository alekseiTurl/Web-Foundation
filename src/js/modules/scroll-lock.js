const div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';
div.style.visibility = 'hidden';
let scrollWidth;

document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(div);
    scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
});

const body = document.querySelector('body');
const header = document.querySelector('header');

let bodyScrollTop = null;
let locked = false;

export const lockScroll = () => {
    if (!locked) {
        if (window.document.documentElement.clientHeight < body.scrollHeight) {
            body.style.paddingRight = scrollWidth + 'px';
            // header.style.paddingRight = scrollWidth + 'px';
        }
        bodyScrollTop =
            typeof
            window.pageYOffset !== 'undefined'
                ? window.pageYOffset
                : (document.documentElement || document.body.parentNode || document.body).scrollTop;

        body.classList.add('scroll-locked');
        locked = true;
    }
};

export const unlockScroll = () => {
    if (locked) {
        body.style.top = null;
        window.scrollTo(0, bodyScrollTop);
        body.style.paddingRight = '';
        header.style.paddingRight = '';
        locked = false;
        body.classList.remove('scroll-locked');
    }
};
