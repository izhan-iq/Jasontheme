export interface Project {
  id: string;
  name: string;
  location: string;
  category: 'clinical' | 'industrial' | 'high-rise';
  description: string;
  year: string;
  systemType: string;
  complianceSpec: string;
  image?: string;
  stats?: { label: string; value: string }[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  licenseNumber: string;
  issueDate: string;
  expiryDate: string;
  status: 'Active' | 'Under Review' | 'Verified';
  description: string;
  scope: string[];
}

export interface ConsultationForm {
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  projectType: 'Hospital / Clinical' | 'Dental / Outpatient' | 'Industrial Lab' | 'Commercial HVAC' | 'Other';
  facilitySizeSqFt: number;
  priority: 'Immediate (Emergency)' | 'Standard Design Flow' | 'Bid Phase' | 'System Inspection / Review';
  gasSelection: {
    oxygen: boolean;
    medicalAir: boolean;
    nitrousOxide: boolean;
    vacuum: boolean;
    nitrogen: boolean;
  };
  additionalNotes: string;
}

export interface PipeCalculationInput {
  gasType: 'Oxygen' | 'Medical Air' | 'Nitrous Oxide' | 'Medical Vacuum' | 'Nitrogen';
  pipeLengthFt: number;
  flowRateCfm: number;
  pipeDiameterIn: number;
}

export interface PipeCalculationResult {
  velocityFps: number;
  pressureDropPsi: number;
  isCompliant: boolean;
  recommendation: string;
}
