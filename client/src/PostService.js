import axios from "axios";
// import multer from "multer";


const url = "http://localhost:3000/api/candidates/";
// const upload = multer({dest:"uploads/"});

class PostService{
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
    static insertCandidate(newCandidate,formData){
        formData.append("file",formData);
        formData.append("name",newCandidate.name);
        formData.append("education",newCandidate.education);
        formData.append("email",newCandidate.email);
        return axios({
            method: 'post',
            url: `${url}`,
            data:formData,
            headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (err) {
            //handle error
            console.log(err);
        });
    }

    //Delete Candidates
    static deleteCandidate(id) {
        axios.delete(`${url}${id}`).then().catch(err=>{
            console.log(err)
        });
    }

    //Create Comments
    static insertComment(id,newComment) {
        return axios.post(`${url}${id}/comments`,{
            text:newComment.text,
            author:newComment.author,
            rating:newComment.rating
        }).then().catch(err=>{
            console.log(err);
        })
    }

    static getResume(resume){
        window.open(`${url}asset/${resume}`, "_blank");
    }

    static changeCanState(can_id,state){
        // console.log("function");
        // console.log(state);
        // console.log(can_id);
        console.log(`${url}${can_id}/edit`);
        return axios.put(`${url}${can_id}/edit`,{
            newState:state,
        }).then().catch(err=>{
            console.log(err);
        })
    }
}

export default PostService;