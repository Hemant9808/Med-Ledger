// src/components/PatientLogin.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEHRContract } from '../hooks/useEHRContract';
import { useNavigate } from 'react-router-dom';

const PatientLogin = () => {
  const dispatch = useDispatch();
  const { signupPatient } = useEHRContract();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    aadharId: '',
    name: '',
    age: '',
    gender: '',
    mobile: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { aadharId, name, age, gender, mobile, email } = formData;

    try {
      console.log(aadharId, name, age, gender, mobile, email )
      await signupPatient(aadharId, name, age, gender, mobile, email);

      const userData = {
        authenticated: true,
        accountType: 'patient',
        accountAddress: 'your_account_address_here', // update dynamically if needed
        profile: { aadharId, name, age, gender, mobile, email }
      };
      

      dispatch({ type: 'LOGIN', payload: userData });
      localStorage.setItem('userData', JSON.stringify(userData));


      alert('Signup successful!');
      navigate('/userProfile')
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Patient Signup</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {['aadharId', 'name', 'age', 'gender', 'mobile', 'email'].map((field, index) => (
            <div key={index}>
              <label className="block text-gray-600 font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'age' ? 'number' : field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter your ${field}`}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientLogin;









// import React, { useState } from 'react';
// import { useEHRContract } from "../hooks/useEHRContract";
// import { logDOM } from '@testing-library/react';
// const PatientLogin = () => {
//     const { signupPatient } = useEHRContract();
//     const [formData, setFormData] = useState({ aadharId: "23456", name: "gf", age: "4", gender: "male", mobile: "234567", email: "frew" });
//     console.log(formData);
    
  
//      const handleSubmit = async () => {
//     //  // e.preventDefault();
    
//     //  console.log(aadharId, name, age, gender, mobile, email);
     
//        const { aadharId, name, age, gender, mobile, email } = formData;
//        console.log("before");
      
//      await signupPatient(aadharId, name, age, gender, mobile, email);
//       console.log("after");
      
//     };
  

//   return (
//     <div className="flex items-center justify-center min-h-screen ">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white     shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold text-center text-gray-800">Patient Signup</h2>
        
//         <form className="space-y-4">
//           <div>
//             <label className="block text-gray-600 font-medium">Aadhar ID</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your Aadhar ID"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-600 font-medium">Name</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your name"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-600 font-medium">Age</label>
//             <input
//               type="number"
//               className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your age"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-600 font-medium">Gender</label>
//             <select
//               className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-600 font-medium">Mobile</label>
//             <input
//               type="tel"
//               className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your mobile number"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-600 font-medium">Email</label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your email"
//             />
//           </div>

//           <button
//             type="submit"
//             onClick={handleSubmit()}
//             className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PatientLogin;
