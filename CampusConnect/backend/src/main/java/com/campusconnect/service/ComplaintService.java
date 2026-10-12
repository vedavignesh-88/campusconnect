package com.campusconnect.service;

import com.campusconnect.entity.Complaint;
import com.campusconnect.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;

    @Autowired
    public ComplaintService(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    public Complaint createComplaint(Complaint complaint) {
        // Set defaults
        complaint.setSubmissionDateTime(LocalDateTime.now());
        if (complaint.getStatus() == null || complaint.getStatus().isBlank()) {
            complaint.setStatus("Pending");
        }
        return complaintRepository.save(complaint);
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public Complaint getComplaintById(String id) {
        Optional<Complaint> opt = complaintRepository.findById(id);
        return opt.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Complaint not found"));
    }

    public Complaint updateStatus(String id, String newStatus) {
        Complaint complaint = getComplaintById(id);
        if (!newStatus.matches("Pending|In Progress|Resolved")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status value");
        }
        complaint.setStatus(newStatus);
        return complaintRepository.save(complaint);
    }

    public void deleteComplaint(String id) {
        Complaint complaint = getComplaintById(id);
        complaintRepository.delete(complaint);
    }
}
