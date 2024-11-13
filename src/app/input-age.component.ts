import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputAgeComponent),
  multi: true,
};

const NG_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => InputAgeComponent),
  multi: true,
};

@Component({
  standalone: true,
  selector: 'input-age',
  template: `
    <input
      type="text"
      placeholder="Tu edad"
      (input)="_onInput($event)"
      (blur)="_onBlur()"
      [disabled]="disabled()"
      #input
    />
  `,
  host: {
    '[attr.disabled]': 'disabled()',
    '[class.disabled]': 'disabled()',
  },
  styles: `
    .disabled {
        pointer-events: none;
        opacity: 0.5;
    }
  `,
  providers: [VALUE_ACCESSOR, NG_VALIDATOR],
})
export class InputAgeComponent implements ControlValueAccessor, Validator {
  // Add a maximum length input property
  private _maxLength: number | null = null;

  @Input() set maxLength(value: number | null) {
    this._maxLength = value;

    // Trigger validator change when maxLength changes
    this._onValidatorChange();
  }

  get maxLength(): number | null {
    return this._maxLength;
  }

  disabled = signal<boolean>(false);

  value = signal<string>('');

  inputElement = viewChild.required<ElementRef<HTMLInputElement>>('input');

  onChange: (value: string) => void = () => {};

  onTouched: () => void = () => {};

  private _onValidatorChange = () => {};

  _onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    let value = target.value;

    this.onChange(value);
  }

  _onBlur() {
    this.onTouched();
  }

  writeValue(age: string): void {
    this.value.set(age);
    this.inputElement().nativeElement.value = age;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!this.isValid(value)) {
      return { invalidAge: 'Age must contain only digits.' };
    }

    if (this.maxLength !== null && value.length > this.maxLength) {
      return {
        maxLengthExceeded: `Age must be at most ${this.maxLength} characters long.`,
      };
    }

    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this._onValidatorChange = fn;
  }

  private isValid(value: string): boolean {
    const regex = /^\d+$/;
    return regex.test(value);
  }
}
