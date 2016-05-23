///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
///<reference path="app.component.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./app.component";
import {MessageService} from "./messages/message.service";
import {ROUTER_PROVIDERS} from "angular2/router";

bootstrap(AppComponent, [MessageService, ROUTER_PROVIDERS]);