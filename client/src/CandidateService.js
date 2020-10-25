import axios from "axios";

const url = "http://localhost:3000/api/candidates/";

class CandidateService{
    //Get Candidates
    static getCandidates(){
        return new Promise((resolve,reject) => {
            axios.get(url)
            .then(function(response){
                console.log(response);
                resolve(response.data);
            })
            .catch(function(error){
                console.log(error);
                reject(error);
            })
        });
    }

    //Create Candidates
    static insertCandidate(newCandidate){
        return axios.post(url,{
            name:newCandidate.name,
            education:newCandidate.education,
            email:newCandidate.email
        });
    }

    //Delete Candidates
    static deleteCandidate(id) {
        return axios.delete(`${url}${id}`);
    }

    //Create Comments
    static insertComment(id,newComment) {
        return axios.post(`${url}${id}/comments`,{
            text:newComment.text,
            author:newComment.author
        })
    }
}

export default CandidateService;