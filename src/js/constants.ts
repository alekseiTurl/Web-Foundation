import checkIsTouch from './libs/detectTouch'

export const body = document.body
export const header = document.querySelector('header')
export const isTouch = checkIsTouch()
export const getDevicePixelRatio = window.devicePixelRatio

export const Breakpoints = {
    XL: 1640,
    LG: 1279,
    MD: 1023,
    SM: 767,
    XS: 575,
    XXS: 449,
}

export const mediaBreakpoints = {
    XL: window.matchMedia(`(max-width: ${Breakpoints.XL}px)`),
    LG: window.matchMedia(`(max-width: ${Breakpoints.LG}px)`),
    MD: window.matchMedia(`(max-width: ${Breakpoints.MD}px)`),
    SM: window.matchMedia(`(max-width: ${Breakpoints.SM}px)`),
    XS: window.matchMedia(`(max-width: ${Breakpoints.XS}px)`),
    XXS: window.matchMedia(`(max-width: ${Breakpoints.XXS}px)`),
}

// eslint-disable-line @typescript-eslint/no-explicit-any, no-unused-vars
export type TFunction = () => void

export const withBreakpoint = function (fn: TFunction, bp: number): void {
    const mq: MediaQueryList = window.matchMedia('(max-width: ' + bp + 'px)')
    // fn(mq)
    mq.addEventListener('change', event => {
        if (event.matches) {
            fn()
        }
    })
}

export const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === 'cadesign.ru'

export const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent,
    )
}
