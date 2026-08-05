import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Blocks, Copy, Check, Code, Cpu } from 'lucide-react';

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
        require(msg.sender == governmentAdmin, "Only Gov Admin");
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
 * @dev ERC20 Token Standard for Verified Carbon Offsets (1 BCT = 1 Metric Ton CO2e)
 */
contract BlueCarbonToken {
    string public name = "BlueChain Verified Carbon Offset";
    string public symbol = "BCT";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    event TokensMinted(address indexed to, uint256 amount);

    function mint(address to, uint256 amount) external returns (bool) {
        uint256 scaled = amount * (10 ** 18);
        totalSupply += scaled;
        balanceOf[to] += scaled;
        emit TokensMinted(to, amount);
        return true;
    }
}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Contract Banner Header */}
      <div className="p-6 rounded-2xl glass-panel bg-slate-900/80 border border-sky-500/20 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-semibold mb-2">
            <Blocks className="w-3.5 h-3.5 text-sky-400" />
            <span>Ethereum Testnet Verified Smart Contract</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">Blockchain Carbon Registry & Immutable Ledger</h2>
          <p className="text-xs text-slate-400">Cryptographic audit log for all project registrations, government verifications, and credit transfers</p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center space-x-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('TX_LIST')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              activeTab === 'TX_LIST' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Transaction Feed
          </button>
          <button
            onClick={() => setActiveTab('CONTRACT_CODE')}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CONTRACT_CODE' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Solidity Smart Contracts</span>
          </button>
        </div>
      </div>

      {/* Contract Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl glass-panel bg-slate-900/60 border border-slate-800 text-xs space-y-1">
          <div className="text-slate-400">Registry Contract Address:</div>
          <div className="font-mono text-sky-300 font-bold flex items-center justify-between">
            <span>{contractAddress}</span>
            <button onClick={() => copyToClipboard(contractAddress)}>
              {copiedHash === contractAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-white" />}
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl glass-panel bg-slate-900/60 border border-slate-800 text-xs space-y-1">
          <div className="text-slate-400">Total On-Chain Blocks:</div>
          <div className="font-mono text-emerald-400 font-bold text-base">#19,485,240</div>
        </div>

        <div className="p-4 rounded-xl glass-panel bg-slate-900/60 border border-slate-800 text-xs space-y-1">
          <div className="text-slate-400">Consensus Engine:</div>
          <div className="font-semibold text-teal-300 flex items-center space-x-1">
            <Cpu className="w-3.5 h-3.5 text-teal-400" />
            <span>Proof of Stake (PoS) • Sepolia</span>
          </div>
        </div>
      </div>

      {activeTab === 'TX_LIST' ? (
        /* Transactions Ledger Table */
        <div className="rounded-2xl glass-panel bg-slate-900/80 border border-sky-500/20 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-200">
            <span>All Immutable Blockchain Transactions ({transactions.length})</span>
            <span className="text-slate-500 font-mono text-[10px]">Zero Tamper Risk</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/60">
                  <th className="py-3.5 px-4">Tx Hash</th>
                  <th className="py-3.5 px-4">Method / Action</th>
                  <th className="py-3.5 px-4">Project</th>
                  <th className="py-3.5 px-4">Sender (From)</th>
                  <th className="py-3.5 px-4">Recipient (To)</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Gas Used</th>
                  <th className="py-3.5 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                {transactions.map(tx => (
                  <tr key={tx.hash} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-sky-400 flex items-center space-x-1.5">
                      <span>{tx.hash.substring(0, 12)}...{tx.hash.substring(tx.hash.length - 4)}</span>
                      <button onClick={() => copyToClipboard(tx.hash)}>
                        <Copy className="w-3 h-3 text-slate-500 hover:text-white" />
                      </button>
                    </td>
                    <td className="py-3.5 px-4 font-sans">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tx.txType === 'VERIFY_MINT' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        tx.txType === 'REGISTER' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' :
                        tx.txType === 'PURCHASE' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' :
                        'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}>
                        {tx.txType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-sans text-slate-200 font-semibold">{tx.projectName}</td>
                    <td className="py-3.5 px-4 text-slate-400">{tx.sender.substring(0, 8)}...</td>
                    <td className="py-3.5 px-4 text-slate-400">{tx.recipient.substring(0, 8)}...</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400 font-sans">
                      {tx.amount ? `${tx.amount.toLocaleString()} BCT` : '—'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{tx.gasUsed}</td>
                    <td className="py-3.5 px-4 text-slate-400 font-sans">{new Date(tx.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Solidity Smart Contract Viewer */
        <div className="rounded-2xl glass-panel bg-slate-950 border border-sky-500/30 overflow-hidden space-y-0">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveContractTab('REGISTRY')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeContractTab === 'REGISTRY' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold' : 'text-slate-400'
                }`}
              >
                BlueCarbonRegistry.sol
              </button>
              <button
                onClick={() => setActiveContractTab('TOKEN')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeContractTab === 'TOKEN' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold' : 'text-slate-400'
                }`}
              >
                BlueCarbonToken.sol (ERC-20)
              </button>
            </div>
            <button
              onClick={() => copyToClipboard(activeContractTab === 'REGISTRY' ? registrySolidity : tokenSolidity)}
              className="flex items-center space-x-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-mono"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </button>
          </div>

          <pre className="p-6 text-xs font-mono text-sky-200 bg-slate-950 overflow-x-auto leading-relaxed">
            <code>{activeContractTab === 'REGISTRY' ? registrySolidity : tokenSolidity}</code>
          </pre>
        </div>
      )}

    </div>
  );
};
