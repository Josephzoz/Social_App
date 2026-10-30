import { Routes } from '@angular/router';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { LoginComponent } from './features/login/login/login.component';
import { RegisterComponent } from './features/register/register/register.component';
import { MainlayoutComponent } from './layouts/mainlayout/mainlayout.component';
import { authGuard } from './core/guards/Auth/auth-guard';
import { guestGuard } from './core/guards/Guset/guest-guard';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'',component:AuthlayoutComponent,canActivate:[guestGuard],children:[
        {path:'login',component:LoginComponent,title:'Route Social | Login'},
        {path:'register',component:RegisterComponent,title:'Route Social | Register'}
    ]},
    {path:'',component:MainlayoutComponent,canActivate:[authGuard],children:[
        {path:'feed',loadComponent:()=>import('./features/feed/feed/feed.component').then((c)=>c.FeedComponent),title:'Route Social | Feed',children:[
            {path:'',loadComponent:()=>import('./features/feed/components/Feed-posts/feed-posts/feed-posts.component').then((c)=>c.FeedPostsComponent)},
            {path:'myposts',loadComponent:()=>import('./features/feed/components/My-posts/my-posts/my-posts.component').then((c)=>c.MyPostsComponent)},
            {path:'community',loadComponent:()=>import('./features/feed/components/Community/community/community.component').then((c)=>c.CommunityComponent)},
            {path:'saved',loadComponent:()=>import('./features/feed/components/Saved/saved/saved.component').then((c)=>c.SavedComponent)},
        ]},
        {path:'profile',loadComponent:()=>import('./features/profile/profile/profile.component').then((c)=>c.ProfileComponent),title:'Route Social | Profile'},
        {path:'postdetails/:id',loadComponent:()=>import('./shared/components/PostDetails/postdetails/postdetails.component').then((c)=>c.PostdetailsComponent),title:'Route Social | Post Details'},
        {path:'notifications',loadComponent:()=>import('./features/notifications/notifications/notifications.component').then((c)=>c.NotificationsComponent),title:'Route Social | Notifications'},
        {path:'settings',loadComponent:()=>import('./features/Settings/settings/settings.component').then((c)=>c.SettingsComponent),title:'Change Password | Route Social'},
    ]},
    {path:'**',loadComponent:()=>import('./features/Wildcard/wildcard/wildcard.component').then((c)=>c.WildcardComponent),title:'Route Social | Error 404'}
];
