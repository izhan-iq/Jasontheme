import { Project, Certification } from './types';

export const SPECIALIZED_SKILLS = [
  {
    title: 'Clinical Medical Gas Piping',
    description: 'Design, brazing, and verification of ASSE Series 6010 medical gas delivery networks including Oxygen, Medical Air, Vacuum, and Nitrous Oxide systems, complying fully with NFPA 99.',
    points: ['Oxygen & Nitrogen manifolds', 'Master alarm panels', 'Digital zone valve boxes', 'Source equipment hookups']
  },
  {
    title: 'High-Stakes Commercial Piping',
    description: 'Precision engineering of large-diameter commercial plumbing. Hydronic heating systems, double-contained chemical waste lines, and high-purity supply systems.',
    points: ['Victaulic mechanical piping', 'Schedule 80 CPVC chemical piping', 'Stainless steel orbital welding', 'Backflow preventer certification']
  },
  {
    title: 'Medical Compliance & Certification',
    description: 'Rigorous 3rd-party independent pre-testing and certified ASSE 6010 inspection to prepare hospital systems for initial third-party testing and regular Joint Commission audits.',
    points: ['Ultrasonic pipe wall inspections', 'High-purity nitrogen purge verification', '24-hour standing pressure tests (150+ PSI)', 'Purity particle tests (0.01 micro-filtration)']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'St. Jude Specialty Surgical Center',
    location: 'Metropolitan Medical District',
    category: 'clinical',
    description: 'Full installation and certified validation of integrated medical gas manifold rooms, emergency oxygen inlets, and 86 multi-room clinical zone boxes. Executed under 100% active oxygen-clean nitrogen purge parameters.',
    year: '2023',
    systemType: 'Medical Gas (ASSE 6010 / NFPA 99)',
    complianceSpec: 'NFPA 99 Chapter 5 Compliant',
    stats: [
      { label: 'Outlets Certified', value: '412' },
      { label: 'Brazed Joints', value: '1,840' },
      { label: 'Pressure Standard', value: '150 PSI' },
      { label: 'Defect Rate', value: '0.0%' }
    ]
  },
  {
    id: 'proj-2',
    name: 'Children’s Oncology Wing Expansion',
    location: 'Northside Regional Hospital',
    category: 'clinical',
    description: 'Fast-track retrofit and line isolation of the pediatric clinical suite during active hospital operations. Prevented backflow, planned system-by-system gas shutdowns, and installed continuous digital telemetry sensors.',
    year: '2024',
    systemType: 'Purity Air, Vacuum, nitrous, and O2',
    complianceSpec: 'Joint Commission Accredited Seal',
    stats: [
      { label: 'Shutdown Windows', value: '3 (Simulated)' },
      { label: 'Sensors Integrated', value: '48' },
      { label: 'Brazing Purge Gas', value: '99.999% N2' },
      { label: 'Audit Result', value: 'Grade A' }
    ]
  },
  {
    id: 'proj-3',
    name: 'Apex Bio-Tech Research Laboratories',
    location: 'Silicon Valley Research Park',
    category: 'industrial',
    description: 'High-purity laboratory grade piping using orbital welding gas loops, vacuum systems, gas cabinets with auto shut-offs, and custom manifolds for multi-gas research workbenches.',
    year: '2024',
    systemType: 'Ultra-High Purity Nitrogen & Argon',
    complianceSpec: 'SEMI F20 compliance standards',
    stats: [
      { label: 'Hose Purge Level', value: '<5 ppb O2' },
      { label: 'Orbital Welds', value: '380' },
      { label: 'Max Pressure', value: '3,000 PSI' },
      { label: 'Helium Leak Rate', value: '<1x10⁻⁹' }
    ]
  },
  {
    id: 'proj-4',
    name: 'The Pinnacle Towers - Central Plant',
    location: 'Downtown Corporate Center',
    category: 'high-rise',
    description: 'Engineered high-capacity multi-stage water boiler room, vertical water risers, sound dampening expansion loops, and automatic water treatment dosing skids.',
    year: '2022',
    systemType: 'Commercial Water District System',
    complianceSpec: 'ASME Boiler Code Sect IV & VIII',
    stats: [
      { label: 'Sump Output', value: '1,200 GPM' },
      { label: 'Total Vertical Head', value: '420 Ft' },
      { label: 'Control Automation', value: 'BACnet / Modbus' },
      { label: 'Materials Spec', value: 'Type L Copper' }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    name: 'Master Plumber State License',
    issuer: 'State Department of Professional Regulation',
    licenseNumber: 'MP-14892',
    issueDate: '2012-04-12',
    expiryDate: '2028-12-31',
    status: 'Verified',
    description: 'Highest state trade credential authorizing full engineering responsibility, high-pressure industrial systems execution, and municipal utility inspections.',
    scope: ['Commercial Water Systems', 'High-Pressure Gas Piping', 'Industrial Drainage Systems', 'Hydronics & Boilers']
  },
  {
    id: 'cert-2',
    name: 'Medical Gas Systems Installer Certification (ASSE 6010)',
    issuer: 'National Inspection Testing Certification (NITC)',
    licenseNumber: 'MG-6010-98440',
    issueDate: '2015-08-20',
    expiryDate: '2027-08-20',
    status: 'Verified',
    description: 'Rigorous federal standard certifying specialized ability to install, extend, maintain, and purge healthcare gas pipelines, outlets, source systems, and alarms under NFPA 99.',
    scope: ['NFPA 99 Chapter 5 Compliance', 'Medical Oxygen, Air, Vacuum Brazing', 'Inert Gas Purge Standards', 'Hospital Gas Source Manifolds']
  },
  {
    id: 'cert-3',
    name: 'OSHA 30-Hour Construction Safety Certification',
    issuer: 'Occupational Safety and Health Administration',
    licenseNumber: 'OSHA30-00827255',
    issueDate: '2018-02-15',
    expiryDate: 'Lifetime',
    status: 'Verified',
    description: 'Provides in-depth awareness and enforcement parameters for job site safety, bloodborne pathogens, confined space procedures in clinical rooms, and hot work safety.',
    scope: ['Host Work Permit Controls', 'Confined Space Clinical Protocols', 'Lock-Out Tag-Out (LOTO) Procedures', 'Hazardous Materials Handling']
  }
];

/**
 * Pressure Drop Constants for Copper Type L Pipe
 * D (Inside Diameter in inches)
 * Formula: Pressure Drop per 100 ft = (f * (L/D) * (v^2) / (2 * g) * (density)) / 144
 * Let's use simple standard sizing estimates for clinical copper plumbing.
 */
export const GAS_DATA = {
  Oxygen: { densityRatio: 1.10, defaultPressurePsi: 55, color: '#378add', maxSafeVelocityFps: 50 },
  'Medical Air': { densityRatio: 1.00, defaultPressurePsi: 55, color: '#1d9e75', maxSafeVelocityFps: 50 },
  'Nitrous Oxide': { densityRatio: 1.53, defaultPressurePsi: 55, color: '#04342c', maxSafeVelocityFps: 50 },
  'Medical Vacuum': { densityRatio: 1.00, defaultPressurePsi: -12, color: '#717976', maxSafeVelocityFps: 100 }, // inHg equivalent
  Nitrogen: { densityRatio: 0.97, defaultPressurePsi: 180, color: '#002018', maxSafeVelocityFps: 70 }
};

export const CLINICAL_STAGES = [
  {
    step: '01',
    title: 'Facility Isometric Mapping',
    desc: 'Analyzing schematic designs and flow specifications. Mapping all zones, emergency box panels, source rooms, and alarm panels based strictly on targeted medical staff density.'
  },
  {
    step: '02',
    title: 'NFPA 99 Pre-Brazing Cleanliness',
    desc: 'Each pipe joint is meticulously cleaned, degreased, and protected, then fitted using custom oxygen-clean fittings shipped in sealed chemical barriers.'
  },
  {
    step: '03',
    title: 'Active Dry-Nitrogen Brazing Purge',
    desc: 'Uncompromising flow of 99.999% food-grade nitrogen gas through the copper pipe lines during the high-temperature brazing process to eliminate any possible copper crystallization.'
  },
  {
    step: '04',
    title: '24-Hour Active Pressure Test',
    desc: 'Testing lines at a minimum of 1.5 times working pressure using high purity inert nitrogen. Standing checks verify system zero-decay leaks across 150 PSI.'
  },
  {
    step: '05',
    title: 'Particle & Moisture Trace Certification',
    desc: 'Testing effluent gas streams for sub-micron particulate, residual carbon, hydrocarbons, vacuum draw speed, and dew point parameters to achieve medical-vent quality.'
  }
];
