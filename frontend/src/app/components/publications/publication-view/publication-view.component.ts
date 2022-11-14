import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Keyword } from 'src/app/models/keyword';
import { Publication } from 'src/app/models/publication';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { KindOfPublication } from 'src/app/models/kind-of-publication';
import { Author } from 'src/app/models/author';

@Component({
    selector: 'app-publication-view',
    templateUrl: './publication-view.component.html',
    styleUrls: ['./publication-view.component.scss'],
})
export class PublicationViewComponent implements OnInit {
    @ViewChild('form')
    form!: NgForm;

    @ViewChild('keywordInput')
    keywordInput!: ElementRef<HTMLInputElement>;

    @ViewChild('authorInput')
    authorInput!: ElementRef<HTMLInputElement>;

    @Input()
    publication: Publication = new Publication();

    @Input()
    allKeywords: Keyword[] = [];

    @Input()
    allAuthors: Author[] = [];

    @Input()
    allKindsOfPublication: KindOfPublication[] = [];

    @Output()
    deletePublication = new EventEmitter<Publication>();

    @Output()
    savePublication = new EventEmitter<Publication>();

    editable: boolean = false;

    savedPublication: Publication = new Publication();

    separatorKeysCodes: number[] = [ENTER, COMMA];

    keywordControl = new FormControl<string | Keyword>('');

    authorControl = new FormControl<string | Author>('');

    kindOfPublicationControl = new FormControl<string | KindOfPublication>('');

    filteredKeywords: Observable<Keyword[]> = new Observable<Keyword[]>();

    filteredAuthors: Observable<Author[]> = new Observable<Author[]>();

    filteredKindsOfPublication: Observable<KindOfPublication[]> =
        new Observable<KindOfPublication[]>();

    ngOnInit(): void {
        if (this.publication) {
            this.savedPublication = structuredClone(this.publication);
        } else {
            this.editable = true;
        }

        this._reloadView();
    }

    onDeletePublication(): void {
        this.deletePublication.emit(this.publication);
    }

    onSubmit(): void {
        if (!this.form.valid) return;

        const kindOfPublication = this.kindOfPublicationControl.value;

        if (kindOfPublication) {
            this._setValueToKindOfPublication(kindOfPublication);
        } else {
            this.publication.kindsOfPublication = undefined;
        }

        this.savedPublication = structuredClone(this.publication);
        this.savePublication.emit(this.publication);
        this.editable = false;
    }

    onCancel(): void {
        this.editable = false;
        this.publication = structuredClone(this.savedPublication);
        this._reloadView();
    }

    onEdit(): void {
        this.editable = true;
    }

    removeKeyword(keyword: Keyword): void {
        if (this.publication.keywords) {
            const index = this.publication.keywords.indexOf(keyword);

            if (index >= 0) {
                this.publication.keywords?.splice(index, 1);
            }
        }
    }

    removeAuthor(author: Author): void {
        if (this.publication.author) {
            const index = this.publication.author.indexOf(author);

            if (index >= 0) {
                this.publication.author?.splice(index, 1);
            }
        }
    }

    addKeyword(event: MatChipInputEvent): void {
        if (!this.publication.keywords) return;

        const value = (event.value || '').trim();

        const keywords = this._filterKeywords(value as string);
        if (keywords.length === 1) {
            this.publication.keywords.push(keywords[0]);
        } else {
            const keyword = new Keyword();
            keyword.value = value;
            this.publication.keywords.push(keyword);
        }

        event.chipInput!.clear();
        this.keywordControl.setValue('');
    }

    addAuthor(event: MatChipInputEvent): void {
        if (!this.publication.author) return;

        const value = (event.value || '').trim();
        const authors = this._filterAuthors(value as string);

        if (authors.length === 1) {
            this.publication.author.push(authors[0]);
        } else {
            const author = new Author();
            author.surname = value.split(' ')[0];
            author.name = value.split(' ')[1];
            this.publication.author.push(author);
        }

        event.chipInput!.clear();
        this.authorControl.setValue('');
    }

    selectedKeyword(event: MatAutocompleteSelectedEvent): void {
        if (this.publication.keywords) {
            this.publication.keywords.push(event.option.value);
            this.keywordInput.nativeElement.value = '';
            this.keywordControl.setValue('');
        }
    }

    selectedAuthor(event: MatAutocompleteSelectedEvent): void {
        if (this.publication.author) {
            this.publication.author.push(event.option.value);
            this.authorInput.nativeElement.value = '';
            this.authorControl.setValue('');
        }
    }

    displayKindOfPublication(kindOfPublication: KindOfPublication): string {
        return kindOfPublication?.value ?? '';
    }

    displayKeyword(keyword: Keyword): string {
        return keyword?.value ?? '';
    }

    displayAuthor(author: Author): string {
        return author?.surname && author?.name
            ? author.surname + author.name
            : '';
    }

    private _filterKeywords(value: string): Keyword[] {
        const filterValue = value.toLowerCase();

        return this.allKeywords.filter((keyword) =>
            keyword.value?.toLowerCase().includes(filterValue)
        );
    }

    private _filterAuthors(value: string): Author[] {
        const filterValue = value.toLowerCase();

        return this.allAuthors.filter(
            (author) =>
                author.surname?.toLowerCase().includes(filterValue) ||
                author.name?.toLowerCase().includes(filterValue)
        );
    }

    private _filterKindsOfPublication(value: string): KindOfPublication[] {
        const filterValue = value.toLowerCase();

        return this.allKindsOfPublication.filter((kindOfPublication) =>
            kindOfPublication.value?.toLowerCase().includes(filterValue)
        );
    }

    private _reloadView(): void {
        this.filteredKeywords = this.keywordControl.valueChanges.pipe(
            startWith(''),
            map((keyword) => {
                const value =
                    typeof keyword === 'string' ? keyword : keyword?.value;
                return value
                    ? this._filterKeywords(value as string)
                    : this.allKeywords.slice();
            })
        );

        this.filteredAuthors = this.authorControl.valueChanges.pipe(
            startWith(''),
            map((author) => {
                let value = '';

                if (typeof author === 'string') {
                    value = author;
                } else if (author?.surname && author?.name) {
                    value = author?.surname + author?.name;
                }

                return value
                    ? this._filterAuthors(value as string)
                    : this.allAuthors.slice();
            })
        );

        this.filteredKindsOfPublication =
            this.kindOfPublicationControl.valueChanges.pipe(
                startWith(''),
                map((kindOfPublication) => {
                    const value =
                        typeof kindOfPublication === 'string'
                            ? kindOfPublication
                            : kindOfPublication?.value;
                    return value
                        ? this._filterKindsOfPublication(value as string)
                        : this.allKindsOfPublication.slice();
                })
            );

        if (
            this.publication.kindsOfPublication &&
            this.publication.kindsOfPublication[0]
        ) {
            this.kindOfPublicationControl.setValue(
                this.publication.kindsOfPublication[0]
            );
        }
    }

    private _setValueToKindOfPublication(value: string | KindOfPublication): void {
        if (typeof value === 'string') {
            this.publication.kindsOfPublication = [new KindOfPublication()];
            this.publication.kindsOfPublication[0].value =
            value;
        } else {
            this.publication.kindsOfPublication = [value];
        }
    }
}
