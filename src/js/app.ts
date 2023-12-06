import { inputMask } from './modules/input-mask'
import { initSwipers } from './modules/swiper'
import { modalsInit } from './controllers/modal'
import { imgLoadInit } from './controllers/img-load'
import { typeWriter } from './modules/typewriter'
import { transformCard } from './modules/transform-card'

document.addEventListener('DOMContentLoaded', () => {
    inputMask()
    initSwipers()
    modalsInit()
    imgLoadInit()
    typeWriter(
        [
            '<!DOCTYPE html>\n',
            '<html class="page" lang="ru"></html>\n',
            '<meta charset="UTF-8">\n',
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n',
            '<meta http-equiv="X-UA-Compatible" content="ie=edge">\n',
            '<title>AlexTur Web Foundation</title>\n',
            '<script defer src="js/main.js"></script>\n',
        ],
        150,
        true,
    )
    transformCard(30)
})
