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
System.register("messages/message.service", ["messages/message", "angular2/http", 'angular2/core', 'rxjs/Rx', "rxjs/Observable"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var message_1, http_1, core_1, Observable_1;
    var MessageService;
    return {
        setters:[
            function (message_1_1) {
                message_1 = message_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            MessageService = (function () {
                function MessageService(_http) {
                    this._http = _http;
                    this.messages = [];
                    this.messageIsEdit = new core_1.EventEmitter();
                }
                MessageService.prototype.addMessage = function (message) {
                    var body = JSON.stringify(message);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
                    return this._http.post('http://localhost:3000/message' + token, body, { headers: headers })
                        .map(function (response) {
                        var data = response.json().obj;
                        var message = new message_1.Message(data.content, data._id, data.user.firstName, data.user._id);
                        return message;
                    })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                MessageService.prototype.getMessages = function () {
                    return this._http.get('http://localhost:3000/message')
                        .map(function (response) {
                        var data = response.json().obj;
                        var objs = [];
                        for (var i = 0; i < data.length; i++) {
                            var message = new message_1.Message(data[i].content, data[i]._id, data[i].user.firstName, data[i].user._id);
                            objs.push(message);
                        }
                        ;
                        return objs;
                    })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                MessageService.prototype.editMessage = function (message) {
                    this.messageIsEdit.emit(message);
                };
                MessageService.prototype.updateMessage = function (message) {
                    var body = JSON.stringify(message);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
                    return this._http.patch('http://localhost:3000/message/' + message.messageId + token, body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                MessageService.prototype.deleteMessage = function (message) {
                    this.messages.splice(this.messages.indexOf(message), 1);
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
                    return this._http.delete('http://localhost:3000/message/' + message.messageId + token)
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                MessageService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], MessageService);
                return MessageService;
            }());
            exports_2("MessageService", MessageService);
        }
    }
});
System.register("errors/error", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Error;
    return {
        setters:[],
        execute: function() {
            Error = (function () {
                function Error(title, message) {
                    this.title = title;
                    this.message = message;
                }
                return Error;
            }());
            exports_3("Error", Error);
        }
    }
});
System.register("errors/error.service", ["angular2/core", "errors/error"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_2, error_1;
    var ErrorService;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (error_1_1) {
                error_1 = error_1_1;
            }],
        execute: function() {
            ErrorService = (function () {
                function ErrorService() {
                    this.errorOccurred = new core_2.EventEmitter();
                }
                ErrorService.prototype.handleError = function (error) {
                    var errorData = new error_1.Error(error.title, error.error.message);
                    this.errorOccurred.emit(errorData);
                };
                return ErrorService;
            }());
            exports_4("ErrorService", ErrorService);
        }
    }
});
System.register("messages/message.component", ["angular2/core", "messages/message", "messages/message.service", "errors/error.service"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_3, message_2, message_service_1, error_service_1;
    var MessageComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (message_2_1) {
                message_2 = message_2_1;
            },
            function (message_service_1_1) {
                message_service_1 = message_service_1_1;
            },
            function (error_service_1_1) {
                error_service_1 = error_service_1_1;
            }],
        execute: function() {
            MessageComponent = (function () {
                function MessageComponent(_messageService, _errorService) {
                    this._messageService = _messageService;
                    this._errorService = _errorService;
                    this.editClicked = new core_3.EventEmitter();
                }
                MessageComponent.prototype.onEdit = function () {
                    console.log('Edit button clicked in the Front-End.');
                    this._messageService.editMessage(this.message);
                };
                MessageComponent.prototype.onDelete = function () {
                    var _this = this;
                    console.log('Delete button clicked in Front-End.');
                    this._messageService.deleteMessage(this.message)
                        .subscribe(function (data) { return console.log(data); }, function (error) { return _this._errorService.handleError(error); });
                };
                MessageComponent.prototype.belongsToUser = function () {
                    return localStorage.getItem('userId') == this.message.userId;
                };
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', message_2.Message)
                ], MessageComponent.prototype, "message", void 0);
                __decorate([
                    core_3.Output(), 
                    __metadata('design:type', Object)
                ], MessageComponent.prototype, "editClicked", void 0);
                MessageComponent = __decorate([
                    core_3.Component({
                        selector: 'my-message',
                        template: "\n         <article class=\"panel panel-default\" >\n            <div class=\"panel-body\">\n                {{ message.content }}\n            </div>    \n            <footer class=\"panel-footer\">\n                <div class=\"author\">\n                {{ message.username }}\n                </div>\n                <div class=\"config\" *ngIf=\"belongsToUser()\">\n                    <a (click)=\"onEdit()\">Edit</a>\n                    <a (click)=\"onDelete()\">Delete</a>\n               </div>\n            </footer>\n         </article>  \n    ",
                        styles: ["\n            .author {\n                display: inline-block;\n                font-style: italic;\n                font-size: 12px;\n                width: 80%;\n            }\n            .config {\n                display: inline-block;\n                text-align: right;\n                font-size: 12px;\n                width: 19%;\n            }\n        "]
                    }), 
                    __metadata('design:paramtypes', [message_service_1.MessageService, error_service_1.ErrorService])
                ], MessageComponent);
                return MessageComponent;
            }());
            exports_5("MessageComponent", MessageComponent);
        }
    }
});
System.register("messages/message-list.component", ['angular2/core', "messages/message.component", "messages/message.service", "errors/error.service"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_4, message_component_1, message_service_2, error_service_2;
    var MessageListComponent;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (message_component_1_1) {
                message_component_1 = message_component_1_1;
            },
            function (message_service_2_1) {
                message_service_2 = message_service_2_1;
            },
            function (error_service_2_1) {
                error_service_2 = error_service_2_1;
            }],
        execute: function() {
            MessageListComponent = (function () {
                function MessageListComponent(_messageService, _errorService) {
                    this._messageService = _messageService;
                    this._errorService = _errorService;
                }
                MessageListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._messageService.getMessages()
                        .subscribe(function (messages) {
                        console.log(messages);
                        _this.messages = messages;
                        _this._messageService.messages = messages;
                    }, function (error) { return _this._errorService.handleError(error); });
                };
                MessageListComponent = __decorate([
                    core_4.Component({
                        selector: 'my-message-list',
                        template: "\n       <section class=\"col-md-8 col-md-offset-2\">\n           <my-message *ngFor=\"#message of messages\" [message]=\"message\"  (editClicked)=\"message.content = $event\"></my-message>       \n             \n           <!-- The underlying code is for beta17 > rc*  release -->\n           <!-- <my-message *ngFor=\"let message of messages\" [message]=\"message\"  (editClicked)=\"message.content = $event\"></my-message> -->\n        </section>              \n    ",
                        directives: [message_component_1.MessageComponent]
                    }), 
                    __metadata('design:paramtypes', [message_service_2.MessageService, error_service_2.ErrorService])
                ], MessageListComponent);
                return MessageListComponent;
            }());
            exports_6("MessageListComponent", MessageListComponent);
        }
    }
});
System.register("messages/message-input.component", ['angular2/core', "messages/message", "messages/message.service", "errors/error.service"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_5, message_3, message_service_3, error_service_3;
    var MessageInputComponent;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (message_3_1) {
                message_3 = message_3_1;
            },
            function (message_service_3_1) {
                message_service_3 = message_service_3_1;
            },
            function (error_service_3_1) {
                error_service_3 = error_service_3_1;
            }],
        execute: function() {
            MessageInputComponent = (function () {
                function MessageInputComponent(_messageService, _errorService) {
                    this._messageService = _messageService;
                    this._errorService = _errorService;
                    // Understand that this object is a reference and is everywhere equal.
                    this.message = null;
                }
                MessageInputComponent.prototype.onSubmit = function (form) {
                    var _this = this;
                    if (this.message) {
                        // Edit Case
                        this.message.content = form.content;
                        this._messageService.updateMessage(this.message)
                            .subscribe(function (data) { return console.log(data); }, function (error) { return _this._errorService.handleError(error); });
                        this.message = null;
                    }
                    else {
                        // New Message Case
                        var message = new message_3.Message(form.content, null, 'System');
                        this._messageService.addMessage(message)
                            .subscribe(function (data) {
                            console.log(data);
                            _this._messageService.messages.push(data);
                        }, function (error) { return _this._errorService.handleError(error); });
                    }
                };
                MessageInputComponent.prototype.onCancel = function () {
                    this.message = null;
                };
                MessageInputComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._messageService.messageIsEdit.subscribe(function (message) {
                        _this.message = message;
                    });
                };
                MessageInputComponent = __decorate([
                    core_5.Component({
                        selector: 'my-message-input',
                        template: "\n     <section class=\"col-md-8 col-md-offset-2\">\n        <form (ngSubmit)=\"onSubmit(f.value)\" #f=\"ngForm\">\n            <div class=\"form-group\">\n                <label for=\"content\">Content</label>\n                <input ngControl=\"content\" type=\"text\" class=\"form-control\" id=\"content\" #input [value]=\"message?.content\">                \n            </div>\n            <button type=\"submit\" class=\"btn btn-primary\">{{ !message ? 'Send Message' : 'Save Message'}}</button>\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"onCancel()\" *ngIf=\"message\">Cancel</button>\n        </form>\n     </section>\n    "
                    }), 
                    __metadata('design:paramtypes', [message_service_3.MessageService, error_service_3.ErrorService])
                ], MessageInputComponent);
                return MessageInputComponent;
            }());
            exports_7("MessageInputComponent", MessageInputComponent);
        }
    }
});
System.register("messages/messages.component", ["angular2/core", "messages/message-list.component", "messages/message-input.component"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_6, message_list_component_1, message_input_component_1;
    var MessagesComponent;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
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
                    core_6.Component({
                        selector: 'my-messages',
                        template: "\n      <div class=\"row spacing\">\n           <my-message-input></my-message-input>\n     </div>\n      <div class=\"row spacing\">\n           <my-message-list></my-message-list>\n    </div>\n\n    ",
                        directives: [message_list_component_1.MessageListComponent, message_input_component_1.MessageInputComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MessagesComponent);
                return MessagesComponent;
            }());
            exports_8("MessagesComponent", MessagesComponent);
        }
    }
});
System.register("auth/user", [], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(email, password, firstName, lastName) {
                    this.email = email;
                    this.password = password;
                    this.firstName = firstName;
                    this.lastName = lastName;
                }
                return User;
            }());
            exports_9("User", User);
        }
    }
});
System.register("auth/auth.service", ["angular2/core", "angular2/http", 'rxjs/Rx', "rxjs/Observable"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_7, http_2, Observable_2;
    var AuthService;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (_2) {},
            function (Observable_2_1) {
                Observable_2 = Observable_2_1;
            }],
        execute: function() {
            AuthService = (function () {
                function AuthService(_http) {
                    this._http = _http;
                }
                AuthService.prototype.signup = function (user) {
                    var body = JSON.stringify(user);
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    return this._http.post('http://localhost:3000/user', body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_2.Observable.throw(error.json()); });
                };
                AuthService.prototype.signin = function (user) {
                    var body = JSON.stringify(user);
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    return this._http.post('http://localhost:3000/user/signin', body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_2.Observable.throw(error.json()); });
                };
                AuthService.prototype.logout = function () {
                    localStorage.clear();
                };
                AuthService.prototype.isLoggedIn = function () {
                    return localStorage.getItem('token') !== null;
                };
                AuthService = __decorate([
                    core_7.Injectable(), 
                    __metadata('design:paramtypes', [http_2.Http])
                ], AuthService);
                return AuthService;
            }());
            exports_10("AuthService", AuthService);
        }
    }
});
System.register("auth/signup.component", ['angular2/core', "angular2/common", "auth/user", "auth/auth.service", "errors/error.service"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_8, common_1, user_1, auth_service_1, error_service_4;
    var SignupComponent;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (error_service_4_1) {
                error_service_4 = error_service_4_1;
            }],
        execute: function() {
            SignupComponent = (function () {
                function SignupComponent(_fb, _authService, _errorService) {
                    this._fb = _fb;
                    this._authService = _authService;
                    this._errorService = _errorService;
                }
                SignupComponent.prototype.onSubmit = function () {
                    var _this = this;
                    var user = new user_1.User(this.myForm.value.email, this.myForm.value.password, this.myForm.value.firstName, this.myForm.value.lastName);
                    console.log(user);
                    this._authService.signup(user)
                        .subscribe(function (data) { return console.log(data); }, function (error) { return _this._errorService.handleError(error); });
                };
                SignupComponent.prototype.ngOnInit = function () {
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
                // This is a custom validator with RegEx for email validation
                SignupComponent.prototype.isEmail = function (control) {
                    if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
                        return { invalidMail: true };
                    }
                };
                SignupComponent = __decorate([
                    core_8.Component({
                        selector: 'my-signup',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n            <form [ngFormModel]=\"myForm\" (ngSubmit)=\"onSubmit()\">\n                <div class=\"form-group\">\n                    <label for=\"firstName\">First Name</label>\n                    <input [ngFormControl]=\"myForm.find('firstName')\" type=\"text\" id=\"firstName\" class=\"form-control\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"lastName\">Last Name</label>\n                    <input [ngFormControl]=\"myForm.find('lastName')\" type=\"text\" id=\"lastName\" class=\"form-control\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"email\">Mail</label>\n                    <input [ngFormControl]=\"myForm.find('email')\" type=\"text\" id=\"email\" class=\"form-control\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"password\">Password</label>\n                    <input [ngFormControl]=\"myForm.find('password')\" type=\"password\" id=\"password\" class=\"form-control\">\n                </div>\n                <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!myForm.valid\">Sign Up</button>\n            </form>\n        </section>\n    "
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, auth_service_1.AuthService, error_service_4.ErrorService])
                ], SignupComponent);
                return SignupComponent;
            }());
            exports_11("SignupComponent", SignupComponent);
        }
    }
});
System.register("auth/signin.component", ['angular2/core', "angular2/common", "auth/auth.service", "auth/user", "angular2/router", "errors/error.service"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_9, common_2, auth_service_2, user_2, router_1, error_service_5;
    var SigninComponent;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (common_2_1) {
                common_2 = common_2_1;
            },
            function (auth_service_2_1) {
                auth_service_2 = auth_service_2_1;
            },
            function (user_2_1) {
                user_2 = user_2_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (error_service_5_1) {
                error_service_5 = error_service_5_1;
            }],
        execute: function() {
            SigninComponent = (function () {
                function SigninComponent(_fb, _authService, _router, _errorService) {
                    this._fb = _fb;
                    this._authService = _authService;
                    this._router = _router;
                    this._errorService = _errorService;
                }
                SigninComponent.prototype.onSubmit = function () {
                    var _this = this;
                    var user = new user_2.User(this.myForm.value.email, this.myForm.value.password);
                    this._authService.signin(user)
                        .subscribe(function (data) {
                        localStorage.setItem('token', data.obj);
                        localStorage.setItem('userId', data.userId);
                        _this._router.navigateByUrl('/');
                    }, function (error) { return _this._errorService.handleError(error); });
                };
                SigninComponent.prototype.ngOnInit = function () {
                    this.myForm = this._fb.group({
                        email: ['', common_2.Validators.compose([
                                common_2.Validators.required,
                                this.isEmail
                            ])],
                        password: ['', common_2.Validators.required]
                    });
                };
                // This is a custom validator with RegEx for email validation
                SigninComponent.prototype.isEmail = function (control) {
                    if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
                        return { invalidMail: true };
                    }
                };
                SigninComponent = __decorate([
                    core_9.Component({
                        selector: 'my-signin',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n            <form [ngFormModel]=\"myForm\" (ngSubmit)=\"onSubmit()\">\n                <div class=\"form-group\">\n                    <label for=\"email\">Mail</label>\n                    <input [ngFormControl]=\"myForm.find('email')\" type=\"text\" id=\"email\" class=\"form-control\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"password\">Password</label>\n                    <input [ngFormControl]=\"myForm.find('password')\" type=\"password\" id=\"password\" class=\"form-control\">\n                </div>\n                <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!myForm.valid\">Sign In</button>\n            </form>\n        </section>\n    "
                    }), 
                    __metadata('design:paramtypes', [common_2.FormBuilder, auth_service_2.AuthService, router_1.Router, error_service_5.ErrorService])
                ], SigninComponent);
                return SigninComponent;
            }());
            exports_12("SigninComponent", SigninComponent);
        }
    }
});
System.register("auth/logout.component", ['angular2/core', "auth/auth.service", "angular2/router"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_10, auth_service_3, router_2;
    var LogoutComponent;
    return {
        setters:[
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (auth_service_3_1) {
                auth_service_3 = auth_service_3_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            }],
        execute: function() {
            LogoutComponent = (function () {
                function LogoutComponent(_authService, _router) {
                    this._authService = _authService;
                    this._router = _router;
                }
                // Clear the localstorage and navigate to signin page
                LogoutComponent.prototype.onLogout = function () {
                    this._authService.logout();
                    this._router.navigate(['Signin']);
                };
                LogoutComponent = __decorate([
                    core_10.Component({
                        selector: 'my-logout',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n            <button class=\"btn btn-danger\" (click)=\"onLogout()\">Logout</button>\n        </section>\n    "
                    }), 
                    __metadata('design:paramtypes', [auth_service_3.AuthService, router_2.Router])
                ], LogoutComponent);
                return LogoutComponent;
            }());
            exports_13("LogoutComponent", LogoutComponent);
        }
    }
});
System.register("auth/authentication.component", ['angular2/core', "auth/signup.component", "angular2/router", "auth/signin.component", "auth/logout.component", "auth/auth.service"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var core_11, signup_component_1, router_3, signin_component_1, logout_component_1, auth_service_4;
    var AuthenticationComponent;
    return {
        setters:[
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (signup_component_1_1) {
                signup_component_1 = signup_component_1_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
            },
            function (signin_component_1_1) {
                signin_component_1 = signin_component_1_1;
            },
            function (logout_component_1_1) {
                logout_component_1 = logout_component_1_1;
            },
            function (auth_service_4_1) {
                auth_service_4 = auth_service_4_1;
            }],
        execute: function() {
            AuthenticationComponent = (function () {
                function AuthenticationComponent(_authService) {
                    this._authService = _authService;
                }
                AuthenticationComponent.prototype.isLoggedIn = function () {
                    return this._authService.isLoggedIn();
                };
                AuthenticationComponent = __decorate([
                    core_11.Component({
                        selector: 'my-auth',
                        template: "\n        <header class=\"row spacing\">\n            <nav class=\"col-md-8 col-md-offset-2\">\n                <ul class=\"nav nav-tabs\">                    \n                    <li><a [routerLink]=\"['Signin']\" *ngIf=\"!isLoggedIn()\">Signin</a></li>\n                    <li><a [routerLink]=\"['Signup']\">Signup</a></li>\n                    <li><a [routerLink]=\"['Logout']\" *ngIf=\"isLoggedIn()\">Logout</a></li>\n                </ul>        \n            </nav>\n        </header>\n        <div class=\"row spacing\">\n            <router-outlet></router-outlet>\n        </div>\n    ",
                        directives: [router_3.ROUTER_DIRECTIVES, signup_component_1.SignupComponent],
                        styles: ["\n        .router-link-active {\n            cursor: default;\n            color: ghostwhite;\n            background-color: lightslategrey;\n            border: 1px solid #ddd;\n            border-bottom-color: dodgerblue;\n        }\n    "]
                    }),
                    router_3.RouteConfig([
                        { path: '/signin', name: 'Signin', component: signin_component_1.SigninComponent, useAsDefault: true },
                        { path: '/signup', name: 'Signup', component: signup_component_1.SignupComponent },
                        { path: '/logout', name: 'Logout', component: logout_component_1.LogoutComponent }
                    ]), 
                    __metadata('design:paramtypes', [auth_service_4.AuthService])
                ], AuthenticationComponent);
                return AuthenticationComponent;
            }());
            exports_14("AuthenticationComponent", AuthenticationComponent);
        }
    }
});
System.register("header.component", ['angular2/core', "angular2/router"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var core_12, router_4;
    var HeaderComponent;
    return {
        setters:[
            function (core_12_1) {
                core_12 = core_12_1;
            },
            function (router_4_1) {
                router_4 = router_4_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent() {
                }
                HeaderComponent = __decorate([
                    core_12.Component({
                        selector: 'my-header',
                        template: "\n        <header class=\"row\">\n             <nav class=\"col-md-8 col-md-offset-2\">\n                <ul class=\"nav nav-pills\">\n                    <li><a [routerLink]=\"['Messages']\">Messages</a></li>\n                    <li><a [routerLink]=\"['Auth']\">Authentication</a></li>\n                </ul>\n              </nav>\n        </header>\n     ",
                        directives: [router_4.ROUTER_DIRECTIVES],
                        styles: ["\n        header {\n           margin-bottom: 20px;\n        }\n        \n        ul {\n           text-align: center;\n        }\n        \n        li {\n            float: none;\n            display: inline-block;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], HeaderComponent);
                return HeaderComponent;
            }());
            exports_15("HeaderComponent", HeaderComponent);
        }
    }
});
System.register("errors/error.component", ["angular2/core", "errors/error.service"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var core_13, error_service_6;
    var ErrorComponent;
    return {
        setters:[
            function (core_13_1) {
                core_13 = core_13_1;
            },
            function (error_service_6_1) {
                error_service_6 = error_service_6_1;
            }],
        execute: function() {
            ErrorComponent = (function () {
                function ErrorComponent(_errorService) {
                    this._errorService = _errorService;
                    this.errorDisplay = 'none';
                }
                ErrorComponent.prototype.onErrorHandle = function () {
                    this.errorDisplay = 'none';
                };
                ErrorComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._errorService.errorOccurred.subscribe(function (errorData) {
                        _this.errorData = errorData;
                        _this.errorDisplay = 'block';
                    });
                };
                ErrorComponent = __decorate([
                    core_13.Component({
                        selector: 'my-error',
                        template: "\n        <div class=\"backdrop\" [ngStyle]=\"{'display': errorDisplay}\"></div>\n        <div class=\"modal\" tabindex=\"-1\" role=\"dialog\" [ngStyle]=\"{'display': errorDisplay}\">\n            <div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                       <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"onErrorHandle()\">\n                            <span aria-hidden=\"true\">&times;</span> \n                       </button>\n                       <h4 class=\"modal-title\">{{ errorData?.title }}</h4>\n                    </div>\n                    <div class=\"modal-body\">\n                        <p>{{ errorData?.message }}</p>\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-defailt\" (click)=\"onErrorHandle()\">Close</button>\n                    </div>\n                </div> <!-- modal-content-->            \n            </div><!-- modal-dialog-->\n        </div><!-- modal-->\n    ",
                        styles: ["\n        .backdrop {\n            background-color: rgba(0,0,0,0.6);\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100vh;\n        }        \n    "]
                    }), 
                    __metadata('design:paramtypes', [error_service_6.ErrorService])
                ], ErrorComponent);
                return ErrorComponent;
            }());
            exports_16("ErrorComponent", ErrorComponent);
        }
    }
});
System.register("app.component", ['angular2/core', "angular2/router", "messages/messages.component", "auth/authentication.component", "header.component", "errors/error.component"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var core_14, router_5, messages_component_1, authentication_component_1, header_component_1, error_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_14_1) {
                core_14 = core_14_1;
            },
            function (router_5_1) {
                router_5 = router_5_1;
            },
            function (messages_component_1_1) {
                messages_component_1 = messages_component_1_1;
            },
            function (authentication_component_1_1) {
                authentication_component_1 = authentication_component_1_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (error_component_1_1) {
                error_component_1 = error_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_14.Component({
                        selector: 'my-app',
                        template: "  \n           <div class=\"container\">\n                <my-header></my-header>\n                <router-outlet></router-outlet>\n            </div>\n            <my-error></my-error>\n    ",
                        directives: [router_5.ROUTER_DIRECTIVES, header_component_1.HeaderComponent, error_component_1.ErrorComponent]
                    }),
                    router_5.RouteConfig([
                        { path: '/', name: 'Messages', component: messages_component_1.MessagesComponent, useAsDefault: true },
                        { path: '/auth/...', name: 'Auth', component: authentication_component_1.AuthenticationComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_17("AppComponent", AppComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', "app.component", "messages/message.service", "angular2/router", "angular2/core", "angular2/http", "auth/auth.service", "errors/error.service"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var browser_1, app_component_1, message_service_4, router_6, core_15, http_3, auth_service_5, error_service_7;
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
            function (router_6_1) {
                router_6 = router_6_1;
            },
            function (core_15_1) {
                core_15 = core_15_1;
            },
            function (http_3_1) {
                http_3 = http_3_1;
            },
            function (auth_service_5_1) {
                auth_service_5 = auth_service_5_1;
            },
            function (error_service_7_1) {
                error_service_7 = error_service_7_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [message_service_4.MessageService, auth_service_5.AuthService, error_service_7.ErrorService, router_6.ROUTER_PROVIDERS, core_15.provide(router_6.LocationStrategy, { useClass: router_6.HashLocationStrategy }), http_3.HTTP_PROVIDERS]);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2UudHMiLCJtZXNzYWdlcy9tZXNzYWdlLnNlcnZpY2UudHMiLCJlcnJvcnMvZXJyb3IudHMiLCJlcnJvcnMvZXJyb3Iuc2VydmljZS50cyIsIm1lc3NhZ2VzL21lc3NhZ2UuY29tcG9uZW50LnRzIiwibWVzc2FnZXMvbWVzc2FnZS1saXN0LmNvbXBvbmVudC50cyIsIm1lc3NhZ2VzL21lc3NhZ2UtaW5wdXQuY29tcG9uZW50LnRzIiwibWVzc2FnZXMvbWVzc2FnZXMuY29tcG9uZW50LnRzIiwiYXV0aC91c2VyLnRzIiwiYXV0aC9hdXRoLnNlcnZpY2UudHMiLCJhdXRoL3NpZ251cC5jb21wb25lbnQudHMiLCJhdXRoL3NpZ25pbi5jb21wb25lbnQudHMiLCJhdXRoL2xvZ291dC5jb21wb25lbnQudHMiLCJhdXRoL2F1dGhlbnRpY2F0aW9uLmNvbXBvbmVudC50cyIsImhlYWRlci5jb21wb25lbnQudHMiLCJlcnJvcnMvZXJyb3IuY29tcG9uZW50LnRzIiwiYXBwLmNvbXBvbmVudC50cyIsImJvb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztZQUFBO2dCQU1JLHdEQUF3RDtnQkFDeEQsMkRBQTJEO2dCQUMzRCxpQkFBYSxPQUFlLEVBQUUsU0FBa0IsRUFBRSxRQUFpQixFQUFFLE1BQWU7b0JBQ2hGLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUN6QixDQUFDO2dCQUNMLGNBQUM7WUFBRCxDQWRBLEFBY0MsSUFBQTtZQWRELDZCQWNDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUNQRDtnQkFJSSx3QkFBb0IsS0FBVztvQkFBWCxVQUFLLEdBQUwsS0FBSyxDQUFNO29CQUgv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RUFBRSxnQ0FBYyxDQUFDO3FCQUVuRSxDQUFDO29CQUVELG9CQUFXLENBQUM7d0JBQ1QsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLHNDQUFpQixFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUM7d0JBQy9FLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxrREFBdUIsRUFBQztxQkFDeEUsQ0FBQzs7Z0NBQUE7Z0JBSUYsbUJBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELHdDQUVDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lDaEJELG1CQUFTLENBQUMsNEJBQVksRUFBRSxDQUFDLGdDQUFjLEVBQUUsMEJBQVcsRUFBRSw0QkFBWSxFQUFFLHlCQUFnQixFQUFFLGVBQU8sQ0FBQyx5QkFBZ0IsRUFBRSxFQUFDLFFBQVEsRUFBRSw2QkFBb0IsRUFBQyxDQUFDLEVBQUUscUJBQWMsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiLi4vLi4vLi4vbm9kZS1hbmd1bGFyMi9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTWVzc2FnZSB7XG4gICAgY29udGVudDogc3RyaW5nO1xuICAgIHVzZXJuYW1lOiBzdHJpbmc7XG4gICAgbWVzc2FnZUlkOiBzdHJpbmc7XG4gICAgdXNlcklkOiBzdHJpbmc7XG5cbiAgICAvLyBUaGUgPyBiZWhpbmQgdGhlIHBhcmFtZXRlcnMgaW4gdGhlIGNvbnN0cnVjdG9yIG1lYW5zLFxuICAgIC8vIHRoYXQgdGhlIHZhbHVlcyBkb24ndCBuZWVkIHRvIGJlIGF2YWlsYWJsZSBvciBwcmVzZW50ZWQuXG4gICAgY29uc3RydWN0b3IgKGNvbnRlbnQ6IHN0cmluZywgbWVzc2FnZUlkPzogc3RyaW5nLCB1c2VybmFtZT86IHN0cmluZywgdXNlcklkPzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMubWVzc2FnZUlkID0gbWVzc2FnZUlkO1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgICAgIHRoaXMudXNlcklkID0gdXNlcklkO1xuICAgIH1cbn0iLCJpbXBvcnQge01lc3NhZ2V9IGZyb20gXCIuL21lc3NhZ2VcIjtcbmltcG9ydCB7SHR0cCwgSGVhZGVyc30gZnJvbSBcImFuZ3VsYXIyL2h0dHBcIjtcbmltcG9ydCB7SW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCAncnhqcy9SeCc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VTZXJ2aWNlIHtcbiAgICBtZXNzYWdlczogTWVzc2FnZVtdID0gW107XG4gICAgbWVzc2FnZUlzRWRpdCA9IG5ldyBFdmVudEVtaXR0ZXI8TWVzc2FnZT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHApIHt9XG5cbiAgICBhZGRNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcblxuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xuICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpID8gJz90b2tlbj0nICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgOiAnJztcblxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvbWVzc2FnZScgKyB0b2tlbiwgYm9keSwge2hlYWRlcnM6IGhlYWRlcnN9KVxuICAgICAgICAgICAgLm1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uKCkub2JqO1xuICAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IG5ldyBNZXNzYWdlKGRhdGEuY29udGVudCwgZGF0YS5faWQsIGRhdGEudXNlci5maXJzdE5hbWUsIGRhdGEudXNlci5faWQpO1xuXG4gICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xuICAgIH1cblxuICAgIGdldE1lc3NhZ2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9tZXNzYWdlJylcbiAgICAgICAgICAgIC5tYXAocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGE9IHJlc3BvbnNlLmpzb24oKS5vYmo7XG4gICAgICAgICAgICAgICAgbGV0IG9ianM6IGFueVtdID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gbmV3IE1lc3NhZ2UoZGF0YVtpXS5jb250ZW50LCBkYXRhW2ldLl9pZCwgZGF0YVtpXS51c2VyLmZpcnN0TmFtZSwgZGF0YVtpXS51c2VyLl9pZCk7XG4gICAgICAgICAgICAgICAgICAgIG9ianMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmpzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xuICAgIH1cblxuICAgIGVkaXRNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlSXNFZGl0LmVtaXQobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgdXBkYXRlTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShtZXNzYWdlKTtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgPyAnP3Rva2VuPScgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA6ICcnO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBhdGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvbWVzc2FnZS8nICsgbWVzc2FnZS5tZXNzYWdlSWQgKyB0b2tlbiwgYm9keSwge2hlYWRlcnM6aGVhZGVyc30pXG4gICAgICAgICAgICAubWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xuICAgIH1cblxuICAgIGRlbGV0ZU1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzLnNwbGljZSh0aGlzLm1lc3NhZ2VzLmluZGV4T2YobWVzc2FnZSksIDEpO1xuICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpID8gJz90b2tlbj0nICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgOiAnJztcblxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5kZWxldGUoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9tZXNzYWdlLycgKyBtZXNzYWdlLm1lc3NhZ2VJZCArIHRva2VuKVxuICAgICAgICAgICAgLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkpKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGl0bGU6IHN0cmluZywgcHVibGljIG1lc3NhZ2U6IHN0cmluZykge31cbn1cbiIsImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtFcnJvcn0gZnJvbSBcIi4vZXJyb3JcIjtcblxuZXhwb3J0IGNsYXNzIEVycm9yU2VydmljZSB7XG4gICAgZXJyb3JPY2N1cnJlZCA9IG5ldyBFdmVudEVtaXR0ZXI8RXJyb3I+KCk7XG5cbiAgICBoYW5kbGVFcnJvcihlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IG5ldyBFcnJvcihlcnJvci50aXRsZSwgZXJyb3IuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIHRoaXMuZXJyb3JPY2N1cnJlZC5lbWl0KGVycm9yRGF0YSk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tIFwiLi9tZXNzYWdlXCI7XG5pbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tIFwiLi9tZXNzYWdlLnNlcnZpY2VcIjtcbmltcG9ydCB7RXJyb3JTZXJ2aWNlfSBmcm9tIFwiLi4vZXJyb3JzL2Vycm9yLnNlcnZpY2VcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LW1lc3NhZ2UnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIiA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxuICAgICAgICAgICAgICAgIHt7IG1lc3NhZ2UuY29udGVudCB9fVxuICAgICAgICAgICAgPC9kaXY+ICAgIFxuICAgICAgICAgICAgPGZvb3RlciBjbGFzcz1cInBhbmVsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhdXRob3JcIj5cbiAgICAgICAgICAgICAgICB7eyBtZXNzYWdlLnVzZXJuYW1lIH19XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbmZpZ1wiICpuZ0lmPVwiYmVsb25nc1RvVXNlcigpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJvbkVkaXQoKVwiPkVkaXQ8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJvbkRlbGV0ZSgpXCI+RGVsZXRlPC9hPlxuICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgIDwvYXJ0aWNsZT4gIFxuICAgIGAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICAgICAgLmF1dGhvciB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwJTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5jb25maWcge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDE5JTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlQ29tcG9uZW50IHtcbiAgIEBJbnB1dCgpIG1lc3NhZ2U6TWVzc2FnZTtcbiAgIEBPdXRwdXQoKSBlZGl0Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLCBwcml2YXRlIF9lcnJvclNlcnZpY2U6IEVycm9yU2VydmljZSApIHt9XG5cbiAgICBvbkVkaXQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFZGl0IGJ1dHRvbiBjbGlja2VkIGluIHRoZSBGcm9udC1FbmQuJyk7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLmVkaXRNZXNzYWdlKHRoaXMubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgb25EZWxldGUoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZWxldGUgYnV0dG9uIGNsaWNrZWQgaW4gRnJvbnQtRW5kLicpO1xuICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5kZWxldGVNZXNzYWdlKHRoaXMubWVzc2FnZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhKSxcbiAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJvclNlcnZpY2UuaGFuZGxlRXJyb3IoZXJyb3IpXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGJlbG9uZ3NUb1VzZXIoKSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJykgPT0gdGhpcy5tZXNzYWdlLnVzZXJJZDtcbiAgICB9XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7TWVzc2FnZUNvbXBvbmVudH0gZnJvbSBcIi4vbWVzc2FnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSBcIi4vbWVzc2FnZVwiO1xuaW1wb3J0IHtNZXNzYWdlU2VydmljZX0gZnJvbSBcIi4vbWVzc2FnZS5zZXJ2aWNlXCI7XG5pbXBvcnQge0Vycm9yU2VydmljZX0gZnJvbSBcIi4uL2Vycm9ycy9lcnJvci5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktbWVzc2FnZS1saXN0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG4gICAgICAgICAgIDxteS1tZXNzYWdlICpuZ0Zvcj1cIiNtZXNzYWdlIG9mIG1lc3NhZ2VzXCIgW21lc3NhZ2VdPVwibWVzc2FnZVwiICAoZWRpdENsaWNrZWQpPVwibWVzc2FnZS5jb250ZW50ID0gJGV2ZW50XCI+PC9teS1tZXNzYWdlPiAgICAgICBcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgPCEtLSBUaGUgdW5kZXJseWluZyBjb2RlIGlzIGZvciBiZXRhMTcgPiByYyogIHJlbGVhc2UgLS0+XG4gICAgICAgICAgIDwhLS0gPG15LW1lc3NhZ2UgKm5nRm9yPVwibGV0IG1lc3NhZ2Ugb2YgbWVzc2FnZXNcIiBbbWVzc2FnZV09XCJtZXNzYWdlXCIgIChlZGl0Q2xpY2tlZCk9XCJtZXNzYWdlLmNvbnRlbnQgPSAkZXZlbnRcIj48L215LW1lc3NhZ2U+IC0tPlxuICAgICAgICA8L3NlY3Rpb24+ICAgICAgICAgICAgICBcbiAgICBgLFxuICAgIGRpcmVjdGl2ZXM6IFtNZXNzYWdlQ29tcG9uZW50XVxufSlcblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgIE9uSW5pdCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsIHByaXZhdGUgX2Vycm9yU2VydmljZTogRXJyb3JTZXJ2aWNlKSB7fVxuXG4gICAgLy8gbG9jYWwgTWVzc2FnZXNcbiAgICBtZXNzYWdlczogTWVzc2FnZVtdO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLmdldE1lc3NhZ2VzKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSBtZXNzYWdlcztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UubWVzc2FnZXMgPSBtZXNzYWdlcztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2Vycm9yU2VydmljZS5oYW5kbGVFcnJvcihlcnJvcilcbiAgICAgICAgICAgICk7XG4gICAgfVxufSIsImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tIFwiLi9tZXNzYWdlXCI7XG5pbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tIFwiLi9tZXNzYWdlLnNlcnZpY2VcIjtcbmltcG9ydCB7RXJyb3JTZXJ2aWNlfSBmcm9tIFwiLi4vZXJyb3JzL2Vycm9yLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1tZXNzYWdlLWlucHV0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICA8c2VjdGlvbiBjbGFzcz1cImNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMlwiPlxuICAgICAgICA8Zm9ybSAobmdTdWJtaXQpPVwib25TdWJtaXQoZi52YWx1ZSlcIiAjZj1cIm5nRm9ybVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY29udGVudFwiPkNvbnRlbnQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBuZ0NvbnRyb2w9XCJjb250ZW50XCIgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiY29udGVudFwiICNpbnB1dCBbdmFsdWVdPVwibWVzc2FnZT8uY29udGVudFwiPiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIj57eyAhbWVzc2FnZSA/ICdTZW5kIE1lc3NhZ2UnIDogJ1NhdmUgTWVzc2FnZSd9fTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIChjbGljayk9XCJvbkNhbmNlbCgpXCIgKm5nSWY9XCJtZXNzYWdlXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgPC9zZWN0aW9uPlxuICAgIGBcbn0pXG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyAgT25Jbml0ICB7XG4gICAgLy8gVW5kZXJzdGFuZCB0aGF0IHRoaXMgb2JqZWN0IGlzIGEgcmVmZXJlbmNlIGFuZCBpcyBldmVyeXdoZXJlIGVxdWFsLlxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLCBwcml2YXRlIF9lcnJvclNlcnZpY2U6IEVycm9yU2VydmljZSkge31cblxuICAgIG9uU3VibWl0KGZvcm06YW55KSB7XG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIC8vIEVkaXQgQ2FzZVxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlLmNvbnRlbnQgPSBmb3JtLmNvbnRlbnQ7XG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS51cGRhdGVNZXNzYWdlKHRoaXMubWVzc2FnZSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpLFxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB0aGlzLl9lcnJvclNlcnZpY2UuaGFuZGxlRXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IG51bGw7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE5ldyBNZXNzYWdlIENhc2VcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2U6IE1lc3NhZ2UgPSBuZXcgTWVzc2FnZShmb3JtLmNvbnRlbnQsIG51bGwsICdTeXN0ZW0nKTtcbiAgICAgICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLmFkZE1lc3NhZ2UobWVzc2FnZSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UubWVzc2FnZXMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyb3JTZXJ2aWNlLmhhbmRsZUVycm9yKGVycm9yKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbnVsbDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UubWVzc2FnZUlzRWRpdC5zdWJzY3JpYmUoXG4gICAgICAgICAgICBtZXNzYWdlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7TWVzc2FnZUxpc3RDb21wb25lbnR9IGZyb20gXCIuL21lc3NhZ2UtbGlzdC5jb21wb25lbnRcIjtcbmltcG9ydCB7TWVzc2FnZUlucHV0Q29tcG9uZW50fSBmcm9tIFwiLi9tZXNzYWdlLWlucHV0LmNvbXBvbmVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LW1lc3NhZ2VzJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBzcGFjaW5nXCI+XG4gICAgICAgICAgIDxteS1tZXNzYWdlLWlucHV0PjwvbXktbWVzc2FnZS1pbnB1dD5cbiAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93IHNwYWNpbmdcIj5cbiAgICAgICAgICAgPG15LW1lc3NhZ2UtbGlzdD48L215LW1lc3NhZ2UtbGlzdD5cbiAgICA8L2Rpdj5cblxuICAgIGAsXG4gICAgZGlyZWN0aXZlczogW01lc3NhZ2VMaXN0Q29tcG9uZW50LCBNZXNzYWdlSW5wdXRDb21wb25lbnRdXG59KVxuXG5leHBvcnQgY2xhc3MgTWVzc2FnZXNDb21wb25lbnQge1xuXG59XG5cbiIsImV4cG9ydCBjbGFzcyBVc2VyIHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbWFpbDogc3RyaW5nLCBwdWJsaWMgcGFzc3dvcmQ6IHN0cmluZywgcHVibGljIGZpcnN0TmFtZT86IHN0cmluZywgcHVibGljIGxhc3ROYW1lPzogc3RyaW5nKXt9XG59XG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge0h0dHAsIEhlYWRlcnN9IGZyb20gXCJhbmd1bGFyMi9odHRwXCI7XG5pbXBvcnQge1VzZXJ9IGZyb20gXCIuL3VzZXJcIjtcbmltcG9ydCAncnhqcy9SeCc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHApIHt9XG5cbiAgICBzaWdudXAodXNlcjogVXNlcikge1xuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkodXNlcik7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvdXNlcicsIGJvZHksIHtoZWFkZXJzOiBoZWFkZXJzfSlcbiAgICAgICAgICAgIC5tYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XG4gICAgfVxuXG4gICAgc2lnbmluKHVzZXI6IFVzZXIpIHtcbiAgICAgICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHVzZXIpO1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL3VzZXIvc2lnbmluJywgYm9keSwge2hlYWRlcnM6IGhlYWRlcnN9KVxuICAgICAgICAgICAgLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkpKTtcbiAgICB9XG5cbiAgICBsb2dvdXQoKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIH1cblxuICAgIGlzTG9nZ2VkSW4oKSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSAhPT0gbnVsbDtcbiAgICB9XG4gICAgICAgIFxuICAgIFxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0Zvcm1CdWlsZGVyLCBDb250cm9sR3JvdXAsIFZhbGlkYXRvcnMsIENvbnRyb2x9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcbmltcG9ydCB7VXNlcn0gZnJvbSBcIi4vdXNlclwiO1xuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4vYXV0aC5zZXJ2aWNlXCI7XG5pbXBvcnQge0Vycm9yU2VydmljZX0gZnJvbSBcIi4uL2Vycm9ycy9lcnJvci5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktc2lnbnVwJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMlwiPlxuICAgICAgICAgICAgPGZvcm0gW25nRm9ybU1vZGVsXT1cIm15Rm9ybVwiIChuZ1N1Ym1pdCk9XCJvblN1Ym1pdCgpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZpcnN0TmFtZVwiPkZpcnN0IE5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgW25nRm9ybUNvbnRyb2xdPVwibXlGb3JtLmZpbmQoJ2ZpcnN0TmFtZScpXCIgdHlwZT1cInRleHRcIiBpZD1cImZpcnN0TmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImxhc3ROYW1lXCI+TGFzdCBOYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IFtuZ0Zvcm1Db250cm9sXT1cIm15Rm9ybS5maW5kKCdsYXN0TmFtZScpXCIgdHlwZT1cInRleHRcIiBpZD1cImxhc3ROYW1lXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5NYWlsPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IFtuZ0Zvcm1Db250cm9sXT1cIm15Rm9ybS5maW5kKCdlbWFpbCcpXCIgdHlwZT1cInRleHRcIiBpZD1cImVtYWlsXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBbbmdGb3JtQ29udHJvbF09XCJteUZvcm0uZmluZCgncGFzc3dvcmQnKVwiIHR5cGU9XCJwYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgW2Rpc2FibGVkXT1cIiFteUZvcm0udmFsaWRcIj5TaWduIFVwPC9idXR0b24+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICBgXG59KVxuXG5leHBvcnQgY2xhc3MgU2lnbnVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBteUZvcm06IENvbnRyb2xHcm91cDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ZiOkZvcm1CdWlsZGVyLCBwcml2YXRlIF9hdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgX2Vycm9yU2VydmljZTogRXJyb3JTZXJ2aWNlKSB7fVxuXG4gICAgb25TdWJtaXQoKSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcih0aGlzLm15Rm9ybS52YWx1ZS5lbWFpbCwgdGhpcy5teUZvcm0udmFsdWUucGFzc3dvcmQsIHRoaXMubXlGb3JtLnZhbHVlLmZpcnN0TmFtZSwgdGhpcy5teUZvcm0udmFsdWUubGFzdE5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyh1c2VyKTtcbiAgICAgICAgdGhpcy5fYXV0aFNlcnZpY2Uuc2lnbnVwKHVzZXIpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4gY29uc29sZS5sb2coZGF0YSksXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5fZXJyb3JTZXJ2aWNlLmhhbmRsZUVycm9yKGVycm9yKVxuICAgICAgICAgICAgKVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm15Rm9ybSA9IHRoaXMuX2ZiLmdyb3VwKHtcbiAgICAgICAgICAgIGZpcnN0TmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGxhc3ROYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgZW1haWw6IFsnJywgVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHRoaXMuaXNFbWFpbFxuICAgICAgICAgICAgXSldLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBpcyBhIGN1c3RvbSB2YWxpZGF0b3Igd2l0aCBSZWdFeCBmb3IgZW1haWwgdmFsaWRhdGlvblxuICAgIHByaXZhdGUgaXNFbWFpbChjb250cm9sOiBDb250cm9sKToge1tzOiBzdHJpbmddOiBib29sZWFufSB7XG4gICAgICAgIGlmICghY29udHJvbC52YWx1ZS5tYXRjaChcIlthLXowLTkhIyQlJicqKy89P15fYHt8fX4tXSsoPzpcXC5bYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKSpAKD86W2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP1xcLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP1wiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtpbnZhbGlkTWFpbDogdHJ1ZX07XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Rm9ybUJ1aWxkZXIsIENvbnRyb2xHcm91cCwgVmFsaWRhdG9ycywgQ29udHJvbH0gZnJvbSBcImFuZ3VsYXIyL2NvbW1vblwiO1xuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4vYXV0aC5zZXJ2aWNlXCI7XG5pbXBvcnQge1VzZXJ9IGZyb20gXCIuL3VzZXJcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge0Vycm9yU2VydmljZX0gZnJvbSBcIi4uL2Vycm9ycy9lcnJvci5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktc2lnbmluJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMlwiPlxuICAgICAgICAgICAgPGZvcm0gW25nRm9ybU1vZGVsXT1cIm15Rm9ybVwiIChuZ1N1Ym1pdCk9XCJvblN1Ym1pdCgpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsXCI+TWFpbDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBbbmdGb3JtQ29udHJvbF09XCJteUZvcm0uZmluZCgnZW1haWwnKVwiIHR5cGU9XCJ0ZXh0XCIgaWQ9XCJlbWFpbFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgW25nRm9ybUNvbnRyb2xdPVwibXlGb3JtLmZpbmQoJ3Bhc3N3b3JkJylcIiB0eXBlPVwicGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIFtkaXNhYmxlZF09XCIhbXlGb3JtLnZhbGlkXCI+U2lnbiBJbjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgYFxufSlcblxuZXhwb3J0IGNsYXNzIFNpZ25pbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgICBteUZvcm06IENvbnRyb2xHcm91cDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ZiOkZvcm1CdWlsZGVyLCBwcml2YXRlIF9hdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgX3JvdXRlcjogUm91dGVyLCBwcml2YXRlIF9lcnJvclNlcnZpY2U6IEVycm9yU2VydmljZSkge31cblxuICAgIG9uU3VibWl0KCkge1xuICAgICAgICBjb25zdCB1c2VyID0gbmV3IFVzZXIodGhpcy5teUZvcm0udmFsdWUuZW1haWwsIHRoaXMubXlGb3JtLnZhbHVlLnBhc3N3b3JkKVxuICAgICAgICB0aGlzLl9hdXRoU2VydmljZS5zaWduaW4odXNlcilcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIGRhdGEub2JqKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJJZCcsIGRhdGEudXNlcklkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlQnlVcmwoJy8nKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yID0+IHRoaXMuX2Vycm9yU2VydmljZS5oYW5kbGVFcnJvcihlcnJvcilcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubXlGb3JtID0gdGhpcy5fZmIuZ3JvdXAoe1xuICAgICAgICAgICAgZW1haWw6IFsnJywgVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHRoaXMuaXNFbWFpbFxuICAgICAgICAgICAgXSldLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBpcyBhIGN1c3RvbSB2YWxpZGF0b3Igd2l0aCBSZWdFeCBmb3IgZW1haWwgdmFsaWRhdGlvblxuICAgIHByaXZhdGUgaXNFbWFpbChjb250cm9sOiBDb250cm9sKToge1tzOiBzdHJpbmddOiBib29sZWFufSB7XG4gICAgICAgIGlmICghY29udHJvbC52YWx1ZS5tYXRjaChcIlthLXowLTkhIyQlJicqKy89P15fYHt8fX4tXSsoPzpcXC5bYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKSpAKD86W2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP1xcLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP1wiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtpbnZhbGlkTWFpbDogdHJ1ZX07XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4vYXV0aC5zZXJ2aWNlXCI7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LWxvZ291dCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIChjbGljayk9XCJvbkxvZ291dCgpXCI+TG9nb3V0PC9idXR0b24+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICBgXG59KVxuXG5leHBvcnQgY2xhc3MgTG9nb3V0Q29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2F1dGhTZXJ2aWNlOkF1dGhTZXJ2aWNlLCBwcml2YXRlIF9yb3V0ZXI6Um91dGVyKSB7XG4gICAgfVxuXG4gICAgLy8gQ2xlYXIgdGhlIGxvY2Fsc3RvcmFnZSBhbmQgbmF2aWdhdGUgdG8gc2lnbmluIHBhZ2VcbiAgICBvbkxvZ291dCgpIHtcbiAgICAgICAgdGhpcy5fYXV0aFNlcnZpY2UubG9nb3V0KCk7XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJ1NpZ25pbiddKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1NpZ251cENvbXBvbmVudH0gZnJvbSBcIi4vc2lnbnVwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtSb3V0ZUNvbmZpZywgUk9VVEVSX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcbmltcG9ydCB7U2lnbmluQ29tcG9uZW50fSBmcm9tIFwiLi9zaWduaW4uY29tcG9uZW50XCI7XG5pbXBvcnQge0xvZ291dENvbXBvbmVudH0gZnJvbSBcIi4vbG9nb3V0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4vYXV0aC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktYXV0aCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGhlYWRlciBjbGFzcz1cInJvdyBzcGFjaW5nXCI+XG4gICAgICAgICAgICA8bmF2IGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibmF2IG5hdi10YWJzXCI+ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnU2lnbmluJ11cIiAqbmdJZj1cIiFpc0xvZ2dlZEluKClcIj5TaWduaW48L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnU2lnbnVwJ11cIj5TaWdudXA8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnTG9nb3V0J11cIiAqbmdJZj1cImlzTG9nZ2VkSW4oKVwiPkxvZ291dDwvYT48L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+ICAgICAgICBcbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBzcGFjaW5nXCI+XG4gICAgICAgICAgICA8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTLCBTaWdudXBDb21wb25lbnRdLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgLnJvdXRlci1saW5rLWFjdGl2ZSB7XG4gICAgICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgICAgICBjb2xvcjogZ2hvc3R3aGl0ZTtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0c2xhdGVncmV5O1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IGRvZGdlcmJsdWU7XG4gICAgICAgIH1cbiAgICBgXVxufSlcblxuXG5AUm91dGVDb25maWcoW1xuICAgIHtwYXRoOiAnL3NpZ25pbicsIG5hbWU6ICdTaWduaW4nLCBjb21wb25lbnQ6IFNpZ25pbkNvbXBvbmVudCwgdXNlQXNEZWZhdWx0OiB0cnVlfSxcbiAgICB7cGF0aDogJy9zaWdudXAnLCBuYW1lOiAnU2lnbnVwJywgY29tcG9uZW50OiBTaWdudXBDb21wb25lbnR9LFxuICAgIHtwYXRoOiAnL2xvZ291dCcsIG5hbWU6ICdMb2dvdXQnLCBjb21wb25lbnQ6IExvZ291dENvbXBvbmVudH1cbl0pXG5cbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvbkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9hdXRoU2VydmljZTpBdXRoU2VydmljZSkge1xuICAgIH1cblxuICAgIGlzTG9nZ2VkSW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRoU2VydmljZS5pc0xvZ2dlZEluKCk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LWhlYWRlcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGhlYWRlciBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgIDxuYXYgY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJuYXYgbmF2LXBpbGxzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBbcm91dGVyTGlua109XCJbJ01lc3NhZ2VzJ11cIj5NZXNzYWdlczwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgW3JvdXRlckxpbmtdPVwiWydBdXRoJ11cIj5BdXRoZW50aWNhdGlvbjwvYT48L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICA8L2hlYWRlcj5cbiAgICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgaGVhZGVyIHtcbiAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdWwge1xuICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxpIHtcbiAgICAgICAgICAgIGZsb2F0OiBub25lO1xuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBIZWFkZXJDb21wb25lbnQge1xuXG59IiwiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7RXJyb3J9IGZyb20gXCIuL2Vycm9yXCI7XG5pbXBvcnQge0Vycm9yU2VydmljZX0gZnJvbSBcIi4vZXJyb3Iuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LWVycm9yJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFja2Ryb3BcIiBbbmdTdHlsZV09XCJ7J2Rpc3BsYXknOiBlcnJvckRpc3BsYXl9XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbFwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgW25nU3R5bGVdPVwieydkaXNwbGF5JzogZXJyb3JEaXNwbGF5fVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiIChjbGljayk9XCJvbkVycm9ySGFuZGxlKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPiBcbiAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+e3sgZXJyb3JEYXRhPy50aXRsZSB9fTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+e3sgZXJyb3JEYXRhPy5tZXNzYWdlIH19PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmFpbHRcIiAoY2xpY2spPVwib25FcnJvckhhbmRsZSgpXCI+Q2xvc2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+IDwhLS0gbW9kYWwtY29udGVudC0tPiAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+PCEtLSBtb2RhbC1kaWFsb2ctLT5cbiAgICAgICAgPC9kaXY+PCEtLSBtb2RhbC0tPlxuICAgIGAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICAuYmFja2Ryb3Age1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLDAsMCwwLjYpO1xuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgfSAgICAgICAgXG4gICAgYF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBFcnJvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgZXJyb3JEaXNwbGF5ID0gJ25vbmUnO1xuICAgIGVycm9yRGF0YTogRXJyb3I7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lcnJvclNlcnZpY2U6IEVycm9yU2VydmljZSkge31cblxuICAgIG9uRXJyb3JIYW5kbGUoKSB7XG4gICAgICAgIHRoaXMuZXJyb3JEaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9lcnJvclNlcnZpY2UuZXJyb3JPY2N1cnJlZC5zdWJzY3JpYmUoXG4gICAgICAgICAgZXJyb3JEYXRhID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5lcnJvckRhdGEgPSBlcnJvckRhdGE7XG4gICAgICAgICAgICAgIHRoaXMuZXJyb3JEaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtSb3V0ZUNvbmZpZywgUk9VVEVSX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcbmltcG9ydCB7TWVzc2FnZXNDb21wb25lbnR9IGZyb20gXCIuL21lc3NhZ2VzL21lc3NhZ2VzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtBdXRoZW50aWNhdGlvbkNvbXBvbmVudH0gZnJvbSBcIi4vYXV0aC9hdXRoZW50aWNhdGlvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7SGVhZGVyQ29tcG9uZW50fSBmcm9tIFwiLi9oZWFkZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge0Vycm9yQ29tcG9uZW50fSBmcm9tIFwiLi9lcnJvcnMvZXJyb3IuY29tcG9uZW50XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktYXBwJyxcbiAgICB0ZW1wbGF0ZTogYCAgXG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8bXktaGVhZGVyPjwvbXktaGVhZGVyPlxuICAgICAgICAgICAgICAgIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPG15LWVycm9yPjwvbXktZXJyb3I+XG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVMsIEhlYWRlckNvbXBvbmVudCwgRXJyb3JDb21wb25lbnRdXG5cbn0pXG5cbkBSb3V0ZUNvbmZpZyhbXG4gICAge3BhdGg6ICcvJywgbmFtZTogJ01lc3NhZ2VzJywgY29tcG9uZW50OiBNZXNzYWdlc0NvbXBvbmVudCwgdXNlQXNEZWZhdWx0OiB0cnVlfSxcbiAgICB7cGF0aDogJy9hdXRoLy4uLicsIG5hbWU6ICdBdXRoJywgY29tcG9uZW50OiBBdXRoZW50aWNhdGlvbkNvbXBvbmVudH1cbl0pXG5cbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuXG59IiwiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3R5cGluZ3MvYnJvd3Nlci5kLnRzXCIvPlxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiYXBwLmNvbXBvbmVudC50c1wiLz5cbmltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbmltcG9ydCB7QXBwQ29tcG9uZW50fSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tIFwiLi9tZXNzYWdlcy9tZXNzYWdlLnNlcnZpY2VcIjtcbmltcG9ydCB7Uk9VVEVSX1BST1ZJREVSUywgTG9jYXRpb25TdHJhdGVneSwgSGFzaExvY2F0aW9uU3RyYXRlZ3l9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcbmltcG9ydCB7cHJvdmlkZX0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7SFRUUF9QUk9WSURFUlN9IGZyb20gXCJhbmd1bGFyMi9odHRwXCI7XG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tIFwiLi9hdXRoL2F1dGguc2VydmljZVwiO1xuaW1wb3J0IHtFcnJvclNlcnZpY2V9IGZyb20gXCIuL2Vycm9ycy9lcnJvci5zZXJ2aWNlXCI7XG5cbmJvb3RzdHJhcChBcHBDb21wb25lbnQsIFtNZXNzYWdlU2VydmljZSwgQXV0aFNlcnZpY2UsIEVycm9yU2VydmljZSAsUk9VVEVSX1BST1ZJREVSUywgcHJvdmlkZShMb2NhdGlvblN0cmF0ZWd5LCB7dXNlQ2xhc3M6IEhhc2hMb2NhdGlvblN0cmF0ZWd5fSksIEhUVFBfUFJPVklERVJTXSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
