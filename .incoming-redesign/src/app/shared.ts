import { Code2, Server, GraduationCap, Microscope, type ComponentType } from "lucide-react";

export type LeadPayload = Record<string, string | boolean>;

export async function submitLead(kind: "demo_request" | "contact_message", payload: LeadPayload) {
  const [{ addDoc, collection, serverTimestamp }, { db }] = await Promise.all([
    import("firebase/firestore/lite"),
    import("../../../firebase/firebase_config.js"),
  ]);
  await addDoc(collection(db, "website_leads"), {
    ...payload,
    kind,
    source: "system-partners-website",
    createdAt: serverTimestamp(),
  });
}

// ── TYPES ──────────────────────────────────────────────────────────────
export type PageId =
  | "home" | "background" | "who-we-are" | "achievements"
  | "services-dev" | "services-system" | "services-training" | "services-rd"
  | "product-ihmis" | "product-erp" | "product-ai"
  | "resources-demo" | "resources-downloads" | "contact";

export type ServiceTabId = "services-dev" | "services-system" | "services-training" | "services-rd";
export type Nav = (page: PageId) => void;

export const PAGE_TITLES: Record<PageId, string> = {
  home: "System Partners Limited | Funsoft I-HMIS",
  background: "Our Background | System Partners Limited",
  "who-we-are": "Who We Are | System Partners Limited",
  achievements: "Our Achievements | System Partners Limited",
  "services-dev": "Software Development Services | System Partners Limited",
  "services-system": "System Integration Services | System Partners Limited",
  "services-training": "Training & Capacity Building | System Partners Limited",
  "services-rd": "Healthcare Research & Development | System Partners Limited",
  "product-ihmis": "Funsoft I-HMIS | System Partners Limited",
  "product-erp": "Funsoft ERP | System Partners Limited",
  "product-ai": "Funsoft Healthcare AI | System Partners Limited",
  "resources-demo": "Request a Product Demo | System Partners Limited",
  "resources-downloads": "Product Resources | System Partners Limited",
  contact: "Contact System Partners Limited",
};

export const PAGE_IDS = new Set<PageId>(Object.keys(PAGE_TITLES) as PageId[]);

export function pageFromLocation(): PageId {
  const candidate = window.location.hash.replace(/^#\/?/, "") as PageId;
  return PAGE_IDS.has(candidate) ? candidate : "home";
}

export interface NavLeaf { label: string; page: PageId; icon?: ComponentType<{ className?: string }> }
export interface NavEntry {
  label: string; page?: PageId;
  icon?: ComponentType<{ className?: string }>;
  children?: NavLeaf[];
}

// ── SERVICE TABS ────────────────────────────────────────────────────────
export const SERVICE_TABS: {
  id: ServiceTabId; label: string;
  icon: ComponentType<{ className?: string }>;
  imageId: string; crop: string; tagline: string;
  services: { title: string; desc: string }[];
}[] = [
  {
    id: "services-dev", label: "Development", icon: Code2,
    imageId: "1522071820081-009f0129c71c", crop: "faces",
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
  {
    id: "services-system", label: "System Based", icon: Server,
    imageId: "1629904853716-f0bc54eea481", crop: "entropy",
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
  {
    id: "services-training", label: "Training & Capacity", icon: GraduationCap,
    imageId: "1639945314262-0592de4f92c8", crop: "faces",
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
  {
    id: "services-rd", label: "Research & Development", icon: Microscope,
    imageId: "1666214277657-e60f05c40b04", crop: "faces",
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
];
