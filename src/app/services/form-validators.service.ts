import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorsService {

  constructor() { 

  }
  validarTipoNombre(control: AbstractControl): ValidationErrors | null{
    console.log(control.value);
    
    return null;
  }

}
