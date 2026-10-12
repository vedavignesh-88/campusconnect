package com.campusconnect.repository;

import com.campusconnect.entity.Complaint;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintRepository extends MongoRepository<Complaint, String> {
    // Additional query methods can be defined here
}
