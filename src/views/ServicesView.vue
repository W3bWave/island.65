<template>
  <div class="flex flex-col" v-if="$route.path == '/services'">
    <img class="bright" src="@/assets/icons/cards/finances.svg" alt="">
    <div class="new-service-block">
      <div class="block-header">
        <img height="24" width="24" src="@/assets/icons/services/tourism.svg" alt="">
        <span>Туризм, досуг, отдых</span>
      </div>
      <div class="block-cards">
        <div class="card bright" style="filter: brightness(0.3)">
          <div class="card-icon"><img src="@/assets/icons/services/tourism_white.svg" alt=""></div>
          <span class="card-name">GoSakhalin</span>
        </div>
        <div class="card new" @click="$router.push('/services/gorni')">
          <div class="card-icon"><img src="@/assets/icons/services/mountain_air.svg" alt=""></div>
          <span class="card-name">Горный воздух</span>
        </div>
        <div class="card new" @click="$router.push('/services/pfdo')">
          <div class="card-icon"><img src="@/assets/icons/services/cult_island.svg" alt=""></div>
          <span class="card-name">Секции и кружки</span>
        </div>
      </div>
    </div>
    <img class="bright" src="@/assets/icons/cards/help.svg" alt="">
    <img class="bright" src="@/assets/icons/cards/medicine.svg" alt="">
    <img class="bright" src="@/assets/icons/cards/info.svg" alt="">
    <img class="bright" src="@/assets/icons/cards/all.svg" alt="">
  </div>
  <router-view v-else></router-view>
</template>
<style scoped>
.bright{
  filter: brightness(0.75)
}

.new-service-block{
  background-color: #fff;
  box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.1);
  border-radius: 12px;
  min-height: 134px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
}
.block-header img{
  height: 24px;
  width: 24px;
}
.block-header{
  display: flex;
  align-items: center;
  gap: 12px;
}
.block-cards{
  display: flex;
  justify-content: space-between;
}
.card{
  background: linear-gradient(102.68deg, #001ABB 12.24%, #4E67FF 97.02%);
  border-radius: 12px;
  opacity: 0.8;
  width: 104px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  padding-left: 10px;
  height: 72px;
}
.card-icon img{
  height: 24px;
  width: 24px;
}
.new{
  background: linear-gradient(102.68deg, #bb5400 12.24%, #ffa44e 97.02%);
}
.block-header span{
  font-size: 17px;
  color: #0066B3;
  font-weight: 500;
}
.card-name{
  font-size: 12px;
  color: #fff;
  line-height: 12px;
}
img{
  width: 100%;
}
</style>
