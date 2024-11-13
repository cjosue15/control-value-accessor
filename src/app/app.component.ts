import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { InputAgeComponent } from './input-age.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, InputAgeComponent, JsonPipe],
  styleUrl: './app.component.css',
  template: `
    <form class="form" [formGroup]="form" (ngSubmit)="save()">
      <input placeholder="Tu nombre" type="text" formControlName="name" />
      <input-age [maxLength]="max" formControlName="age" />
      <button type="submit">Guardar</button>
    </form>

    <div>
      <p>Value: {{ ageControl?.value }}</p>
    </div>
    <div>
      <p>Valid: {{ ageControl?.valid }}</p>
      <p>Errors: {{ ageControl?.errors | json }}</p>
    </div>

    <button (click)="changeLength()">Change Length</button>
  `,
})
export class AppComponent {
  private _formBuilder = inject(FormBuilder);

  max = 5;

  get ageControl() {
    return this.form.get('age');
  }

  form = this._formBuilder.group({
    name: this._formBuilder.control(''),
    age: this._formBuilder.control('30'),
  });

  constructor() {}

  save() {
    console.log(this.form.value);
  }

  changeLength() {
    this.max = 10;
  }
}
