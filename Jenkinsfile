pipeline {

    agent any

    parameters {
        choice(name: 'ACTION', choices: ['Build', 'Deploy', 'Remove all'], description: 'Pick something')
    }
    stages {
        stage('Build') {
            when{
                environment name: 'ACTION', value: 'Build'
            }
            steps {
                sh 'docker build -f _dockerfile -t tealicious-shop .'
            }
        }
        stage('Deploying') {
            when{
                environment name: 'ACTION', value: 'Deploy'
            }
            steps {
                sh 'docker stop tealicious-shop || echo "No container to stop"'
                sh 'docker network create nodejs-tealicious-shop_prod_network || echo "Network already exists"' 
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