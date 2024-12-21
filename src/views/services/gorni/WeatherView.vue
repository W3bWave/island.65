<template>
    <div class="weather">
        <div class="weather-card">
            <div class="icon"><img  :src="`https://yastatic.net/weather/i/icons/funky/dark/${renderData.icon}.svg`" alt=""></div>
            <span class="clouds">{{vocabulary[renderData.condition]}}</span>
            <span class="temp">{{renderData.temp }}</span>
            <span class="wind">Ветер {{renderData.wind_speed}}м/с, {{ renderData.wind_dir }}</span>
            <div class="stats">
                <div class="stat">
                    <span>Восход</span>
                    <span>{{ renderData.sunrise }}</span>
                </div>
                <div class="stat">
                    <span>Заход</span>
                    <span>{{ renderData.sunset }}</span>
                </div>
                <div class="stat">
                    <span>Влажность</span>
                    <span>{{ renderData.humidity }}</span>
                </div>
                <div class="stat">
                    <span>Давление</span>
                    <span>{{ renderData.pressure_mm }} мм</span>
                </div>
            </div>
            <div class="swap">
                <div :class="`swap_toggle ${(current_time == 'now') ? 'active' : ''}`" @click="setWeatherTime('now')">
                    <div class="swap-icon">
                        <img :src="`https://yastatic.net/weather/i/icons/funky/dark/${serverData.fact.icon}.svg`" alt="">
                    </div>
                    <span>Сейчас</span>
                    <span>{{ serverData.fact.temp }}</span>
                </div>
                
                <div :class="`swap_toggle ${(current_time == 'day') ? 'active' : ''}`" @click="setWeatherTime('day')">
                    <div class="swap-icon">
                        <img :src="`https://yastatic.net/weather/i/icons/funky/dark/${serverData.forecasts[0].parts.day.icon}.svg`" alt="">
                    </div>
                    <span>День</span>
                    <span>{{serverData.forecasts[0].parts.day.temp_avg}}</span>
                </div>
                <div :class="`swap_toggle ${(current_time == 'evening') ? 'active' : ''}`" @click="setWeatherTime('evening')">
                    <div class="swap-icon">
                        <img :src="`https://yastatic.net/weather/i/icons/funky/dark/${serverData.forecasts[0].parts.evening.icon}.svg`" alt="">
                    </div>
                    <span>Вечер</span>
                    <span>{{serverData.forecasts[0].parts.evening.temp_avg}}</span>
                </div>
                
                
            </div>  
        </div>
    </div>
