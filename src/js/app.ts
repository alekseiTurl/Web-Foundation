import { inputMask } from './modules/input-mask'
import { initSwipers } from './modules/swiper'
import { modalsInit } from './controllers/modal'
import { imgLoadInit } from './controllers/img-load'

document.addEventListener('DOMContentLoaded', () => {
    inputMask()
    initSwipers()
    modalsInit()
    imgLoadInit()
})
