import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { ListCardComponent } from './list-card/list-card.component';
import { ListComponent } from './list/list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { HttpClientModule } from '@angular/common/http';
import { PROTOCOL_AWARE_XSRF_INTERCEPTOR } from './security/protocol-aware-xsrf.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SearchFilterComponent,
    ListCardComponent,
    ListComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MultiselectDropdownModule
  ],
  providers: [PROTOCOL_AWARE_XSRF_INTERCEPTOR],
  bootstrap: [AppComponent]
})
export class AppModule { }
