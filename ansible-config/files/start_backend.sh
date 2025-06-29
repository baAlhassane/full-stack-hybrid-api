#!/bin/bash

# Chemin complet de votre fichier JAR
JAR_PATH="/home/alhassaneba/document/web/full-stack/hybrid-api-deployment/hybrid-api-backend/target/hybrid-api-0.0.1-SNAPSHOT.jar"

# Chemin pour le fichier de log du backend
LOG_PATH="/home/alhassaneba/document/web/full-stack/hybrid-api-deployment/backend.log"

# Arrêter les processus Java existants utilisant le port 8080
fuser -k 8080/tcp || true

# Lancer l'application Spring Boot en arrière-plan
nohup java -jar "$JAR_PATH" > "$LOG_PATH" 2>&1 &

echo "Spring Boot backend lancé. Les logs sont dans $LOG_PATH"