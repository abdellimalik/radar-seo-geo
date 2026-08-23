# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) pour le front, Supabase (Postgres) pour la donnée, déploiement Vercel avec Vercel Cron pour la collecte planifiée. Choix proposé par l'assistant et explicitement confirmé par l'utilisateur (pas délégué). Moteur d'enrichissement IA : Mistral (`mistral-small-latest`), choisi par l'utilisateur pour son rapport qualité/prix en français après comparaison de plusieurs fournisseurs (Anthropic initialement implémenté, remplacé).

## Users

Utilisateur principal : un professionnel SEO/GEO (l'utilisateur lui-même), en usage solo pour l'instant, sans authentification. Le produit est pensé pour pouvoir servir plus tard une équipe SEO/GEO élargie, mais ce n'est pas un engagement actuel.

## Product Purpose

Automatiser la veille quotidienne SEO/GEO : collecter automatiquement les nouveautés publiées par des sources de référence (SEO classique et GEO/optimisation pour les moteurs génératifs), puis les enrichir par IA (résumé, tag thématique, score d'impact, tendances) pour que l'utilisateur gagne du temps de lecture et priorise ce qui a un réel impact business/algorithmique, plutôt que de parcourir chaque source manuellement.

## Positioning

Contrairement à un agrégateur RSS brut, la plateforme hiérarchise l'information par impact perçu (majeur — ex. core update Google — vs mineur), la classe par thème (Core Update, IA/GEO, Netlinking, Technique, Contenu, Local SEO...), et fait ressortir les tendances émergentes sur la période (sujets qui reviennent le plus). C'est un agrégateur augmenté par IA, pas un simple flux chronologique.

## Operating Context

Consultation quotidienne (une collecte planifiée par jour à 6h UTC via Vercel Cron — limite du plan Vercel Hobby, qui ne permet qu'une exécution/jour ; une collecte plus fréquente nécessiterait un plan Pro ou un déclencheur externe). Accès direct sans login. Usage professionnel individuel dans un contexte de veille concurrentielle et technique SEO/GEO. Résumés systématiquement rédigés en français, y compris pour les sources anglophones.

## Capabilities and Constraints

- Sources initiales obligatoires : Search Engine Land, Search Engine Journal, Search Engine Roundtable, Abondance.
- Sources élargies validées : Google Search Central Blog, Moz Blog, Ahrefs Blog, Backlinko, iPullRank (Mike King), Growth Memo (Kevin Indig), Onely Blog, Aleyda Solis — soit 12 sources au total au lancement (Previsible initialement envisagée, remplacée par Aleyda Solis : flux RSS mort/bloqué).
- Enrichissement IA : résumé en français (2-3 lignes), tagging thématique, scoring d'impact/priorité, détection de tendances. Moteur : Mistral (`mistral-small-latest`), clé API fournie par l'utilisateur et configurée.
- Pas d'alertes email/Slack pour le moment (fonctionnalité écartée à ce stade).
- Pas d'authentification pour le moment (accès direct à l'URL).
- Base de données : projet Supabase `wxzokuqeveaallgerdgx` (région eu-west-1), réactivé, migré et en production.
- Dépôt de code : [github.com/abdellimalik/radar-seo-geo](https://github.com/abdellimalik/radar-seo-geo), poussé avec l'accord explicite de l'utilisateur (authentification via clé SSH dédiée).
- Fréquence de collecte : une fois par jour (6h UTC), contrainte par le plan Vercel Hobby de l'utilisateur — la demande initiale de "plusieurs fois par jour" est un objectif reporté, pas abandonné (voir Stack).

## Brand Commitments

Aucun nom de marque ni logo définis à ce stade. Direction visuelle standing (chemin canon, confirmé explicitement par l'utilisateur, pas de monde visuel inventé) : registre éditorial/magazine, calé sur le niveau de craft de Search Engine Land, Search Engine Journal, Search Engine Roundtable, Abondance.com, et Axios (format "smart brevity" : titres denses, cartes courtes scannables, tags colorés par thème — cohérent avec le scoring/tagging IA du produit). Thème par défaut clair, chaleureux, type presse/papier, lisibilité éditoriale maximale ; un mode sombre optionnel peut être ajouté mais n'est pas le défaut.

## Evidence on Hand

36 articles réels collectés depuis les 12 sources et enrichis (manuellement pour le lot initial, automatiquement via Mistral pour les collectes suivantes). Système de design documenté dans DESIGN.md. Exemples de sites de référence donnés par l'utilisateur pour le fond (pas le style) : searchengineland.com, searchenginejournal.com, seroundtable.com, abondance.com.

## Product Principles

1. Priorité au signal, pas au volume — hiérarchiser par impact plutôt qu'afficher tout par ordre chronologique brut.
2. Lecture rapide — résumés courts et scannables en quelques secondes par article, en français.
3. Fraîcheur avant tout — collecte quotidienne pour ne pas rater une actualité algorithmique majeure ; objectif à terme de collectes plus fréquentes si le plan d'hébergement évolue.
4. Diversité et neutralité des sources — mix de sources US et FR, généralistes SEO et spécialisées GEO, sans dépendre d'un seul point de vue éditorial.
