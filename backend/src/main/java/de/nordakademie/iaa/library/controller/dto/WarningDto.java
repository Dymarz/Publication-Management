package de.nordakademie.iaa.library.controller.dto;

import java.util.Date;
import java.util.UUID;


/**
 * A Warning is an element in an Overdue Notice.
 * Warnings are often letters that will be sent out to the Borrower.
 */
public class WarningDto {
    private UUID uuid;

    private Date warningDate;

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public Date getWarningDate() {
        return warningDate;
    }

    public void setWarningDate(Date warningDate) {
        this.warningDate = warningDate;
    }
}
