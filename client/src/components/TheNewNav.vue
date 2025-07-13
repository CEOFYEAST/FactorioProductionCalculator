<template>
    <div id="TheNewNav-root" class="root">
        <div class="container">
            <div class="container__filler"></div>
            <button class="container__item">
                Calculator
            </button>
            <button class="container__item">
                About
            </button>
            <button class="container__item container__item--selected">
                Sign In
            </button>
            <button class="container__item">
                Create Account
            </button>
            <div class="container__filler"></div>
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
    display: flex;
    flex-direction: row;
    background-color: var(--secondary-color);
}
.container__item {
    height: 100%;
    border: none;
    padding: 0px 10px 0px 10px;
    transition: .3s;
    border-bottom: var(--strong-border);
    font-family: var(--header-font-family);
    font-size: var(--header-font-size);
    background-color: var(--secondary-color);
}
.container__filler {
    flex-grow: 1;
    border-bottom: var(--strong-border);
}
.container__item--selected {
    border-bottom: none;
    background-color: var(--primary-color);
}
.container__item:hover {
    background-color: var(--active-color);
}
</style>