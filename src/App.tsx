import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  ShieldAlert, 
  Award, 
  Menu, 
  X, 
  Activity, 
  Heart, 
  Volume2, 
  Info, 
  PhoneCall,
  CheckCircle,
  FileCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

// Subcomponents
import ExpertiseView from './components/ExpertiseView';
import MedicalGasCompliance from './components/MedicalGasCompliance';
import VerifyCredentials from './components/VerifyCredentials';
import BookConsultationModal from './components/BookConsultationModal';

type ActivePage = 'home' | 'expertise' | 'compliance' | 'credentials' | 'consultation';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState<{ title: string; content: string } | null>(null);

  const navigateTo = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showPolicy = (title: string, content: string) => {
    setPolicyModal({ title, content });
  };

  return (
    <div className="bg-background text-on-background font-sans antialiased min-h-screen flex flex-col selection:bg-secondary-container selection:text-on-secondary-container">
      
      {/* Top Header Blur Bar */}
      <header className="bg-surface/90 backdrop-blur-md fixed top-0 w-full z-50 shadow-sm shadow-[0_10px_30px_rgba(4,52,44,0.03)] border-b border-outline-variant/20">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-16 py-4">
          
          {/* Logo Name & Icon */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-2.5 cursor-pointer group"
            id="logo-element"
          >
            <span className="material-symbols-outlined text-primary group-hover:scale-105 transition-transform" style={{ fontSize: '28px' }}>
              architecture
            </span>
            <span className="font-display text-lg md:text-xl font-bold text-primary tracking-tight">
              Jason M.
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => navigateTo('expertise')}
              className={`font-display text-xs font-bold uppercase tracking-wider transition-colors py-1 ${
                activePage === 'expertise' 
                  ? 'text-secondary border-b-2 border-secondary' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Expertise
            </button>
            <button 
              onClick={() => navigateTo('compliance')}
              className={`font-display text-xs font-bold uppercase tracking-wider transition-colors py-1 ${
                activePage === 'compliance' 
                  ? 'text-secondary border-b-2 border-secondary' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Medical Gas Standards
            </button>
            <button 
              onClick={() => navigateTo('credentials')}
              className={`font-display text-xs font-bold uppercase tracking-wider transition-colors py-1 ${
                activePage === 'credentials' 
                  ? 'text-secondary border-b-2 border-secondary' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Credentials Verification
            </button>
          </nav>

          {/* Consultation Core CTA */}
          <button 
            onClick={() => navigateTo('consultation')}
            className="hidden md:block bg-primary text-on-primary font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded hover:bg-secondary focus:ring-2 focus:ring-secondary/20 transition-all shadow-md active:scale-95"
          >
            Book Consultation
          </button>

          {/* Mobile responsive toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-primary p-1.5 rounded hover:bg-surface-container"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface-container-low fixed top-[64px] w-full z-40 border-b border-outline-variant/30 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              <button 
                onClick={() => navigateTo('expertise')}
                className={`font-display text-xs font-bold uppercase text-left py-2 ${
                  activePage === 'expertise' ? 'text-secondary font-extrabold' : 'text-on-surface-variant'
                }`}
              >
                Our Expertise Catalogue
              </button>
              <button 
                onClick={() => navigateTo('compliance')}
                className={`font-display text-xs font-bold uppercase text-left py-2 ${
                  activePage === 'compliance' ? 'text-secondary font-extrabold' : 'text-on-surface-variant'
                }`}
              >
                Clinical Medical Gas Rules
              </button>
              <button 
                onClick={() => navigateTo('credentials')}
                className={`font-display text-xs font-bold uppercase text-left py-2 ${
                  activePage === 'credentials' ? 'text-secondary font-extrabold' : 'text-on-surface-variant'
                }`}
              >
                License Verifications
              </button>
              <button 
                onClick={() => navigateTo('consultation')}
                className="w-full bg-primary text-on-primary font-display text-xs font-bold uppercase tracking-wider py-4 rounded text-center"
              >
                Get Sizing Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Sections */}
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <AnimatePresence mode="wait">
            
            {/* Landing Hero Section */}
            {activePage === 'home' && (
              <motion.section 
                key="home-section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col lg:flex-row items-center gap-12 min-h-[75vh]"
              >
                {/* Content Panel */}
                <div className="flex-1 space-y-6 text-left">
                  
                  {/* Licensed Tag Badge */}
                  <div className="inline-flex items-center gap-2 bg-tertiary-fixed-dim/20 px-4 py-2 rounded-full border border-tertiary-fixed shadow-[0_2px_8px_rgba(4,52,44,0.02)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse"></span>
                    <span className="font-display text-xs font-bold text-primary tracking-wide">
                      Licensed & Certified Master Plumber
                    </span>
                  </div>

                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-[1.1]">
                    Precision Engineering.<br />Master Execution.
                  </h1>

                  <p className="text-on-surface-variant font-sans text-base md:text-lg leading-relaxed max-w-2xl">
                    Elevating standard plumbing to a clinical science. Specializing in high-stakes medical gas systems and complex commercial infrastructure where failure is not an option.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button 
                      onClick={() => navigateTo('expertise')}
                      className="bg-primary hover:bg-secondary text-on-primary font-display text-xs font-bold uppercase tracking-wider px-8 py-4.5 rounded shadow-[0_10px_25px_rgba(4,52,44,0.1)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center"
                    >
                      View Technical Expertise
                    </button>
                    <button 
                      onClick={() => navigateTo('credentials')}
                      className="bg-transparent text-primary hover:bg-surface-container-high border border-outline-variant font-display text-xs font-bold uppercase tracking-wider px-8 py-4.5 rounded transition-all duration-200 text-center"
                    >
                      Verify Credentials
                    </button>
                  </div>
                </div>

                {/* Animated Graphic Panel */}
                <div className="flex-1 relative w-full h-[380px] md:h-[480px] flex items-center justify-center">
                  
                  {/* Blur Aura backdrop */}
                  <div className="absolute inset-x-0 mx-auto w-72 h-72 bg-primary-container rounded-full blur-[90px] opacity-[0.14] scale-90"></div>

                  {/* Mint Pipe Vector Illustration */}
                  <div className="absolute top-16 left-0 w-full max-w-[360px] z-0 opacity-80 select-none">
                    <div className="relative w-full h-24">
                      <img 
                        src="https://lh3.googleusercontent.com/aida/ADBb0ugfBvJ6A-5oxZHmKEpREuXRYvLJ0ZN6h_jwvMjwze0d01vGhzdQZJZQObtrBOXeX26lVHSGkgjVkyGWKiF5QuS62avJ7nbuxEe5xLGDloaAOOhbFmKXlAjSifPjW8X7z_-BLYjUdDaFVVT_YSpbIGLIwycRM_EvtzGvozH38pJB5zge1WyI_jCxu8BqhZWoCrq9N0bWDsSwOXTrifomMJkrHRhKoKdRuBOWzmToFctZlIplVYPHA3JzkFc" 
                        alt="Mint green horizontal pipe illustration"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                      {/* Dripping Water drops */}
                      <div className="absolute inset-0">
                        <div className="water-drop-animation"></div>
                        <div className="water-drop-animation"></div>
                        <div className="water-drop-animation"></div>
                      </div>
                    </div>
                  </div>

                  {/* Character Illustration */}
                  <div className="relative z-10 w-full max-w-[370px] animate-float glow-effect rounded-full border border-secondary-container/20 overflow-hidden shadow-[0_20px_50px_rgba(4,52,44,0.12)]">
                    <img 
                      src="https://lh3.googleusercontent.com/aida/ADBb0ujQW6j3rVCW8hicr3od_FFUuXlSrztwcLwW9MZmsqC_-QNdTHNwLXmdZyVDnSIcu4DXAQQMX6irsA7rJKsIMI_YiNfqqExyP6FWC2B2HS5p_LP--_xdLo3XJO0KPdOW6ztiCmBJL3YU79JEjHVb5n9m_fDAQZFG6bZialbGbYTB_aeXvwtYdRCRsAXUvrf-zjhH7NY1XvhLPItJ9gXrCnC3qK8ot-UKx3sMbQtaAfLBVOnf1tlWutdsZNo" 
                      alt="Jason M. Master Artisan Tradesman"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto drop-shadow-xl"
                    />
                  </div>
                </div>
              </motion.section>
            )}

            {/* Seamless Subpages routing using AnimatePresence transitions */}
            {activePage === 'expertise' && (
              <motion.div
                key="expertise-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <ExpertiseView onNavigateToConsultation={() => navigateTo('consultation')} />
              </motion.div>
            )}

            {activePage === 'compliance' && (
              <motion.div
                key="compliance-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <MedicalGasCompliance />
              </motion.div>
            )}

            {activePage === 'credentials' && (
              <motion.div
                key="credentials-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <VerifyCredentials />
              </motion.div>
            )}

            {activePage === 'consultation' && (
              <motion.div
                key="consultation-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <BookConsultationModal />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* Marquee Authority Bar at base */}
      <div className="w-full bg-surface-container-low border-y border-outline-variant/30 overflow-hidden py-5.5 flex items-center relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface-container-low to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface-container-low to-transparent z-10 pointer-events-none" />
        
        <div className="flex whitespace-nowrap animate-marquee w-max">
          <div className="flex items-center gap-16 px-8 shrink-0">
            <div className="flex items-center gap-2 text-primary font-sans">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>verified</span>
              <span className="font-display text-xs font-bold tracking-wide uppercase">Medical Gas Certified (ASSE 6010)</span>
            </div>
            <div className="flex items-center gap-2 text-primary font-sans">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>workspace_premium</span>
              <span className="font-display text-xs font-bold tracking-wide uppercase">Master Plumber License #14892</span>
            </div>
            <div className="flex items-center gap-2 text-primary font-sans">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>apartment</span>
              <span className="font-display text-xs font-bold tracking-wide uppercase">Commercial Specialist</span>
            </div>
            <div className="flex items-center gap-2 text-primary font-sans">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>health_and_safety</span>
              <span className="font-display text-xs font-bold tracking-wide uppercase">OSHA 30 Certified</span>
            </div>
          </div>
          {/* Duplicated track for completely seamless infinite sliding */}
          <div className="flex items-center gap-16 px-8 shrink-0">
            <div className="flex items-center gap-2 text-primary font-sans">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>verified</span>
              <span className="font-display text-xs font-bold tracking-wide uppercase">Medical Gas Certified (ASSE 6010)</span>
            </div>
            <div className="flex items-center gap-2 text-primary font-sans">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>workspace_premium</span>
              <span className="font-display text-xs font-bold tracking-wide uppercase">Master Plumber License #14892</span>
            </div>
            <div className="flex items-center gap-2 text-primary font-sans">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>apartment</span>
              <span className="font-display text-xs font-bold tracking-wide uppercase">Commercial Specialist</span>
            </div>
            <div className="flex items-center gap-2 text-primary font-sans">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>health_and_safety</span>
              <span className="font-display text-xs font-bold tracking-wide uppercase">OSHA 30 Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer block */}
      <footer className="bg-primary text-on-primary w-full py-12 border-t border-on-primary/10 font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <span 
              onClick={() => navigateTo('home')} 
              className="font-display text-2xl font-black text-secondary-fixed cursor-pointer tracking-tight"
            >
              Jason M.
            </span>
            <span className="text-on-primary/60 text-xs mt-1">
              © {new Date().getFullYear()} Jason M. Master Artisan Trade. All Rights Reserved.
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-medium">
            <button 
              onClick={() => showPolicy('Privacy Policy', 'Your diagnostic inputs, mock parameters, uploaded schematics, and consultation entries are stored entirely in client-side secure React states. We never sell, transmit, or transmit clinical assets to external trackers.')}
              className="text-on-primary/75 hover:text-secondary-fixed transition-colors underline decoration-secondary/30 decoration-2 underline-offset-4"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => showPolicy('Terms of Service', 'By accessing this master artisan portfolio and utility sandbox, you acknowledge that calculations generated represent standard estimates and do not substitute for custom onsite PE sign-off records.')}
              className="text-on-primary/75 hover:text-secondary-fixed transition-colors underline decoration-secondary/30 decoration-2 underline-offset-4"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => showPolicy('Consultation Agreement', 'This document establishes that any request booked through this diagnostic pipeline is classified as an auxiliary design review consultation and follows high-stakes NFPA 99 Chapter 5 safety specifications.')}
              className="text-on-primary/75 hover:text-secondary-fixed transition-colors underline decoration-secondary/30 decoration-2 underline-offset-4"
            >
              Consultation Agreement
            </button>
          </nav>
        </div>
      </footer>

      {/* Policy Modal Overlay */}
      <AnimatePresence>
        {policyModal && (
          <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl max-w-md p-6 space-y-4 shadow-xl"
            >
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
                <h4 className="font-display font-black text-primary text-base uppercase tracking-wide">
                  {policyModal.title}
                </h4>
                <button 
                  onClick={() => setPolicyModal(null)}
                  className="text-primary hover:bg-surface-container p-1 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                {policyModal.content}
              </p>
              <div className="pt-2 text-right">
                <button 
                  onClick={() => setPolicyModal(null)}
                  className="bg-primary text-on-primary text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded hover:bg-secondary transition-colors"
                >
                  Acknowledge & Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
