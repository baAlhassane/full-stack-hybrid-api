pipeline {
    agent any

    environment {
        TARGET_WSL_IP = '172.31.92.36'
        ANSIBLE_USER = 'alhassaneba'
        SSH_CREDENTIAL_ID = 'ssh-wsl-ansible'
        
        // --- NOUVELLES VARIABLES POUR DOCKER ---
        DOCKER_REGISTRY = 'docker.io' // Ou votre registre privé (ex: myregistry.com)
        DOCKER_USERNAME = 'alhas2186' // Remplacez par votre nom d'utilisateur Docker Hub
        DOCKER_CREDENTIAL_ID = 'docker-hub-credentials' // L'ID de vos identifiants Docker Hub dans Jenkins
        APP_VERSION = '1.0.0' // Version de votre application, peut être dynamique (ex: env.BUILD_NUMBER)
        
        // --- NOUVELLE VARIABLE : Chemin du Kubeconfig de Minikube ---
        // Remplacez 'alhassaneba' si votre utilisateur Jenkins est différent dans WSL.
        MINIKUBE_KUBECONFIG = '/home/alhassaneba/.kube/config'
    }

    stages {
        stage('Declarative: Checkout SCM') {
            steps {
                checkout scm
            }
        }

        // --- Étape : Build et Push de l'Image Docker du Backend ---
        stage('Build & Push Backend Docker Image') {
            steps {
                script {
                    // Utilise les identifiants Docker Hub pour l'authentification.
                    withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIAL_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        dir('hybrid-api-backend') {
                            // Nettoie et compile le projet Spring Boot pour obtenir le JAR.
                            sh 'mvn clean install -DskipTests'
                            
                            // Construit l'image Docker du backend.
                            // '-t' pour tagger l'image avec un nom et une version.
                            // '.' indique que le Dockerfile est dans le répertoire courant.
                            sh "docker build -t ${env.DOCKER_USERNAME}/hybrid-api-backend:${env.APP_VERSION} ."
                            
                            // Connecte Docker au registre.
                            sh "echo ${DOCKER_PASS} | docker login ${env.DOCKER_REGISTRY} -u ${DOCKER_USER} --password-stdin"
                            
                            // Pousse l'image Docker vers le registre.
                            sh "docker push ${env.DOCKER_USERNAME}/hybrid-api-backend:${env.APP_VERSION}"
                            
                            // Déconnecte Docker (bonne pratique).
                            sh "docker logout ${env.DOCKER_REGISTRY}"
                        }
                    }
                }
            }
        }

        // --- Étape : Build et Push de l'Image Docker du Frontend ---
        stage('Build & Push Frontend Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIAL_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        dir('hybrid-api-front') {
                            // Construit l'image Docker du frontend.
                            sh "docker build -t ${env.DOCKER_USERNAME}/hybrid-api-front:${env.APP_VERSION} ."
                            
                            // Connecte Docker au registre.
                            sh "echo ${DOCKER_PASS} | docker login ${env.DOCKER_REGISTRY} -u ${DOCKER_USER} --password-stdin"
                            
                            // Pousse l'image Docker vers le registre.
                            sh "docker push ${env.DOCKER_USERNAME}/hybrid-api-front:${env.APP_VERSION}"

                            // Déconnecte Docker.
                            sh "docker logout ${env.DOCKER_REGISTRY}"
                        }
                    }
                }
            }
        }

        // --- Étape : Installer Minikube via Ansible ---
        stage('Install Minikube via Ansible') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: env.SSH_CREDENTIAL_ID, keyFileVariable: 'ANSIBLE_SSH_KEY_PATH')]) {
                        echo "Exécution du playbook Ansible pour installer Minikube sur WSL..."
                        sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"cd \\\"/home/alhassaneba/document/web/full-stack/hybrid-api-deployment/ansible-config\\\" && ansible-playbook -i inventory/hosts.ini playbooks/install_minikube.yaml\"'"
                    }
                }
            }
        }

        // --- Étape : Déployer sur Kubernetes ---
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: env.SSH_CREDENTIAL_ID, keyFileVariable: 'ANSIBLE_SSH_KEY_PATH')]) {
                        echo "Vérification de l'état de Minikube avant déploiement..."
                        retry(5) { // Tente 5 fois
                            sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"minikube status\"'"
                            sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"KUBECONFIG=${env.MINIKUBE_KUBECONFIG} kubectl cluster-info\"'"
                            sleep 10 // Attend 10 secondes
                        }

                        echo "Déploiement des applications sur Minikube..."
                        sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"KUBECONFIG=${env.MINIKUBE_KUBECONFIG} minikube kubectl -- apply -f /home/alhassaneba/document/web/full-stack/hybrid-api-deployment/kubernetes-manifests/backend-deployment.yaml\"'"
                        sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"KUBECONFIG=${env.MINIKUBE_KUBECONFIG} minikube kubectl -- apply -f /home/alhassaneba/document/web/full-stack/hybrid-api-deployment/kubernetes-manifests/frontend-deployment.yaml\"'"
                        
                        echo "Vérification de l'état des pods avant attente (pour le débogage)..."
                        sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"KUBECONFIG=${env.MINIKUBE_KUBECONFIG} minikube kubectl -- get pods -A -o wide\"'"

                        echo "Description du pod backend (pour plus de détails sur les événements et les erreurs)..."
                        sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"KUBECONFIG=${env.MINIKUBE_KUBECONFIG} minikube kubectl -- describe pod -l app=hybrid-api-backend\"'"
                        echo "Logs du pod backend (pour voir les erreurs d'application)..."
                        sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"KUBECONFIG=${env.MINIKUBE_KUBECONFIG} minikube kubectl -- logs -l app=hybrid-api-backend --tail=100\"'"

                        echo "Attente que les déploiements soient prêts..."
                        // Attendre que le déploiement backend soit prêt (timeout augmenté)
                        sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"KUBECONFIG=${env.MINIKUBE_KUBECONFIG} minikube kubectl -- wait --for=condition=Available deployment/hybrid-api-backend-deployment --timeout=600s\"'"
                        // Attendre que le déploiement frontend soit prêt
                        sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"KUBECONFIG=${env.MINIKUBE_KUBECONFIG} minikube kubectl -- wait --for=condition=Available deployment/hybrid-api-front-deployment --timeout=300s\"'"

                        echo "Vérification finale de l'état des pods après attente..."
                        sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"KUBECONFIG=${env.MINIKUBE_KUBECONFIG} minikube kubectl -- get pods -A -o wide\"'"
                        
                        echo "Description du pod frontend (pour plus de détails sur les événements et les erreurs)..."
                        sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"KUBECONFIG=${env.MINIKUBE_KUBECONFIG} minikube kubectl -- describe pod -l app=hybrid-api-front\"'"
                        
                        echo "Affichage de la configuration Nginx du pod frontend..."
                        sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"KUBECONFIG=${env.MINIKUBE_KUBECONFIG} minikube kubectl -- exec -it \$(minikube kubectl -- get pod -l app=hybrid-api-front -o jsonpath='{.items[0].metadata.name}') -- cat /etc/nginx/conf.d/default.conf\"'"
                        
                        echo "Logs du pod frontend (pour voir les erreurs d'application)..."
                        sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"KUBECONFIG=${env.MINIKUBE_KUBECONFIG} minikube kubectl -- logs -l app=hybrid-api-front --tail=100\"'"


                        echo "Tentative de récupération de l'URL du frontend..."
                        sh "bash -c 'ssh -i \"${ANSIBLE_SSH_KEY_PATH}\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \"${env.ANSIBLE_USER}\"@\"${env.TARGET_WSL_IP}\" \"KUBECONFIG=${env.MINIKUBE_KUBECONFIG} minikube service hybrid-api-front-service --url\"'"
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
