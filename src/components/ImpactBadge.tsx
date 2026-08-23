import { Flame } from "lucide-react";

export function ImpactBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-white shadow-[0_0_16px_-2px_rgba(220,38,38,0.65)]"
      style={{ background: "var(--gradient-impact)" }}
    >
      <Flame
        className="h-3 w-3"
        strokeWidth={2}
        fill="currentColor"
        aria-hidden
      />
      Impact fort
    </span>
  );
}
