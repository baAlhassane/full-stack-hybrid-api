# --- Étape 1 : Build de l'application Angular ---
# Utilise une image Node.js pour compiler l'application Angular.
FROM node:18-alpine AS build

# Définit le répertoire de travail dans le conteneur pour le build.
WORKDIR /app

# Copie les fichiers package.json et package-lock.json (ou yarn.lock) pour installer les dépendances.
# Cela permet de mettre en cache les dépendances si ces fichiers ne changent pas.
COPY package.json package-lock.json ./

# Installe les dépendances Node.js.
RUN npm install

# Copie le reste du code source de l'application Angular.
COPY . .

# Construit l'application Angular en mode production.
# '--configuration production' assure que toutes les optimisations sont appliquées.
# '--output-path ./dist' spécifie le dossier de sortie des fichiers buildés.
RUN npm run build -- --configuration production --output-path ./dist

# --- Étape 2 : Serveur Nginx pour servir l'application ---
# Utilise une image Nginx légère pour servir les fichiers statiques.
FROM nginx:alpine AS serve

# Copie les fichiers buildés d'Angular depuis l'étape 'build' vers le répertoire de service de Nginx.
# '/usr/share/nginx/html' est le répertoire par défaut de Nginx pour les fichiers web.
COPY --from=build /app/dist /usr/share/nginx/html

# Copie un fichier de configuration Nginx personnalisé (si vous en avez un).
# Ce fichier est optionnel, mais souvent utile pour la gestion du routage Angular (fallback à index.html).
# Si vous n'avez pas de nginx.conf personnalisé, vous pouvez commenter cette ligne.
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose le port 80, qui est le port par défaut de Nginx.
EXPOSE 80
 
# La commande par défaut de Nginx démarre le serveur.
CMD ["nginx", "-g", "daemon off;"]

# Informations sur le mainteneur de l'image (optionnel)
LABEL maintainer="alhassaneba"
