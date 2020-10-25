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
            <p class="can-info">{{ candidateData.resume }}</p>
        </div>

        <button class="btn btn-sm btn-outline-secondary" @click="toggleComments = !toggleComments">show comments<b-icon icon="chevron-down"></b-icon></button>
        <div v-show="toggleComments" class="div container comment-page">
            <div class="row" v-for="comment in candidateData.comments" :key="comment.id">
                <div class="col comment-board">
                    <strong>{{comment.author}}</strong>
                    <p>{{comment.text}}</p>
                </div>
            </div>
        </div>

        <button class="btn btn-sm btn-outline-primary" @click="toggleForm = !toggleForm">add comment<b-icon icon="chevron-down"></b-icon></button>
        <form v-show='toggleForm' class="comment-form">
            <div class="form-group">
                <input type="text" class="form-control form-control-sm" id="comment-author" v-model="form.author"  placeholder="Commenter:"/>
            </div>
            <select class="form-control form-control-sm">
                <option selected>Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="3">4</option>
                <option value="3">5</option>
            </select>
            <div class="form-group">
                <textarea class="form-control form-control-sm" id="comment-text" v-model="form.text" placeholder="Comment:" rows="3"></textarea>
            </div>
            <button class="btn btn-sm btn-success" v-on:click="createComment();reloadPage();">Post Comment</button>
        </form>


        
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
            toggleForm:false,
            toggleComments:false,
        }
    },
}
</script>

<style scoped>
    .comment-board{
        border:2px solid black;
    }

    .comment-page{
        margin-top:0.8em;
        margin-bottom: 0.8em;
        padding:0.3em 0.3em 0.3em 0.3em;
    }

    .comment-form{
        background-color: bisque;
        margin-top:0.8em;
        margin-bottom: 0.8em;
        padding:0.3em 0.3em 0.3em 0.3em;
    }

    .can-name{
        text-align: center;
        font-size: 1.2em;
        background-color: grey;
        color:white;
        font-weight:600;
    }

    .can-info{
        text-align: center;
        font-size: 0.9em;
    }
</style>