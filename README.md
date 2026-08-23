# Radar S&GEO

Plateforme de veille quotidienne SEO/GEO : collecte automatique de 12
sources de référence, résumé et titres traduits en français, tagging
thématique, scoring d'impact et détection de tendances par IA. Voir
[PRODUCT.md](./PRODUCT.md) pour le cadrage produit complet et
[DESIGN.md](./DESIGN.md) pour le système de design.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS 4)
- **Supabase** (Postgres) — projet `wxzokuqeveaallgerdgx`, déjà réactivé
  et migré (tables `sources`, `articles`, `digest_runs`)
- **Mistral AI** (`mistral-small-latest`) pour l'enrichissement IA
  (résumé français, tags, score d'impact) — choisi pour son excellent
  rapport qualité/prix en français
- **Vercel** pour le déploiement et le cron de collecte

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) (ou le port indiqué).
Les variables d'environnement sont déjà pré-remplies dans `.env.local`
pour Supabase et Mistral.

## Variables d'environnement

Copiez `.env.example` si besoin. Détail des clés :

| Variable | Où la trouver | Sensible ? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | déjà renseignée | non |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | déjà renseignée (clé publique, lecture seule via RLS) | non |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → `service_role` | **oui**, jamais exposée au client |
| `MISTRAL_API_KEY` | [console.mistral.ai](https://console.mistral.ai) | **oui** |
| `CRON_SECRET` | générez une chaîne aléatoire (ex: `openssl rand -hex 32`) | **oui** |

Sans `MISTRAL_API_KEY`, la collecte continue de fonctionner (les
articles sont récupérés) mais restent sans résumé français ni tag —
l'UI affiche alors l'extrait original en repli.

## Déployer sur Vercel

Le dépôt est sur [github.com/abdellimalik/radar-seo-geo](https://github.com/abdellimalik/radar-seo-geo)
et déjà connecté à Vercel : tout push sur `main` redéploie automatiquement.
Pour un nouveau déploiement depuis zéro : importez le dépôt sur
[vercel.com/new](https://vercel.com/new), renseignez les variables
d'environnement ci-dessus dans les Project Settings (Production +
Preview), puis déployez.

## Collecte automatique (une fois par jour)

La route `/api/collect` (protégée par `CRON_SECRET`) déclenche la
collecte RSS + enrichissement IA pour les 12 sources actives.

`vercel.json` déclenche cette route tous les jours à 6h UTC (~8h à Paris
en été, 7h en hiver) via Vercel Cron — compatible avec le plan **Hobby**
gratuit, qui limite les cron jobs à une exécution par jour.

Pour repasser à plusieurs collectes par jour plus tard, deux voies :
passer au plan **Vercel Pro** (~20$/mois, cron jobs illimités en
fréquence) et resserrer le `schedule` dans `vercel.json` (ex:
`"0 */4 * * *"` pour 6 fois/jour) ; ou déclencher `/api/collect` depuis
un service de cron externe gratuit (GitHub Actions, cron-job.org...) en
lui passant l'en-tête `Authorization: Bearer <CRON_SECRET>`.

Pour déclencher une collecte manuellement à tout moment (test, rattrapage) :

```bash
curl -H "Authorization: Bearer <CRON_SECRET>" https://votre-app.vercel.app/api/collect
```

## Gérer les sources

Les sources suivies sont en base (table `sources`), pas dans le code.
Pour en ajouter, désactiver ou corriger une URL de flux RSS cassée,
passez par le SQL Editor de Supabase ou l'API :

```sql
insert into public.sources (slug, name, site_url, feed_url, language)
values ('mon-slug', 'Mon Nom', 'https://...', 'https://.../feed', 'fr');
```

## Design & changelog

Palette et système de design documentés dans [DESIGN.md](./DESIGN.md) :
thème sombre par défaut avec bascule vers un thème clair (bouton dans le
masthead), dégradé de marque (`#6B0AB8 → #340DA4 → #476AED`) réservé
aux bordures/badges/états actifs. La page [`/changelog`](./src/app/changelog/page.tsx)
liste les évolutions produit ; ajoutez une entrée dans
[`src/lib/changelog.ts`](./src/lib/changelog.ts) à chaque changement
visible pour l'utilisateur. **Le changelog est lu par l'utilisateur** :
rédigez chaque entrée du point de vue du bénéfice obtenu ("votre fil est
à jour dès le matin"), jamais comme un journal technique interne (pas de
mention de plan d'hébergement, de fournisseur IA ou de contrainte
d'implémentation).

## Base de données initiale

Le projet Supabase contenait déjà un schéma d'un projet antérieur
(`raw_items`, `classified_items`, etc.) : il a été supprimé avec
confirmation avant de créer le schéma actuel. Les 36 premiers articles
ont été collectés et enrichis manuellement (avant la mise en place de la
clé Mistral) pour permettre de vérifier le rendu ; la prochaine exécution
de `/api/collect` prendra le relais avec l'enrichissement automatique via
Mistral.
