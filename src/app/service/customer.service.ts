import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Customer} from '../interface/customer';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = environment.apiURL + "/customer";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.url);
  }

  getByID(id: string): Observable<Customer> {
    return this.httpClient.get<Customer>(this.url + '/' + id);
  }

  save(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(this.url, JSON.stringify(customer), this.httpOptions);
  }
  update(customer: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(this.url, JSON.stringify(customer), this.httpOptions);
  }

  deleteById(id: string): Observable<Customer> {
    return this.httpClient.delete<Customer>(this.url + '/' + id, this.httpOptions);
  }

}
