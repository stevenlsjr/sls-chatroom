import Vue from 'vue';
import Router, { NavigationGuard } from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from './views/Login.vue';
import Conversations from './views/Conversations.vue';
import store from './store';


Vue.use(Router);

const requiresLogin: NavigationGuard = (to, from, next)=>{
  if (!store.state.user){
    next('/login');
  } else {
    next();
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: requiresLogin,
    },
    {
      path: '/conversations',
      name: 'conversations',
      component: Conversations,
      beforeEnter: requiresLogin,

    },
    {
      path: '/about',
      name: 'about',
      component: About,

    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});
