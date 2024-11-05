import React, { useState } from "react";
import { useEHRContract } from "../hooks/useEHRContract";

const AccessGrantPage = () => {
  const { grantAccess } = useEHRContract();
  const [doctorAddress, setDoctorAddress] = useState("");
  const [canRead, setCanRead] = useState(false);
  const [canWrite, setCanWrite] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGrantAccess = async () => {
    if (!doctorAddress) {
      alert("Doctor address is required.");
      return;
    }
    setLoading(true);
    try {
      await grantAccess(doctorAddress, canRead, canWrite);
      alert("Access granted successfully.");
      setDoctorAddress("");
      setCanRead(false);
      setCanWrite(false);
    } catch (error) {
      console.error("Failed to grant access:", error);
      alert("Failed to grant access.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto flex flex-col justify-center mt-[10rem]  p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Grant Access to Doctor</h2>
      
      <input
        type="text"
        placeholder="Doctor Address"
        value={doctorAddress}
        onChange={(e) => setDoctorAddress(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
      />
      
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={canRead}
          onChange={(e) => setCanRead(e.target.checked)}
          className="mr-2"
        />
        <label>Can Read</label>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={canWrite}
          onChange={(e) => setCanWrite(e.target.checked)}
          className="mr-2"
        />
        <label>Can Write</label>
      </div>

      <button
        onClick={handleGrantAccess}
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Granting Access..." : "Grant Access"}
      </button>
    </div>
  );
};

export default AccessGrantPage;
