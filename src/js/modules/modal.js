import { lockScroll, unlockScroll } from './scroll-lock';
import { body, isLocalhost } from '../constants';

class Modal {
    constructor() {
        this.modalSelector = '[data-modal]';
        this.body = body;
        this.document = document;
        this.closeTimeout = 300;
        this.activeClass = 'is-active';
        this.loadingClass = 'modal-loading';
        this.modalWrapper = document.querySelector('.modal-wrapper') || null;

        if (this.modalWrapper === null) {
            this.createModalWrapper();
        }
    }

    isOtherOpen() {
        // return $(this.modalSelector).filter(`.${this.activeClass}`).length;
        return document.querySelectorAll(this.modalSelector).length;
    }

    timeout() {
        return this.closeTimeout;
    }

    createModalWrapper() {
        this.modalWrapper = document.createElement('div');
        this.modalWrapper.classList.add('modal-wrapper');
        body.append(this.modalWrapper);
    }

    open(id, lock = true) {
        const modal = document.querySelector(`[data-modal=${id}]`);

        if (lock) {
            lockScroll();
        }

        modal.classList.add(this.activeClass);
        modal.focus();
        this.body.classList.add('modal-open');

        // прослушка события document.addEventListener('modal-open', (e) => {})
        // узнать id открывшейся модалки e.detail.id

        document.dispatchEvent(
            new CustomEvent('modal-open', {
                detail: {
                    id: id,
                },
            }),
        );
    }

    close(id) {
        const modal = document.querySelector(`[data-modal=${id}]`);
        const onClose = modal.dataset.modalOnclose;

        if (id) {
            modal.classList.remove(this.activeClass);
        } else {
            document.querySelectorAll('[data-modal]').forEach(modal => modal.classList.remove(this.activeClass));
        }

        if (!this.isOtherOpen) {
            setTimeout(() => {
                unlockScroll();
                this.body.classList.remove('modal-open');

                if (onClose) {
                    modal.remove();
                }
            }, this.closeTimeout);
        }

        setTimeout(() => {
            unlockScroll();
            this.body.classList.remove('modal-open');

            if (onClose) {
                modal.remove();
            }
        }, this.closeTimeout);

        // прослушка события document.addEventListener('modal-close', (e) => {})
        // узнать id открывшейся модалки e.detail.id

        document.dispatchEvent(
            new CustomEvent('modal-close', {
                detail: {
                    id: id,
                },
            }),
        );
    }

    toggle(id) {
        const modal = document.querySelector(`[data-modal=${id}]`);
        const isActive = modal.classList.contains(this.activeClass);

        if (isActive) {
            this.close(id);
        } else {
            this.open(id);
        }
    }

    showError() {
        let errorModal = document.querySelector('[data-modal="modal-error"]');

        const renderErrorModal = () => {
            return `<div class='modal' data-modal='modal-error'><div class='modal__error'>Произошла ошибка</div></div>`;
        };

        if (!errorModal) {
            errorModal = document.createElement('div');
            errorModal.innerHTML = renderErrorModal();

            this.body.append(errorModal);
        }

        this.open('modal-error');
    }

    async openWithAjax(id, params) {
        const isModalExist = document.querySelectorAll(`[data-modal=${id}]`).length;
        let response, data;

        if (isModalExist) {
            this.open(id);
            return;
        }

        const url = isLocalhost ? `./ajax/${id}.html` : `/local/ajax/`;

        if (params) {
            data = Object.assign(params);
        } else {
            data = {
                action: 'LoadBlocks/getModal',
                modalId: id,
                return: 'html',
            };
        }

        const formData = new FormData();

        for (const item in data) {
            formData.append(item, data[item]);
        }

        if (isLocalhost) {
            response = await fetch(url, {
                method: `GET`,
            });
        } else {
            response = await fetch(url, {
                method: `POST`,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: formData,
            });
        }

        if (response.status === 200) {
            let modalHtml = await response.text();
            this.modalWrapper.insertAdjacentHTML('afterend', modalHtml);
            modal.open(id);
        } else {
            console.error(`Ошибка HTTP: ${response.status}`);
        }
    }
}

export default Modal;

export const modal = new Modal();

window.Modal = modal;
