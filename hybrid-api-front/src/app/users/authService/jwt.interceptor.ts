import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('hybrid_api_usre_token');

  // 1. LISTE DES ROUTES À EXCLURE (ne pas envoyer de token)
  const isAuthRoute = req.url.includes('/auth/login') || req.url.includes('/auth/register');

  // 2. On n'ajoute le token QUE si on l'a ET que ce n'est pas une route d'auth
  if (token && !isAuthRoute) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
