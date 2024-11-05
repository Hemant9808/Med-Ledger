// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ElectronicHealthRecords {

    struct Patient {
        uint128 aadharId;
        string name;
        uint16 age;
        string gender;
        uint128 mobile;
        string email;
    }

    struct Doctor {
        uint128 aadharId;
        string name;
        uint16 age;
        uint128 mobile;
        string email;
        string degreeName;
    }

    struct HealthRecord {
        string date;
        string data;
        string doctorName;     // Name of the doctor associated with this record
        string documentName;   // Optional name for the document
        string documentCid;    // Optional IPFS CID for document storage
        address owner;
    }

    struct AccessControl {
        bool canRead;
        bool canWrite;
    }

    mapping(address => Patient) public patients;
    mapping(address => Doctor) public doctors;
    mapping(address => HealthRecord[]) private patientRecords;
    mapping(address => mapping(address => AccessControl)) private accessPermissions;  // patient => doctor => access
    mapping(address => address[]) private doctorPatients; // doctor => list of patients

    event PatientSignedUp(address indexed patient);
    event DoctorSignedUp(address indexed doctor);
    event AccessGranted(address indexed patient, address indexed doctor, bool canRead, bool canWrite);
    event AccessRevoked(address indexed patient, address indexed doctor);
    event RecordAdded(address indexed patient, address indexed doctor, string documentName);

    modifier onlyPatient() {
        require(patients[msg.sender].aadharId != 0, "Not registered as a patient");
        _;
    }

    modifier onlyDoctor() {
        require(doctors[msg.sender].aadharId != 0, "Not registered as a doctor");
        _;
    }

    // Patient signs up
    function signupPatient(
        uint128 _aadharId,
        string memory _name,
        uint16 _age,
        string memory _gender,
        uint128 _mobile,
        string memory _email
    ) public {
        require(patients[msg.sender].aadharId == 0 && doctors[msg.sender].aadharId == 0, "Already registered");
        
        patients[msg.sender] = Patient({
            aadharId: _aadharId,
            name: _name,
            age: _age,
            gender: _gender,
            mobile: _mobile,
            email: _email
        });
        
        emit PatientSignedUp(msg.sender);
    }
    
    // Doctor signs up
    function signupDoctor(
        uint128 _aadharId,
        string memory _name,
        uint16 _age,
        uint128 _mobile,
        string memory _email,
        string memory _degreeName
    ) public {
        require(patients[msg.sender].aadharId == 0 && doctors[msg.sender].aadharId == 0, "Already registered");

        doctors[msg.sender] = Doctor({
            aadharId: _aadharId,
            name: _name,
            age: _age,
            mobile: _mobile,
            email: _email,
            degreeName: _degreeName
        });
        
        emit DoctorSignedUp(msg.sender);
    }
    
    // Patient grants access to a doctor
    function grantAccess(address doctor, bool canRead, bool canWrite) public onlyPatient {
        require(doctors[doctor].aadharId != 0, "Access can only be granted to registered doctors");
        
        accessPermissions[msg.sender][doctor] = AccessControl(canRead, canWrite);
        doctorPatients[doctor].push(msg.sender);  // Track patients of the doctor
        emit AccessGranted(msg.sender, doctor, canRead, canWrite);
    }
    
    // Patient revokes access from a doctor
    function revokeAccess(address doctor) public onlyPatient {
        delete accessPermissions[msg.sender][doctor];
        emit AccessRevoked(msg.sender, doctor);
    }
    
    // Doctor adds a record to the patient's file (requires write access)
    function addRecord(address patient, string memory date, string memory data, string memory documentName, string memory documentCid) public onlyDoctor {
        require(accessPermissions[patient][msg.sender].canWrite, "No write access to patient's records");
        
        HealthRecord memory newRecord = HealthRecord({
            date: date,
            data: data,
            doctorName: doctors[msg.sender].name,
            documentName: documentName,
            documentCid: documentCid,
            owner: patient
        });
        
        patientRecords[patient].push(newRecord);
        emit RecordAdded(patient, msg.sender, documentName);
    }

    // Patient adds a record to their own profile without needing permission
    function addMyRecord(string memory date, string memory data, string memory documentName, string memory documentCid) public onlyPatient {
        HealthRecord memory newRecord = HealthRecord({
            date: date,
            data: data,
            doctorName: "", // No doctor associated if added by the patient
            documentName: documentName,
            documentCid: documentCid,
            owner: msg.sender
        });
        
        patientRecords[msg.sender].push(newRecord);
        emit RecordAdded(msg.sender, msg.sender, documentName);
    }

    // Patient or doctor views a patient's records (requires read access)
    function getRecords(address patient) public view returns (HealthRecord[] memory) {
        require(
            msg.sender == patient || 
            (doctors[msg.sender].aadharId != 0 && accessPermissions[patient][msg.sender].canRead),
            "No read access to patient's records"
        );
        
        return patientRecords[patient];
    }

    // Patient views own records
    function getMyRecords() public view onlyPatient returns (HealthRecord[] memory) {
        return patientRecords[msg.sender];
    }

    // Doctor views their patients
    function getMyPatients() public view onlyDoctor returns (address[] memory) {
        return doctorPatients[msg.sender];
    }
}


