<template>
    <div class="page">
        <div class="jumbotron">
            <h1 class="display-4">Candidate Manager</h1>
            <p class="lead">Web app to manage recruitment processes</p>
        </div>

        <div id="newZone">
            <div class="text-center ">
                <button class="btn btn-secondary" @click="toggleNewcan = !toggleNewcan">Add new candidate<b-icon icon="chevron-down"></b-icon></button>
            </div>

            <form v-show="toggleNewcan" class="text-center candidate-creator container" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="candidate-name">Name:</label>
                    <input
                        type="text"
                        id="candidate-name"
                        name="newCandidate[name]"
                        v-model="form.name"
                        placeholder=" Name"
                    />
                </div>
                <div class="form-group">
                    <label for="candidate-edu">Education:</label>
                    <input
                        type="text"
                        id="candidate-edu"
                        name="newCandidate[education]"
                        v-model="form.education"
                        placeholder=" Education"
                    />
                </div>
                <div class="form-group">
                    <label for="candidate-email">Email:</label>
                    <input
                        type="text"
                        id="candidate-email"
                        name="newCandidate[email]"
                        v-model="form.email"
                        placeholder=" Email"
                    />
                </div>
                 <!-- File Upload  -->
                <div class="file">
                    <form enctype="multipart/form-data">
                        <div class="fields">
                            <label>Upload File</label><br />
                            <input
                                type="file"
                                ref="file"
                                @change="onSelect"
                            />
                        </div>
                        <div class="message">
                            <h5>{{message}}</h5>
                        </div>
                    </form>
                </div>
                <br />
                <button class="btn btn-info" v-on:click="createCandidate">Add Candidate</button>
            </form>
        </div>


        <hr />
        <p class="error" v-if="error">{{ error }}</p>
        
        <div class="flexbox container">
            <div class="row flex-row flex-nowrap">
                <Board id = "board-1" process="Applied" class="board alert-secondary col-2">
                    <Card draggable="true" class="card container"
                        v-for="(candidate, index) in candidates"
                        v-bind:item="candidate"
                        v-bind:index="index"
                        v-bind:key="candidate._id"
                        v-bind:id="candidate._id"
                        v-bind:candidate = "candidate"
                    >
                        <div class="row">
                        </div>

                        <button class="btn btn-danger" v-on:click= "deleteCandidate(candidate._id)">Delete</button>
                    </Card>
                </Board>

                <Board id = "board-2" process="Phone Screen" class="board col-2">
    
                </Board>

                <Board id = "board-3" process="On Site" class="board col-2">
                </Board>

                <Board id = "board-4" process="Offered" class="board col-2">
                </Board>

                <Board id = "board-5" process="Accepted" class="board col-2">
                </Board>

                <Board id = "board-6" process="Rejected" class="board col-2">
                </Board>
            </div>
        </div>
    </div>

</template>

<script>
import PostService from "../PostService";
import Board from "./Board.vue"
import Card from "./Card.vue"
// import draggable from "vuedraggable";
// import axios from "axios";

export default {
    name: "Page",
    components: {
        Board,
        Card
    },
    data() {
        return {
            candidates: [],
            error: "",
            form: {
                name: "",
                education: "",
                email: "",
            },
            toggleNewcan:false,
            file:"",
            message:""
        };
    },
    async created() {
        try {
            this.candidates = await PostService.getCandidates();
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        async createCandidate() {
            if(! this.file){
                alert("please upload file");
                return;
            }
            if(!this.form.name || !this.form.education || !this.form.email){
                alert("please fill in information");
                return;
            }

            const formData = new FormData();
            formData.append("file",this.file);
            try{
                await PostService.insertCandidate(this.form,formData);
                this.message = "successful"
            }
            catch(err){
                console.log(err);
                this.message="something went wrong"
            }
            this.candidates = await PostService.getCandidates();
        },
        async deleteCandidate(id) {
            await PostService.deleteCandidate(id);
            this.candidates = await PostService.getCandidates();
            window.location.reload();
        },
        onSelect(){//on select file, based on onChange event
            const file = this.$refs.file.files[0];
            this.file = file;
        },
    },
};
</script>


<style scoped>
.title{
    font-size:2em;
    text-align: center;
}

.candidate-creator{
    text-align:center;
    background:rgb(178, 185, 182);
    padding-top:2em;
    padding-bottom:2em;
}

*{
    margin: 0;
    padding: 0;
    box-sizing:border-box;
}

body{
    background-color:aliceblue;
}

.flexbox{
    justify-content: space-between;

    width: 100%;
    max-width: 2000px;
    height:200vh;
    /* overflow:hidden; */
    margin:0 auto;
    padding: 15px;
}

.flexbox .board{
    flex-direction: column;

    width:100%;
    max-width: 280px; 
    width:272px;
    width:25%;
    min-height:75vh;
    background-color: lavender;
    border:white 3px solid;
    padding:15px;
}

.card{
    background-color: white;
    border: 5px solid rgb(115, 88, 165);
    max-width:230px;

    cursor:pointer;
    margin-bottom: 15px;
    padding: 1em 1em 1em 1em;
    margin-top:2em;
}

#newZone{
    padding: 0.5em 2em 1em 2em;
    margin-top:2em;
}

#board-4{
    background-color:teal;
}

#board-5{
    background-color: greenyellow;
}

#board-6{
    background-color:tomato;
}

</style>
