import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrl: './app.component.css',
  template: `
    <form class="form" [formGroup]="form" (ngSubmit)="save()">
      <input placeholder="Tu nombre" type="text" formControlName="name" />
      <button type="submit">Guardar</button>
    </form>
  `,
})
export class AppComponent {
  private _formBuilder = inject(FormBuilder);

  form = this._formBuilder.group({
    name: this._formBuilder.control(''),
  });

  save() {
    console.log(this.form.value);
  }
}
