import { ethers } from "ethers";
import ElectronicHealthRecords from "../contract/ElectronicHealthRecords.json";

export const useEHRContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // const contractAddress = "0x62C97713c45d1876E5df1E2A07192fEB14f1fF3E";
  // const contractAddress="0x401646f575A170f6CD48b874B25fA75a76884967";
  const contractAddress="0xD69ff102339E6F3d0E74C6C636a806C29c247865"
  const ehrContract = new ethers.Contract(contractAddress, ElectronicHealthRecords.abi, signer);
  console.log("ehrContract",ehrContract);
  

  const signupPatient = async (aadharId, name, age, gender, mobile, email) => {
    console.log("ehrContract",ehrContract);
    console.log("signupPatient",aadharId, name, age, gender, mobile, email)

    const tx = await ehrContract.signupPatient(aadharId, name, age, gender, mobile, email);
    await tx.wait();
  };

  const signupDoctor = async (aadharId, name, age, mobile, email, degreeName) => {
    const tx = await ehrContract.signupDoctor(aadharId, name, age, mobile, email, degreeName);
    await tx.wait();
  };

    const addRecord = async (patient, date, data, documentName, documentCid) => {
      try {
        const tx = await ehrContract.addRecord(patient, date, data, documentName, documentCid);
        await tx.wait();
        console.log("Record added successfully:", tx);
      } catch (error) {
        console.error("Error adding record:", error);
        alert(`Failed to add record: ${error.message}`);
      }
    
    };

  const getRecords = async (patientAddress) => {
    console.log("patientAddress",patientAddress);
    
    const records = await ehrContract.getRecords(patientAddress);
    return records;
  };
  const grantAccess = async (doctorAddress, canRead, canWrite) => {
    try {
      const tx = await ehrContract.grantAccess(doctorAddress, canRead, canWrite);
      await tx.wait();
      console.log("Access granted successfully!");
    } catch (error) {
      console.error("Failed to grant access:", error);
    }
  };

  const getMyRecords = async () => {
    try {
      const records = await ehrContract.getMyRecords();
      return records;
    } catch (error) {
      console.error("Error fetching personal records:", error);
      throw new Error("Failed to fetch personal records");
    }
  };

  const getMyPatients = async () => {
    try {
      const patients = await ehrContract.getMyPatients();
      return patients;
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw new Error("Failed to fetch patients");
    }
  };

  

  const revokeAccess = async (doctorAddress) => {
    try {
      const tx = await ehrContract.revokeAccess(doctorAddress);
      await tx.wait();
      console.log("Access revoked successfully!");
    } catch (error) {
      console.error("Failed to revoke access:", error);
      alert(`Failed to revoke access: ${error.message}`);
    }
  };
  const getDoctorDetails = async (doctorAddress) => {
    try {
      const doctorDetails = await ehrContract.doctors(doctorAddress);
      return doctorDetails;
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      throw new Error("Failed to fetch doctor details");
    }
  };
  const getPatientDetails = async (patientAddress) => {
    try {
      const patientDetails = await ehrContract.patients(patientAddress);
      return patientDetails;
    } catch (error) {
      console.error("Error fetching patient details:", error);
      throw new Error("Failed to fetch patient details");
    }
  };

  return {
    signupPatient,
    signupDoctor,
    addRecord,
    getRecords,
    getDoctorDetails,
    getRecords,
    getMyRecords,
    getMyPatients,
    grantAccess,
    revokeAccess,
    getPatientDetails
  };
};










// import { ethers } from "ethers";
// import ElectronicHealthRecords from "../contract/ElectronicHealthRecords.json";

// export const useEHRContract = () => {
//     //@ts-ignore
//   const provider:any = new ethers.providers.Web3Provider((window as any).ethereum);
//   const signer = provider.getSigner();

//   const contractAddress = "0x62C97713c45d1876E5df1E2A07192fEB14f1fF3E"
//   ;
//   const ehrContract = new ethers.Contract(contractAddress, ElectronicHealthRecords.abi, signer);

//   const signupPatient = async (aadharId: number, name: string, age: number, gender: string, mobile: number, email: string) => {
//     const tx = await ehrContract.signupPatient(aadharId, name, age, gender, mobile, email);
//     await tx.wait();
//   };

//   const signupDoctor = async (aadharId: number, name: string, age: number, mobile: number, email: string, degreeName: string) => {
//     const tx = await ehrContract.signupDoctor(aadharId, name, age, mobile, email, degreeName);
//     await tx.wait();
//   };

//   const addRecord = async (patientAddress: string, date: string, data: string, doctorName: string, documentName?: string, documentCid?: string) => {
//     const tx = await ehrContract.addRecord(patientAddress, date, data, doctorName, documentName || "", documentCid || "");
//     await tx.wait();
//   };

//   const getRecords = async (patientAddress: string) => {
//     const records = await ehrContract.getRecords(patientAddress);
//     return records;
//   };

//   return {
//     signupPatient,
//     signupDoctor,
//     addRecord,
//     getRecords,
//   };
// };
