// Jenkinsfile
pipeline {
    agent any // Exécute le pipeline sur n'importe quel agent disponible (votre conteneur Docker Jenkins)

    tools {
        // Assurez-vous que ces outils sont configurés dans Jenkins (Manage Jenkins > Tools)
        maven 'Maven' // Nom de l'installation Maven configurée dans Jenkins
        nodejs 'NodeJS' // Nom de l'installation NodeJS configurée dans Jenkins
    }

    environment {
        // Adresse IP de votre machine WSL que Jenkins doit atteindre.
        // Trouvez-la en exécutant 'ip addr show eth0' dans votre terminal WSL ou 'wsl hostname -I' dans PowerShell Windows.
        TARGET_WSL_IP = '172.31.92.36' // <<< À REMPLACER PAR L'IP RÉELLE DE VOTRE WSL
        ANSIBLE_USER = 'alhassaneba' // <<< À REMPLACER PAR VOTRE NOM D'UTILISATEUR WSL
        SSH_CREDENTIAL_ID = 'ssh-wsl-ansible' // L'ID du credential SSH que vous avez créé dans Jenkins

        // Chemin de base sur votre WSL où les artefacts seront copiés par Jenkins
        // Doit correspondre à 'linux_base_deploy_path' dans votre deploy.yml
        WSL_BASE_DEPLOY_PATH = '/home/alhassaneba/document/web/full-stack/hybrid-api-deployment' // <<< À REMPLACER PAR VOTRE CHEMIN RÉEL

        // Noms des fichiers/dossiers après le build Jenkins
        SPRING_BOOT_JAR_FILENAME = 'hybrid-api-0.0.1-SNAPSHOT.jar' // Nom exact du JAR après le build
        ANGULAR_DIST_BROWSER_DIR = 'my-projet/browser' // Chemin relatif du dossier 'browser' dans dist

        // Chemins sources des artefacts dans l'espace de travail Jenkins
        JENKINS_SPRING_BOOT_JAR_PATH = "hybrid-api-backend/target/${SPRING_BOOT_JAR_FILENAME}"
        JENKINS_ANGULAR_DIST_PATH = "hybrid-api-front/dist/${ANGULAR_DIST_BROWSER_DIR}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Assurez-vous que l'ID du credential GitHub est correct
                git branch: 'second-deployment-with-ansible_and_jenskin', credentialsId: 'github-pat-for-ci', url: 'https://github.com/baAlhassane/full-stack-hybrid-api'
            }
        }

        stage('Build Angular Frontend') {
            steps {
                dir('hybrid-api-front') {
                    withEnv([
                        "PATH+NODE=${tool 'NodeJS'}", // S'assure que 'node' et 'npm' sont dans le PATH
                        // Définir CHROME_BIN via Puppeteer
                        "CHROME_BIN=${sh(script: 'node -e "console.log(require(\'puppeteer\').executablePath())"', returnStdout: true).trim()}"
                    ]) {
                        sh 'npm install'
                        // Modifier la commande de test.
                        // On garde --browsers=ChromeHeadless
                        // Et on ajoute une nouvelle variable d'environnement pour passer les flags au navigateur.
                        sh 'KARMA_CHROME_FLAGS="--no-sandbox --disable-dev-shm-usage --disable-gpu" npm test -- --no-watch --browsers=ChromeHeadless'
                        sh 'npm run build' // N'oubliez pas le build final de l'application Angular
                    }
                }
            }
        }

        stage('Build Spring Boot Backend') {
            steps {
                dir('hybrid-api-backend') { // Navigue dans le répertoire 'hybrid-api-backend'
                    sh 'mvn clean install -DskipTests' // Compile le backend Spring Boot, saute les tests ici car un stage dédié les fera
                }
            }
        }

        stage('Run Spring Boot Tests') {
            steps {
                dir('hybrid-api-backend') {
                    sh 'mvn test' // Exécute les tests unitaires et d'intégration Spring Boot
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                // Archive le JAR Spring Boot pour qu'il soit disponible après le build
                archiveArtifacts artifacts: JENKINS_SPRING_BOOT_JAR_PATH, fingerprint: true
                // Archive les fichiers Angular
                archiveArtifacts artifacts: "${JENKINS_ANGULAR_DIST_PATH}/**", fingerprint: true
            }
        }
// Jenkinsfile
// ... (autres stages) ...

stage('Copy Artifacts to WSL for Ansible') {
    steps {
        withEnv([]) {
            script {
                withCredentials([sshUserPrivateKey(credentialsId: 'ssh-wsl-ansible', keyFileVariable: 'ANSIBLE_SSH_KEY_PATH')]) {
                    echo "Création des répertoires cibles sur WSL pour les artefacts..."
                    sshCommand remote: [
                        name: 'wsl-target',
                        host: '172.31.92.36',
                        user: 'alhassaneba', // Assurez-vous que c'est bien 'user' et non 'username'
                        port: 22,
                        knownHosts: credentials('wsl-known-hosts') // <-- AJOUTEZ CETTE LIGNE
                    ], command: "mkdir -p /home/alhassaneba/document/web/full-stack/hybrid-api-deployment/jenskins-artefacts"

                    // Si vous utilisez sshPublisher pour le transfert réel des fichiers,
                    // assurez-vous de faire la même modification ici :
                    // sshPublisher(publishers: [
                    //     sshPublisherDesc(
                    //         configName: 'wsl-target',
                    //         transfers: [
                    //             sshTransfer(
                    //                 sourceFiles: 'hybrid-api-front/dist/**/*',
                    //                 removePrefix: 'hybrid-api-front/dist',
                    //                 remoteDirectory: '/home/alhassaneba/document/web/full-stack/hybrid-api-deployment/jenskins-artefacts/frontend'
                    //             ),
                    //             sshTransfer(
                    //                 sourceFiles: 'hybrid-api-back/target/*.jar',
                    //                 removePrefix: 'hybrid-api-back/target',
                    //                 remoteDirectory: '/home/alhassaneba/document/web/full-stack/hybrid-api-deployment/jenskins-artefacts/backend'
                    //             )
                    //         ],
                    //         execCommand: '',
                    //         knownHosts: credentials('wsl-known-hosts') // <-- AJOUTEZ CETTE LIGNE AUSSI
                    //     )
                    // ])
                }
            }
        }
    }
}

// ... (autres stages) ...

        // stage('Copy Artifacts to WSL for Ansible') {
        //     steps {
        //         script {
        //             // Utiliser withCredentials pour injecter la clé SSH de manière sécurisée
        //             withCredentials([sshUserPrivateKey(credentialsId: env.SSH_CREDENTIAL_ID, keyFileVariable: 'ANSIBLE_SSH_KEY_PATH')]) {

        //                 // Créer les répertoires cibles sur WSL si non existants
        //                 echo "Création des répertoires cibles sur WSL pour les artefacts..."
        //                 sshCommand remote: [host: env.TARGET_WSL_IP, port: 22, username: env.ANSIBLE_USER, credentialsId: env.SSH_CREDENTIAL_ID], command: """
        //                     mkdir -p "${env.WSL_BASE_DEPLOY_PATH}/hybrid-api-backend/target"
        //                     mkdir -p "${env.WSL_BASE_DEPLOY_PATH}/hybrid-api-front/dist/${env.ANGULAR_DIST_BROWSER_DIR}"
        //                 """

        //                 // Copier le JAR Spring Boot vers le chemin source attendu par Ansible sur WSL
        //                 echo "Copie du JAR Spring Boot vers WSL: ${env.WSL_BASE_DEPLOY_PATH}/hybrid-api-backend/target/${env.SPRING_BOOT_JAR_FILENAME}"
        //                 sshPut remote: [host: env.TARGET_WSL_IP, port: 22, username: env.ANSIBLE_USER, credentialsId: env.SSH_CREDENTIAL_ID],
        //                         from: JENKINS_SPRING_BOOT_JAR_PATH, to: "${env.WSL_BASE_DEPLOY_PATH}/hybrid-api-backend/target/${env.SPRING_BOOT_JAR_FILENAME}"

        //                 // Compresser les fichiers Angular localement, puis les copier et les décompresser sur WSL
        //                 echo "Compression et copie des fichiers Angular vers WSL..."
        //                 sh "zip -r angular_dist.zip ${JENKINS_ANGULAR_DIST_PATH}"
        //                 sshPut remote: [host: env.TARGET_WSL_IP, port: 22, username: env.ANSIBLE_USER, credentialsId: env.SSH_CREDENTIAL_ID],
        //                         from: 'angular_dist.zip', to: "${env.WSL_BASE_DEPLOY_PATH}/hybrid-api-front/dist/${env.ANGULAR_DIST_BROWSER_DIR}/angular_dist.zip"
        //                 sshCommand remote: [host: env.TARGET_WSL_IP, port: 22, username: env.ANSIBLE_USER, credentialsId: env.SSH_CREDENTIAL_ID], command: """
        //                     cd "${env.WSL_BASE_DEPLOY_PATH}/hybrid-api-front/dist/${env.ANGULAR_DIST_BROWSER_DIR}"
        //                     unzip -o angular_dist.zip -d ./
        //                     rm angular_dist.zip
        //                 """
        //                 sh 'rm angular_dist.zip' // Nettoyer le fichier zip localement dans Jenkins workspace
        //             }
        //         }
        //     }
        // }

        stage('Run Ansible Deployment') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: env.SSH_CREDENTIAL_ID, keyFileVariable: 'ANSIBLE_SSH_KEY_PATH')]) {
                        echo "Exécution du playbook Ansible sur WSL..."
                        // Exécuter le playbook Ansible sur la machine WSL.
                        // Les chemins sont maintenant corrects selon votre structure.
                        sshCommand remote: [host: env.TARGET_WSL_IP, port: 22, username: env.ANSIBLE_USER, credentialsId: env.SSH_CREDENTIAL_ID], command: """
                            cd "${env.WSL_BASE_DEPLOY_PATH}/ansible-config" # Navigue vers le dossier ansible-config
                            ansible-playbook -i inventory/hosts.ini playbooks/deploy_local_with_jenskin_ansible.yaml
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé.'
        }
        success {
            echo 'Pipeline de CI/CD réussi ! Application déployée.'
        }
        failure {
            echo 'Pipeline de CI/CD échoué. Veuillez vérifier les logs.'
        }
        // cleanWs() // Décommenter pour nettoyer l'espace de travail après chaque build
    }
}
