<template>
  <div class="container">
    <h1>Added Candidates</h1>
    <!-- CREATE CANDIDATE FORM HERE -->
    <div class="create-candidate">
      <label for="candidate-name">Candidates's name</label>
      <input type="text" id="candidate-name" name="newCandidate[name]" v-model="form.name" placeholder="Name">

      <label for="candidate-edu">Candidates's education</label>
      <input type="text" id="candidate-edu" name="newCandidate[education]" v-model="form.education" placeholder="Education">

      <label for="candidate-email">Candidates's email</label>
      <input type="text" id="candidate-email" name="newCandidate[email]" v-model="form.email" placeholder="Email">

      <button v-on:click="createCandidate">Submit</button>
    </div>


    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="candidate-container">
      <!-- for now, double click to delete -->
      <div class="candidate"
        v-for="(candidate,index) in candidates"
        v-bind:item="candidate"
        v-bind:index="index"
        v-bind:key="candidate._id"
        v-on:dblclick="deleteCandidate(candidate._id)"
      >
        <p class="text">{{ candidate.name }}</p>
        <p class="text">{{ candidate.education }}</p>
        <p class="text">{{ candidate.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import CandidateService from "../CandidateService";

export default {
  name: 'BoardComponent',
  data() {
    return {
      candidates:[],
      error:'',
      form:{
        name:'',
        education:'',
        email:''
      }
    }
  },
  async created() {
    try{
      this.candidates = await CandidateService.getCandidates();
    } catch(err){
      this.error = err.message;
    }
  },
  methods:{
    async createCandidate() {
      await CandidateService.insertCandidate(this.form);
      this.candidates = await CandidateService.getCandidates();
    },
    async deleteCandidate(id) {
      await CandidateService.deleteCandidate(id);
      this.candidates = await CandidateService.getCandidates();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
