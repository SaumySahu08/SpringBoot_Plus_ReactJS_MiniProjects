import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/employees');
        const data = await res.json();
        setEmployees(data);
      } catch (error) {
        console.log("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const navigate = useNavigate();

  const handleUpdate = (id) => {
    console.log("Update clicked for ID:", id);
  navigate(`/employee/${id}`)
  };

  const handleDelete = async (id) => {
   
    try {
      const res = await fetch(`http://localhost:8080/api/employee/${id}`,{
        method:'DELETE',
  
      });

      if (res.ok) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp.id !== id)
        );
        alert("Employee deleted successfully!");
      }
      

      console.log("Delete clicked for ID:", id);
  
    } catch (error) {
      console.log("Delete unsuccessfull:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Employee Dashboard
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Department</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{emp.name}</td>
                  <td className="py-2 px-4">{emp.email}</td>
                  <td className="py-2 px-4">{emp.phone}</td>
                  <td className="py-2 px-4">{emp.department}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleUpdate(emp.id)}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md mr-2 hover:bg-gray-300 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
