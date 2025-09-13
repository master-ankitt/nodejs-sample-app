# Node.js Sample Application  

This is a sample "Node.js Application" deployed using "Jenkins, Docker, and AWS EC2" with automated CI/CD.

## Architecture Diagram 
<img width="1257" height="300" alt="Image" src="https://github.com/user-attachments/assets/62e48a45-82ae-4389-8d83-ffc9fe030793" />

## Setup Instructions
--> Follow these steps to set up the complete CI/CD pipeline for deploying the Node.js application with Jenkins, Docker, and AWS EC2.

1. Prerequisites
--> AWS EC2 instance (Ubuntu)
--> Docker & Jenkins installed on EC2
--> Node.js & npm installed on EC2
--> DockerHub account
--> GitHub repository containing your Node.js app and Jenkinsfile
--> AWS CloudWatch configured for log monitoring

2. Configure EC2 Instance
--> Launch an Ubuntu EC2 instance.
--> Install required tools: Jenkins, Docker, Node.js, npm.
--> Add Jenkins user to Docker group.

3. GitHub Setup

--> Add your code to a GitHub repository.
--> Generate an SSH key on EC2 and add the public key to GitHub
--> Add the private key into Jenkins credentials.
--> Enable GitHub Webhook:
        Payload URL: http://65.1.167.181:8080/github-webhook/
        Content type: application/json

4. Jenkins Setup
--> Install required plugins:
      GitHub Integration
      SSH Agent
      Docker Pipeline
      Blue Ocean
--> Create a Jenkins pipeline project.
--> Link the pipeline to your GitHub repository.
--> Add credentials in Jenkins:
      DockerHub credentials
      EC2 SSH key


## Deployment the nodejs with Jenkins Declarative Pipeline :- [ Jenkins Pipeline Flow ]

1. Checkout Code :-
-> Pulls the latest code from the GitHub repository (main branch).

2. Build & Test :-
-> Installs project dependencies using npm install.
-> Runs available tests (npm test).
-> Skips gracefully if no tests are present.

3. Docker Build :-
-> Builds a Docker image for the Node.js application.
-> Tags the image with the Jenkins build number for versioning.

4. Push to DockerHub :-
-> Logs into DockerHub securely using Jenkins credentials.
-> Tags and pushes the image to DockerHub with two tags:
-> latest (always points to the newest build)
-> build-number (unique versioning for rollback if needed).

5. Deploy to EC2 :-
-> Connects securely to the AWS EC2 instance via SSH using Jenkins credentials.
-> Logs in to DockerHub on the EC2 instance.
-> Pulls the latest Docker image from DockerHub.
-> Stops and removes any previously running container with the same app name.
-> Starts a new container running the latest version of the app, exposed on port 3000.


##  Access the Application :- 
Open Browser:- http://65.1.167.181:3000/ 
--> Your Node.js app should now be running.

-------------------------------------------------------

## A. Source and Config Files :-
Link of files - https://github.com/master-ankitt/nodejs-sample-app.git

## B. Deployment Proof :-
Check the deployment screenshots and public URL in the [deployment-proof](./deployment-proof/) folder

## C. Documentation
Refer to the documentation files in the [docs](./docs/) folder for setup and architecture

## D. Project Write-up :-
For detailed challenges, solutions, and deployment proof, see the [WRITEUP.md](./WRITEUP.md) file.

--------------------------------------------------------
## Author
Ankit Choudahry 
GitHub: https://github.com/master-ankitt/nodejs-sample-app
DockerHub: https://hub.docker.com/repository/docker/aaankit/nodejs-sample-app/general