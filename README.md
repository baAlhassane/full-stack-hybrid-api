# Hybride-api
Ce projet est un projet full stack avec Spring Boot et Angular. 
Il développe une application qui fait coresspondre les fournisseurs de service ou de job(les providents) et les travilleurs ou demandeurs de services(jobber).

La stratégie utilisée pour le stockage des utilisateurs en bases de données est le @Inheritance(strategy = InheritanceType.SINGLE_TABLE). C'est une une base de donnée unique pour les utilisateurs.
En plus des roles , il y'au un attribut discriminatoire qui indique le type d'utlisateur. 

## 📝 Description

Ce projet est une plateforme web permettant de mettre en relation des prestataires (jobbers) et des clients.
Les utilisateurs peuvent :
- S'inscrire via OAuth2 ou email/mot de passe
- Rechercher des prestataires par domaine
- Poster ou postuler à des annonces


## 🚀 Fonctionnalités

- Authentification et/ou Inscription OAuth2 et JWT
- Espace de discussion entre les utilisaturs (avec Kafka)
- poster des offres et postuler à des offres , négocier sur les tarif horaires
- Tableau de bord personnalisé pour chaque rôle
- Intégration d’une API tierce (ex: Google Maps ou Leaflet)
- Backend REST sécurisé
- Un dashbord pour le visualisation des tendances avec cahrtJS


## 🛠️ Stack technique

### Frontend
- Angular 17
- RxJS
- PrimeNG
- Les signaux d'angular
- Test frontend avec  Karma + Puppeteer + Chrome Headless

### Backend
- Spring Boot 3.3
- Spring Security (OAuth2 + JWT)
- Lombock 
- PostgreSQL
- Hibernate/JPA
- Kafka
- test Unitaire JUnit( en mode Skip d'abord)

### Déploiement
- Docker & Docker Compose
- Kubernetes (Skaffold)
- Http-server pour le déploiement 
- Ansible pour le déploiment 
- Jenkins pour le  CI/CD
- Kubernetes pour l'infrastructure 
- WSL(pour les déploiement local) et VirtualBox poutr les envirionnment opérationnel , hautement disponible
- Script shell lunix( pour le démarage de certain processus en arrienre plan)


### Struture du github 
Ce projet contient 3 branches à ce stade : 
- La branche master : est une branche clasique du projet. Code sans stack de déploement 
- La brache firts-deployment-with-ansible: est une brache juste pour déployer avec ansible du code de la branche master. Ansible est  
  instanllé dans WSL. Et donc le déploiement est dans WSL
- La brache second-deployment-with-ansible_and_jenskin : C'est une baranche qui intègre jenkins dans le projet. Jenkins clone le code , 
  le buide et le transmet à Ansible et ansible le déploie.
- Third-deployment-with-ansible_jenkins_and_k8s : est une branhe qui contient le code du déploiment avec ansible, jenkins et kubernetes
  Est en cours de développment. Ici ansible ne va pa gérer le déploiement. Il va servir de provisionner des serveur pour l'infrasture de k8s. 
- Forth-deployment-with-ansible_jenkins_and_k8s-kafka( à venir)


Je suis entrain de mettre en place l'intégration des outils de déploiment et d'infrastruture pour ensuite continuer le développment. En mode CI/CD. 



