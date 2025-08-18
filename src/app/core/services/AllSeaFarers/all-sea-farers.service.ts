import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllSeaFarersService {

  constructor(private httpClient: HttpClient) { }

  getAllSeaFarers(): Observable<any> {
    return this.httpClient.get('https://test.erppluscloud.com:4338/api/MarineServices/GetAllSeafarers?Direction=ltr&InCT');
  }
}
