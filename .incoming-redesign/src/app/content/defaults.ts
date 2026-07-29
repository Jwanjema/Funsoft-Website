// ── SINGLE SOURCE OF TRUTH FOR EDITABLE SITE CONTENT ────────────────────
// These are the *default* values, used to seed Firestore on first run and
// as a fallback if a document hasn't been created/edited yet. Once the CMS
// is live, the admin panel edits the Firestore documents, not this file.
//
// Every other module (contact blocks, footer, pricing panels, stats strips,
// achievements, milestones, services tabs) must import from here instead of
// hardcoding its own copy — that duplication was the root cause of the
// contact info / pricing / stats numbers drifting out of sync across pages.

export type ContactInfo = {
  addressLines: string[];
  phones: string[];
  email: string;
  hours: string;
  facebookUrl: string;
  facebookHandle: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
};

export const DEFAULT_CONTACT: ContactInfo = {
  addressLines: ["Westlands Business Park, 4th Floor, Chiromo Lane", "Nairobi, Kenya"],
  phones: ["+254 20 7857779", "+254 20 7855355", "+254 714 433693"],
  email: "info@systempartners.biz",
  hours: "Mon – Fri, 8:00 AM – 5:00 PM",
  facebookUrl: "https://facebook.com/funsofthmis",
  facebookHandle: "funsofthmis",
  twitterUrl: "https://twitter.com/funsofthealth",
  instagramUrl: "https://instagram.com/funsofthealth",
  linkedinUrl: "https://ke.linkedin.com/company/system-partners-ltd",
};

export type PricingPlan = { plan: string; price: string; beds: string; featured?: boolean };

export const DEFAULT_PRICING: { plans: PricingPlan[]; disclaimer: string } = {
  plans: [
    { plan: "Starter", price: "$3,999", beds: "Outpatient · 0–50 beds" },
    { plan: "Standard", price: "$5,999", beds: "Outpatient · 0–50 beds", featured: true },
    { plan: "Advanced", price: "$8,999", beds: "51–100 beds" },
  ],
  disclaimer: "Subject to 16% VAT. Training and support are charged at an additional 50%.",
};

export type StatItem = { value: string; label: string };

export const DEFAULT_STATS: StatItem[] = [
  { value: "500+", label: "Happy Clients" },
  { value: "20+", label: "Years of Experience" },
  { value: "99.8%", label: "System Uptime" },
  { value: "100+", label: "Systems Implemented" },
];

export type TrustedByEntry = { name: string; since: string };

export const DEFAULT_TRUSTED_BY: TrustedByEntry[] = [
  { name: "Jaramogi Oginga Odinga Teaching & Referral Hospital", since: "Since 2010" },
  { name: "Nanyuki Teaching and Referral Hospital", since: "Since 2010" },
  { name: "Siaya County Referral Hospital", since: "Since 2018" },
  { name: "Moi Teaching & Referral Hospital", since: "Since 2007" },
  { name: "Pumwani Maternity Hospital", since: "Since 2011" },
];

export type Milestone = { src: string; year: string; title: string; body: string };

export const DEFAULT_MILESTONES: Milestone[] = [
  { src: "/assets/history/minister-handover-moi-hospital.jpg", year: "2007–2011", title: "Ministry recognition", body: "Certificate of acquisition presented for Funsoft I-HMIS at Moi Teaching & Referral Hospital." },
  { src: "/assets/history/pumwani-handover-2011.jpg", year: "2011", title: "Pumwani handover", body: "System handover ceremony with Ministry and hospital officials at Pumwani Maternity Hospital, Nairobi." },
  { src: "/assets/history/afhad-training-sudan-2007.jpg", year: "2007", title: "Regional reach", body: "SPL staff delivering Funsoft I-HMIS training at AFHAD University for Women, Khartoum, Sudan." },
];

export type Testimonial = { name: string; role: string; org: string; year: string; quote: string };

export const DEFAULT_TESTIMONIALS: Testimonial[] = [];

export type ServiceItem = { title: string; desc: string };
export type ServiceTabContent = { tagline: string; services: ServiceItem[] };

export const DEFAULT_SERVICE_CONTENT: Record<
  "services-dev" | "services-system" | "services-training" | "services-rd",
  ServiceTabContent
