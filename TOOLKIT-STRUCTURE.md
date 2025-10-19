# 📁 Section Creation Toolkit - Datei-Struktur

```
AE-Theme/
│
├── 📚 DOKUMENTATION (Start hier!)
│   ├── README-SECTION-TOOLS.md          ⭐ Master-Übersicht - START HIER!
│   ├── SECTION-CREATION-GUIDE.md        📖 Quick Start & Best Practices
│   ├── SHOPIFY-SECTION-PROMPT.md        📕 Vollständige Dokumentation (1200 Zeilen)
│   ├── SECTION-PROMPT-COMPACT.md        🎯 COPY-PASTE PROMPT (200 Zeilen) - DAILY USE!
│   └── TOOLKIT-STRUCTURE.md             📁 Diese Datei - Struktur-Übersicht
│
├── 🎨 TEMPLATES (Kopieren & Anpassen)
│   ├── SECTION-TEMPLATE.liquid          💧 Vollständige Section Template
│   ├── section-template.js              ⚡ JavaScript Template
│   └── section-template.css             🎨 CSS Template (BEM + Responsive)
│
├── 📂 sections/ (Deine echten Sections)
│   ├── ae-header.liquid
│   ├── ae-announcement-banner.liquid
│   ├── ae-landing-hero.liquid
│   └── ... (hier kommen neue Sections hin)
│
├── 📂 assets/ (JavaScript & Assets)
│   ├── base.css                         🎨 Haupt-CSS (Design System)
│   ├── ae-header.js
│   ├── ae-announcement-banner.js
│   └── ... (hier kommt neues JS hin)
│
└── 📂 snippets/ (Wiederverwendbare Komponenten)
    └── ... (optional für Section-Komponenten)
```

---

## 🎯 Workflow-Dateien im Detail

### 1. Start: Master-Übersicht
```
README-SECTION-TOOLS.md
│
├── Was ist das Toolkit?
├── Welche Dateien gibt es?
├── Quick Start (3 Minuten)
├── Use Cases & Beispiele
└── Nächste Schritte
```

**Wann nutzen:** Als erstes lesen, um alles zu verstehen

---

### 2. Quick Start: Creation Guide
```
SECTION-CREATION-GUIDE.md
│
├── 📁 Dateien-Übersicht
├── 🚀 Quick Start - So nutzt du die Prompts
│   ├── Option 1: Mit Cursor AI
│   ├── Option 2: Mit ChatGPT/Claude
│   └── Option 3: Mit Templates
├── 💡 Best Practices & Tipps
├── 🎯 Beispiel-Workflows
├── 🎨 Referenz-Websites
├── 🔧 Troubleshooting
└── 📊 Cheat Sheet
```

**Wann nutzen:** Bevor du die erste Section erstellst

---

### 3. Daily Driver: Compact Prompt ⭐
```
SECTION-PROMPT-COMPACT.md (~200 Zeilen)
│
├── 👤 Rolle & Mission
├── 🎨 Design-Prinzipien
│   ├── Visual Design
│   ├── Animations
│   └── Responsive
├── 💻 Code-Standards
│   ├── BEM Methodology
│   ├── Liquid Pattern
│   ├── JavaScript Pattern
│   └── Design Tokens
├── ✅ Accessibility Checklist
├── 🎯 Performance
├── 📦 Deliverables
├── 🔍 Input-Handling
└── 🏆 Qualitäts-Check
```

**Wann nutzen:** Als System-Prompt in Cursor/ChatGPT - IMMER AKTIV!

---

### 4. Reference: Full Documentation
```
SHOPIFY-SECTION-PROMPT.md (~1200 Zeilen)
│
├── 👤 Kontext & Rolle
├── 🎨 Design-Prinzipien (Detailliert)
├── 💻 Technische Standards (Vollständig)
│   ├── Liquid Best Practices
│   ├── CSS Konventionen
│   ├── JavaScript Patterns
│   ├── Performance
│   └── Accessibility
├── 🎛️ Theme Editor Integration
│   ├── Schema Design
│   ├── Setting Types
│   └── Blocks System
├── 🔍 Input-Handling
│   ├── Screenshots
│   ├── Website Links
│   └── Text Descriptions
├── 📦 Deliverables
├── 🎯 Workflow
└── 🏆 Qualitäts-Checkliste
```

