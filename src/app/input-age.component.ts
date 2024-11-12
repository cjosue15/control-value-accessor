import {
  Component,
  ElementRef,
  forwardRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
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
  providers: [VALUE_ACCESSOR],
})
export class InputAgeComponent implements ControlValueAccessor {
  disabled = signal<boolean>(false);

  value = signal<string>('');

  inputElement = viewChild.required<ElementRef<HTMLInputElement>>('input');

  onChange: (value: string) => void = () => {};

  onTouched: () => void = () => {};

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
}
