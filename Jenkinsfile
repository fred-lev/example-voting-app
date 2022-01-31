pipeline {
    agent none
    stages {
        // Worker App
        stage('worker: build') {
            when {
                changeset "**/worker/**"
            }
            agent {
                docker {
                    image 'maven:3.8.4-openjdk-8-slim'
                    args '-v $HOME/.m2:/root/.m2'
                }
            }
            steps {
                echo 'Compiling worker app'
                dir('worker'){
                    sh 'mvn compile'
                }
            }
        }
        stage('worker: test') {
            when {
                changeset "**/worker/**"
            }
            agent {
                docker {
                    image 'maven:3.8.4-openjdk-8-slim'
                    args '-v $HOME/.m2:/root/.m2'
                }
            }
            steps {
                echo 'Running unit tests on worker app'
                dir('worker'){
                    sh 'mvn clean test'
                }
            }
        }
        stage('worker: package') {
            when {
                branch 'main'
                changeset "**/worker/**"
            }
            agent {
                docker {
                    image 'maven:3.8.4-openjdk-8-slim'
                    args '-v $HOME/.m2:/root/.m2'
                }
            }
            steps {
                echo 'Packaging worker app'
                dir('worker'){
                    sh 'mvn package -DskipTests'
                    archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true, onlyIfSuccessful: true
                }
            }
        }
        stage('worker: docker-package') {
            agent any
            when {
                branch 'main'
                changeset "**/worker/**"
            }
            steps {
                echo 'Packaging worker app in docker'
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        def customImage = docker.build("fredflev/worker:v${env.BUILD_ID}", "./worker")
                        customImage.push()
                        customImage.push("${env.BRANCH_NAME}")
                        customImage.push("latest")
                    }
                }
            }
        }
        // Result App
        stage('result: build') {
            when {
                changeset "**/result/**"
            }
            agent {
                docker {
                    image 'node:8.16.0-alpine'
                }
            }
            steps {
                echo 'Compiling result nodejs app'
                dir('result'){
                    sh 'npm install'
                    sh 'npm ls'
                }
            }
        }
        stage('result: test') {
            when {
                changeset "**/result/**"
            }
            agent {
                docker {
                    image 'node:8.16.0-alpine'
                }
            }
            steps {
                echo 'Running unit tests on result app'
                echo 'Compiling result nodejs app'
                dir('result'){
                    sh 'npm install'
                    sh 'npm ls'
                    sh 'npm test'
                }
            }
        }
        stage('result: docker-package') {
            agent any
            when {
                branch 'main'
                changeset "**/result/**"
            }
            steps {
                echo 'Packaging result app in docker'
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        def customImage = docker.build("fredflev/result:v${env.BUILD_ID}", "./result")
                        customImage.push()
                        customImage.push("${env.BRANCH_NAME}")
                        customImage.push("latest")
                    }
                }
            }
        }
        // Vote App
        stage('vote: build') {
            when {
                changeset "**/vote/**"
                branch 'main'
            }
            agent {
                docker
                {
                    image 'python:2.7.16-slim'
                    args '--user root'
                }
            }
            steps {
                echo 'Installing requirements for vote app'
                    dir('vote'){
                        sh 'pip install -r requirements.txt'
                    }
            }
        }
        stage('vote: test') {
            when {
                branch 'main'
                changeset "**/vote/**"
            }
            agent {
                docker
                {
                    image 'python:2.7.16-slim'
                    args '--user root'
                }
            }
            steps {
                echo 'Running unit tests on vote app'
                    dir('vote'){
                        sh 'pip install -r requirements.txt'
                        sh 'nosetests -v'
                    }
                }
        }
        stage('vote: docker-package') {
            agent any
            when {
                branch 'main'
                changeset "**/vote/**"
            }
            steps {
                echo 'Packaging vote app in docker'
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        def customImage = docker.build("fredflev/vote:v${env.BUILD_ID}", "./vote")
                        customImage.push()
                        customImage.push("${env.BRANCH_NAME}")
                        customImage.push("latest")
                    }
                }
            }
        }
        stage('deploy to dev'){
                agent any
                when{
                    branch 'main'
                }
                steps{
                    echo 'deploy to dev'
                    dir('e2e'){
                        sh 'docker-compose up -d'
                    }
                }
        }
        stage('Run end to end testing'){
                agent any
                when{
                    branch 'main'
                }
                steps{
                    echo 'Run end to end testing'
                    sh './e2e.sh'
                }
        }
    }
    post {
        always {
            echo 'End of the pipeline'
        }
        failure {
            slackSend (color: "danger", message: "Build Failed - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
        }
        success {
            slackSend (color: "good", message: "Build Succeeded - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
        }
    }
}
