import { Component, NgModule  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../app/components/shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../app/components/shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavBarComponent,FooterComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'maslatino';
}
