<script>
    import api from '@/pfdoAPI'

    export default{
        name: "CardView",
        data(){
            return {
                id: this.$route.params.id,
                gradients: [
                    "linear-gradient(309.01deg, #316DEF 0%, #80A5F5 50%)",
                    "linear-gradient(309.01deg, #7731EF 0%, #C3A2FF 50%)",
                    "linear-gradient(129.01deg, #D9D9D9 50%, #737373 100%)",
                    "linear-gradient(309.01deg, #FF3737 0%, #FFA5A5 50%)",
                ],
                card: {}
            }
        },
        async mounted(){
            this.card = await this.getInfo(this.id)
            console.log(this.card)
            this.ymaps.ready(()=>{
                console.log("ready");
                let map = new this.ymaps.Map("map",{
                    center: [this.card.address.coords.lat, this.card.address.coords.lng],
                    zoom: 15
                })

                let mark = new this.ymaps.Placemark([this.card.address.coords.lat, this.card.address.coords.lng], {}, {
                    preset: {
                        iconLayout: 'default#image',
                        iconImageHref: 'https://sakhsos.ru/icon.png',
                        iconImageSize: [50, 62],
                        iconImageOffset: [-3, -42]
                    }
                });
                map.geoObjects.add(mark);
                
            })
        },
        methods: {
            async getInfo(id){
                const data = await api.getProgram(id)
                
                const name = data.program.short_name
                const org = data.organization.name
                const age_min = data.program.age_group_min
                const age_max = data.program.age_group_max
                const descript = data.program.annotation
                const address = data.address.name
                const lat = data.address.lat
                const lng = data.address.lng
                const start_date = data.available_groups[0] ? data.available_groups[0].start_date : 'Доступные групп нет'
                const free_places = data.available_groups.reduce((sum, obj) => ~~sum + ~~(obj.free_places_counter || 0), 0)

                return {
                    name, org, age_min, age_max, descript, start_date, free_places, 
                    address: {
                        name, 
                        address,
                        coords: {
                            lat,
                            lng
                        }
                    },
                }
            },
            getRandomGradient() {
                return this.gradients[Math.floor(Math.random() * this.gradients.length)];
            },
        }
    }
</script>

