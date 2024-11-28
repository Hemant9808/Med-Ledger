// src/components/Navbar.js
import React, { useState, useEffect } from 'react';

const Navbar = ({ account }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountType, setAccountType] = useState(null);

  useEffect(() => {
    // Retrieve accountType from localStorage
    const type = JSON.parse(localStorage.getItem('userData'))?.accountType || '';
    console.log("type",type);
    
    setAccountType(type);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-900 w-[100%] text-white py-4">

      <div className="container mx-auto flex justify-between items-center px-6">
        
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="#" className="hover:text-gray-300">
            <span className="text-gray-100">🅲</span> Med-Ledger
          </a>
        </div>

        {/* Connected Account Display */}
        <div className="flex justify-center items-center gap-3">
          <h3 className="text-lg font-bold text-gray-600">Connected Account</h3>
          <p
            className="bg-gray-300 flex justify-center items-center p-2 rounded-lg text-gray-700 text-center"
            style={{ wordBreak: "break-all" }}
          >
            {account !== "None" ? account : "No Account Connected"}
          </p>
        </div>

        {/* Navigation Links */}
        <div className="space-x-8 hidden lg:block">
          {accountType === "patient" ? (
            <>
              <a href="/profile" className="hover:text-gray-400">User Profile</a>
              <a href="/records" className="hover:text-gray-400">Records</a>
              <a href="/access" className="hover:text-gray-400">Manage Access</a>
              <a href="/search-doctors" className="hover:text-gray-400">Search Doctors</a>
            </>
          ) : accountType === "doctor" ? (
            <>
              <a href="/profile" className="hover:text-gray-400">User Profile</a>
              <a href="/view-patients" className="hover:text-gray-400">View Patients</a>
              <a href="/records" className="hover:text-gray-400">Patient Record</a>
            
            </>
          ) 
          : (
            <>
            {account && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Sign Up
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                <a
                  href="/patientSignup"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Patient
                </a>
                <a
                  href="/doctorSignup"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Doctor
                </a>
              </div>
            )}
          </div>
        )}
               </>
          )
          }
        </div>

        {/* Sign Up Dropdown */}
        
      </div>
    </nav>
  );
};

export default Navbar;

















// // src/components/Navbar.js
// import React, { useState } from 'react';

// const Navbar = ({account}) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <nav className="bg-gray-900 text-white py-4">
//       <div className="container mx-auto flex justify-between items-center px-6">
//         {/* Logo */}
//         <div className="text-2xl font-bold">
//           <a href="#" className="hover:text-gray-300">
//             <span className="text-gray-100">🅲</span> COMPANY
//           </a>
          
//         </div>
//         <div className="flex justify-center items-center gap-3">
//           <h3 className="text-lg font-bold text-gray-600">Connected Account</h3>
//           <p
//             className="bg-gray-300 flex justify-center items-center p-2  rounded-lg text-gray-700 text-center"
//             style={{ wordBreak: "break-all" }}
//           >
//             {account !== "None" ? account : "No Account Connected"}
//           </p>
//         </div>

//         {/* Links */}
//         <div className="space-x-8 hidden lg:block">
//           <a href="#whitepaper" className="hover:text-gray-400">White Paper</a>
//           <a href="#project" className="hover:text-gray-400">Project</a>
//           <a href="/donation" className="hover:text-gray-400">Donation</a>
//           <a href="#members" className="hover:text-gray-400">Members</a>
//           </div>
//           {!account ? (<div className="relative">
//         <button
//           onClick={toggleDropdown}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Sign Up
//         </button>

//         {dropdownOpen && (
//           <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
//             <a
//               href="/ptientLogin"
//               className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//               onClick={() => setDropdownOpen(false)}
//             >
//               Patient
//             </a>
//             <a
//               href="/DoctorSignup"
//               className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//               onClick={() => setDropdownOpen(false)}
//             >
//               Doctor
//             </a>
//           </div>
//         )}
//       </div>):(<></> )}
          
        
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
