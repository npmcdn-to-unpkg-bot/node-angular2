var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("app.component", ['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.message = {
                        content: 'A message',
                        author: 'Anthony'
                    };
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "  \n      <div class=\"row\">\n            <section class=\"col-md-8 col-md-offset-2\">\n                <input type=\"text\" [(ngModel)]=\"message.content\"><br><br>                \n            </section>  \n     </div>\n      <div class=\"row\">\n            <section class=\"col-md-8 col-md-offset-2\">\n                     <article class=\"panel panel-default\">\n                         <div class=\"panel-body\">\n                            {{ message.content }}\n                        </div>\n                        <footer class=\"panel-footer\">\n                              <div class=\"author\">\n                                   {{ message.author }}\n                              </div>\n                              <div class=\"config\">\n                                 <a href=\"#\">Edit</a>\n                                 <a href=\"#\">Delete</a>\n                             </div>\n                        </footer>\n                     </article>    \n            </section>\n    </div>\n\n    ",
                        styles: [
                            "\n            .author {\n                display: inline-block;\n                font-style: italic;\n                font-size: 12px;\n                width: 80%;\n            }\n            .config {\n                display: inline-block;\n                text-align: right;\n                font-size: 12px;\n                width: 19%;\n            }\n        "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', "app.component"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiLCJib290LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBNkNBO2dCQUFBO29CQUNJLFlBQU8sR0FBRzt3QkFDTixPQUFPLEVBQUUsV0FBVzt3QkFDcEIsTUFBTSxFQUFFLFNBQVM7cUJBQ3BCLENBQUM7Z0JBRU4sQ0FBQztnQkFsREQ7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDUCxRQUFRLEVBQUUsUUFBUTt3QkFDbEIsUUFBUSxFQUFFLDJnQ0F5QlQ7d0JBQ0QsTUFBTSxFQUFFOzRCQUNKLCtXQWFDLENBQUM7cUJBQ1QsQ0FBQzs7Z0NBQUE7Z0JBT0YsbUJBQUM7WUFBRCxDQU5BLEFBTUMsSUFBQTtZQU5ELHVDQU1DLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O1lDL0NELG1CQUFTLENBQUMsNEJBQVksQ0FBQyxDQUFDIiwiZmlsZSI6Ii4uLy4uLy4uL25vZGUtYW5ndWxhcjIvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1hcHAnLFxuICAgIHRlbXBsYXRlOiBgICBcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgWyhuZ01vZGVsKV09XCJtZXNzYWdlLmNvbnRlbnRcIj48YnI+PGJyPiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIDwvc2VjdGlvbj4gIFxuICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG1lc3NhZ2UuY29udGVudCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9vdGVyIGNsYXNzPVwicGFuZWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0aG9yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG1lc3NhZ2UuYXV0aG9yIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb25maWdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+RWRpdDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+RGVsZXRlPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICAgICAgICAgICAgICAgPC9hcnRpY2xlPiAgICBcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICA8L2Rpdj5cblxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGBcbiAgICAgICAgICAgIC5hdXRob3Ige1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgICAgIHdpZHRoOiA4MCU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuY29uZmlnIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxOSU7XG4gICAgICAgICAgICB9XG4gICAgICAgIGBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gICAgbWVzc2FnZSA9IHtcbiAgICAgICAgY29udGVudDogJ0EgbWVzc2FnZScsXG4gICAgICAgIGF1dGhvcjogJ0FudGhvbnknXG4gICAgfTtcblxufSIsIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90eXBpbmdzL2Jyb3dzZXIuZC50c1wiLz5cbmltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbmltcG9ydCB7QXBwQ29tcG9uZW50fSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5cbmJvb3RzdHJhcChBcHBDb21wb25lbnQpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
