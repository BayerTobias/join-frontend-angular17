import { Component } from '@angular/core';
import { ButtonWithIconComponent } from '../../../shared/components/buttons/button-with-icon/button-with-icon.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ButtonWithIconComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {}
