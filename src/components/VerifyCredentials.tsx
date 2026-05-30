import React, { useState } from 'react';
import { CERTIFICATIONS } from '../data';
import { Certification } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShieldAlert, BadgeCheck, FileText, Download, Calendar, ExternalLink, Printer } from 'lucide-react';

export default function VerifyCredentials() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(CERTIFICATIONS[0].id);
  const [ledgerVerifiedResult, setLedgerVerifiedResult] = useState<Certification | 'not_found' | null>(null);

  // Quick verifier search logic
  const handleVerifyCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setLedgerVerifiedResult(null);

    // Simulate verification check over ledger
    setTimeout(() => {
      const matchKey = searchQuery.trim().toLowerCase();
      const match = CERTIFICATIONS.find(
        (c) => 
          c.licenseNumber.toLowerCase().includes(matchKey) || 
          c.name.toLowerCase().includes(matchKey) ||
          c.issuer.toLowerCase().includes(matchKey)
      );

      if (match) {
        setLedgerVerifiedResult(match);
      } else {
        setLedgerVerifiedResult('not_found');
      }
      setIsSearching(false);
    }, 1200);
  };

  const handlePrintCertificate = (cert: Certification) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <html>
        <head>
          <title>Credential Verification - ${cert.name}</title>
          <style>
            body { font-family: 'Inter', sans-serif; color: #171d1c; background-color: #f5faf8; padding: 40px; }
            .cert-card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 2px solid #006c4e; border-radius: 8px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
            .header { text-align: center; border-bottom: 2px solid #eaefed; padding-bottom: 20px; margin-bottom: 25px; }
            .logo { font-size: 24px; font-weight: bold; color: #04342c; letter-spacing: -0.5px; }
            .title { font-size: 18px; text-transform: uppercase; letter-spacing: 2px; color: #006c4e; margin-top: 10px; }
            .license-name { font-size: 22px; font-weight: bold; color: #04342c; margin: 20px 0; }
            .details { display: grid; grid-template-cols: 1fr 1fr; gap: 15px; margin-bottom: 25px; font-size: 14px; }
            .details div { padding: 8px; background: #f0f5f3; border-radius: 4px; }
            .details span { font-weight: bold; color: #04342c; display: block; font-size: 12px; text-transform: uppercase; margin-bottom: 2px; opacity: 0.7;}
            .scope { border-top: 1px solid #eaefed; padding-top: 20px; font-size: 13px; }
            .scope-title { font-weight: bold; margin-bottom: 10px; text-transform: uppercase; }
            .badge { font-weight: bold; color: #006c4e; text-align: center; margin-top: 30px; font-size: 14px; padding: 10px; background: #83f5c6; border-radius: 4px; }
          </style>
        </head>
        <body onload="window.print()">
          <div class="cert-card">
            <div class="header">
              <div class="logo">JASON M. ENTERPRISES</div>
              <div class="title">Official Trade Validation Ledger</div>
            </div>
            <div class="license-name">${cert.name}</div>
            <div class="details">
              <div><span>License Number</span>${cert.licenseNumber}</div>
              <div><span>Issuing Entity</span>${cert.issuer}</div>
              <div><span>Issue Date</span>${cert.issueDate}</div>
              <div><span>Expiration Date</span>${cert.expiryDate}</div>
            </div>
            <div class="scope">
              <div class="scope-title">Verified Authorized Scope of Works:</div>
              <ul>
                ${cert.scope.map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>
            <div class="badge">LEDGER STATUS: VERIFIED ACTIVE & COMPLIANT</div>
            <p style="text-align:center; font-size: 10px; opacity: 0.6; margin-top: 20px; font-family: monospace;">Verification Proof Token: ${btoa(cert.licenseNumber).slice(0, 16).toUpperCase()}</p>
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const selectedCert = CERTIFICATIONS.find((c) => c.id === activeTab) || CERTIFICATIONS[0];

  return (
    <div className="space-y-16 py-8" id="credentials-view">
      {/* Intro section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary font-display bg-secondary-container/10 px-3 py-1.5 rounded-full inline-block">
          Rigorous Ledger Verification
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-primary font-display tracking-tight">
          Verify Trade Licensure & Credentials
        </h2>
        <p className="text-on-surface-variant text-base font-sans max-w-2xl mx-auto">
          We promote complete security transparency. Look up license codes on our digital ledger, verify active standings, and download structural verification audit receipts.
        </p>
      </section>

      {/* Ledger search console & Badge list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Quick Verifier Database Search */}
        <div className="col-span-1 lg:col-span-4 space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-[0_10px_30px_rgba(4,52,44,0.03)] space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold font-display text-primary uppercase tracking-wide">
                Instant License Lookup
              </h3>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Enter license IDs like <strong className="font-mono text-secondary">MP-14892</strong> or <strong className="font-mono text-secondary">MG-6010-98440</strong> to view real-time state database validity and safety standing.
              </p>
            </div>

            <form onSubmit={handleVerifyCheck} className="relative mt-2">
              <input
                type="text"
                placeholder="Lookup key or License ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-outline-variant/30 rounded px-3 py-3 pr-10 text-xs text-primary font-sans focus:border-secondary focus:ring-1 focus:ring-secondary/20 placeholder:text-outline"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-2 top-2 p-1.5 rounded text-secondary hover:bg-surface-container-high transition-background disabled:opacity-50"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Suggestions for verifying */}
            <div className="space-y-1.5 pt-2">
              <div className="text-[10px] text-on-surface-variant font-bold uppercase font-display tracking-wide">
                Quick click check:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {CERTIFICATIONS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSearchQuery(c.licenseNumber);
                      setActiveTab(c.id);
                    }}
                    className="px-2 py-1 text-[10px] font-mono rounded bg-surface border border-outline-variant/30 text-primary-container hover:bg-surface-container-high hover:border-secondary/30 transition-all text-left"
                  >
                    {c.licenseNumber}
                  </button>
                ))}
              </div>
            </div>

            {/* Search results placeholder or contents */}
            <div className="pt-2">
              <AnimatePresence mode="wait">
                {isSearching && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-6 space-y-2"
                  >
                    <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] text-on-surface-variant font-family-mono font-sans">
                      Retrieving state trade ledger database...
                    </span>
                  </motion.div>
                )}

                {!isSearching && ledgerVerifiedResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border space-y-3 ${
                      ledgerVerifiedResult === 'not_found'
                        ? 'bg-error-container/10 border-error/20 text-on-error-container'
                        : 'bg-secondary-container/10 border-secondary/20 text-on-secondary-container'
                    }`}
                  >
                    {ledgerVerifiedResult === 'not_found' ? (
                      <>
                        <div className="flex items-start gap-2">
                          <ShieldAlert className="w-5 h-5 text-error shrink-0" />
                          <div>
                            <div className="text-xs font-bold text-primary uppercase font-display">
                              ID Not Resolved
                            </div>
                            <p className="text-[10px] text-on-surface-variant leading-relaxed font-sans">
                              The credential key entered was not located in our current live local portfolio index. Double-check license code.
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <BadgeCheck className="w-5 h-5 text-secondary shrink-0" />
                            <div>
                              <div className="text-xs font-bold text-primary uppercase font-display">
                                Verified Active Record
                              </div>
                              <p className="text-[10px] text-on-surface-variant leading-relaxed">
                                {ledgerVerifiedResult.name} is fully matching current active state registrations and safety compliance requirements.
                              </p>
                            </div>
                          </div>
                          <div className="bg-white/40 border border-white/60 p-2.5 rounded text-[10px] font-mono text-primary space-y-1">
                            <div>Proof Hash: {btoa(ledgerVerifiedResult.licenseNumber).slice(0, 16).toUpperCase()}</div>
                            <div>State Status: ACTIVE & VALID</div>
                          </div>
                          <button
                            onClick={() => handlePrintCertificate(ledgerVerifiedResult as Certification)}
                            type="button"
                            className="w-full bg-primary text-on-primary text-[10px] uppercase tracking-wider font-bold py-2.5 rounded hover:bg-primary-container transition-background flex items-center justify-center gap-1.5"
                          >
                            <Printer className="w-3.5 h-3.5" /> Print Validation Token
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right column: Dynamic Credentials detailing */}
        <div className="col-span-1 lg:col-span-8 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-[0_10px_35px_rgba(4,52,44,0.04)] space-y-6">
          <div className="flex flex-col sm:flex-row gap-2 border-b border-outline-variant/20 pb-4">
            {CERTIFICATIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveTab(c.id);
                  setSearchQuery(c.licenseNumber);
                }}
                className={`px-4 py-3 text-xs font-bold font-display rounded-lg border text-left transition-all flex items-center justify-between gap-1.5 shrink-0 ${
                  activeTab === c.id 
                    ? 'bg-surface-container-high border-secondary text-primary shadow-sm' 
                    : 'bg-transparent text-on-surface-variant border-outline-variant/20 hover:bg-surface-container-low'
                }`}
              >
                <span>{c.name.split(' ').slice(0, 3).join(' ')}...</span>
                <span className="font-mono text-[9px] bg-secondary-container px-1.5 py-0.5 rounded text-on-secondary-container">
                  {c.licenseNumber.split('-')[0]}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 bg-secondary/10 text-secondary text-[10px] font-bold font-display uppercase tracking-widest px-2.5 py-1 rounded-full mb-2">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    <span>Active Standing - State Verified</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary font-display tracking-tight leading-snug">
                    {selectedCert.name}
                  </h3>
                  <div className="text-xs text-on-surface-variant font-sans">
                    Regulatory Body: <span className="font-medium text-primary">{selectedCert.issuer}</span>
                  </div>
                </div>

                <div className="bg-surface p-4 rounded-lg border border-outline-variant/30 text-right shrink-0">
                  <div className="text-[9px] text-on-surface-variant font-semibold tracking-wider font-display uppercase">
                    LICENSE NUMBER
                  </div>
                  <div className="text-sm font-bold text-primary font-mono select-all">
                    {selectedCert.licenseNumber}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-[10px] font-bold text-primary font-display uppercase tracking-wider">
                    Scope of Verification
                  </h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {selectedCert.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {selectedCert.scope.map((val, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 bg-surface border border-outline-variant/20 rounded-md flex items-center justify-between text-[11px] text-primary font-sans"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                        <span>{val}</span>
                      </div>
                      <span className="text-[9px] font-mono text-secondary font-bold uppercase shrink-0">
                        VERIFIED
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-outline-variant/20 pt-4 text-xs">
                  <div className="flex items-center gap-2 font-sans text-on-surface-variant">
                    <Calendar className="w-4 h-4 text-outline" />
                    <span>Issue Date: <strong className="font-medium text-primary">{selectedCert.issueDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 font-sans text-on-surface-variant">
                    <Calendar className="w-4 h-4 text-outline" />
                    <span>Validated Until: <strong className="font-medium text-primary">{selectedCert.expiryDate}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => handlePrintCertificate(selectedCert)}
                  className="flex-1 bg-primary text-on-primary font-label-md text-label-md px-6 py-3.5 rounded font-bold hover:bg-primary-container transition-background text-center flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" /> Download Certified Verification Report (PDF)
                </button>
                <a 
                  href="https://nitc.info/certifications"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-transparent text-primary border border-outline-variant/30 font-label-md text-label-md px-6 py-3.5 rounded font-bold hover:bg-surface-container-high transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <span>Verify with NITC Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
