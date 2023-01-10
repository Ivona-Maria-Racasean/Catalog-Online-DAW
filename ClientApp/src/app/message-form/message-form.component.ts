import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NewMessageDto } from 'app/interfaces/messages/newMessageDto';
import { CurrentUser } from 'app/models/ui-models/currentUser.model';
import { User } from 'app/models/ui-models/user.model';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { MessagesService } from 'app/shared/services/messages.service';
import { UsersService } from 'app/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {

  _userService: UsersService;
  _authService: AuthenticationService;
  _messageService: MessagesService;
  _router: Router;

  currentUser: CurrentUser;
  teachers: User[];
  selectedTeacher: string;
  messageContent: string;

  invalidTeacher: boolean;
  invalidMessage: boolean;

  constructor(
      userService: UsersService, authService: AuthenticationService, 
      messageService: MessagesService, router: Router) { 
    this._userService = userService;
    this._authService = authService;
    this._messageService = messageService;
    this._router = router;
   }

  async ngOnInit() {
    this.teachers = await this._userService.GetTeachers().toPromise();
    this.currentUser = await this._authService.getCurrentUser().toPromise();
    console.log(this.teachers)
    console.log(this.currentUser)
    this.selectedTeacher = "-1"
    this.messageContent = "";
    
    this.invalidMessage = false;
    this.invalidTeacher = false;
  }

  sendMessage(){
    this.invalidMessage = false;
    this.invalidTeacher = false;
    if(this.selectedTeacher == "-1"){
      this.invalidTeacher = true
      return;
    }
    if(this.messageContent.length < 5){
      this.invalidMessage = true;
      return;
    }

    let message: NewMessageDto = {
      secretaryId: this.currentUser.id,
      teacherId: this.selectedTeacher,
      content: this.messageContent
    }

    console.log(message)

    this._messageService.sendMessage(message).subscribe((res)=>{
      console.log(res)
      this.selectedTeacher = "-1"
      this.messageContent = ""
      Swal.fire({
        title: "Message sent",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      })
    }, (err)=> {
      Swal.fire({
        title: "There was an error...please try later",
        icon: "error",
        showConfirmButton: false
      })
    })


  }

}
