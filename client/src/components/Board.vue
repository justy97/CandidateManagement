<template>
    <div
        :id="id"   
        class="board"
        @dragover.prevent
        @drop.prevent="drop"
    >

        <div class="header panel-info">
            <div id="header-text" class="panel-body">{{process}}</div>
        </div>

        <slot />
    </div>
</template>

<script>
import PostService from "../PostService";
export default {
    props:['id','process'],
    methods:{
        drop:e => {
            const card_id = e.dataTransfer.getData("card_id");
            const card = document.getElementById(card_id);
            let board_id = e.target.id.charAt(6);
            board_id -= 1;
            // alert(`board_id: ${board_id} card id: ${card_id}`);
            card.style.display = "block";
            e.target.appendChild(card);
            PostService.changeCanState(card_id,board_id);
        }
    },
    data: function(){
        return{
            boardId : this.id,
        }
    }
}
</script>

<style scoped>

.header{
    /* background:lightslategrey; */
    background:rgb(50, 53, 50);
    width:100%;

}

#header-text{
    color:white;
    font-size:1.5em;
    text-align: center;
}

</style>