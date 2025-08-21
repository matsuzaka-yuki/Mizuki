# 🌸 Mizuki  
![Node.js >= 20](https://img.shields.io/badge/node.js-%3E%3D20-brightgreen) 
![pnpm >= 9](https://img.shields.io/badge/pnpm-%3E%3D9-blue) 
![Astro](https://img.shields.io/badge/Astro-5.12.8-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Aperçu de Mizuki](../README.webp)

Un modèle de blog statique moderne et riche en fonctionnalités avec des fonctionnalités avancées et un design magnifique, construit avec [Astro](https://astro.build).

[**🖥️ Démo en direct**](https://mizuki.mysqil.com/)
[**🔧 Documentation utilisateur officielle de Mizuki**](https://docs.mizuki.mysqil.com/)

🌏 Langues README
[**中文**](../README.md) /
[**English**](../README.en.md) /
[**Français**](./README.fr.md)

## 🆕 Nouveautés de la v3.3
- **Support de la syntaxe Mermaid :** Ajout du support de la syntaxe de diagramme Mermaid, permettant l'intégration directe de diagrammes de flux, de diagrammes de séquence, de diagrammes de Gantt, etc., dans Markdown.
- **Statistiques Umami :** Ajout du support des statistiques Umami, permettant une intégration facile de l'analyse des données de trafic du site web.

![Configuration](configuration.svg)

### 🔧 Refactorisation du Système de Configuration des Composants
- **Architecture de Configuration Unifiée :** Tout nouveau système de configuration de composants modulaire avec support pour la gestion dynamique des composants et la configuration de l'ordre
- **Chargement de Composants Piloté par Configuration :** Refactorisation du composant SideBar pour implémenter un mécanisme de chargement de composants entièrement basé sur la configuration
- **Commutateurs de Contrôle Unifiés :** Suppression des commutateurs d'activation indépendants pour le lecteur de musique et les composants d'annonce, contrôle unifié par sidebarLayoutConfig
- **Adaptation de Mise en Page Responsive :** Les composants supportent les mises en page responsives et ajustent automatiquement l'affichage selon le type d'appareil

### 📐 Optimisation du Système de Mise en Page
- **Ajustement Dynamique de Position de Barre Latérale :** Support pour la commutation gauche-droite de la barre latérale avec adaptation automatique de la mise en page
- **Placement Intelligent de Navigation d'Article :** Quand la barre latérale est à droite, la navigation d'article se déplace automatiquement à gauche pour une meilleure expérience de lecture
- **Améliorations de Mise en Page Grid :** Optimisation de la mise en page CSS Grid pour résoudre les anomalies de largeur de conteneur

### 🎛️ Standardisation du Format de Fichier de Configuration
- **Formats de Configuration Standardisés :** Création de spécifications de format de fichier de configuration de composants unifiées
- **Sécurité de Type :** Définitions de types TypeScript complètes pour assurer la sécurité de type de configuration
- **Extensibilité :** Support pour les types de composants personnalisés et les options de configuration

### 🧹 Optimisation du Code
- **Nettoyage des Fichiers de Test :** Suppression des configurations de test inutilisées et des dépendances pour réduire la taille du projet
- **Optimisation de Structure de Code :** Amélioration de l'architecture des composants pour augmenter la maintenabilité du code
- **Améliorations de Performance :** Optimisation de la logique de chargement des composants pour améliorer les performances de rendu de page

---

## ✨ Fonctionnalités

### 🎨 Design & Interface
- [x] Construit avec [Astro](https://astro.build) et [Tailwind CSS](https://tailwindcss.com)
- [x] Animations fluides et transitions de page avec [Swup](https://swup.js.org/)
- [x] Mode clair/sombre avec détection des paramètres système
- [x] Couleurs de thème personnalisables et carrousel de bannières dynamique
- [x] Design entièrement responsive pour tous les appareils
- [x] Belle typographie avec la police JetBrains Mono

### 🔍 Contenu & Recherche
- [x] Fonctionnalité de recherche avancée avec [Pagefind](https://pagefind.app/)
- [x] [Fonctionnalités Markdown étendues](#-syntaxe-markdown-étendue) avec coloration syntaxique
- [x] Table des matières interactive avec défilement automatique
- [x] Génération de flux RSS
- [x] Estimation du temps de lecture
- [x] Catégorisation et étiquetage des articles

### 🌐 Internationalisation
- [x] **Support multilingue** et traduction en temps réel
- [x] **Détection automatique de la langue** basée sur les préférences utilisateur
- [x] **Traduction côté client** alimentée par Edge Translate
- [x] Support de plus de 10 langues (EN, ZH-CN, ZH-TW, JA, KO, ES, TH, VI, ID, TR)

### 📱 Pages Spéciales
- [x] **Page de suivi d'anime** - Suivez vos progrès de visionnage d'anime avec des évaluations
- [x] **Page de liens d'amis** - Présentez les sites web de vos amis avec de belles cartes
- [x] **Page journal/moments** - Partagez les moments de la vie comme des posts sur les réseaux sociaux
- [x] **Page d'archives** - Vue chronologique organisée des articles
- [x] **Page à propos** - Présentation personnelle personnalisable

### 🛠 Fonctionnalités Techniques
- [x] **Blocs de code améliorés** avec [Expressive Code](https://expressive-code.com/)
- [x] **Support mathématique** avec rendu KaTeX
- [x] **Optimisation d'images** avec galerie PhotoSwipe
- [x] **Optimisation SEO** avec sitemap et méta-tags
- [x] **Optimisation des performances** avec chargement paresseux et mise en cache
- [x] **Système de commentaires** prêt pour l'intégration (Twikoo)

## 🚀 Commencer

### 📦 Installation

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/matsuzaka-yuki/mizuki.git
   cd mizuki
   ```

2. **Installer les dépendances :**
   ```bash
   # Installer pnpm (si pas déjà installé)
   npm install -g pnpm
   
   # Installer les dépendances du projet
   pnpm install
   ```

3. **Configurer votre blog :**
   - Modifiez `src/config.ts` pour personnaliser les paramètres de votre blog
   - Mettez à jour les informations du site, couleurs de thème, images de bannière, liens sociaux
   - Configurez les paramètres de traduction et les fonctionnalités des pages spéciales

4. **Démarrer le serveur de développement :**
   ```bash
   pnpm dev
   ```
   Votre blog sera disponible sur `http://localhost:4321`

### 📝 Gestion du Contenu

- **Créer un nouvel article :** `pnpm new-post <nom-fichier>`
- **Modifier des articles :** Modifiez les fichiers dans `src/content/posts/`
- **Personnaliser les pages :** Modifiez les pages spéciales dans `src/content/spec/`
- **Ajouter des images :** Placez les images dans `src/assets/` ou `public/`

### 🚀 Déploiement

Déployez votre blog sur des plateformes d'hébergement statique :

- **Vercel :** Connectez votre dépôt GitHub à Vercel
- **Netlify :** Déployez directement depuis GitHub
- **GitHub Pages :** Utilisez le workflow GitHub Actions inclus
- **Cloudflare Pages :** Connectez votre dépôt

N'oubliez pas de mettre à jour l'URL `site` dans `astro.config.mjs` avant le déploiement.

>

## 📝 Front Matter des Articles

```yaml
---
title: Mon Premier Article de Blog
published: 2023-09-09
description: Ceci est le premier article de mon nouveau blog Astro.
image: ./cover.jpg
tags: [Foo, Bar]
category: Frontend
draft: false
pinned: false
---
```

### Champs du Front Matter

- **title** : Titre de l'article (requis)
- **published** : Date de publication (requise)
- **description** : Description de l'article pour le SEO et les aperçus
- **image** : Chemin de l'image de couverture (relatif au fichier de l'article)
- **tags** : Tableau d'étiquettes pour la catégorisation
- **category** : Catégorie de l'article
- **draft** : Définir à `true` pour masquer l'article en production
- **pinned** : Définir à `true` pour épingler l'article en haut des listes

### Articles Épinglés

Le champ `pinned` vous permet d'épingler des articles importants en haut de votre blog. Les articles épinglés apparaîtront toujours avant les articles réguliers, indépendamment de leur date de publication.

**Utilisation :**
```yaml
pinned: true  # Épingler cet article en haut
pinned: false # Article régulier (par défaut)
```

**Comportement de tri :**
1. Les articles épinglés apparaissent en premier, triés par date de publication (plus récent en premier)
2. Les articles réguliers suivent, triés par date de publication (plus récent en premier)

## 🧩 Syntaxe Markdown Étendue

Mizuki prend en charge des fonctionnalités Markdown améliorées au-delà du GitHub Flavored Markdown standard :

### 📝 Écriture Améliorée
- **Callouts :** Créez de belles boîtes de callout avec `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`, etc.
- **Équations mathématiques :** Écrivez des mathématiques LaTeX avec la syntaxe `$inline$` et `$$block$$`
- **Mise en évidence du code :** Coloration syntaxique avancée avec numéros de ligne et boutons de copie
- **Cartes GitHub :** Insérez des cartes de dépôt avec `::github{repo="user/repo"}`

### 🎨 Éléments Visuels
- **Galeries d'images :** Intégration automatique de PhotoSwipe pour la visualisation d'images
- **Sections pliables :** Créez des blocs de contenu extensibles
- **Composants personnalisés :** Utilisez des directives spéciales pour un contenu enrichi

### 📊 Organisation du Contenu
- **Table des matières :** Générée automatiquement à partir des en-têtes, avec défilement fluide
- **Temps de lecture :** Calculé et affiché automatiquement
- **Métadonnées d'article :** Support riche du front matter avec catégories et étiquettes

## ⚡ Commandes

Toutes les commandes sont exécutées depuis la racine du projet :

| Commande                   | Action                                                    |
|:---------------------------|:----------------------------------------------------------|
| `pnpm install`             | Installe les dépendances                                  |
| `pnpm dev`                 | Démarre le serveur de développement local sur `localhost:4321` |
| `pnpm build`               | Construit votre site de production vers `./dist/`         |
| `pnpm preview`             | Prévisualise votre build localement, avant déploiement    |
| `pnpm check`               | Exécute la vérification Astro pour les erreurs           |
| `pnpm format`              | Formate le code avec Biome                               |
| `pnpm lint`                | Lint et corrige les problèmes de code                    |
| `pnpm new-post <nom-fichier>` | Crée un nouvel article de blog                        |
| `pnpm astro ...`           | Exécute les commandes CLI d'Astro                        |

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](../LICENSE) pour plus de détails.

## 🙏 Remerciements

- Basé sur le modèle original [Fuwari](https://github.com/saicaca/fuwari)
- Construit avec [Astro](https://astro.build) et [Tailwind CSS](https://tailwindcss.com)
- Inspiré par [Yukina](https://github.com/WhitePaper233/yukina) - un modèle de blog beau et élégant
- Traduction alimentée par [translate](https://gitee.com/mail_osc/translate) - solution AI i18n pour la traduction automatique HTML
- Icônes par [Iconify](https://iconify.design/)

### Remerciements Spéciaux

- **[Yukina](https://github.com/WhitePaper233/yukina)** - Merci de fournir l'inspiration et les idées de design qui ont aidé à façonner ce projet. Yukina est un modèle de blog élégant qui démontre d'excellents principes de design et d'expérience utilisateur.
- **[translate](https://gitee.com/mail_osc/translate)** - Merci de fournir une solution i18n innovante alimentée par l'IA qui permet la traduction automatique HTML avec seulement deux lignes de JavaScript. Cet outil open source rend le support multilingue incroyablement simple et efficace.

---

⭐ Considérez donner une étoile si vous trouvez ce projet utile !