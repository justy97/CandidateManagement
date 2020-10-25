<template>
    <div
        :id="id"   
        class="board"
        @dragover.prevent
        @drop.prevent="drop"
    >
        <div class="header">
            <h1 id="header-text">{{process}}</h1>
        </div>
        <slot />
    </div>
</template>

<script>
export default {
    props:['id','process'],
    methods:{
        drop:e => {
            const card_id = e.dataTransfer.getData("card_id");

            const card = document.getElementById(card_id);

            card.style.display = "block";

            e.target.appendChild(card);
        }
    }
}
</script>

<style scoped>

.header{
    background:purple;
    color:yellow;
    width:100%;
}

</style>