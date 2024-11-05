import abi from "./contract/chai.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import chai from "./chai.png";
import "./App.css";
import HomePage from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DonationPage from "./components/Donation";
import PatientLogin from "./pages/patientLogin";
import HealthRecords from "./pages/HealthRecords";
import DoctorSignup from "./pages/DoctorSignup";
import AccessGrantPage from "./pages/AccessGrantPage";
import DoctorDetailsPage from "./pages/SearchDoctor";
import MyPatientsPage from "./pages/ViewPatient";
import ProfilePage from "./pages/Profile";
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
     // const contractAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3"
      const contractAddress = "0x46436dcb1b29b111a00bb61f5475b420ef1104eb";
      const contractABI = abi.abi;
      console.log("contractABI",contractABI);
      
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,  
            contractABI,
            signer
          );

          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  console.log("acount",account)
  // console.log(state);
  return (
    <Router>
      <div className=" " style={{  height: "100%" }}>
        <div className="pt-0 p-[0]">
          <Navbar account={account} />
          {/* Routes */}
          <Routes>
            <Route path="/" element={<HomePage state={state} account={account}/>} /> {/* Home page route */}
            <Route path="/donation" element={<DonationPage />} />
            <Route path="/patientLogin" element={<PatientLogin />} /> 
            <Route path="/records" element={<HealthRecords />} /> 
            <Route path="/DoctorSignup" element={<DoctorSignup />} /> 
            <Route path="/access" element={<AccessGrantPage  />} /> 
            <Route path="/search-doctors" element={<DoctorDetailsPage  />} /> 
            <Route path="/view-patients" element={<MyPatientsPage  />} /> 
            <Route path="/profile" element={<ProfilePage patientAddress={account}  />} /> 
            
            
            
            <Route
              path="/buy"
              element={
                <>
                  
                  <p
                    className="text-muted lead"
                    style={{ marginTop: "10px", marginLeft: "5px" }}
                  >
                    <small>Connected Account - {account}</small>
                  </p>
                  <div className="container">
                    <Buy state={state} />
                    <Memos state={state} />
                  </div>
                </>
              }
            /> {/* Buy page with contract interaction */}
          </Routes>
        </div>
      </div>
    </Router>

    // <div  style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
    // <div className=" bg-gray-900 pt-0 p-[2rem]">
    // <Navbar/>
    // <HomePage></HomePage>
    // </div>
    
    //   {/* <img src={chai} className="img-fluid" alt=".." width="100%" />
    //   <p
    //     class="text-muted lead"
    //     style={{ marginTop: "10px", marginLeft: "5px" }}
    //   >
    //     <small>Connected Account - {account}</small>
    //   </p>
    //   <div className="container">
    //     <Buy state={state} />
    //     <Memos state={state} />
    //   </div> */}
    // </div>
  );
}

export default App;
