import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/MainView.vue';
import MainIcon from '../assets/icons/nav/MainIcon.vue';
import ServicesIcon from '../assets/icons/nav/ServicesIcon.vue';
import ProfileIcon from '../assets/icons/nav/ProfileIcon.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Главная',
      icon: MainIcon,
      component: Main,
    },
    {
      path: '/services',
      name: 'Сервисы',
      icon: ServicesIcon,
      component: () => import('../views/ServicesView.vue'),
      children: [
        {
          path: '/services/gorni',
          name: 'Горный Воздух',
          component: () => import('../views/services/gorni/MainView.vue'),
        }
      ]
    },
    {
      path: '/profile',
      name: 'Профиль',
      icon: ProfileIcon,
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/404',
      name: 'Not Found - 404',
      component: () => import('../views/ErrorView.vue'),
      meta: { notFound: true },
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/404',
    },
  ],
});

// Example of using a navigation guard to update the document title
router.beforeEach((to, from, next) => {
  document.title = 'Острова.65 - ' + to.name;
  next();
});

export default router;