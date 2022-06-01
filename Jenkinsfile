pipeline {
    agent any
    environment{
	    scannerHome = tool 'SonarScanner 3.1.0';
	}
    stages {
        stage ( 'Install' ) {
            steps {
                dir( 'build_node' ) {
                    sh 'npm install'
                }
            }
        }
        stage ( 'Jasmine Tests' ) {
            steps {
                dir( 'build_node' ) {
                    sh 'npm test'
                }
            }
        }
        stage('SonarQube analysis') {
    			steps {
				echo "sonarqube"
				dir("/var/lib/jenkins/workspace/timebank-backend-dev"){
				    withSonarQubeEnv('sonarqube') { // Will pick the global server connection you have configured
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
				}
			}
  		}
        stage ( 'Docker Build' ) {
            steps {
                echo 'build'
            }
        }
        stage ( 'Docker Push' ) {
            steps {
                echo 'push'
            }
        }
    }
}