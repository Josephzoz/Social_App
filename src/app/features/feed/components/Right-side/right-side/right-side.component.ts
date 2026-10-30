import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../../core/services/Auth/auth.service';
import { IFollowers } from '../../../../../core/models/ifollowers.interface';

@Component({
  selector: 'app-right-side',
  imports: [],
  templateUrl: './right-side.component.html',
  styleUrl: './right-side.component.css',
})
export class RightSideComponent implements OnInit {
  private _AuthService = inject(AuthService);

  followers=signal<IFollowers[]>([])

  ngOnInit(): void {
    this.followSuggestion()
  }

  followSuggestion(){
    this._AuthService.GetFollowSuggestions().subscribe({
      next:(res)=>{
        console.log(res)
        this.followers.set(res.data.suggestions)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
