import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '@/views/Index.vue';
import MainNavbar from '@/layout/MainNavbar.vue';
import MainFooter from '@/layout/MainFooter.vue';
import Landing from '@/views/Landing.vue';
import LoginPage from '@/views/LoginPage.vue';
import Profile from '@/views/Profile.vue';

import store from '@/store/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' },
      },
    },
    {
      path: '/login',
      components: {
        default: LoginPage,
        header: MainNavbar,
        footer: MainFooter,
      },
    },
    {
      path: '/profile',
      components: {
        default: Profile,
        header: MainNavbar,
        footer: MainFooter,
      },
    },
    {
      path: '*',
      component: () => import('@/views/NotFoundPage.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    console.log('인증이 필요합니다');
    next('/login');
    return;
  }
  next();
});

export default router;
