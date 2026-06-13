import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Auth } from './features/auth/auth';
import { Profile } from './features/profile/profile';
import { AuthService } from './core/service/auth/auth-service';
import { Stats } from './features/stats/stats';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'login', component: Auth},
    {path: 'profile', component: Profile,
        canActivate: [AuthService]
    },
    {path: 'stats', component: Stats}
];
