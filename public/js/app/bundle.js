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
System.register("messages/message.component", ["angular2/core", "messages/message"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_1, message_1;
    var MessageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (message_1_1) {
                message_1 = message_1_1;
            }],
        execute: function() {
            MessageComponent = (function () {
                function MessageComponent() {
                    this.editClicked = new core_1.EventEmitter();
                    this.show = true;
                }
                MessageComponent.prototype.onClick = function () {
                    this.editClicked.emit('Changed');
                    console.log('Edit button clicked!');
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', message_1.Message)
                ], MessageComponent.prototype, "message", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], MessageComponent.prototype, "editClicked", void 0);
                MessageComponent = __decorate([
                    core_1.Component({
                        selector: 'my-message',
                        template: "\n         <article class=\"panel panel-default\" *ngIf=\"show\">\n            <div class=\"panel-body\">\n                {{ message.content }}\n            </div>    \n            <footer class=\"panel-footer\">\n                <div class=\"author\">\n                {{ message.username }}\n                </div>\n                <div class=\"config\">\n                    <a (click)=\"onClick()\">Edit</a>\n                    <a href=\"#\">Delete</a>\n               </div>\n            </footer>\n         </article>  \n    ",
                        styles: [
                            "\n            .author {\n                display: inline-block;\n                font-style: italic;\n                font-size: 12px;\n                width: 80%;\n            }\n            .config {\n                display: inline-block;\n                text-align: right;\n                font-size: 12px;\n                width: 19%;\n            }\n        "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MessageComponent);
                return MessageComponent;
            }());
            exports_2("MessageComponent", MessageComponent);
        }
    }
});
System.register("app.component", ['angular2/core', "messages/message.component", "messages/message"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_2, message_component_1, message_2;
    var AppComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (message_component_1_1) {
                message_component_1 = message_component_1_1;
            },
            function (message_2_1) {
                message_2 = message_2_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.messages = [
                        new message_2.Message('Brand new message', null, 'Anthony'),
                        new message_2.Message('I am J.J. Winters', null, 'Jake'),
                        new message_2.Message('Hi, am Jesus', null, 'Jesus')
                    ];
                }
                AppComponent = __decorate([
                    core_2.Component({
                        selector: 'my-app',
                        template: "  \n      <div class=\"row\">\n\n     </div>\n      <div class=\"row\">\n            <section class=\"col-md-8 col-md-offset-2\">\n                <my-message *ngFor=\"#message of messages\" [message]=\"message\"  (editClicked)=\"message.content = $event\"></my-message>                \n            </section>\n    </div>\n\n    ",
                        directives: [message_component_1.MessageComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_3("AppComponent", AppComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', "app.component"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var browser_1, app_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent);
        }
    }
});
System.register("auth/user", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
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
            exports_5("User", User);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2UudHMiLCJtZXNzYWdlcy9tZXNzYWdlLmNvbXBvbmVudC50cyIsImFwcC5jb21wb25lbnQudHMiLCJib290LnRzIiwiYXV0aC91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBQTtnQkFNSSx3REFBd0Q7Z0JBQ3hELDJEQUEyRDtnQkFDM0QsaUJBQWEsT0FBZSxFQUFFLFNBQWtCLEVBQUUsUUFBaUIsRUFBRSxNQUFlO29CQUNoRixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO29CQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDekIsQ0FBQztnQkFDTCxjQUFDO1lBQUQsQ0FkQSxBQWNDLElBQUE7WUFkRCw2QkFjQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7WUN5QkQ7Z0JBQUE7b0JBRWEsZ0JBQVcsR0FBRyxJQUFJLG1CQUFZLEVBQVUsQ0FBQztvQkFDbEQsU0FBSSxHQUFHLElBQUksQ0FBQztnQkFRaEIsQ0FBQztnQkFMRyxrQ0FBTyxHQUFQO29CQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQ3hDLENBQUM7Z0JBUkY7b0JBQUMsWUFBSyxFQUFFOztpRUFBQTtnQkFDUjtvQkFBQyxhQUFNLEVBQUU7O3FFQUFBO2dCQXJDWjtvQkFBQyxnQkFBUyxDQUFDO3dCQUNQLFFBQVEsRUFBRSxZQUFZO3dCQUN0QixRQUFRLEVBQUUsdWhCQWVUO3dCQUNELE1BQU0sRUFBRTs0QkFDSiwrV0FhQyxDQUFDO3FCQUNULENBQUM7O29DQUFBO2dCQWFGLHVCQUFDO1lBQUQsQ0FYQSxBQVdDLElBQUE7WUFYRCwrQ0FXQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUMvQkQ7Z0JBQUE7b0JBQ0ksYUFBUSxHQUFjO3dCQUNsQixJQUFJLGlCQUFPLENBQUMsbUJBQW1CLEVBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQzt3QkFDaEQsSUFBSSxpQkFBTyxDQUFDLG1CQUFtQixFQUFDLElBQUksRUFBRSxNQUFNLENBQUM7d0JBQzdDLElBQUksaUJBQU8sQ0FBQyxjQUFjLEVBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztxQkFDNUMsQ0FBQztnQkFDTixDQUFDO2dCQXJCRDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNQLFFBQVEsRUFBRSxRQUFRO3dCQUNsQixRQUFRLEVBQUUsNFVBVVQ7d0JBQ0QsVUFBVSxFQUFFLENBQUMsb0NBQWdCLENBQUM7cUJBQ2pDLENBQUM7O2dDQUFBO2dCQU9GLG1CQUFDO1lBQUQsQ0FOQSxBQU1DLElBQUE7WUFORCx1Q0FNQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztZQ3JCRCxtQkFBUyxDQUFDLDRCQUFZLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7WUNKeEI7Z0JBRUksb0ZBQW9GO2dCQUNwRixxRkFBcUY7Z0JBQ3JGLHNGQUFzRjtnQkFDdEYsY0FBbUIsS0FBYSxFQUFTLFFBQWdCLEVBQVMsU0FBa0IsRUFBUyxRQUFpQjtvQkFBM0YsVUFBSyxHQUFMLEtBQUssQ0FBUTtvQkFBUyxhQUFRLEdBQVIsUUFBUSxDQUFRO29CQUFTLGNBQVMsR0FBVCxTQUFTLENBQVM7b0JBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUztvQkFDMUcsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBQ0wsV0FBQztZQUFELENBUkEsQUFRQyxJQUFBO1lBUkQsdUJBUUMsQ0FBQSIsImZpbGUiOiIuLi8uLi8uLi9ub2RlLWFuZ3VsYXIyL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNZXNzYWdlIHtcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgdXNlcm5hbWU6IHN0cmluZztcbiAgICBtZXNzYWdlSWQ6IHN0cmluZztcbiAgICB1c2VySWQ6IHN0cmluZztcblxuICAgIC8vIFRoZSA/IGJlaGluZCB0aGUgcGFyYW1ldGVycyBpbiB0aGUgY29uc3RydWN0b3IgbWVhbnMsXG4gICAgLy8gdGhhdCB0aGUgdmFsdWVzIGRvbid0IG5lZWQgdG8gYmUgYXZhaWxhYmxlIG9yIHByZXNlbnRlZC5cbiAgICBjb25zdHJ1Y3RvciAoY29udGVudDogc3RyaW5nLCBtZXNzYWdlSWQ/OiBzdHJpbmcsIHVzZXJuYW1lPzogc3RyaW5nLCB1c2VySWQ/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgdGhpcy5tZXNzYWdlSWQgPSBtZXNzYWdlSWQ7XG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcbiAgICAgICAgdGhpcy51c2VySWQgPSB1c2VySWQ7XG4gICAgfVxufSIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gXCIuL21lc3NhZ2VcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LW1lc3NhZ2UnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIiAqbmdJZj1cInNob3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAge3sgbWVzc2FnZS5jb250ZW50IH19XG4gICAgICAgICAgICA8L2Rpdj4gICAgXG4gICAgICAgICAgICA8Zm9vdGVyIGNsYXNzPVwicGFuZWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhvclwiPlxuICAgICAgICAgICAgICAgIHt7IG1lc3NhZ2UudXNlcm5hbWUgfX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29uZmlnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJvbkNsaWNrKClcIj5FZGl0PC9hPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPkRlbGV0ZTwvYT5cbiAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICA8L2FydGljbGU+ICBcbiAgICBgLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgXG4gICAgICAgICAgICAuYXV0aG9yIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICAgICAgICB3aWR0aDogODAlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmNvbmZpZyB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTklO1xuICAgICAgICAgICAgfVxuICAgICAgICBgXVxufSlcblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VDb21wb25lbnQge1xuICAgQElucHV0KCkgbWVzc2FnZTpNZXNzYWdlO1xuICAgQE91dHB1dCgpIGVkaXRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gICAgc2hvdyA9IHRydWU7XG5cblxuICAgIG9uQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuZWRpdENsaWNrZWQuZW1pdCgnQ2hhbmdlZCcpO1xuICAgICAgICBjb25zb2xlLmxvZygnRWRpdCBidXR0b24gY2xpY2tlZCEnKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7TWVzc2FnZUNvbXBvbmVudH0gZnJvbSBcIi4vbWVzc2FnZXMvbWVzc2FnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSBcIi4vbWVzc2FnZXMvbWVzc2FnZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LWFwcCcsXG4gICAgdGVtcGxhdGU6IGAgIFxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuXG4gICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgICAgICA8bXktbWVzc2FnZSAqbmdGb3I9XCIjbWVzc2FnZSBvZiBtZXNzYWdlc1wiIFttZXNzYWdlXT1cIm1lc3NhZ2VcIiAgKGVkaXRDbGlja2VkKT1cIm1lc3NhZ2UuY29udGVudCA9ICRldmVudFwiPjwvbXktbWVzc2FnZT4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgPC9kaXY+XG5cbiAgICBgLFxuICAgIGRpcmVjdGl2ZXM6IFtNZXNzYWdlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuICAgIG1lc3NhZ2VzOiBNZXNzYWdlW10gPSBbXG4gICAgICAgIG5ldyBNZXNzYWdlKCdCcmFuZCBuZXcgbWVzc2FnZScsbnVsbCwgJ0FudGhvbnknKSxcbiAgICAgICAgbmV3IE1lc3NhZ2UoJ0kgYW0gSi5KLiBXaW50ZXJzJyxudWxsLCAnSmFrZScpLFxuICAgICAgICBuZXcgTWVzc2FnZSgnSGksIGFtIEplc3VzJyxudWxsLCAnSmVzdXMnKVxuICAgIF07XG59IiwiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3R5cGluZ3MvYnJvd3Nlci5kLnRzXCIvPlxuaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuaW1wb3J0IHtBcHBDb21wb25lbnR9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcblxuYm9vdHN0cmFwKEFwcENvbXBvbmVudCk7IiwiZXhwb3J0IGNsYXNzIFVzZXIge1xuXG4gICAgLy8gTG9vayBhdCB0aGUgcHJvcGVydGllcyBpbiB0aGUgY29uc3RydWN0b3IsIFdoYXQgSSBkbyBoZXJlIGlzIHNvbWV0aGluZyBiZWF1dGlmdWwuXG4gICAgLy8gSSBpbnN0YW50bHkgZGVmaW5lIHRoZSBwcm9wZXJ0aWVzIGFzIHB1YmxpYy4gVGhpcyB3aWwgZ2V0IHRoZSBwcm9wZXJ0aWVzIGFuZCBhbHNvLFxuICAgIC8vIGNyZWF0ZSBhIGZpZWxkIGluIHRoaXMgY2xhc3MgbGlrZSB0aGlzLmVtYWlsLiBMZXNzIGNvZGUsIGFuZCBkbyB0aGUgc2FtZSB0aGluZy4gOi0pXG4gICAgY29uc3RydWN0b3IocHVibGljIGVtYWlsOiBzdHJpbmcsIHB1YmxpYyBwYXNzd29yZDogc3RyaW5nLCBwdWJsaWMgZmlyc3ROYW1lPzogc3RyaW5nLCBwdWJsaWMgbGFzdE5hbWU/OiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmVtYWlsID0gZW1haWw7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
