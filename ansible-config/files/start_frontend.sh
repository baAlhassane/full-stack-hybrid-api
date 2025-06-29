#!/bin/bash

# Définissez le chemin complet de votre dossier 'dist' Angular
ANGULAR_DIST_PATH="/home/alhassaneba/document/web/full-stack/hybrid-api-deployment/hybrid-api-front/dist/my-projet/browser"

# Définissez le port pour le frontend Angular
FRONTEND_PORT="4200"

# Définissez le chemin pour le fichier de log
LOG_PATH="/home/alhassaneba/document/web/full-stack/hybrid-api-deployment/frontend.log"

# Chemin exact vers l'exécutable http-server
HTTP_SERVER_EXEC="/usr/local/bin/http-server"

# Tuez les processus existants sur le port du frontend.
# Cette commande est plus robuste pour tuer le processus Node.js derrière http-server.
pkill -f "node.*${FRONTEND_PORT}" || true

# Assurez-vous que http-server est installé globalement.
# Cela garantit qu'il est là au cas où il serait supprimé ou dans un nouvel environnement.
npm install -g http-server

# Définissez le PATH pour nohup afin qu'il puisse trouver http-server.
# C'est la MODIFICATION CLÉ qui devrait résoudre le problème de lancement automatique.
export PATH=$PATH:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin

# Lancer l'application Angular avec http-server en arrière-plan
# Le chemin absolu est déjà utilisé, mais s'assurer que le PATH est exporté aide nohup.
nohup "$HTTP_SERVER_EXEC" "$ANGULAR_DIST_PATH" -p "$FRONTEND_PORT" -c-1 > "$LOG_PATH" 2>&1 &

echo "Angular frontend lancé sur le port $FRONTEND_PORT. Les logs sont dans $LOG_PATH"