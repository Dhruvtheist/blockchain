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

    doc.setFillColor(11, 19, 43);
    doc.rect(0, 0, 297, 210, 'F');

    doc.setDrawColor(14, 165, 233);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);

    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.8);
    doc.rect(13, 13, 271, 184);

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('BLUECHAIN CARBON REGISTRY', 148, 35, { align: 'center' });

    doc.setTextColor(56, 189, 248);
    doc.setFontSize(14);
    doc.text('OFFICIAL VERIFIED BLUE CARBON OFFSET CERTIFICATE', 148, 46, { align: 'center' });

    doc.setTextColor(203, 213, 225);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('This document certifies that', 148, 65, { align: 'center' });

    doc.setTextColor(16, 185, 129);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(certificate.buyerName.toUpperCase(), 148, 77, { align: 'center' });

    doc.setTextColor(203, 213, 225);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`has successfully acquired and retired verified Blue Carbon Credits for ecosystem restoration`, 148, 90, { align: 'center' });

    doc.setFillColor(15, 23, 42);
    doc.rect(40, 102, 217, 50, 'F');
    doc.setDrawColor(56, 189, 248);
    doc.rect(40, 102, 217, 50);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Credits Retired: ${certificate.creditsCount.toLocaleString()} Metric Tons CO2e (BCT Tokens)`, 50, 115);
    doc.text(`Project Name: ${certificate.projectName}`, 50, 126);
    doc.text(`Ecosystem Type: ${certificate.ecosystem} Ecosystem`, 50, 137);
    doc.text(`Location: ${certificate.state}, India`, 50, 146);

    doc.setTextColor(148, 163, 184);
    doc.setFontSize(9);
    doc.setFont('courier', 'normal');
    doc.text(`Certificate Serial: ${certificate.certificateId}`, 40, 168);
    doc.text(`Blockchain Transaction Hash: ${certificate.txHash}`, 40, 174);
    doc.text(`Issuance Timestamp: ${certificate.issueDate}`, 40, 180);

    doc.save(`${certificate.certificateId}_BlueCarbon.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-2xl w-full rounded-2xl glass-panel bg-slate-950 border-2 border-sky-500/40 p-6 md:p-8 space-y-6 relative shadow-2xl overflow-hidden">
        
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 border-b border-sky-500/20 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-400 p-0.5 mx-auto shadow-lg shadow-sky-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Award className="w-7 h-7 text-sky-400" />
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-wide uppercase">
            Official Blue Carbon Offset Certificate
          </h2>
          <p className="text-xs text-sky-300 font-mono">Issued by BlueChain Registry • Ethereum Smart Contract</p>
        </div>

        <div className="text-center space-y-2">
          <p className="text-xs text-slate-400">This document certifies that</p>
          <div className="text-xl md:text-2xl font-black text-emerald-400 tracking-tight">
            {certificate.buyerName}
          </div>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            has permanently retired <span className="font-bold text-sky-300">{certificate.creditsCount.toLocaleString()} Metric Tons CO₂e</span> of verified blue carbon offsets generated from coastal ecosystem restoration.
          </p>
        </div>

        <div className="p-4 rounded-xl glass-panel bg-slate-900/80 border border-slate-700/80 text-xs space-y-2 font-mono">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Certificate ID:</span>
            <span className="text-sky-300 font-bold">{certificate.certificateId}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Restoration Project:</span>
            <span className="text-slate-200 font-sans font-semibold">{certificate.projectName}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Ecosystem:</span>
            <span className="text-teal-300">{certificate.ecosystem} ({certificate.state}, India)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Tx Hash:</span>
            <span className="text-slate-400">{certificate.txHash.substring(0, 16)}...</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Cryptographically Verified on Ethereum</span>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 text-white font-bold text-xs shadow-lg shadow-sky-500/25 hover:opacity-90 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Certificate</span>
          </button>
        </div>

      </div>
    </div>
  );
};
