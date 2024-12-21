<template>
    <div class="map">
        <div class="map_sensor" @touchstart="touchStart" @touchmove="touchEnd">

        </div>
        <div class="map_layers" :style="`width: calc(170% * ${zoom }); transform: translateX(${currentMapX / zoom}px) translateY(${currentMapY / zoom}px)`">
            <img src="@/assets/map/map.png" alt="">
        </div>
        <div class="map_controls">
            <div class="zoom">
                <div class="control" @click="zoomPlus">+</div>
                <div class="sepr"></div>
                <div class="control" @click="zoomMinus">-</div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name : "MapComp",
    data(){
        return {
            zoom : 1,
            x : 1,
            y : 1,
            currentMapX : 0,
            currentMapY : 0,
        }
    },
    methods : {
        zoomPlus(){
            if(this.zoom+0.5 <= 3) this.zoom += 0.5
        },
        zoomMinus(){
            if(this.zoom-0.5 >= 1) this.zoom -= 0.5
        },
        touchStart(ev){
            this.x = ev.changedTouches[0].clientX;
            this.y = ev.changedTouches[0].clientY;
        },
        touchEnd(ev){
            console.log(ev.changedTouches[0].clientX - this.x);
            if(this.currentMapX + ev.changedTouches[0].clientX - this.x > -240 && this.currentMapX + ev.changedTouches[0].clientX - this.x < 0){
                this.currentMapX = this.currentMapX + ev.changedTouches[0].clientX - this.x
            }
            if(this.currentMapY + ev.changedTouches[0].clientY - this.x < -240 && this.currentMapY + ev.changedTouches[0].clientY - this.y > 0){
                this.currentMapY = this.currentMapY + ev.changedTouches[0].clientY - this.y
            }
           
            
        }
    }
}
</script>
<style scoped>
.map_controls{
    position: absolute;
    right: 10px;
    z-index: 3;
    bottom: 10px;
}
.zoom{
    width: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border-radius: 2px;
}
.sepr{
    height: 1px;
    width: 100%;
    background-color: #e8e8e8;
}
 .map{
        height: 300px;
        width: 90%;
        display: block;
        border-radius: 12px;
        position: relative;
        overflow: hidden;
        background-color: #c9c9c9;
        
    }
    .map_sensor{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2;
        touch-action: none;
    }
    .map_layers{
        transform: translate(0px);
        transform-origin: center center;
        height: 100%;
    }
</style>