import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveService {

  constructor(private httpClient: HttpClient) { }
  ActivateSeaFarer(id: number, status: number, empId: number): Observable<any> {
    return this.httpClient.post(
      `http://176.9.184.190/api/MarineServices/ActivateAndInActivateSeafarer?Id=${id}&Status=${status}&EmpId=${empId}`,
      {}
    );
  }


}
