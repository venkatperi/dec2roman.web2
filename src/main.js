import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './App.vue';
import AppMenu from 'components/AppMenu';
import Dec2roman from 'components/Dec2roman';

let router = new VueRouter( {
  routes: [
    {
      path: '/',
      components: {
        header: AppMenu,
        main: Dec2roman,
      },
    },
  ],
} )

Vue.use( VueRouter )

new Vue( {
  router,
  el: '#app',
  // render: h => h( App ),
} )
