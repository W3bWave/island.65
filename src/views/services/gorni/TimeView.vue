<template>
    <div class="container">
        <div class="card">
            <h2>Канатная дорога "Запад низ" и "Запад верх"</h2>
            <p class="time-work">Время работы:</p>
            <p class="work work-time">
                <span class="icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_38_963)">
                        <path d="M9.99984 18.3333C14.6022 18.3333 18.3332 14.6024 18.3332 9.99999C18.3332 5.39762 14.6022 1.66666 9.99984 1.66666C5.39746 1.66666 1.6665 5.39762 1.6665 9.99999C1.6665 14.6024 5.39746 18.3333 9.99984 18.3333Z" stroke="#0066B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 5V10L13.3333 11.6667" stroke="#0066B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_38_963">
                        <rect width="20" height="20" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </span>
                 Сегодня до 21:
                00</p>
            <p class="timing">
                <span>Пн-Чт:</span>
                <span>с 16:00 до 21:00</span>
            </p>
            <p class="timing">
                <span>Пт:</span>
                <span>с 16:00 до 22:00</span>
            </p>
            <p class="timing">
                <span>Сб:</span>
                <span>с 16:00 до 22:00</span>
            </p>
            <p class="timing">
                <span>Вс:</span>
                <span>с 16:00 до 21:00</span>
            </p>
        </div>
        <div class="card">
            <h2>Канатная дорога "Юг"</h2>
            <p class="time-work">Время работы:</p>
            <p class="not_work work-time">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_38_337)">
                    <path d="M9.99984 18.3333C14.6022 18.3333 18.3332 14.6024 18.3332 10C18.3332 5.39762 14.6022 1.66666 9.99984 1.66666C5.39746 1.66666 1.6665 5.39762 1.6665 10C1.6665 14.6024 5.39746 18.3333 9.99984 18.3333Z" stroke="#FF3B30" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 5V10L13.3333 11.6667" stroke="#FF3B30" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_38_337">
                    <rect width="20" height="20" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
                 Сегодня не работает
            </p>
            <p class="timing">
                <span>Пн-Чт:</span>
                <span>с 11:30 до 19:00</span>
            </p>
            <p class="timing">
                <span>Пт:</span>
                <span>с 11:30 до 19:00</span>
            </p>
        </div>
        <div class="card">
            <h2>Канатная дорога "Красная-север"</h2>
            <p class="time-work">Время работы:</p>
            <p class="not_work work-time">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_38_337)">
                    <path d="M9.99984 18.3333C14.6022 18.3333 18.3332 14.6024 18.3332 10C18.3332 5.39762 14.6022 1.66666 9.99984 1.66666C5.39746 1.66666 1.6665 5.39762 1.6665 10C1.6665 14.6024 5.39746 18.3333 9.99984 18.3333Z" stroke="#FF3B30" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 5V10L13.3333 11.6667" stroke="#FF3B30" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_38_337">
                    <rect width="20" height="20" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
                 Сегодня не работает
            </p>
            <p class="timing">
                <span>Пн-Чт:</span>
                <span>с 12:00 до 18:00</span>
            </p>
            <p class="timing">
                <span>Пт:</span>
                <span>с 12:00 до 18:00</span>
            </p>
        </div>
    </div>
</template>

<style scoped>
    .container{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: start;
        padding: 1.5rem 1rem;
        gap: 1.5rem;

        .card{
            width: 100%;
            background-color: #fff;
            border-radius: 1rem;
            padding: 1rem 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: 1rem;

            &:last-child{
                margin-bottom: 1rem
            }

            .time-work{
                font-weight: 700;
                font-size: 1.2rem;
            }

            .work-time{
                display: flex;
                flex-direction: row;
                justify-content: center;
                gap: .75rem;
                font-size: 1.15rem;
                font-weight: 400;

                &.work{
                    color: #0066B3 
                }

                &.not_work{
                    color: #FF3B30
                }
            }

            .timing{
                width: 100%;
                display: inline-flex;
                align-items: center;
                justify-content: space-between;
                font-size: 1.2rem;
            }
        }
    }
</style>