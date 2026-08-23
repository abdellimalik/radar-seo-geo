import { Flame } from "lucide-react";

export function ImpactBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-wide"
      style={{ color: "var(--paper-raised)", backgroundColor: "var(--accent)" }}
    >
      <Flame className="h-3 w-3" strokeWidth={2.25} aria-hidden />
      Impact fort
    </span>
  );
}
