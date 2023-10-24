import '@a2nt/mithril-ui/src/js/ui'
const m = require("mithril") // eslint-disable-line

const MainContentContainer = document.getElementById('MainContent')

const MainContent = document.createElement('div')
MainContent.classList.add('page--container')
MainContentContainer.append(MainContent)

const page = require('@a2nt/mithril-ui/src/js/ui/page/tpl')
m.mount(MainContent, page)
