import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Copy, Check, Terminal } from 'lucide-react';

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
    <div className="space-y-8 animate-fadeIn pb-16 text-[var(--text-primary)]">
      
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/20 text-[11px] font-mono text-[var(--color-primary)]">
            <Terminal className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span className="font-bold uppercase tracking-wider">On-Chain Ledger</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-secondary)]">Polygon EVM Smart Contracts</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight font-display">
            Decentralized Explorer & Source Code
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Transparent transaction ledger, smart contract addresses, and immutable execution logs for all BlueChain registry operations.
          </p>
        </div>

        {/* Contract Address Pill */}
        <div className="flex items-center space-x-3 border border-[var(--border-color)] bg-[var(--surface-card)] rounded-xl px-4 py-2.5 text-xs font-mono shadow-xs">
          <div>
            <span className="text-[10px] text-[var(--text-muted)] block uppercase font-semibold">Registry Contract</span>
            <span className="text-[var(--color-primary)] font-bold">{contractAddress}</span>
          </div>
          <button
            onClick={() => copyToClipboard(contractAddress)}
            className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition cursor-pointer"
          >
            {copiedHash === contractAddress ? <Check className="w-3.5 h-3.5 text-[var(--color-success)]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-[var(--border-color)] pb-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab('TX_LIST')}
          className={`px-4 py-2 rounded-t-lg transition-all cursor-pointer font-bold ${
            activeTab === 'TX_LIST' 
              ? 'border-b-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary-soft)]' 
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          Transaction Ledger ({transactions.length})
        </button>
        <button
          onClick={() => setActiveTab('CONTRACT_CODE')}
          className={`px-4 py-2 rounded-t-lg transition-all cursor-pointer font-bold ${
            activeTab === 'CONTRACT_CODE' 
              ? 'border-b-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary-soft)]' 
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          Smart Contract Source Code
        </button>
      </div>

      {activeTab === 'TX_LIST' ? (
        <div className="editorial-card overflow-hidden bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[var(--border-color)] bg-[var(--surface-panel)] text-[10px] uppercase text-[var(--text-muted)] font-bold">
                  <th className="py-3.5 px-5">Transaction Hash</th>
                  <th className="py-3.5 px-5">Method Action</th>
                  <th className="py-3.5 px-5">Project</th>
                  <th className="py-3.5 px-5">From Address</th>
                  <th className="py-3.5 px-5">Amount</th>
                  <th className="py-3.5 px-5 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {transactions.map((tx, idx) => (
                  <tr key={tx.hash || idx} className="hover:bg-[var(--surface-panel)] transition-colors">
                    <td className="py-4 px-5 text-[var(--color-primary)] font-bold flex items-center space-x-1.5">
                      <span>{tx.hash.substring(0, 16)}...</span>
                      <button 
                        onClick={() => copyToClipboard(tx.hash)}
                        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                      >
                        {copiedHash === tx.hash ? <Check className="w-3 h-3 text-[var(--color-success)]" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </td>
                    <td className="py-4 px-5 text-[var(--text-primary)] font-sans font-semibold">{tx.txType}</td>
                    <td className="py-4 px-5 text-[var(--text-secondary)] font-sans">{tx.projectName || tx.projectId}</td>
                    <td className="py-4 px-5 text-[var(--text-muted)]">{tx.sender.substring(0, 10)}...</td>
                    <td className="py-4 px-5 text-[var(--color-success)] font-bold tabular-nums">{tx.amount.toLocaleString()} BCT</td>
                    <td className="py-4 px-5 text-right text-[var(--text-muted)] tabular-nums">{tx.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="editorial-panel p-6 space-y-5 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
          <div className="flex items-center space-x-2 border-b border-[var(--border-color)] pb-3 text-xs font-mono">
            <button
              onClick={() => setActiveContractTab('REGISTRY')}
              className={`px-3.5 py-1.5 rounded-lg border transition cursor-pointer font-bold ${
                activeContractTab === 'REGISTRY' 
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] shadow-xs' 
                  : 'border-[var(--border-color)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:bg-[var(--surface-panel)]'
              }`}
            >
              BlueCarbonRegistry.sol
            </button>
            <button
              onClick={() => setActiveContractTab('TOKEN')}
              className={`px-3.5 py-1.5 rounded-lg border transition cursor-pointer font-bold ${
                activeContractTab === 'TOKEN' 
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] shadow-xs' 
                  : 'border-[var(--border-color)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:bg-[var(--surface-panel)]'
              }`}
            >
              BlueCarbonToken.sol (ERC-20)
            </button>
          </div>

          <pre className="p-4 sm:p-5 bg-[var(--surface-panel)] border border-[var(--border-color)] rounded-xl text-xs font-mono text-[var(--text-primary)] overflow-x-auto leading-relaxed shadow-xs">
            <code>{activeContractTab === 'REGISTRY' ? registrySolidity : tokenSolidity}</code>
          </pre>
        </div>
      )}

    </div>
  );
};
