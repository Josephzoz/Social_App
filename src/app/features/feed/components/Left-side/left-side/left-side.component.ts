import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-left-side',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './left-side.component.html',
  styleUrl: './left-side.component.css',
})
export class LeftSideComponent {}
