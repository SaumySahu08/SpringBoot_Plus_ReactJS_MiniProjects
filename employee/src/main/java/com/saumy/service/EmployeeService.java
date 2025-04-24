package com.saumy.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.saumy.entity.Employee;
import com.saumy.repository.EmployeeRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {

	private final EmployeeRepository employeeRepository;
	
	public Employee postEmployee(Employee e) {
		return employeeRepository.save(e);
	}
	
	public List<Employee> getAllEmployee(){
		return employeeRepository.findAll();
	}
	
	public void deleteEmployee(Long id) {
		if(!employeeRepository.existsById(id)) {
			throw new EntityNotFoundException("Employee with "+id+" not found...");
		}
		
		employeeRepository.deleteById(id);
	}
	
	public Employee getEmployeeById(Long id) {
		return employeeRepository.findById(id).orElse(null);
	}
	
	public Employee updateEmployee(Long id, Employee e) {
		Optional<Employee> emp = employeeRepository.findById(id);
		
		if(emp.isPresent()) {
			Employee existingEmp = emp.get();
			existingEmp.setEmail(e.getEmail());
			existingEmp.setName(e.getName());
			existingEmp.setDepartment(e.getDepartment());
			existingEmp.setPhone(e.getPhone());
			
			return employeeRepository.save(existingEmp);
		}
		return null;
		
	}
	
}
