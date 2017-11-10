
// Imports
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpParams} from '@angular/common/http';
// Import Coin Shape file
import {Coin} from './coin';
const API_BASE_URL = 'https://api.coinmarketcap.com/v1/';

@Injectable()
export class AppService {
  private allCoins: Coin[]; // will hold unmodified data returned by the api
  private filteredCoins: Coin[]; // will hold data filtered from this.allCoins
  private filter: number[]; // will hold the array index of data contained in this. allCoins that should not be filtered out
  // A couple of RxJs Subjects very important for communicating across Angular Components
  coinsSubject: Subject<Coin[]>;
  filteredCoinsSubject: Subject<Coin[]>;
  apiSubject: Subject<string>;
  fiatSubject: Subject<string>;
  constructor(private http: HttpClient) {
    this.filter = [];
    // we initialize our subjects
    this.coinsSubject = new Subject();
    this.filteredCoinsSubject = new Subject();
    this.apiSubject = new Subject();
    this.fiatSubject = new Subject();
  }
  // this method loads market cap data from the API
  loadMarketCaps(fiat: string) {
    this.fiatSubject.next(fiat);
    const url = API_BASE_URL + 'ticker/';
    let params = new HttpParams();
    params = params.append('limit', '25');
    if (fiat !== 'usd') {
      // TODO: check if fiat is valid
      params = params.append('convert', fiat);
    }
    this.apiSubject.next('loading...');
    this.http
      .get<Coin[]>(url, {params})
      .subscribe(
      data => {
        this.allCoins = data; // store returned data
        this.announceCoins(); // trigger announcements
        this.filterMarketCaps();
      }
      );
  }
  filterMarketCaps() {
    this.filteredCoins = [];
    if (this.filter.length === 0) {
      this.allCoins.forEach((coin) => this.filteredCoins.push(coin));
    }
    if (this.filter.length > 0) {
      this.filter.forEach((i) => {
        this.filteredCoins.push(this.allCoins[i]);
      });
    }
    this.announceFilteredCoins();
  }
  announceCoins() {
    this.coinsSubject.next(this.allCoins);
  }
  announceFilteredCoins() {
    this.filteredCoinsSubject.next(this.filteredCoins);
  }
  updateFilter(filter: number[]) {
    this.filter = [];
    filter.forEach((elem) => {
      this.filter.push(elem);
    });
    this.filterMarketCaps();
  }
}
