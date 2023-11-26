let windowSize = {};

function setSize() {
    const documentStyles = document.documentElement.style;
    windowSize.width = document.documentElement.clientWidth;
    windowSize.height = window.innerHeight;
    documentStyles.setProperty('--vh', `${windowSize.height / 100}px`);
    documentStyles.setProperty('--vw', `${windowSize.width / 100}px`);
}

setSize();
window.addEventListener('resize', setSize);
