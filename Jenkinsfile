pipeline {
    agent any

    environment {
        IMAGE_NAME = 'e-cart'
        CONTAINER_NAME = 'e-cart-container'
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
                sh 'docker build -t e-cart:latest .'
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Deploying React application...'

                sh '''
                    docker stop e-cart-container || true
                    docker rm e-cart-container || true
                    docker run -d --name e-cart-container -p 5173:5173 e-cart:latest
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Checking running container...'
                sh 'docker ps'
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