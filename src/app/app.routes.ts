import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page';
import { LoginPage } from './components/login-page/login-page';
import { authGuard } from './core/guard/auth-guard';
import { ProfilePage } from './components/profile-page/profile-page';
import { StatsPage } from './components/stats-page/stats-page';
import { Component } from '@angular/core';
import { TypePage } from './components/type-page/type-page';

export const routes: Routes = [
    {path:'', component: HomePage},
    {path:'login', component: LoginPage},
    {path: 'profile', component: ProfilePage, canActivate:[authGuard]},
    {path: 'stats', component: StatsPage, },
    {path: 'typing', component: TypePage, canActivate:[authGuard]},
];
