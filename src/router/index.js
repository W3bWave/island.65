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
        },
        {
          path: '/services/gorni/tracks',
          name: 'Горный Воздух - Состояние трасс',
          component: () => import('../views/services/gorni/TracksView.vue'),
        },
        {
          path: '/services/gorni/weather',
          name: 'Горный Воздух - Погода на трассе',
          component: () => import('../views/services/gorni/WeatherView.vue'),
        },
        
        {
          path: '/services/gorni/time',
          name: 'Горный Воздух - Режим работы',
          component: () => import('../views/services/gorni/TimeView.vue'),
        },
        {
          path: '/services/gorni/contacts',
          name: 'Горный Воздух - Контакты',
          component: () => import('../views/services/gorni/ContactView.vue'),
        },
        {
          path: '/services/gorni/skipasses',
          name: 'Горный Воздух - Тарифы на ски-пассы',
          component: () => import('../views/services/gorni/SkipassesView.vue'),
        },
        {
          path: '/services/gorni/companions',
          name: 'Горный Воздух - Поиск попутчика',
          component: () => import('../views/services/gorni/CompanionView.vue'),
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


let blackLisFromRoutesForNavigation = [
  "/",
  "/cart",
  "/favorites",
  "/products/edit/:id",
  "/products/create/second",
  "/shops/edit/:id",
  "/shops/create/second",
  "/shops/create/first"
]
let blackLisToRoutesForNavigation = [
  "/",
  "/profile",
  "/services",
]

window.Telegram.WebApp.BackButton.onClick(()=>{
  router.go(-1)
  })
router.beforeEach((to, from, next) => {
  console.log(to);
  
  
    let match = false;
    if(from.matched.length > 0){
      console.log(from.matched);
      
      if(blackLisFromRoutesForNavigation.includes(from.matched[0].path)){
        match = true;
      }
    }
    if(blackLisFromRoutesForNavigation.includes(from.path) || blackLisToRoutesForNavigation.includes(to.path) || match){
      window.Telegram.WebApp.BackButton.hide()
      console.log("hide");
      
    }
    else{
      window.Telegram.WebApp.BackButton.show()
      console.log("show");
    }
    
    next();
  })

export default router;
