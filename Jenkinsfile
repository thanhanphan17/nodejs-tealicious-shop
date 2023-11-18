pipeline {

    agent any

    parameters {
        choice(name: 'ACTION', choices: ['Build', 'Deploy', 'Remove all'], description: 'Pick something')
    }
    stages {
        stage('Build') {
            steps {
                sh 'docker build -f _dockerfile -t tealicious-shop .'
            }
        }
        stage('Deploying') {
            steps {
                sh 'docker rm -f tealicious-shop || echo "No container to remove"'
                sh 'docker rmi -f tealicious-shop || echo "No image to remove"'
                sh 'docker run --name tealicious-shop --network nodejs-tealicious-shop_prod_network -p 81:8080 -d tealicious-shop'
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