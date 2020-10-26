<template>
    <div id="app">
        <Page />
    </div>

</template>

<script>
// import Board from "./components/Board.vue"
// import Card from "./components/Card.vue"
import Page from './components/Page.vue'

export default {
    name: 'App',
    components: {
        // Board,
        // Card,
        Page
    },
}
</script>

<style>

*{
    margin: 0;
    padding: 0;
    box-sizing:border-box;
}

body{
    background-color:aliceblue;
}

</style>
