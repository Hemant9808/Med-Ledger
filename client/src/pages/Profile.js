// src/pages/ProfilePage.js
import React, { useEffect, useState } from "react";
import { useEHRContract } from '../hooks/useEHRContract';

const ProfilePage = ({ patientAddress }) => {
    const { getPatientDetails } = useEHRContract();
  const [record, setRecord] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userData = JSON.parse(localStorage.getItem('userData'));
  useEffect(() => {
    setRecord(userData.profile)
    console.log("records",record);
    
    // const fetchRecords = async () => {
    //   try {
    //     const recordsData = await getPatientDetails(patientAddress);
    //     console.log("recordsData",recordsData);
        
    //     setRecords(recordsData);
    //   } catch (error) {
    //     setError(error.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    
    //fetchRecords();
  }, []);

  console.log(userData);
  


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">My Health Records</h2>  
        <div className="flex flex-col items-center mb-6">
          <span className="text-gray-500 text-lg">Account Address:</span>
          <p className="bg-gray-200 p-2 rounded-md text-gray-700 font-mono text-center break-words w-full">{patientAddress}</p>
        </div>
        {loading ? (
          <p className="text-center text-gray-600">Loading records...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : record ? (
          <div className="space-y-4">
            
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-5 rounded-lg shadow-md text-white">
                <h3 className="text-xl font-semibold">Record </h3>
                <p className="mt-2"><span className="font-bold">Name:</span> {record.name || "N/A"}</p>

                <p className="mt-2"><span className="font-bold">AdhaarId :</span> {record.aadharId || "N/A"}</p>
                <p className="mt-2"><span className="font-bold">Age:</span> {record.age || "N/A"}</p>
                <p className="mt-2"><span className="font-bold">Email:</span> {record.email}</p>
                <p className="mt-2"><span className="font-bold">Gender:</span> {record.gender}</p>
                <p className="mt-2"><span className="font-bold">Mobile:</span> {record.mobile}</p>


              </div>
           
          </div>
        ) : (
          <p className="text-center text-gray-600">No records found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
