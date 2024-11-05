import React, { useState } from 'react';
import { useEHRContract } from '../hooks/useEHRContract';

const DoctorDetailsPage = () => {
  const { getDoctorDetails } = useEHRContract();
  const [doctorAddress, setDoctorAddress] = useState('');
  const [doctorData, setDoctorData] = useState(null);
  const [error, setError] = useState('');

  const fetchDoctorDetails = async () => {
    try {
      setError('');
      const data = await getDoctorDetails(doctorAddress);
      console.log("data:",data);
      
    setDoctorData(data);
    } catch (err) {
      setError('Failed to fetch doctor details. Please check the address.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="w-full max-w-lg p-8 rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Doctor Details Lookup
        </h2>
        
        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Doctor's Address"
            className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-gray-700"
            value={doctorAddress}
            onChange={(e) => setDoctorAddress(e.target.value)}
          />
          <button
            onClick={fetchDoctorDetails}
            className="w-full py-3 bg-gray-800 text-white font-semibold rounded-md shadow-md hover:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Fetch Doctor Details
          </button>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {doctorData && (
          <div className="mt-8 bg-blue-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Doctor Information</h3>
            <p className="text-gray-700 mb-2">
              <span className="font-medium text-gray-800">Aadhar ID:</span> {doctorData.aadharId._hex}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium text-gray-800">Name:</span> {doctorData.name}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium text-gray-800">Age:</span> {doctorData.age}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium text-gray-800">Mobile:</span> {doctorData.mobile._hex}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium text-gray-800">Email:</span> {doctorData.email}
            </p>
            <p className="text-gray-700">
              <span className="font-medium text-gray-800">Degree:</span> {doctorData.degreeName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDetailsPage;
