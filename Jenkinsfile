pipeline {
    agent any

    parameters {
        choice(
            name: 'ACTION',
            choices: ['Package and Push Image', 'Deploy PostgreSQL', 'Deploy Application', 'Remove all'],
        )
    }

    stages {
        stage('Packaging/Pushing Image') {
            when {
                branch 'master'
            }
            steps {
                withDockerRegistry(
                    credentialsId: 'dockerhub',
                    url: 'https://index.docker.io/v1/'
                ) {
                    sh 'docker build -t thanhanphan17/tealicious-shop .'
                    sh 'docker push thanhanphan17/tealicious-shop'
                }
            }
        }

        stage('Deploying PostgreSQL') {
            when {
                branch 'master'
            }
            steps {
                sh 'docker rm -f postgres-db || echo "No container to remove"'
                sh '''
                    docker run \
                        --name postgres-db \
                        -d --restart unless-stopped \
                        -e POSTGRES_USER=postgres \
                        -e POSTGRES_PASSWORD=0000 \
                        -e POSTGRES_DB=tealicious_db \
                        -p 5432:5432 -it \
                        -v ./.tealicious-volume:/var/lib/postgresql/data \
                         postgres:latest
                '''
            }
        }

        stage('Deploying application') {
            when {
                branch 'master'
            }
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
                            --env RUNTIME_ENV=prod \
                            --name tealicious-shop \
                            --network tealicious_network \
                            -dp 81:8080 \
                            thanhanphan17/tealicious-shop
                    '''
                }
            }
        }

        stage('Removing all container and image') {
            when {
                environment name: 'ACTION', value: 'Remove all'
            }
            steps {
                sh 'docker rm -f postgres-db'
                sh 'docker rm -f tealicious-shop'
                sh 'docker rmi -f thanhanphan17/tealicious-shop'
            }
        }
    }
}
