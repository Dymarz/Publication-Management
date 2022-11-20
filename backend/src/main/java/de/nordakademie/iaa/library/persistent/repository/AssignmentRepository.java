package de.nordakademie.iaa.library.persistent.repository;

import de.nordakademie.iaa.library.persistent.entities.Assignment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * This repository is for managing the database access to the assignment table.
 * This is only an interface. The repository will be generated by spring data.
 */
@Repository
public interface AssignmentRepository extends CustomBaseRepository<Assignment, UUID> {


    /**
     * This will overwrite the findAll method so that it returns a list and not an iterable
     */
    @Override
    @Query("SELECT DISTINCT a FROM Assignment a " +
            "LEFT OUTER JOIN FETCH a.borrower b " +
            "LEFT OUTER JOIN FETCH a.publication p " +
            "ORDER BY a.dateOfAssignment")
    List<Assignment> findAll();


    /**
     * find all by publication
     *
     * @param key publication key
     * @return List of assignments that are returned
     */
    @Query("SELECT DISTINCT a FROM Assignment a " +
            "LEFT OUTER JOIN FETCH a.borrower b " +
            "LEFT OUTER JOIN FETCH a.publication p " +
            "WHERE a.publication.key = :key " +
            "ORDER BY a.dateOfAssignment")
    List<Assignment> findAllByPublicationKey(@Param("key") String key);


    /**
     * find all that are not returned
     *
     * @param untilDate Date by which the assignments have not been returned
     * @return List of assignments that are not returned
     */
    @Query("SELECT DISTINCT a FROM Assignment a " +
            "LEFT OUTER JOIN FETCH a.borrower b " +
            "LEFT OUTER JOIN FETCH a.publication p " +
            "WHERE " +
            "(a.dateOfReturn IS NULL " +
            "and a.publicationLoss = false) " +
            "OR a.dateOfReturn > :untilDate " +
            "ORDER BY a.dateOfAssignment")
    List<Assignment> findAllUnreturned(@Param("untilDate") Date untilDate);

    /**
     * find all that are not returned by publication key
     *
     * @param untilDate Date by which the assignments have not been returned
     * @param key publication key
     * @return List of assignments that are returned
     */
    @Query("SELECT DISTINCT a FROM Assignment a " +
            "LEFT OUTER JOIN FETCH a.borrower b " +
            "LEFT OUTER JOIN FETCH a.publication p " +
            "WHERE " +
            "((a.dateOfReturn IS NULL " +
            "and a.publicationLoss = false) " +
            "OR a.dateOfReturn > :untilDate) " +
            "AND a.publication.key = :key " +
            "ORDER BY a.dateOfAssignment")
    List<Assignment> findAllUnreturnedByPublicationKey(@Param("untilDate") Date untilDate, @Param("key") String key);
}
