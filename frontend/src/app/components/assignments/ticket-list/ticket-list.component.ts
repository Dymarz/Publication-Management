// Author: Marcel Dymarz
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GermanDateAdapter } from 'src/app/helpers/german-date-adapter';
import { Snackbar } from 'src/app/helpers/snackbar';
import { TableInitsComponent } from 'src/app/helpers/table-inits';
import { Ticket } from 'src/app/models/ticket';

@Component({
    selector: 'app-ticket-list',
    templateUrl: './ticket-list.component.html',
    styleUrls: ['../../../helpers/list-component.scss'],
})
export class TicketListComponent extends TableInitsComponent<Ticket> implements OnInit, OnDestroy {
    @Input()
    tickets: Observable<Ticket[]> = new Observable<Ticket[]>();

    @Output()
    showTicket = new EventEmitter<Ticket>();

    @Input()
    updateDataOnReturn?: Observable<Ticket>;

    @Input()
    updateData?: Observable<Observable<Ticket[]>>;

    displayedColumns: string[] = [
        'publicationKey',
        'publicationTitle',
        'surname',
        'name',
        'studentNumber',
        'dateOfTicket',
        'dateOfReturn',
        'latestReturnDate',
        'extensions',
    ];

    selectedTicket?: Ticket;

    private eventsSubscription?: Subscription;

    constructor(private snackBar: Snackbar) {
        super();
    }

    ngOnInit(): void {
        this._loadData(this.tickets);
        this.eventsSubscription = this.updateDataOnReturn?.subscribe((a) => {
            this.dataSource.data = this.dataSource.data.map((ticket) => {
                if (ticket.uuid === a.uuid) {
                    return a;
                }
                return ticket;
            });
            this.snackBar.open('Buch zurückgegeben!');
        });
        this.eventsSubscription = this.updateData?.subscribe((tickets) => {
            this._loadData(tickets);
        });
    }

    ngOnDestroy() {
        this.eventsSubscription?.unsubscribe();
    }

    onShowTicket(ticket: Ticket): void {
        if (ticket === this.selectedTicket) {
            this.showTicket.emit(undefined);
            this.selectedTicket = undefined;
        } else {
            this.showTicket.emit(ticket);
            this.selectedTicket = ticket;
        }
    }

    protected _defineFilterPredicate(): (data: Ticket, filter: string) => boolean {
        return (data: Ticket, filter: string): boolean => {
            const allValuesInOneString =
                '' ;
            return allValuesInOneString?.trim().toLowerCase().includes(filter) ?? false;
        };
    }

    protected override _defineSortingAccessor(): (data: Ticket, property: string) => string {
        return (data: Ticket, property: string) => {
            switch (property) {
                default: {
                    return '';
                }
            }
        };
    }

    private _convertDate(date: Date | null | undefined): string {
        const germanDateAdapter: GermanDateAdapter = new GermanDateAdapter();
        return date ? germanDateAdapter.formatDateToShortString(date) : '-';
    }

    private _loadData(tickets: Observable<Ticket[]>): void {
        tickets.subscribe((tickets) => {
            this.dataSource.data = tickets;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
}
