import { header } from '../constants'

export const smoothAnchorScroll = () => {
    document.addEventListener('click', e => {
        if (e.target.closest('.js-anchor')) {
            e.preventDefault()
            const anchor = e.target.closest('.js-anchor')

            const sectionRect = document.querySelector(anchor.getAttribute('href')).getBoundingClientRect()
            const positionForScroll = window.scrollY + sectionRect.top - header.clientHeight * 2

            scroll({
                top: positionForScroll,
                behavior: 'smooth',
            })

            // if (window.innerWidth > 1133) {
            //     scroll({
            //         top: positionForScroll,
            //         behavior: 'smooth',
            //     })
            // } else {
            //     modal.close('menu')
            //
            //     setTimeout(() => {
            //         scroll({
            //             top: positionForScroll,
            //             behavior: 'smooth',
            //         })
            //     }, modal.timeout())
            // }
        }
    })
}
