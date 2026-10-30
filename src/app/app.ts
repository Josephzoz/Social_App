import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './features/register/register/register.component';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { MainlayoutComponent } from './layouts/mainlayout/mainlayout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Social_App');
}
