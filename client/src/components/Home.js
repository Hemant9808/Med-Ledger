import React, { useState } from 'react';
import axios from 'axios';
import { ethers } from "ethers";
import loading from "../loading.svg";
import banner from '../assets/Banner.jpg'

const HomePage = ({ account,state }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    address:account[0]||'',
    network: '',
    message: '',
    hash:''
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  //const [hash, setHash] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');
    await buyChai();

    try {
      const response = await axios.post('http://localhost:5000/add-data', formData);
      if (response.status === 201) {
        setResponseMessage('Transaction Successful!');  
        // Reset the form after successful submission
        setFormData({
          name: '',
          amount: '',
          address: account[0] || '',
          network: '',
          message: '',
          hash:''

        });
      } else {
        setResponseMessage('Failed to submit the transaction.');
      }
    } catch (error) {
      console.error('Error during submission:', error);
      setResponseMessage('Error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };


  
    const buyChai = async (event) => {
    //   event.preventDefault();
      const { contract } = state;
      const name = document.querySelector("#name").value;
      const message = document.querySelector("#message").value;
      console.log(name, message, contract);
      const amount = { value: ethers.utils.parseEther("0.000001") };
      const transaction = await contract.buyChai(name, message, amount);
      console.log("transaction",transaction);
      setFormData((prev) => ({
        ...prev,
        hash:transaction.hash ,
      }));
      await transaction.wait();
      console.log("Transaction is done");
    };
   



  return (
    <div className="min-h-screen  flex-col lg:flex-row  text-white flex justify-between items-center p-10">
      {/* Left Section - Content */}
      <img className="absolute z-[-100] left-0 w-[100%] h-[100%]" src={banner}/>

      <div className="lg:w-1/2 mb-5 lg:mb-[2rem] w-[80%]">
        <h1 className="text-5xl font-bold mb-6">
        Health Records Hub <br />
        Blockchain-Powered EHR Management


        </h1>
        <p className="text-gray-400 mb-6">
        Providing a secure and decentralized solution for managing healthcare records. Our platform empowers patients and healthcare providers to seamlessly store, access, and share medical data, all while ensuring complete control and privacy.        </p>
        <a
          href="/patientLogin"
          className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full text-lg font-medium transition-all"
        >
          Get Started
        </a>
      </div>

      {/* Right Section - Form */}
      <div className="lg:w-1/3 w-[80%]  p-8 rounded-lg text-gray-900">
        <h2 className="text-2xl font-bold mb-6">Please donate here</h2>

        {/* <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-2" htmlFor="name">
              Donor Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2" htmlFor="amount">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2" htmlFor="address">
              Wallet Address
            </label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2" htmlFor="network">
              Network
            </label>
            <input
              type="text"
              id="network"
              value={formData.network}
              onChange={handleChange}
              placeholder="Ethereum, Binance, etc."
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Optional message"
              rows="4"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-lg font-semibold transition-all"
            disabled={!state.contract || loading}
          >
            {loading ? 'Processing...' : 'Initiate Transaction'}
          </button>
        </form> */}

        {/* Success/Error Message */}
        {responseMessage && (
          <div
            className={`mt-4 p-3 rounded-lg text-center ${
              responseMessage.includes('Successful')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {responseMessage}
          </div>
        )}
      </div>
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style="shape-rendering: auto; display: block; background: rgb(255, 255, 255);" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle stroke-dasharray="164.93361431346415 56.97787143782138" r="35" stroke-width="10" stroke="#132e42" fill="none" cy="50" cx="50">
  <animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
</circle><g></g></g></svg> */}
  {/* <loading></loading>
      <img src='../loading.svg'  className="img-fluid" alt=".."  /> */}
    </div>
  );
};

export default HomePage;
