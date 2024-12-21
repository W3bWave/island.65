<template>
    <header id="header">
        <span id="title-app" class="roboto-bold">Острова.65 {{ $route.name }}</span>
    </header>
</template>

<style scoped>
    #header{
        position: sticky;
        top: 0;
        width: inherit;
        min-width: 100%;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.8rem 0;
        box-shadow: 0px 4px 8px rgba(12, 41, 117, 0.12);
        z-index: 100;


        #title-app{
            background-color: #0D8200;
            color: #fff;
            padding: .5rem;
            border-radius: 1.5rem;
            font-size: .75rem;
        }
    }
</style>