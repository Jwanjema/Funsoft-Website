// Docker and Java EE have no official logo asset in this project, so they use
// simple monochrome marks. PostgreSQL/Oracle/Linux use the real brand logos.
type IconProps = { className?: string };

function DockerMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22.3 9.9c-.5-.4-1.6-.5-2.4-.4-.1-.8-.6-1.5-1.3-2.1l-.4-.3-.3.4c-.5.6-.7 1.6-.6 2.4-.1.1-.4.2-.7.3H2.6c-.2 1.4 0 2.9.8 4.2C4.5 16.4 6.5 17.2 9 17.2c4.9 0 8.9-2.2 10.7-6.7.7 0 2.1 0 2.8-1.4l.2-.4-.4-.3v-.5Z" />
      <rect x="4.4" y="10.2" width="1.9" height="1.7" />
      <rect x="6.9" y="10.2" width="1.9" height="1.7" />
      <rect x="9.4" y="10.2" width="1.9" height="1.7" />
      <rect x="6.9" y="7.8" width="1.9" height="1.7" />
      <rect x="9.4" y="7.8" width="1.9" height="1.7" />
      <rect x="9.4" y="5.4" width="1.9" height="1.7" />
    </svg>
  );
}

function JavaMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M9 3c-1.5 2 2 3-.5 5.5" />
      <path d="M13 5.5c1 1.5-1.5 2.5.5 4.5" />
      <path d="M8 12c-3 .8-3 2.6 0 3.4 3.5.9 8.5.9 12 0 3-.8 3-2.6 0-3.4" />
      <path d="M6.5 16.5c-1.5.8-1.5 2 0 2.8 3 1.6 8 1.6 11 0 1.5-.8 1.5-2 0-2.8" />
      <path d="M9.5 20c-1 .4-1 1.1 0 1.5 2 .8 3.5.8 5.5 0 1-.4 1-1.1 0-1.5" />
    </svg>
  );
}

type TechEntry =
  | { name: string; src: string; kind: "image" }
  | { name: string; Mark: (props: IconProps) => React.JSX.Element; kind: "mark" };

export const TECH_STACK: TechEntry[] = [
  { name: "PostgreSQL", src: "/assets/tech-logos/postgresql.png", kind: "image" },
  { name: "Oracle", src: "/assets/tech-logos/oracle.png", kind: "image" },
  { name: "Linux", src: "/assets/tech-logos/linux.jpg", kind: "image" },
  { name: "Docker", Mark: DockerMark, kind: "mark" },
  { name: "Java EE", Mark: JavaMark, kind: "mark" },
];

export function TechLogoRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {TECH_STACK.map(entry => (
        <div key={entry.name}
          className="flex items-center gap-2.5 bg-white border border-black/5 rounded-lg pl-2.5 pr-3.5 py-2 shadow-sm">
          {entry.kind === "image" ? (
            <img src={entry.src} alt={entry.name} className="h-5 w-auto object-contain" loading="lazy" />
          ) : (
            <entry.Mark className="w-5 h-5 text-[#1558C0]" />
          )}
          <span className="text-[13px] font-semibold text-[#1a2740]" style={{ fontFamily: "'Inter',sans-serif" }}>{entry.name}</span>
        </div>
      ))}
    </div>
  );
}
