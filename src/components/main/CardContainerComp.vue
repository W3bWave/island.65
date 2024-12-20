<template>
    <section id="card-cont">
      <div class="sect-name">
        <h2 class="visually-hidden">Карточки</h2>
      </div>
      <div class="container">
        <!-- Перебираем массив карточек и создаем элементы -->
        <router-link
          v-for="(card, index) in cards"
          :key="index"
          :to="card.link"
          class="card-link"
        >
          <img
            :src="card.img"
            :alt="card.alt || `Card ${index + 1}`"
            class="card-img"
          />
        </router-link>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "CardContainerComp",
    props: {
      cards: {
        type: Array,
        required: true,
        validator(value) {
          return value.every(
            (card) =>
              typeof card.img === "string" &&
              typeof card.link === "string"
          );
        },
      },
    },
  };
  </script>
  
  <style scoped>
  #card-cont {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .visually-hidden {
    display: none;
  }
  
  .container {
    width: 95%;
    height:fit-content;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: .5rem;
    overflow-x: scroll;
    align-items: center;
  }
  
  .card-link {
    text-decoration: none;
    display: inline-block;
    border-radius: 8px;
  }
  
  .card-img {
    height: 100%;
    object-fit: cover;
  }
  </style>
  