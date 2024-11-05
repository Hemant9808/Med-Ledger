// import React, { useEffect, useState } from "react";
// import { useEHRContract } from "../hooks/useEHRContract";

// const HealthRecords = () => {
//   const { getRecords, addRecord ,getMyRecords} = useEHRContract();
//   const [records, setRecords] = useState([]);
//   const [newRecord, setNewRecord] = useState({
//     patient:'',
//     date: "",
//     data: "",
//     documentName: "",
//     documentCid: "",
//   });
//   const patientAddress='0xA34CbbCF02873CE2EF83A7D83284D4A6C99884FE'
//   const [loading, setLoading] = useState(false);

//   const fetchRecords = async () => {
//     if (!patientAddress) return;
//     setLoading(true);
//     try {
//       const fetchedRecords = await getRecords('0xd3c2E58447567f2f456795DEd0Ee54403f95F68e');
//       //const fetchedRecords = await getMyRecords();

//       console.log("fetchedRecords",fetchedRecords);
      
//       setRecords(fetchedRecords);
//     } catch (error) {
//       console.error("Failed to fetch records:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   fetchRecords();
//   // }, [patientAddress]);

//   const handleAddRecord = async () => {
//     const {patient, date, data, documentName, documentCid } = newRecord;
//     console.log(date, data, documentName, documentCid )
//     if (!date || !data) {
//       alert("Date and Data fields are required.");
//       return;
//     }
//     setLoading(true);
//     try {
//       console.log(patient, date, data, documentName, documentCid);
      
//       await addRecord(patient, date, data, documentName, documentCid);
//       setNewRecord({ date: "", data: "", documentName: "", documentCid: "" });
//       fetchRecords(); // Refresh the records after adding a new one
//     } catch (error) {
//       console.error("Failed to add record:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewRecord((prevRecord) => ({
//       ...prevRecord,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-[87vh] w-[100vw]">
//     <div className="bg-white flex flex-col items-center justify-center shadow-lg p-3">
//       <h2 className="text-3xl cursor-pointer" onClick={fetchRecords}>
//       Add  Health Records
//       </h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {records.map((record, index) => (
//             <li key={index}>
//               {record.date} - {record.data}
//             </li>
//           ))}
//         </ul>
//       )}
//       <div className="mt-4 flex flex-col w-[25rem] gap-3">
//       <input
//           type="text"
//           name="patient"
//           placeholder="patient Address"
//           value={newRecord.patient}
//           onChange={handleChange}
//           className="border p-2 mb-2"
//         />
//         <input
//           type="text"
//           name="date"
//           placeholder="Date"
//           value={newRecord.date}
//           onChange={handleChange}
//           className="border p-2 mb-2"
//         />
//         <input
//           type="text"
//           name="data"
//           placeholder="Data"
//           value={newRecord.data}
//           onChange={handleChange}
//           className="border p-2 mb-2"
//         />
//         <input
//           type="text"
//           name="documentName"
//           placeholder="Document Name"
//           value={newRecord.documentName}
//           onChange={handleChange}
//           className="border p-2 mb-2"
//         />
//         <input
//           type="text"
//           name="documentCid"
//           placeholder="Document CID"
//           value={newRecord.documentCid}
//           onChange={handleChange}
//           className="border p-2 mb-2"
//         />
//         <button onClick={handleAddRecord} className="bg-blue-500 text-white p-2">
//           Add Record
//         </button>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default HealthRecords;









import React, { useEffect, useState } from "react";
import { useEHRContract } from "../hooks/useEHRContract";

const HealthRecords = () => {
  const { getRecords, addRecord, getMyRecords } = useEHRContract();
  const [records, setRecords] = useState([]);
  const [patientAddress,setPatientAddress]=useState('');
  const [newRecord, setNewRecord] = useState({
    patient: '',
    date: "",
    data: "",
    documentName: "",
    documentCid: "",
  });
  //const patientAddress = '0xA34CbbCF02873CE2EF83A7D83284D4A6C99884FE';
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("fetch");

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const fetchedRecords = await getRecords(patientAddress);
      setRecords(fetchedRecords);
    } catch (error) {
      console.error("Failed to fetch records:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecord = async () => {
    const { patient, date, data, documentName, documentCid } = newRecord;
    if (!date || !data) {
      alert("Date and Data fields are required.");
      return;
    }
    setLoading(true);
    try {
      await addRecord(patient, date, data, documentName, documentCid);
      setNewRecord({ patient: '', date: "", data: "", documentName: "", documentCid: "" });
      fetchRecords();
      setActiveTab("fetch"); // Switch to Fetch Records after adding
    } catch (error) {
      console.error("Failed to add record:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Sub-navbar */}
        <div className="flex justify-around p-4 border-b">
          <button
            onClick={() => setActiveTab("fetch")}
            className={`px-4 py-2 font-semibold ${activeTab === "fetch" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
          >
            Fetch Records
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`px-4 py-2 font-semibold ${activeTab === "add" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
          >
            Add Record
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {activeTab === "fetch" ? (
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold text-center mb-6">Health Records</h2>
              <input
                  type="text"
                  name="patient"
                  placeholder="Patient Address"
                  value={patientAddress}
                  onChange={(e)=>setPatientAddress(e.target.value)}
                  className="w-[25rem] px-4 py-2 border rounded-md focus:outline-none"
                />
                <button onClick={()=>fetchRecords()} className="bg-gray-800 text-white py-2 px-4 rounded mt-3">Fetch</button>
              {loading ? (
                <p className="text-center text-gray-500">Loading records...</p>
              ) : records.length > 0 ? (
                <div className="space-y-4">
                  {records.map((record, index) => (
                    <div key={index} className="p-5 w-full mt-4  rounded-lg shadow-md bg-blue-200 text-gray-900">
                      <h3 className="text-lg font-semibold mb-2">Record {index + 1}</h3>
                      <p><span className="font-bold">Date:</span> {record.date}</p>
                      <p><span className="font-bold">Data:</span> {record.data}</p>
                      <p><span className="font-bold">Document Name:</span> {record.documentName || "N/A"}</p>
                      <p><span className="font-bold">Document CID:</span> {record.documentCid || "N/A"}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No records found.</p>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6">Add New Record</h2>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  name="patient"
                  placeholder="Patient Address"
                  value={newRecord.patient}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                />
                <input
                  type="text"
                  name="date"
                  placeholder="Date"
                  value={newRecord.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                />
                <input
                  type="text"
                  name="data"
                  placeholder="Data"
                  value={newRecord.data}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                />
                <input
                  type="text"
                  name="documentName"
                  placeholder="Document Name"
                  value={newRecord.documentName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                />
                <input
                  type="text"
                  name="documentCid"
                  placeholder="Document CID"
                  value={newRecord.documentCid}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                />
                <button
                  onClick={handleAddRecord}
                  className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Adding Record..." : "Add Record"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
