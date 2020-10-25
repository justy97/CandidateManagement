<template>
    <div
        :id="id"
        class="card"
        :draggable="draggable"
        @dragstart="dragStart"
        @dragover.stop
    >
        <div class="div">
            <p class="can-name">{{candidate.name}}<p>
            <p class="can-info">{{ candidateData.education }}</p>
            <p class="can-info">{{ candidateData.email }}</p>
        </div>

        <div class="div">
            <div class="row" v-for="comment in candidateData.comments" :key="comment.id">
                <div class="col comment-board">
                    <strong>{{comment.author}}</strong>
                    <p>{{comment.text}}</p>
                </div>
            </div>
        </div>

        <input type="text" id="comment-text" v-model="form.text"  placeholder="Comment Here"/>
        <input type="text" id="comment-author" v-model="form.author"  placeholder="Authored by:"/>
        <button  v-on:click="createComment();reloadPage();">Add Comment</button>
        
        <!-- a slot to put in delete button -->
        <slot />
    </div>
</template>

<script>
import CandidateService from "../CandidateService";
export default {
    props:["id","draggable","candidate"],
    methods:{
        dragStart:e=>{
            const target = e.target;

            e.dataTransfer.setData("card_id",target.id);
            // setTimeout(()=>{
            //     target.style.display="none";
            // })
        },
        async createComment() {
            await CandidateService.insertComment(this.candidate._id,this.form);
        },
        reloadPage(){
            window.location.reload();
        }
    },
    data(){
        return{
            candidateData:this.candidate,
            form:{
                text:"",
                author:"",
            },
        }
    },
}
</script>

<style scoped>
    .comment-board{
        border:2px solid black;
    }

    .can-name{
        text-align: center;
        font-size: 1.5em;
        background-color: grey;
        color:white;
    }

    .can-info{
        text-align: center;
        font-size: 1.0em;
    }
</style>