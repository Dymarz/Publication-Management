// Author: Marcel Dymarz
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: ['../../helpers/core-component.scss'],
})
export class TicketsComponent implements OnInit {
    data: Observable<Ticket[]>;
    onReturnSubject: Subject<Ticket> = new Subject<Ticket>();
    isViewOpen: boolean = false;
    currentRecord?: Ticket;    
    headerTitle: string = "Ausleihvorgänge";
    showHistory: boolean = false;
    onUpdateListSubject: Subject<Observable<Ticket[]>> = new Subject<Observable<Ticket[]>>();

    constructor(
        private ticketService: TicketService
    ) {
        this.data = ticketService.getAll();
    }

    extend = (uuid: string): Observable<any> => {
        return this.ticketService.extend(uuid);
    };

    returnTicket = (uuid: string): Observable<Ticket> => {
        return this.ticketService.return(uuid);
    };

    onReturn(uuid: string | undefined | null): void {
        if(!uuid) return;
        this.ticketService.return(uuid).subscribe((ticket) => {
            this.onReturnSubject.next(ticket);
        });
    }

    createTicket = (ticket: Ticket): Observable<Ticket> => {
        return this.ticketService.create(ticket);
    };

    ngOnInit(): void {
    }

    onBack(): void {
        this.headerTitle = "Ausleihvorgänge";
        this.currentRecord = undefined;
        this.isViewOpen = false;
    }

    onEdit(): void {
        this.headerTitle = "Ausleihvorgang bearbeiten";
        this.isViewOpen = true;
    }

    onAdd(): void {
        this.headerTitle = "Ausleihvorgang hinzufügen";
        this.currentRecord = undefined;
        this.isViewOpen = true;
    }

    onSelect(ticket: Ticket): void {
        this.currentRecord = ticket;
    }

    changeShowHistory(): void {
        this.showHistory = !this.showHistory;
        if(this.showHistory) {
            this.onUpdateListSubject.next(this.ticketService.getAllWithReturned());
        } else {
            this.onUpdateListSubject.next(this.ticketService.getAll());
        }
    }
}
