export function throttle(f, t) {
    return function (args) {
        let previousCall = this.lastCall
        this.lastCall = Date.now()
        if (
            previousCall === undefined || // function is being called for the first time
            this.lastCall - previousCall > t
        ) {
            // throttle time has elapsed
            f(args)
        }
    }
}

export function documentReady() {
    // все скрипты загружены документ готов
    document.body.classList.add('ready')
}

export function getCSS(element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(property)
}

export const createElement = template => {
    const newElement = document.createElement(`div`)
    newElement.innerHTML = template

    return newElement
}
