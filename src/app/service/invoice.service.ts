import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Invoice} from "../interface/invoice";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private url = environment.apiURL + "/invoice";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {
  }
  getAll(): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(this.url);
  }

  getByID(id: string): Observable<Invoice> {
    return this.httpClient.get<Invoice>(this.url + '/' + id);
  }

  save(invoice: Invoice): Observable<Invoice> {
    return this.httpClient.post<Invoice>(this.url, JSON.stringify(invoice), this.httpOptions);
  }
  update(invoice: Invoice): Observable<Invoice> {
    return this.httpClient.put<Invoice>(this.url, JSON.stringify(invoice), this.httpOptions);
  }

  deleteById(id: string): Observable<Invoice> {
    return this.httpClient.delete<Invoice>(this.url + '/' + id, this.httpOptions);
  }
}
