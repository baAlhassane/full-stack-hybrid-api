export default {
  "/api/hybrid-api": {
    // La cible est la racine de l'adresse, pas le chemin complet de l'API.
    // Cela correspond au port que vous ouvrez avec `kubectl port-forward`.
    "target": "http://127.0.0.1:30081",
    
    // Pour contourner les problèmes de CORS.
    "secure": false,
    "changeOrigin": true,
    
    // Pour afficher les logs de ce proxy dans votre terminal.
    "logLevel": "debug",

 
  }
};




// export default {
//   "/api/hybrid-api": {
//     target: "http://127.0.0.1:30081/api/hybrid-api",
//     secure: false,
//     changeOrigin: true,
//     logLevel: "debug"
//   }
// };

// export default [
//   {
//     context: ["/api"],
//     target: "http://localhost:8080",
//     secure: false,
//     changeOrigin: true
//   }
// ];
