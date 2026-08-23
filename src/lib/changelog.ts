export interface ChangelogEntry {
  date: string;
  title: string;
  description: string;
}

// Newest first. Add an entry here whenever a user-visible change ships.
export const CHANGELOG: ChangelogEntry[] = [
  {
    date: "2026-08-23",
    title: "Nouvelle identité visuelle et titres en français",
    description:
      "Refonte complète du design (thème sombre, palette premium violet/indigo/bleu, bordures dégradées sur les cartes), traduction automatique des titres d'articles en français, renommage du produit en \"Radar S&GEO\", et ajout de cette page de changelog.",
  },
  {
    date: "2026-08-23",
    title: "Passage à une collecte quotidienne",
    description:
      "La fréquence de collecte est ajustée à une fois par jour (6h UTC) pour rester compatible avec le plan Vercel Hobby, qui limite les cron jobs à une exécution quotidienne. Objectif de revenir à plusieurs collectes par jour si le plan d'hébergement évolue.",
  },
  {
    date: "2026-08-23",
    title: "Enrichissement IA via Mistral",
    description:
      "Le moteur d'enrichissement (résumé, tagging thématique, score d'impact) passe de Claude à Mistral (mistral-small-latest), pour un meilleur rapport qualité/prix en français.",
  },
  {
    date: "2026-08-23",
    title: "Lancement",
    description:
      "Première version : agrégation de 12 sources SEO/GEO de référence, résumés générés par IA en français, tagging thématique, scoring d'impact et tendances de la semaine.",
  },
];
