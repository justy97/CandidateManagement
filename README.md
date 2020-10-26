# Kanban Project: Candidate Manager
A kanban board website for recruiters to manage candidates<br/>

## Demo
<https://hidden-peak-61390.herokuapp.com/>

## Features
* Upload Candidate
    * Click the **Add new candidate** button to show the form and upload new candidates with the necessary infos, and a Resume File. All fields are required to submit.
    * Uploaded candidates have their information stored in MongoDB.
    * Respective uploaded Resume is stored on Applicatino server. **On the deployed version, file will be cleansed and can not be accessed again upon Heroku app reboot. Potential solution: use AWS S3 to store file**. Can be accessed through **view Resume** button on the info card.
    * The **Delete** button will delete the candidate from the database, but will not delete the Resume from the server.

* Drag and drop:
    * Drag and drop candidate cards to different columns to mark their application stage!
    * The stage that a candidate is in will be recorded by server, and won't be lost on Web Page Close.

* Comments and ratings:
    * Under each candidate, interviewers and HRs can leave their comments and ratings of that candidate.
    * Click the **show comments** button to reveal all the comments that have been left for that candidate.
    * Click the **add comment** button to reveal the form to post a new comment; all fields including Commenter Name, Rating and Comment are required.
    * The average score of all current ratings is displayed on the card. Currently, it displays "0.00" when there is no comment under.

* Development progress and processes:
    * Please see Commit history to see the history of development.

## Technologies
### Front-End
* vue.js
* Bootstrap
* Bootstrap-vue
* vuedraggable

### Back-End
* Express
* Node.js
* mongoDB
* bodyparser
* mongoose
* multer

## TODOs/Known issues
    - File uploads to Heroku will be automatically lost: need to migrate to AWS S3 for file storage.
    - Implement user login to protect the system. Only login user is able to access the page.
    - Errors and vulnerabilities check
    - Maybe delete file on deleting candidates.