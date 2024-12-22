<template>
    <div class="pincode">
        <div class="keyboard">
            <span>Придумайте код доступа</span>
            <div :class="(errorPin) ? 'error point' : 'point'">
                <div class="point" v-for="value of values" :key="value">
                    <span :class="(value == null) ? 'bull' : ''">{{ value }}</span>
                </div>
            </div>
            <div class="keys">
                    <div class="pin__btn" @click="input(key)" v-for="key of keys" :key="key">
                        {{ key }}
                    </div>
                    <div class="pin__btn exit_btn" @click="exit()">
                        Выйти
                    </div>
                    <div class="pin__btn" @click="input(0)">
                        0
                    </div>
                    <div class="pin__btn">
                        <img src="@/assets/icons/main/back-space.svg" alt="" @click="backSpace()">
                    </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:"PinCode",
        data(){
            return {
                values : [null,null,null,null],
                keys : [1,2,3,4,5,6,7,8,9],
                errorPin: false,
                cursor : 0
            }
        },
        methods : {
            input(key){
                if(this.values.includes(null)){
                    this.cursor = this.values.indexOf(null)
                    this.values[this.values.indexOf(null)] = key;
                    if(this.cursor == 3){
                        this.Telegram.WebApp.CloudStorage.getItem("pin",(data,val)=>{
                            if(!val){
                                this.Telegram.WebApp.CloudStorage.setItem("pin",this.values.join(''))    
                                this.$store.state.pinAuthorized = true;
                            }
                            else{
                                if(val == this.values.join('')){
                                    this.$store.state.pinAuthorized = true;
                                }
                                else{
                                    this.errorPin = true;
                                    setTimeout(() => {
                                        this.errorPin = false;
                                    }, 500);
                                }
                            }
                        })
                        
                    }
                }
            },
            exit(){
                this.Telegram.WebApp.close();
            },
            backSpace(){
               if(this.cursor - 1 >= -1){
                this.values[this.cursor] = null;
               this.cursor -= 1;
               }
            }
        }
    }
</script>
<style scoped>
    .pincode{
        height: 100vh;
        position: fixed;
        z-index: 102;
        width: 100vw;
        top: 0;
        padding: 140px 50px;
        background-color: #fff;
    }
    .keyboard span{
        font-weight: 500;
        color: #1D1D1D;
    }
    .pin__btn{
        height: 80px;
        width: 80px;
        font-size: 1.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        color: #185AC5;
        transition: .3s linear 0s;
    }
    .error .point{
        color: red !important;
    }
    .pin__btn:active{
        background-color: #a2bdeaa3;
    }
    .exit_btn{
        font-size: 1rem;
    }
    .keyboard{
        display: flex;
        gap: 20px;
        flex-direction: column;
        align-items: center;
    }
    .point span{
        color: #185AC5;
    }
    .keys{
        display: flex;
        
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
    }

    .points{
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .bull{
        height: 8px;
        display: block;
        width: 8px;
        background-color: #808B9F;
        border-radius: 50%;
    }
</style>