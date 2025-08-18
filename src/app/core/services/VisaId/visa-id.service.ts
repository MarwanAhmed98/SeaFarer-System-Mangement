import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisaIdService {

  constructor(private httpClient: HttpClient) { }

  getVisaId(): Observable<any> {
    return this.httpClient.get('http://176.9.184.190/api/LegalAffairs/FillVendor?Id=0&text=&Direction=ltr&InCT');
  }
}
