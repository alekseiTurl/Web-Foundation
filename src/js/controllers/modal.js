import { modal } from '../modules/modal'

export const modalsInit = () => {
    document.addEventListener('click', e => {
        if (e.target.closest('[data-modal-open]')) {
            e.preventDefault()
            const target = e.target.closest('[data-modal-open]')
            const id = target.dataset.modalOpen

            modal.open(id)
        }
        if (e.target.closest('[data-modal-ajax-open]')) {
            e.preventDefault()
            const target = e.target.closest('[data-modal-ajax-open]')
            const id = target.dataset.modalAjaxOpen

            modal.openWithAjax(id)
        }

        if (e.target.closest('[data-modal-close]')) {
            e.preventDefault()
            const target = e.target.closest('[data-modal-close]')
            const id = target.dataset.modalClose

            modal.close(id)
        }
    })

    document.addEventListener('mousedown', e => {
        if (e.target.closest('[data-modal]')) {
            if (e.target.closest('[data-modal-inner]')) return

            e.preventDefault()
            const modalId = e.target.closest('[data-modal]').dataset.modal
            modal.close(modalId)
        }
    })

    // Прослушка события открытия модалок

    // document.addEventListener('modal-open', e => {
    //     const id = e.detail.id
    // })

    // Прослушка события закрытия модалок
    //
    // document.addEventListener('modal-close', e => {
    //     const id = e.detail.id
    // })
}
