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
                sh 'docker compose up -d'
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