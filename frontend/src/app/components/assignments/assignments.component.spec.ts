import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { AssignmentViewComponent } from './assignment-view/assignment-view.component';

import { AssignmentsComponent } from './assignments.component';

describe('AssignmentsComponent', () => {
    let component: AssignmentsComponent;
    let fixture: ComponentFixture<AssignmentsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatTableModule,
                MatFormFieldModule,
                MatInputModule,
                MatIconModule,
                MatPaginatorModule,
                BrowserAnimationsModule,
            ],
            declarations: [
                AssignmentsComponent,
                AssignmentListComponent,
                AssignmentViewComponent,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AssignmentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
