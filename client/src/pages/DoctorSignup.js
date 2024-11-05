// src/components/DoctorSignup.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useEHRContract } from "../hooks/useEHRContract";
import { useNavigate } from "react-router-dom";

const DoctorSignup = () => {
  const dispatch = useDispatch();
  const { signupDoctor } = useEHRContract();
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState({
    aadharId: "",
    name: "",
    age: "",
    mobile: "",
    email: "",
    degreeName: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    const { aadharId, name, age, mobile, email, degreeName } = doctorDetails;
    
    // Basic form validation
    if (!aadharId || !name || !age || !mobile || !email || !degreeName) {
      alert("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      await signupDoctor(aadharId, name, age, mobile, email, degreeName);

      const doctorData = {
        authenticated: true,
        accountType: "doctor",
        accountAddress: "your_account_address_here", // set dynamically if needed
        profile: { aadharId, name, age, mobile, email, degreeName },
      };

      // Dispatch Redux action to update the state
      dispatch({ type: "LOGIN", payload: doctorData });

      // Store data in local storage
      localStorage.setItem("userData", JSON.stringify(doctorData));

      alert("Doctor signed up successfully!");
      
      // Navigate to the doctor dashboard or another page
      navigate("/userProfile");

    } catch (error) {
      console.error("Signup failed:", error);
      alert("Failed to signup doctor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Doctor Signup</h2>
      
      {["aadharId", "name", "age", "mobile", "email", "degreeName"].map((field, index) => (
        <input
          key={index}
          type={field === "age" ? "number" : field === "email" ? "email" : "text"}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={doctorDetails[field]}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
        />
      ))}

      <button
        onClick={handleSignup}
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Signup"}
      </button>
    </div>
  );
};

export default DoctorSignup;














// import React, { useState } from "react";
// import { useEHRContract } from "../hooks/useEHRContract";
// import { useNavigate } from "react-router-dom";

// const DoctorSignup = () => {
//   const { signupDoctor } = useEHRContract();
//   const navigate = useNavigate()
//   const [doctorDetails, setDoctorDetails] = useState({
//     aadharId: "",
//     name: "",
//     age: "",
//     mobile: "",
//     email: "",
//     degreeName: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDoctorDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleSignup = async () => {
//     const { aadharId, name, age, mobile, email, degreeName } = doctorDetails;
    
//     // Basic form validation
//     if (!aadharId || !name || !age || !mobile || !email || !degreeName) {
//       alert("All fields are required.");
//       return;
//     }

//     setLoading(true);
//     // try {
//       await signupDoctor(aadharId, name, age, mobile, email, degreeName);
//       alert("Doctor signed up successfully");
//       setDoctorDetails({
//         aadharId: "",
//         name: "",
//         age: "",
//         mobile: "",
//         email: "",
//         degreeName: "",
//       });
//     } catch (error) {
//       console.error("Signup failed:", error);
//       alert("Failed to signup doctor.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold mb-6 text-center">Doctor Signup</h2>
      
//       <input
//         type="text"
//         name="aadharId"
//         placeholder="Aadhar ID"
//         value={doctorDetails.aadharId}
//         onChange={handleChange}
//         className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
//       />
      
//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         value={doctorDetails.name}
//         onChange={handleChange}
//         className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
//       />
      
//       <input
//         type="number"
//         name="age"
//         placeholder="Age"
//         value={doctorDetails.age}
//         onChange={handleChange}
//         className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
//       />
      
//       <input
//         type="text"
//         name="mobile"
//         placeholder="Mobile"
//         value={doctorDetails.mobile}
//         onChange={handleChange}
//         className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
//       />
      
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={doctorDetails.email}
//         onChange={handleChange}
//         className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
//       />
      
//       <input
//         type="text"
//         name="degreeName"
//         placeholder="Degree Name"
//         value={doctorDetails.degreeName}
//         onChange={handleChange}
//         className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
//       />
      
//       <button
//         onClick={handleSignup}
//         className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
//         disabled={loading}
//       >
//         {loading ? "Signing up..." : "Signup"}
//       </button>
//     </div>
//   );
// };

// export default DoctorSignup;
