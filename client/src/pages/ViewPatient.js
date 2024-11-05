import React, { useState } from 'react';
import { useEHRContract } from '../hooks/useEHRContract';

const MyPatientsPage = () => {
  const { getMyPatients,getPatientDetails } = useEHRContract();
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');


  const fetchMyPatients = async () => {
    try {
      // setLoading(true);
      setError('');
      const patientAddresses = await getMyPatients();
      console.log("patientAddresses",patientAddresses);
      setPatients(patientAddresses);
      
      // const patientDetailsPromises = patientAddresses.map(async (address) => {
      //   const details = await getPatientDetails(address);
        
      //   return { address, ...details };
      // });
      
      // const patientDetails = await Promise.all(patientDetailsPromises);
      // console.log("patientDetails",patientDetails)
      //setPatients(patientDetails);
    } catch (err) {
      setError('Failed to fetch patients. Please try again later.');
    } finally {
      // setLoading(false);
    }
  };



//   const fetchMyPatients = async () => {
//     try {
//       setError('');
//       const data = await getMyPatients();
//       console.log("data",data);
      
//     //   setPatients(data);
//     } catch (err) {
//       setError('Failed to fetch patients. Please try again later.');
//     }
//   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-50 to-cyan-100 p-6">
      <div className="w-full max-w-3xl p-8 rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          My Patients
        </h2>
        
        <button
          onClick={fetchMyPatients}
          className="w-full py-3 mb-6 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Fetch My Patients
        </button>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {patients.length>0 ? (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Patient List</h3>
            <ul className="space-y-4">
              {patients.map((patient, index) => (
                
                <li
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center border-l-4 border-blue-500"
                >
                <button className='text-xl'><span className='mr-3 text-xl text-gray-900 font-bold'>Patient Address:</span>{patient}</button>
                  {/* <div>
                    <p className="text-lg font-medium text-gray-800">Aadhar ID: {patient.aadharId}</p>
                    <p className="text-gray-600">Name: {patient.name}</p>
                    <p className="text-gray-600">Age: {patient.age}</p>
                    <p className="text-gray-600">Mobile: {patient.mobile}</p>
                    <p className="text-gray-600">Email: {patient.email}</p>
                  </div> */}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-4">
            {patients.length === 0 && !error ? "No patients found." : ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default MyPatientsPage;
