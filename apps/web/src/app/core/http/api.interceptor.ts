import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const isApiCall = !req.url.startsWith('http') || req.url.startsWith(environment.apiBase);

  if (!isApiCall) return next(req);

  const token = auth.getAccessToken();
  let url = req.url;
  if (!url.startsWith('http')) {
    url = `${environment.apiBase.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
  }

  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  return next(req.clone({ url, setHeaders: headers }));
};
