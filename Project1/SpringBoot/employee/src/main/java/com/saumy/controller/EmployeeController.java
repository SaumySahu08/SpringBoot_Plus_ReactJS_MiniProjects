package com.saumy.controller;

import java.util.List;


import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saumy.entity.Employee;
import com.saumy.service.EmployeeService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmployeeController {

	private final EmployeeService employeeService;
	
	@PostMapping("/employee")
	public Employee postEmployee(@RequestBody Employee e) {
		return employeeService.postEmployee(e);
	}
	
	@GetMapping("/employees")
	public List<Employee> getAllEmployee(){	
		return employeeService.getAllEmployee();
	}
	
	@DeleteMapping("/employee/{id}")
	public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
		
		try {
			employeeService.deleteEmployee(id);
			return new ResponseEntity<>("Emploee with id "+id+" deleted successfully.",HttpStatus.OK);
		}
		catch(EntityNotFoundException e) {
			return new ResponseEntity<>("Emploee with id "+id+" not deleted successfully.",HttpStatus.NOT_FOUND);

		}
		
	}
	
	@GetMapping("/employee/{id}")
	public ResponseEntity<?> getEmployeeById(@PathVariable Long id){
		Employee e = employeeService.getEmployeeById(id);
		if(e==null) return ResponseEntity.notFound().build();
		else return ResponseEntity.ok(e);
	}
	
	@PatchMapping("/employee/{id}")
	public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody Employee e){
		Employee emp = employeeService.updateEmployee(id, e);
		if(emp==null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		else return ResponseEntity.ok(emp);
	}
	
}
