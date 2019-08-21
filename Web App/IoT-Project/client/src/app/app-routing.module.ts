import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
import { AddDeviceComponent } from './components/main/add-device/add-device.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';

const routes: Routes = [
    { path: '', component: HomeComponent, children: [
        {path: 'login', component: LoginComponent},
        {path: 'signup', component: SignupComponent}
    ]},
    { path: ':uid', component: MainComponent, canActivate: [AuthGuard] ,children: [
        { path: 'dashboard', component: DashboardComponent},
        { path: 'adddevice', component: AddDeviceComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ DashboardComponent, AddDeviceComponent, MainComponent, HomeComponent, SignupComponent ];