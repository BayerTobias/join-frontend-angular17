import { Component } from '@angular/core';
import { SummaryCardComponent } from '../../../shared/components/summary-card/summary-card.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [SummaryCardComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {}
