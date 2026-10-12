package com.campusconnect.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "complaints")
public class Complaint {
    @Id
    private String id;
    private String studentName;
    private String studentId;
    private String department;
    private String category;
    private String problemLocation;
    private String description;
    private LocalDateTime submissionDateTime;
    private String status = "Pending"; // Pending, In Progress, Resolved

    public Complaint() {}

    public Complaint(String id, String studentName, String studentId, String department, String category,
                     String problemLocation, String description, LocalDateTime submissionDateTime, String status) {
        this.id = id;
        this.studentName = studentName;
        this.studentId = studentId;
        this.department = department;
        this.category = category;
        this.problemLocation = problemLocation;
        this.description = description;
        this.submissionDateTime = submissionDateTime;
        this.status = status != null ? status : "Pending";
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getProblemLocation() { return problemLocation; }
    public void setProblemLocation(String problemLocation) { this.problemLocation = problemLocation; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getSubmissionDateTime() { return submissionDateTime; }
    public void setSubmissionDateTime(LocalDateTime submissionDateTime) { this.submissionDateTime = submissionDateTime; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
