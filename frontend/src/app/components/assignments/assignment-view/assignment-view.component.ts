import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Assignment } from 'src/app/models/assignment';
import { Borrower } from 'src/app/models/borrower';

@Component({
    selector: 'app-assignment-view',
    templateUrl: './assignment-view.component.html',
    styleUrls: ['./assignment-view.component.scss'],
})
export class AssignmentViewComponent implements OnInit {
    @Input()
    assignment: Assignment = {};

    @Input()
    allBorrowers: Borrower[] = [];

    formGroup = new FormGroup({
        publicationKey: new FormControl<string>(''),
        dateOfAssignment: new FormControl<Date>(new Date()),
        dateOfReturn: new FormControl<Date>(new Date()),
        borrower: new FormControl<string | Borrower>(''),
    });

    filteredBorrowers: Observable<Borrower[]> = new Observable<Borrower[]>();

    ngOnInit(): void {
        if (this.assignment) {
            this.formGroup.disable();
            this.formGroup.patchValue(this.assignment);
        }

        this._reloadView();
    }

    onSubmit(): void {}

    displayBorrower(borrower: Borrower): string {
        return borrower?.surname && borrower?.name
            ? borrower.surname + ' ' + borrower.name
            : '';
    }

    private _filterBorrowers(value: string): Borrower[] {
        const filterValue = value.toLowerCase();

        return this.allBorrowers.filter(
            (borrower) =>
                borrower.surname?.toLowerCase().includes(filterValue) ||
                borrower.name?.toLowerCase().includes(filterValue)
        );
    }

    private _reloadView(): void {
        this.filteredBorrowers = this.formGroup
            .get('borrower')!
            .valueChanges.pipe(
                startWith(''),
                map((borrower) => {
                    let value = '';

                    if (typeof borrower === 'string') {
                        value = borrower;
                    } else if (borrower?.surname && borrower?.name) {
                        value = borrower?.surname + borrower?.name;
                    }

                    return value
                        ? this._filterBorrowers(value as string)
                        : this.allBorrowers.slice();
                })
            );
    }
}
