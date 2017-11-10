import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css'],
  providers: []
})
export class SearchFilterComponent implements OnInit {
  currencies: string[];
  cryptoCurrOptions: IMultiSelectOption[];
  selectedCurrency: string;
  optionsModel: number[];
  // Settings configuration for the multiselect plugin
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 5,
    displayAllSelectedText: true
  };
  // Text configuration for the multiselect plugin
  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Filter cryptos',
    allSelected: 'All selected',
  };
  constructor(private appService: AppService) {
    this.currencies = ['usd', 'eur']; // fiat currency options
    this.selectedCurrency = ''; // model to store selected fiat
    // array to hold names of cryptos to be used in filtering
    this.cryptoCurrOptions = [];
    // coinsSubject is a RxJs subject in our service that will notify us when the api has gotten data about crypto coins
    this.appService.coinsSubject.subscribe({
      next: (v) => this.updateCryptoOptions(v),
    });
  }
  ngOnInit() {
  }
  selectCurrency(newValue) {
    this.appService.loadMarketCaps(newValue);
  }
  filterChange(newValue) {
    // BUG method should not be triggered by filter select
    this.appService.updateFilter(newValue);
  }
  // This method creates an array of valid options for the multiselect plugin from an array of crypto coins
  updateCryptoOptions(coins) {
    this.cryptoCurrOptions = [];
    coins.forEach((coin, index) => {
      this.cryptoCurrOptions.push({
        id: index,
        name: coin.id.charAt(0).toUpperCase() + coin.id.slice(1)
      });
    });
  }
}
