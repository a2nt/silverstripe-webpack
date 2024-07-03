import '@a2nt/mithril-ui/src/js/ui'
import Events from '@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/_events'

const m = require("mithril") // eslint-disable-line

window.addEventListener('prefetch-loaded', () => {
    if (window.initAjaxOnce) {
        return
    }

    const MainContentContainer = document.getElementById('MainContent')

    const MainContent = document.createElement('div')
    if (!MainContentContainer.dataset.legacy) {
        MainContent.classList.add('page--container')
        MainContentContainer.append(MainContent)

        const page = require('@a2nt/mithril-ui/src/js/ui/page/tpl')
        m.mount(MainContent, page)
    } else {
        // legacy fallback
        const spinner = document.getElementById('PageLoading')
        if (spinner) {
            window.addEventListener(`${Events.LOADED}`, () => {
                spinner.classList.add('d-none')
            })

            window.addEventListener(`${Events.AJAX}`, () => {
                spinner.classList.add('d-none')
            })
        }
    }

    document.querySelectorAll('a.legacy').forEach((el) => {
        el.addEventListener('click', (e) => {
            window.location = e.currentTarget.getAttribute('href')
        })
    })

    window.initAjaxOnce = true
})
