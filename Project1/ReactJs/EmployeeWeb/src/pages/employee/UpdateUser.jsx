import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {


    const {id} = useParams();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: ""
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      useEffect(()=>{
        const fetchEmployee = async ()=>{
            try {
                const res = await fetch(`http://localhost:8080/api/employee/${id}`)
                const data = await res.json();
                setFormData(data);
            } catch (error) {
                console.log("Fail",error.message);
            }
        }

        fetchEmployee();
      },[id])

      const navigate=useNavigate();
      const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:8080/api/employee/${id}`,{
                method:'PATCH',
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(formData),
            });
            const data = await res.json();
            console.log("emp updates",data)
            navigate(`/`)
        } catch (error) {
            console.log("Eror",error.message)
        }
      }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold text-center mb-6 text-blue-700">
          Edit Employee
        </h1>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter department"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
         Edit Employee
        </button>
      </form>
    </div>
  )
}

export default UpdateUser
