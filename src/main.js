import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from './store/index';
import MaterialKit from './plugins/material-kit';

Vue.config.productionTip = false;

Vue.use(MaterialKit);

const NavbarStore = {
  showNavbar: false,
};

Vue.mixin({
  data() {
    return {
      NavbarStore,
    };
  },
});

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
