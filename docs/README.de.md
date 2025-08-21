# 🌸 Mizuki  
![Node.js >= 20](https://img.shields.io/badge/node.js-%3E%3D20-brightgreen) 
![pnpm >= 9](https://img.shields.io/badge/pnpm-%3E%3D9-blue) 
![Astro](https://img.shields.io/badge/Astro-5.12.8-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Mizuki Vorschau](../README.webp)

Eine moderne, funktionsreiche statische Blog-Vorlage mit erweiterten Funktionen und schönem Design, erstellt mit [Astro](https://astro.build).

[**🖥️ Live-Demo**](https://mizuki.mysqil.com/)
[**🔧 Offizielle Mizuki-Benutzerdokumentation**](https://docs.mizuki.mysqil.com/)

🌏 README-Sprachen
[**中文**](../README.md) /
[**English**](../README.en.md) /
[**Deutsch**](./README.de.md)

## 🆕 Neues in v3.3
- **Mermaid Syntax-Unterstützung:** Unterstützung für die Mermaid-Diagrammsyntax hinzugefügt, die das direkte Einbetten von Flussdiagrammen, Sequenzdiagrammen, Gantt-Diagrammen usw. in Markdown.
- **Umami Zugriffsstatistik:** Unterstützung für Umami Zugriffsstatistik hinzugefügt, die eine einfache Integration der Website-Verkehrsdatenanalyse ermöglicht.

![Configuration](configuration.svg)

### 🔧 Komponenten-Konfigurationssystem-Refactoring
- **Einheitliche Konfigurationsarchitektur:** Völlig neues modulares Komponenten-Konfigurationssystem mit Unterstützung für dynamisches Komponenten-Management und Reihenfolgen-Konfiguration
- **Konfigurationsgesteuerte Komponenten-Ladung:** Refactoring der SideBar-Komponente zur Implementierung eines vollständig konfigurationsbasierten Komponenten-Lademechanismus
- **Einheitliche Kontrollschalter:** Entfernung der unabhängigen Enable-Schalter für Musik-Player und Ankündigungs-Komponenten, einheitliche Kontrolle durch sidebarLayoutConfig
- **Responsive Layout-Anpassung:** Komponenten unterstützen responsive Layouts und passen die Anzeige automatisch basierend auf dem Gerätetyp an

### 📐 Layout-System-Optimierung
- **Dynamische Sidebar-Positionsanpassung:** Unterstützung für Links-Rechts-Sidebar-Umschaltung mit automatischer Layout-Anpassung
- **Intelligente Artikel-Navigation-Platzierung:** Wenn die Sidebar rechts ist, bewegt sich die Artikel-Navigation automatisch nach links für bessere Leseerfahrung
- **Grid-Layout-Verbesserungen:** Optimierung des CSS-Grid-Layouts zur Lösung von Container-Breiten-Anomalien

### 🎛️ Konfigurationsdatei-Format-Standardisierung
- **Standardisierte Konfigurationsformate:** Erstellung einheitlicher Komponenten-Konfigurationsdatei-Format-Spezifikationen
- **Typsicherheit:** Umfassende TypeScript-Typdefinitionen zur Gewährleistung der Konfigurationstypsicherheit
- **Erweiterbarkeit:** Unterstützung für benutzerdefinierte Komponententypen und Konfigurationsoptionen

### 🧹 Code-Optimierung
- **Test-Datei-Bereinigung:** Entfernung ungenutzter Test-Konfigurationen und Abhängigkeiten zur Reduzierung der Projektgröße
- **Code-Struktur-Optimierung:** Verbesserung der Komponenten-Architektur zur Erhöhung der Code-Wartbarkeit
- **Leistungsverbesserungen:** Optimierung der Komponenten-Ladelogik zur Verbesserung der Seiten-Rendering-Performance

---

## ✨ Funktionen

### 🎨 Design & Benutzeroberfläche
- [x] Erstellt mit [Astro](https://astro.build) und [Tailwind CSS](https://tailwindcss.com)
- [x] Flüssige Animationen und Seitenübergänge mit [Swup](https://swup.js.org/)
- [x] Hell-/Dunkelmodus mit Systemeinstellungserkennung
- [x] Anpassbare Themenfarben und dynamisches Banner-Karussell
- [x] Vollständig responsives Design für alle Geräte
- [x] Schöne Typografie mit JetBrains Mono-Schrift

### 🔍 Inhalt & Suche
- [x] Erweiterte Suchfunktion mit [Pagefind](https://pagefind.app/)
- [x] [Erweiterte Markdown-Funktionen](#-erweiterte-markdown-syntax) mit Syntaxhervorhebung
- [x] Interaktives Inhaltsverzeichnis mit automatischem Scrollen
- [x] RSS-Feed-Generierung
- [x] Lesezeitschätzung
- [x] Beitragskategorisierung und -tagging

### 🌐 Internationalisierung
- [x] **Mehrsprachige Unterstützung** und Echtzeitübersetzung
- [x] **Automatische Spracherkennung** basierend auf Benutzereinstellungen
- [x] **Clientseitige Übersetzung** powered by Edge Translate
- [x] Unterstützung für über 10 Sprachen (EN, ZH-CN, ZH-TW, JA, KO, ES, TH, VI, ID, TR)

### 📱 Spezielle Seiten
- [x] **Anime-Tracking-Seite** - Verfolgen Sie Ihren Anime-Fortschritt mit Bewertungen
- [x] **Freunde-Links-Seite** - Präsentieren Sie die Websites Ihrer Freunde mit schönen Karten
- [x] **Tagebuch/Momente-Seite** - Teilen Sie Lebensmomente wie Social-Media-Posts
- [x] **Archiv-Seite** - Organisierte Timeline-Ansicht der Beiträge
- [x] **Über-Seite** - Anpassbare persönliche Einführung

### 🛠 Technische Funktionen
- [x] **Verbesserte Code-Blöcke** mit [Expressive Code](https://expressive-code.com/)
- [x] **Mathematik-Unterstützung** mit KaTeX-Rendering
- [x] **Bildoptimierung** mit PhotoSwipe-Galerie
- [x] **SEO-Optimierung** mit Sitemap und Meta-Tags
- [x] **Leistungsoptimierung** mit Lazy Loading und Caching
- [x] **Kommentarsystem** bereit für Integration (Twikoo)

## 🚀 Erste Schritte

### 📦 Installation

1. **Repository klonen:**
   ```bash
   git clone https://github.com/matsuzaka-yuki/mizuki.git
   cd mizuki
   ```

2. **Abhängigkeiten installieren:**
   ```bash
   # pnpm installieren (falls nicht bereits installiert)
   npm install -g pnpm
   
   # Projektabhängigkeiten installieren
   pnpm install
   ```

3. **Ihren Blog konfigurieren:**
   - Bearbeiten Sie `src/config.ts`, um Ihre Blog-Einstellungen anzupassen
   - Aktualisieren Sie Site-Informationen, Themenfarben, Banner-Bilder, soziale Links
   - Konfigurieren Sie Übersetzungseinstellungen und spezielle Seitenfunktionen

4. **Entwicklungsserver starten:**
   ```bash
   pnpm dev
   ```
   Ihr Blog wird unter `http://localhost:4321` verfügbar sein

### 📝 Inhaltsverwaltung

- **Neuen Beitrag erstellen:** `pnpm new-post <dateiname>`
- **Beiträge bearbeiten:** Dateien in `src/content/posts/` bearbeiten
- **Seiten anpassen:** Spezielle Seiten in `src/content/spec/` bearbeiten
- **Bilder hinzufügen:** Bilder in `src/assets/` oder `public/` platzieren

### 🚀 Bereitstellung

Stellen Sie Ihren Blog auf statischen Hosting-Plattformen bereit:

- **Vercel:** Verbinden Sie Ihr GitHub-Repository mit Vercel
- **Netlify:** Direkt von GitHub bereitstellen
- **GitHub Pages:** Verwenden Sie den enthaltenen GitHub Actions-Workflow
- **Cloudflare Pages:** Verbinden Sie Ihr Repository

Vergessen Sie nicht, die `site`-URL in `astro.config.mjs` vor der Bereitstellung zu aktualisieren.



## 📝 Beitrags-Frontmatter

```yaml
---
```title: Mein Erster Blog-Beitrag
published: 2023-09-09
description: Dies ist der erste Beitrag meines neuen Astro-Blogs.
image: ./cover.jpg
tags: [Foo, Bar]
category: Frontend
draft: false
pinned: false
---
```

### Frontmatter-Felder

- **title**: Beitragstitel (erforderlich)
- **published**: Veröffentlichungsdatum (erforderlich)
- **description**: Beitragsbeschreibung für SEO und Vorschauen
- **image**: Cover-Bildpfad (relativ zur Beitragsdatei)
- **tags**: Array von Tags für die Kategorisierung
- **category**: Beitragskategorie
- **draft**: Auf `true` setzen, um Beitrag in der Produktion zu verbergen
- **pinned**: Auf `true` setzen, um Beitrag oben in Listen anzuheften

### Angeheftete Beiträge

Das `pinned`-Feld ermöglicht es Ihnen, wichtige Beiträge oben in Ihrem Blog anzuheften. Angeheftete Beiträge erscheinen immer vor regulären Beiträgen, unabhängig von ihrem Veröffentlichungsdatum.

**Verwendung:**
```yaml
pinned: true  # Diesen Beitrag oben anheften
pinned: false # Regulärer Beitrag (Standard)
```

**Sortierverhalten:**
1. Angeheftete Beiträge erscheinen zuerst, sortiert nach Veröffentlichungsdatum (neueste zuerst)
2. Reguläre Beiträge folgen, sortiert nach Veröffentlichungsdatum (neueste zuerst)

## 🧩 Erweiterte Markdown-Syntax

Mizuki unterstützt erweiterte Markdown-Funktionen über das standardmäßige GitHub Flavored Markdown hinaus:

### 📝 Verbessertes Schreiben
- **Callouts:** Erstellen Sie schöne Callout-Boxen mit `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`, etc.
- **Mathematische Gleichungen:** Schreiben Sie LaTeX-Mathematik mit `$inline$` und `$$block$$` Syntax
- **Code-Hervorhebung:** Erweiterte Syntaxhervorhebung mit Zeilennummern und Kopier-Buttons
- **GitHub-Karten:** Fügen Sie Repository-Karten mit `::github{repo="user/repo"}` ein

### 🎨 Visuelle Elemente
- **Bildgalerien:** Automatische PhotoSwipe-Integration für Bildbetrachtung
- **Einklappbare Abschnitte:** Erstellen Sie erweiterbare Inhaltsblöcke
- **Benutzerdefinierte Komponenten:** Verwenden Sie spezielle Direktiven für erweiterten Inhalt

### 📊 Inhaltsorganisation
- **Inhaltsverzeichnis:** Automatisch aus Überschriften generiert, mit flüssigem Scrollen
- **Lesezeit:** Automatisch berechnet und angezeigt
- **Beitrags-Metadaten:** Reichhaltige Frontmatter-Unterstützung mit Kategorien und Tags

## ⚡ Befehle

Alle Befehle werden vom Projektstamm ausgeführt:

| Befehl                     | Aktion                                                    |
|:---------------------------|:----------------------------------------------------------|
| `pnpm install`             | Abhängigkeiten installieren                               |
| `pnpm dev`                 | Lokalen Entwicklungsserver auf `localhost:4321` starten   |
| `pnpm build`               | Ihre Produktionsseite nach `./dist/` erstellen           |
| `pnpm preview`             | Ihren Build lokal vor der Bereitstellung vorschauen      |
| `pnpm check`               | Astro-Überprüfung auf Fehler ausführen                   |
| `pnpm format`              | Code mit Biome formatieren                                |
| `pnpm lint`                | Code-Probleme linten und beheben                          |
| `pnpm new-post <dateiname>` | Neuen Blog-Beitrag erstellen                            |
| `pnpm astro ...`           | Astro CLI-Befehle ausführen                              |

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](../LICENSE)-Datei für Details.

## 🙏 Danksagungen

- Basierend auf der ursprünglichen [Fuwari](https://github.com/saicaca/fuwari)-Vorlage
- Erstellt mit [Astro](https://astro.build) und [Tailwind CSS](https://tailwindcss.com)
- Inspiriert von [Yukina](https://github.com/WhitePaper233/yukina) - eine schöne und elegante Blog-Vorlage
- Übersetzung unterstützt von [translate](https://gitee.com/mail_osc/translate) - AI i18n Lösung für automatische HTML-Übersetzung
- Icons von [Iconify](https://iconify.design/)

### Besonderer Dank

- **[Yukina](https://github.com/WhitePaper233/yukina)** - Danke für die Bereitstellung von Design-Inspiration und Ideen, die bei der Gestaltung dieses Projekts geholfen haben. Yukina ist eine elegante Blog-Vorlage, die exzellente Design-Prinzipien und Benutzererfahrung demonstriert.
- **[translate](https://gitee.com/mail_osc/translate)** - Danke für die Bereitstellung einer innovativen KI-gestützten i18n-Lösung, die automatische HTML-Übersetzung mit nur zwei Zeilen JavaScript ermöglicht. Dieses Open-Source-Tool macht mehrsprachige Unterstützung unglaublich einfach und effizient.

---

⭐ Erwägen Sie, einen Stern zu geben, wenn Sie dieses Projekt nützlich finden!