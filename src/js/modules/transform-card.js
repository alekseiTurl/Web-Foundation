export function transformCard(transformator) {
    const cards = document.querySelectorAll('.transform-container')
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i]
        card.addEventListener('mousemove', startRotate)
        card.addEventListener('mouseout', stopRotate)
    }

    function startRotate(e) {
        const cardItem = this.querySelector('.transform-card')
        const halfHeight = cardItem.offsetHeight / 2
        const halfWidth = cardItem.offsetWidth / 2
        cardItem.style.transform =
            'rotateX(' +
            -(e.offsetY - halfHeight) / transformator +
            'deg) rotateY(' +
            (e.offsetX - halfWidth) / transformator +
            'deg)'
    }

    function stopRotate() {
        const cardItem = this.querySelector('.transform-card')
        cardItem.style.transform = 'rotate(0)'
    }
}
