import {Component} from 'angular2/core';
import {SignupComponent} from "./signup.component";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {SigninComponent} from "./signin.component";
import {LogoutComponent} from "./logout.component";

@Component({
    selector: 'my-auth',
    template: `
        <header class="row spacing">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs">
                    <li><a [routerLink]="['Signin']">Signin</a></li>
                    <li><a [routerLink]="['Signup']">Signup</a></li>
                    <li><a [routerLink]="['Logout']">Logout</a></li>
                </ul>        
            </nav>
        </header>
        <div class="row spacing">
            <router-outlet></router-outlet>
        
        </div>
    `,
    directives: [ROUTER_DIRECTIVES, SignupComponent],
    styles: [`
        .router-link-active {
            cursor: default;
            color: ghostwhite;
            background-color: lightslategrey;
            border: 1px solid #ddd;
            border-bottom-color: dodgerblue;
        }
    `]
})

@RouteConfig([
    {path: '/signin', name: 'Signin', component: SigninComponent, useAsDefault: true},
    {path: '/signup', name: 'Signup', component: SignupComponent},
    {path: '/logout', name: 'Logout', component: LogoutComponent}
])

export class AuthenticationComponent {

}