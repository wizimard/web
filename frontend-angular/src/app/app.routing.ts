import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { StudentComponent } from "@/student/student.component";
import { PizzaComponent } from '@/pizza/pizza.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'students', component: StudentComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
		{ path: 'pizza', component: PizzaComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
