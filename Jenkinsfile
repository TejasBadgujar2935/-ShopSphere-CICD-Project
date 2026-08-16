pipeline {
    agent any

    environment {
        IMAGE_NAME = 'frontend-e-cart'
        CONTAINER_NAME = '411085223bed'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t ${frontend-e-cart}:latest .'
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Deploying React application...'
                sh '''
                    docker stop ${411085223bed} || true
                    docker rm ${411085223bed} || true

                    docker run -d \
                        --name ${411085223bed} \
                        -p 5173:5173 \
                        ${frontend-e-cart}:latest
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Checking running container...'
                sh 'docker ps --filter name=${411085223bed}'
            }
        }
    }

    post {
        success {
            echo 'React application deployed successfully!'
        }

        failure {
            echo 'Deployment failed. Check the console output.'
        }
    }
}