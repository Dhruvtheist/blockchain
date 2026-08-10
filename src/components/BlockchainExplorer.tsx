import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Copy, Check } from 'lucide-react';

export const BlockchainExplorer: React.FC = () => {
  const { transactions, contractAddress } = useApp();
  const [activeTab, setActiveTab] = useState<'TX_LIST' | 'CONTRACT_CODE'>('TX_LIST');
  const [activeContractTab, setActiveContractTab] = useState<'REGISTRY' | 'TOKEN'>('REGISTRY');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const registrySolidity = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BlueCarbonRegistry
 * @dev Smart Contract for Decentralized Blue Carbon Project Lifecycle & Cryptographic Verification
 * Compliant with Oxford Offsetting Principles & ICVCM Core Carbon Principles.
 */
contract BlueCarbonRegistry {
    address public governmentAdmin;
    
    struct Project {
        string id;
        string name;
        uint256 estimatedCarbonTons;
        uint256 carbonCreditsIssued;
        address ownerWallet;
        uint8 status; // 0: Pending, 1: Verified, 2: Rejected
        bytes32 txHash;
    }

    mapping(string => Project) public projects;

    event ProjectVerified(string indexed id, address indexed verifier, uint256 creditsMinted);

    function verifyAndIssueCredits(string memory _id, uint256 _creditsToMint) external {
        require(msg.sender == governmentAdmin, "Only Authorized Verifier");
        Project storage proj = projects[_id];
        proj.status = 1;
        proj.carbonCreditsIssued = _creditsToMint;
        emit ProjectVerified(_id, msg.sender, _creditsToMint);
    }
}`;

  const tokenSolidity = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BlueCarbonToken (BCT)
 * @dev ERC20 Token Standard for Verified Blue Carbon Removals (1 BCT = 1 Metric Ton CO2e)
 */
contract BlueCarbonToken {
    string public name = "BlueChain Verified Carbon Offset";
    string public symbol = "BCT";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    event TokensMinted(address indexed to, uint256 amount);
    event TokensRetired(address indexed burner, uint256 amount, string reason);

    function mint(address _to, uint256 _amount) external {
        balanceOf[_to] += _amount;
        totalSupply += _amount;
        emit TokensMinted(_to, _amount);
    }

    function retire(uint256 _amount, string memory _reason) external {
        require(balanceOf[msg.sender] >= _amount, "Insufficient BCT Balance");
        balanceOf[msg.sender] -= _amount;
        totalSupply -= _amount;
        emit TokensRetired(msg.sender, _amount, _reason);
    }
}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#8d998b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb978]" />
            <span className="uppercase tracking-widest text-[#c2c9bf]">On-Chain Ledger</span>
            <span className="text-white/20">/</span>
            <span>Polygon EVM Smart Contracts</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f6f2] tracking-tight font-display">
            Decentralized Explorer & Source Code
          </h1>
          <p className="text-xs sm:text-sm text-[#8d998b] max-w-2xl leading-relaxed">
            Transparent transaction ledger, smart contract addresses, and immutable execution logs for all BlueChain registry operations.
          </p>
        </div>

        {/* Contract Address Pill */}
        <div className="flex items-center space-x-3 border border-white/[0.1] bg-[#0c120e] p-3 text-xs font-mono">
          <div>
            <span className="text-[10px] text-[#8d998b] block uppercase">Registry Contract</span>
            <span className="text-[#3fb978] font-bold">{contractAddress}</span>
          </div>
          <button
            onClick={() => copyToClipboard(contractAddress)}
            className="p-1.5 text-[#8d998b] hover:text-white transition cursor-pointer"
          >
            {copiedHash === contractAddress ? <Check className="w-3.5 h-3.5 text-[#3fb978]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-white/[0.08] pb-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab('TX_LIST')}
          className={`px-4 py-2 transition-all cursor-pointer ${
            activeTab === 'TX_LIST' ? 'border-b-2 border-[#3fb978] text-[#f5f6f2] font-semibold' : 'text-[#8d998b] hover:text-white'
          }`}
        >
          Transaction Ledger ({transactions.length})
        </button>
        <button
          onClick={() => setActiveTab('CONTRACT_CODE')}
          className={`px-4 py-2 transition-all cursor-pointer ${
            activeTab === 'CONTRACT_CODE' ? 'border-b-2 border-[#3fb978] text-[#f5f6f2] font-semibold' : 'text-[#8d998b] hover:text-white'
          }`}
        >
          Smart Contract Source Code
        </button>
      </div>

      {activeTab === 'TX_LIST' ? (
        <div className="editorial-card overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#070a08] text-[10px] uppercase text-[#8d998b]">
                <th className="py-3 px-4">Transaction Hash</th>
                <th className="py-3 px-4">Method Action</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">From Address</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {transactions.map((tx, idx) => (
                <tr key={tx.hash || idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-[#3fb978] flex items-center space-x-1.5">
                    <span>{tx.hash.substring(0, 16)}...</span>
                    <button 
                      onClick={() => copyToClipboard(tx.hash)}
                      className="text-[#8d998b] hover:text-white cursor-pointer"
                    >
                      {copiedHash === tx.hash ? <Check className="w-3 h-3 text-[#3fb978]" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-[#f5f6f2] font-sans font-medium">{tx.txType}</td>
                  <td className="py-3 px-4 text-[#8d998b] font-sans">{tx.projectName || tx.projectId}</td>
                  <td className="py-3 px-4 text-[#c2c9bf]">{tx.sender.substring(0, 10)}...</td>
                  <td className="py-3 px-4 text-[#3fb978]">{tx.amount.toLocaleString()} BCT</td>
                  <td className="py-3 px-4 text-right text-[#8d998b]">{tx.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="editorial-panel p-6 space-y-6">
          <div className="flex items-center space-x-2 border-b border-white/[0.08] pb-3 text-xs font-mono">
            <button
              onClick={() => setActiveContractTab('REGISTRY')}
              className={`px-3 py-1.5 border transition cursor-pointer ${
                activeContractTab === 'REGISTRY' ? 'border-[#3fb978] bg-[#121a14] text-[#3fb978]' : 'border-white/[0.1] text-[#8d998b]'
              }`}
            >
              BlueCarbonRegistry.sol
            </button>
            <button
              onClick={() => setActiveContractTab('TOKEN')}
              className={`px-3 py-1.5 border transition cursor-pointer ${
                activeContractTab === 'TOKEN' ? 'border-[#3fb978] bg-[#121a14] text-[#3fb978]' : 'border-white/[0.1] text-[#8d998b]'
              }`}
            >
              BlueCarbonToken.sol (ERC-20)
            </button>
          </div>

          <pre className="p-4 bg-[#050806] border border-white/[0.08] text-xs font-mono text-[#c2c9bf] overflow-x-auto leading-relaxed">
            <code>{activeContractTab === 'REGISTRY' ? registrySolidity : tokenSolidity}</code>
          </pre>
        </div>
      )}

    </div>
  );
};
