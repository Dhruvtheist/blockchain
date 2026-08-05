// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BlueCarbonRegistry
 * @dev Smart Contract for Decentralized Blue Carbon Project Lifecycle, AI MRV Storage & Cryptographic Verification
 * @notice Designed for BlueChain Registry - Smart India Hackathon
 */

interface IBlueCarbonToken {
    function mint(address to, uint256 amount, string memory projectHash) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
    function retireCredits(uint256 amount, string memory reason) external returns (bool);
}

contract BlueCarbonRegistry {
    address public governmentAdmin;
    IBlueCarbonToken public carbonToken;

    enum EcosystemType { Mangrove, Seagrass, SaltMarsh }
    enum ProjectStatus { Registered, MRVSubmitted, Verified, Rejected }

    struct MRVReport {
        string reportId;
        string projectId;
        string dronePhotoIpfsHash;
        string satelliteImageIpfsHash;
        string sensorDataCsvHash;
        uint256 ndviIndexScaled; // Scaled by 1000 (e.g. 785 = 0.785)
        uint256 biomassMgPerHa;
        uint256 estimatedCarbonTons;
        uint256 aiConfidenceScore; // e.g. 95 for 95%
        uint256 timestamp;
        address reporter;
    }

    struct Project {
        string id;
        string name;
        EcosystemType ecosystem;
        string description;
        string locationState;
        string locationDistrict;
        string gpsCoordinates;
        uint256 areaHectares;
        uint256 estimatedCarbonTons;
        uint256 carbonCreditsIssued;
        uint256 carbonCreditsAvailable;
        address ownerWallet;
        ProjectStatus status;
        string ipfsMetadataHash;
        string verificationRemarks;
        uint256 timestamp;
        bytes32 txHash;
        string verifierSignature;
    }

    struct CarbonTransaction {
        bytes32 txHash;
        string projectId;
        address sender;
        address recipient;
        uint256 creditsAmount;
        uint256 pricePerCreditETH;
        uint256 timestamp;
        string txType; // "REGISTER", "MRV_SUBMIT", "VERIFY_MINT", "TRANSFER", "RETIRE"
    }

    mapping(string => Project) public projects;
    mapping(string => MRVReport[]) public projectMRVReports;
    string[] public projectIds;
    CarbonTransaction[] public auditTrail;

    event ProjectRegistered(string indexed id, string name, address indexed owner, uint256 estimatedCarbon);
    event MRVSubmitted(string indexed projectId, string indexed reportId, uint256 estimatedCarbon, uint256 aiConfidence);
    event ReportVerified(string indexed id, address indexed verifier, uint256 creditsMinted, string remarks, string signature);
    event CreditsMinted(string indexed id, address indexed to, uint256 amount);
    event CreditsTransferred(string indexed id, address indexed from, address indexed to, uint256 amount);
    event CreditsRetired(string indexed id, address indexed burner, uint256 amount, string reason);
    event ProjectRejected(string indexed id, address indexed verifier, string reason);

    modifier onlyAdmin() {
        require(msg.sender == governmentAdmin, "Caller is not government admin");
        _;
    }

    constructor() {
        governmentAdmin = msg.sender;
    }

    function setCarbonToken(address _tokenAddress) external onlyAdmin {
        carbonToken = IBlueCarbonToken(_tokenAddress);
    }

    /**
     * @dev 1. Register a new Blue Carbon Project on-chain
     */
    function registerProject(
        string memory _id,
        string memory _name,
        EcosystemType _ecosystem,
        string memory _description,
        string memory _state,
        string memory _district,
        string memory _gps,
        uint256 _areaHectares,
        uint256 _estimatedCarbon,
        string memory _ipfsHash
    ) external returns (bytes32) {
        require(bytes(projects[_id].id).length == 0, "Project ID already exists");

        bytes32 txHash = keccak256(abi.encodePacked(_id, msg.sender, block.timestamp, block.number));

        projects[_id] = Project({
            id: _id,
            name: _name,
            ecosystem: _ecosystem,
            description: _description,
            locationState: _state,
            locationDistrict: _district,
            gpsCoordinates: _gps,
            areaHectares: _areaHectares,
            estimatedCarbonTons: _estimatedCarbon,
            carbonCreditsIssued: 0,
            carbonCreditsAvailable: 0,
            ownerWallet: msg.sender,
            status: ProjectStatus.Registered,
            ipfsMetadataHash: _ipfsHash,
            verificationRemarks: "",
            timestamp: block.timestamp,
            txHash: txHash,
            verifierSignature: ""
        });

        projectIds.push(_id);

        auditTrail.push(CarbonTransaction({
            txHash: txHash,
            projectId: _id,
            sender: msg.sender,
            recipient: address(this),
            creditsAmount: 0,
            pricePerCreditETH: 0,
            timestamp: block.timestamp,
            txType: "REGISTER"
        }));

        emit ProjectRegistered(_id, _name, msg.sender, _estimatedCarbon);
        return txHash;
    }

    /**
     * @dev 2. Submit MRV Data & AI Biomass Carbon Estimate
     */
    function submitMRV(
        string memory _projectId,
        string memory _reportId,
        string memory _droneHash,
        string memory _satHash,
        string memory _sensorHash,
        uint256 _ndviScaled,
        uint256 _biomassMg,
        uint256 _estimatedCarbon,
        uint256 _confidence
    ) external returns (bool) {
        Project storage proj = projects[_projectId];
        require(bytes(proj.id).length > 0, "Project not found");
        require(msg.sender == proj.ownerWallet || msg.sender == governmentAdmin, "Unauthorized reporter");

        MRVReport memory report = MRVReport({
            reportId: _reportId,
            projectId: _projectId,
            dronePhotoIpfsHash: _droneHash,
            satelliteImageIpfsHash: _satHash,
            sensorDataCsvHash: _sensorHash,
            ndviIndexScaled: _ndviScaled,
            biomassMgPerHa: _biomassMg,
            estimatedCarbonTons: _estimatedCarbon,
            aiConfidenceScore: _confidence,
            timestamp: block.timestamp,
            reporter: msg.sender
        });

        projectMRVReports[_projectId].push(report);
        proj.status = ProjectStatus.MRVSubmitted;
        proj.estimatedCarbonTons = _estimatedCarbon;

        bytes32 txHash = keccak256(abi.encodePacked("MRV", _reportId, block.timestamp));
        auditTrail.push(CarbonTransaction({
            txHash: txHash,
            projectId: _projectId,
            sender: msg.sender,
            recipient: address(this),
            creditsAmount: _estimatedCarbon,
            pricePerCreditETH: 0,
            timestamp: block.timestamp,
            txType: "MRV_SUBMIT"
        }));

        emit MRVSubmitted(_projectId, _reportId, _estimatedCarbon, _confidence);
        return true;
    }

    /**
     * @dev 3. Auditor / Verifier verifies report and digitally signs
     */
    function verifyReport(
        string memory _id,
        uint256 _creditsToMint,
        string memory _remarks,
        string memory _digitalSignature
    ) external onlyAdmin returns (bool) {
        Project storage proj = projects[_id];
        require(bytes(proj.id).length > 0, "Project not found");

        proj.status = ProjectStatus.Verified;
        proj.carbonCreditsIssued = _creditsToMint;
        proj.carbonCreditsAvailable = _creditsToMint;
        proj.verificationRemarks = _remarks;
        proj.verifierSignature = _digitalSignature;

        emit ReportVerified(_id, msg.sender, _creditsToMint, _remarks, _digitalSignature);

        return mintCarbonCredits(_id, proj.ownerWallet, _creditsToMint);
    }

    /**
     * @dev 4. Mint Carbon Credit ERC-20 Tokens
     */
    function mintCarbonCredits(
        string memory _id,
        address _to,
        uint256 _amount
    ) public onlyAdmin returns (bool) {
        bytes32 mintTx = keccak256(abi.encodePacked("MINT", _id, block.timestamp));

        auditTrail.push(CarbonTransaction({
            txHash: mintTx,
            projectId: _id,
            sender: address(0),
            recipient: _to,
            creditsAmount: _amount,
            pricePerCreditETH: 0,
            timestamp: block.timestamp,
            txType: "VERIFY_MINT"
        }));

        if (address(carbonToken) != address(0)) {
            carbonToken.mint(_to, _amount, projects[_id].ipfsMetadataHash);
        }

        emit CreditsMinted(_id, _to, _amount);
        return true;
    }

    /**
     * @dev 5. Transfer Carbon Credits
     */
    function transferCredits(
        string memory _id,
        address _to,
        uint256 _amount
    ) external returns (bool) {
        Project storage proj = projects[_id];
        require(proj.carbonCreditsAvailable >= _amount, "Insufficient available credits");

        proj.carbonCreditsAvailable -= _amount;

        bytes32 txHash = keccak256(abi.encodePacked("TRANSFER", _id, msg.sender, _to, block.timestamp));
        auditTrail.push(CarbonTransaction({
            txHash: txHash,
            projectId: _id,
            sender: msg.sender,
            recipient: _to,
            creditsAmount: _amount,
            pricePerCreditETH: 0,
            timestamp: block.timestamp,
            txType: "TRANSFER"
        }));

        if (address(carbonToken) != address(0)) {
            carbonToken.transfer(_to, _amount);
        }

        emit CreditsTransferred(_id, msg.sender, _to, _amount);
        return true;
    }

    /**
     * @dev 6. Retire Carbon Credits (Burn for Offsetting)
     */
    function retireCredits(
        string memory _id,
        uint256 _amount,
        string memory _reason
    ) external returns (bool) {
        bytes32 txHash = keccak256(abi.encodePacked("RETIRE", _id, msg.sender, block.timestamp));
        auditTrail.push(CarbonTransaction({
            txHash: txHash,
            projectId: _id,
            sender: msg.sender,
            recipient: address(0),
            creditsAmount: _amount,
            pricePerCreditETH: 0,
            timestamp: block.timestamp,
            txType: "RETIRE"
        }));

        if (address(carbonToken) != address(0)) {
            carbonToken.retireCredits(_amount, _reason);
        }

        emit CreditsRetired(_id, msg.sender, _amount, _reason);
        return true;
    }

    /**
     * @dev Government Officer rejects project
     */
    function rejectProject(string memory _id, string memory _reason) external onlyAdmin {
        Project storage proj = projects[_id];
        require(bytes(proj.id).length > 0, "Project not found");
        proj.status = ProjectStatus.Rejected;
        proj.verificationRemarks = _reason;

        emit ProjectRejected(_id, msg.sender, _reason);
    }

    function getAuditTrailCount() external view returns (uint256) {
        return auditTrail.length;
    }
}

