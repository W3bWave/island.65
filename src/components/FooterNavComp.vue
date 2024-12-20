<script>
export default {
  name: "FooterNavComp",
  computed: {
    filteredRoutes() {
      return this.$router.options.routes.filter(route => 
        route.path !== '/:catchAll(.*)' && 
        route.path !== '/404' && 
        route.name
      );
    }
  },
  methods: {
    getIconColor(route) {
      return this.$route.path === route.path ? '#000' : '#0066B3'; // Черный для активного, голубой для неактивного
    }
  }
};
</script>

<template>
  <footer id="footer">
    <nav>
      <ul>
        <li v-for="route in filteredRoutes" :key="route.path">
          <router-link :to="route.path" class="icon">
            <component 
              :is="route.icon" 
              :color="getIconColor(route)" 
              class="icon-img"
            />
            <h3 :style="'color:' + getIconColor(route)" class="icon-name">{{ route.name }}</h3>
          </router-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<style scoped lang="scss">
#footer {
  width: 100%;
  background-color: #fff;
  position: sticky;
  bottom: 0;
  padding: 1rem 0;

  nav, ul {
    width: 100%;
  }

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .icon {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;

      &-name {
        font-size: 1rem;
      }
    }
  }
}
</style>
