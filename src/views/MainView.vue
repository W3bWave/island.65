<script>
// import CardContainerComp from '@/components/main/CardContainerComp.vue';
import ContainerComp from '@/components/main/ContainerComp.vue';

export default {
  name: 'HomeView',
  components: {
    ContainerComp,
    // CardContainerComp
  },
  data() {
    return {
      slides: [
        {
          img: require('@/assets/banners/1.png'),
          link: '/services/404'
        },
        {
          img: require('@/assets/banners/2.png'),
        }
      ],
      cards: [
        {
          img: require('@/assets/icons/cards/safe_city.png'),
          link: '/services/404'
        },
        {
          img: require('@/assets/icons/cards/safe_city.png'),
          link: '/services/404'
        },
        {
          img: require('@/assets/icons/cards/safe_city.png'),
          link: '/services/404'
        },
        {
          img: require('@/assets/icons/cards/safe_city.png'),
          link: '/services/404'
        },
        {
          img: require('@/assets/icons/cards/safe_city.png'),
          link: '/services/404'
        },
        {
          img: require('@/assets/icons/cards/safe_city.png'),
          link: '/services/404'
        },
      ]
    };
  }
};
</script>

<template>
  <!-- <CardContainerComp :cards="cards" /> -->
  <ContainerComp :slides="slides" />
  <span>to be continued</span>
</template>
