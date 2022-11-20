package de.nordakademie.iaa.library.persistent.repository;

import de.nordakademie.iaa.library.persistent.entities.Publication;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * This repository is for managing the database access to the publication table.
 * This is only an interface. The repository will be generated by spring data.
 */
@Repository
public interface PublicationRepository extends CustomBaseRepository<Publication, String> {


    /**
     * find all publication by deleted flag
     *
     * <p>
     *
     * @param showDeleted showDeleted Publications
     * @return List of Publication
     */
    @Query("SELECT DISTINCT p " +
            "FROM Publication p " +
            "LEFT OUTER JOIN FETCH p.kindOfPublication kop " +
            "WHERE :showDeleted = true " +
            "OR p.deleted = false " +
            "ORDER BY p.title asc")
    List<Publication> findAllOrderedByTitle(@Param("showDeleted") boolean showDeleted);

    /**
     * find all publication where key in list
     *
     * <p>
     *
     * @param keys publication keys
     * @return List of Publication
     */
    @Query("SELECT DISTINCT p " +
            "FROM Publication p " +
            "LEFT OUTER JOIN FETCH p.kindOfPublication kop " +
            "WHERE p.key IN :keys")
    List<Publication> findAllByKeys(@Param("keys") List<String> keys);

    /**
     * Lowers the number of quantity once if possible
     *
     * @param key of publication
     */
    @Modifying
    @Query("UPDATE Publication p " +
            "SET p.quantity = CASE WHEN p.quantity > 0 THEN p.quantity-1 ELSE 0 END " +
            "WHERE p.key = :key")
    void reduceQuantityOnce(@Param("key") String key);
}
