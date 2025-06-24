// src/app/components/individual/play-ind/play-ind.component.ts
import { Component, Input, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-play-ind',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './play-ind.component.html',
  styleUrls: ['./play-ind.component.scss'],
})
export class PlayIndComponent  {
 
}
