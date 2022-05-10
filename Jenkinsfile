pipeline {
    agent {
        label 'master'
    }
    stages {
        stage ( 'install' ) {
            steps {
                dir( 'build_node' ) {
                    sh 'npm install'
                }
            }
        }
        stage ( 'test' ) {
            steps {
                dir( 'build_node' ) {
                    sh 'npm test'
                }
            }
        }
        stage ( 'docker Build' ) {
            steps {
                echo 'build'
            }
        }
        stage ( 'docker push' ) {
            steps {
                echo 'push'
            }
        }
        stage('End') {
            steps {
                echo "Deploying Backend"
            }
        }
    }
}