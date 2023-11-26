function pageWidget(pages: string[]) {
    const wrap = document.createElement('div')
    const styles = document.createElement('style')
    wrap.classList.add('widget_wrap')

    const widgetList = () => {
        return `<ul class="widget_list"></ul>`
    }
    const widgetStylization = () => {
        // eslint-disable-next-line max-len
        return `
            body {
                position: relative;
            }
            
            .widget_wrap {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 9999;
                padding: 10px 20px;
                background: #222;
                border-bottom-right-radius: 10px;
                -webkit-transition: all .3s ease;
                transition: all .3s ease;
                -webkit-transform: translate(-100%, 0);
                -ms-transform: translate(-100%, 0);
                transform: translate(-100%, 0);
            }
            
            .widget_wrap:after {
                content: " ";
                position: absolute;
                top: 0;
                left: 100%;
                width: 24px;
                height: 24px;
                // eslint-disable-next-line max-len
                // eslint-disable-next-line max-len
                background: #222 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) no-repeat 50% 50%;
                cursor: pointer;
            }
            
            .widget_wrap:hover {
                -webkit-transform: translate(0, 0);
                -ms-transform: translate(0, 0);
                transform: translate(0, 0);
            }
            
            .widget_item {
                padding: 0 0 10px;
            }
            
            .widget_link {
                color: #fff;
                text-decoration: none;
                font-size: 15px;
            }
            
            .widget_link:hover {
                text-decoration: underline;
            }
    `
    }

    wrap.innerHTML = widgetList()
    document.body.prepend(wrap)
    styles.innerHTML = widgetStylization()
    wrap.prepend(styles)

    for (let i = 0; i < pages.length; i++) {
        const li = document.createElement('li')
        li.classList.add('widget_item')
        li.innerHTML = `<a class="widget_link" href="${pages[i]}.html">${pages[i]}</a>`
        document.querySelector('.widget_list')?.append(li)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hostname === 'localhost') {
        pageWidget([ 'index', 'catalog', 'element', 'about', 'contacts', '404' ])
    }
})
