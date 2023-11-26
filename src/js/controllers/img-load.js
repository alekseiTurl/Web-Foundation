export const imgLoadInit = () => {
    const img = document.querySelectorAll('img');
    img.forEach(function(element) {
        element.addEventListener('load',() => {
            element.classList.add('loaded');
        })
    })
}
