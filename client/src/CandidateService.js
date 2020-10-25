import axios from "axios";
// import multer from "multer";


const url = "http://localhost:3000/api/candidates/";
// const upload = multer({dest:"uploads/"});

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
    static insertCandidate(newCandidate,formData){
        // const bodyFormData = new FormData();
        formData.append("file",formData);
        formData.append("name",newCandidate.name);
        formData.append("education",newCandidate.education);
        formData.append("email",newCandidate.email);
        return axios({
            method: 'post',
            url: `${url}`,
            // data: {
            //     bodyFormData,
            //     name:newCandidate.name,
            //     education:newCandidate.education,
            //     email:newCandidate.email
            // },
            data:formData,
            // data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });


        // axios.post(url,)
        // return axios.post(url,{
        //     name:newCandidate.name,
        //     education:newCandidate.education,
        //     email:newCandidate.email
        // });
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

    //Upload file
    static uploadFile(formData){
        const bodyFormData = new FormData();
        bodyFormData.append("file",formData);
        return axios({
            method: 'post',
            url: `${url}/upload`,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }
}

export default CandidateService;