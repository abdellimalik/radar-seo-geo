export interface ChangelogEntry {
  date: string;
  title: string;
  description: string;
}

// Newest first. Add an entry here whenever a user-visible change ships —
// write it for the reader (what's better for them now), not as an
// engineering log of what was implemented.
export const CHANGELOG: ChangelogEntry[] = [
  {
    date: "2026-08-24",
    title: "Des étiquettes plus lisibles et un thème clair",
    description:
      "Chaque thématique a désormais sa propre couleur, aussi bien dans les filtres que sur les articles, pour repérer un sujet en un coup d'œil. Le badge \"Impact fort\" passe au rouge pour un signal plus intuitif. Et un bouton dans l'en-tête permet de basculer entre thème sombre et thème clair selon vos préférences.",
  },
  {
    date: "2026-08-23",
    title: "Nouvelle identité et titres traduits en français",
    description:
      "Radar S&GEO change de nom et de look avec une nouvelle identité visuelle premium. Surtout : tous les titres d'articles sont désormais traduits en français, même lorsque la source est anglophone, pour un fil encore plus rapide à parcourir.",
  },
  {
    date: "2026-08-23",
    title: "Un point complet chaque matin",
    description:
      "La collecte automatique s'exécute désormais tous les jours à 6h : votre fil est à jour dès le début de la journée, sans avoir à vérifier chaque source une par une. Des collectes plus fréquentes arriveront prochainement.",
  },
  {
    date: "2026-08-23",
    title: "Résumés IA plus fiables",
    description:
      "Les résumés générés automatiquement s'en tiennent désormais strictement aux informations présentes dans l'article source, sans ajouter de détail ou de contexte non vérifié.",
  },
  {
    date: "2026-08-23",
    title: "Lancement de Radar S&GEO",
    description:
      "Première version : agrégation de 12 sources SEO et GEO de référence, résumés générés par IA en français, classement par thème, score d'impact pour repérer l'essentiel en un coup d'œil, et tendances de la semaine.",
  },
];
