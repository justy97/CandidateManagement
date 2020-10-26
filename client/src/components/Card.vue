<template>
    <div
        :id="id"
        class="card"
        :draggable="draggable"
        @dragstart="dragStart"
        @dragover.stop
    >
        <div class="div info-card">
            <p class="can-name">{{candidate.name}}<p>
            <p class="can-info">{{ candidateData.education }}</p>
            <p class="can-info">{{ candidateData.email }}</p>
            <p class="can-rating">Current rating: <span class="rating-val">{{ (Math.round(rating*100)/100).toFixed(2) }}</span></p> 
            <button class="btn btn-sm btn-outline-secondary" @click="resumeFunction(candidateData.resume)" >view Resume</button>
        </div>

        <button class="btn btn-sm btn-outline-secondary" @click="toggleComments = !toggleComments">show comments<b-icon icon="chevron-down"></b-icon></button>
        <div v-show="toggleComments" class="div container comment-page">
            <div class="row" v-for="comment in candidateData.comments" :key="comment.id">
                <div class="col comment-board">
                    <span class="commenter-name">{{comment.author}}</span>
                    <span class="comment-rating">rating:{{comment.rating}}</span>
                    <p>{{comment.text}}</p>
                </div>
            </div>
        </div>

        <button class="btn btn-sm btn-outline-primary" @click="toggleForm = !toggleForm">add comment<b-icon icon="chevron-down"></b-icon></button>
        <form v-show='toggleForm' class="comment-form">
            <div class="form-group">
                <input type="text" class="form-control form-control-sm" id="comment-author" v-model="form.author"  placeholder="Commenter:"/>
            </div>
            <select class="form-control form-control-sm" v-model="form.rating">
                <option value="1">1 star</option>
                <option value="2">2 star</option>
                <option selected value="3">3 star</option>
                <option value="3">4 star</option>
                <option value="3">5 star</option>
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
import PostService from "../PostService";
export default {
    props:["id","draggable","candidate"],
    methods:{
        dragStart:e=>{
            const target = e.target;

            e.dataTransfer.setData("card_id",target.id);
        },
        async createComment() {
            if(!this.form.text || !this.form.author || !this.form.rating){
                alert("please fill in comments");
                return;
            }
            await PostService.insertComment(this.candidate._id,this.form);
        },
        reloadPage(){
            window.location.reload();
        },
        async resumeFunction(resume){
            await PostService.getResume(resume);
        }
    },
    data(){
        return{
            candidateData:this.candidate,
            form:{
                text:"",
                author:"",
                rating:0,
            },
            rating:"",
            toggleForm:false,
            toggleComments:false,
            link:"https://bootstrap-vue.org/docs/icons"
        }
    },
    async created() {
        let sum = 0;
        let count = 0;
        let len = this.candidate.comments.length;
        if(len > 0){
            for(let i = 0; i < len;i++){
                {
                    sum += this.candidate.comments[i].rating;
                    count += 1;
                }
            }
            this.rating = sum/count;
        }
    },
}
</script>

<style scoped>
    .commenter-name{
        font-size:1.4em;
        color:cornflowerblue;
    }

    .comment-rating{
        font-size:1.2em;
        color:darkorange;
        float: right;
    }

    /* each comment */
    .comment-board{
        margin:0.3em 0.3em 0.3em 0.3em;
        border:1px solid grey;
    }
    /* comment section as a whole */
    .comment-page{
        margin-top:0.8em;
        margin-bottom: 0.8em;
        padding:0.3em 0.3em 0.3em 0.3em;
        border: 2px solid #ffffff;
    }
    /* new comment form */
    .comment-form{
        background-color: rgb(136, 172, 194);
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

    .can-rating{
        font-size:0.9em;
        color:rgb(136, 76, 138);
    }

    .rating-val{
        font-size:1.3em;
        color:rgb(51, 140, 143);
    }

    .info-card{
        text-align:center;
        background-color:rgb(218, 215, 211);
        margin-top:0.3em;
        margin-bottom: 0.3em;
        padding:0.3em 0.3em 0.3em 0.3em;
    }
</style>