pipeline {

    agent any

    parameters {
        choice(name: 'ACTION', choices: ['Build', 'Remove all'], description: 'Pick something')
    }
    stages {
        stage('Building/Deploying') {
            when{
                environment name: 'ACTION', value: 'Build'
            }
            steps {
                sh 'docker compose -f docker-compose-prod.yml up -d'
            }
        }
        stage('Removing all') {
            when{
                environment name: 'ACTION', value: 'Remove all'
            }
            steps {
                sh 'docker compose -f docker-compose-prod.yml down -v'
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