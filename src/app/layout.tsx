import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Le Radar — veille SEO & GEO",
  description:
    "Briefing quotidien des nouveautés SEO et GEO, résumé et hiérarchisé par IA à partir des meilleures sources du secteur.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {/*
          THESIS: A wire-service briefing for SEO/GEO — density and editorial
          hierarchy over raw chronology, never a generic SaaS dashboard.
          OWN-WORLD: cool newsprint-gray ground, near-black ink, condensed
          Archivo headlines at tight tracking, Inter body, one committed
          press-red for "impact majeur", six named muted hues for topics,
          byline metadata rows — never a kicker above the headline.
          STORY: the reader scans the lead briefing, sees urgent vs routine
          at a glance via the impact badge, filters by theme/source, and
          spots the week's trending topic without reading every article.
          FIRST VIEWPORT: masthead + trending-topics rail + full-width lead
          story, then a river of enriched cards (headline-forward, byline
          and tags below, priority badge inline).
          FORM: standing exit (canon), confirmed by the user — editorial
          wire-service register, craft bar = Search Engine Land, Search
          Engine Journal, SERoundtable, Abondance, Axios. No direction roll:
          canon path taken per new-work.md, recorded in PRODUCT.md.
          FINISH: unreviewed and undocumented is unfinished; this build ends
          with the finish review, the verdict, DESIGN.md, and every shipping
          raster carrying its provenance.
        */}
        {children}
      </body>
    </html>
  );
}
