# Étape 1 : Build de l'application Angular
FROM node:18-alpine AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances et les installer
COPY package*.json ./
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Construire l'application en mode production
#-- --configuration production

RUN npm run build -- --configuration production
# ---

# Étape 2 : Créer une image de débogage avec Nginx et Bash
FROM nginx:1.29.1-alpine

# Installer bash et les outils de débogage (apk est le gestionnaire de paquets d'Alpine)
RUN apk add --no-cache bash

# Copier le fichier de configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers de build de l'application Angular
# Assurez-vous que le chemin est correct. D'après notre dernière conversation, c'est `dist/my-projet/browser`.
COPY --from=builder /app/dist/my-projet/browser /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html
# Exposer le port par défaut de Nginx
EXPOSE 80

# La commande de démarrage de Nginx qui maintient le conteneur en vie
CMD ["nginx", "-g", "daemon off;"]





# # Étape 1: Créer l'application
# # Utiliser une image de Node.js pour construire l'application frontend.
# FROM node:18-alpine AS builder

# # Définir le répertoire de travail dans le conteneur.
# WORKDIR /app

# # Copier le package.json et le package-lock.json pour installer les dépendances.
# COPY package*.json ./

# # Installer les dépendances.
# RUN npm install

# # Copier le reste du code source de l'application.
# COPY . .

# # Exécuter la commande de build de votre application.
# RUN npm run build

# # Étape 2: Construire l'image finale avec Nginx
# # Utiliser une image Nginx légère pour servir les fichiers statiques.
# FROM nginx:alpine

# # Copier les fichiers statiques de votre application (le résultat de l'étape de build)
# # vers le répertoire par défaut de Nginx.
# COPY --from=builder /app/dist/my-projet/browser /usr/share/nginx/html

# # Copier le fichier de configuration Nginx dans le répertoire de configuration de Nginx
# # C'est la ligne qui manquait !
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Exposer le port par défaut de Nginx.
# EXPOSE 80

# # La commande par défaut de l'image Nginx démarre le serveur.
# CMD ["nginx", "-g", "daemon off;"]













# # Étape 1: Créer l'application
# # Utiliser une image de Node.js pour construire l'application frontend.
# FROM node:18-alpine AS builder

# # Définir le répertoire de travail dans le conteneur.
# WORKDIR /app

# # Copier le package.json et le package-lock.json pour installer les dépendances.
# COPY package*.json ./

# # Installer les dépendances.
# RUN npm install

# # Copier le reste du code source de l'application.
# COPY . .

# # Exécuter la commande de build de votre application.
# RUN npm run build

# # Étape 2: Construire l'image finale avec Nginx
# # Utiliser une image Nginx légère pour servir les fichiers statiques.
# FROM nginx:alpine

# # Copier les fichiers statiques de votre application (le résultat de l'étape de build)
# # vers le répertoire par défaut de Nginx. Le chemin a été corrigé précédemment.
# COPY --from=builder /app/dist/my-projet/browser /usr/share/nginx/html

# # Exposer le port par défaut de Nginx.
# EXPOSE 80

# # La commande par défaut de l'image Nginx démarre le serveur.
# CMD ["nginx", "-g", "daemon off;"]




# # Stage 1: Build l'application Angular
# FROM node:18-alpine AS build

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm install

# COPY . .

# RUN npm run build -- --configuration production --output-path ./dist

# # ---

# # Stage 2: Sert l'application avec Nginx
# FROM nginx:alpine

# # Copie le fichier de configuration Nginx, si vous en avez un.
# # COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Copie les fichiers buildés d'Angular depuis l'étape 'build'
# COPY --from=build /app/dist /usr/share/nginx/html


#------------------------------------------------
# # --- Étape 2 : Serveur Nginx pour servir l'application ---
# # --- Étape 1 : Build de l'application Angular ---
# FROM node:18-alpine AS build
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build -- --configuration production --output-path ./dist

# # --- Étape 2 : Serveur Nginx pour servir l'application ---
# FROM nginx:alpine
# # Copie les fichiers buildés d'Angular.
# # Pas de --output-path ici, on laisse Angular utiliser sa configuration par défaut
# RUN npm run build -- --configuration production
# #COPY --from=build /app/dist/my-projet/browser /usr/share/nginx/html
# #COPY --from=build /app/dist /usr/share/nginx/html

# # COPY --from=build /app/dist/my-projet/browser /usr/share/nginx/html
# # Copie votre fichier de configuration Nginx personnalisé.
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
# LABEL maintainer="alhassaneba"




#------------------------------------------------

# # --- Étape 1 : Build de l'application Angular ---
# # Utilise une image Node.js pour compiler l'application Angular.
# FROM node:18-alpine AS build

# # Définit le répertoire de travail dans le conteneur pour le build.
# WORKDIR /app

# # Copie les fichiers package.json et package-lock.json (ou yarn.lock) pour installer les dépendances.
# # Cela permet de mettre en cache les dépendances si ces fichiers ne changent pas.
# COPY package.json package-lock.json ./

# # Installe les dépendances Node.js.
# RUN npm install

# # Copie le reste du code source de l'application Angular.
# COPY . .

# # Construit l'application Angular en mode production.
# # '--configuration production' assure que toutes les optimisations sont appliquées.
# # '--output-path ./dist' spécifie le dossier de sortie des fichiers buildés.
# RUN npm run build -- --configuration production --output-path ./dist

# # --- Étape 2 : Serveur Nginx pour servir l'application ---
# # Utilise une image Nginx légère pour servir les fichiers statiques.
# FROM nginx:alpine AS serve

# # Copie les fichiers buildés d'Angular depuis l'étape 'build' vers le répertoire de service de Nginx.
# # '/usr/share/nginx/html' est le répertoire par défaut de Nginx pour les fichiers web.
# COPY --from=build /app/dist /usr/share/nginx/html

# # Copie un fichier de configuration Nginx personnalisé (si vous en avez un).
# # Ce fichier est optionnel, mais souvent utile pour la gestion du routage Angular (fallback à index.html).
# # Si vous n'avez pas de nginx.conf personnalisé, vous pouvez commenter cette ligne.
# # COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Expose le port 80, qui est le port par défaut de Nginx.
# EXPOSE 80
 
# # La commande par défaut de Nginx démarre le serveur.
# CMD ["nginx", "-g", "daemon off;"]

# # Informations sur le mainteneur de l'image (optionnel)
# LABEL maintainer="alhassaneba"
