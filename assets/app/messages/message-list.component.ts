import {Component} from 'angular2/core';
import {MessageComponent} from "./message.component";
import {Message} from "./message";

@Component({
    selector: 'my-message-list',
    template: `
       <section class="col-md-8 col-md-offset-2">
           <my-message *ngFor="#message of messages" [message]="message"  (editClicked)="message.content = $event"></my-message>         
           <!-- The underlying code is for beta17 > rc*  release -->
           <!-- <my-message *ngFor="let message of messages" [message]="message"  (editClicked)="message.content = $event"></my-message> -->
        </section>              
    `,
    directives: [MessageComponent]
})

export class MessageListComponent {
    messages: Message[] = [
        new Message('Brand new message',null, 'Anthony'),
        new Message('I am J.J. Winters',null, 'Jake'),
        new Message('Hi, am Jesus',null, 'Jesus')
    ];
}