import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from './views/Login.vue';
import Conversations from './views/Conversations.vue';
import store from './store';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter(to, from, next){
        if (!store.state.user){
          next('/login');
        } else {
          next();
        }
      }
    },
    {
      path: '/conversations',
      name: 'conversations',
      component: Conversations,
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
