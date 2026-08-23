import type { Metadata } from "next";
import Script from "next/script";
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
  title: "Radar S&GEO",
  description:
    "Briefing quotidien des nouveautés SEO et GEO, résumé et hiérarchisé par IA à partir des meilleures sources du secteur.",
};

const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        {/*
          THESIS: A premium, brand-forward wire-service briefing for
          SEO/GEO — density and hierarchy over raw chronology, now carried
          by a saturated dark register instead of a quiet newsprint one.
          OWN-WORLD: deep navy ground (#0A0F27) with soft brand-color bloom
          atmosphere, near-white ink, a purple→indigo→blue gradient
          reserved for borders/badges/active-states (never text), Archivo
          headlines, Inter body, six luminous named hues for topics. Dark
          is the pinned default; a light variant of the same identity is
          available via the toggle, not a return to the v1 editorial world.
          STORY: the reader scans the lead briefing, sees urgent vs routine
          at a glance via the red/orange impact badge, filters by
          color-coded theme chips, and spots the week's trending topic
          without reading every article.
          FIRST VIEWPORT: masthead (product name + nav + theme toggle) +
          lead story with a static gradient ring, then a river of cards
          whose gradient ring appears on hover, trending rail alongside.
          FORM: redesign, brief-pinned by the user (exact hex values given,
          explicit "premium/web3" direction, gradient borders requested) —
          supersedes the v1 canon editorial world. Recorded in PRODUCT.md
          and DESIGN.md.
          FINISH: unreviewed and undocumented is unfinished; this build ends
          with the finish review, the verdict, DESIGN.md, and every shipping
          raster carrying its provenance.
        */}
        {children}
      </body>
    </html>
  );
}
