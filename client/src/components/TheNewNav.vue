<template>
    <div id="TheNewNav-root" class="root">
        <div class="container">
            <button class="container__item">
                View 1
            </button>
            <button class="container__item">
                View 2
            </button>
            <button class="container__item">
                View 3
            </button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
#TheNewNav-root {
    min-width: 100%;
}
.container {
    min-width: 100%;
    height: 35px;
    background-color: var(--primary-color);
}
.container__item {
    height: 100%;
    margin-right: 10px;
    background-color: white;
    border: none;
    transition: .5s;
    border-bottom: 2px solid gray;
}
.container__item--selected {
    border-bottom: 2px solid blue;
}
.container__item:hover {
    background-color: var(--secondary-color);
    border-bottom: 2px solid var(--secondary-color);
}
</style>