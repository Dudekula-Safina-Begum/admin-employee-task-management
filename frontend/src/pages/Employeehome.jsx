import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Employeehome = () => {
  const [employeeData, setEmployeeData] = useState(null); // For profile data
  const [tasks, setTasks] = useState([]); // For task data
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. Redirecting to login...");
          navigate("/login"); // Redirect if no token
          return;
        }

        // Fetch employee profile data
        const profileResponse = await axios.get(
          "http://localhost:4000/employee/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployeeData(profileResponse.data);

        // Fetch task data
        const taskResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/employee/gettask`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTasks(taskResponse.data.employee);
        // console.log(tasks)
        // console.log(taskResponse.data)
        // console.log(taskResponse.data.employee)
        // console.log(taskResponse.data.employee[0])// Assuming tasks are in `tasks` array
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/login"); // Redirect to login on error
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    

    fetchData();
  }, [navigate]);


  const logouthandle=()=>{
    // console.log('clicked')
    localStorage.clear()
    navigate('/login')
  }

  

  // Conditional rendering for loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no tasks are found
  if (!tasks || tasks.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-around items-center">
        <h1 className="text-3xl font-bold text-center mb-8">
          Employee Task List for {employeeData?.fullname}
        </h1>
        <button onClick={logouthandle} className="w-28 h-10 bg-blue-700 text-2xl font-bold text-center mb-8 rounded-lg">Log out</button>
        </div>
        <p className="text-gray-500 text-center">No tasks assigned.</p>
      </div>
    );
  }

 
  

  return (
    <div className="container mx-auto p-6 ">
      <div className="flex items-center justify-around ">
        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome ! {employeeData?.fullname}
        </h1>
        <button onClick={logouthandle} className="w-28 h-10 bg-blue-700 text-2xl font-bold text-center mb-8 rounded-lg">Log out</button>
      </div>
      <div className="space-y-6">

        {tasks.map((task, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
            <p className="text-sm text-gray-600 mb-4">📅 Date: {task.date}</p>
            <p className="text-gray-700">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employeehome;
