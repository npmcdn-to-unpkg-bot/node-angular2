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
                    this.messages[this.messages.indexOf(message)] = new message_1.Message('Edited', null, 'Dummy');
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
                MessageInputComponent.prototype.onCreate = function (content) {
                    var message = new message_3.Message(content, null, 'dummy');
                    this._messageService.addMessage(message);
                };
                MessageInputComponent = __decorate([
                    core_3.Component({
                        selector: 'my-message-input',
                        template: "\n       <section class=\"col-md-8 col-md-offset-2\">\n            <div class=\"form-group\">\n                <label for=\"content\">Content</label>\n                <input type=\"text\" class=\"form-control\" id=\"content\" #input>                \n            </div>\n            <button type=\"submit\" class=\"btn btn-primary\" (click)=\"onCreate(input.value)\">Send Message</button>\n       </section>\n    "
                    }), 
                    __metadata('design:paramtypes', [message_service_3.MessageService])
                ], MessageInputComponent);
                return MessageInputComponent;
            }());
            exports_5("MessageInputComponent", MessageInputComponent);
        }
    }
});
System.register("app.component", ['angular2/core', "messages/message-list.component", "messages/message-input.component"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_4, message_list_component_1, message_input_component_1;
    var AppComponent;
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
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_4.Component({
                        selector: 'my-app',
                        template: "  \n      <div class=\"row spacing\">\n           <my-message-input></my-message-input>\n     </div>\n      <div class=\"row spacing\">\n           <my-message-list></my-message-list>\n    </div>\n\n    ",
                        directives: [message_list_component_1.MessageListComponent, message_input_component_1.MessageInputComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_6("AppComponent", AppComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', "app.component", "messages/message.service"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var browser_1, app_component_1, message_service_4;
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
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [message_service_4.MessageService]);
        }
    }
});
System.register("auth/user", [], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
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
            exports_8("User", User);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2UudHMiLCJtZXNzYWdlcy9tZXNzYWdlLnNlcnZpY2UudHMiLCJtZXNzYWdlcy9tZXNzYWdlLmNvbXBvbmVudC50cyIsIm1lc3NhZ2VzL21lc3NhZ2UtbGlzdC5jb21wb25lbnQudHMiLCJtZXNzYWdlcy9tZXNzYWdlLWlucHV0LmNvbXBvbmVudC50cyIsImFwcC5jb21wb25lbnQudHMiLCJib290LnRzIiwiYXV0aC91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBQTtnQkFNSSx3REFBd0Q7Z0JBQ3hELDJEQUEyRDtnQkFDM0QsaUJBQWEsT0FBZSxFQUFFLFNBQWtCLEVBQUUsUUFBaUIsRUFBRSxNQUFlO29CQUNoRixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO29CQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDekIsQ0FBQztnQkFDTCxjQUFDO1lBQUQsQ0FkQSxBQWNDLElBQUE7WUFkRCw2QkFjQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7WUNaRDtnQkFBQTtvQkFDSSxhQUFRLEdBQWMsRUFBRSxDQUFDO2dCQWtCN0IsQ0FBQztnQkFoQkcsbUNBQVUsR0FBVixVQUFXLE9BQWdCO29CQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQy9CLENBQUM7Z0JBRUQsb0NBQVcsR0FBWDtvQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDekIsQ0FBQztnQkFFRCxvQ0FBVyxHQUFYLFVBQVksT0FBZ0I7b0JBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEs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NkNBQW9CLEVBQUUsK0NBQXFCLENBQUM7cUJBQzVELENBQUM7O2dDQUFBO2dCQUdGLG1CQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFGRCx1Q0FFQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQ2RELG1CQUFTLENBQUMsNEJBQVksRUFBRSxDQUFDLGdDQUFjLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztZQ0wxQztnQkFFSSxvRkFBb0Y7Z0JBQ3BGLHFGQUFxRjtnQkFDckYsc0ZBQXNGO2dCQUN0RixjQUFtQixLQUFhLEVBQVMsUUFBZ0IsRUFBUyxTQUFrQixFQUFTLFFBQWlCO29CQUEzRixVQUFLLEdBQUwsS0FBSyxDQUFRO29CQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7b0JBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUztvQkFBUyxhQUFRLEdBQVIsUUFBUSxDQUFTO29CQUMxRyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsQ0FBQztnQkFDTCxXQUFDO1lBQUQsQ0FSQSxBQVFDLElBQUE7WUFSRCx1QkFRQyxDQUFBIiwiZmlsZSI6Ii4uLy4uLy4uL25vZGUtYW5ndWxhcjIvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE1lc3NhZ2Uge1xuICAgIGNvbnRlbnQ6IHN0cmluZztcbiAgICB1c2VybmFtZTogc3RyaW5nO1xuICAgIG1lc3NhZ2VJZDogc3RyaW5nO1xuICAgIHVzZXJJZDogc3RyaW5nO1xuXG4gICAgLy8gVGhlID8gYmVoaW5kIHRoZSBwYXJhbWV0ZXJzIGluIHRoZSBjb25zdHJ1Y3RvciBtZWFucyxcbiAgICAvLyB0aGF0IHRoZSB2YWx1ZXMgZG9uJ3QgbmVlZCB0byBiZSBhdmFpbGFibGUgb3IgcHJlc2VudGVkLlxuICAgIGNvbnN0cnVjdG9yIChjb250ZW50OiBzdHJpbmcsIG1lc3NhZ2VJZD86IHN0cmluZywgdXNlcm5hbWU/OiBzdHJpbmcsIHVzZXJJZD86IHN0cmluZykge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB0aGlzLm1lc3NhZ2VJZCA9IG1lc3NhZ2VJZDtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgICAgICB0aGlzLnVzZXJJZCA9IHVzZXJJZDtcbiAgICB9XG59IiwiaW1wb3J0IHtNZXNzYWdlfSBmcm9tIFwiLi9tZXNzYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlU2VydmljZXtcbiAgICBtZXNzYWdlczogTWVzc2FnZVtdID0gW107XG5cbiAgICBhZGRNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1lc3NhZ2VzKTtcbiAgICB9XG5cbiAgICBnZXRNZXNzYWdlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZXM7XG4gICAgfVxuXG4gICAgZWRpdE1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzW3RoaXMubWVzc2FnZXMuaW5kZXhPZihtZXNzYWdlKV0gPSBuZXcgTWVzc2FnZSgnRWRpdGVkJywgbnVsbCwgJ0R1bW15Jyk7XG4gICAgfVxuXG4gICAgZGVsZXRlTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZXMuc3BsaWNlKHRoaXMubWVzc2FnZXMuaW5kZXhPZihtZXNzYWdlKSwgMSk7XG4gICAgfVxufSIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gXCIuL21lc3NhZ2VcIjtcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gXCIuL21lc3NhZ2Uuc2VydmljZVwiO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktbWVzc2FnZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiICpuZ0lmPVwic2hvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICB7eyBtZXNzYWdlLmNvbnRlbnQgfX1cbiAgICAgICAgICAgIDwvZGl2PiAgICBcbiAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCJwYW5lbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0aG9yXCI+XG4gICAgICAgICAgICAgICAge3sgbWVzc2FnZS51c2VybmFtZSB9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb25maWdcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm9uRWRpdCgpXCI+RWRpdDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm9uRGVsZXRlKClcIj5EZWxldGU8L2E+XG4gICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICAgPC9hcnRpY2xlPiAgXG4gICAgYCxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYFxuICAgICAgICAgICAgLmF1dGhvciB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwJTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5jb25maWcge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDE5JTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlQ29tcG9uZW50IHtcbiAgIEBJbnB1dCgpIG1lc3NhZ2U6TWVzc2FnZTtcbiAgIEBPdXRwdXQoKSBlZGl0Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAgIHNob3cgPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlKSB7fVxuXG4gICAgb25FZGl0KCkge1xuICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5lZGl0TWVzc2FnZSh0aGlzLm1lc3NhZ2UpO1xuICAgICAgICBjb25zb2xlLmxvZygnRWRpdCBidXR0b24gY2xpY2tlZCEnKTtcbiAgICB9XG5cbiAgICBvbkRlbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UuZGVsZXRlTWVzc2FnZSh0aGlzLm1lc3NhZ2UpO1xuICAgICAgICBjb25zb2xlLmxvZygnRGVsZXRlIGJ1dHRvbiBjbGlja2VkIScpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge01lc3NhZ2VDb21wb25lbnR9IGZyb20gXCIuL21lc3NhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gXCIuL21lc3NhZ2VcIjtcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gXCIuL21lc3NhZ2Uuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LW1lc3NhZ2UtbGlzdCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICA8c2VjdGlvbiBjbGFzcz1cImNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMlwiPlxuICAgICAgICAgICA8bXktbWVzc2FnZSAqbmdGb3I9XCIjbWVzc2FnZSBvZiBtZXNzYWdlc1wiIFttZXNzYWdlXT1cIm1lc3NhZ2VcIiAgKGVkaXRDbGlja2VkKT1cIm1lc3NhZ2UuY29udGVudCA9ICRldmVudFwiPjwvbXktbWVzc2FnZT4gICAgICAgICBcbiAgICAgICAgICAgPCEtLSBUaGUgdW5kZXJseWluZyBjb2RlIGlzIGZvciBiZXRhMTcgPiByYyogIHJlbGVhc2UgLS0+XG4gICAgICAgICAgIDwhLS0gPG15LW1lc3NhZ2UgKm5nRm9yPVwibGV0IG1lc3NhZ2Ugb2YgbWVzc2FnZXNcIiBbbWVzc2FnZV09XCJtZXNzYWdlXCIgIChlZGl0Q2xpY2tlZCk9XCJtZXNzYWdlLmNvbnRlbnQgPSAkZXZlbnRcIj48L215LW1lc3NhZ2U+IC0tPlxuICAgICAgICA8L3NlY3Rpb24+ICAgICAgICAgICAgICBcbiAgICBgLFxuICAgIGRpcmVjdGl2ZXM6IFtNZXNzYWdlQ29tcG9uZW50XVxufSlcblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgIE9uSW5pdCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UpIHt9XG5cbiAgICBtZXNzYWdlczogTWVzc2FnZVtdO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSB0aGlzLl9tZXNzYWdlU2VydmljZS5nZXRNZXNzYWdlcygpO1xuICAgIH1cbn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gXCIuL21lc3NhZ2VcIjtcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gXCIuL21lc3NhZ2Uuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LW1lc3NhZ2UtaW5wdXQnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNvbnRlbnRcIj5Db250ZW50PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiY29udGVudFwiICNpbnB1dD4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgKGNsaWNrKT1cIm9uQ3JlYXRlKGlucHV0LnZhbHVlKVwiPlNlbmQgTWVzc2FnZTwvYnV0dG9uPlxuICAgICAgIDwvc2VjdGlvbj5cbiAgICBgXG59KVxuXG5leHBvcnQgY2xhc3MgTWVzc2FnZUlucHV0Q29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSkge31cblxuICAgIG9uQ3JlYXRlKGNvbnRlbnQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBtZXNzYWdlOiBNZXNzYWdlID0gbmV3IE1lc3NhZ2UoY29udGVudCwgbnVsbCwgJ2R1bW15Jyk7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLmFkZE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfVxufSIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7TWVzc2FnZUxpc3RDb21wb25lbnR9IGZyb20gXCIuL21lc3NhZ2VzL21lc3NhZ2UtbGlzdC5jb21wb25lbnRcIjtcbmltcG9ydCB7TWVzc2FnZUlucHV0Q29tcG9uZW50fSBmcm9tIFwiLi9tZXNzYWdlcy9tZXNzYWdlLWlucHV0LmNvbXBvbmVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LWFwcCcsXG4gICAgdGVtcGxhdGU6IGAgIFxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBzcGFjaW5nXCI+XG4gICAgICAgICAgIDxteS1tZXNzYWdlLWlucHV0PjwvbXktbWVzc2FnZS1pbnB1dD5cbiAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93IHNwYWNpbmdcIj5cbiAgICAgICAgICAgPG15LW1lc3NhZ2UtbGlzdD48L215LW1lc3NhZ2UtbGlzdD5cbiAgICA8L2Rpdj5cblxuICAgIGAsXG4gICAgZGlyZWN0aXZlczogW01lc3NhZ2VMaXN0Q29tcG9uZW50LCBNZXNzYWdlSW5wdXRDb21wb25lbnRdIFxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuXG59IiwiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3R5cGluZ3MvYnJvd3Nlci5kLnRzXCIvPlxuaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuaW1wb3J0IHtBcHBDb21wb25lbnR9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gXCIuL21lc3NhZ2VzL21lc3NhZ2Uuc2VydmljZVwiO1xuXG5ib290c3RyYXAoQXBwQ29tcG9uZW50LCBbTWVzc2FnZVNlcnZpY2VdKTsiLCJleHBvcnQgY2xhc3MgVXNlciB7XG5cbiAgICAvLyBMb29rIGF0IHRoZSBwcm9wZXJ0aWVzIGluIHRoZSBjb25zdHJ1Y3RvciwgV2hhdCBJIGRvIGhlcmUgaXMgc29tZXRoaW5nIGJlYXV0aWZ1bC5cbiAgICAvLyBJIGluc3RhbnRseSBkZWZpbmUgdGhlIHByb3BlcnRpZXMgYXMgcHVibGljLiBUaGlzIHdpbCBnZXQgdGhlIHByb3BlcnRpZXMgYW5kIGFsc28sXG4gICAgLy8gY3JlYXRlIGEgZmllbGQgaW4gdGhpcyBjbGFzcyBsaWtlIHRoaXMuZW1haWwuIExlc3MgY29kZSwgYW5kIGRvIHRoZSBzYW1lIHRoaW5nLiA6LSlcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW1haWw6IHN0cmluZywgcHVibGljIHBhc3N3b3JkOiBzdHJpbmcsIHB1YmxpYyBmaXJzdE5hbWU/OiBzdHJpbmcsIHB1YmxpYyBsYXN0TmFtZT86IHN0cmluZyl7XG4gICAgICAgIHRoaXMuZW1haWwgPSBlbWFpbDtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
