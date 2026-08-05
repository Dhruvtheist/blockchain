// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BlueCarbonToken (BCT)
 * @dev ERC20 Compliant Token representing verified Blue Carbon Offsets (1 BCT = 1 Metric Ton CO2e)
 */

contract BlueCarbonToken {
    string public name = "BlueChain Verified Carbon Offset";
    string public symbol = "BCT";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    address public registryContract;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(string => uint256) public projectMintedCredits;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event TokensMinted(address indexed to, uint256 amount, string ipfsMetadataHash);
    event TokensRetired(address indexed burner, uint256 amount, string reason);

    modifier onlyRegistry() {
        require(msg.sender == registryContract, "Caller is not authorized registry");
        _;
    }

    constructor(address _registry) {
        registryContract = _registry;
    }

    function mint(address to, uint256 amount, string memory ipfsMetadataHash) external onlyRegistry returns (bool) {
        uint256 scaledAmount = amount * (10 ** uint256(decimals));
        totalSupply += scaledAmount;
        balanceOf[to] += scaledAmount;

        projectMintedCredits[ipfsMetadataHash] += amount;

        emit Transfer(address(0), to, scaledAmount);
        emit TokensMinted(to, amount, ipfsMetadataHash);
        return true;
    }

    function transfer(address to, uint256 value) external returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) external returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Allowance exceeded");
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }

    function retireCredits(uint256 amount, string memory reason) external returns (bool) {
        uint256 scaledAmount = amount * (10 ** uint256(decimals));
        require(balanceOf[msg.sender] >= scaledAmount, "Insufficient token balance to retire");
        balanceOf[msg.sender] -= scaledAmount;
        totalSupply -= scaledAmount;
        emit TokensRetired(msg.sender, amount, reason);
        emit Transfer(msg.sender, address(0), scaledAmount);
        return true;
    }
}
