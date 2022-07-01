import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BillService {

  private baseUrl = 'http://localhost:8080/api/v1/bills';

  constructor(private http: HttpClient) { }

  getBill(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createBill(Bill: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, Bill);
  }

  updateBill(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  getBillList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getBillListByMesAno(mesAno: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${mesAno}`);
  }
}