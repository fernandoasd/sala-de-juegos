import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const logueadoGuard: CanActivateFn = (route, state) => {
const auth = inject(AuthService);
const router = inject(Router);

if (auth.usuarioActual === null) {
    router.navigateByUrl("/login")
    return false;
  } else {
    return true;
  }
};
