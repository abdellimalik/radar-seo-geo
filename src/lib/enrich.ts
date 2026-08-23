import { Mistral } from "@mistralai/mistralai";
import { THEMES } from "./themes";

const THEME_SLUGS = THEMES.map((t) => t.slug);

export interface Enrichment {
  title_fr: string;
  summary_fr: string;
  themes: string[];
  impact_level: "majeur" | "mineur";
  impact_reason: string;
}

const SYSTEM_PROMPT = `Tu es l'analyste éditorial d'une veille SEO/GEO (référencement naturel et optimisation pour les moteurs de réponse IA). Pour chaque article fourni (titre + extrait, en anglais ou en français), réponds UNIQUEMENT avec un objet JSON strict, sans texte autour, au format :
{"title_fr": string, "summary_fr": string, "themes": string[], "impact_level": "majeur" | "mineur", "impact_reason": string}

Règles :
- title_fr : traduction ou adaptation naturelle du titre en français, dans le ton d'un titre de presse (percutant, pas littéral mot à mot). Si le titre est déjà en français, corrige-le seulement si besoin. Ne rallonge pas le titre.
- summary_fr : 2 à 3 phrases en français, denses et factuelles, même si la source est en anglais. Pas de formules creuses ("cet article explique que..."). N'utilise QUE les informations présentes dans le titre et l'extrait fournis : n'invente aucun fait, chiffre, date ou contexte qui n'y figure pas, même s'il te semble plausible.
- themes : 1 à 2 valeurs parmi exactement ${JSON.stringify(THEME_SLUGS)}.
- impact_level : "majeur" seulement si l'information change concrètement le travail quotidien d'une équipe SEO/GEO (core update Google confirmé, changement d'algorithme majeur, nouvelle fonctionnalité IA générative affectant la visibilité, changement réglementaire). Sinon "mineur".
- impact_reason : une phrase courte justifiant le niveau d'impact choisi.`;

export async function enrichArticle(input: {
  title: string;
  excerpt: string | null;
}): Promise<Enrichment> {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    throw new Error("MISTRAL_API_KEY is not set");
  }

  const client = new Mistral({ apiKey });
  const response = await client.chat.complete({
    model: "mistral-small-latest",
    maxTokens: 500,
    responseFormat: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Titre : ${input.title}\nExtrait : ${input.excerpt ?? "(aucun extrait disponible)"}`,
      },
    ],
  });

  const content = response.choices?.[0]?.message?.content;
  const text = Array.isArray(content)
    ? content.map((c) => ("text" in c ? c.text : "")).join("")
    : content;
  if (!text) {
    throw new Error("Réponse IA vide");
  }

  const raw = text.trim().replace(/^```(json)?/i, "").replace(/```$/, "").trim();
  const parsed = JSON.parse(raw) as Enrichment;
  return {
    title_fr: parsed.title_fr,
    summary_fr: parsed.summary_fr,
    themes: parsed.themes.filter((t) => THEME_SLUGS.includes(t as never)),
    impact_level: parsed.impact_level === "majeur" ? "majeur" : "mineur",
    impact_reason: parsed.impact_reason,
  };
}
