import '@a2nt/mithril-ui/src/js/ui'
const m = require("mithril") // eslint-disable-line

const MainContent = document.getElementById('MainContent')
MainContent.classList.add('page--container')

const page = require('@a2nt/mithril-ui/src/js/ui/page/tpl')
m.mount(MainContent, page)
