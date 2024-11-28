# Electronic Health Records (EHR) System

A decentralized application (dApp) for managing electronic health records on the blockchain. This project allows patients and doctors to securely store, access, and share medical records with a permissioned access system. Built with Solidity for the Ethereum blockchain and React for the frontend, it leverages IPFS for decentralized storage of documents.

## Features

- **Patient Registration**: Patients can sign up using their Aadhar ID and personal details.
- **Doctor Registration**: Doctors can sign up and provide their credentials.
- **Permissioned Access Control**: Patients can grant and revoke read/write access to doctors for their health records.
- **Secure Record Storage**: Health records, including optional IPFS-stored documents, are stored on the blockchain, and records can only be accessed by authorized users.
- **Patient and Doctor Profiles**: Profile management for both patients and doctors, with patient listings accessible by doctors.
- **Frontend Interface**: User-friendly React interface for interacting with the EHR system.

## Technology Stack

- **Smart Contract**: Solidity, deployed on Ethereum blockchain.
- **Frontend**: React with Vite, TypeScript, and Tailwind CSS.
- **Blockchain Interaction**: ethers.js for interacting with the Ethereum smart contract.
- **Local Development**: Truffle and Ganache for local Ethereum blockchain setup.
- **IPFS**: Used for storing documents like X-rays and medical records.

## Prerequisites

- **Node.js** and **npm**: Install from [Node.js official site](https://nodejs.org/).
- **MetaMask**: A browser extension wallet to interact with Ethereum blockchain.
- **Truffle** and **Ganache**: For deploying and testing smart contracts locally.
- **IPFS**: Optional, for uploading and accessing documents from IPFS.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/hemant9808/Med-Ledger.git
cd Med-Ledger
