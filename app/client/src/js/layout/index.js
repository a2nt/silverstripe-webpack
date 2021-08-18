import Events from "@a2nt/ss-bootstrap-ui-webpack-boilerplate-react/src/js/_events";

const LayoutUI = ((W) => {
  const NAME = "_layout";
  const D = document;
  const BODY = D.body;

  const init_fonts = () => {
    console.log(`${NAME}: init_fonts`);

    const css = D.createElement("link");
    css.rel = "stylesheet";
    css.type = "text/css";
    css.media = "all";
    css.href =
      "https://fonts.googleapis.com/css?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap";
    D.getElementsByTagName("head")[0].appendChild(css);
  };

  const init_analytics = () => {
    console.log(`${NAME}: init_analytics`);
    /*google analytics */
    /*(function(i, s, o, g, r, a, m) {
          i['GoogleAnalyticsObject'] = r;
          (i[r] =
            i[r] ||
            function() {
              (i[r].q = i[r].q || []).push(arguments);
            }),
            (i[r].l = 1 * new Date());
          (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
          a.async = 1;
          a.src = g;
          m.parentNode.insertBefore(a, m);
        })(
          window,
          document,
          'script',
          '//www.google-analytics.com/analytics.js',
          'ga',
        );
        ga('create', 'UA-********-*', 'auto');
        ga('send', 'pageview');*/
  };

  W.addEventListener(`${Events.LOADED}`, () => {
    init_fonts();
    //init_analytics();
  });
})(window);
export default LayoutUI;
