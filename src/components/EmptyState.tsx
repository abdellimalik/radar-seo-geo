import { Radar } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-start gap-3 rounded-lg border border-dashed border-line-strong px-6 py-12">
      <Radar className="h-6 w-6 text-ink-faint" strokeWidth={1.75} aria-hidden />
      <p className="max-w-md text-sm text-ink-muted">
        Aucun article ne correspond à ce filtre pour le moment. La prochaine
        collecte automatique passe chaque matin.
      </p>
    </div>
  );
}
