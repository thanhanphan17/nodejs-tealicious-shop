pipeline {
    agent any

    parameters {
        choice(
            name: 'ACTION',
            choices: ['Build and Push', 'Deploy', 'Remove all'],
            description: 'Pick something'
        )
    }

    stages {
        stage('Build and Push') {
            steps {
                withDockerRegistry(
                    credentialsId: 'dockerhub',
                    url: 'https://index.docker.io/v1/'
                ) {
                    sh 'docker build -f _dockerfile -t thanhanphan17/tealicious-shop .'
                    sh 'docker push thanhanphan17/tealicious-shop'
                }
            }
        }

        stage('Deploying') {
            steps {
                withDockerRegistry(
                    credentialsId: 'dockerhub',
                    url: 'https://index.docker.io/v1/'
                ) {
                    sh 'docker rm -f tealicious-shop || echo "No container to remove"'
                    sh 'docker rmi -f tealicious-shop || echo "No image to remove"'
                    sh '''
                        docker container run \
                            --restart unless-stopped \
                            --name tealicious-shop \
                            --network nodejs-tealicious-shop_prod_network \
                            -dp 81:8080 \
                            thanhanphan17/tealicious-shop
                    '''
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
