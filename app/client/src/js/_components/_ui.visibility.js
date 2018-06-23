import $ from 'jquery';

const G = window;
const D = document;

// remove browser default alerts
/*alert = function () {
  console.log(arguments);
  console.log(new Error().stack);
};*/






/*G.addEventListener(G.visibilityChangeEvent, () => {
  if (currentPage && typeof currentPage !== 'undefined') {
    if (
      landingPage !== G.location.href &&
            currentPage !== '/' &&
            currentPage.indexOf('/dev') === -1 &&
            !$('main>div').hasClass('type-ErrorPage')
    ) {
      G.localStorage.setItem('current-page', G.location.href);
    } else if (landingPage === G.location.href || currentPage.indexOf('/dev') !== -1) {
      G.localStorage.removeItem('current-page');
    }
  }
});*/