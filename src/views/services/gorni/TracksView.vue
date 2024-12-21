<script>
import MapComp from '@/components/gorny/MapComp.vue';
export default{
    name : "TracksView",
    components : {MapComp},
    data(){
        return {
            tracks : [],
            cities : []
        }
    },
    methods : {
        async getCities(){
            let json = await (await fetch("https://welcome.netcloud.dev/api/v1/gv/cities")).json()
            this.cities = json
            
        },
        async getTracks(city = 1){
            let json = await (await fetch("https://welcome.netcloud.dev/api/v1/gv/tracks/" + city)).json()
            this.tracks = json
        },
        swapTrack(ev){
            this.getTracks(ev.target.value);
            
            
        }
    },
    mounted(){
        this.getCities();
        this.getTracks();
    }
}
</script>
<template>
    <div class="container flex flex-col items-center pt-5">
        <MapComp/>
        <select name="" id="" @change="swapTrack">
            <option :value="city.id" v-for="city of cities" :key="city" >{{ city.name }}</option>
        </select>
        <div class="difficulties">
            <div class="difficulty">
                <div class="diff diff_1"></div>
                <span>Лёгкая</span>
            </div>
            <div class="difficulty">
                <div class="diff diff_2"></div>
                <span>Средняя</span>
            </div>
            <div class="difficulty">
                <div class="diff diff_3"></div>
                <span>Сложная</span>
            </div>
            <div class="difficulty">
                <div class="diff diff_4"></div>
                <span>Очень сложная</span>
            </div>
        </div>
        <div class="tracks">
            <div class="track" v-for="track of tracks" :key="track">
                <div class="track-header">
                    <div :class="`track_number diff_${track.difficulty_in_num}`">{{ track.number }}</div>
                    <div class="track_name">{{ track.name }}</div>
                </div>
                <div class="track-info">
                    <div class="track-param">
                        <img class="track-param-icon" src="@/assets/icons/gorny/icon_way.svg" alt="">
                        <span>{{ track.length }}</span>
                    </div>
                    <div class="track-param" v-if="track.time != 'null'">
                        <img class="track-param-icon" src="@/assets/icons/gorny/icon_clock.svg" alt="">
                        <span>{{ track.time }}</span>
                    </div>
                    <div class="track-param">
                        <img class="track-param-icon" src="@/assets/icons/gorny/icon_high.svg" alt="">
                        <span>{{ track.height }}</span>
                    </div>
                </div>
                <div :class="`track-status ${track.status}`">
                    <img v-if="track.status == 'closed'" src="@/assets/icons/gorny/closed.svg" alt="">
                    <img v-if="track.status == 'opened'" src="@/assets/icons/gorny/opened.svg" alt="">
                    {{ track.status_text }}
                </div>
            </div>
        </div>
    </div>
    
</template>
<style>
   
    .tracks{
        display: flex;
        flex-direction: column;
        width: 90%;
        gap: 10px;
    }
    .track-info{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 10px;
        gap: 10px;
    }
    .track-param{
        display: flex;
        align-items: center;
        gap: 5px;
        width: 45%;
    }
    .track-param img{
        height: 18px;
        width: 18px;
    }
    .track-param span{
        font-size: 15px;
    }
    .track-status{
        border-top: 1px solid #ccc;
        padding: 5px 0;
        margin-top: 10px;
        display: flex;
        gap: 5px;
        align-items: center;
        font-size: 15px;
    }
    select{
        width: 90%;
        padding: 10px;
        background-color: #fff;
        border-radius: 10px;
        margin-top: 10px;
    }
    .closed{
        color: #cd0b0b;
    }
    .opened{
        color: #429867;
    }
    .track-status img{
        height: 18px;
        width: 18px;
    }
    .track{
        background-color: #fff;
        border-radius: 12px;
        width: 100%;
        padding: 10px;
        
    }
    .track_number{
        height: 25px;
        width: 25px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        border-radius: 50%;
    }
    .difficulties{
        display: flex;
        align-items: center;
        width: 90%;
        flex-wrap: wrap;
        gap: 10px;
        margin: 10px 0;
    }
    .difficulty{
        background-color: #fff;
        border-radius: 6px;
        padding: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 12px;
    }
    .diff{
        height: 12px;
        width: 12px;
        border-radius: 50%;
    }
    .diff_1{
        background-color: #00C852;
    }
    .diff_2{
        background-color: #3f94ea;
    }
    .diff_3{
        background-color: #EC3900;
    }
    .diff_4{
        background-color: #000;
    }
    .track-header{
        display: flex;
        gap: 15px;
        align-items: center;
    }
</style>