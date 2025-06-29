export default {
  "/api/hybrid-api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
  ,
  "/oauth2": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
}

// export default [
//   {
//     context: ["/api"],
//     target: "http://localhost:8080",
//     secure: false,
//     changeOrigin: true
//   }
// ];
