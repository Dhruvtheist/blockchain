import React from 'react';
import type { CarbonCertificate } from '../types';
import { Award, ShieldCheck, Download, X } from 'lucide-react';
import jsPDF from 'jspdf';

interface Props {
  certificate: CarbonCertificate;
  onClose: () => void;
}

export const CertificateModal: React.FC<Props> = ({ certificate, onClose }) => {
  
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Background - Obsidian Deep
    doc.setFillColor(7, 10, 8);
    doc.rect(0, 0, 297, 210, 'F');

    // Outer Border
    doc.setDrawColor(46, 125, 86);
    doc.setLineWidth(1);
    doc.rect(12, 12, 273, 186);

    // Inner Hairline
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.2);
    doc.rect(15, 15, 267, 180);

    // Title
    doc.setTextColor(245, 246, 242);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('BLUECHAIN REGISTRY PROTOCOL', 148, 38, { align: 'center' });

    doc.setTextColor(63, 185, 120);
    doc.setFontSize(11);
    doc.text('OFFICIAL VERIFIED BLUE CARBON RETIREMENT CERTIFICATE', 148, 48, { align: 'center' });

    doc.setTextColor(141, 153, 139);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('This document certifies that', 148, 68, { align: 'center' });

    doc.setTextColor(245, 246, 242);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(certificate.buyerName.toUpperCase(), 148, 80, { align: 'center' });

    doc.setTextColor(141, 153, 139);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('has successfully acquired and permanently retired verified Blue Carbon Credits for coastal restoration.', 148, 92, { align: 'center' });

    // Details Box
    doc.setFillColor(12, 18, 14);
    doc.rect(40, 105, 217, 48, 'F');
    doc.setDrawColor(255, 255, 255);
    doc.rect(40, 105, 217, 48);

    doc.setTextColor(245, 246, 242);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Credits Retired: ${certificate.creditsCount.toLocaleString()} Metric Tons CO2e (BCT Tokens)`, 48, 117);
    doc.text(`Project Name: ${certificate.projectName}`, 48, 127);
    doc.text(`Ecosystem: ${certificate.ecosystem} (${certificate.state}, India)`, 48, 137);

    doc.setTextColor(141, 153, 139);
    doc.setFontSize(7.5);
    doc.setFont('courier', 'normal');
    doc.text(`Certificate Serial: ${certificate.certificateId}`, 40, 168);
    doc.text(`Transaction Hash: ${certificate.txHash}`, 40, 174);
    doc.text(`Issuance Timestamp: ${certificate.issueDate}`, 40, 180);

    doc.save(`${certificate.certificateId}_BlueCarbon.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070a08]/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="max-w-2xl w-full editorial-panel p-6 sm:p-8 space-y-6 border-white/20 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[#8d998b] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 border-b border-white/[0.08] pb-6">
          <div className="w-10 h-10 border border-white/[0.15] bg-[#0c120e] mx-auto flex items-center justify-center">
            <Award className="w-5 h-5 text-[#3fb978]" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#f5f6f2] font-display uppercase tracking-tight">
            Official Blue Carbon Retirement Certificate
          </h2>
          <p className="text-xs text-[#3fb978] font-mono">Issued by BlueChain Registry Protocol • On-Chain Settlement</p>
        </div>

        <div className="text-center space-y-1.5">
          <p className="text-xs text-[#8d998b]">This document certifies that</p>
          <div className="text-xl font-bold text-[#f5f6f2] font-display">
            {certificate.buyerName}
          </div>
          <p className="text-xs text-[#8d998b] max-w-md mx-auto leading-relaxed">
            has permanently retired <span className="font-bold text-[#f5f6f2]">{certificate.creditsCount.toLocaleString()} Metric Tons CO₂e</span> of verified blue carbon offsets from verified coastal restoration projects.
          </p>
        </div>

        <div className="p-4 bg-[#050806] border border-white/[0.08] text-xs space-y-2 font-mono">
          <div className="flex justify-between border-b border-white/[0.06] pb-1.5">
            <span className="text-[#8d998b]">Certificate ID:</span>
            <span className="text-[#3fb978] font-bold">{certificate.certificateId}</span>
          </div>
          <div className="flex justify-between border-b border-white/[0.06] pb-1.5">
            <span className="text-[#8d998b]">Project:</span>
            <span className="text-[#f5f6f2] font-sans">{certificate.projectName}</span>
          </div>
          <div className="flex justify-between border-b border-white/[0.06] pb-1.5">
            <span className="text-[#8d998b]">Habitat:</span>
            <span className="text-[#c2c9bf]">{certificate.ecosystem} ({certificate.state}, India)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8d998b]">Tx Hash:</span>
            <span className="text-[#8d998b]">{certificate.txHash.substring(0, 20)}...</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-1.5 text-xs text-[#3fb978] font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Cryptographically Verified</span>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-2 px-5 py-2 bg-[#f5f6f2] hover:bg-white text-[#070a08] font-semibold text-xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF Certificate</span>
          </button>
        </div>

      </div>
    </div>
  );
};
