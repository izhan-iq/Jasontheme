import React, { useState } from 'react';
import { ConsultationForm } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, CheckCircle2, ShieldCheck, Mail, Phone, UploadCloud, FileText, ChevronRight, Calculator, MapPin, Printer } from 'lucide-react';

export default function BookConsultationModal({ onClose }: { onClose?: () => void }) {
  const [formData, setFormData] = useState<ConsultationForm>({
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    projectType: 'Hospital / Clinical',
    facilitySizeSqFt: 25000,
    priority: 'Standard Design Flow',
    gasSelection: {
      oxygen: true,
      medicalAir: true,
      nitrousOxide: false,
      vacuum: true,
      nitrogen: false,
    },
    additionalNotes: '',
  });

  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blueprintDragActive, setBlueprintDragActive] = useState(false);

  // Computed estimations
  const selectedGasCount = Object.values(formData.gasSelection).filter(Boolean).length;
  
  let complexityTier = 'Tier 2: Standard Commercial';
  let inspectorHours = '40 - 60 Hours';
  let complianceSinks = 'NFPA 99 Level II';

  if (formData.projectType === 'Hospital / Clinical') {
    complexityTier = 'Tier 1: Clinical (High Stakes)';
    inspectorHours = '100 - 150 Hours';
    complianceSinks = 'NFPA 99 Level I Category 1';
  } else if (formData.projectType === 'Industrial Lab') {
    complexityTier = 'Tier 1: Industrial (Purity High)';
    inspectorHours = '80 - 120 Hours';
    complianceSinks = 'SEMI F20 High Purity';
  } else if (formData.projectType === 'Dental / Outpatient' && selectedGasCount <= 2) {
    complexityTier = 'Tier 3: Standard Outpatient';
    inspectorHours = '16 - 24 Hours';
    complianceSinks = 'NFPA 99 Level III Category 3';
  }

  const handleGasToggle = (key: keyof typeof formData.gasSelection) => {
    setFormData((prev) => ({
      ...prev,
      gasSelection: {
        ...prev.gasSelection,
        [key]: !prev.gasSelection[key],
      },
    }));
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setBlueprintDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.email || !formData.phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitSuccess(true);
    }, 1500);
  };

  const handlePrintBookingReceipt = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <html>
        <head>
          <title>Technical Consultation Pass - Jason M.</title>
          <style>
            body { font-family: 'Inter', sans-serif; color: #171d1c; background-color: #f5faf8; padding: 40px; }
            .receipt-box { max-width: 600px; margin: 0 auto; background: #ffffff; border: 2px dashed #006c4e; border-radius: 8px; padding: 40px; }
            .header { text-align: center; border-bottom: 2px solid #eaefed; padding-bottom: 20px; margin-bottom: 25px; }
            .logo { font-size: 24px; font-weight: bold; color: #04342c; }
            .title { font-size: 14px; text-transform: uppercase; letter-spacing: 2.5px; color: #006c4e; margin-top: 10px; font-weight: bold; }
            .row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 13px; border-bottom: 1px italic #f0f5f3; padding-bottom: 8px;}
            .row-label { font-weight: bold; color: #04342c; }
            .row-value { text-align: right; color: #404846; }
            .badge { font-weight: bold; color: #04342c; text-align: center; margin-top: 35px; font-size: 14px; padding: 12px; background: #83f5c6; border-radius: 4px; }
          </style>
        </head>
        <body onload="window.print()">
          <div class="receipt-box">
            <div class="header">
              <div class="logo">JASON M. MASTER PLUMBER</div>
              <div class="title">Clinical Consultation Pass</div>
            </div>
            <div class="row"><span class="row-label">Client Name:</span><span class="row-value">${formData.clientName}</span></div>
            <div class="row"><span class="row-label">Company/Facility:</span><span class="row-value">${formData.companyName || 'Private Facility'}</span></div>
            <div class="row"><span class="row-label">Contact Email:</span><span class="row-value">${formData.email}</span></div>
            <div class="row"><span class="row-label">Contact Phone:</span><span class="row-value">${formData.phone}</span></div>
            <div class="row"><span class="row-label">Project Type:</span><span class="row-value">${formData.projectType}</span></div>
            <div class="row"><span class="row-label">Facility Footprint:</span><span class="row-value">${formData.facilitySizeSqFt.toLocaleString()} Sq.Ft</span></div>
            <div class="row"><span class="row-label">Safety Priority Level:</span><span class="row-value">${formData.priority}</span></div>
            <div class="row"><span class="row-label">Gases Included:</span><span class="row-value">${Object.keys(formData.gasSelection).filter(k => formData.gasSelection[k as keyof typeof formData.gasSelection]).join(', ')}</span></div>
            <div class="row"><span class="row-label">Allocated Project Tier:</span><span class="row-value">${complexityTier}</span></div>
            <div class="row"><span class="row-label">Estimated Sizing Sweep:</span><span class="row-value">${inspectorHours}</span></div>
            <div class="row"><span class="row-label">Target Safety Code:</span><span class="row-value">${complianceSinks}</span></div>
            <div class="badge">LEDGER SIGN-OFF: PENDING RE-VERIFICATION</div>
            <p style="text-align:center; font-size: 10px; opacity: 0.6; margin-top: 25px; font-family: monospace;">Booking Reference UUID: JMC-${Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="max-w-4xl mx-auto py-8" id="consultation-form-view">
      <AnimatePresence mode="wait">
        {!isSubmitSuccess ? (
          <motion.div
            key="booking-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Form body */}
            <form 
              onSubmit={handleSubmit}
              className="col-span-1 lg:col-span-7 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-[0_10px_35px_rgba(4,52,44,0.04)] space-y-6"
            >
              <div className="border-b border-outline-variant/20 pb-4 space-y-1">
                <span className="text-[11px] font-bold text-secondary uppercase tracking-wider font-display bg-secondary-container/10 px-2.5 py-1 rounded-full">
                  Elite Medical Gas Consult
                </span>
                <h3 className="text-xl font-bold font-display text-primary tracking-tight pt-2">
                  Initiate System Scope Evaluation
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
                  Configure your high-stakes diagnostic parameters. We will evaluate compliance demands, sizing restrictions, and system tierings automatically.
                </p>
              </div>

              {/* Form entries */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-primary font-display uppercase tracking-wide">
                    Your Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                    placeholder="e.g., Dr. Michael Vance"
                    className="w-full bg-surface border border-outline-variant/30 rounded px-3 py-3 text-xs text-primary focus:border-secondary focus:ring-1 focus:ring-secondary/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-primary font-display uppercase tracking-wide">
                    Facility or Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="e.g., Mercy Health Central Hospital"
                    className="w-full bg-surface border border-outline-variant/30 rounded px-3 py-3 text-xs text-primary focus:border-secondary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-primary font-display uppercase tracking-wide flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-outline" />
                    <span>Contact Email <span className="text-error">*</span></span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="e.g., administrator@mercyhealth.co"
                    className="w-full bg-surface border border-outline-variant/30 rounded px-3 py-3 text-xs text-primary focus:border-secondary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-primary font-display uppercase tracking-wide flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-outline" />
                    <span>Direct Phone Line <span className="text-error">*</span></span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="e.g., +1 (555) 982-4422"
                    className="w-full bg-surface border border-outline-variant/30 rounded px-3 py-3 text-xs text-primary focus:border-secondary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-outline-variant/20 pt-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-primary font-display uppercase tracking-wide">
                    Project Classification
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value as any }))}
                    className="w-full bg-surface border border-outline-variant/30 rounded px-3 py-3 text-xs font-bold text-primary focus:border-secondary"
                  >
                    <option value="Hospital / Clinical">Hospital / Clinical Suite</option>
                    <option value="Dental / Outpatient">Dental / Outpatient Clinic</option>
                    <option value="Industrial Lab">Industrial Lab (High Purity)</option>
                    <option value="Commercial HVAC">Commercial Water Plant</option>
                    <option value="Other">Custom Critical Retrofit</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-primary font-display uppercase tracking-wide flex justify-between">
                    <span>Facility Footprint</span>
                    <span className="font-mono text-secondary">{formData.facilitySizeSqFt.toLocaleString()} sq.ft</span>
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="150000"
                    step="5000"
                    value={formData.facilitySizeSqFt}
                    onChange={(e) => setFormData(prev => ({ ...prev, facilitySizeSqFt: Number(e.target.value) }))}
                    className="w-full accent-secondary"
                  />
                  <input
                    type="number"
                    value={formData.facilitySizeSqFt}
                    onChange={(e) => setFormData(prev => ({ ...prev, facilitySizeSqFt: Number(e.target.value) || 0 }))}
                    className="w-full bg-surface border border-outline-variant/30 rounded px-3 py-1.5 text-xs text-primary font-mono focus:border-secondary"
                  />
                </div>
              </div>

              {/* Target Gases */}
              <div className="space-y-2 border-t border-outline-variant/20 pt-4">
                <label className="text-[11px] font-bold text-primary font-display uppercase tracking-wide block">
                  Applicable Gas Systems
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { key: 'oxygen', label: 'Oxygen (O₂)' },
                    { key: 'medicalAir', label: 'Med Air' },
                    { key: 'nitrousOxide', label: 'Nitrous (N₂O)' },
                    { key: 'vacuum', label: 'Vacuum' },
                    { key: 'nitrogen', label: 'Nitrogen (N₂)' },
                  ].map((gas) => (
                    <button
                      key={gas.key}
                      type="button"
                      onClick={() => handleGasToggle(gas.key as any)}
                      className={`py-2 text-[10px] font-bold font-display rounded border transition-all text-center ${
                        formData.gasSelection[gas.key as keyof typeof formData.gasSelection]
                          ? 'bg-primary text-on-primary border-primary'
                          : 'bg-transparent text-on-surface-variant border-outline-variant/30 hover:bg-surface-container-low'
                      }`}
                    >
                      {gas.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div className="space-y-1.5 border-t border-outline-variant/20 pt-4">
                <label className="text-[11px] font-bold text-primary font-display uppercase tracking-wide block">
                  Project Phase urgency
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  {[
                    'Immediate (Emergency)',
                    'Standard Design Flow',
                    'Bid Phase',
                    'System Inspection / Review',
                  ].map((prio) => (
                    <button
                      key={prio}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, priority: prio as any }))}
                      className={`p-3 text-[10px] font-bold font-display rounded border transition-all text-left ${
                        formData.priority === prio
                          ? 'bg-surface-container-high border-secondary text-primary'
                          : 'bg-transparent text-on-surface-variant border-outline-variant/30 hover:bg-surface-container-low'
                      }`}
                    >
                      {prio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blueprint Drag and Drop */}
              <div className="space-y-2 border-t border-outline-variant/20 pt-4">
                <label className="text-[11px] font-bold text-primary font-display uppercase tracking-wide block">
                  Facility Blueprints & Schematic Uploads
                </label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setBlueprintDragActive(true); }}
                  onDragLeave={() => setBlueprintDragActive(false)}
                  onDrop={handleFileDrop}
                  className={`border-2 border-dashed rounded-lg p-5 text-center transition-all relative ${
                    blueprintDragActive 
                      ? 'border-secondary bg-secondary-container/10' 
                      : 'border-outline-variant/40 hover:border-secondary/40 hover:bg-surface-container-low'
                  }`}
                >
                  <input
                    type="file"
                    accept=".pdf,.dwg,.png,.jpg"
                    onChange={handleFileSelect}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {!uploadedFile ? (
                    <div className="space-y-2">
                      <UploadCloud className="w-8 h-8 text-secondary mx-auto" />
                      <div className="text-[11px] text-primary font-sans">
                        Drag and drop your layout PDF/schematic or <strong className="text-secondary underline cursor-pointer">browse filesystem</strong>
                      </div>
                      <p className="text-[9px] text-on-surface-variant font-sans">
                        Auto-scanned for compliance joints sizing (supports PDF, DWG, PNG up to 15MB)
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-surface p-3 rounded-md border border-outline-variant/30">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-secondary" />
                        <div className="text-left">
                          <div className="text-xs font-bold text-primary max-w-[200px] truncate">
                            {uploadedFile.name}
                          </div>
                          <span className="text-[10px] text-on-surface-variant font-mono">
                            {uploadedFile.size}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="text-[10px] text-red-700 hover:underline uppercase tracking-wide font-bold font-display"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Text Notes */}
              <div className="space-y-1.5 border-t border-outline-variant/20 pt-4">
                <label className="text-[11px] font-bold text-primary font-display uppercase tracking-wide">
                  Optional Structural requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                  placeholder="e.g. Requires coordination with Joint Commission reviewer on Level I alarm sensor panels."
                  className="w-full bg-surface border border-outline-variant/30 rounded px-3 py-3 text-xs text-primary focus:border-secondary"
                />
              </div>

              {/* Submit triggers */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-on-primary font-label-md text-label-md py-4 rounded font-bold hover:bg-primary-container hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(4,52,44,0.12)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Evaluating structural sizing tier...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Consultation Booking</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Right estimation column */}
            <div className="col-span-1 lg:col-span-5 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-[0_10px_35px_rgba(4,52,44,0.04)] space-y-6">
              <div className="space-y-1 border-b border-outline-variant/20 pb-4">
                <div className="flex items-center gap-2 text-secondary">
                  <Calculator className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-widest font-display">
                    Project Diagnostic Scope
                  </span>
                </div>
                <h4 className="text-sm font-bold font-display text-primary uppercase">
                  Automatic Pre-Quotation Metrics
                </h4>
              </div>

              <div className="space-y-4">
                {/* Metric list */}
                <div className="space-y-1 bg-surface p-4 rounded border border-outline-variant/20">
                  <div className="text-[9px] text-on-surface-variant font-bold uppercase font-display">
                    Project Sizing Complexity Tier
                  </div>
                  <div className="text-sm font-bold font-display text-primary">
                    {complexityTier}
                  </div>
                </div>

                <div className="space-y-1 bg-surface p-4 rounded border border-outline-variant/20">
                  <div className="text-[9px] text-on-surface-variant font-bold uppercase font-display">
                    Target Safety Code Requirement
                  </div>
                  <div className="text-sm font-bold font-display text-primary font-mono">
                    {complianceSinks}
                  </div>
                </div>

                <div className="space-y-1 bg-surface p-4 rounded border border-outline-variant/20">
                  <div className="text-[9px] text-on-surface-variant font-bold uppercase font-display">
                    Estimated On-Site Sweep Sweep Hour block
                  </div>
                  <div className="text-sm font-bold font-display text-primary">
                    {inspectorHours}
                  </div>
                </div>

                <div className="space-y-1 bg-surface p-4 rounded border border-outline-variant/20">
                  <div className="text-[9px] text-on-surface-variant font-bold uppercase font-display">
                    Integrated Gas Plumbing Conduits
                  </div>
                  <div className="text-sm font-bold font-display text-primary">
                    {selectedGasCount} Clinical Gases configured
                  </div>
                </div>
              </div>

              {/* Secure Seal */}
              <div className="bg-primary-container text-on-primary-container p-5 rounded-lg space-y-2 border border-on-primary-container/15">
                <ShieldCheck className="w-5 h-5 text-secondary-container" />
                <h5 className="text-[11px] font-bold font-display text-primary-fixed uppercase tracking-wider">
                  Verified ASSE 6010 Secure Pipeline
                </h5>
                <p className="text-[10px] text-on-primary-container leading-relaxed">
                  Every pipeline specification modeled through our diagnostic intake is evaluated for compliance under section 5.1.10 of NFPA 99. The resulting blueprints are backed by a certified stamp program.
                </p>
              </div>

              <div className="text-[10px] text-on-surface-variant text-center pt-2 font-mono uppercase bg-surface-container-low p-2 rounded">
                Ref Code: MC-IN-EST-2026
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="booking-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 text-center space-y-6 shadow-lg"
          >
            <CheckCircle2 className="w-12 h-12 text-secondary mx-auto animate-pulse" />
            <div className="space-y-2">
              <span className="text-[10px] bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-bold uppercase tracking-widest font-display">
                Intake Confirmed!
              </span>
              <h3 className="text-2xl font-bold font-display text-primary tracking-tight pt-2">
                Consultation Diagnostic Pass Generated
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed max-w-md mx-auto">
                Thank you, <strong>{formData.clientName}</strong>. Your clinical request is assigned reference id <strong className="font-mono text-secondary">JMC-{Math.floor(100000 + Math.random() * 900000)}</strong>. Jason M. will contact your team within 12 business hours to verify.
              </p>
            </div>

            <div className="bg-surface p-4 rounded-lg border border-outline-variant/30 text-left space-y-2 text-xs font-sans">
              <div className="flex justify-between border-b border-outline-variant/20 pb-1.5">
                <span className="text-on-surface-variant">Facility Code standard:</span>
                <strong className="text-primary font-mono">{complianceSinks}</strong>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-1.5">
                <span className="text-on-surface-variant">Intake Priority:</span>
                <strong className="text-red-700">{formData.priority}</strong>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-1.5">
                <span className="text-on-surface-variant">Estimated Team Size:</span>
                <strong className="text-primary">{selectedGasCount > 3 ? '4 Senior Installers' : '2 Senior Installers'}</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handlePrintBookingReceipt}
                className="flex-1 bg-primary text-on-primary font-label-md text-label-md py-3.5 rounded font-bold hover:bg-primary-container transition-background flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print Consultation Pass
              </button>
              <button
                onClick={() => {
                  setIsSubmitSuccess(false);
                  setUploadedFile(null);
                  setFormData({
                    clientName: '',
                    companyName: '',
                    email: '',
                    phone: '',
                    projectType: 'Hospital / Clinical',
                    facilitySizeSqFt: 25000,
                    priority: 'Standard Design Flow',
                    gasSelection: {
                      oxygen: true,
                      medicalAir: true,
                      nitrousOxide: false,
                      vacuum: true,
                      nitrogen: false,
                    },
                    additionalNotes: '',
                  });
                }}
                className="bg-transparent text-primary border border-outline-variant/40 font-label-md text-label-md py-3.5 px-6 rounded font-bold hover:bg-surface-container-high transition-background"
              >
                Book Another Facility
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
