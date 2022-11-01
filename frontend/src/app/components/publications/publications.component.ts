import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from 'src/app/models/publication';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
    selector: 'app-publications',
    templateUrl: './publications.component.html',
    styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent {
    publications$: Observable<Publication[]>;
    currentPublication?: Publication;
    openPublication: boolean = false;

    constructor(private publicationService: PublicationService) {
        this.publications$ = publicationService.loadAllPublications();
    }

    onSelectPublication(publication: Publication): void {
        this.currentPublication = publication;
    }

    onShowPublication(): void {
        this.openPublication = !this.openPublication;
    }

    onDeletePublication(publication: Publication | undefined): void {
        this.publicationService.deletePublication(publication);
    }

    onSavePublication(publication: Publication | undefined): void {
        this.publicationService.savePublication(publication);
    }

    onCancel(): void {
        this.currentPublication = undefined;
        this.openPublication = false;
    }
}
