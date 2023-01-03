import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pair } from '../types';
// import { words, meanings } from '../data';
import { words, meanings } from '../data';

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
  // words: string[] = []
  words: string[] = words;
  // meanings: string[] = []
  meanings: string[] = meanings;
  // pairs: Pair[] = [];

  constructor(private http: HttpClient) {}

  // getPairs(): Observable<Pair[]> {
  //   return this.http.get<Pair[]>(this.apiUrl);
  // }

  // getPairs(): Pair[] {
  //   return PAIRS;
  // }

  deletePair(pair: Pair): Observable<Pair> {
    const url = `${this.apiUrl}/${pair.id}`;
    return this.http.delete<Pair>(url);
  }


  // updateTaskReminder(pair: Pair): Observable<Pair> {
  //   const url = `${this.apiUrl}/${pair.id}`;
  //   return this.http.put<Pair>(url, pair, httpOptions);
  // }



  // addPair(pair: Pair): Observable<Pair> {
  //   // console.log("KIRE KHAR:", pair);
  //   return this.http.post<Pair>(this.apiUrl, pair, httpOptions);
  // }

  addPair(pair: Pair) {
    // console.log("Omad Too addPair");
    // return this.http.post<Pair>(this.apiUrl, pair, httpOptions);
    if (this.words.map(word => word.toLowerCase()).includes(pair.word.toLowerCase())) {
      alert('Word already exists');
      return;
    }
    this.words.push(pair.word); //Inja mese koskhola daram instance khode in service az words ro angool mikonam na ooni ke too data.ts e
    this.meanings.push(pair.meaning);
    console.log("This Words:", this.words, "This Meanings:", this.meanings);
    console.log("Words:", words, "Meanings:", meanings);

    // this.pairs = this.getPairs()
    // this.getPairs().push(pair);
    // console.log("PAIRS:", PAIRS)
    return;
  }
}
