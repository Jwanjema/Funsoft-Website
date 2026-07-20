import { useState, useEffect, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Activity, Shield, Database, Users, ChevronRight, ChevronLeft,
  MapPin, Phone, Mail, Clock, CheckCircle2, Layers, Brain, BarChart3,
  Download, Target, Eye, Award, Code2, Server, GraduationCap, Microscope,
  ArrowRight, Star, Loader2, Quote, ExternalLink,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem, CountUp } from "./components/motion";
import { Img } from "./components/Img";
import { TechLogoRow } from "./components/TechLogos";
import { VideoLightbox } from "./components/VideoLightbox";
import { submitLead, SERVICE_TABS, type Nav, type ServiceTabId } from "./shared";

function FacebookMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2V8.6h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.77l-.44 2.91h-2.33V22C18.34 21.24 22 17.08 22 12.06Z" />
    </svg>
  );
}

// ── SHARED SIDEBAR PIECES ───────────────────────────────────────────────
function CtaCard({ nav }: { nav: Nav }) {
  return (
    <Reveal className="h-full rounded-[20px] bg-[#0B2B58] p-6 text-white flex flex-col shadow-[0_18px_45px_rgba(13,61,140,0.16)]">
      <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-blue-300 mb-3">Your next step</div>
      <h3 className="font-extrabold text-[20px] leading-[1.15] text-white mb-2 text-balance">See how Funsoft fits your facility</h3>
      <p className="text-[14px] text-blue-100/80 mb-6 leading-relaxed max-w-[48ch]" style={{ fontFamily: "'Inter',sans-serif" }}>
        Book a free meeting with our healthcare ICT specialists — no obligation.
      </p>
      <div className="mt-auto flex flex-wrap gap-2.5">
        <button onClick={() => nav("resources-demo")}
          className="bg-white text-primary font-bold text-[14px] px-4 py-2.5 rounded-lg hover:bg-blue-50 active:scale-[0.98] transition-all">
          Request a demo
        </button>
        <button onClick={() => nav("contact")}
          className="border border-white/25 text-white font-semibold text-[14px] px-4 py-2.5 rounded-lg hover:bg-white/10 active:scale-[0.98] transition-all">
          Contact our team
        </button>
      </div>
    </Reveal>
  );
}

function CompactContact() {
  return (
    <Reveal delay={0.1} className="h-full rounded-[20px] bg-card border border-border/80 p-6 shadow-[0_18px_45px_rgba(21,88,192,0.07)]">
      <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-primary mb-3" style={{ fontFamily: "'Inter',sans-serif" }}>Talk to our team</div>
      <h3 className="font-extrabold text-[20px] leading-[1.15] text-foreground mb-5">Contact</h3>
      <div className="space-y-3" style={{ fontFamily: "'Inter',sans-serif" }}>
        <a href="tel:+254207857779" className="flex items-center gap-3 text-[15px] font-medium text-foreground hover:text-primary transition-colors">
          <Phone className="w-4 h-4 text-primary/60 flex-none" />+254 20 7857779
        </a>
        <a href="tel:+254714433693" className="flex items-center gap-3 text-[15px] font-medium text-foreground hover:text-primary transition-colors">
          <Phone className="w-4 h-4 text-primary/60 flex-none" />+254 714 433693
        </a>
        <a href="mailto:info@systempartners.biz" className="flex items-center gap-3 text-[15px] font-medium text-foreground hover:text-primary transition-colors break-all">
          <Mail className="w-4 h-4 text-primary/60 flex-none" />info@systempartners.biz
        </a>
        <div className="flex items-center gap-3 text-[14px] text-muted-foreground pt-1">
          <Clock className="w-4 h-4 text-primary/60 flex-none" />Mon – Fri, 8:00 AM – 5:00 PM
        </div>
      </div>
    </Reveal>
  );
}

