// Author: Kevin Jahrens
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Snackbar } from 'src/app/helpers/snackbar';
import { Ticket } from 'src/app/models/ticket';
@Component({
    selector: 'app-ticket-view',
    templateUrl: './ticket-view.component.html',
    styleUrls: ['./ticket-view.component.scss'],
})
export class TicketViewComponent implements OnInit {
    @Input()
    ticket?: Ticket;

    @Input()
    extend?: (uuid: string) => Observable<Ticket>;

    @Input()
    returnTicket?: (uuid: string) => Observable<Ticket>;

    @Input()
    create?: (ticket: Ticket) => Observable<Ticket>;

    formGroup = new FormGroup({
        dateOfTicket: new FormControl<Date>(new Date()),
        dateOfReturn: new FormControl<Date | undefined>({ value: undefined, disabled: true }),
        latestReturnDate: new FormControl<Date | undefined>({ value: undefined, disabled: true }),
   
        extensions: new FormControl<number>({ value: 0, disabled: true }),
    });


    constructor(private snackBar: Snackbar) {}

    ngOnInit(): void {
        if (this.ticket) {
            this.formGroup.disable();
            this.formGroup.patchValue(this.ticket);
        }

    }

    onSubmit(): void {
        if (!this.formGroup.valid) return;


        this.create!(this.formGroup.value).subscribe((a) => {
            this.formGroup.patchValue(a);
            this.formGroup.disable();
            this.ticket = a;
            this.snackBar.open('Vorgang erstellt!');
        });
    }

   

    

    onExtend(): void {
        if (!this.ticket?.uuid) return;

        this.extend!(this.ticket.uuid).subscribe((a) => {
            this.formGroup.patchValue(a);
            this.ticket = a;
            this.snackBar.open('Vorgang verlängert!');
        });
    }

    onCancel(): void {
        this.formGroup.reset();
    }

    onReturn(): void {
        if (!this.ticket?.uuid) return;

        this.returnTicket!(this.ticket.uuid).subscribe((a) => {
            this.formGroup.patchValue(a);
            this.ticket = a;
            this.snackBar.open('Buch zurückgegeben!');
        });
    }

    


    
}
