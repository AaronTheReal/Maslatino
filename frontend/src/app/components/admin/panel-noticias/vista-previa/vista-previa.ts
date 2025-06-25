import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vista-previa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-previa.html',
  styleUrls: ['./vista-previa.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class VistaPrevia {
  @Input() data!: {
    title: string;
    summary: string;
    location: { city: string; region: string; country: string; };
    publishAt: string | null;
    content: Array<{
      type: string;
      // para bloques de texto:
      html?: string;
      style?: { fontSize?: string; fontWeight?: string; fontFamily?: string };
      // los demás campos que ya tenías…
      text?: string;
      url?: string;
      alt?: string;
      caption?: string;
      quote?: string;
      authorQuote?: string;
      ordered?: boolean;
      items?: string[];
      /** elementos de lista convertidos a HTML */
      itemsHtml?: string[];
      href?: string;
      textLink?: string;
    }>;
  };
}
