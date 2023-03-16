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
    headerTitle: string = 'Ticket-Board';
    showHistory: boolean = false;
    onUpdateListSubject: Subject<Observable<Ticket[]>> = new Subject<Observable<Ticket[]>>();

    constructor(private ticketService: TicketService) {
        this.data = ticketService.getAll();
    }

    createTicket = (ticket: Ticket): Observable<Ticket> => {
        return this.ticketService.create(ticket);
    };

    ngOnInit(): void {}

    onBack(): void {
        this.headerTitle = 'Ticket-Board';
        this.currentRecord = undefined;
        this.isViewOpen = false;
    }

    onEdit(): void {
        this.headerTitle = 'Ticket-Editing';
        this.isViewOpen = true;
    }

    onAdd(): void {
        this.headerTitle = 'Ticket-Creation';
        this.currentRecord = undefined;
        this.isViewOpen = true;
    }

    onSelect(ticket: Ticket): void {
        this.currentRecord = ticket;
    }

    changeShowHistory(): void {
        this.showHistory = !this.showHistory;
        this.onUpdateListSubject.next(this.ticketService.getAll());
    }
}
