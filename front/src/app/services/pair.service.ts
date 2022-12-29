import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pair } from '../types';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PairService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  getPairs(): Observable<Pair[]> {
    return this.http.get<Pair[]>(this.apiUrl);
  }

  deletePair(pair: Pair): Observable<Pair> {
    const url = `${this.apiUrl}/${pair.id}`;
    return this.http.delete<Pair>(url);
  }

  // updateTaskReminder(pair: Pair): Observable<Pair> {
  //   const url = `${this.apiUrl}/${pair.id}`;
  //   return this.http.put<Pair>(url, pair, httpOptions);
  // }

  addPair(pair: Pair): Observable<Pair> {
    // console.log("KIRE KHAR:", pair);
    return this.http.post<Pair>(this.apiUrl, pair, httpOptions);
  }
}
