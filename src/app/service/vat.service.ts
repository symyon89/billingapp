import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vat} from "../interface/vat";

@Injectable({
  providedIn: 'root'
})
export class VatService {
  private url = environment.apiURL + "/vat";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) {
  }
  getAll(): Observable<Vat[]> {
    return this.httpClient.get<Vat[]>(this.url);
  }

  getByID(id: string): Observable<Vat> {
    return this.httpClient.get<Vat>(this.url + '/' + id);
  }

  save(vat: Vat): Observable<Vat> {
    return this.httpClient.post<Vat>(this.url, JSON.stringify(vat), this.httpOptions);
  }
  update(vat: Vat): Observable<Vat> {
    return this.httpClient.put<Vat>(this.url, JSON.stringify(vat), this.httpOptions);
  }

  deleteById(id: string): Observable<Vat> {
    return this.httpClient.delete<Vat>(this.url + '/' + id, this.httpOptions);
  }
}
