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

    // Background - Crisp Clean White
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 297, 210, 'F');

    // Outer Border - Institutional Deep Ocean
    doc.setDrawColor(8, 126, 164);
    doc.setLineWidth(1.5);
    doc.rect(12, 12, 273, 186);

    // Inner Hairline - Mangrove Green Accent
    doc.setDrawColor(22, 130, 93);
    doc.setLineWidth(0.3);
    doc.rect(15, 15, 267, 180);

    // Title
    doc.setTextColor(15, 41, 66);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('BLUECHAIN REGISTRY PROTOCOL', 148, 38, { align: 'center' });

    doc.setTextColor(22, 130, 93);
    doc.setFontSize(11);
    doc.text('OFFICIAL VERIFIED BLUE CARBON RETIREMENT CERTIFICATE', 148, 48, { align: 'center' });

    doc.setTextColor(72, 101, 129);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('This document certifies that', 148, 68, { align: 'center' });

    doc.setTextColor(15, 41, 66);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(certificate.buyerName.toUpperCase(), 148, 80, { align: 'center' });

    doc.setTextColor(72, 101, 129);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('has successfully acquired and permanently retired verified Blue Carbon Credits for coastal restoration.', 148, 92, { align: 'center' });

    // Details Box
    doc.setFillColor(238, 245, 247);
    doc.rect(40, 105, 217, 48, 'F');
    doc.setDrawColor(217, 226, 236);
    doc.rect(40, 105, 217, 48);

    doc.setTextColor(15, 41, 66);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Credits Retired: ${certificate.creditsCount.toLocaleString()} Metric Tons CO2e (BCT Tokens)`, 48, 117);
    doc.text(`Project Name: ${certificate.projectName}`, 48, 127);
    doc.text(`Ecosystem: ${certificate.ecosystem} (${certificate.state}, India)`, 48, 137);

    doc.setTextColor(130, 154, 177);
    doc.setFontSize(8);
    doc.setFont('courier', 'normal');
    doc.text(`Certificate Serial: ${certificate.certificateId}`, 40, 168);
    doc.text(`Transaction Hash: ${certificate.txHash}`, 40, 174);
    doc.text(`Issuance Timestamp: ${certificate.issueDate}`, 40, 180);

    doc.save(`${certificate.certificateId}_BlueCarbon.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[var(--modal-overlay)] backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="max-w-2xl w-full editorial-panel p-6 sm:p-7 space-y-5 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xl relative text-[var(--text-primary)]">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        <div className="text-center space-y-2 border-b border-[var(--border-color)] pb-5">
          <div className="w-12 h-12 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary-soft)] mx-auto flex items-center justify-center shadow-xs">
            <Award className="w-6 h-6 text-[var(--color-primary)]" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] font-display uppercase tracking-tight">
            Official Blue Carbon Retirement Certificate
          </h2>
          <p className="text-xs text-[var(--color-success)] font-mono font-semibold">Issued by BlueChain Registry Protocol • On-Chain Settlement</p>
        </div>

        <div className="text-center space-y-1.5">
          <p className="text-xs text-[var(--text-secondary)]">This document certifies that</p>
          <div className="text-xl font-bold text-[var(--text-primary)] font-display">
            {certificate.buyerName}
          </div>
          <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
            has permanently retired <span className="font-bold text-[var(--text-primary)] tabular-nums">{certificate.creditsCount.toLocaleString()} Metric Tons CO₂e</span> of verified blue carbon offsets from verified coastal restoration projects.
          </p>
        </div>

        <div className="p-4 bg-[var(--surface-panel)] border border-[var(--border-color)] rounded-xl text-xs space-y-2 font-mono tabular-nums">
          <div className="flex justify-between border-b border-[var(--border-subtle)] pb-1.5">
            <span className="text-[var(--text-muted)]">Certificate ID:</span>
            <span className="text-[var(--color-primary)] font-bold">{certificate.certificateId}</span>
          </div>
          <div className="flex justify-between border-b border-[var(--border-subtle)] pb-1.5">
            <span className="text-[var(--text-muted)]">Project:</span>
            <span className="text-[var(--text-primary)] font-sans font-bold">{certificate.projectName}</span>
          </div>
          <div className="flex justify-between border-b border-[var(--border-subtle)] pb-1.5">
            <span className="text-[var(--text-muted)]">Habitat:</span>
            <span className="text-[var(--text-secondary)]">{certificate.ecosystem} ({certificate.state}, India)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Tx Hash:</span>
            <span className="text-[var(--color-primary)]">{certificate.txHash.substring(0, 20)}...</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-1.5 text-xs text-[var(--color-success)] font-mono font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Cryptographically Verified</span>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="h-10 flex items-center space-x-2 px-4.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] font-semibold text-xs rounded-lg transition cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF Certificate</span>
          </button>
        </div>

      </div>
    </div>
  );
};
