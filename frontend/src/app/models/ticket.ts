// Author: Kevin Jahrens

import { Entity } from './entity';

export interface Ticket extends Entity {
    subject?: string | null;
    description?: string | null;
    linkedTickets?: number | null;
    createdFrom?: string | null;
    status?: boolean | null;
}
