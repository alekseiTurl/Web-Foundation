import IMask from 'imask';

export const inputMask = () => {
    const inputTel = document.querySelectorAll('input[type="tel"]');

    inputTel.forEach(el => {
        const maskOptions = {
            mask: [
                {
                    mask: '+{7} (000) 000-00-00',
                    country: 'Russia',
                    startsWith: '8',
                    prepare: (appended, masked) => {
                        if (appended === '8' && masked.value === '') {
                            return '7';
                        }
                        return appended;
                    },
                },
                {
                    mask: '+7 (000) 000-00-00',
                    startsWith: '+7',
                    country: 'Russia',
                },
                {
                    mask: '+7 (000) 000-00-00',
                    startsWith: '7',
                    country: 'Russia',
                },
                {
                    mask: '+7 (000) 000-00-00',
                    startsWith: '',
                    country: 'unknown',
                },
            ],
        };

        const mask = IMask(el, maskOptions); // eslint-disable-line

    });
};
