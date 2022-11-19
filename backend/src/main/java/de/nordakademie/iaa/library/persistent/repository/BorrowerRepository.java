package de.nordakademie.iaa.library.persistent.repository;

import de.nordakademie.iaa.library.persistent.entities.Borrower;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * This repository is for managing the database access to the borrower table.
 * This is only an interface. The repository will be generated by spring data.
 */
@Repository
public interface BorrowerRepository extends CustomBaseRepository<Borrower, UUID> {


    /**
     * This will overwrite the findAll method so that it returns a list and not an iterable
     */
    @Override
    List<Borrower> findAll();
}