> = {
  "services-dev": {
    tagline: "Full-cycle software development — from analysis and design through to deployment and beyond",
    services: [
      { title: "Software Engineering / System Programming", desc: "End-to-end enterprise software development using industry-standard methodologies and rigorous quality assurance." },
      { title: "Analysis and Design", desc: "Requirements gathering, system modelling, and architectural design for complex healthcare information systems." },
      { title: "GUI Front-end Application Programming", desc: "User-friendly interface development optimised for clinical and administrative workflows." },
      { title: "Implementation and Testing", desc: "Rigorous testing covering unit, integration, system, and user acceptance testing phases." },
      { title: "Unified Modelling Language (UML)", desc: "Formal design communication using UML class, sequence, and use-case diagrams." },
      { title: "Unix / Linux Administration", desc: "Server configuration, management, and optimisation on Unix and Linux platforms." },
      { title: "JDBC, ODBC SQL", desc: "Database connectivity and query optimisation for high-performance healthcare data environments." },
      { title: "XML Scripting", desc: "Data interchange and HL7-compatible data exchange using XML standards." },
      { title: "Deployment and Configuration", desc: "Systematic go-live processes including environment setup and configuration management." },
      { title: "HTML / Web Front-end", desc: "Standards-compliant web markup for browser-based healthcare portals and dashboards." },
    ],
  },
  "services-system": {
    tagline: "End-to-end system lifecycle management — integration, security, and SLA-backed support",
    services: [
      { title: "System Development Services", desc: "Custom-built healthcare systems designed around your facility's specific workflows, scale, and regulatory requirements." },
      { title: "System Integration Services", desc: "Connecting EMR, pharmacy, lab, finance, and M-Pesa into a unified, interoperable healthcare platform." },
      { title: "System Security Services", desc: "Comprehensive security covering data encryption, access control, and compliance with health data regulations." },
      { title: "System Support Audit Service", desc: "Periodic audits to ensure performance, reliability, and compliance across all deployed sites." },
      { title: "Deployment, Testing & Commissioning", desc: "Structured go-live including load testing, parallel running, staff training, and formal commissioning." },
      { title: "System Maintenance Services", desc: "SLA-backed maintenance covering patches, version updates, monitoring, and priority issue resolution." },
    ],
  },
  "services-training": {
    tagline: "Hands-on technical training delivered by practising software engineers with real-world deployment experience",
    services: [
      { title: "Java Application Development", desc: "Core Java, Spring Boot, and enterprise Java — from fundamentals to production-ready healthcare systems." },
      { title: "C / C++ Application Development", desc: "Systems programming in C and C++ for performance-critical healthcare and embedded applications." },
      { title: "JavaScript Web Development", desc: "Modern JavaScript, Node.js, and web application development for healthcare portals and dashboards." },
      { title: "Visual Basic Application Development", desc: "Rapid desktop application development for clinical and administrative tools." },
      { title: "Bash Scripting", desc: "Shell scripting for automation, scheduled tasks, system monitoring, and DevOps workflows on Linux." },
      { title: "Biometrics and Integration", desc: "Biometric device programming, fingerprint recognition, and identity management for healthcare access control." },
      { title: "Smartcard Application Programming", desc: "Smartcard reader integration, patient identity card programming, and contactless payment systems." },
      { title: "Unix / Linux Administration", desc: "Server setup, user management, security hardening, and performance tuning." },
      { title: "UML and System Design", desc: "Structured thinking using Unified Modelling Language — class diagrams, sequence diagrams, and use-case modelling." },
      { title: "XML Scripting", desc: "Data exchange, configuration management, and HL7 data formats using XML standards." },
    ],
  },
  "services-rd": {
    tagline: "Continuous investment in healthcare AI and next-generation I-HMIS capabilities",
    services: [
      { title: "Funsoft Healthcare AI Development", desc: "Building the next generation of clinical decision support, predictive analytics, and AI-powered health data insights." },
      { title: "Ongoing Product Innovation", desc: "Structured R&D investment cycles to extend I-HMIS with new modules, improved standards, and enhanced UX based on end-user field feedback." },
      { title: "Industry Partnership Programmes", desc: "Collaborative research with hospitals, county health departments, and academic institutions on emerging healthcare ICT challenges." },
      { title: "HL7 FHIR Standards Research", desc: "Implementing interoperability standards for better national health data exchange across East Africa." },
      { title: "Performance & Scalability Research", desc: "Ensuring Funsoft I-HMIS scales from small outpatient centres to large national referral hospitals without degradation." },
      { title: "Security & Compliance Research", desc: "Proactive research into emerging security threats, health data regulations, and compliance frameworks across East Africa." },
    ],
  },
};