<template>
    <div class="container">
        <div class="program">
            <div class="cont_params">
                <div class="card" v-if="card" :style="'background:'+getRandomGradient()">
                    <h2 class="name">{{ card.name }}</h2>
                    <h3 class="org">{{ card.org }}</h3>
                </div>
    
                <div class="params">
                    <div class="param">
                        <svg class="param_icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM7.59885 17.6832C7.01498 17.2711 6.82601 16.4791 7.1751 15.8471C8.1126 14.1498 9.92185 13 12 13C14.0781 13 15.8874 14.1498 16.8249 15.8472C17.174 16.4793 16.985 17.2713 16.4011 17.6833C15.2426 18.5009 13.6972 19 12.0001 19C10.3029 19 8.75742 18.5008 7.59885 17.6832Z" fill="#1D1D1D"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" fill="#1D1D1D"/>
                        </svg>
                        <span>{{ card.age_min / 12 }}&nbsp;-&nbsp;{{ card.age_max / 12 }}&nbsp;лет</span>                        
                    </div>
                    <div class="param">
                        <svg class="param_icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.26628 3.32055C5.45553 3.11618 5.72146 3 6 3H18C18.2785 3 18.5445 3.11618 18.7337 3.32055C18.923 3.52492 19.0184 3.79897 18.9971 4.0767L18.9547 4.62765L20.6179 4.07324C21.2977 3.84663 21.9998 4.35264 21.9998 5.06923V7.83776C21.9998 10.1567 20.5159 12.2154 18.316 12.9487C18.2948 12.9558 18.2736 12.9621 18.2523 12.9677C17.692 15.5425 15.5955 17.514 13 17.9221V20H16C16.5523 20 17 20.4477 17 21C17 21.5523 16.5523 22 16 22H8C7.44771 22 7 21.5523 7 21C7 20.4477 7.44771 20 8 20H11V17.9221C8.40447 17.514 6.30804 15.5425 5.74769 12.9677C5.72641 12.9621 5.70516 12.9558 5.68399 12.9487C3.48407 12.2154 2.00021 10.1567 2.00021 7.83776V5.06923C2.00021 4.35264 2.70226 3.84663 3.38208 4.07324L5.04533 4.62765L5.00294 4.0767C4.98158 3.79897 5.07702 3.52492 5.26628 3.32055ZM7.07988 5L7.61357 11.938C7.78988 14.2301 9.70116 16 12 16C14.2988 16 16.2101 14.2301 16.3864 11.938L16.9201 5H7.07988ZM19.9998 6.38746L18.9998 6.7208V10.241C19.6256 9.61895 19.9998 8.76116 19.9998 7.83776V6.38746ZM5.00021 6.7208L4.00021 6.38746V7.83776C4.00021 8.76116 4.37442 9.61895 5.00021 10.241V6.7208Z" fill="black"/>
                        </svg>                        
                        <span>{{ card.free_places }}&nbsp;мест</span>                        
                    </div>
                    <div class="param">
                        <svg class="param_icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 6C1 4.34315 2.34315 3 4 3H20C21.6569 3 23 4.34315 23 6V18C23 19.6569 21.6569 21 20 21H4C2.34315 21 1 19.6569 1 18V6ZM4 5C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5H4Z" fill="#1D1D1D"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 8C1 7.44772 1.44772 7 2 7H22C22.5523 7 23 7.44772 23 8C23 8.55228 22.5523 9 22 9H2C1.44772 9 1 8.55228 1 8Z" fill="#1D1D1D"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2C6.55228 2 7 2.44772 7 3V5C7 5.55228 6.55228 6 6 6C5.44772 6 5 5.55228 5 5V3C5 2.44772 5.44772 2 6 2ZM18 2C18.5523 2 19 2.44772 19 3V5C19 5.55228 18.5523 6 18 6C17.4477 6 17 5.55228 17 5V3C17 2.44772 17.4477 2 18 2Z" fill="#1D1D1D"/>
                            <rect x="5" y="10" width="2" height="2" rx="1" fill="#1D1D1D"/>
                            <rect x="5" y="13" width="2" height="2" rx="1" fill="#1D1D1D"/>
                            <rect x="5" y="16" width="2" height="2" rx="1" fill="#1D1D1D"/>
                            <rect x="9" y="10" width="2" height="2" rx="1" fill="#1D1D1D"/>
                            <rect x="9" y="13" width="2" height="2" rx="1" fill="#1D1D1D"/>
                            <rect x="9" y="16" width="2" height="2" rx="1" fill="#1D1D1D"/>
                            <rect x="13" y="10" width="2" height="2" rx="1" fill="#1D1D1D"/>
                            <rect x="13" y="13" width="2" height="2" rx="1" fill="#1D1D1D"/>
                            <rect x="13" y="16" width="2" height="2" rx="1" fill="#1D1D1D"/>
                            <rect x="17" y="10" width="2" height="2" rx="1" fill="#1D1D1D"/>
                            <rect x="17" y="13" width="2" height="2" rx="1" fill="#1D1D1D"/>
                            <rect x="17" y="16" width="2" height="2" rx="1" fill="#1D1D1D"/>
                        </svg>                        
                        <span style="text-align: center">{{ card.start_date }}</span>                        
                    </div>
                </div>
            </div>
            <div class="descript">
                <div class="header">
                    <h2>Описание программы</h2>
                    <router-link class="link_reviews" :to="`/services/pfdo/card/${id}/reviews`">Отзывы</router-link>
                </div>
                <div v-html="card.descript" class="descript"></div>
            </div>
            <h2 v-if="card.address">Адрес: {{ card.address.address }}</h2>
            <div class="map" id="map"></div>
        </div>
    </div>
</template>

<style scoped>
.container{
    padding: 2rem 1rem;

    .program{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        gap:1rem;

        .cont_params{
            width: 100%;
            display: flex;
            flex-direction: row;
            gap: 1.5rem;
            align-items: center;
            justify-content: space-between;

            .card{
                width: 65%;
                min-height: 350px;
                padding: 1rem;
                border-radius: 1rem;
                display: flex;
                flex-direction: column;
                align-items: start;
                gap: 1rem;

                h2{
                    font-size: 1.25rem;
                }
            }

            .params{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 1.5rem;

                .param{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    background: #d9d9d9;
                    padding: 1rem;
                    border-radius: 1rem;
                }
            }
        }

        .descript{
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 2rem;

            .header{
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;

                h2{
                    font-weight: 600;
                    font-size: 1.25rem;
                }

                .link_reviews{
                    color: #000;
                    background: #d9d9d9;
                    padding: 0.25rem 1rem;
                    border-radius: 1rem;
                    border: 2px solid #000;
                }
            }
        }
    }
}
#map{
    width: 100%;
    height: 200px
}
</style>