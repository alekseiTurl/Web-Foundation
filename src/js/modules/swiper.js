import LazyLoad from 'vanilla-lazyload'

new LazyLoad({
    elements_selector: '.swiper',
    unobserve_entered: true,
    // callback_enter: function (swiperElement) {
    //   new Swiper("#" + swiperElement.id, swiperOptions);
    // }
})

export function initSwipers() {
    // poo
}
