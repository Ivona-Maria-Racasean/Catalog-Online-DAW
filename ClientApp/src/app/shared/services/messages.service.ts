import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewMessageDto } from 'app/interfaces/messages/newMessageDto';
import { ApiCallPaths } from '../paths/apiCallPaths';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  public sendMessage(message: NewMessageDto) {
    return this.http.post(ApiCallPaths.apiUrl + ApiCallPaths.postMessagePath, message)
  }
}
