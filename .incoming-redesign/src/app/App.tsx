import { useState, useRef, useEffect, Suspense, lazy } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown, Menu, X, Download, Monitor, Code2, Server,
  GraduationCap, Microscope, Moon, Sun,
  Mail, Phone,
} from "lucide-react";
import { PageTransition, useTheme } from "./components/motion";
import {
  type PageId, type ServiceTabId, type Nav, type NavEntry,
  PAGE_TITLES, pageFromLocation,
} from "./shared";
import { PageHome } from "./page-home";
import { useSiteContent } from "./content/useSiteContent";

// ── NAV CONFIG ──────────────────────────────────────────────────────────
const NAV_CONFIG: NavEntry[] = [
  { label: "Home", page: "home" },
  {
    label: "About Us",
    children: [
      { label: "Our Background", page: "background" },
      { label: "Who We Are", page: "who-we-are" },
      { label: "Our Achievements", page: "achievements" },
    ],
  },
  {
    label: "Our Services",
    children: [
      { label: "Development", page: "services-dev" },
      { label: "System Based", page: "services-system" },
      { label: "Training & Capacity", page: "services-training" },
      { label: "Research & Development", page: "services-rd" },
    ],
  },
  {
    label: "Products",
    children: [
      { label: "Funsoft I-HMIS", page: "product-ihmis" },
      { label: "ERP", page: "product-erp" },
      { label: "Funsoft Healthcare AI", page: "product-ai" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Online Product Demo", page: "resources-demo", icon: Monitor },
      { label: "Product Resources", page: "resources-downloads", icon: Download },
    ],
  },
];

// ── HOOK ────────────────────────────────────────────────────────────────
function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return { open, setOpen, ref };
}

// ── LAZY SUBPAGES (everything except the home landing page) ─────────────
const PageBackground = lazy(() => import("./pages").then(m => ({ default: m.PageBackground })));
const PageWhoWeAre = lazy(() => import("./pages").then(m => ({ default: m.PageWhoWeAre })));
const PageAchievements = lazy(() => import("./pages").then(m => ({ default: m.PageAchievements })));
const PageServices = lazy(() => import("./pages").then(m => ({ default: m.PageServices })));
const PageProductIHMIS = lazy(() => import("./pages").then(m => ({ default: m.PageProductIHMIS })));
const PageProductERP = lazy(() => import("./pages").then(m => ({ default: m.PageProductERP })));
const PageProductAI = lazy(() => import("./pages").then(m => ({ default: m.PageProductAI })));
const PageResourcesDemo = lazy(() => import("./pages").then(m => ({ default: m.PageResourcesDemo })));
const PageResourcesDownloads = lazy(() => import("./pages").then(m => ({ default: m.PageResourcesDownloads })));
const PageLiveDemo = lazy(() => import("./pages").then(m => ({ default: m.PageLiveDemo })));
const PageContact = lazy(() => import("./pages").then(m => ({ default: m.PageContact })));
const AdminPage = lazy(() => import("./admin/AdminPage").then(m => ({ default: m.AdminPage })));

function PageLoading() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-6 h-6 rounded-full border-2 border-primary/25 border-t-primary animate-spin" />
    </div>
  );
}

