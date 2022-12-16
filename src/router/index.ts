import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import localCache from '@/utils/cache';
import { firstRoute } from '@/utils/map-menus';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ 'views/login/login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "home" */ 'views/home/home.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('views/not-found/not-found.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

//导航守卫
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token');

    if (!token) {
      return '/login';
    }
  }

  if (to.path === '/home') {
    return firstRoute.path;
  }
});

export default router;
