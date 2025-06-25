import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vista-previa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-previa.html',
  styleUrls: ['./vista-previa.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VistaPrevia {
  @Input() data!: {
    title: string;
    summary: string;
    location: { city: string; region: string; country: string; };
    publishAt: string | null;
    content: any[];
  };
}
