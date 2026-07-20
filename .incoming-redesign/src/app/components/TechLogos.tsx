// Simple monochrome marks (not official brand logos) — currentColor so they
// adapt to light/dark theme automatically.
type IconProps = { className?: string };

function PostgresMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 3c-4.5 0-7.5 3.2-7.5 7.6 0 3.5 1.8 6.2 4.3 7.7.5.3.9-.1.8-.6l-.3-1.6c-.1-.6.1-1 .5-1.3 2.6-1.1 4.2-3.6 4.2-6.6C14 5.6 12 3 12 3Z" />
      <path d="M12 3c4.5 0 7.5 3.2 7.5 7.6 0 3.5-1.8 6.2-4.3 7.7-.5.3-.9-.1-.8-.6l.3-1.6c.1-.6-.1-1-.5-1.3-2.6-1.1-4.2-3.6-4.2-6.6" />
      <path d="M9.5 15.5c1.6.6 3.4.6 5 0" />
    </svg>
  );
}

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

function LinuxMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <ellipse cx="12" cy="8" rx="3.2" ry="4" />
      <path d="M9 11c-1.5 2-2.5 4-2.5 6.5 0 2 1.5 3.5 3 2.5.8-.5 1.5-.5 2.5-.5s1.7 0 2.5.5c1.5 1 3-.5 3-2.5C17.5 15 16.5 13 15 11" fillOpacity="0.85" />
      <circle cx="10.3" cy="7.4" r="0.6" fill="white" />
      <circle cx="13.7" cy="7.4" r="0.6" fill="white" />
    </svg>
  );
}

function OracleMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="8" width="18" height="8" rx="4" />
    </svg>
  );
}

export const TECH_STACK = [
  { name: "PostgreSQL", Mark: PostgresMark },
  { name: "Docker", Mark: DockerMark },
  { name: "Java EE", Mark: JavaMark },
  { name: "Linux", Mark: LinuxMark },
  { name: "Oracle", Mark: OracleMark },
];

export function TechLogoRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-7 gap-y-3 ${className}`}>
      {TECH_STACK.map(({ name, Mark }) => (
        <div key={name} className="flex items-center gap-2 text-muted-foreground/80">
          <Mark className="w-5 h-5" />
          <span className="text-[12px] font-semibold" style={{ fontFamily: "'Inter',sans-serif" }}>{name}</span>
        </div>
      ))}
    </div>
  );
}