**Wann nutzen:** Zum Nachschlagen bei spezifischen Fragen

---

### 5. Templates: Ready-to-Use

#### SECTION-TEMPLATE.liquid
```liquid
{%- comment -%} Section mit allen Best Practices {%- endcomment -%}
│
├── 💧 Liquid Logic
│   ├── Section Settings
│   ├── Conditional Loading
│   └── Dynamic Styles
├── 🏗️ HTML Structure
│   ├── Semantic Markup
│   ├── BEM Classes
│   ├── Accessibility
│   └── Blocks Loop
└── 📝 Schema
    ├── Settings (Content, Design, Advanced)
    ├── Blocks Definition
    └── Presets
```

#### section-template.js
```javascript
// Modern JavaScript mit allen Features
│
├── ⚙️ Configuration
├── 🎯 DOM Selection
├── 📊 State Management
├── 🎬 Event Handlers
│   ├── Click Events
│   ├── Keyboard Navigation
│   ├── Hover/Focus
│   └── Resize Handling
├── 🔄 Autoplay/Carousel Logic
└── 🧹 Cleanup Functions
```

#### section-template.css
```css
/* BEM + Responsive + Animations */
│
├── 📦 Container & Layout
├── 🎨 Visual Styles
│   ├── Typography
│   ├── Colors (Design Tokens)
│   ├── Spacing
│   └── Borders/Shadows
├── 🎬 Animations
│   ├── Transitions
│   ├── Keyframes
│   └── Reduced Motion
├── 🎯 States
│   ├── Hover
│   ├── Focus
│   ├── Active
│   └── Disabled
└── 📱 Responsive
    ├── Mobile (< 768px)
    ├── Tablet (768px - 1024px)
    ├── Desktop (1024px - 1280px)
    └── Large (> 1280px)
```

---

## 🔄 Typischer Workflow

```
START
  │
  ├─> 1. README-SECTION-TOOLS.md lesen
  │      └─> Verstehen was das Toolkit kann
  │
  ├─> 2. SECTION-CREATION-GUIDE.md durchgehen
  │      └─> Quick Start folgen
  │
  ├─> 3. SECTION-PROMPT-COMPACT.md als System-Prompt
  │      └─> In Cursor/ChatGPT einrichten
  │
  ├─> 4. SECTION erstellen (3 Optionen)
  │      │
  │      ├─> Option A: Mit AI + Prompt
  │      │      └─> "Erstelle eine Hero Section wie Linear.app"
  │      │
  │      ├─> Option B: Mit Template
  │      │      └─> SECTION-TEMPLATE.liquid kopieren → anpassen
  │      │
  │      └─> Option C: Hybrid
  │             └─> Template + AI Optimierung
  │
  ├─> 5. IMPLEMENTIEREN
  │      ├─> sections/ae-my-section.liquid
  │      ├─> assets/ae-my-section.js (falls nötig)
  │      └─> CSS in assets/base.css
  │
  ├─> 6. TESTEN
  │      ├─> Theme Editor
  │      ├─> Responsive (Mobile → Desktop)
  │      ├─> Accessibility (Keyboard, Screen Reader)
  │      └─> Performance
  │
  └─> 7. DEPLOY ✅
         └─> Live schalten!
```

---

## 📊 Datei-Größen & Ladezeiten

| Datei | Größe | Lesen |
|-------|-------|-------|
| README-SECTION-TOOLS.md | ~8 KB | 10 Min |
| SECTION-CREATION-GUIDE.md | ~15 KB | 20 Min |
| SECTION-PROMPT-COMPACT.md ⭐ | ~8 KB | 10 Min |
| SHOPIFY-SECTION-PROMPT.md | ~25 KB | 45 Min |
| SECTION-TEMPLATE.liquid | ~3 KB | 5 Min |
| section-template.js | ~4 KB | 5 Min |
| section-template.css | ~6 KB | 5 Min |