</template>
<script>
    export default {
        name : "WeatherView",
        data(){
            return {
                vocabulary : {
                    "clear" : "Ясно",
                    "partly-cloudy" : "Малооблачно",
                    "cloudy" : "Облачно",
                    "signficant" : "Шторм",
                    "partly" : "Местами облачно",
                    "overcast" : "Пасмурно"
                },
                current_time : "now",
                renderData : {
                    temp : "???",
                    sunset : '???',
                    wind_dir : "???",
                    wind_speed  :"???",
                    humidity : "???",
                    pressure_mm : "???",
                    sunrise : "???",
                    icon : "???",
                    condition : "???",
                },
                serverData : {"now":1734738639,"now_dt":"2024-12-20T23:50:39.581716Z","info":{"n":true,"url":"https://yandex.ru/pogoda/?lat=46.95417072&lon=142.7798228","lat":46.95417072340388,"lon":142.77982276089583,"tzinfo":{"name":"Asia/Sakhalin","abbr":"+11","dst":false,"offset":39600},"def_pressure_mm":745,"def_pressure_pa":993,"zoom":10,"nr":true,"ns":true,"nsr":true,"p":false,"f":true,"_h":false},"fact":{"daytime":"d","obs_time":1734738639,"season":"winter","source":"station","uptime":1734738639,"cloudness":0,"condition":"clear","feels_like":-18,"humidity":77,"icon":"skc_d","is_thunder":false,"polar":false,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":749,"pressure_pa":998,"temp":-14,"uv_index":0,"wind_angle":356,"wind_dir":"c","wind_gust":0.9,"wind_speed":0},"forecasts":[{"date":"2024-12-21","date_ts":1734699600,"week":51,"sunrise":"09:12","sunset":"17:42","rise_begin":"08:37","set_end":"18:17","moon_code":3,"moon_text":"moon-code-3","parts":{"day":{"daytime":"d","_source":"12,13,14,15,16,17","biomet":{"index":0,"condition":"magnetic-field_0"},"cloudness":0.5,"condition":"cloudy","fresh_snow_mm":0,"humidity":59,"icon":"bkn_d","polar":false,"prec_mm":0,"prec_period":360,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":747,"pressure_pa":995,"temp_avg":-8,"temp_max":-7,"temp_min":-10,"feels_like":-12,"uv_index":1,"wind_angle":315,"wind_dir":"nw","wind_gust":3.2,"wind_speed":1.5},"day_short":{"daytime":"d","_source":"6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21","biomet":{"index":0,"condition":"magnetic-field_0"},"cloudness":0.5,"condition":"cloudy","fresh_snow_mm":0,"humidity":69,"icon":"bkn_d","polar":false,"prec_mm":0,"prec_period":960,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":747,"pressure_pa":995,"temp":-7,"temp_min":-17,"feels_like":-16,"uv_index":1,"wind_angle":315,"wind_dir":"nw","wind_gust":3.2,"wind_speed":1.5},"evening":{"daytime":"n","_source":"18,19,20,21","biomet":{"index":0,"condition":"magnetic-field_0"},"cloudness":0.75,"condition":"cloudy","fresh_snow_mm":0,"humidity":68,"icon":"bkn_n","polar":false,"prec_mm":0,"prec_period":240,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":745,"pressure_pa":993,"temp_avg":-12,"temp_max":-10,"temp_min":-12,"feels_like":-16,"uv_index":0,"wind_angle":45,"wind_dir":"ne","wind_gust":2.3,"wind_speed":1},"morning":{"daytime":"n","_source":"6,7,8,9,10,11","biomet":{"index":0,"condition":"magnetic-field_0"},"cloudness":0.25,"condition":"partly-cloudy","fresh_snow_mm":0,"humidity":78,"icon":"skc_n","polar":false,"prec_mm":0,"prec_period":360,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":748,"pressure_pa":997,"temp_avg":-16,"temp_max":-14,"temp_min":-17,"feels_like":-20,"uv_index":0,"wind_angle":315,"wind_dir":"nw","wind_gust":0.9,"wind_speed":0.7},"night":{"daytime":"n","_source":"23,0,1,2,3,4,5","biomet":{"index":0,"condition":"magnetic-field_0"},"cloudness":0.75,"condition":"cloudy","fresh_snow_mm":0,"humidity":75,"icon":"bkn_n","polar":false,"prec_mm":0,"prec_period":540,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":748,"pressure_pa":997,"temp_avg":-15,"temp_max":-14,"temp_min":-16,"feels_like":-20,"uv_index":0,"wind_angle":315,"wind_dir":"nw","wind_gust":4.1,"wind_speed":2.4},"night_short":{"daytime":"n","_source":"23,0,1,2,3,4,5","biomet":{"index":0,"condition":"magnetic-field_0"},"cloudness":0.75,"condition":"cloudy","fresh_snow_mm":0,"humidity":75,"icon":"bkn_n","polar":false,"prec_mm":0,"prec_period":540,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":748,"pressure_pa":997,"temp":-16,"feels_like":-20,"uv_index":0,"wind_angle":315,"wind_dir":"nw","wind_gust":4.1,"wind_speed":2.4}},"hours":[{"hour":"0","hour_ts":1734699600,"cloudness":1,"condition":"overcast","feels_like":-20,"humidity":72,"icon":"ovc","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":748,"pressure_pa":997,"temp":-15,"uv_index":0,"wind_angle":312,"wind_dir":"nw","wind_gust":4.1,"wind_speed":2.4},{"hour":"1","hour_ts":1734703200,"cloudness":1,"condition":"overcast","feels_like":-19,"humidity":73,"icon":"ovc","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":748,"pressure_pa":997,"temp":-14,"uv_index":0,"wind_angle":320,"wind_dir":"nw","wind_gust":3.8,"wind_speed":2.1},{"hour":"2","hour_ts":1734706800,"cloudness":0.75,"condition":"cloudy","feels_like":-18,"humidity":74,"icon":"bkn_n","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":749,"pressure_pa":998,"temp":-14,"uv_index":0,"wind_angle":323,"wind_dir":"nw","wind_gust":1.9,"wind_speed":0.9},{"hour":"3","hour_ts":1734710400,"cloudness":0.75,"condition":"cloudy","feels_like":-19,"humidity":76,"icon":"bkn_n","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":748,"pressure_pa":997,"temp":-15,"uv_index":0,"wind_angle":309,"wind_dir":"nw","wind_gust":1.6,"wind_speed":0.9},{"hour":"4","hour_ts":1734714000,"cloudness":0.75,"condition":"cloudy","feels_like":-19,"humidity":77,"icon":"bkn_n","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":748,"pressure_pa":997,"temp":-15,"uv_index":0,"wind_angle":354,"wind_dir":"n","wind_gust":1.1,"wind_speed":0.8},{"hour":"5","hour_ts":1734717600,"cloudness":0.25,"condition":"partly-cloudy","feels_like":-20,"humidity":77,"icon":"skc_n","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":749,"pressure_pa":998,"temp":-16,"uv_index":0,"wind_angle":319,"wind_dir":"c","wind_gust":0.3,"wind_speed":0.2},{"hour":"6","hour_ts":1734721200,"cloudness":0.25,"condition":"partly-cloudy","feels_like":-20,"humidity":77,"icon":"skc_n","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":748,"pressure_pa":997,"temp":-16,"uv_index":0,"wind_angle":328,"wind_dir":"nw","wind_gust":0.9,"wind_speed":0.7},{"hour":"7","hour_ts":1734724800,"cloudness":0.25,"condition":"partly-cloudy","feels_like":-21,"humidity":79,"icon":"skc_n","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":748,"pressure_pa":997,"temp":-17,"uv_index":0,"wind_angle":335,"wind_dir":"nw","wind_gust":0.8,"wind_speed":0.5},{"hour":"8","hour_ts":1734728400,"cloudness":0.5,"condition":"cloudy","feels_like":-20,"humidity":78,"icon":"bkn_n","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":749,"pressure_pa":998,"temp":-16,"uv_index":0,"wind_angle":347,"wind_dir":"c","wind_gust":0.4,"wind_speed":0},{"hour":"9","hour_ts":1734732000,"cloudness":0,"condition":"clear","feels_like":-20,"humidity":79,"icon":"skc_n","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":748,"pressure_pa":997,"temp":-16,"uv_index":0,"wind_angle":354,"wind_dir":"n","wind_gust":0.8,"wind_speed":0.4},{"hour":"10","hour_ts":1734735600,"cloudness":0,"condition":"clear","feels_like":-20,"humidity":78,"icon":"skc_d","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":748,"pressure_pa":997,"temp":-16,"uv_index":0,"wind_angle":356,"wind_dir":"n","wind_gust":0.9,"wind_speed":0.3},{"hour":"11","hour_ts":1734739200,"cloudness":0,"condition":"clear","feels_like":-17,"humidity":77,"icon":"skc_d","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":749,"pressure_pa":998,"temp":-14,"uv_index":0,"wind_angle":344,"wind_dir":"c","wind_gust":0.5,"wind_speed":0},{"hour":"12","hour_ts":1734742800,"cloudness":0,"condition":"clear","feels_like":-14,"humidity":70,"icon":"skc_d","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":748,"pressure_pa":997,"temp":-10,"uv_index":1,"wind_angle":323,"wind_dir":"nw","wind_gust":1.3,"wind_speed":0.8},{"hour":"13","hour_ts":1734746400,"cloudness":0.5,"condition":"cloudy","feels_like":-13,"humidity":63,"icon":"bkn_d","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":747,"pressure_pa":995,"temp":-9,"uv_index":1,"wind_angle":322,"wind_dir":"nw","wind_gust":1.2,"wind_speed":0.8},{"hour":"14","hour_ts":1734750000,"cloudness":0.75,"condition":"cloudy","feels_like":-12,"humidity":57,"icon":"bkn_d","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":747,"pressure_pa":995,"temp":-8,"uv_index":1,"wind_angle":318,"wind_dir":"nw","wind_gust":1.5,"wind_speed":1},{"hour":"15","hour_ts":1734753600,"cloudness":0.5,"condition":"cloudy","feels_like":-11,"humidity":56,"icon":"bkn_d","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":746,"pressure_pa":994,"temp":-7,"uv_index":1,"wind_angle":326,"wind_dir":"nw","wind_gust":2.9,"wind_speed":1.5},{"hour":"16","hour_ts":1734757200,"cloudness":0.25,"condition":"partly-cloudy","feels_like":-11,"humidity":54,"icon":"skc_d","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":746,"pressure_pa":994,"temp":-7,"uv_index":0,"wind_angle":347,"wind_dir":"n","wind_gust":3.2,"wind_speed":1.5},{"hour":"17","hour_ts":1734760800,"cloudness":0.25,"condition":"partly-cloudy","feels_like":-11,"humidity":55,"icon":"skc_d","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":746,"pressure_pa":994,"temp":-7,"uv_index":0,"wind_angle":9,"wind_dir":"n","wind_gust":2.4,"wind_speed":0.9},{"hour":"18","hour_ts":1734764400,"cloudness":0.5,"condition":"cloudy","feels_like":-14,"humidity":61,"icon":"bkn_n","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":745,"pressure_pa":993,"temp":-10,"uv_index":0,"wind_angle":31,"wind_dir":"ne","wind_gust":1.9,"wind_speed":1},{"hour":"19","hour_ts":1734768000,"cloudness":0.75,"condition":"cloudy","feels_like":-16,"humidity":67,"icon":"bkn_n","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":745,"pressure_pa":993,"temp":-12,"uv_index":0,"wind_angle":17,"wind_dir":"n","wind_gust":2,"wind_speed":0.7},{"hour":"20","hour_ts":1734771600,"cloudness":0.75,"condition":"cloudy","feels_like":-16,"humidity":71,"icon":"bkn_n","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":745,"pressure_pa":993,"temp":-12,"uv_index":0,"wind_angle":43,"wind_dir":"ne","wind_gust":1.6,"wind_speed":0.5},{"hour":"21","hour_ts":1734775200,"cloudness":1,"condition":"overcast","feels_like":-16,"humidity":74,"icon":"ovc","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":744,"pressure_pa":991,"temp":-12,"uv_index":0,"wind_angle":14,"wind_dir":"n","wind_gust":2.3,"wind_speed":1},{"hour":"22","hour_ts":1734778800,"cloudness":0.75,"condition":"cloudy","feels_like":-16,"humidity":73,"icon":"bkn_n","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":744,"pressure_pa":991,"temp":-12,"uv_index":0,"wind_angle":344,"wind_dir":"n","wind_gust":3,"wind_speed":1.1},{"hour":"23","hour_ts":1734782400,"cloudness":0.5,"condition":"cloudy","feels_like":-15,"humidity":78,"icon":"bkn_n","prec_mm":0,"prec_period":60,"prec_prob":0,"prec_strength":0,"prec_type":0,"pressure_mm":745,"pressure_pa":993,"temp":-11,"uv_index":0,"wind_angle":356,"wind_dir":"n","wind_gust":3.7,"wind_speed":1.3}],"biomet":{"index":0,"condition":"magnetic-field_0"}}]}
            }
        },
        methods : {
            setWeatherTime(time){
                console.log(time);
                
                let main = this.serverData.forecasts[0]
                let temp = this.serverData.fact.temp
                let wind_dir = this.serverData.fact.wind_dir
                let wind_speed = this.serverData.fact.wind_speed
                let icon = this.serverData.fact.icon
                let condition = this.serverData.fact.condition;
                let humidity = this.serverData.fact.humidity;
                let pressure_mm = this.serverData.fact.pressure_mm
                if(time != "now"){
                    main = this.serverData.forecasts[0].parts[time]
                    temp = this.serverData.forecasts[0].parts[time].temp_avg
                    wind_dir = this.serverData.forecasts[0].parts[time].wind_dir
                    wind_speed = this.serverData.forecasts[0].parts[time].wind_speed;
                    icon = this.serverData.forecasts[0].parts[time].icon;
                    condition = this.serverData.forecasts[0].parts[time].condition;
                    humidity = this.serverData.forecasts[0].parts[time].humidity;
                    pressure_mm = this.serverData.forecasts[0].parts[time].pressure_mm;
                }
                this.current_time = time
                this.renderData.temp = temp;
                this.renderData.condition = main.condition;
                this.renderData.icon = icon;
                this.renderData.wind_dir = wind_dir;
                this.renderData.wind_speed = wind_speed;
                this.renderData.condition = condition;
                this.renderData.sunrise = this.serverData.forecasts[0].sunrise;
                this.renderData.sunset = this.serverData.forecasts[0].sunset;
                this.renderData.humidity = humidity;
                this.renderData.pressure_mm = pressure_mm;
            }   
        },
        async mounted(){

            let json = await (await fetch("https://welcome.netcloud.dev/api/v1/gv/weather/")).json()
            this.serverData = json

            this.setWeatherTime('now');
        }
    }
</script>
<style scoped>
    .weather-card{
        width: 100%;
        height: 100%;
        padding: 20px;
        background: linear-gradient(96.88deg, #0066B3 21.5%, #4BB6E4 107.53%);
        
        display: flex;
        color: #fff;
        flex-direction: column;
    }
    .active{
        background-color: #ffffff !important;
    }
    .icon img{
        height: 128px;
    }
    .icon{
        position: absolute;
        right: 40px;
        top: 40px;
    }
    .clouds{
        font-size: 15px;
    }
    .temp{
        font-size: 6em;
    }
    .swap{
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
    }
    .swap_toggle{
        display: flex;
        flex-direction: column;
        padding: 20px;
        height: 140px;
        border-radius: 10px;
        background-color: #e8e8e8;
        color: #111;
        align-items: center;
    }
    .swap_toggle img{
        height: 64px;
    }
    .stats{
        display: flex;
        margin-top: 30px;
        justify-content: space-between;
    }
    .stat{
        display: flex;
        flex-direction: column;
    }
    .weather{
        width: 100%;
        height: 100%;
    }
</style>