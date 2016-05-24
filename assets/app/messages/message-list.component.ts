import {Component, OnInit} from 'angular2/core';
import {MessageComponent} from "./message.component";
import {Message} from "./message";
import {MessageService} from "./message.service";

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

export class MessageListComponent implements  OnInit {

    constructor(private _messageService: MessageService) {}

    // local Messages
    messages: Message[];

    ngOnInit() {
        this._messageService.getMessages()
            .subscribe(
                messages => {
                    this.messages = messages;
                    this._messageService.messages = messages;
                }
            );
    }
}