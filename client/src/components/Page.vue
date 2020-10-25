<template>
    <div class="page">
        <h1>Added Candidates</h1>
        <!-- CREATE CANDIDATE FORM HERE -->
        <div class="create-candidate">
            <label for="candidate-name">Candidates's name</label>
            <input
                type="text"
                id="candidate-name"
                name="newCandidate[name]"
                v-model="form.name"
                placeholder="Name"
            />

            <label for="candidate-edu">Candidates's education</label>
            <input
                type="text"
                id="candidate-edu"
                name="newCandidate[education]"
                v-model="form.education"
                placeholder="Education"
            />

            <label for="candidate-email">Candidates's email</label>
            <input
                type="text"
                id="candidate-email"
                name="newCandidate[email]"
                v-model="form.email"
                placeholder="Email"
            />

            <button v-on:click="createCandidate">Submit</button>
        </div>

        <hr />
        <p class="error" v-if="error">{{ error }}</p>
        
        <div class="flexbox">
            <Board id = "board-1" process="Applied">
                <Card id = "card-1" draggable="true" class="candidate"
                    v-for="(candidate, index) in candidates"
                    v-bind:item="candidate"
                    v-bind:index="index"
                    v-bind:key="candidate._id"
                    v-bind:candidate = "candidate"
                >
                    <div class="row">
                    </div>

                    <button v-on:click= "deleteCandidate(candidate._id)">Delete Candidate</button>
                </Card>
            </Board>

            <Board id = "board-2" process="Phone Screen">
   
            </Board>

            <Board id = "board-3" process="On Site">
            </Board>

            <Board id = "board-4" process="Offered">
            </Board>

            <Board id = "board-5" process="Accepted">
            </Board>

            <Board id = "board-6" process="Rejected">
            </Board>
        </div>
    </div>

</template>

<script>
import CandidateService from "../CandidateService";
import Board from "./Board.vue"
import Card from "./Card.vue"

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
        };
    },
    async created() {
        try {
            this.candidates = await CandidateService.getCandidates();
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        async createCandidate() {
            await CandidateService.insertCandidate(this.form);
            this.candidates = await CandidateService.getCandidates();
        },
        async deleteCandidate(id) {
            await CandidateService.deleteCandidate(id);
            this.candidates = await CandidateService.getCandidates();
        },
    },
};
</script>


<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.candidate {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

p.name {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
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
    display:flex;
    justify-content: space-between;

    width: 100%;
    max-width: 1600px;
    height:300vh;

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

.card{
    padding:15px 25px;
    background-color: white;
    max-width:230px;

    cursor:pointer;
    margin-bottom: 15px;
}
</style>
