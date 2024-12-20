<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
    name: "BannerComp",
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        slides: {
            type: Array,
            required: true,
            validator(value) {
                return value.every(slide => 
                    typeof slide.img === 'string' && 
                    (!slide.link || typeof slide.link === 'string')
                );
            }
        }
    }
};
</script>

<template>
    <section id="banner">
        <div class="sect-name">
            <h2 style="display: none">Баннер</h2>
        </div>
        <div class="banners">
            <swiper
                class="swiper"
                :slides-per-view="1"
                :keyboard="{
                    enabled: true,
                    onlyInViewport: false
                }"
                grab-cursor="true"
                :autoplay="{
                    delay: 3000, // Интервал автопрокрутки в миллисекундах
                    disableOnInteraction: false // Продолжать автопрокрутку после взаимодействия
                }"
            >
                <swiper-slide
                    v-for="(slide, index) in slides"
                    :key="index"
                >
                    <template v-if="slide.link">
                        <router-link :to="slide.link">
                            <img :src="slide.img" alt="Banner image" />
                        </router-link>
                    </template>
                    <template v-else>
                        <img :src="slide.img" alt="Banner image" />
                    </template>
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>

<style scoped>
#banner {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.banners {
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.swiper {
    width: 100%;
    box-sizing: border-box;
}

.swiper-slide {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.swiper-slide a {
    width: 100%;
    height: 100%;
}
</style>
