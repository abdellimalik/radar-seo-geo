# Le Radar — veille SEO & GEO

Plateforme de veille quotidienne SEO/GEO : collecte automatique de 12
sources de référence, résumé, tagging thématique, scoring d'impact et
détection de tendances par IA. Voir [PRODUCT.md](./PRODUCT.md) pour le
cadrage produit complet et [DESIGN.md](./DESIGN.md) pour le système de
design.

> **Nom provisoire** — "Le Radar" est un nom de travail, pas une décision
> de marque. Renommez-le librement (metadata dans `src/app/layout.tsx`,
> `<h1>` dans `src/components/Masthead.tsx`).

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
pour Supabase ; il manque encore `ANTHROPIC_API_KEY` pour activer
l'enrichissement (voir plus bas).

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

1. Créez un dépôt GitHub et poussez ce projet (`git init` a déjà été fait
   localement).
2. Sur [vercel.com/new](https://vercel.com/new), importez le dépôt.
3. Renseignez les variables d'environnement ci-dessus dans les
   Project Settings de Vercel (Production + Preview).
4. Déployez.

## Collecte automatique (plusieurs fois par jour)

La route `/api/collect` (protégée par `CRON_SECRET`) déclenche la
collecte RSS + enrichissement IA pour les 12 sources actives.

Deux options, **choisissez-en une seule** pour éviter d'appeler l'IA deux
fois pour rien :

- **`vercel.json`** (inclus, `0 */4 * * *`, 6 fois/jour) — nécessite un
  plan **Vercel Pro** : le plan Hobby limite les cron jobs à une
  exécution par jour.
- **`.github/workflows/collect.yml`** (inclus, 4 fois/jour) — fonctionne
  sur un plan Vercel Hobby gratuit. Ajoutez dans les secrets du dépôt
  GitHub : `APP_URL` (l'URL de votre déploiement Vercel) et
  `CRON_SECRET` (la même valeur que sur Vercel).

Si vous restez sur Vercel Hobby, supprimez le bloc `crons` de
`vercel.json` pour éviter qu'il ne s'exécute une fois par jour en plus du
workflow GitHub.

## Gérer les sources

Les sources suivies sont en base (table `sources`), pas dans le code.
Pour en ajouter, désactiver ou corriger une URL de flux RSS cassée,
passez par le SQL Editor de Supabase ou l'API :

```sql
insert into public.sources (slug, name, site_url, feed_url, language)
values ('mon-slug', 'Mon Nom', 'https://...', 'https://.../feed', 'fr');
```

## Base de données initiale

Le projet Supabase contenait déjà un schéma d'un projet antérieur
(`raw_items`, `classified_items`, etc.) : il a été supprimé avec
confirmation avant de créer le schéma actuel. Les 36 premiers articles
ont été collectés et enrichis manuellement (avant la mise en place de la
clé Mistral) pour permettre de vérifier le rendu ; la prochaine exécution
de `/api/collect` prendra le relais avec l'enrichissement automatique via
Mistral.
