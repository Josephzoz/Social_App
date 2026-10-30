import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wildcard',
  imports: [NavbarComponent, RouterLink],
  templateUrl: './wildcard.component.html',
  styleUrl: './wildcard.component.css',
})
export class WildcardComponent {}
