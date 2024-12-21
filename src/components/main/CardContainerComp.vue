<template>
    <section id="card-cont">
      <div class="sect-name">
        <h2 class="visually-hidden">Карточки</h2>
      </div>
      <div class="my-container">
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
          <span>{{ card.title }}</span>
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
    margin: 10px 0;
    align-items: center;
  }
  
  .visually-hidden {
    display: none;
  }
  
  .my-container {
    width: 95%;
    height:fit-content;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: .5rem;
    overflow-x: scroll;
    
  }
  
  .card-link {
    text-decoration: none;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 8px;
    background: #fff;
    font-size: 12px;
    width: 110px;
    box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.1);
    flex: none;
    padding: 10px;
  }
  
  .card-img {
    height: 24px;
    width: 24px;
  }
  </style>
  