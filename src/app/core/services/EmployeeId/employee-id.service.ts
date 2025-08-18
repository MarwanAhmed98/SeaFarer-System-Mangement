import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeIdService {

  constructor(private httpClient: HttpClient) { }

  getEmployeeId(): Observable<any> {
    return this.httpClient.get('http://176.9.184.190/api/POS/FillEmployee?Id=0&text=&Direction=ltr&InCT');
  }
}
