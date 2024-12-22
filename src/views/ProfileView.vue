<script>
export default{
    name: "ProfileView",
    data(){
        return {
            avatar : null
        }
    },
    methods : {
        exit(){
            this.Telegram.WebApp.close()
        }
    },
    mounted(){
        this.avatar = this.Telegram.WebApp.initDataUnsafe.user.photo_url
    }
}
</script>

<template>
    <div class="profile">
        <div class="user">
            <img :src="avatar" alt="" class="avatar">
            <div class="info">
                <span class="userfist">{{  this.Telegram.WebApp.initDataUnsafe.user.first_name  }}</span>
                <span>{{ this.Telegram.WebApp.initDataUnsafe.user.username }}</span>
            </div>
        </div>
        <div class="actions">
            <div class="swipe"></div>
            <h2>Действия с вашим профилем</h2>
            <button>Привязать госуслуги</button>
            <button class="red_style" @click="exit()">Выйти</button>
        </div>
        
    </div>
</template>
<style scoped>

.profile{
    width: 100%;
    height: 100%;
    padding-top: 20px;
    gap: 10px;
}
.user{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
.swipe{
    height: 8px;
    width: 50px;
    border-radius: 10px;
    position: absolute;
    left: calc(50% - 25px);
    top: 15px;
    background-color: #ccc;
}
.userfist{
    font-weight: bold;
}
.info{
    display: flex;
    align-items: center;
    flex-direction: column
}
.avatar{
    height: 110px;
    width: 110px;
    border-radius: 50%;
}
.actions{
    background-color: #fef9f9;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    width: 100%;
    padding: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: calc(62% - 62px / 2);
    margin-top: 100px;
}
h2{
    font-size: 1.1rem;
    font-weight: 500;
}
button{
    background-color: hsl(218, 91%, 58%);
    padding: 10px;
    border-radius: 10px;
    color: #fff;
}
.red_style{
    background-color: red;
}

</style>