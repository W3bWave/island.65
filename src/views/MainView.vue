<script>
import CardContainerComp from '@/components/main/CardContainerComp.vue';
import ContainerComp from '@/components/main/ContainerComp.vue';
import PinCode from '@/components/main/PinCode.vue';

export default {
  name: 'HomeView',
  components: {
    ContainerComp,
    CardContainerComp,
    PinCode
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
          img: require('@/assets/icons/main/medicine.svg'),
          title : "медицинские услуги",
          link: '/services/404'
        },
        {
          img: require('@/assets/icons/main/card.svg'),
          title : "карта сахалинца",
          link: '/services/404'
        },
        {
          img: require('@/assets/icons/main/notes.svg'),
          title : "опросы",
          link: '/services/404'
        },
        {
          img: require('@/assets/icons/main/news.svg'),
          title : "новости",
          link: '/services/404'
        },
        {
          img: require('@/assets/icons/main/nakaz.svg'),
          title : "наказы",
          link: '/services/404'
        }
      ]
    };
  }
};
</script>

<template>
  
    <CardContainerComp :cards="cards" />
    <ContainerComp :slides="slides" />
    <PinCode v-if="!$store.state.pinAuthorized"/>
    <div class="hackaton">
      <img src="https://leader-id.storage.yandexcloud.net/upload/377252/71c5c4a1-2d43-4531-ad18-9c027589b1f4.jpg" alt="">
    </div>
</template>
<style scoped>
  .home{
    display: flex;
    flex-direction: column;
    gap: 20px
  }
  .hackaton{
    width: 93%;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 20px;
  }
</style>
