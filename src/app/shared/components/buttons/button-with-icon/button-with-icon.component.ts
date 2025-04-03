import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-with-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-with-icon.component.html',
  styleUrl: './button-with-icon.component.scss',
})
export class ButtonWithIconComponent {
  @Input() colorStyle: string = '';
  @Input() content: string = '';
  @Input() height: string = '';
  @Input() width: string = '';
  @Input() fontSize: string = '21px';
  @Input() fontWeight: string = '';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() iconOnly: boolean = false;
  @Input() imgHeight?: number;
  @Input() imgWidth?: number;

  @Input() imgSrc: string = '';

  @Output() submitEvent = new EventEmitter<void>();

  submit() {
    this.submitEvent.emit();
  }

  /**
   * Returns the style object based on the component's properties.
   * @returns An object containing CSS styles for the component.
   */
  getStyle() {
    return {
      height: this.height,
      width: this.width,
      'font-size': this.fontSize,
      'font-weight': this.fontWeight,
    };
  }
}
