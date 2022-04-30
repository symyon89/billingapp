import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../interface/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.apiURL + "/product";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) {
  }
  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url);
  }

  getByID(id: string): Observable<Product> {
    return this.httpClient.get<Product>(this.url + '/' + id);
  }

  save(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.url, JSON.stringify(product), this.httpOptions);
  }
  update(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.url, JSON.stringify(product), this.httpOptions);
  }

  deleteById(id: string): Observable<Product> {
    return this.httpClient.delete<Product>(this.url + '/' + id, this.httpOptions);
  }
}
