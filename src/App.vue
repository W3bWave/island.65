<script>
import HeaderComp from './components/HeaderComp.vue';
import FooterNavComp from './components/FooterNavComp.vue';

export default {
  name: "MainApp",
  components: {
    HeaderComp,
    FooterNavComp,
  },
  mounted(){
    if(this.Telegram.WebApp.platform != 'tdesktop' && this.Telegram.WebApp.platform != 'web'){
      this.$store.state.pinAuthorized = true,
    }
  }
}
</script>

<template>
  <HeaderComp/>
  <main>
    <div id="display">
      <RouterView />
    </div>
  </main>
  <FooterNavComp/>
</template>

<style scoped>
main {
  height: 100%; /* Пусть main занимает всю доступную высоту */
  overflow: hidden; /* Убираем прокрутку у main */
  display: flex;
  flex-direction: column;
}

#display {
  width: 100%;
  height: 100%; /* Ограничиваем высоту */
  overflow-y: auto; /* Добавляем прокрутку по вертикали */
  position: relative;
  box-sizing: border-box; /* Защита от проблем с отступами */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

</style>
