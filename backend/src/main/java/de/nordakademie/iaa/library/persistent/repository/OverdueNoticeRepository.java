package de.nordakademie.iaa.library.persistent.repository;

import de.nordakademie.iaa.library.persistent.entities.OverdueNotice;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;


/**
 * This repository is for managing the database access to the OverdueNotice table.
 * This is only an interface. The repository will be generated by spring data.
 */
@Repository
public interface OverdueNoticeRepository extends CustomBaseRepository<OverdueNotice, String> {

    /**
     * This will overwrite the findAll method so that it returns a list and not an iterable.
     */
    @Query("SELECT DISTINCT o FROM OverdueNotice o " +
            "LEFT OUTER JOIN FETCH o.warnings " +
            "LEFT OUTER JOIN FETCH o.assignment a " +
            "LEFT OUTER JOIN FETCH a.publication " +
            "LEFT OUTER JOIN FETCH a.borrower " +
            "WHERE o.openedAt < :now " +
            "AND (:showClosed = true " +
            "OR o.closedAt is null " +
            "OR o.closedAt > :now)")
    List<OverdueNotice> findAllOpenOverdueNotices(@Param("now") Date now, @Param("showClosed") boolean showClosed);

    @Query("SELECT CASE WHEN count(o) > 0 THEN true ELSE false END " +
            "FROM OverdueNotice o " +
            "WHERE o.uuid = :uuid " +
            "AND o.openedAt < :now " +
            "AND (o.closedAt is null OR o.closedAt > :now) ")
    boolean isOverdueNoticeOpen(@Param("uuid") UUID uuid, @Param("now") Date now);

    /**
     * Deletes all reserved overdue notices for assignment.
     *
     * @param assignmentUUID the uuid of the assignment
     */
    @Modifying
    @Query("DELETE FROM OverdueNotice o " +
            "WHERE o.openedAt >= :closeDate " +
            "AND o.assignment.uuid = :assignmentUUID")
    void deleteReservedOverdueNotices(@Param("assignmentUUID") UUID assignmentUUID, @Param("closeDate") Date closeDate);

    /**
     * Closes all opened overdue notices.
     *
     * @param assignmentUUID the uuid of the assignment
     * @param closeDate the date since when the overdue notice is closed.
     */
    @Modifying
    @Query("UPDATE OverdueNotice o " +
            "SET o.closedAt = :closeDate " +
            "WHERE o.assignment.uuid = :assignmentUUID")
    void closeAllOverdueNotices(@Param("assignmentUUID") UUID assignmentUUID, @Param("closeDate") Date closeDate);
}
