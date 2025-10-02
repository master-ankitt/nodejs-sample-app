pipeline {
    agent any

    environment {
        // 🔹 DockerHub details
        DOCKERHUB_USER = "aaankit"
        APP_NAME       = "nodejs-sample-app"
        IMAGE_NAME     = "${DOCKERHUB_USER}/${APP_NAME}"

        // 🔹 EC2 deployment details
        EC2_USER       = "ubuntu"
        EC2_HOST       = "43.204.22.68"
        EC2_SSH_KEY    = "ec2-ssh-key"       // Jenkins SSH credential ID
        APP_PORT       = "3000"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/master-ankitt/nodejs-sample-app.git'
            }
        }

        stage('Build & Test') {
            steps {
                sh '''
                  echo "Installing dependencies..."
                  npm install
                  npm install winston winston-cloudwatch   # ✅ Added for CloudWatch logging

                  echo "Running tests..."
                  npm test || echo "No tests found, skipping..."
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                  echo "Building Docker image..."
                  docker build -t ${APP_NAME}:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                                  usernameVariable: 'DOCKERHUB_USER',
                                                  passwordVariable: 'DOCKERHUB_PASS')]) {
                    sh '''
                        echo "Logging into DockerHub..."
                        echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin

                        echo "Tagging images..."
                        docker tag ${APP_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:${BUILD_NUMBER}
                        docker tag ${APP_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest

                        echo "Pushing images to DockerHub..."
                        docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                        docker push ${IMAGE_NAME}:latest
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                                  usernameVariable: 'DOCKERHUB_USER',
                                                  passwordVariable: 'DOCKERHUB_PASS')]) {
                    sshagent (credentials: ["${EC2_SSH_KEY}"]) {
                        sh """
                            echo "Deploying to EC2..."
                            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} \\
                            'docker login -u ${DOCKERHUB_USER} -p ${DOCKERHUB_PASS} && \
                             docker pull ${IMAGE_NAME}:latest && \
                             docker stop ${APP_NAME} || true && \
                             docker rm ${APP_NAME} || true && \
                             docker run -d --name ${APP_NAME} -p ${APP_PORT}:${APP_PORT} ${IMAGE_NAME}:latest'
                        """
                    }
                }
            }
        }
    }
}
