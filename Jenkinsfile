pipeline {
    agent any

    tools {
        nodejs "node18"
    }

    parameters {
        string(name: 'BUILD_TAG', description: 'On which release this build should be uploaded?')
    }

    environment {
        GH_TOKEN = credentials("GitHub-access-token")
        // NODE_ENV = 'production'
    }

    stages {
        stage("Installing dependencies") {
            steps {
		        sh 'rm package-lock.json'
                sh 'npm i'
		        sh 'npx prisma generate'
            }
        }

        stage("Compress node_modules") {
            steps {
                sh 'rm node_modules.tar.gz -f'
                sh 'tar -czf node_modules.tar.gz node_modules'
            }
        }

        stage("Building application") {
            steps {
                sh 'NODE_ENV=production npm run build'
            }
        }

        stage("Compress build") {
            steps {
                sh 'rm build.tar.gz -f'
                sh 'tar -czf build.tar.gz dist'
            }
        }

        stage("Upload build to GH Release") {
            steps {
                sh 'apt-get update && apt-get install gh'
                sh "gh release upload ${params.BUILD_TAG} --repo Fin/communication_panel build.tar.gz node_modules.tar.gz"
            }
        }
    }
}

