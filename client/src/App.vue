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
    }
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

.flexbox{
    display:flex;
    justify-content: space-between;

    width: 100%;
    max-width: 768px;
    height:50vh;

    overflow:hidden;

    margin:0 auto;
    padding: 15px;
}

.flexbox .board{
    display:flex;
    flex-direction: column;

    width:100%;
    max-width: 250px;

    background-color:black;
    border:white 3px solid;
    padding:15px;
}

.flexbox .board .card{
    padding:15px 25px;
    background-color: white;

    cursor:pointer;
    margin-bottom: 15px;
}
</style>
