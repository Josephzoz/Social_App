import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
;

@Component({
  selector: 'app-authlayout',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './authlayout.component.html',
  styleUrl: './authlayout.component.css',
})
export class AuthlayoutComponent {}
