var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("messages/message", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Message;
    return {
        setters:[],
        execute: function() {
            Message = (function () {
                // The ? behind the parameters in the constructor means,
                // that the values don't need to be available or presented.
                function Message(content, messageId, username, userId) {
                    this.content = content;
                    this.messageId = messageId;
                    this.username = username;
                    this.userId = userId;
                }
                return Message;
            }());
            exports_1("Message", Message);
        }
    }
});
System.register("messages/message.service", ["messages/message"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var message_1;
    var MessageService;
    return {
        setters:[
            function (message_1_1) {
                message_1 = message_1_1;
            }],
        execute: function() {
            MessageService = (function () {
                function MessageService() {
                    this.messages = [];
                }
                MessageService.prototype.addMessage = function (message) {
                    this.messages.push(message);
                    console.log(this.messages);
                };
                MessageService.prototype.getMessages = function () {
                    return this.messages;
                };
                MessageService.prototype.editMessage = function (message) {
                    this.messages[this.messages.indexOf(message)] = new message_1.Message('Edited', null, 'System');
                };
                MessageService.prototype.deleteMessage = function (message) {
                    this.messages.splice(this.messages.indexOf(message), 1);
                };
                return MessageService;
            }());
            exports_2("MessageService", MessageService);
        }
    }
});
System.register("messages/message.component", ["angular2/core", "messages/message", "messages/message.service"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_1, message_2, message_service_1;
    var MessageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (message_2_1) {
                message_2 = message_2_1;
            },
            function (message_service_1_1) {
                message_service_1 = message_service_1_1;
            }],
        execute: function() {
            MessageComponent = (function () {
                function MessageComponent(_messageService) {
                    this._messageService = _messageService;
                    this.editClicked = new core_1.EventEmitter();
                    this.show = true;
                }
                MessageComponent.prototype.onEdit = function () {
                    this._messageService.editMessage(this.message);
                    console.log('Edit button clicked!');
                };
                MessageComponent.prototype.onDelete = function () {
                    this._messageService.deleteMessage(this.message);
                    console.log('Delete button clicked!');
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', message_2.Message)
                ], MessageComponent.prototype, "message", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], MessageComponent.prototype, "editClicked", void 0);
                MessageComponent = __decorate([
                    core_1.Component({
                        selector: 'my-message',
                        template: "\n         <article class=\"panel panel-default\" *ngIf=\"show\">\n            <div class=\"panel-body\">\n                {{ message.content }}\n            </div>    \n            <footer class=\"panel-footer\">\n                <div class=\"author\">\n                {{ message.username }}\n                </div>\n                <div class=\"config\">\n                    <a (click)=\"onEdit()\">Edit</a>\n                    <a (click)=\"onDelete()\">Delete</a>\n               </div>\n            </footer>\n         </article>  \n    ",
                        styles: [
                            "\n            .author {\n                display: inline-block;\n                font-style: italic;\n                font-size: 12px;\n                width: 80%;\n            }\n            .config {\n                display: inline-block;\n                text-align: right;\n                font-size: 12px;\n                width: 19%;\n            }\n        "]
                    }), 
                    __metadata('design:paramtypes', [message_service_1.MessageService])
                ], MessageComponent);
                return MessageComponent;
            }());
            exports_3("MessageComponent", MessageComponent);
        }
    }
});
System.register("messages/message-list.component", ['angular2/core', "messages/message.component", "messages/message.service"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_2, message_component_1, message_service_2;
    var MessageListComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (message_component_1_1) {
                message_component_1 = message_component_1_1;
            },
            function (message_service_2_1) {
                message_service_2 = message_service_2_1;
            }],
        execute: function() {
            MessageListComponent = (function () {
                function MessageListComponent(_messageService) {
                    this._messageService = _messageService;
                }
                MessageListComponent.prototype.ngOnInit = function () {
                    this.messages = this._messageService.getMessages();
                };
                MessageListComponent = __decorate([
                    core_2.Component({
                        selector: 'my-message-list',
                        template: "\n       <section class=\"col-md-8 col-md-offset-2\">\n           <my-message *ngFor=\"#message of messages\" [message]=\"message\"  (editClicked)=\"message.content = $event\"></my-message>         \n           <!-- The underlying code is for beta17 > rc*  release -->\n           <!-- <my-message *ngFor=\"let message of messages\" [message]=\"message\"  (editClicked)=\"message.content = $event\"></my-message> -->\n        </section>              \n    ",
                        directives: [message_component_1.MessageComponent]
                    }), 
                    __metadata('design:paramtypes', [message_service_2.MessageService])
                ], MessageListComponent);
                return MessageListComponent;
            }());
            exports_4("MessageListComponent", MessageListComponent);
        }
    }
});
System.register("messages/message-input.component", ['angular2/core', "messages/message", "messages/message.service"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_3, message_3, message_service_3;
    var MessageInputComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (message_3_1) {
                message_3 = message_3_1;
            },
            function (message_service_3_1) {
                message_service_3 = message_service_3_1;
            }],
        execute: function() {
            MessageInputComponent = (function () {
                function MessageInputComponent(_messageService) {
                    this._messageService = _messageService;
                }
                MessageInputComponent.prototype.onSubmit = function (form) {
                    var message = new message_3.Message(form.content, null, 'dummy');
                    this._messageService.addMessage(message);
                };
                MessageInputComponent = __decorate([
                    core_3.Component({
                        selector: 'my-message-input',
                        template: "\n     <section class=\"col-md-8 col-md-offset-2\">\n        <form (ngSubmit)=\"onSubmit(f.value)\" #f=\"ngForm\">\n            <div class=\"form-group\">\n                <label for=\"content\">Content</label>\n                <input ngControl=\"content\" type=\"text\" class=\"form-control\" id=\"content\" #input>                \n            </div>\n            <button type=\"submit\" class=\"btn btn-primary\">Send Message</button>\n        </form>\n     </section>\n    "
                    }), 
                    __metadata('design:paramtypes', [message_service_3.MessageService])
                ], MessageInputComponent);
                return MessageInputComponent;
            }());
            exports_5("MessageInputComponent", MessageInputComponent);
        }
    }
});
System.register("messages/messages.component", ["angular2/core", "messages/message-list.component", "messages/message-input.component"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_4, message_list_component_1, message_input_component_1;
    var MessagesComponent;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (message_list_component_1_1) {
                message_list_component_1 = message_list_component_1_1;
            },
            function (message_input_component_1_1) {
                message_input_component_1 = message_input_component_1_1;
            }],
        execute: function() {
            MessagesComponent = (function () {
                function MessagesComponent() {
                }
                MessagesComponent = __decorate([
                    core_4.Component({
                        selector: 'my-messages',
                        template: "\n      <div class=\"row spacing\">\n           <my-message-input></my-message-input>\n     </div>\n      <div class=\"row spacing\">\n           <my-message-list></my-message-list>\n    </div>\n\n    ",
                        directives: [message_list_component_1.MessageListComponent, message_input_component_1.MessageInputComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MessagesComponent);
                return MessagesComponent;
            }());
            exports_6("MessagesComponent", MessagesComponent);
        }
    }
});
System.register("auth/signup.component", ['angular2/core', "angular2/common"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_5, common_1;
    var SignupComponent;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            SignupComponent = (function () {
                function SignupComponent(_fb) {
                    this._fb = _fb;
                }
                SignupComponent.prototype.onSubmit = function () {
                    console.log(this.myForm.value);
                };
                SignupComponent.prototype.ngOnInit = function () {
                    console.log('The entered mail address validation passed: ' + this.isEmail.toString());
                    this.myForm = this._fb.group({
                        firstName: ['', common_1.Validators.required],
                        lastName: ['', common_1.Validators.required],
                        email: ['', common_1.Validators.compose([
                                common_1.Validators.required,
                                this.isEmail
                            ])],
                        password: ['', common_1.Validators.required]
                    });
                };
                SignupComponent.prototype.isEmail = function (control) {
                    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
                        return { invalidMail: true };
                    }
                };
                SignupComponent = __decorate([
                    core_5.Component({
                        selector: 'my-signup',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n            <form [ngFormModel]=\"myForm\" (ngSubmit)=\"onSubmit()\">\n                <div class=\"form-group\">\n                    <label for=\"firstName\">First Name</label>\n                    <input [ngFormControl]=\"myForm.find('firstName')\" type=\"text\" id=\"firstName\" class=\"form-control\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"lastName\">Last Name</label>\n                    <input [ngFormControl]=\"myForm.find('lastName')\" type=\"text\" id=\"lastName\" class=\"form-control\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"email\">Mail</label>\n                    <input [ngFormControl]=\"myForm.find('email')\" type=\"text\" id=\"email\" class=\"form-control\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"password\">Password</label>\n                    <input [ngFormControl]=\"myForm.find('password')\" type=\"password\" id=\"password\" class=\"form-control\">\n                </div>\n                <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!myForm.valid\">Sign Up</button>\n            </form>\n        </section>\n    "
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], SignupComponent);
                return SignupComponent;
            }());
            exports_7("SignupComponent", SignupComponent);
        }
    }
});
System.register("auth/signin.component", ['angular2/core', "angular2/common"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_6, common_2;
    var SigninComponent;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (common_2_1) {
                common_2 = common_2_1;
            }],
        execute: function() {
            SigninComponent = (function () {
                function SigninComponent(_fb) {
                    this._fb = _fb;
                }
                SigninComponent.prototype.onSubmit = function () {
                    console.log(this.myForm.value);
                };
                SigninComponent.prototype.ngOnInit = function () {
                    console.log('The entered mail address validation passed: ' + this.isEmail.toString());
                    this.myForm = this._fb.group({
                        email: ['', common_2.Validators.compose([
                                common_2.Validators.required,
                                this.isEmail
                            ])],
                        password: ['', common_2.Validators.required]
                    });
                };
                SigninComponent.prototype.isEmail = function (control) {
                    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
                        return { invalidMail: true };
                    }
                };
                SigninComponent = __decorate([
                    core_6.Component({
                        selector: 'my-signin',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n            <form [ngFormModel]=\"myForm\" (ngSubmit)=\"onSubmit()\">\n                <div class=\"form-group\">\n                    <label for=\"email\">Mail</label>\n                    <input [ngFormControl]=\"myForm.find('email')\" type=\"text\" id=\"email\" class=\"form-control\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"password\">Password</label>\n                    <input [ngFormControl]=\"myForm.find('password')\" type=\"password\" id=\"password\" class=\"form-control\">\n                </div>\n                <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!myForm.valid\">Sign In</button>\n            </form>\n        </section>\n    "
                    }), 
                    __metadata('design:paramtypes', [common_2.FormBuilder])
                ], SigninComponent);
                return SigninComponent;
            }());
            exports_8("SigninComponent", SigninComponent);
        }
    }
});
System.register("auth/logout.component", ['angular2/core'], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_7;
    var LogoutComponent;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            }],
        execute: function() {
            LogoutComponent = (function () {
                function LogoutComponent() {
                }
                LogoutComponent.prototype.onLogout = function () {
                };
                LogoutComponent = __decorate([
                    core_7.Component({
                        selector: 'my-logout',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n            <button class=\"btn btn-danger\" (click)=\"onLogout()\">Logout</button>\n        </section>\n\n\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], LogoutComponent);
                return LogoutComponent;
            }());
            exports_9("LogoutComponent", LogoutComponent);
        }
    }
});
System.register("auth/authentication.component", ['angular2/core', "auth/signup.component", "angular2/router", "auth/signin.component", "auth/logout.component"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_8, signup_component_1, router_1, signin_component_1, logout_component_1;
    var AuthenticationComponent;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (signup_component_1_1) {
                signup_component_1 = signup_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (signin_component_1_1) {
                signin_component_1 = signin_component_1_1;
            },
            function (logout_component_1_1) {
                logout_component_1 = logout_component_1_1;
            }],
        execute: function() {
            AuthenticationComponent = (function () {
                function AuthenticationComponent() {
                }
                AuthenticationComponent = __decorate([
                    core_8.Component({
                        selector: 'my-auth',
                        template: "\n        <header class=\"row spacing\">\n            <nav class=\"col-md-8 col-md-offset-2\">\n                <ul class=\"nav nav-tabs\">\n                    <li><a [routerLink]=\"['Signin']\">Signin</a></li>\n                    <li><a [routerLink]=\"['Signup']\">Signup</a></li>\n                    <li><a [routerLink]=\"['Logout']\">Logout</a></li>\n                </ul>        \n            </nav>\n        </header>\n        <div class=\"row spacing\">\n            <router-outlet></router-outlet>\n        \n        </div>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES, signup_component_1.SignupComponent],
                        styles: ["\n        .router-link-active {\n            cursor: default;\n            color: ghostwhite;\n            background-color: lightslategrey;\n            border: 1px solid #ddd;\n            border-bottom-color: transparent;\n        }\n    "]
                    }),
                    router_1.RouteConfig([
                        { path: '/signin', name: 'Signin', component: signin_component_1.SigninComponent },
                        { path: '/signup', name: 'Signup', component: signup_component_1.SignupComponent },
                        { path: '/logout', name: 'Logout', component: logout_component_1.LogoutComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AuthenticationComponent);
                return AuthenticationComponent;
            }());
            exports_10("AuthenticationComponent", AuthenticationComponent);
        }
    }
});
System.register("header.component", ['angular2/core', "angular2/router"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_9, router_2;
    var HeaderComponent;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent() {
                }
                HeaderComponent = __decorate([
                    core_9.Component({
                        selector: 'my-header',
                        template: "\n        <header class=\"row\">\n             <nav class=\"col-md-8 col-md-offset-2\">\n                <ul class=\"nav nav-pills\">\n                    <li><a [routerLink]=\"['Messenger']\">Messenger</a></li>\n                    <li><a [routerLink]=\"['Auth']\">Authentication</a></li>\n                </ul>\n              </nav>\n        </header>\n     ",
                        directives: [router_2.ROUTER_DIRECTIVES],
                        styles: ["\n        header {\n           margin-bottom: 20px;\n        }\n        \n        ul {\n           text-align: center;\n        }\n        \n        li {\n            float: none;\n            display: inline-block;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], HeaderComponent);
                return HeaderComponent;
            }());
            exports_11("HeaderComponent", HeaderComponent);
        }
    }
});
System.register("app.component", ['angular2/core', "angular2/router", "messages/messages.component", "auth/authentication.component", "header.component"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_10, router_3, messages_component_1, authentication_component_1, header_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
            },
            function (messages_component_1_1) {
                messages_component_1 = messages_component_1_1;
            },
            function (authentication_component_1_1) {
                authentication_component_1 = authentication_component_1_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_10.Component({
                        selector: 'my-app',
                        template: "  \n           <div class=\"container\">\n                <my-header></my-header>\n                <router-outlet></router-outlet>\n            </div>\n    ",
                        directives: [router_3.ROUTER_DIRECTIVES, header_component_1.HeaderComponent]
                    }),
                    router_3.RouteConfig([
                        { path: '/', name: 'Messenger', component: messages_component_1.MessagesComponent, useAsDefault: true },
                        { path: '/auth/...', name: 'Auth', component: authentication_component_1.AuthenticationComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_12("AppComponent", AppComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', "app.component", "messages/message.service", "angular2/router", "angular2/core"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var browser_1, app_component_1, message_service_4, router_4, core_11;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (message_service_4_1) {
                message_service_4 = message_service_4_1;
            },
            function (router_4_1) {
                router_4 = router_4_1;
            },
            function (core_11_1) {
                core_11 = core_11_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [message_service_4.MessageService, router_4.ROUTER_PROVIDERS, core_11.provide(router_4.LocationStrategy, { useClass: router_4.HashLocationStrategy })]);
        }
    }
});
/**
 * Created by Tony on 24-05-16.
 */
System.register("auth/user", [], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                // Look at the properties in the constructor, What I do here is something beautiful.
                // I instantly define the properties as public. This wil get the properties and also,
                // create a field in this class like this.email. Less code, and do the same thing. :-)
                function User(email, password, firstName, lastName) {
                    this.email = email;
                    this.password = password;
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.email = email;
                }
                return User;
            }());
            exports_14("User", User);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2UudHMiLCJtZXNzYWdlcy9tZXNzYWdlLnNlcnZpY2UudHMiLCJtZXNzYWdlcy9tZXNzYWdlLmNvbXBvbmVudC50cyIsIm1lc3NhZ2VzL21lc3NhZ2UtbGlzdC5jb21wb25lbnQudHMiLCJtZXNzYWdlcy9tZXNzYWdlLWlucHV0LmNvbXBvbmVudC50cyIsIm1lc3NhZ2VzL21lc3NhZ2VzLmNvbXBvbmVudC50cyIsImF1dGgvc2lnbnVwLmNvbXBvbmVudC50cyIsImF1dGgvc2lnbmluLmNvbXBvbmVudC50cyIsImF1dGgvbG9nb3V0LmNvbXBvbmVudC50cyIsImF1dGgvYXV0aGVudGljYXRpb24uY29tcG9uZW50LnRzIiwiaGVhZGVyLmNvbXBvbmVudC50cyIsImFwcC5jb21wb25lbnQudHMiLCJib290LnRzIiwiYXV0aC9hdXRoLnNlcnZpY2UudHMiLCJhdXRoL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztZQUFBO2dCQU1JLHdEQUF3RDtnQkFDeEQsMkRBQTJEO2dCQUMzRCxpQkFBYSxPQUFlLEVBQUUsU0FBa0IsRUFBRSxRQUFpQixFQUFFLE1BQWU7b0JBQ2hGLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUN6QixDQUFDO2dCQUNMLGNBQUM7WUFBRCxDQWRBLEFBY0MsSUFBQTtZQWRELDZCQWNDLENBQUE7Ozs7Ozs7Ozs7Ozs7OztZQ1pEO2dCQUFBO29CQUNJLGFBQVEsR0FBYyxFQUFFLENBQUM7Z0JBa0I3QixDQUFDO2dCQWhCRyxtQ0FBVSxHQUFWLFVBQVcsT0FBZ0I7b0JBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM1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Q1J6SDs7R0FFRzs7Ozs7Ozs7WUNGSDtnQkFFSSxvRkFBb0Y7Z0JBQ3BGLHFGQUFxRjtnQkFDckYsc0ZBQXNGO2dCQUN0RixjQUFtQixLQUFhLEVBQVMsUUFBZ0IsRUFBUyxTQUFrQixFQUFTLFFBQWlCO29CQUEzRixVQUFLLEdBQUwsS0FBSyxDQUFRO29CQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7b0JBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUztvQkFBUyxhQUFRLEdBQVIsUUFBUSxDQUFTO29CQUMxRyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsQ0FBQztnQkFDTCxXQUFDO1lBQUQsQ0FSQSxBQVFDLElBQUE7WUFSRCx3QkFRQyxDQUFBIiwiZmlsZSI6Ii4uLy4uLy4uL25vZGUtYW5ndWxhcjIvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE1lc3NhZ2Uge1xuICAgIGNvbnRlbnQ6IHN0cmluZztcbiAgICB1c2VybmFtZTogc3RyaW5nO1xuICAgIG1lc3NhZ2VJZDogc3RyaW5nO1xuICAgIHVzZXJJZDogc3RyaW5nO1xuXG4gICAgLy8gVGhlID8gYmVoaW5kIHRoZSBwYXJhbWV0ZXJzIGluIHRoZSBjb25zdHJ1Y3RvciBtZWFucyxcbiAgICAvLyB0aGF0IHRoZSB2YWx1ZXMgZG9uJ3QgbmVlZCB0byBiZSBhdmFpbGFibGUgb3IgcHJlc2VudGVkLlxuICAgIGNvbnN0cnVjdG9yIChjb250ZW50OiBzdHJpbmcsIG1lc3NhZ2VJZD86IHN0cmluZywgdXNlcm5hbWU/OiBzdHJpbmcsIHVzZXJJZD86IHN0cmluZykge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB0aGlzLm1lc3NhZ2VJZCA9IG1lc3NhZ2VJZDtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgICAgICB0aGlzLnVzZXJJZCA9IHVzZXJJZDtcbiAgICB9XG59IiwiaW1wb3J0IHtNZXNzYWdlfSBmcm9tIFwiLi9tZXNzYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlU2VydmljZXtcbiAgICBtZXNzYWdlczogTWVzc2FnZVtdID0gW107XG5cbiAgICBhZGRNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1lc3NhZ2VzKTtcbiAgICB9XG5cbiAgICBnZXRNZXNzYWdlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZXM7XG4gICAgfVxuXG4gICAgZWRpdE1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzW3RoaXMubWVzc2FnZXMuaW5kZXhPZihtZXNzYWdlKV0gPSBuZXcgTWVzc2FnZSgnRWRpdGVkJywgbnVsbCwgJ1N5c3RlbScpO1xuICAgIH1cblxuICAgIGRlbGV0ZU1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzLnNwbGljZSh0aGlzLm1lc3NhZ2VzLmluZGV4T2YobWVzc2FnZSksIDEpO1xuICAgIH1cbn0iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tIFwiLi9tZXNzYWdlXCI7XG5pbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tIFwiLi9tZXNzYWdlLnNlcnZpY2VcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LW1lc3NhZ2UnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIiAqbmdJZj1cInNob3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAge3sgbWVzc2FnZS5jb250ZW50IH19XG4gICAgICAgICAgICA8L2Rpdj4gICAgXG4gICAgICAgICAgICA8Zm9vdGVyIGNsYXNzPVwicGFuZWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhvclwiPlxuICAgICAgICAgICAgICAgIHt7IG1lc3NhZ2UudXNlcm5hbWUgfX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29uZmlnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJvbkVkaXQoKVwiPkVkaXQ8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJvbkRlbGV0ZSgpXCI+RGVsZXRlPC9hPlxuICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgIDwvYXJ0aWNsZT4gIFxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGBcbiAgICAgICAgICAgIC5hdXRob3Ige1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgICAgIHdpZHRoOiA4MCU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuY29uZmlnIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxOSU7XG4gICAgICAgICAgICB9XG4gICAgICAgIGBdXG59KVxuXG5leHBvcnQgY2xhc3MgTWVzc2FnZUNvbXBvbmVudCB7XG4gICBASW5wdXQoKSBtZXNzYWdlOk1lc3NhZ2U7XG4gICBAT3V0cHV0KCkgZWRpdENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgICBzaG93ID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSkge31cblxuICAgIG9uRWRpdCgpIHtcbiAgICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UuZWRpdE1lc3NhZ2UodGhpcy5tZXNzYWdlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0VkaXQgYnV0dG9uIGNsaWNrZWQhJyk7XG4gICAgfVxuXG4gICAgb25EZWxldGUoKSB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLmRlbGV0ZU1lc3NhZ2UodGhpcy5tZXNzYWdlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0RlbGV0ZSBidXR0b24gY2xpY2tlZCEnKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlQ29tcG9uZW50fSBmcm9tIFwiLi9tZXNzYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tIFwiLi9tZXNzYWdlXCI7XG5pbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tIFwiLi9tZXNzYWdlLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1tZXNzYWdlLWxpc3QnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgPG15LW1lc3NhZ2UgKm5nRm9yPVwiI21lc3NhZ2Ugb2YgbWVzc2FnZXNcIiBbbWVzc2FnZV09XCJtZXNzYWdlXCIgIChlZGl0Q2xpY2tlZCk9XCJtZXNzYWdlLmNvbnRlbnQgPSAkZXZlbnRcIj48L215LW1lc3NhZ2U+ICAgICAgICAgXG4gICAgICAgICAgIDwhLS0gVGhlIHVuZGVybHlpbmcgY29kZSBpcyBmb3IgYmV0YTE3ID4gcmMqICByZWxlYXNlIC0tPlxuICAgICAgICAgICA8IS0tIDxteS1tZXNzYWdlICpuZ0Zvcj1cImxldCBtZXNzYWdlIG9mIG1lc3NhZ2VzXCIgW21lc3NhZ2VdPVwibWVzc2FnZVwiICAoZWRpdENsaWNrZWQpPVwibWVzc2FnZS5jb250ZW50ID0gJGV2ZW50XCI+PC9teS1tZXNzYWdlPiAtLT5cbiAgICAgICAgPC9zZWN0aW9uPiAgICAgICAgICAgICAgXG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbTWVzc2FnZUNvbXBvbmVudF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzICBPbkluaXQge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlKSB7fVxuXG4gICAgbWVzc2FnZXM6IE1lc3NhZ2VbXTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gdGhpcy5fbWVzc2FnZVNlcnZpY2UuZ2V0TWVzc2FnZXMoKTtcbiAgICB9XG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tIFwiLi9tZXNzYWdlXCI7XG5pbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tIFwiLi9tZXNzYWdlLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1tZXNzYWdlLWlucHV0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICA8c2VjdGlvbiBjbGFzcz1cImNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMlwiPlxuICAgICAgICA8Zm9ybSAobmdTdWJtaXQpPVwib25TdWJtaXQoZi52YWx1ZSlcIiAjZj1cIm5nRm9ybVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY29udGVudFwiPkNvbnRlbnQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBuZ0NvbnRyb2w9XCJjb250ZW50XCIgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiY29udGVudFwiICNpbnB1dD4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+U2VuZCBNZXNzYWdlPC9idXR0b24+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgPC9zZWN0aW9uPlxuICAgIGBcbn0pXG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlSW5wdXRDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlKSB7fVxuXG4gICAgb25TdWJtaXQoZm9ybTphbnkpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZTogTWVzc2FnZSA9IG5ldyBNZXNzYWdlKGZvcm0uY29udGVudCwgbnVsbCwgJ2R1bW15Jyk7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLmFkZE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfVxufSIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge01lc3NhZ2VMaXN0Q29tcG9uZW50fSBmcm9tIFwiLi9tZXNzYWdlLWxpc3QuY29tcG9uZW50XCI7XG5pbXBvcnQge01lc3NhZ2VJbnB1dENvbXBvbmVudH0gZnJvbSBcIi4vbWVzc2FnZS1pbnB1dC5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1tZXNzYWdlcycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgc3BhY2luZ1wiPlxuICAgICAgICAgICA8bXktbWVzc2FnZS1pbnB1dD48L215LW1lc3NhZ2UtaW5wdXQ+XG4gICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBzcGFjaW5nXCI+XG4gICAgICAgICAgIDxteS1tZXNzYWdlLWxpc3Q+PC9teS1tZXNzYWdlLWxpc3Q+XG4gICAgPC9kaXY+XG5cbiAgICBgLFxuICAgIGRpcmVjdGl2ZXM6IFtNZXNzYWdlTGlzdENvbXBvbmVudCwgTWVzc2FnZUlucHV0Q29tcG9uZW50XVxufSlcblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VzQ29tcG9uZW50IHtcblxufVxuXG4iLCJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Rm9ybUJ1aWxkZXIsIENvbnRyb2xHcm91cCwgVmFsaWRhdG9ycywgQ29udHJvbH0gZnJvbSBcImFuZ3VsYXIyL2NvbW1vblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LXNpZ251cCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgIDxmb3JtIFtuZ0Zvcm1Nb2RlbF09XCJteUZvcm1cIiAobmdTdWJtaXQpPVwib25TdWJtaXQoKVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmaXJzdE5hbWVcIj5GaXJzdCBOYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IFtuZ0Zvcm1Db250cm9sXT1cIm15Rm9ybS5maW5kKCdmaXJzdE5hbWUnKVwiIHR5cGU9XCJ0ZXh0XCIgaWQ9XCJmaXJzdE5hbWVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJsYXN0TmFtZVwiPkxhc3QgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBbbmdGb3JtQ29udHJvbF09XCJteUZvcm0uZmluZCgnbGFzdE5hbWUnKVwiIHR5cGU9XCJ0ZXh0XCIgaWQ9XCJsYXN0TmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsXCI+TWFpbDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBbbmdGb3JtQ29udHJvbF09XCJteUZvcm0uZmluZCgnZW1haWwnKVwiIHR5cGU9XCJ0ZXh0XCIgaWQ9XCJlbWFpbFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgW25nRm9ybUNvbnRyb2xdPVwibXlGb3JtLmZpbmQoJ3Bhc3N3b3JkJylcIiB0eXBlPVwicGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIFtkaXNhYmxlZF09XCIhbXlGb3JtLnZhbGlkXCI+U2lnbiBVcDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgYFxufSlcblxuZXhwb3J0IGNsYXNzIFNpZ251cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgbXlGb3JtOiBDb250cm9sR3JvdXA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9mYjpGb3JtQnVpbGRlcikge31cblxuICAgIG9uU3VibWl0KCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm15Rm9ybS52YWx1ZSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUaGUgZW50ZXJlZCBtYWlsIGFkZHJlc3MgdmFsaWRhdGlvbiBwYXNzZWQ6ICcgKyB0aGlzLmlzRW1haWwudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgdGhpcy5teUZvcm0gPSB0aGlzLl9mYi5ncm91cCh7XG4gICAgICAgICAgICBmaXJzdE5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBsYXN0TmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGVtYWlsOiBbJycsIFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB0aGlzLmlzRW1haWxcbiAgICAgICAgICAgIF0pXSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNFbWFpbChjb250cm9sOiBDb250cm9sKToge1tzOiBzdHJpbmddOiBib29sZWFufSB7XG4gICAgICAgIGlmICghY29udHJvbC52YWx1ZS5tYXRjaCgvXlxcdytAW2EtekEtWl9dKz9cXC5bYS16QS1aXXsyLDN9JC8pKSB7XG5cbiAgICAgICAgICAgIHJldHVybiB7aW52YWxpZE1haWw6IHRydWV9O1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0Zvcm1CdWlsZGVyLCBDb250cm9sR3JvdXAsIFZhbGlkYXRvcnMsIENvbnRyb2x9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1zaWduaW4nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG4gICAgICAgICAgICA8Zm9ybSBbbmdGb3JtTW9kZWxdPVwibXlGb3JtXCIgKG5nU3VibWl0KT1cIm9uU3VibWl0KClcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5NYWlsPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IFtuZ0Zvcm1Db250cm9sXT1cIm15Rm9ybS5maW5kKCdlbWFpbCcpXCIgdHlwZT1cInRleHRcIiBpZD1cImVtYWlsXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBbbmdGb3JtQ29udHJvbF09XCJteUZvcm0uZmluZCgncGFzc3dvcmQnKVwiIHR5cGU9XCJwYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgW2Rpc2FibGVkXT1cIiFteUZvcm0udmFsaWRcIj5TaWduIEluPC9idXR0b24+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICBgXG59KVxuXG5leHBvcnQgY2xhc3MgU2lnbmluQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICAgIG15Rm9ybTogQ29udHJvbEdyb3VwO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZmI6Rm9ybUJ1aWxkZXIpIHt9XG5cbiAgICBvblN1Ym1pdCgpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5teUZvcm0udmFsdWUpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zb2xlLmxvZygnVGhlIGVudGVyZWQgbWFpbCBhZGRyZXNzIHZhbGlkYXRpb24gcGFzc2VkOiAnICsgdGhpcy5pc0VtYWlsLnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIHRoaXMubXlGb3JtID0gdGhpcy5fZmIuZ3JvdXAoe1xuICAgICAgICAgICAgZW1haWw6IFsnJywgVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHRoaXMuaXNFbWFpbFxuICAgICAgICAgICAgXSldLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0VtYWlsKGNvbnRyb2w6IENvbnRyb2wpOiB7W3M6IHN0cmluZ106IGJvb2xlYW59IHtcbiAgICAgICAgaWYgKCFjb250cm9sLnZhbHVlLm1hdGNoKC9eXFx3K0BbYS16QS1aX10rP1xcLlthLXpBLVpdezIsM30kLykpIHtcblxuICAgICAgICAgICAgcmV0dXJuIHtpbnZhbGlkTWFpbDogdHJ1ZX07XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LWxvZ291dCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIChjbGljayk9XCJvbkxvZ291dCgpXCI+TG9nb3V0PC9idXR0b24+XG4gICAgICAgIDwvc2VjdGlvbj5cblxuXG4gICAgYFxufSlcblxuZXhwb3J0IGNsYXNzIExvZ291dENvbXBvbmVudCB7XG5cblxuICAgIG9uTG9nb3V0KCkge1xuXG4gICAgfVxuXG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtTaWdudXBDb21wb25lbnR9IGZyb20gXCIuL3NpZ251cC5jb21wb25lbnRcIjtcbmltcG9ydCB7Um91dGVDb25maWcsIFJPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge1NpZ25pbkNvbXBvbmVudH0gZnJvbSBcIi4vc2lnbmluLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtMb2dvdXRDb21wb25lbnR9IGZyb20gXCIuL2xvZ291dC5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1hdXRoJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aGVhZGVyIGNsYXNzPVwicm93IHNwYWNpbmdcIj5cbiAgICAgICAgICAgIDxuYXYgY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJuYXYgbmF2LXRhYnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnU2lnbmluJ11cIj5TaWduaW48L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnU2lnbnVwJ11cIj5TaWdudXA8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnTG9nb3V0J11cIj5Mb2dvdXQ8L2E+PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPiAgICAgICAgXG4gICAgICAgICAgICA8L25hdj5cbiAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgc3BhY2luZ1wiPlxuICAgICAgICAgICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuICAgICAgICBcbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVMsIFNpZ251cENvbXBvbmVudF0sXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICAucm91dGVyLWxpbmstYWN0aXZlIHtcbiAgICAgICAgICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICAgICAgICAgIGNvbG9yOiBnaG9zdHdoaXRlO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRzbGF0ZWdyZXk7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIH1cbiAgICBgXVxufSlcblxuQFJvdXRlQ29uZmlnKFtcbiAgICB7cGF0aDogJy9zaWduaW4nLCBuYW1lOiAnU2lnbmluJywgY29tcG9uZW50OiBTaWduaW5Db21wb25lbnR9LFxuICAgIHtwYXRoOiAnL3NpZ251cCcsIG5hbWU6ICdTaWdudXAnLCBjb21wb25lbnQ6IFNpZ251cENvbXBvbmVudH0sXG4gICAge3BhdGg6ICcvbG9nb3V0JywgbmFtZTogJ0xvZ291dCcsIGNvbXBvbmVudDogTG9nb3V0Q29tcG9uZW50fVxuXSlcblxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uQ29tcG9uZW50IHtcblxufSIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1oZWFkZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxoZWFkZXIgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICA8bmF2IGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibmF2IG5hdi1waWxsc1wiPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgW3JvdXRlckxpbmtdPVwiWydNZXNzZW5nZXInXVwiPk1lc3NlbmdlcjwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgW3JvdXRlckxpbmtdPVwiWydBdXRoJ11cIj5BdXRoZW50aWNhdGlvbjwvYT48L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICA8L2hlYWRlcj5cbiAgICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgaGVhZGVyIHtcbiAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdWwge1xuICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxpIHtcbiAgICAgICAgICAgIGZsb2F0OiBub25lO1xuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBIZWFkZXJDb21wb25lbnQge1xuXG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtSb3V0ZUNvbmZpZywgUk9VVEVSX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcbmltcG9ydCB7TWVzc2FnZXNDb21wb25lbnR9IGZyb20gXCIuL21lc3NhZ2VzL21lc3NhZ2VzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtBdXRoZW50aWNhdGlvbkNvbXBvbmVudH0gZnJvbSBcIi4vYXV0aC9hdXRoZW50aWNhdGlvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7SGVhZGVyQ29tcG9uZW50fSBmcm9tIFwiLi9oZWFkZXIuY29tcG9uZW50XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktYXBwJyxcbiAgICB0ZW1wbGF0ZTogYCAgXG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8bXktaGVhZGVyPjwvbXktaGVhZGVyPlxuICAgICAgICAgICAgICAgIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTLCBIZWFkZXJDb21wb25lbnRdXG5cbn0pXG5cbkBSb3V0ZUNvbmZpZyhbXG4gICAge3BhdGg6ICcvJywgbmFtZTogJ01lc3NlbmdlcicsIGNvbXBvbmVudDogTWVzc2FnZXNDb21wb25lbnQsIHVzZUFzRGVmYXVsdDogdHJ1ZX0sXG4gICAge3BhdGg6ICcvYXV0aC8uLi4nLCBuYW1lOiAnQXV0aCcsIGNvbXBvbmVudDogQXV0aGVudGljYXRpb25Db21wb25lbnR9XG5dKVxuXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcblxufSIsIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90eXBpbmdzL2Jyb3dzZXIuZC50c1wiLz5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cImFwcC5jb21wb25lbnQudHNcIi8+XG5pbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG5pbXBvcnQge0FwcENvbXBvbmVudH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNZXNzYWdlU2VydmljZX0gZnJvbSBcIi4vbWVzc2FnZXMvbWVzc2FnZS5zZXJ2aWNlXCI7XG5pbXBvcnQge1JPVVRFUl9QUk9WSURFUlMsIExvY2F0aW9uU3RyYXRlZ3ksIEhhc2hMb2NhdGlvblN0cmF0ZWd5fSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge3Byb3ZpZGV9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5cbmJvb3RzdHJhcChBcHBDb21wb25lbnQsIFtNZXNzYWdlU2VydmljZSwgUk9VVEVSX1BST1ZJREVSUywgcHJvdmlkZShMb2NhdGlvblN0cmF0ZWd5LCB7dXNlQ2xhc3M6IEhhc2hMb2NhdGlvblN0cmF0ZWd5fSldKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBUb255IG9uIDI0LTA1LTE2LlxuICovXG4iLCJleHBvcnQgY2xhc3MgVXNlciB7XG5cbiAgICAvLyBMb29rIGF0IHRoZSBwcm9wZXJ0aWVzIGluIHRoZSBjb25zdHJ1Y3RvciwgV2hhdCBJIGRvIGhlcmUgaXMgc29tZXRoaW5nIGJlYXV0aWZ1bC5cbiAgICAvLyBJIGluc3RhbnRseSBkZWZpbmUgdGhlIHByb3BlcnRpZXMgYXMgcHVibGljLiBUaGlzIHdpbCBnZXQgdGhlIHByb3BlcnRpZXMgYW5kIGFsc28sXG4gICAgLy8gY3JlYXRlIGEgZmllbGQgaW4gdGhpcyBjbGFzcyBsaWtlIHRoaXMuZW1haWwuIExlc3MgY29kZSwgYW5kIGRvIHRoZSBzYW1lIHRoaW5nLiA6LSlcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW1haWw6IHN0cmluZywgcHVibGljIHBhc3N3b3JkOiBzdHJpbmcsIHB1YmxpYyBmaXJzdE5hbWU/OiBzdHJpbmcsIHB1YmxpYyBsYXN0TmFtZT86IHN0cmluZyl7XG4gICAgICAgIHRoaXMuZW1haWwgPSBlbWFpbDtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
