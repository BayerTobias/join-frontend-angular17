import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-wo-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-wo-icon.component.html',
  styleUrl: './button-wo-icon.component.scss',
})
export class ButtonWoIconComponent {
  @Input() colorStyle: string = '';
  @Input() content: string = '';
  @Input() height: string = '';
  @Input() width: string = '';
  @Input() fontSize: string = '16px';
  @Input() fontWeight: string = '';
  @Input() type: string = 'button';
  @Input() diasbled: boolean = false;

  getStyle(): any {
    return {
      height: this.height,
      width: this.width,
      'font-size': this.fontSize,
      'font-weight': this.fontWeight,
      // Weitere Styles können hier hinzugefügt werden
    };
  }
}
