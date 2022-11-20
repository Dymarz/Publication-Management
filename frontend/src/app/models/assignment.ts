import { Borrower } from "./borrower";
import { Publication } from "./publication";
import { Entity } from './entity';

export interface Assignment extends Entity {
    uuid?: string | null;
    dateOfAssignment?: Date | null;
    dateOfReturn?: Date | null;
    borrower?: Borrower | null;
    extensions?: number | null;
    publication?: Publication | null;
    latestReturnDate?: Date | null;
    publicationLoss?: boolean | null;
}
