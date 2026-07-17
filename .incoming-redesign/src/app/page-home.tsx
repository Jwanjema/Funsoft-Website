import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Activity, Shield, MapPin, Mail, Clock, CheckCircle2, Brain, BarChart3, ChevronRight,
} from "lucide-react";
import { CountUp } from "./components/motion";
import { Img } from "./components/Img";
import type { Nav } from "./shared";

// ── PAGE: HOME ──────────────────────────────────────────────────────────
export function PageHome({ nav }: { nav: Nav }) {
  const features = [
    { icon: Activity, label: "Real-time Patient Monitoring" },
    { icon: BarChart3, label: "Health Analytics & Reporting" },
    { icon: Brain, label: "Funsoft Healthcare AI" },
    { icon: Shield, label: "MOH Approved EMR / HIS" },
  ];
  const stats = [
    { value: "500+", label: "Happy Clients" },
    { value: "99.8%", label: "System Uptime" },
    { value: "20+", label: "Years of Excellence" },
  ];
  const reduce = useReducedMotion();
  const easeOut = [0.16, 1, 0.3, 1] as const;
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
  const item: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
  };

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-[55fr_45fr] overflow-hidden">
      {/* LEFT */}
      <motion.div
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : "show"}
        variants={container}
        className="min-h-0 flex flex-col justify-between px-5 sm:px-8 lg:px-10 xl:px-14 py-5 sm:py-7 lg:border-r border-border overflow-hidden">
        <motion.span variants={item}
          className="home-responsive-badge inline-flex items-center gap-1.5 bg-secondary text-primary text-[11px] font-semibold px-3 py-1.5 rounded-full border border-primary/20 self-start">
          <CheckCircle2 className="w-3 h-3" /> MOH Approved EMR / HIS System — Kenya
        </motion.span>

        <div className="flex-1 min-h-0 flex flex-col justify-center py-3 lg:py-4">
          <motion.h1 variants={item} className="home-responsive-title text-[34px] sm:text-[42px] xl:text-[54px] font-extrabold leading-[1.02] tracking-tight text-foreground mb-3 sm:mb-5">
            Reforming<br /><span className="text-primary">Healthcare</span><br />Service Delivery
          </motion.h1>
          <motion.p variants={item} className="home-responsive-copy text-[13px] sm:text-[15px] leading-relaxed text-muted-foreground max-w-[480px] mb-4 sm:mb-7"
            style={{ fontFamily: "'Inter',sans-serif" }}>
            System Partners Limited delivers the Funsoft® I-HMIS — Kenya&apos;s leading integrated
            healthcare information platform, trusted by hospitals and health networks across East Africa since 2001.
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-8">
            <button onClick={() => nav("product-ihmis")}
              className="group inline-flex items-center gap-2 bg-primary text-white text-[13px] sm:text-[14px] font-semibold px-4 sm:px-6 py-2.5 rounded-lg hover:bg-accent active:scale-[0.98] transition-all duration-200">
              Explore Funsoft I-HMIS <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <button onClick={() => nav("contact")}
              className="inline-flex items-center gap-2 bg-card border border-border text-foreground text-[13px] sm:text-[14px] font-semibold px-4 sm:px-6 py-2.5 rounded-lg hover:bg-secondary hover:border-primary/30 active:scale-[0.98] transition-all duration-200">
              Meet with Us
            </button>
          </motion.div>
          <motion.div variants={item} className="home-responsive-stats grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-10">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-[22px] sm:text-[28px] font-extrabold text-primary leading-none mb-0.5 tabular-nums">
                  <CountUp value={value} />
                </div>
                <div className="text-[9px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider sm:tracking-widest leading-tight"
                  style={{ fontFamily: "'Inter',sans-serif" }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div variants={item} className="hidden lg:flex flex-wrap items-center gap-5 pt-4 border-t border-border" style={{ fontFamily: "'Inter',sans-serif" }}>
          <span className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-primary/60 flex-none" />Westlands Business Park, 4th Floor, Nairobi
          </span>
          <span className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <Mail className="w-3.5 h-3.5 text-primary/60 flex-none" />info@systempartners.biz
          </span>
          <span className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <Clock className="w-3.5 h-3.5 text-primary/60 flex-none" />Mon – Fri, 8 AM – 5 PM
          </span>
        </motion.div>
      </motion.div>

      {/* RIGHT — full-height image with product overlay */}
      <motion.div
        initial={reduce ? undefined : { opacity: 0, scale: 1.04 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block relative min-h-0 overflow-hidden bg-[#071D45]">
        <Img id="1576091160550-2173dba999ef" w={900} h={900} alt="Healthcare professional using Funsoft I-HMIS" priority
          crop="faces" className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 10%" }} />
        {/* Bottom-heavy gradient so image is clear at top */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/25 via-transparent via-25% to-[#071D45]/96" />
        {/* Light left edge vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />

        {/* Top badge */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: -8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute top-5 right-5">
          <span className="bg-black/30 backdrop-blur-sm border border-white/20 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 align-middle animate-pulse" />
            v4.2 · 2026
          </span>
        </motion.div>

        {/* Bottom product info */}
        <div className="absolute bottom-0 left-0 right-0 px-7 pb-6 pt-16">
          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-300 mb-1">Flagship Product</motion.p>
          <motion.h2
            initial={reduce ? undefined : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="text-2xl xl:text-[26px] font-extrabold text-white mb-1 leading-tight">Funsoft® I-HMIS</motion.h2>
          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.48 }}
            className="text-[13px] text-blue-200 mb-4" style={{ fontFamily: "'Inter',sans-serif" }}>
            Integrated Healthcare Information Management System
          </motion.p>
          <motion.div
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.55 } } }}
            className="grid grid-cols-2 gap-2 mb-4">
            {features.map(({ icon: Icon, label }) => (
              <motion.div key={label} variants={item}
                className="flex items-center gap-2 bg-white/12 backdrop-blur-sm rounded-lg px-3 py-2 hover:bg-white/18 hover:-translate-y-0.5 transition-all duration-200">
                <Icon className="w-3.5 h-3.5 text-blue-300 flex-none" />
                <span className="text-[12px] font-medium text-white/90 leading-tight"
                  style={{ fontFamily: "'Inter',sans-serif" }}>{label}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.75 } } }}
            className="flex gap-2 mb-4">
            {[{ p: "Starter", v: "$3,999" }, { p: "Standard", v: "$5,999" }, { p: "Advanced", v: "$8,999" }].map(({ p, v }) => (
              <motion.div key={p} variants={item}
                className="flex-1 bg-white/12 backdrop-blur-sm border border-white/15 rounded-lg px-2 py-2 text-center hover:bg-white/18 hover:-translate-y-0.5 transition-all duration-200">
                <div className="text-[9px] text-blue-300 font-bold uppercase tracking-widest mb-0.5"
                  style={{ fontFamily: "'Inter',sans-serif" }}>{p}</div>
                <div className="text-[18px] font-extrabold text-white leading-none">{v}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

