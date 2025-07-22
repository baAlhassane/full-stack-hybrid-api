# Utilise une image de base OpenJDK pour Java 17.
# C'est une image légère qui contient juste le nécessaire pour exécuter des applications Java.
FROM openjdk:17-jdk-slim

# Définit le répertoire de travail dans le conteneur.
# Toutes les commandes suivantes seront exécutées à partir de ce répertoire.
WORKDIR /app

# Copie le fichier JAR de l'application Spring Boot buildé.
# Le chemin 'target/*.jar' suppose que votre build Maven a créé le JAR dans le dossier 'target'.
# Le nom 'app.jar' est un nom générique pour le JAR à l'intérieur du conteneur.
COPY target/*.jar app.jar

# Expose le port sur lequel l'application Spring Boot écoutera.
# Assurez-vous que ce port correspond au 'server.port' configuré dans votre application Spring Boot (8081).
EXPOSE 8081

# Définit la commande à exécuter lorsque le conteneur démarre.
# 'java -jar app.jar' lance l'application Spring Boot.
ENTRYPOINT ["java", "-jar", "app.jar"]

# Informations sur le mainteneur de l'image (optionnel)
LABEL maintainer="alhassaneba"
