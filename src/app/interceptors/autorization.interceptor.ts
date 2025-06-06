import { HttpInterceptorFn } from '@angular/common/http';

export const autorizationInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Auth Interceptor");
  console.log("-> Request:  ",req);
  const newReq = req.clone({
    headers: req.headers.append("Authorizacion", "auth......."),
  });


  /////////////////////////////////////////// GENERA ERROR CORS
  
  return next(newReq);
};
