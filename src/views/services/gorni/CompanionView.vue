<template>
    <div class="hello">
        <p class="hello-p" v-if="user">Привет, {{ user.user.first_name }}! Рады приветствовать Вас в нашем новом сервисе "Поиск попутчика", чтобы найти попутчика выберите заявки из списка или разместите свою</p>
        <div class="notify">
          
        </div>
        <button @click="findCompanion()" v-if="!finding">Разместить поиск</button>
        <button @click="stop()" v-if="finding">Остановить поиск</button>
        <div class="cards">
            <div class="card yellow" v-if="finding">
          <img :src="user.user.photo_url" alt="">
          <span>{{ user.user.first_name }}</span>
        </div>
        <div class="card green" v-if="wanter">
          <div class="header">
            <img :src="wanter.photo_url" alt="">
            <span>{{ wanter.first_name }}</span>  
          </div>
          <p>Хочет с вами посетить горный воздух, отклоните или примите его предложение, после принятия вы будете перенаправлены в личные сообщения</p>
          <div class="buttons">
            <button @click="declineOffer()" class="red">Оклонить</button>
            <button @click="acceptOffer()" class="green-btn">Принять</button>
          </div>
        </div>
        <div class="card"  v-for="companion of companions" :key="companion">
          <img :src="companion.photo_url" alt="">
          <span>{{ companion.first_name }}</span>
          <button :ref="`btn_${companion.id}`" @click="offer(companion)">Предложить</button>
        </div>
        </div>
        
        
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  
  export default {
  
    name: 'CompanionView',
    data(){
      return {
        inited : false,
        granted: false,
        available : false,
        map : null,
        data : "",
        user : null,
        finding: false,
        wanter : false,
        companions : [],
      }
    },
    methods : {
      open(){
        this.Telegram.WebApp.MainButton.show();
      },
      async stop(){
        let oreq = await axios.post("https://welcome.netcloud.dev/api/v1/gv/companion/stop",{
          user : this.user.user
        });
  
        if(oreq.data.ok){
          this.finding = false;
        }
      },
      declineOffer(){
        this.wanter = false;
      },
      async acceptOffer(){
        this.wanter = false;
        this.Telegram.WebApp.openTelegramLink(`https://t.me/${this.wanter.username}`);
        let oreq = await axios.post("https://welcome.netcloud.dev/api/v1/gv/companion/stop",{
          user : this.user.user
        });
  
        if(oreq.data.ok){
          this.finding = false;
        }
      },
      async findCompanion(){
        let oreq = await axios.post("https://welcome.netcloud.dev/api/v1/gv/companion/start",{
          user : this.user.user
        });
        if(oreq.data.ok){
          this.finding = true;
        }
        
      },
      async offer(companion){
        await axios.post("https://welcome.netcloud.dev/api/v1/gv/companion/offer",{
          to : companion,
          from : this.user
        });
  
        this.$refs[`btn_${companion.id}`][0].classList.add('pending')
  
        
      }
    },
    async mounted(){
        this.user = this.Telegram.WebApp.initDataUnsafe;
        let socket = new WebSocket("wss://welcome.netcloud.dev/websocket");
        socket.onopen= ()=>{
          socket.send(JSON.stringify({
            "action" : "REGISTER_SESSION",
            "user" : this.user.user
          }))
        }
        socket.onmessage = (message)=>{
          let json = JSON.parse(message.data);
          console.log(json);
          
          if(json.action == "STARTED_COMPANION_WAIT"){
            this.companions.push(json.userData);
          }
          if(json.action == "STOPED_COMPANION_WAIT"){
            let user = json.userData.id;
            console.log(user);
            
            for(let i in this.companions){
              if(this.companions[i].id == user.id){
                this.companions.splice(i,1);
              }
            }
          }
          if(json.action == "COMPANION_OFFER_FOR_YOU"){
              let offerFrom = json.from.id.user;
              this.wanter = offerFrom;
             
          }
          
        }
        let json =  await (await fetch("https://welcome.netcloud.dev/api/v1/gv/companion/get")).json();
        this.companions = json;
  
        for(let companion of json){
          if(companion.id == this.user.user.id){
            console.log(json.indexOf(companion));
            this.companions.splice(json.indexOf(companion),1)
            
            this.finding = true;
          }
        }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style>
    button{
      background-color: #3ac3ea;
      color: #000;
      border-radius: 5px;
      border: none;
      padding: 10px; 
      font-family: Arial;
    }
    .buttons{
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }
    .red{
        background-color: rgb(245, 77, 77);
    }
    .green-btn{
        background-color: rgb(49, 223, 87);
    }
    .buttons button{
        flex: 1;
    }
    .hello{
        width: 90%;
    }
    .hello-p{
        color: #111;
        margin-top: 10px;
    }
    span{
      color: #fff;
    }
    .yellow{
      background-color: rgb(247, 182, 51) !important;
    }
    .cards{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .card{
      background-color: #fff;
      padding: 10px;
      border-radius: 10px;
      display: flex;
      gap: 10px;
      align-items: center;
      font-family: Arial, Helvetica, sans-serif;
      
    }
    .pending{
      display: none;
    }
    .green{
      background-color: rgb(247, 249, 255);
      flex-direction: column;
      
      align-items: normal;
    }
    .green p{
        color: #111;
    }
    .green .header{
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .card span{
      color: #111;
    }
    .card img{
      border-radius: 50%;
      height: 60px;
      width: 60px;
    }
    .hello{
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    body{
      background-color: #000;
    }
    p{
      color: #fff;
    }
  </style>
  