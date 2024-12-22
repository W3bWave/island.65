<script>
import api from '@/pfdoAPI'

export default {
  name: "ReviewsView",
  data() {
    return {
      id: this.$route.params.id,
      reviews: [],
    };
  },
  async mounted() {
    try {
      this.reviews = await api.getReviews(this.id);
      console.log(this.reviews);
    } catch (error) {
      console.error("Ошибка загрузки отзывов:", error);
    }
  },
};
</script>

<template>
  <div class="container">
    <!-- Отзывы -->
    <div v-if="reviews.length" class="reviews">
      <div class="review" v-for="(review, index) in reviews" :key="index">
        <div class="header">
          <p class="name">{{ review.certificate_initials }}</p>
          <span class="created">{{ review.created_at }}</span>
        </div>
        <div class="bottom stars">
          <!-- Отображение звезд -->
          <div class="star" v-for="star in review.score" :key="star">
            <svg
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.43671 2.38197C10.0354 0.539348 12.6422 0.539341 13.2409 2.38197L14.7595 7.05573H19.6738C21.6113 7.05573 22.4168 9.53496 20.8494 10.6738L16.8737 13.5623L18.3923 18.2361C18.991 20.0787 16.882 21.6109 15.3146 20.4721L11.3388 17.5836L7.36309 20.4721C5.79567 21.6109 3.6867 20.0787 4.2854 18.2361L5.804 13.5623L1.82826 10.6738C0.260837 9.53496 1.06639 7.05573 3.00383 7.05573H7.91812L9.43671 2.38197ZM12.8574 7.67376L11.3388 3L9.82023 7.67376C9.55248 8.49781 8.78457 9.05573 7.91812 9.05573L3.00383 9.05573L6.97957 11.9443C7.68055 12.4536 7.97386 13.3563 7.70611 14.1803L6.18752 18.8541L10.1633 15.9656C10.8642 15.4563 11.8134 15.4563 12.5144 15.9656L16.4901 18.8541L14.9715 14.1803C14.7038 13.3563 14.9971 12.4536 15.6981 11.9443L19.6738 9.05573H14.7595C13.8931 9.05573 13.1252 8.49781 12.8574 7.67376Z"
                fill="black"
                stroke="black"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!-- Нет отзывов -->
    <div v-else class="reviews" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center">
      <h2>У данной программы нет отзывов</h2>
    </div>
  </div>
</template>

<style>
.container{
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .reviews{
        margin-top: 1rem;
        padding: 1rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        .review{
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 1.25rem;
            background: #d9d9d986;
            border-radius: 1rem;
            gap: 1.25rem;
        }

        .name{
            font-size: 1.25rem;
            font-weight: 600;
        }

        .stars{
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: end;
        }
    }
}
</style>