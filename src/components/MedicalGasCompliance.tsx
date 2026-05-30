import React, { useState, useEffect } from 'react';
import { GAS_DATA, CLINICAL_STAGES } from '../data';
import { PipeCalculationInput, PipeCalculationResult } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, CheckCircle2, AlertTriangle, Info, RefreshCw, Layers, ShieldCheck, Flame } from 'lucide-react';

export default function MedicalGasCompliance() {
  // Sizing State
  const [gasType, setGasType] = useState<keyof typeof GAS_DATA>('Oxygen');
  const [pipeLength, setPipeLength] = useState<number>(120);
  const [flowRate, setFlowRate] = useState<number>(15);
  const [pipeDiameter, setPipeDiameter] = useState<number>(0.75); // in inches
  const [calcResult, setCalcResult] = useState<PipeCalculationResult | null>(null);

  // Compliance checklist state
  const [checklist, setChecklist] = useState({
    purgeVerified: false,
    materialsCleaned: false,
    standingTestPassed: false,
    alarmInterfaced: false,
    leakSnoopVerified: false,
  });

  const [checklistComplete, setChecklistComplete] = useState(false);

  // Recalculate parameters when inputs change
  useEffect(() => {
    // 1. Calculate Inside Area
    const radiusIn = pipeDiameter / 2;
    const areaSqFt = (Math.PI * Math.pow(radiusIn, 2)) / 144; // sq ft

    // Flow CFM is in Cubic Feet per Minute
    const velocityFps = (flowRate / 60) / areaSqFt;

    // 2. Compute Pressure Drop using standard simplified fluid equation
    // pressure drop per 100 ft is approximately proportional to gas density * (v^2) / diameter * constant
    const selectedGas = GAS_DATA[gasType];
    const densityRatio = selectedGas.densityRatio;
    
    // Constant multiplier for fitting standard charts
    const dropPer100Ft = (0.22 * densityRatio * Math.pow(velocityFps, 1.85)) / (Math.pow(pipeDiameter * 12, 1.16) * 1000);
    const pressureDropPsi = parseFloat(((dropPer100Ft * pipeLength) / 100).toFixed(3));

    // 3. Standards Validation
    const maxSafeVelocity = selectedGas.maxSafeVelocityFps;
    const isVelocityValid = velocityFps <= maxSafeVelocity;
    const isPressureDropValid = gasType === 'Medical Vacuum' 
      ? pressureDropPsi <= 4.0 
      : pressureDropPsi <= 3.5; // Up to 5% drop limit under normal flow

    const isCompliant = isVelocityValid && isPressureDropValid && flowRate > 0 && pipeLength > 0;

    let recommendation = '';
    if (!isVelocityValid) {
      recommendation = `Velocity of ${velocityFps.toFixed(1)} FPS exceeds the safe NFPA limit of ${maxSafeVelocity} FPS for ${gasType} pipelines. Increase pipe size immediately.`;
    } else if (!isPressureDropValid) {
      recommendation = `Estimated pressure drop of ${pressureDropPsi} PSI is higher than recommended 3.5 PSI limit for delivery systems. Consider increasing diameter or splitting into multi-zone dual branches.`;
    } else {
      recommendation = `Optimal Sizing. Continuous nitrogen-purge brazing under compliance standard 6010 is fully compatible with these parameters.`;
    }

    setCalcResult({
      velocityFps: parseFloat(velocityFps.toFixed(1)),
      pressureDropPsi,
      isCompliant,
      recommendation
    });
  }, [gasType, pipeLength, flowRate, pipeDiameter]);

  // Handle Checklist change
  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist(prev => {
      const next = { ...prev, [key]: !prev[key] };
      const allDone = Object.values(next).every(v => v === true);
      setChecklistComplete(allDone);
      return next;
    });
  };

  const resetCalculator = () => {
    setGasType('Oxygen');
    setPipeLength(120);
    setFlowRate(15);
    setPipeDiameter(0.75);
  };

  return (
    <div className="space-y-16 py-8" id="compliance-view">
      {/* Intro header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary font-display bg-secondary-container/10 px-3 py-1.5 rounded-full inline-block">
          Clinical Engineering Sandbox
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-primary font-display tracking-tight">
          Clinical Calculations & Code Standards
        </h2>
        <p className="text-on-surface-variant text-base font-sans max-w-2xl mx-auto">
          Plumbing is a fluid science. Play with our live NFPA-compliant pressure drop utility and verify active field standards for clinical systems.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Sizing Tool */}
        <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-[0_10px_35px_rgba(4,52,44,0.04)] space-y-6">
          <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-bold font-display text-primary tracking-tight">
                Pipe Sizing & Flow Velocity Estimator
              </h3>
            </div>
            <button 
              onClick={resetCalculator}
              className="p-1 px-2.5 rounded text-[10px] uppercase font-bold font-display border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low transition-all flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="space-y-4">
            {/* Gas selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-primary font-display uppercase tracking-wide">
                Target Gas Medium
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(Object.keys(GAS_DATA) as (keyof typeof GAS_DATA)[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setGasType(type)}
                    className={`py-2 text-[11px] font-bold font-display rounded-lg border transition-all text-center ${
                      gasType === type 
                        ? 'bg-primary text-on-primary border-primary shadow-sm' 
                        : 'bg-transparent text-on-surface-variant border-outline-variant/40 hover:bg-surface-container-low'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs slider / numeric fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary font-display uppercase tracking-wide flex justify-between">
                  <span>Line Length</span>
                  <span className="font-mono text-secondary">{pipeLength} Ft</span>
                </label>
                <input 
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={pipeLength}
                  onChange={(e) => setPipeLength(Number(e.target.value))}
                  className="w-full accent-secondary"
                />
                <input 
                  type="number"
                  value={pipeLength}
                  min="1"
                  onChange={(e) => setPipeLength(Number(e.target.value) || 0)}
                  className="w-full bg-surface border border-outline-variant/30 rounded px-3 py-1.5 text-xs text-primary font-mono focus:border-secondary focus:ring-1 focus:ring-secondary/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary font-display uppercase tracking-wide flex justify-between">
                  <span>Target flow rate</span>
                  <span className="font-mono text-secondary">{flowRate} SCFM</span>
                </label>
                <input 
                  type="range"
                  min="1"
                  max="120"
                  step="1"
                  value={flowRate}
                  onChange={(e) => setFlowRate(Number(e.target.value))}
                  className="w-full accent-secondary"
                />
                <input 
                  type="number"
                  value={flowRate}
                  min="1"
                  onChange={(e) => setFlowRate(Number(e.target.value) || 0)}
                  className="w-full bg-surface border border-outline-variant/30 rounded px-3 py-1.5 text-xs text-primary font-mono focus:border-secondary focus:ring-1 focus:ring-secondary/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary font-display uppercase tracking-wide">
                  Inside Tube Diameter
                </label>
                <select
                  value={pipeDiameter}
                  onChange={(e) => setPipeDiameter(Number(e.target.value))}
                  className="w-full bg-surface border border-outline-variant/30 rounded px-3 py-3 text-xs font-bold text-primary focus:border-secondary"
                >
                  <option value="0.5">1/2&quot; Nom (0.545&quot; ID)</option>
                  <option value="0.75">3/4&quot; Nom (0.785&quot; ID)</option>
                  <option value="1.0">1&quot; Nom (1.025&quot; ID)</option>
                  <option value="1.25">1-1/4&quot; Nom (1.265&quot; ID)</option>
                  <option value="1.5">1-1/2&quot; Nom (1.505&quot; ID)</option>
                  <option value="2.0">2&quot; Nom (1.985&quot; ID)</option>
                  <option value="2.5">2-1/2&quot; Nom (2.465&quot; ID)</option>
                </select>
                <div className="text-[10px] text-on-surface-variant font-mono mt-1 text-right">
                  Standard ASTM B819 L-Copper
                </div>
              </div>
            </div>
          </div>

          {/* Sizing Outputs Panel */}
          {calcResult && (
            <div className="bg-surface border border-outline-variant/30 p-5 rounded-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-lowest p-3 rounded border border-outline-variant/20 flex flex-col justify-between">
                  <div className="text-[10px] font-bold text-on-surface-variant uppercase font-display tracking-wider">
                    Flow Gas Velocity
                  </div>
                  <div className="text-2xl font-bold font-display text-primary mt-1 flex items-baseline gap-1">
                    {calcResult.velocityFps}
                    <span className="text-xs font-mono text-outline font-normal">FPS</span>
                  </div>
                  <div className="text-[10px] text-on-surface-variant font-mono mt-1">
                    Safe limit: {GAS_DATA[gasType].maxSafeVelocityFps} FPS
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-3 rounded border border-outline-variant/20 flex flex-col justify-between">
                  <div className="text-[10px] font-bold text-on-surface-variant uppercase font-display tracking-wider">
                    Calculated Pressure Drop
                  </div>
                  <div className="text-2xl font-bold font-display text-primary mt-1 flex items-baseline gap-1">
                    {calcResult.pressureDropPsi}
                    <span className="text-xs font-mono text-outline font-normal">
                      {gasType === 'Medical Vacuum' ? 'inHg' : 'PSI'}
                    </span>
                  </div>
                  <div className="text-[10px] text-on-surface-variant font-mono mt-1">
                    Safe threshold: {gasType === 'Medical Vacuum' ? '4.0 inHg' : '3.5 PSI'}
                  </div>
                </div>
              </div>

              {/* Status Alert block */}
              <div className={`p-4 rounded-md border flex gap-3 ${
                calcResult.isCompliant 
                  ? 'bg-secondary-container/10 border-secondary/20 text-on-secondary-container' 
                  : 'bg-error-container/10 border-error/20 text-on-error-container'
              }`}>
                {calcResult.isCompliant ? (
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-error shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold font-display uppercase tracking-widest flex items-center gap-1.5">
                    <span>Validation Score</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                      calcResult.isCompliant ? 'bg-secondary/15 text-secondary' : 'bg-error/15 text-error'
                    }`}>
                      {calcResult.isCompliant ? 'Compliant' : 'Warning'}
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed font-sans">
                    {calcResult.recommendation}
                  </p>
                </div>
              </div>

              {/* Standard Quote Box */}
              <div className="text-[10px] text-on-surface-variant italic font-sans flex items-start gap-1">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-outline-variant" />
                <span>Calculations reference standard laminar drag formulas for medical copper gas conduits according to NFPA 99 Appendix A guidelines.</span>
              </div>
            </div>
          )}
        </section>

        {/* NFPA 99 Checklist & Certificate */}
        <section className="space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-[0_10px_35px_rgba(4,52,44,0.04)] space-y-6">
            <div className="space-y-2 border-b border-outline-variant/20 pb-4">
              <span className="text-xs font-bold text-secondary uppercase font-display tracking-wider">
                NFPA Standard Code Verification
              </span>
              <h3 className="text-lg font-bold font-display text-primary tracking-tight">
                Self-Audit Pre-Inspection Standards
              </h3>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                We implement a continuous check-verify pipeline. Use this checklist tool below to simulate an active hospital system ready for 3rd-party certified sign-off.
              </p>
            </div>

            {/* Checklist items */}
            <div className="space-y-3">
              {[
                { key: 'purgeVerified', label: 'Continuous Food-grade Dry Nitrogen Purge', desc: 'Flow rate of nitrogen kept steady during all high-temperature brazing to secure zero internal scaling.', icon: <Flame className="w-4 h-4 text-orange-600" /> },
                { key: 'materialsCleaned', label: 'Oil & Grease Removal Cleaning Verification', desc: 'Lines pre-washed in compliance solvents, capped in sealed dust cases to protect oxygen-clean state.', icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" /> },
                { key: 'standingTestPassed', label: '24-Hour standing pressure decay checks', desc: 'Gas lines pressurized at 150 PSI for 24 hours with temperatures logged over time to ensure absolute airtight joints.', icon: <Calculator className="w-4 h-4 text-teal-600" /> },
                { key: 'alarmInterfaced', label: 'Auxiliary Master & Area Alarm Signal Tests', desc: 'Tested direct analog signal relay systems to digital master alarm annunciator boxes showing correct indicator codes.', icon: <Layers className="w-4 h-4 text-indigo-600" /> },
                { key: 'leakSnoopVerified', label: 'Infra-red Pipe Joint Integrity Review', desc: 'Dual structural inspection utilizing micro-bubbles checks on final cold mechanical joints.', icon: <ShieldCheck className="w-4 h-4 text-emerald-800" /> },
              ].map((item) => (
                <div 
                  key={item.key}
                  onClick={() => toggleChecklist(item.key as keyof typeof checklist)}
                  className={`p-4 rounded-lg border cursor-pointer select-none transition-all flex items-start gap-3.5 ${
                    checklist[item.key as keyof typeof checklist]
                      ? 'bg-surface-container border-secondary/20 shadow-sm'
                      : 'bg-transparent border-outline-variant/20 hover:bg-surface-container-low'
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${
                    checklist[item.key as keyof typeof checklist]
                      ? 'bg-secondary border-secondary text-on-secondary'
                      : 'bg-transparent border-outline-variant/60'
                  }`}>
                    {checklist[item.key as keyof typeof checklist] && (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-primary font-display uppercase tracking-wide flex items-center gap-1.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <p className="text-[10px] text-on-surface-variant font-sans leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Certificated outcome badge with nice entry motion */}
            <AnimatePresence>
              {checklistComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-secondary-container text-on-secondary-container p-6 rounded-lg text-center space-y-3 shadow-md border border-secondary/40"
                >
                  <CheckCircle2 className="w-10 h-10 text-secondary mx-auto animate-bounce" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm uppercase tracking-wide font-display text-primary">
                      NFPA-99 Validation Cleared!
                    </h4>
                    <p className="text-[10px] text-on-secondary-container font-sans">
                      All core installer verification guidelines match Jason M.&apos;s ASSE 6010 clinical execution handbook under pre-inspection parameters. Ready for final Third-Party Testing.
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="text-[9px] font-mono block bg-white/40 border border-white/60 py-1.5 rounded text-primary">
                      Pre-Inspection Pass: MD-SYS-PASS-{new Date().getFullYear()}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>

      {/* Clinical Execution Flow Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary font-display">
            The Master Sequence
          </span>
          <h3 className="text-2xl font-bold text-primary font-display tracking-tight">
            Our 5-Stage Clinical Purge Protocol
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {CLINICAL_STAGES.map((stage) => (
            <div 
              key={stage.step}
              className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div className="space-y-3">
                <span className="text-3xl font-bold font-display text-secondary-container block leading-none">
                  {stage.step}
                </span>
                <h4 className="text-xs font-bold text-primary font-display tracking-tight uppercase">
                  {stage.title}
                </h4>
                <p className="text-[10px] text-on-surface-variant font-sans leading-relaxed">
                  {stage.desc}
                </p>
              </div>
              <div className="absolute right-4 top-4 text-[10px] text-outline font-mono uppercase bg-surface px-1.5 py-0.5 rounded">
                STAGE
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
