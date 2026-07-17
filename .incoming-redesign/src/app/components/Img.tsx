import { useState, type CSSProperties } from "react";
import { Activity } from "lucide-react";

export function Img({
  id, w = 800, h = 500, alt, className, style, crop = "entropy", priority = false,
}: {
  id: string; w?: number; h?: number; alt: string;
  className?: string; style?: CSSProperties; crop?: string; priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div role="img" aria-label={alt} className={`${className ?? ""} flex items-center justify-center bg-primary/10`} style={style}>
        <Activity className="w-10 h-10 text-primary/35" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={`https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=${crop}&auto=format&q=80`}
      alt={alt}
      className={`site-image ${className ?? ""}`}
      style={style}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