// ── SUBPAGE SHELL ───────────────────────────────────────────────────────
// heroImageId: Unsplash photo ID. Left col scrolls; right col is overflow-hidden (no double scroll).
function PricingSupportPanel({ nav }: { nav: Nav }) {
  const plans = [
    { plan: "Starter", price: "$3,999", beds: "Outpatient · 0–50 beds" },
    { plan: "Standard", price: "$5,999", beds: "Outpatient · 0–50 beds", featured: true },
    { plan: "Advanced", price: "$8,999", beds: "51–100 beds" },
  ];

  return (
    <Reveal className="overflow-hidden rounded-[24px] bg-[#0B2B58] text-white shadow-[0_24px_70px_rgba(7,29,69,0.2)]">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="p-6 sm:p-8 lg:p-9">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-300 mb-3">Funsoft I-HMIS pricing</p>
          <h3 className="text-[24px] sm:text-[28px] font-extrabold leading-tight tracking-tight text-white">Choose a starting plan</h3>
          <p className="text-[14px] text-blue-100/70 mt-2 mb-6 max-w-[58ch]" style={{ fontFamily: "'Inter',sans-serif" }}>
            Clear entry pricing for outpatient and hospital deployments.
          </p>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-3" stagger={0.08}>
            {plans.map(({ plan, price, beds, featured }) => (
              <StaggerItem key={plan} className={`min-h-[148px] rounded-[16px] p-4 flex flex-col transition-transform duration-300 hover:-translate-y-1 ${featured ? "bg-white text-foreground ring-2 ring-blue-300" : "bg-white/[0.08] border border-white/10"}`}>
                <div className={`text-[11px] font-bold uppercase tracking-[0.14em] ${featured ? "text-primary" : "text-blue-200"}`}>{plan}</div>
                <div className={`text-[26px] font-extrabold tracking-tight tabular-nums mt-3 ${featured ? "text-foreground" : "text-white"}`}>{price}</div>
                <div className={`text-[13px] leading-snug mt-auto pt-4 ${featured ? "text-muted-foreground" : "text-blue-100/70"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{beds}</div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <p className="text-[11px] text-blue-100/60 mt-4 leading-relaxed" style={{ fontFamily: "'Inter',sans-serif" }}>
            Subject to 16% VAT. Training and support are charged at an additional 50%.
          </p>
        </div>

        <div className="border-t lg:border-t-0 lg:border-l border-white/10 bg-[#071D45] p-6 sm:p-8 flex flex-col">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-300 mb-3">Talk to a specialist</p>
          <h3 className="text-[21px] font-extrabold leading-tight text-white mb-2">Request a tailored demo</h3>
          <p className="text-[14px] text-blue-100/70 leading-relaxed mb-6" style={{ fontFamily: "'Inter',sans-serif" }}>
            We will walk your team through the modules that match your facility.
          </p>
          <button onClick={() => nav("resources-demo")}
            className="w-full bg-white text-primary font-bold text-[14px] py-3 rounded-xl hover:bg-blue-50 active:scale-[0.98] transition-all mb-6">
            Request a demo
          </button>
          <div className="mt-auto pt-5 border-t border-white/10 space-y-3" style={{ fontFamily: "'Inter',sans-serif" }}>
            <a href="tel:+254207857779" className="flex items-center gap-3 text-[14px] text-white hover:text-blue-200 transition-colors"><Phone className="w-4 h-4 text-blue-300" />+254 20 7857779</a>
            <a href="tel:+254714433693" className="flex items-center gap-3 text-[14px] text-white hover:text-blue-200 transition-colors"><Phone className="w-4 h-4 text-blue-300" />+254 714 433693</a>
            <a href="mailto:info@systempartners.biz" className="flex items-center gap-3 text-[14px] text-white hover:text-blue-200 transition-colors break-all"><Mail className="w-4 h-4 text-blue-300" />info@systempartners.biz</a>
            <div className="flex items-center gap-3 text-[13px] text-blue-100/60"><Clock className="w-4 h-4 text-blue-300" />Mon – Fri, 8:00 AM – 5:00 PM</div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function SubPage({
  breadcrumb, title, children, sidebar, wideSidebar = false,
  heroImageId, heroImageCrop = "entropy", heroImageAlt = "",
}: {
  breadcrumb: string; title: string;
  children: ReactNode; sidebar: ReactNode; wideSidebar?: boolean;
  heroImageId?: string; heroImageCrop?: string; heroImageAlt?: string;
}) {
  return (
    <div className="min-h-full flex flex-col">
      {/* Hero banner — full width, spans both columns */}
      {heroImageId ? (
        <div className="h-[168px] sm:h-[210px] lg:h-[260px] relative overflow-hidden">
          <Img id={heroImageId} w={1400} h={280} alt={heroImageAlt} crop={heroImageCrop}
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/40 to-black/5" />
          <div className="absolute inset-0 flex flex-col justify-end px-5 sm:px-8 lg:px-14 pb-6 lg:pb-9">
            <p className="text-white/55 text-[13px] font-semibold uppercase tracking-[0.2em] mb-2"
              style={{ fontFamily: "'Inter',sans-serif" }}>{breadcrumb}</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight text-balance">{title}</h1>
          </div>
        </div>
      ) : (
        <div className="border-b border-border bg-card px-5 sm:px-8 lg:px-14 py-7 lg:py-10">
          <p className="text-[13px] font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-2"
            style={{ fontFamily: "'Inter',sans-serif" }}>{breadcrumb}</p>
          <h1 className="text-4xl font-extrabold text-foreground">{title}</h1>
        </div>
      )}

      {/* Body: article + sticky sidebar side-by-side on large screens */}
      <div className="site-content w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 py-9 lg:py-14">
        <div className={`grid grid-cols-1 gap-10 xl:gap-14 ${wideSidebar ? "" : "lg:grid-cols-[minmax(0,1fr)_360px]"}`}>
          <article className={wideSidebar ? "max-w-[880px]" : "max-w-[720px]"}>{children}</article>
          {!wideSidebar && (
            <aside className="lg:sticky lg:top-6 lg:self-start flex flex-col gap-5 min-w-0">
              {sidebar}
            </aside>
          )}
        </div>
        {wideSidebar && (
          <div className="mt-10 pt-9 border-t border-border">
            {sidebar}
          </div>
        )}
      </div>
    </div>
  );
}

// ── PAGE: BACKGROUND ────────────────────────────────────────────────────
export function PageBackground({ nav }: { nav: Nav }) {
  return (
    <SubPage breadcrumb="About Us / Our Background" title="Our Background"
      heroImageId="1611348524140-53c9a25263d6" heroImageCrop="entropy"
      heroImageAlt="Nairobi city skyline — headquarters of System Partners Limited"
      sidebar={<><CtaCard nav={nav} /><CompactContact /></>}>
      <div className="space-y-5">
        <p className="text-[16px] leading-relaxed text-muted-foreground" style={{ fontFamily: "'Inter',sans-serif" }}>
          System Partners Limited (SPL) was incorporated in <strong className="text-foreground">2001</strong> as a Kenyan private limited liability company,
          founded with a clear purpose: to address critical gaps in primary healthcare delivery worldwide by making health data
          available in an affordable, accurate, and timely manner.
        </p>
        <p className="text-[16px] leading-relaxed text-muted-foreground" style={{ fontFamily: "'Inter',sans-serif" }}>
          From day one, SPL invested heavily in R&amp;D, partnered closely with end users during product development, and built
          rigorous quality assurance into every release cycle. This foundation produced the Funsoft® I-HMIS — today one of Kenya&apos;s
          most widely deployed and Ministry of Health-approved healthcare information systems.
        </p>
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {[
            { icon: Target, title: "Our Mission", body: "Delivering affordable, high-quality, state-of-the-art IT solutions to clients across healthcare and enterprise sectors in Africa." },
            { icon: Eye, title: "Our Vision", body: "To become Africa's leading provider of accounting-based I-HMIS ICT solutions powered by modern, interoperable technologies." },
          ].map(({ icon: Icon, title, body }) => (
            <StaggerItem key={title} className="bg-card rounded-xl border border-border p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-none">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-bold text-[16px] text-foreground">{title}</h3>
              </div>
              <p className="text-[14px] text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter',sans-serif" }}>{body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal className="bg-card rounded-xl border border-border p-5 hover:shadow-sm transition-shadow">
          <h3 className="font-bold text-[16px] text-foreground mb-4">Our Core Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6">
            {["Innovation", "Customer Respect", "Honesty", "Transparency", "Professionalism", "Teamwork", "Integrity"].map(v => (
              <div key={v} className="flex items-center gap-2 text-[14px] text-foreground" style={{ fontFamily: "'Inter',sans-serif" }}>
                <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-none" />{v}
              </div>
            ))}
          </div>
        </Reveal>
        <div>
          <h3 className="font-bold text-[16px] text-foreground mb-4">Milestones Along the Way</h3>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4" stagger={0.08}>
            {[
              { src: "/assets/history/minister-handover-moi-hospital.jpg", year: "2007–2011", title: "Ministry recognition", body: "Certificate of acquisition presented for Funsoft I-HMIS at Moi Teaching & Referral Hospital." },
              { src: "/assets/history/pumwani-handover-2011.jpg", year: "2011", title: "Pumwani handover", body: "System handover ceremony with Ministry and hospital officials at Pumwani Maternity Hospital, Nairobi." },
              { src: "/assets/history/afhad-training-sudan-2007.jpg", year: "2007", title: "Regional reach", body: "SPL staff delivering Funsoft I-HMIS training at AFHAD University for Women, Khartoum, Sudan." },
            ].map(({ src, year, title, body }) => (
              <StaggerItem key={src} className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-sm transition-all">
                <img src={src} alt={title} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                <div className="p-4">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-[0.14em] mb-1">{year}</p>
                  <h4 className="font-bold text-[14px] text-foreground mb-1">{title}</h4>
                  <p className="text-[12px] text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter',sans-serif" }}>{body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </SubPage>
  );
}

// ── PAGE: WHO WE ARE ────────────────────────────────────────────────────
export function PageWhoWeAre({ nav }: { nav: Nav }) {
  return (
    <SubPage breadcrumb="About Us / Who We Are" title="Who We Are"
      heroImageId="1720700126947-a6ba1ebba73d" heroImageCrop="faces"
      heroImageAlt="System Partners Limited team"
      sidebar={<><CtaCard nav={nav} /><CompactContact /></>}>
      <div className="space-y-5">
        <p className="text-[16px] leading-relaxed text-muted-foreground" style={{ fontFamily: "'Inter',sans-serif" }}>
          System Partners Limited is a <strong className="text-foreground">high-quality ICT solutions provider</strong> specialising in enterprise
          healthcare applications. With over two decades of experience, we have built a reputation for delivering robust, scalable,
          and affordable systems that transform how healthcare facilities operate across East Africa.
        </p>
        <p className="text-[16px] leading-relaxed text-muted-foreground" style={{ fontFamily: "'Inter',sans-serif" }}>
          We partner closely with end users throughout every development cycle, invest continuously in R&amp;D, and back every deployment
          with structured training and SLA-supported maintenance. Our team consists of qualified software engineers, system analysts,
          and healthcare IT specialists who bring technical depth and real domain expertise.
        </p>
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: Code2, title: "Software Engineering", body: "Full-cycle development from analysis and design through deployment, testing, and long-term maintenance." },
            { icon: Server, title: "System Integration", body: "Connecting EMR, pharmacy, laboratory, finance, and supply chain modules into one unified platform." },
            { icon: GraduationCap, title: "Training & Capacity", body: "Hands-on training in Java, C/C++, biometrics, smartcard programming, and more." },
            { icon: Microscope, title: "Research & Development", body: "Ongoing investment in healthcare AI and next-generation I-HMIS capabilities for the African market." },
          ].map(({ icon: Icon, title, body }) => (
            <StaggerItem key={title} className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 hover:shadow-sm transition-all">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-bold text-[15px] text-foreground mb-1.5">{title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter',sans-serif" }}>{body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal className="bg-primary/5 border border-primary/20 rounded-xl p-5">
          <p className="text-[15px] text-foreground leading-relaxed" style={{ fontFamily: "'Inter',sans-serif" }}>
            Our flagship product, <strong>Funsoft® I-HMIS</strong>, holds official <strong>Ministry of Health Approved</strong> EMR / HIS status in Kenya —
            a testament to our commitment to quality, compliance, and patient data integrity.
          </p>
        </Reveal>
      </div>
    </SubPage>
  );
}

// ── TESTIMONIAL CAROUSEL ─────────────────────────────────────────────────
type Testimonial = { name: string; role: string; org: string; year: string; quote: string };

function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const reduce = useReducedMotion();

  const go = (next: number) => {
    setDirection(next > index || (index === testimonials.length - 1 && next === 0) ? 1 : -1);
    setIndex((next + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => go(index + 1), 7000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, reduce]);

  const t = testimonials[index];

  return (
    <Reveal className="relative bg-card rounded-xl border border-border p-6 sm:p-7 overflow-hidden">
      <Quote className="absolute top-4 right-5 w-9 h-9 text-primary/10" aria-hidden="true" />
      <div className="flex gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
      </div>
      <div className="relative min-h-[132px] sm:min-h-[104px]">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={index}
            custom={direction}
            initial={reduce ? undefined : { opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[14px] text-foreground leading-relaxed mb-4 italic" style={{ fontFamily: "'Inter',sans-serif" }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-3.5 border-t border-border">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-none text-white font-extrabold text-[14px]">
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-[14px] text-foreground">{t.name}</div>
                <div className="text-[11px] text-muted-foreground leading-snug"
                  style={{ fontFamily: "'Inter',sans-serif" }}>
                  {t.role} · {t.org} <span className="text-primary font-semibold ml-1">{t.year}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
        <div className="flex items-center gap-1.5">
          {testimonials.map((item, i) => (
            <button key={item.name} onClick={() => go(i)} aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-5 bg-primary" : "w-1.5 bg-border hover:bg-primary/40"}`} />
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => go(index - 1)} aria-label="Previous testimonial"
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => go(index + 1)} aria-label="Next testimonial"
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Reveal>
  );
}

// ── PAGE: ACHIEVEMENTS ──────────────────────────────────────────────────
export function PageAchievements({ nav }: { nav: Nav }) {
  const testimonials = [
    { name: "Allan Duncan Omondi", role: "CEO", org: "Jaramogi Oginga Odinga Teaching & Referral Hospital", year: "Since 2010", quote: "The Funsoft I-HMIS has had a profoundly positive impact on our operations — from EMR and finance through supply chain, pharmacy, nursing, and document handling. System Partners have been a dependable partner throughout." },
    { name: "Dr. Timothy Panga", role: "Ag. CEO", org: "Nanyuki Teaching and Referral Hospital", year: "Since 2010", quote: "SPL adhered to our annual SLA to keep the software running and updated, covering EMR, finance, Universal Healthcare modules, and more. Their responsiveness and professionalism are commendable." },
    { name: "Dr. Oduor Michael", role: "Medical Superintendent", org: "Siaya County Referral Hospital", year: "Since 2018", quote: "The system integrated seamlessly with our laboratory information system and enabled M-Pesa cashless operations. System Partners Limited is a reliable, flexible, and trusted partner." },
  ];
  return (
    <SubPage breadcrumb="About Us / Our Achievements" title="Our Achievements"
      heroImageId="1720700126957-769e2f2fc0fc" heroImageCrop="faces"
      heroImageAlt="System Partners team delivering healthcare solutions"
      sidebar={<><CtaCard nav={nav} /><CompactContact /></>}>
      <div className="space-y-6">
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { value: "100+", label: "Systems Implemented", icon: Activity },
            { value: "20+", label: "Years of Experience", icon: Award },
            { value: "500+", label: "Happy Clients", icon: Users },
          ].map(({ value, label, icon: Icon }) => (
            <StaggerItem key={label} className="bg-card rounded-xl border border-border p-5 text-center hover:shadow-sm transition-shadow">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-3">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-extrabold text-primary mb-0.5"><CountUp value={value} /></div>
              <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
                style={{ fontFamily: "'Inter',sans-serif" }}>{label}</div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div>
          <h3 className="font-bold text-[17px] text-foreground mb-4">What Our Clients Say</h3>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </div>
    </SubPage>
  );
}

// ── PAGE: SERVICES (tabbed, single scroll) ──────────────────────────────
export function PageServices({ activeTab, nav }: { activeTab: ServiceTabId; nav: Nav }) {
  const tab = SERVICE_TABS.find(t => t.id === activeTab)!;
  return (
    <div className="min-h-full flex flex-col">
      {/* Left: tabs + scrollable content */}
      <div className="flex flex-col">
        {/* Sticky tab bar */}
        <div className="sticky top-0 z-10 flex overflow-x-auto border-b border-border bg-card/95 backdrop-blur px-3 sm:px-7 lg:px-10 gap-0">
          {SERVICE_TABS.map(t => {
            const Icon = t.icon;
            const active = t.id === activeTab;
            return (
              <button key={t.id} onClick={() => nav(t.id)}
                className={`flex items-center gap-2 px-4 py-3.5 text-[13px] font-semibold border-b-2 transition-all duration-150 whitespace-nowrap ${active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                <Icon className="w-3.5 h-3.5 flex-none" />{t.label}
              </button>
            );
          })}
        </div>

        {/* Single scroll area */}
        <div className="site-content flex-1">
          {/* Image header — changes with tab */}
          <div className="h-[168px] relative overflow-hidden">
            <Img id={tab.imageId} w={1100} h={240} alt={tab.label} crop={tab.crop}
              className="w-full h-full object-cover" style={{ objectPosition: "center 35%" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/82 via-primary/50 to-primary/10" />
            <div className="absolute inset-0 flex flex-col justify-end px-8 pb-6">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-200 mb-1.5">Our Services</p>
              <h2 className="text-2xl font-extrabold text-white leading-tight">{tab.label}</h2>
              <p className="text-[14px] text-blue-100 mt-1.5 max-w-[520px]"
                style={{ fontFamily: "'Inter',sans-serif" }}>{tab.tagline}</p>
            </div>
          </div>

          {/* Service items */}
          <StaggerGroup key={tab.id} className="w-full max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 py-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tab.services.map(({ title, desc }) => (
              <StaggerItem key={title}
                className="bg-card rounded-xl border border-border px-5 py-4 hover:border-primary/40 hover:shadow-sm transition-all cursor-default">
                <div className="flex items-start gap-2.5 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-none" />
                  <span className="font-semibold text-[14px] text-foreground leading-snug">{title}</span>
                </div>
                <p className="text-[13px] text-muted-foreground leading-relaxed pl-6.5"
                  style={{ fontFamily: "'Inter',sans-serif" }}>{desc}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <section aria-label="Next steps and contact details" className="w-full max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 pb-12">
            <div className="pt-8 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[980px]">
              <CtaCard nav={nav} />
              <CompactContact />
            </div>
          </section>
        </div>
      </div>

      {/* Right sidebar — overflow-hidden, no second scroll */}
    </div>
  );
}

// ── PAGE: FUNSOFT I-HMIS ────────────────────────────────────────────────
export function PageProductIHMIS({ nav }: { nav: Nav }) {
  const modules = [
    "Electronic Medical Records (EMR)", "Outpatient Department (OPD)",
    "Inpatient / Ward Management", "Pharmacy Module",
    "Laboratory Information System", "Finance & Billing",
    "Supply Chain Management", "Nursing Module",
    "M-Pesa Cashless Integration", "Universal Healthcare (UHC) Module",
    "Document Management", "Reporting & Analytics Dashboard",
  ];
  return (
    <SubPage breadcrumb="Products / Funsoft I-HMIS" title="Funsoft® I-HMIS"
      heroImageId="1688565631550-ff8aa569f71a" heroImageCrop="faces"
      heroImageAlt="Clinician using Funsoft I-HMIS at a hospital"
      wideSidebar sidebar={<PricingSupportPanel nav={nav} />}>
      <div className="space-y-5">
        <span className="inline-flex items-center gap-1.5 bg-secondary text-primary text-[11px] font-semibold px-3 py-1.5 rounded-full border border-primary/20">
          <CheckCircle2 className="w-3 h-3" />MOH Approved EMR / HIS System
        </span>
        <p className="text-[16px] leading-relaxed text-muted-foreground" style={{ fontFamily: "'Inter',sans-serif" }}>
          The <strong className="text-foreground">Funsoft® Integrated Healthcare Information Management System</strong> is Kenya&apos;s leading
          MOH-approved platform — transforming how hospitals manage patient records, finance, pharmacy, supply chain, and clinical
          operations. Trusted by Jaramogi Oginga Odinga Teaching &amp; Referral Hospital, Nanyuki Teaching and Referral Hospital,
          and Siaya County Referral Hospital, among many others.
        </p>
        <Reveal className="bg-gradient-to-r from-primary to-[#0d3f8f] rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-lg shadow-primary/20">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-white font-extrabold text-[17px] sm:text-[19px] mb-1">See Funsoft I-HMIS in action</p>
            <p className="text-blue-100 text-[13px]" style={{ fontFamily: "'Inter',sans-serif" }}>
              Explore the full live system yourself — no sign-up required.
            </p>
          </div>
          <a href="https://funsoft.systempartners.biz/funsofthmis" target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-white text-primary font-bold text-[15px] px-6 py-3.5 rounded-xl hover:bg-blue-50 active:scale-[0.98] transition-all shadow-md flex-none whitespace-nowrap">
            Try the Live Demo
            <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
        <Reveal>
          <VideoLightbox youtubeId="_8rMMYb6XWE" thumbnailAlt="Funsoft Mobile app walkthrough" label="Watch the Funsoft Mobile app in action" />
        </Reveal>
        <div>
          <h3 className="font-bold text-[16px] text-foreground mb-3">System Modules</h3>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-2" stagger={0.03}>
            {modules.map(m => (
              <StaggerItem key={m} className="bg-card rounded-lg border border-border px-4 py-2.5 flex items-center gap-2.5 hover:border-primary/30 hover:bg-secondary/20 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-none" />
                <span className="text-[13px] font-medium text-foreground" style={{ fontFamily: "'Inter',sans-serif" }}>{m}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
        <div>
          <h3 className="font-bold text-[16px] text-foreground mb-3">The System in Practice</h3>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3" stagger={0.05}>
            {[
              { src: "/assets/product/desktop-ris-pacs.jpg", caption: "RIS / PACS & DICOM imaging viewer" },
              { src: "/assets/product/diagnostics-scheduling.jpg", caption: "Diagnostics scheduling & results access" },
              { src: "/assets/product/android-radiology.jpg", caption: "Radiology access on Android" },
              { src: "/assets/product/analytics-dashboard.jpg", caption: "Informatics analytics & planning" },
            ].map(({ src, caption }) => (
              <StaggerItem key={src} className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-sm transition-all">
                <img src={src} alt={caption} className="w-full aspect-video object-cover" loading="lazy" />
                <p className="text-[12px] text-muted-foreground px-3.5 py-2.5" style={{ fontFamily: "'Inter',sans-serif" }}>{caption}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
        <Reveal className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-bold text-[15px] text-foreground mb-3">Technology Stack</h3>
          <TechLogoRow />
        </Reveal>
      </div>
    </SubPage>
  );
}

// ── PAGE: ERP ───────────────────────────────────────────────────────────
export function PageProductERP({ nav }: { nav: Nav }) {
  return (
    <SubPage breadcrumb="Products / ERP" title="Enterprise Resource Planning"
      heroImageId="1629904853893-c2c8981a1dc5" heroImageCrop="entropy"
      heroImageAlt="Enterprise operations management"
      sidebar={<><CtaCard nav={nav} /><CompactContact /></>}>
      <div className="space-y-5">
        <p className="text-[16px] leading-relaxed text-muted-foreground" style={{ fontFamily: "'Inter',sans-serif" }}>
          System Partners Limited offers an <strong className="text-foreground">Enterprise Resource Planning (ERP)</strong> solution built on
          the same robust technology foundation as Funsoft I-HMIS. Designed to streamline the core business processes of
          healthcare organisations, the ERP provides a unified view across finance, HR, procurement, and administration.
        </p>
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: Database, title: "Financial Management", body: "Integrated accounts, budgeting, and financial reporting for healthcare facilities and enterprises." },
            { icon: Users, title: "Human Resources", body: "Staff records, payroll integration, and workforce planning for healthcare teams." },
            { icon: Layers, title: "Procurement & Supply", body: "Vendor management, purchase orders, and inventory control across departments." },
            { icon: BarChart3, title: "Reporting & Analytics", body: "Real-time dashboards and management reports for data-driven operational decisions." },
          ].map(({ icon: Icon, title, body }) => (
            <StaggerItem key={title} className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 hover:shadow-sm transition-all">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-bold text-[15px] text-foreground mb-1.5">{title}</h3>
              <p className="text-[13px] text-muted-foreground leading-snug" style={{ fontFamily: "'Inter',sans-serif" }}>{body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal className="bg-primary/5 border border-primary/20 rounded-xl p-5">
          <p className="text-[14px] text-foreground leading-relaxed" style={{ fontFamily: "'Inter',sans-serif" }}>
            For detailed specifications, pricing, and a tailored demonstration, contact our team. We scope and configure the ERP around each client&apos;s specific operational requirements.
          </p>
        </Reveal>
      </div>
    </SubPage>
  );
}

// ── PAGE: HEALTHCARE AI ─────────────────────────────────────────────────
export function PageProductAI({ nav }: { nav: Nav }) {
  return (
    <SubPage breadcrumb="Products / Funsoft Healthcare AI" title="Funsoft Healthcare AI"
      heroImageId="1666214277657-e60f05c40b04" heroImageCrop="faces"
      heroImageAlt="AI-powered healthcare analytics"
      sidebar={<><CtaCard nav={nav} /><CompactContact /></>}>
      <div className="space-y-5">
        <span className="inline-flex items-center gap-1.5 bg-secondary text-primary text-[11px] font-semibold px-3 py-1.5 rounded-full border border-primary/20">
          <Brain className="w-3 h-3" />Coming 2026 · In Development
        </span>
        <p className="text-[16px] leading-relaxed text-muted-foreground" style={{ fontFamily: "'Inter',sans-serif" }}>
          <strong className="text-foreground">Funsoft Healthcare AI</strong> is the next evolution of our product suite — an intelligent analytics
          and decision-support layer built on top of Funsoft I-HMIS. It applies machine learning to patient and operational data
          to surface actionable insights in real time, enabling clinicians and administrators to make faster, better-informed decisions.
        </p>
        <StaggerGroup className="grid grid-cols-1 gap-3">
          {[
            { icon: BarChart3, title: "Predictive Analytics", body: "Forecast patient volumes, resource utilisation, and supply needs before they become critical — reducing bottlenecks and reactive firefighting." },
            { icon: Activity, title: "Clinical Decision Support", body: "Real-time alerts and treatment recommendations based on patient history, vital trends, and diagnostic data from the I-HMIS record." },
            { icon: Shield, title: "Compliance Monitoring", body: "Automated checks against MOH protocols and Universal Healthcare requirements, flagging compliance gaps before they become audit issues." },
            { icon: Brain, title: "Natural Language Reporting", body: "Generate structured clinical and administrative reports from unstructured data — saving clinicians hours every week." },
          ].map(({ icon: Icon, title, body }) => (
            <StaggerItem key={title} className="bg-card rounded-xl border border-border p-5 flex items-start gap-4 hover:border-primary/30 hover:shadow-sm transition-all">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center flex-none">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-[15px] text-foreground mb-1">{title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter',sans-serif" }}>{body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </SubPage>
  );
}

// ── PAGE: ONLINE DEMO ───────────────────────────────────────────────────
export function PageResourcesDemo({ nav }: { nav: Nav }) {
  const [form, setForm] = useState({ name: "", org: "", email: "", phone: "", product: "Funsoft I-HMIS", notes: "" });
  const [website, setWebsite] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const cls = "w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] bg-card focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all";
  const handleDemoSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (website) {
      setDone(true);
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await submitLead("demo_request", form);
      setDone(true);
      setForm({ name: "", org: "", email: "", phone: "", product: "Funsoft I-HMIS", notes: "" });
    } catch (submissionError) {
      console.error("Demo request submission failed", submissionError);
      setError("We couldn't send your request. Please call +254 714 433693 or try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <SubPage breadcrumb="Resources / Online Product Demo" title="Request an Online Demo"
      sidebar={
        <>
          <div className="rounded-xl overflow-hidden h-[148px] relative bg-primary/10">
            <Img id="1576091160550-2173dba999ef" w={300} h={200} alt="Funsoft I-HMIS demo" crop="faces"
              className="w-full h-full object-cover" style={{ objectPosition: "center 15%" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white font-bold text-[13px] leading-snug">See Funsoft I-HMIS live — with your own team</p>
            </div>
          </div>
          <CompactContact />
        </>
      }>
      <div className="max-w-[520px]">
        {done ? (
          <div aria-live="polite" className="bg-card rounded-xl border border-primary/20 p-10 text-center">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-[20px] text-foreground mb-2">Request received</h3>
            <p className="text-[15px] text-muted-foreground" style={{ fontFamily: "'Inter',sans-serif" }}>
              Our team will contact you within one business day to schedule your live demonstration.
            </p>
            <button onClick={() => setDone(false)} className="mt-5 text-[14px] text-primary font-semibold hover:underline">Submit another request</button>
          </div>
        ) : (
          <form onSubmit={handleDemoSubmit} aria-busy={submitting} className="space-y-4">
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="demo-company-website">Company website</label>
              <input id="demo-company-website" name="company_website" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} />
            </div>
            <p className="text-[15px] text-muted-foreground mb-2" style={{ fontFamily: "'Inter',sans-serif" }}>
              Complete the form and a product specialist will contact you to schedule a live demonstration.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="demo-name" className="block text-[13px] font-semibold text-foreground mb-1.5" style={{ fontFamily: "'Inter',sans-serif" }}>Full Name *</label>
                <input id="demo-name" name="name" autoComplete="name" required className={cls} placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ fontFamily: "'Inter',sans-serif" }} />
              </div>
              <div>
                <label htmlFor="demo-org" className="block text-[13px] font-semibold text-foreground mb-1.5" style={{ fontFamily: "'Inter',sans-serif" }}>Organisation *</label>
                <input id="demo-org" name="organization" autoComplete="organization" required className={cls} placeholder="Hospital / clinic name" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} style={{ fontFamily: "'Inter',sans-serif" }} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="demo-email" className="block text-[13px] font-semibold text-foreground mb-1.5" style={{ fontFamily: "'Inter',sans-serif" }}>Email Address *</label>
                <input id="demo-email" name="email" autoComplete="email" required type="email" className={cls} placeholder="you@org.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ fontFamily: "'Inter',sans-serif" }} />
              </div>
              <div>
                <label htmlFor="demo-phone" className="block text-[13px] font-semibold text-foreground mb-1.5" style={{ fontFamily: "'Inter',sans-serif" }}>Phone Number</label>
                <input id="demo-phone" name="phone" type="tel" autoComplete="tel" className={cls} placeholder="+254 ..." value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ fontFamily: "'Inter',sans-serif" }} />
              </div>
            </div>
            <div>
              <label htmlFor="demo-product" className="block text-[13px] font-semibold text-foreground mb-1.5" style={{ fontFamily: "'Inter',sans-serif" }}>Product of Interest</label>
              <select id="demo-product" name="product" className={cls} value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} style={{ fontFamily: "'Inter',sans-serif" }}>
                <option>Funsoft I-HMIS</option><option>ERP</option><option>Funsoft Healthcare AI</option>
              </select>
            </div>
            <div>
              <label htmlFor="demo-notes" className="block text-[13px] font-semibold text-foreground mb-1.5" style={{ fontFamily: "'Inter',sans-serif" }}>Additional Notes</label>
              <textarea id="demo-notes" name="notes" rows={3} className={cls + " resize-none"} placeholder="Tell us about your facility and specific requirements..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ fontFamily: "'Inter',sans-serif" }} />
            </div>
            {error && <p role="alert" className="text-[13px] text-destructive bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full bg-primary text-white font-bold text-[15px] py-3 rounded-xl hover:bg-accent disabled:opacity-80 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {submitting ? "Sending request…" : "Request Demo"} {!submitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        )}
      </div>
    </SubPage>
  );
}

// ── PAGE: DOWNLOADS ─────────────────────────────────────────────────────
export function PageResourcesDownloads({ nav }: { nav: Nav }) {
  return (
    <SubPage breadcrumb="Resources / Product Resources" title="Product Resources"
      sidebar={<><CtaCard nav={nav} /><CompactContact /></>}>
      <div className="space-y-3">
        <p className="text-[15px] leading-relaxed text-muted-foreground mb-4" style={{ fontFamily: "'Inter',sans-serif" }}>
          Request product brochures, technical documentation, and system requirements from our team. We will send the current approved version directly to you.
        </p>
        {[
          { title: "Funsoft I-HMIS Product Brochure", desc: "Overview of modules, features, and system capabilities", tag: "Brochure", size: "PDF · 2.4 MB" },
          { title: "Funsoft I-HMIS System Requirements", desc: "Hardware and software prerequisites for deployment", tag: "Technical", size: "PDF · 0.8 MB" },
          { title: "Funsoft Healthcare AI Whitepaper", desc: "Technical overview of our AI-powered clinical decision support platform", tag: "Whitepaper", size: "PDF · 3.1 MB" },
          { title: "ERP Product Overview", desc: "ERP modules, integration points, and deployment options", tag: "Brochure", size: "PDF · 1.5 MB" },
          { title: "SLA & Support Terms", desc: "Standard service level agreement and support package details", tag: "Legal", size: "PDF · 0.5 MB" },
        ].map(({ title, desc, tag, size }) => (
          <button key={title} onClick={() => nav("contact")}
            className="w-full bg-card rounded-xl border border-border px-5 py-4 flex items-center gap-4 hover:border-primary/30 hover:shadow-sm transition-all text-left group">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-none group-hover:bg-primary/10 transition-colors">
              <Download className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[15px] text-foreground mb-0.5">{title}</div>
              <div className="text-[13px] text-muted-foreground" style={{ fontFamily: "'Inter',sans-serif" }}>
                {desc} · <span className="text-primary/70">{size}</span>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-secondary px-2 py-1 rounded-md flex-none"
              style={{ fontFamily: "'Inter',sans-serif" }}>Request {tag}</span>
          </button>
        ))}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mt-2">
          <p className="text-[14px] text-foreground" style={{ fontFamily: "'Inter',sans-serif" }}>
            Need a specific document?{" "}
            <button onClick={() => nav("contact")} className="text-primary font-semibold underline hover:text-accent transition-colors">Contact our team</button>
            {" "}and we will assist you promptly.
          </p>
        </div>
      </div>
    </SubPage>
  );
}

// ── PAGE: CONTACT (full-bleed split panel) ──────────────────────────────
export function PageContact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", subscribe: false });
  const [website, setWebsite] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const cls = "w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] bg-card focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all";
  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (website) {
      setDone(true);
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await submitLead("contact_message", form);
      setDone(true);
      setForm({ name: "", email: "", subject: "", message: "", subscribe: false });
    } catch (submissionError) {
      console.error("Contact submission failed", submissionError);
      setError("We couldn't send your message. Please email info@systempartners.biz or try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-full flex flex-col">
      {/* LEFT — image + contact details */}
      <div className="relative min-h-[390px] sm:min-h-[430px] overflow-hidden">
        <Img id="1735792339621-2846f164b78f" w={700} h={900} alt="Patient receiving care" crop="entropy"
          className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 30%" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/65 to-primary/95" />
        <div className="relative min-h-[390px] sm:min-h-[430px] flex flex-col justify-end px-5 sm:px-8 lg:px-10 py-10 max-w-[1180px] mx-auto">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-300 mb-3">System Partners Limited</p>
          <h2 className="text-3xl font-extrabold text-white mb-2 leading-tight">
            Let&apos;s start a<br />conversation
          </h2>
          <p className="text-[15px] text-blue-200 mb-8 leading-relaxed" style={{ fontFamily: "'Inter',sans-serif" }}>
            Our healthcare ICT specialists are ready to help your facility transform patient care.
          </p>
          <div className="space-y-3.5">
            {[
              { icon: MapPin, text: "Westlands Business Park, 4th Floor, Chiromo Lane, Nairobi, Kenya" },
              { icon: Phone, text: "+254 20 7857779 / +254 20 7855355 / +254 714 433693" },
              { icon: Mail, text: "info@systempartners.biz" },
              { icon: Clock, text: "Monday – Friday, 8:00 AM – 5:00 PM" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3" style={{ fontFamily: "'Inter',sans-serif" }}>
                <Icon className="w-4 h-4 text-blue-300 flex-none mt-0.5" />
                <span className="text-[14px] text-blue-100 leading-snug">{text}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-8">
            <a href="https://facebook.com/funsofthmis" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/12 hover:bg-white/20 border border-white/20 text-white text-[13px] font-semibold px-3 py-2 rounded-lg transition-colors"
              style={{ fontFamily: "'Inter',sans-serif" }}>
              <FacebookMark className="w-3.5 h-3.5" />funsofthmis
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="bg-background w-full max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 py-10 lg:py-14">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-2"
          style={{ fontFamily: "'Inter',sans-serif" }}>Contact Us</p>
        <h1 className="text-3xl font-extrabold text-foreground mb-7">Get in Touch</h1>
        {done ? (
          <div aria-live="polite" className="max-w-[420px] bg-secondary/40 rounded-xl border border-primary/20 p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-[20px] text-foreground mb-2">Message sent</h3>
            <p className="text-[15px] text-muted-foreground" style={{ fontFamily: "'Inter',sans-serif" }}>
              Thank you. Our team will respond within one business day.
            </p>
            <button onClick={() => setDone(false)} className="mt-5 text-[14px] text-primary font-semibold hover:underline">Send another message</button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} aria-busy={submitting} className="space-y-4 max-w-[640px]">
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="contact-company-website">Company website</label>
              <input id="contact-company-website" name="company_website" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-[13px] font-semibold text-foreground mb-1.5" style={{ fontFamily: "'Inter',sans-serif" }}>Full Name *</label>
                <input id="contact-name" name="name" autoComplete="name" required className={cls} placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ fontFamily: "'Inter',sans-serif" }} />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-[13px] font-semibold text-foreground mb-1.5" style={{ fontFamily: "'Inter',sans-serif" }}>Email Address *</label>
                <input id="contact-email" name="email" autoComplete="email" required type="email" className={cls} placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ fontFamily: "'Inter',sans-serif" }} />
              </div>
            </div>
            <div>
              <label htmlFor="contact-subject" className="block text-[13px] font-semibold text-foreground mb-1.5" style={{ fontFamily: "'Inter',sans-serif" }}>Subject</label>
              <input id="contact-subject" name="subject" className={cls} placeholder="How can we help?" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} style={{ fontFamily: "'Inter',sans-serif" }} />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-[13px] font-semibold text-foreground mb-1.5" style={{ fontFamily: "'Inter',sans-serif" }}>Message *</label>
              <textarea id="contact-message" name="message" required rows={5} className={cls + " resize-none"} placeholder="Tell us about your enquiry..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ fontFamily: "'Inter',sans-serif" }} />
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={form.subscribe} onChange={e => setForm({ ...form, subscribe: e.target.checked })} className="w-4 h-4 rounded border-border accent-primary" />
              <span className="text-[14px] text-muted-foreground" style={{ fontFamily: "'Inter',sans-serif" }}>Subscribe to product updates and upgrade news</span>
            </label>
            {error && <p role="alert" className="text-[13px] text-destructive bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full bg-primary text-white font-bold text-[15px] py-3 rounded-xl hover:bg-accent disabled:opacity-80 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {submitting ? "Sending message…" : "Send Message"} {!submitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

