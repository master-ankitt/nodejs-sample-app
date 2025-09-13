## Tools & Services Used :-

1. GitHub – Version control & source repository
2. Jenkins – CI/CD automation
3. Docker – Containerization of Node.js application
4. Docker Hub – Docker image registry
5. AWS EC2 – Deployment of the containerized app
6. Node.js – Application runtime


## Challenges Faced & Solutions :-
1. Docker Hub authentication failed during build/push
--> Cause: Jenkins agent was not logged in to Docker Hub, causing 401 Unauthorized when pulling/pushing images.

--> Solution: Configured Docker login in Jenkinsfile using credentials (dockerhub-creds) and docker login -u $DOCKERHUB_USER -p $DOCKERHUB_PASS.

2. Jenkins pipeline failed on EC2 deployment
--> Cause: SSH connection and container conflicts (old container still running) caused deployment failures.
--> Solution: Used sshagent in Jenkins pipeline, stopped and removed the old container before running the new one.

3. Pulling latest image reliably
--> Cause: EC2 instance sometimes ran an old cached image.
--> Solution: Added docker pull ${IMAGE_NAME}:latest before running the container in the deploy stage.


## Possible Improvements (if given more time) :-
1. Use Infrastructure as Code (IaC)
--> Use Terraform or Ansible to automate ECS, EC2, and networking setup instead of manual provisioning.

2. Deploy to a Load-Balanced Setup :-
--> Use an AWS Application Load Balancer with multiple ECS tasks for high availability.

3. Use Multi-Stage Docker Builds :-
--> Optimize Docker images to reduce size and speed up builds by separating build and runtime stages.

4. Add Auto-Scaling for ECS/EC2 :-
--> Configure ECS Service Auto Scaling based on CPU/memory usage and Handles traffic spikes automatically without manual intervention.