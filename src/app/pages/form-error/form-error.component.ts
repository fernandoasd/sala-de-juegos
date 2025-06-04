import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  imports: [CommonModule],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css'
})
export class FormErrorComponent {
  control = input<FormControl | undefined>();
  nombre = input<string>("");
}
