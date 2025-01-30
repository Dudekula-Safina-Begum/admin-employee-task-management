import { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

const Taskform = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  const navigate=useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();

    const newTask = {
      title: title,
      date: date,
      description: description,
      assignedToName: employeeName,
    };

    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      if (!token) {
        alert("Unauthorized: Please log in.");
        return;
      }

      // Optional: Validate admin access
      try {
        const adminResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/admin/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Admin validated:", adminResponse.data);
      } catch (error) {
        console.error("Admin validation failed:", error);
        alert("Admin validation failed. Please try logging in again.");
        return;
      }

      // Create task
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/taskcreat`,
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Task Created:", response.data);
        alert("Task created successfully!");
        // Clear form fields
        setTitle("");
        setDate("");
        setDescription("");
        
      }
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Error creating task. Employee not Found");
    }
  };

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">


      <Link to='/adminhome' className='absolute top-10 right-5'>Back</Link>




      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div>
        <h1 className="text-2xl font-bold mb-6 text-center">Create Task</h1>
        
        </div>
        <form onSubmit={submitHandler} className="space-y-4">
          {/* Task Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Task Date */}
          <div>
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Task Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter task description"
              required
            ></textarea>
          </div>

          {/* Employee Name */}
          <div>
            <label
              htmlFor="employeeName"
              className="block text-gray-700 font-medium mb-2"
            >
              Employee Name
            </label>
            <input
              type="text"
              id="employeeName"
              name="employeeName"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter employee name"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Taskform;