// ── NAV ITEM ─────────────────────────────────────────────────────────────
function NavItem({ entry, nav, current }: { entry: NavEntry; nav: Nav; current: PageId }) {
  const { open, setOpen, ref } = useDropdown();
  const lnk = (on: boolean) =>
    `text-[13px] font-semibold transition-colors duration-150 ${on ? "text-primary" : "text-foreground hover:text-primary"}`;

  if (entry.page && !entry.children) {
    return (
      <button onClick={() => nav(entry.page!)} className={lnk(current === entry.page)}>
        {entry.label}
      </button>
    );
  }

  if (entry.children) {
    const isActive = entry.children.some(c => c.page === current);
    return (
      <div ref={ref} className="relative">
        <button onClick={() => setOpen(!open)}
          className={`flex items-center gap-1 ${lnk(isActive)}`}>
          {entry.label}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 mt-2 min-w-[210px] bg-card border border-border rounded-xl shadow-xl shadow-primary/10 z-50 py-1.5 overflow-hidden origin-top">
              {entry.children.map(child => {
                const Icon = child.icon;
                return (
                  <button key={child.page} onClick={() => { nav(child.page); setOpen(false); }}
                    className={`flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-[13px] transition-colors ${current === child.page ? "bg-secondary text-primary" : "text-foreground hover:bg-secondary hover:text-primary"}`}
                    style={{ fontFamily: "'Inter',sans-serif" }}>
                    {Icon && <Icon className="w-3.5 h-3.5 text-primary/55 flex-none" />}
                    {child.label}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  return null;
}

// ── MAIN NAV ─────────────────────────────────────────────────────────────
function MainNav({ nav, current }: { nav: Nav; current: PageId }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { isDark, toggle: toggleTheme } = useTheme();
  const go = (p: PageId) => { nav(p); setMobileOpen(false); };

  return (
    <nav className="flex-none bg-card border-b border-border z-20 relative">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 gap-2 sm:gap-4">
        {/* Logo */}
        <button onClick={() => nav("home")} className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 lg:flex-none">
          <img src="/funsoft-logo.png" alt="Funsoft logo" className="w-9 h-9 sm:w-10 sm:h-10 flex-none" width={40} height={40} />
          <div className="leading-none text-left min-w-0">
            <div className="font-extrabold text-[13px] sm:text-[15px] text-foreground tracking-tight truncate">System Partners Limited</div>
            <div className="text-[8px] sm:text-[9px] font-bold text-primary tracking-[0.14em] sm:tracking-[0.22em] uppercase mt-0.5 truncate"
              style={{ fontFamily: "'Inter',sans-serif" }}>Funsoft ERP/HMIS</div>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_CONFIG.map(entry => <NavItem key={entry.label} entry={entry} nav={nav} current={current} />)}
        </div>

        {/* Right controls */}
        <div className="hidden lg:flex items-center gap-3">
          <button onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary transition-colors">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={() => nav("contact")}
            className="bg-primary text-white text-[13px] font-bold px-5 py-2 rounded-lg hover:bg-accent transition-colors whitespace-nowrap">
            Meet with Us
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-1 flex-none">
          <button onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 text-muted-foreground hover:text-primary">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button className="p-2 text-muted-foreground hover:text-primary" aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/40 z-10"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:hidden absolute top-full left-0 right-0 z-20 border-t border-border bg-card px-6 py-4 flex flex-col gap-1 max-h-[65vh] overflow-y-auto shadow-lg"
          style={{ fontFamily: "'Inter',sans-serif" }}>
          {NAV_CONFIG.map(entry => {
            const childPages = entry.children ?? [];
            const isOpen = mobileExpanded === entry.label;
            if (entry.page && !childPages.length) {
              return (
                <button key={entry.label} onClick={() => go(entry.page!)}
                  className={`text-[14px] font-semibold py-2 text-left ${current === entry.page ? "text-primary" : "text-foreground"}`}>
                  {entry.label}
                </button>
              );
            }
            return (
              <div key={entry.label}>
                <div className="flex items-center justify-between">
                  <span className={`text-[14px] font-semibold py-2 ${childPages.some(c => c.page === current) ? "text-primary" : "text-foreground"}`}>
                    {entry.label}
                  </span>
                  <button onClick={() => setMobileExpanded(isOpen ? null : entry.label)} className="p-2 text-muted-foreground">
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
                {isOpen && (
                  <div className="pl-4 pb-2 flex flex-col border-l-2 border-secondary ml-1">
                    {childPages.map(c => (
                      <button key={c.page} onClick={() => go(c.page)}
                        className={`text-[13px] py-2 text-left ${current === c.page ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <button onClick={() => go("contact")} className="mt-3 bg-primary text-white text-[14px] font-bold px-5 py-2.5 rounded-lg text-center">
            Meet with Us
          </button>
        </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ── SERVICES STRIP ────────────────────────────────────────────────────────
const SERVICE_IDS: PageId[] = ["services-dev", "services-system", "services-training", "services-rd"];

function LinkedInMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────
function Footer() {
  const contact = useSiteContent("contact");
  const year = new Date().getFullYear();
  const primaryPhone = contact.phones[contact.phones.length - 1] ?? contact.phones[0];
  return (
    <footer className="flex-none flex flex-col sm:flex-row items-center justify-between px-5 sm:px-8 py-4 bg-[#0D1B2E] text-white/55 gap-3 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-4 text-[11px]" style={{ fontFamily: "'Inter',sans-serif" }}>
        <span>© {year} System Partners Limited · {contact.addressLines.join(", ")}</span>
        <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
          <Mail className="w-3 h-3 flex-none" />{contact.email}
        </a>
        {primaryPhone && (
          <a href={`tel:${primaryPhone.replace(/\s+/g, "")}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3 h-3 flex-none" />{primaryPhone}
          </a>
        )}
      </div>
      <div className="flex items-center gap-5">
        {([
          ["Facebook", contact.facebookUrl],
          ["Twitter", contact.twitterUrl],
          ["Instagram", contact.instagramUrl],
          ["LinkedIn", contact.linkedinUrl],
        ] as const).map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-[11px] hover:text-white transition-colors flex items-center gap-1.5" style={{ fontFamily: "'Inter',sans-serif" }}>
            {label === "LinkedIn" && <LinkedInMark className="w-3 h-3" />}
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<PageId>(pageFromLocation);

  const navigate: Nav = (nextPage) => {
    if (nextPage === page) return;
    const nextUrl = nextPage === "home"
      ? `${window.location.pathname}${window.location.search}`
      : `#/${nextPage}`;
    window.history.pushState({ page: nextPage }, "", nextUrl);
    setPage(nextPage);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = PAGE_TITLES[page];
  }, [page]);

  useEffect(() => {
    const syncPageWithUrl = () => setPage(pageFromLocation());
    window.addEventListener("popstate", syncPageWithUrl);
    return () => window.removeEventListener("popstate", syncPageWithUrl);
  }, []);

  function renderPage() {
    if (SERVICE_IDS.includes(page)) {
      return <PageServices activeTab={page as ServiceTabId} nav={navigate} />;
    }
    switch (page) {
      case "home":                return <PageHome nav={navigate} />;
      case "background":          return <PageBackground nav={navigate} />;
      case "who-we-are":          return <PageWhoWeAre nav={navigate} />;
      case "achievements":        return <PageAchievements nav={navigate} />;
      case "product-ihmis":       return <PageProductIHMIS nav={navigate} />;
      case "product-erp":         return <PageProductERP nav={navigate} />;
      case "product-ai":          return <PageProductAI nav={navigate} />;
      case "resources-demo":      return <PageResourcesDemo nav={navigate} />;
      case "resources-downloads": return <PageResourcesDownloads nav={navigate} />;
      case "live-demo":           return <PageLiveDemo />;
      case "contact":             return <PageContact />;
      case "admin":               return <AdminPage />;
      default:                    return <PageHome nav={navigate} />;
    }
  }

  return (
    <div className="w-full h-dvh bg-background text-foreground flex flex-col overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-card focus:text-primary focus:px-4 focus:py-2 focus:rounded-lg">Skip to content</a>
      <MainNav nav={navigate} current={page} />
      <main id="main-content" className={page === "home" || page === "live-demo" ? "flex-1 min-h-0 overflow-hidden" : "flex-1 min-h-0 overflow-y-auto"}>
        <Suspense fallback={<PageLoading />}>
          <AnimatePresence mode="wait">
            <PageTransition pageKey={page}>{renderPage()}</PageTransition>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
