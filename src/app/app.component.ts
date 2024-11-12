import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputAgeComponent } from './input-age.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, InputAgeComponent],
  styleUrl: './app.component.css',
  template: `
    <form class="form" [formGroup]="form" (ngSubmit)="save()">
      <input placeholder="Tu nombre" type="text" formControlName="name" />
      <input-age formControlName="age" />
      <button type="submit">Guardar</button>
    </form>

    <div>
      <p>Value: {{ ageControl?.value }}</p>
    </div>
  `,
})
export class AppComponent {
  private _formBuilder = inject(FormBuilder);

  get ageControl() {
    return this.form.get('age');
  }

  form = this._formBuilder.group({
    name: this._formBuilder.control(''),
    age: this._formBuilder.control('30'),
  });

  constructor() {
    this.ageControl?.disable();
  }

  save() {
    console.log(this.form.value);
  }
}