**Total Reading Time:** ~1.5 Stunden  
**Aber:** Nach Quick Start kannst du direkt loslegen! (30 Min)

---

## 🎯 Welche Datei für welches Ziel?

### "Ich will schnell starten!"
→ `SECTION-CREATION-GUIDE.md` → Quick Start (3 Schritte)

### "Ich will alles verstehen!"
→ `README-SECTION-TOOLS.md` → dann → `SHOPIFY-SECTION-PROMPT.md`

### "Ich will mit AI arbeiten!"
→ `SECTION-PROMPT-COMPACT.md` als System-Prompt → Los!

### "Ich will selbst coden!"
→ `SECTION-TEMPLATE.liquid` + `section-template.js` + `section-template.css`

### "Ich habe eine spezielle Frage!"
→ `SHOPIFY-SECTION-PROMPT.md` → Relevanter Abschnitt nachschlagen

---

## 🔧 Organisation Best Practices

### Toolkit-Dateien (Root Level)
```
✅ Alle Toolkit-Dateien im Theme-Root
✅ Einfach zu finden
✅ Separate von production code
```

### Production Code (Standard Shopify-Struktur)
```
sections/     → Deine echten Sections
assets/       → JS, CSS, Images
snippets/     → Wiederverwendbare Komponenten
templates/    → Page Templates
layout/       → Theme Layout Files
config/       → Theme Settings
locales/      → Translations
```

### Naming Convention
```
Toolkit:       README-*.md, SECTION-*.md (UPPERCASE)
Templates:     section-template.* (lowercase)
Production:    ae-section-name.* (dein prefix)
```

---

## 📱 Mobile-Friendly Übersicht

Wenn du unterwegs bist und nur ein File öffnen kannst:

**→ `SECTION-PROMPT-COMPACT.md`**

Das ist dein All-in-One Quick-Reference:
- Alle wichtigen Standards
- Code-Patterns
- Checklisten
- Kompakt & fokussiert

---

## 🎓 Lern-Reihenfolge (Empfohlen)

### Tag 1: Foundation (1-2h)
1. ✅ `README-SECTION-TOOLS.md` (10 min)
2. ✅ `SECTION-CREATION-GUIDE.md` (20 min)
3. ✅ `SECTION-PROMPT-COMPACT.md` (10 min)
4. ✅ System-Prompt einrichten (5 min)
5. ✅ Erste Section erstellen (30-60 min)

### Tag 2-7: Practice (5-10h)
6. ✅ 1-2 Sections pro Tag erstellen
7. ✅ Verschiedene Typen ausprobieren (Hero, Grid, Carousel)
8. ✅ Mit Screenshots & Links arbeiten
9. ✅ Templates anpassen

### Woche 2+: Mastery
10. ✅ `SHOPIFY-SECTION-PROMPT.md` komplett lesen
11. ✅ Eigene Workflows entwickeln
12. ✅ Templates customizen
13. ✅ Komplette Themes bauen

---

## 💡 Pro-Tipps

### Tipp 1: Favoriten setzen
Markiere diese Dateien in deinem Editor:
- ⭐ `SECTION-PROMPT-COMPACT.md` (Daily Use)
- ⭐ `SECTION-CREATION-GUIDE.md` (Quick Reference)

### Tipp 2: Snippets erstellen
Erstelle VS Code/Cursor Snippets für:
- Section-Template Struktur
- BEM Class-Namen
- Schema Settings

### Tipp 3: Backup
Speichere deine Template-Anpassungen separat:
- `my-custom-templates/`
- Versioniere mit Git
- Teile mit deinem Team

### Tipp 4: Cheat Sheet
Drucke die Checklisten aus:
- Design-Prinzipien
- Accessibility Checklist
- Performance Checklist
- Qualitäts-Check

---

## 🎉 Du bist ready!

**Nächster Schritt:**

1. Öffne `README-SECTION-TOOLS.md`
2. Folge dem Quick Start
3. Erstelle deine erste Premium Section!

**Let's go! 🚀**

---

*Toolkit Version 1.0 - Erstellt für AE-Theme*

