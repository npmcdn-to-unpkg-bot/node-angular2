import {Component} from 'angular2/core';
import {MessageComponent} from "./messages/message.component";
import {Message} from "./messages/message";

@Component({
    selector: 'my-app',
    template: `  
      <div class="row">

     </div>
      <div class="row">
            <section class="col-md-8 col-md-offset-2">
                <my-message [message]="message"></my-message>
            </section>
    </div>

    `,
    directives: [MessageComponent]
})
export class AppComponent {
    message: Message = new Message('Brand new message',null, 'Anthony');
}