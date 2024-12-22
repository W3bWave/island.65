<template>
    <div class="container-1">
      <div class="form-container" id="form">
        <div class="search-bar">
          <input type="text" placeholder="Поиск" class="search-input" v-model="filters.name" @input="fetchFilteredCards" />
        </div>
        <div class="filters">
          <div class="filter">
            <h3>Форма обучения:</h3>
            <label>
              <input type="radio" v-model="filters.learningForm" :value="null" @change="fetchFilteredCards" /> Все
            </label>
            <label>
              <input type="radio" v-model="filters.learningForm" :value="1" @change="fetchFilteredCards" /> Очная
            </label>
            <label>
              <input type="radio" v-model="filters.learningForm" :value="2" @change="fetchFilteredCards" /> Очно-заочная
            </label>
            <label>
              <input type="radio" v-model="filters.learningForm" :value="3" @change="fetchFilteredCards" /> Заочная
            </label>
          </div>
          <div class="filter">
            <h3>Возраст:</h3>
            <label>
              <input type="checkbox" @change="updateAges('5-7 лет', [5, 6, 7])" /> 5-7 лет
            </label>
            <label>
              <input type="checkbox" @change="updateAges('7-14 лет', [7, 8, 9, 10, 11, 12, 13, 14])" /> 7-14 лет
            </label>
            <label>
              <input type="checkbox" @change="updateAges('14-18 лет', [14, 15, 16, 17, 18])" /> 14-18 лет
            </label>
          </div>
          <div class="filter">
            <h3>Оценка:</h3>
            <input type="range" min="0" max="5" step="0.5" v-model="filters.average" @input="fetchFilteredCards" />
            <span>Текущая оценка: {{ filters.average }}</span>
          </div>
        </div>
        <div class="categories">
          <button class="category-button" 
                  v-for="(category, index) in categories" 
                  :key="index" 
                  :class="{'active': selectedCategory === category.value}" 
                  @click="selectCategory(category.value)">
            {{ category.label }}
          </button>
        </div>
      </div>
      <section id="cards">
        <router-link v-for="card in uniqueCards" :key="card.id" class="card" :style="'background:'+getRandomGradient()" :to="'/services/pfdo/card/'+card.id">
          <div class="c">
            <p>
              <span>{{ card.age_min / 12 }}&nbsp;-&nbsp;{{ card.age_max / 12 }}&nbsp;лет</span>
              <span>{{ card.duration_string }}</span>
            </p>
            <h2>{{ card.name }}</h2>
            <h3>{{ card.organization_name }}</h3>
          </div>
          <a class=sign target="_blank" :href="card.link">Записаться</a>
        </router-link>
        <button @click="loadMore">Загрузить ещё</button>
      </section>
    </div>
  </template>
  
  <script>
  import api from '@/pfdoAPI';
  
  export default {
    name: "MainView",
    data() {
      return {
        attempt: 1,
        gradients: [
          "linear-gradient(309.01deg, #316DEF 0%, #80A5F5 50%)",
          "linear-gradient(309.01deg, #7731EF 0%, #C3A2FF 50%)",
          "linear-gradient(129.01deg, #D9D9D9 50%, #737373 100%)",
          "linear-gradient(309.01deg, #FF3737 0%, #FFA5A5 50%)",
        ],
        filters: {
          learningForm: null,
          age: [],
          name: '',
          directionIds: [],
          average: 0,
          page: 1
        },
        categories: [
          { label: "Техническая", value: 2 },
          { label: "Художественная", value: 3 },
          { label: "Естественнонаучная", value: 4 },
          { label: "Социально-гуманитарная", value: 5 },
          { label: "Туристско-краеведческая", value: 6 },
          { label: "Физкультурно-спортивная", value: 7 },
        ],
        selectedCategory: null,
        cards: [],
      };
    },
    computed: {
      uniqueCards() {
        const seen = new Set();
        return this.cards.filter(card => {
          const duplicate = seen.has(card.id);
          seen.add(card.id);
          return !duplicate;
        });
      },
    },
    methods: {
      getRandomGradient() {
        return this.gradients[Math.floor(Math.random() * this.gradients.length)];
      },
      selectCategory(categoryValue) {
        this.selectedCategory = categoryValue;
        this.filters.directionIds = categoryValue ? [categoryValue] : [];
        this.fetchFilteredCards();
      },
      updateAges(label, values) {
        const index = this.filters.age.findIndex(ageGroup => ageGroup.label === label);
        if (index === -1) {
          this.filters.age.push({ label, values });
        } else {
          this.filters.age.splice(index, 1);
        }
        this.fetchFilteredCards();
      },
      async fetchFilteredCards() {
        try {
          const ageValues = this.filters.age.flatMap(group => group.values);
          const params = {
            directionIds: this.filters.directionIds,
            ages: ageValues.length > 0 ? ageValues : undefined,
            name: this.filters.name,
            form: this.filters.learningForm,
            average: this.filters.average,
          };
          const newCards = await api.searchInfo(params);
          this.cards = newCards;
        } catch (error) {
          console.error("Ошибка загрузки фильтрованных данных:", error);
        }
      },
      async loadMore() {
        this.attempt++;
        this.page++
        try {
          const new_cards = await api.getCards({ ...this.filters, page: this.attempt });
          console.log(new_cards)
          const uniqueNewCards = new_cards.filter(card => !this.cards.some(existingCard => existingCard.id === card.id));
          this.cards.push(...uniqueNewCards);
        } catch (error) {
          console.error("Ошибка загрузки данных:", error);
        }
      },
    },
    async mounted() {
      try {
        const initialCards = await api.getCards(this.filters);
        this.cards = initialCards;
      } catch (error) {
        console.error("Ошибка при загрузке карт:", error);
      }
    }
  };
  </script>
  
  <style scoped>
  .container-1 {
    font-family: Arial, sans-serif;
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
  .search-bar {
    margin-bottom: 20px;
  }
  .search-input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }

  .filters {
    margin-bottom: 20px;
    border: 1px solid #ccc;
    background: #eee;
    padding: 10px;
    border-radius: 8px;
  }
  .filter {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: .5rem
  }
  .filter h3 {
    margin: 0 0 10px;
    font-size: 16px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .category-button {
    padding: 10px 15px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #f0f0f0;
    transition: background-color 0.3s;
  }
  .category-button.active {
    background-color: #000;
    color: #fff;
  }
  .category-button:hover {
    background-color: #ddd;
  }

  #cards{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;

    .card{
        width: 100%;
        min-height: 350px;
        padding: 1rem;
        border-radius: 1rem;
        border: 2px solid #000;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: #000;

        .c{
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: .75rem;

            p{
                display: flex;
                flex-direction: row;
                align-items: center;
                flex-wrap: wrap;
                gap: .5rem;
                justify-content: space-between;

                span:first-child{
                    padding: .3rem;
                    background: #fff;
                    border-radius: .5rem;
                }
                span:last-child{
                    text-decoration: underline;
                }
            }

            h2{
                font-size: 1rem
            }
            h3{
                font-size: .75rem
            }
        }

        .sign{
            display: block;
            text-align: center;
            background: #fff;
            padding: .5rem .25rem;
            border:1px solid #000;
            border-radius: .5rem;
        }
    }
  }
  </style>
