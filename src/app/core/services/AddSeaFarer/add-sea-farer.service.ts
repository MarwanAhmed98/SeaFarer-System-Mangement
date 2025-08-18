import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddSeaFarerService {

  constructor(private httpClient: HttpClient) { }
  AddFarer(Data: object): Observable<any> {
    return this.httpClient.post('https://test.erppluscloud.com:4338/api/MarineServices/SaveSeafarer', Data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

}

