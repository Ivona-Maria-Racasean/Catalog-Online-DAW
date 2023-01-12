import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MessageDto } from 'app/interfaces/messages/messageDto';
import { CurrentUser } from 'app/models/ui-models/currentUser.model';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { MessagesService } from 'app/shared/services/messages.service';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.css']
})
export class MessageDisplayComponent implements OnInit {

  displayedColumns: string[] = ['secretary', 'noMessages', 'actions'];
  dataSource: MatTableDataSource<string> = new MatTableDataSource<string>();
  @ViewChild(MatPaginator, {static: true}) matPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort!: MatSort;

  myMessages: MessageDto[]
  currentUser: CurrentUser

  displayedSecretaryMessages: string;
  displayedMessages: MessageDto[]

  authService: AuthenticationService
  messageService: MessagesService

  mappedMessages: Map<string, MessageDto[]>

  constructor(_authService: AuthenticationService, _messageService: MessagesService) {
    this.authService = _authService;
    this.messageService = _messageService;
  }

  async ngOnInit() {
    this.currentUser = await this.authService.getCurrentUser().toPromise()
    this.myMessages = await this.messageService.getMyMessages(this.currentUser.id).toPromise();
    this.displayedSecretaryMessages = '';

    this.mappedMessages = new Map<string, MessageDto[]>()

    this.myMessages.forEach(message => {

      if(this.mappedMessages.get(message.sender.name) == null){
        var sendersMessage = []
        sendersMessage.push(message)

        this.mappedMessages.set(message.sender.name, sendersMessage)
      }
      else{
        this.mappedMessages.get(message.sender.name).push(message)
      }
    });

    var mappedMessagesKeys = Array.from(this.mappedMessages.keys())

    mappedMessagesKeys.forEach(secretary => {
      this.mappedMessages.get(secretary).sort(this.compareMessages)
    })

    this.dataSource = new MatTableDataSource<string>(mappedMessagesKeys);
  }

  showSecretaryMessage(secretaryName: string){
    if(this.displayedSecretaryMessages === secretaryName){
      this.displayedSecretaryMessages = '';
      return
    }
    this.displayedSecretaryMessages = secretaryName;
    this.displayedMessages = this.mappedMessages.get(this.displayedSecretaryMessages)
  }

  compareMessages(a: MessageDto, b: MessageDto ) {
    if ( a.messageNumber < b.messageNumber ){
      return 1;
    }
    if ( a.messageNumber > b.messageNumber ){
      return -1;
    }
    return 0;
  }
}
