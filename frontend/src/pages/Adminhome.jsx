import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Adminhome = () => {
  const [adminData, setAdminData] = useState(null);
  const [tasks, setTasks] = useState([]); 
  const [error, setError] = useState(""); // For error handling

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token"); // Replace with how you store your token
        if (!token) {
          setError("Unauthorized: Please log in.");
          return;
        }

        // Fetch admin profile data
        const response = await axios.get("http://localhost:4000/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        });

        // Fetch tasks

        const taskResponse=await axios.get("http://localhost:4000/admin/gettask",{
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },

        })
        if(taskResponse.status==200){
          console.log("done")
          console.log(taskResponse.data.employee)
          setTasks(taskResponse.data.employee)
        }
        
        setAdminData(response.data); // Admin data
        // setTasks(taskResponse.data.employee); // Set task data (adjusted for correct structure)
      } catch (error) {
        console.error("Error fetching admin data or tasks:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchAdminData();
  }, []);

  const goToTaskForm = () => {
    navigate("/task-form"); // Update this path to match your route
  };

  const logouthandle=()=>{
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 relative">
      <button onClick={logouthandle} className="absolute top-10 right-10 bg-blue-600 w-20 h-10 rounded-lg">logout</button>
      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Admin Info Section */}
      <div className="bg-red-500 p-6 rounded-lg shadow-lg">
        {adminData ? (
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Welcome, {adminData.fullname}!
            </h1>
            <button
              className="bg-blue-500 hover:bg-blue-600 w-full text-white py-2 px-4 flex items-center justify-center rounded-md transition-colors"
              onClick={goToTaskForm}
            >
              Go to Task Form
            </button>
          </div>
        ) : (
          <p className="text-gray-200">Loading admin data...</p>
        )}
      </div>

      {/* Tasks Section */}
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Tasks</h2>
        {tasks.length > 0 ? (
          <ul className="space-y-4">
            {tasks.map((employee) => (
              <li
                key={employee._id}
                className="p-4 border rounded-md shadow-md bg-gray-100"
              >
                <h3 className="font-bold text-lg">{employee.title}</h3>
                <p>{employee.description}</p>
                <p className="text-sm text-gray-600">
                  Assigned to: {employee.assignedToName}
                </p>
                <p className="text-sm text-gray-600">Due Date: {employee.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default Adminhome;
