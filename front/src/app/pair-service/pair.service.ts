import { Injectable } from '@angular/core';
import { delay, Observable, of} from 'rxjs';
import { pair, PairForm } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PairService {

  constructor() { }

  createPair(pair: PairForm) {
    console.log(pair);
  }

}
