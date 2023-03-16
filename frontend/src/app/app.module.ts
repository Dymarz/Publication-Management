import { LOCALE_ID, NgModule } from '@angular/core';

// Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { GermanDateAdapter } from './helpers/german-date-adapter';
import { TicketsComponent } from './components/tickets/tickets.component';
import { TicketListComponent } from './components/tickets/ticket-list/ticket-list.component';
import { TicketViewComponent } from './components/tickets/ticket-view/ticket-view.component';

import { getGermanPaginatorIntl } from './helpers/german-paginator-intl';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@NgModule({
    declarations: [
        AppComponent,
        TicketsComponent,
        TicketListComponent,
        TicketViewComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatTableModule,
        MatIconModule,
        MatSortModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatCheckboxModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatSelectModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTabsModule,
        MatSnackBarModule,
        MatSlideToggleModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'de-DE' },
        { provide: DateAdapter, useClass: GermanDateAdapter },
        { provide: MatPaginatorIntl, useValue: getGermanPaginatorIntl() },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(dateAdapter: DateAdapter<Date>) {
        dateAdapter.setLocale('de-DE');
    }
}
