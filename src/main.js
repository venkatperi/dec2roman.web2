import App from 'components/App'
import AppCore from 'components/AppCore'
import AppFooter from 'components/AppFooter'
import AppMenu from 'components/AppMenu'
import Vue from 'vue'
import VueRouter from 'vue-router'

const appComponents = {
  core: AppCore,
  header: AppMenu,
  main: App,
  footer: AppFooter,
}

let router = new VueRouter( {
  routes: [
    // { path: '/', components: appComponents },
    { path: '/:args*', components: appComponents },
  ],
} )

Vue.use( VueRouter )

new Vue( {
  router,
  el: '#app',
} )
