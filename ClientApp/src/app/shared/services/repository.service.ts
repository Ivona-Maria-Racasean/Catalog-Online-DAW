import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient) {}

  public getClaims = (route: string) => {
    return this.http.get('https://localhost:44350/' + route);
 }
}
