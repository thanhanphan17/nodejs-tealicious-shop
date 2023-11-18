pipeline {

    agent any

    parameters {
        choice(name: 'ACTION', choices: ['Build', 'Deploy', 'Remove all'], description: 'Pick something')
    }
    stages {
        stage('Build') {
            steps {
                withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v2/') {
                    sh 'docker build -f _dockerfile -t thanhanphan17/tealicious-shop .'
                    sh 'docker push thanhanphan17/tealicious-shop'
                }
            }
        }
        stage('Deploying') {
            steps {
                withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v2/') {
                    sh 'docker rm -f tealicious-shop || echo "No container to remove"'
                    sh 'docker rmi -f tealicious-shop || echo "No image to remove"'
                    sh 'docker run --name tealicious-shop --network nodejs-tealicious-shop_prod_network -p 81:8080 -d thanhanphan17/tealicious-shop'
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