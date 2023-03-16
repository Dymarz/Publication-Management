// Author: Kevin Jahrens
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Snackbar } from '../helpers/snackbar';
import { Ticket } from '../models/ticket';

const ENDPOINT_URL: string = '/rest/ticket';

@Injectable({
    providedIn: 'root',
})
export class TicketService {
    constructor(private snackBar: Snackbar, private http: HttpClient) {}

    getAll(): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(ENDPOINT_URL).pipe(
            catchError((err: HttpErrorResponse) => {
                throw this._handleError(err);
            })
        );
    }

    create(ticket: Ticket): Observable<Ticket> {
        return this.http.post<Ticket>(ENDPOINT_URL, ticket).pipe(
            catchError((err: HttpErrorResponse) => {
                throw this._handleError(err);
            })
        );
    }

    private _handleError(err: HttpErrorResponse): HttpErrorResponse {
        if (err.error.error) {
            this.snackBar.open('Es ist etwas schief gelaufen');
        } else {
            this.snackBar.open(err.error);
        }
        return err;
    }
}
