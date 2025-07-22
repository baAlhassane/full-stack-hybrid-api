pipeline {
    agent any

    environment {
        TARGET_WSL_IP = '172.31.92.36'
        ANSIBLE_USER = 'alhassaneba'
        SSH_CREDENTIAL_ID = 'ssh-wsl-ansible'
        
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_USERNAME = 'alhas2186' // Assurez-vous que c'est bien votre nom d'utilisateur Docker Hub
        DOCKER_CREDENTIAL_ID = 'docker-hub-credentials'
        APP_VERSION = '1.0.0'
    }

    stages {
        stage('Declarative: Checkout SCM') {
            steps {
                checkout scm
            }
        }

        // --- NOUVEL EMPLACEMENT : Installer Minikube via Ansible (maintenant en premier) ---
        stage('Install Minikube via Ansible') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: env.SSH_CREDENTIAL_ID, keyFileVariable: 'ANSIBLE_SSH_KEY_PATH')]) {
                        echo "Exécution du playbook Ansible pour installer Docker et Minikube sur WSL..."
                        sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"cd \\\"/home/alhassaneba/document/web/full-stack/hybrid-api-deployment/ansible-config\\\" && ansible-playbook -i inventory/hosts.ini playbooks/install_minikube.yaml\"'"
                    }
                }
            }
        }

        stage('Build & Push Backend Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIAL_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        dir('hybrid-api-backend') {
                            sh 'mvn clean install -DskipTests'
                            sh "docker build -t ${env.DOCKER_USERNAME}/hybrid-api-backend:${env.APP_VERSION} ."
                            sh "echo ${DOCKER_PASS} | docker login ${env.DOCKER_REGISTRY} -u ${DOCKER_USER} --password-stdin"
                            sh "docker push ${env.DOCKER_USERNAME}/hybrid-api-backend:${env.APP_VERSION}"
                            sh "docker logout ${env.DOCKER_REGISTRY}"
                        }
                    }
                }
            }
        }

        stage('Build & Push Frontend Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIAL_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        dir('hybrid-api-front') {
                            sh "docker build -t ${env.DOCKER_USERNAME}/hybrid-api-front:${env.APP_VERSION} ."
                            sh "echo ${DOCKER_PASS} | docker login ${env.DOCKER_REGISTRY} -u ${DOCKER_USER} --password-stdin"
                            sh "docker push ${env.DOCKER_USERNAME}/hybrid-api-front:${env.APP_VERSION}"
                            sh "docker logout ${env.DOCKER_REGISTRY}"
                        }
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: env.SSH_CREDENTIAL_ID, keyFileVariable: 'ANSIBLE_SSH_KEY_PATH')]) {
                        echo "Déploiement des applications sur Minikube..."
                        sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"minikube kubectl -- apply -f /home/alhassaneba/document/web/full-stack/hybrid-api-deployment/kubernetes-manifests/backend-deployment.yaml\"'"
                        sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"minikube kubectl -- apply -f /home/alhassaneba/document/web/full-stack/hybrid-api-deployment/kubernetes-manifests/frontend-deployment.yaml\"'"
                        
                        echo "Déploiement Kubernetes terminé. Récupération de l'URL du frontend..."
                        sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"minikube service hybrid-api-front-service --url\"'"
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé.'
            cleanWs()
        }
        success {
            echo 'Pipeline de CI/CD réussi ! Applications déployées sur Kubernetes.'
        }
        failure {
            echo 'Pipeline de CI/CD échoué. Veuillez vérifier les logs.'
        }
    }
}
