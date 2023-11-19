pipeline {

    agent any

    stages {
        stage('Packaging/Pushing image') {
            steps {
                withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v2/') {
                    sh 'docker build -f _dockerfile -t thanhanphan17/tealicious-shop .'
                    sh 'docker push thanhanphan17/tealicious-shop'
                }
            }
        }
    }
    post {
        // Clean after build
        always {
            cleanWs()
        }
    }
}