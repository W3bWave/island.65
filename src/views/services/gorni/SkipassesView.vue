<script>
    export default {
        name: "SkipassesView",
        data(){
            return {
                passes : []
            }
        },
        methods: {
            async getPasses(){
                let json = await (await fetch("https://welcome.netcloud.dev/api/v1/gv/tarifs")).json()
                console.log(json.skipass)
                this.passes = json.skipass
            }
        },
        mounted(){
            this.getPasses()
            console.log(this.passes)
        }
    }
</script>

<template>
    <div class="container-1">
        <section id="main-cards">
            <div class="name-sect">
                <h2 class="name-sect-title">Ваши карты ски-пасс</h2>
            </div>
            <div class="container">
                <router-link to="/services/gorni/skipasses" class="ski">
                    <div class="icon">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.9839 8.88631L19.9534 12.018C19.1715 12.826 17.88 12.8392 17.0818 12.0474L16.6556 11.6247L14 14.5233V21.5858L20.2929 15.2929C20.4916 15.0942 20.7646 14.9883 21.0453 15.001C21.326 15.0138 21.5884 15.144 21.7682 15.3598L26.0672 20.5186L27.2929 19.2929C27.6652 18.9206 28.2623 18.9007 28.6585 19.2474L34 23.9212V17.5983L31.2477 14.6001L31.2003 14.6432C30.3897 15.3803 29.139 15.3361 28.3826 14.5434L22.9839 8.88631ZM20.7673 5.42488C21.9879 4.16349 24.0127 4.17053 25.2246 5.44038L30.0478 10.4945C31.2284 9.96847 32.661 10.2246 33.5826 11.2286L36.9467 14.8933C37.6241 15.6312 38 16.5965 38 17.5983V35.759C38 38.165 36.6039 40.3525 34.4217 41.3658L26.4503 45.0672C24.8965 45.7887 23.1035 45.7887 21.5497 45.0672L13.5783 41.3658C11.3961 40.3525 10 38.165 10 35.759V14.5233C10 13.5229 10.3749 12.5588 11.0507 11.8211L14.3453 8.22508C15.4253 7.04624 17.201 6.90111 18.4507 7.81886L20.7673 5.42488Z" fill="white"/>
                        </svg>                        
                    </div>
                    <h3 class="number">1234567891011121</h3>
                    <span>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7044 14.0601C15.315 13.6699 15.3149 13.0382 15.7041 12.6479L15.9745 12.3766C16.3651 11.9848 16.9996 11.9846 17.3905 12.3762L24.2949 19.2935C24.6845 19.6839 24.6845 20.316 24.2949 20.7064L17.3905 27.6238C16.9996 28.0153 16.3651 28.0151 15.9745 27.6233L15.7041 27.3521C15.3149 26.9617 15.315 26.33 15.7044 25.9398L21.6302 20L15.7044 14.0601Z" fill="white"/>
                        </svg>
                    </span>
                </router-link>
            </div>
        </section>

        <section id="add">
            <div class="name-sect">
                <h2 class="name-sect-title">Добавить карту ски-пасс</h2>
            </div>
            <div class="container">
                <div class="form">
                    <span>Можно использовать карту МИР как ски-пасс</span>
                    <input type="text" placeholder="Номер ски-пасса">
                    <button>Добавить</button>
                </div>
            </div>
        </section>

        <section id="skipasses">
            <span class="k"></span>
            <div class="name-sect">
                <h2 class="name-sect-title">Тарифы для ски-пасс</h2>
            </div>
            <div class="passes">
                <div class="pass" v-for="pass of passes" :key="pass">
                    <p class="name">
                        <span>{{ pass.name }}</span>
                        <span>{{ pass.price_by_card.split("₽")[0] }}</span>
                    </p>
                    <p class="descript">{{ pass.name }}</p>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.container-1 {
    width: 100%;
    background-color: #fff;
    padding: 1.5rem 1rem;
    display: flex;
    gap: 1.2rem;
    flex-direction: column;
    align-items: start;
  }
section {
    width: 100%;
    display: flex;
    gap: 1.1rem;
    flex-direction: column;
    justify-content: center;

    &:last-child{
        margin-bottom: 0.5em
    }

    .name-sect {
        padding-left: .75rem;
        font-size: 1.5rem;
        font-weight: 600;
    }
}

#main-cards {
    .container {
        width: 100%;
        display: flex;
        justify-content: center;

        .ski {
            width: 100%;
            padding: 1.5rem;
            font-size: 1.3rem;
            background: linear-gradient(102.68deg, #001ABB 12.24%, #4E67FF 97.02%);
            box-shadow: 0px 4px 8px rgba(12, 41, 117, 0.12);
            border-radius: .75rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            box-sizing: border-box;
            align-items: center;
            color: #FFF
        }
    }
}

#add {
    .container {
        width: 100%;

        .form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: start;
            padding: 1.5rem;
            gap: .75rem;
            background: #FFFFFF;
            box-shadow: 0px 4px 8px rgba(12, 41, 117, 0.12);
            border-radius: 12px;

            input {
                width: 100%;
                background: #EDF2FE;
                outline: none;
                border: none;
                border-radius: .75rem;
                padding: 1rem;
                font-size: 1.25rem
            }

            button {
                width: 100%;
                color: #fff;
                border-radius: 12px;
                outline: none;
                border: none;
                background-color: #185AC5;
                font-size: 1.25rem;
                padding: 1.25rem;
                font-weight: 300;
            }
        }
    }
  }
#skipasses{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .k{
        width: 15%;
        height: 5px;
        border-radius: 2.5px;
        background-color: rgba(128, 128, 128, 0.567);
    }
    .name-sect{
        padding-left: 0;
        text-align: center;
    }

    .passes{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: top;
        justify-content: center;
    
        .pass{
            min-height: 110px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-bottom: 1px solid rgba(128, 128, 128, 0.567);
            padding: 1.25em;

            .name{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                font-size: 1.25rem;
                font-weight: 600;

                > :first-child{
                    width:80%
                }
                > :last-child{
                    text-align: right
                }
            }
        }
    }
}

</style>