import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transcript } from 'app/models/ui-models/transcript/transcript.model';

@Injectable({
  providedIn: 'root'
})
export class TranscriptService {

  private baseAPiUrl ='https://localhost:44350';

  constructor(private httpClient: HttpClient) { }

  public GetTranscript(){
    return this.httpClient.get<Transcript>(this.baseAPiUrl + '/api/StudentData/transcript');
  }
}
