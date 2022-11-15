import { Component } from '@angular/core';
import { KindOfPublication } from 'src/app/models/kind-of-publication';
import { CrudComponent } from '../../../helpers/CrudComponent';

@Component({
    selector: 'app-basedata-kinds',
    templateUrl: './basedata-kinds.component.html',
    styleUrls: ['../basedata.common.scss'],
})
export class BasedataKindsComponent extends CrudComponent<KindOfPublication> {
    displayedColumns: string[] = ['kindOfPublication'];

    override _emitCreate(record: KindOfPublication): string {
        if (!record.value?.trim()) return 'Nothing to add!';

        this.create.emit({ value: record.value });
        return record.value + ' created!';
    }

    override _emitUpdate(record: KindOfPublication): string {
        if (this.selectedRecord?.value === record.value)
            return 'Nothing to change!';

        this.selectedRecord!.value = record.value;
        this.update.emit(this.selectedRecord);
        return record.value + ' updated!';
    }

    override _getRecordFromInputFields(): KindOfPublication {
        var name = (<HTMLInputElement>document.getElementById('input-value-of-pub'))
            .value;
        return { value: name };
    }

    override _clearInputFields(): void {
        (<HTMLInputElement>document.getElementById('input-value-of-pub')).value = '';
    }
}
