import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Manufacturer} from '../interface/manufacturer';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  private url = environment.apiURL + "/manufacturer";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<Manufacturer[]> {
    return this.httpClient.get<Manufacturer[]>(this.url);
  }

  getByID(id: string): Observable<Manufacturer> {
    return this.httpClient.get<Manufacturer>(this.url + '/' + id);
  }

  save(manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.httpClient.post<Manufacturer>(this.url, JSON.stringify(manufacturer), this.httpOptions);
  }
  update(manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.httpClient.put<Manufacturer>(this.url, JSON.stringify(manufacturer), this.httpOptions);
  }

  deleteById(id: string): Observable<Manufacturer> {
    return this.httpClient.delete<Manufacturer>(this.url + '/' + id, this.httpOptions);
  }
}
