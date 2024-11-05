


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonationPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the donations from the API
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-donations");
        setDonations(response.data); // Set the fetched donations
      } catch (err) {
        setError("Failed to load donations");
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false after the API call completes
      }
    };

    fetchDonations();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) {
    return <div className="min-h-screen bg-gray-900 text-white p-10">Loading donations...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-900 text-red-500 p-10">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl font-bold mb-10">Donations Received</h1>

      {/* Table */}
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-300">
          <thead>
            <tr className="bg-gray-700 text-gray-400">
              <th className="py-4 px-6">Donor Name</th>
              <th className="py-4 px-6">Amount</th>
              <th className="py-4 px-6">Wallet Address</th>
              <th className="py-4 px-6">Network</th>
              <th className="py-4 px-6">Transaction Hash</th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              donations.map((donation) => (
                <tr key={donation._id} className="border-b border-gray-600 hover:bg-gray-700 transition duration-300">
                  <td className="py-4 px-6">{donation.name}</td>
                  <td className="py-4 px-6">{donation.amount} ETH</td>
                  <td className="py-4 px-6">{donation.address}</td>
                  <td className="py-4 px-6">{donation.network}</td>
                  <td className="py-4 px-6">{donation.transactionHash || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 px-6 text-center">
                  No donations available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationPage;














// // src/components/DonationPage.js
// import React from 'react';

// // Dummy Data for Donations
// const donations = [
//   { id: 1, name: 'John Doe', amount: '$500', date: '10/01/2024', method: 'Credit Card' },
//   { id: 2, name: 'Jane Smith', amount: '$300', date: '10/02/2024', method: 'PayPal' },
//   { id: 3, name: 'Sam Wilson', amount: '$200', date: '10/03/2024', method: 'Bank Transfer' },
//   { id: 4, name: 'Lisa Brown', amount: '$150', date: '10/04/2024', method: 'Crypto' },
//   { id: 5, name: 'Michael Jordan', amount: '$700', date: '10/05/2024', method: 'Credit Card' },
// ];

// const DonationPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-10">
//       <h1 className="text-4xl font-bold mb-10">Donations Received</h1>

//       {/* Table */}
//       <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
//         <table className="min-w-full text-left text-gray-300">
//           <thead>
//             <tr className="bg-gray-700 text-gray-400">
//               <th className="py-4 px-6">Donor Name</th>
//               <th className="py-4 px-6">Amount</th>
//               <th className="py-4 px-6">wallet Address</th>
//               <th className="py-4 px-6">Network</th>
//               <th className="py-4 px-6"> Transaction Hash</th>
//             </tr>
//           </thead>
//           <tbody>
//             {donations.map((donation) => (
//               <tr key={donation.id} className="border-b border-gray-600 hover:bg-gray-700 transition duration-300">
//                 <td className="py-4 px-6">{donation.name}</td>
//                 <td className="py-4 px-6">{donation.amount}</td>
//                 <td className="py-4 px-6">{donation.date}</td>
//                 <td className="py-4 px-6">{donation.method}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DonationPage;

