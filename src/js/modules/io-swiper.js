import Swiper, { Pagination } from 'swiper';

export const initIntersectionObserver = () => {
    if (
        'IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype
    ) {
        document.body.classList.add('is-intersection');
        const options = {
            rootMargin: '0px',
            threshold: [ 0, 0.25, 0.5, 0.75, 1 ],
        };
        //
        const observer = new IntersectionObserver(items => {
            items.forEach(item => {
                if (item.isIntersecting) {
                    // && item.intersectionRatio>0.25
                    // console.log('Нашел карточку')
                    if (!item.target.classList.contains('init')) {
                        // console.log('Инициализировал слайдер')
                        item.target.classList.add('init');
                        const container = item.target.querySelector('.swiper');
                        const pagination = item.target.querySelector('.swiper-pagination');

                        new Swiper(container, {
                            modules: [ Pagination ],
                            slidesPerView: 'auto',
                            loop: false,
                            speed: 400,
                            pagination: {
                                el: pagination,
                                type: 'bullets',
                            },
                        });
                    }
                    observer.unobserve(item.target);
                    // console.log('Перестал следить за карточкой')
                }
            });
        }, options);
    }
};
