package com.capgi.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "quizzes")
@AllArgsConstructor
@NoArgsConstructor
public class Quiz {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;
	private String description;
	private Boolean isPublished = false;
	private String createdBy;

	// New fields for enhanced quiz features
	private String category; // Java, React, Spring, Security, Database
	private Integer duration; // Duration in minutes
	private Integer passingScore; // Passing score percentage
	private String difficulty; // Beginner, Intermediate, Advanced

	@OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<Question> questions = new ArrayList<>();

}
