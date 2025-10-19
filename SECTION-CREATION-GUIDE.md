# 📚 Section Creation Guide - Schnellstart

> **Wie du die Standard-Prompts und Templates für perfekte Shopify Sections nutzt**

---

## 📁 Dateien-Übersicht

### 1. **SHOPIFY-SECTION-PROMPT.md** (Vollständig)
- **Was:** Umfassender Standard-Prompt mit allen Details, Best Practices und Beispielen
- **Wann nutzen:** Als Referenz-Dokument und zum Nachschlagen
- **Größe:** ~1200 Zeilen - Vollständige Dokumentation
- **Empfehlung:** Einmal durchlesen, dann als Nachschlagewerk nutzen

### 2. **SECTION-PROMPT-COMPACT.md** (Kompakt) ⭐ **EMPFOHLEN**
- **Was:** Kompakte Version zum Copy-Paste als System-Prompt
- **Wann nutzen:** Als Standard-Prompt für AI-Agents (Cursor, ChatGPT, etc.)
- **Größe:** ~200 Zeilen - Alle wichtigen Infos
- **Empfehlung:** Das ist dein Go-To Prompt für tägliche Arbeit!

### 3. **SECTION-TEMPLATE.liquid**
- **Was:** Vollständige Section-Template mit allen Best Practices
- **Wann nutzen:** Als Starter für neue Sections
- **Enthält:** Liquid Code, Schema, Blocks, Settings, Kommentare

### 4. **section-template.js**
- **Was:** JavaScript-Template mit modernen Patterns
- **Wann nutzen:** Wenn deine Section interaktive Features braucht
- **Enthält:** IIFE Pattern, Event Handling, Autoplay, Cleanup

### 5. **section-template.css**
- **Was:** CSS-Template mit BEM, Responsive Design, Animations
- **Wann nutzen:** Als Basis für deine Section-Styles
- **Enthält:** BEM Classes, Media Queries, Animations, States

---

## 🚀 Quick Start - So nutzt du die Prompts

### Option 1: Mit Cursor AI (Empfohlen)

1. **System-Prompt setzen:**
   - Öffne Cursor Settings → Rules for AI
   - Kopiere den Inhalt von `SECTION-PROMPT-COMPACT.md`
   - Füge ihn als globale Regel ein

2. **Section erstellen:**
   ```
   Du: "Erstelle eine Hero Section im Stil von Linear.app"
   
   AI: [Analysiert, recherchiert, erstellt Code]
   ```

3. **Mit Screenshots:**
   - Screenshot anhängen (Drag & Drop in Cursor)
   - "Erstelle diese Section basierend auf dem Screenshot"

4. **Mit Website-Links:**
   ```
   Du: "Erstelle eine Feature-Section wie https://stripe.com/features
        Recherchiere die Website und baue etwas Ähnliches"
   ```

### Option 2: Mit ChatGPT / Claude

1. **Neue Konversation starten**
2. **Ersten Prompt:**
   ```
   [Kopiere kompletten Inhalt von SECTION-PROMPT-COMPACT.md hier rein]
   
   Ab jetzt bist du im Premium Section Creation Mode.
   Ich werde dir gleich eine Section-Anfrage stellen.
   ```

3. **Zweiter Prompt - Deine Anfrage:**
   ```
   Erstelle eine [Section-Name] im Stil von [Referenz].
   
   [Optional: Screenshot anhängen]
   [Optional: Link zur Referenz-Website]
   [Optional: Textliche Beschreibung]
   ```

### Option 3: Mit Templates starten

1. **Kopiere Template-Files:**
   - `SECTION-TEMPLATE.liquid` → `sections/deine-section.liquid`
   - `section-template.js` → `assets/deine-section.js`
   - `section-template.css` → (In deine `base.css` kopieren)

2. **Benenne um:**
   - Suche & Ersetze `section-name` mit `deine-section`
   - Suche & Ersetze `Section Name` mit `Deine Section`

3. **Passe an:**
   - Content-Bereiche anpassen
   - Schema Settings hinzufügen/entfernen
   - Styles nach Bedarf erweitern

---

## 💡 Best Practices & Tipps

### 1. Recherche ist King
Wenn du eine Referenz-Website hast:
```
"Recherchiere https://mongodb.com und erstelle einen ähnlichen Hero.
Analysiere Design, Spacing, Typography, Animations."
```

Der AI-Agent wird:
- Website durchsuchen
- Design-Patterns extrahieren  
- Für Shopify adaptieren
- Produktionsreifen Code liefern

### 2. Screenshots richtig nutzen
- **Mehrere Screenshots:** Verschiedene Breakpoints zeigen (Mobile, Tablet, Desktop)
- **Annotationen:** Markiere wichtige Bereiche mit Pfeilen/Text
- **Context:** Erkläre was du siehst: "Die CTA-Buttons haben einen Glasmorphism-Effekt"

### 3. Iteratives Feedback
```
Du: "Erstelle eine Feature-Grid Section"
AI: [Erstellt Code]

Du: "Perfekt! Jetzt mache die Cards etwas größer und 
     füge einen Hover-Effekt mit leichtem Tilt hinzu"
AI: [Passt an]

Du: "Super! Jetzt noch Mobile-Optimierung mit 1 Column Layout"
AI: [Optimiert]
```

### 4. Theme-Konsistenz wahren
Der Prompt ist auf dein AE-Theme optimiert:
- Nutzt deine Design Tokens (aus `base.css`)
- Folgt deiner BEM-Konvention (`.ae-section__element`)
- Deutsche Labels & Kommentare
- Passt zu deinem existierenden Code-Stil

### 5. Qualitäts-Check vor Deployment
Bevor du eine Section live schaltest:
```
Du: "Checke die Section nochmal auf:
- Accessibility (WCAG 2.1 AA)
- Performance (Page Speed)
- Responsive Design (alle Breakpoints)
- Theme Editor Settings (vollständig?)"
```

---

## 🎯 Beispiel-Workflows

### Beispiel 1: Von Null zur fertigen Section

```
1. DU: 
"Erstelle eine Testimonials-Section im Stil von Webflow.
Recherchiere https://webflow.com/customers für Inspiration.

Features:
- 3 Testimonials nebeneinander (Desktop)
- Carousel auf Mobile
- Avatar, Name, Position, Quote
- Autoplay mit Pause on Hover"

2. AI:
[Recherchiert Website]
[Analysiert Design]
[Erstellt vollständigen Code]
[Liefert: Liquid + JS + CSS + Doku]

3. DU (Review):
"Sieht gut aus! Kannst du die Avatars rund machen 
und einen subtilen Box-Shadow hinzufügen?"

4. AI:
[Passt CSS an]
[Zeigt Updated Code]

5. DU:
"Perfect! Implementiere das jetzt."

6. AI:
[Erstellt Files in deinem Theme]
✅ sections/ae-testimonials.liquid
✅ assets/ae-testimonials.js  
✅ CSS für base.css
✅ Dokumentation
```

### Beispiel 2: Screenshot-basiert

```
1. DU:
[Screenshot von Apple's iPhone Produktseite anhängen]

"Erstelle eine Product-Showcase Section basierend auf diesem Screenshot.
Achte besonders auf das minimalistische Design und die Animationen."

2. AI:
"Ich sehe:
- Zentriertes Produktbild
- Headline mit großer Typography  
- 3 Feature-Highlights darunter
- Sticky Scroll-Effekt
- Minimalistisch, viel Whitespace

Ich erstelle jetzt eine Section mit diesen Features..."

[Liefert Code]

3. DU:
"Genau so! Funktioniert perfekt."
```

### Beispiel 3: Quick Fix / Enhancement

```
DU:
"Nimm die existierende ae-header Section und füge einen
Dark Mode Toggle hinzu. Smooth Transition zwischen Light/Dark."

AI:
[Liest existierende Section]
[Analysiert Code]
[Fügt Dark Mode Toggle hinzu]
[Updated Styles]
[Liefert Updated Files]
```

---

## 🎨 Referenz-Websites für Inspiration

### Top Design-Referenzen (die der AI kennt):

**Tech Companies:**
- Linear.app - Minimalistisches Design, Smooth Animations
- Stripe.com - Clean, Professional, Excellent Typography
- Vercel.com - Modern Gradients, Dark Theme, Speed-fokussiert
- MongoDB.com - Bold Colors, Clear Hierarchy

**E-Commerce:**
- Apple.com - Perfektion im Detail, Product-Showcase
- Shopify.com - Conversion-optimiert, Clear CTAs
- Allbirds.com - Eco-friendly Design, Soft Colors

**Creative:**
- Awwwards.com - Cutting-edge Web Design
- Behance.net - Portfolio-Layouts
- Dribbble.com - UI/UX Patterns

**SaaS:**
- Notion.so - Clean Interface, Excellent UX
- Figma.com - Tool-focused, Clear Features
- Slack.com - Friendly, Accessible

---

## 🔧 Troubleshooting

### Problem: "Code funktioniert nicht"
**Lösung:**
```
Du: "Die Section wird nicht angezeigt. Checke bitte:
1. Liquid Syntax Fehler
2. Schema korrekt formatiert?  
3. JavaScript Console Errors?
4. CSS Selector richtig?"

AI: [Analysiert, findet Fehler, liefert Fix]
```

### Problem: "Design sieht nicht gut aus auf Mobile"
**Lösung:**
```
Du: "Optimiere die Section für Mobile (375px).
- Padding reduzieren
- Font-Sizes anpassen  
- Stack statt Grid Layout
- Touch-friendly CTAs"

AI: [Optimiert Responsive Styles]
```

### Problem: "Theme Editor Settings werden nicht angezeigt"
**Lösung:**
```
Du: "Das Schema wird nicht erkannt. Validiere bitte:
1. JSON Syntax korrekt?
2. Closing Brackets?
3. Schema Tag richtig platziert?
4. Settings IDs unique?"

AI: [Validiert Schema, liefert Fix]
```

---

## 📊 Cheat Sheet - Häufige Anfragen

### Hero Sections
```
"Erstelle eine Hero Section im [Brand]-Stil mit:
- Full-width Background Image/Video
- Zentrierte Headline + Subheadline  
- Primary + Secondary CTA
- Scroll-down Indicator
- Parallax Effekt (optional)"
```

### Feature Grids
```
"Erstelle eine 3-Column Feature Grid mit:
- Icon + Headline + Text pro Feature
- Hover-Animations
- Mobile: 1 Column Stack
- Theme Editor: Blocks für Features"
```

### Testimonials / Reviews
```
"Erstelle eine Testimonial Carousel mit:
- Avatar + Name + Position + Quote + Rating
- Autoplay alle 5 Sekunden
- Manual Navigation (Dots + Arrows)
- Pause on Hover"
```

### Call-to-Action Sections
```
"Erstelle eine CTA Section mit:
- Bold Headline
- Kurze Description  
- Primary CTA Button
- Background Gradient
- Optional: Customer Logos"
```

### Image + Text Combos
```
"Erstelle eine Media-with-Content Section:
- Image links, Text rechts (umkehrbar)
- Responsive: Stack auf Mobile
- Theme Editor: Image, Heading, Text, CTA, Link"
```

---

## 🎁 Pro-Tipps

1. **Kombiniere Referenzen:**
   ```
   "Erstelle eine Section mit:
   - Layout von Linear.app
   - Typography von Stripe
   - Colors von MongoDB  
   - Animations von Apple"
   ```

2. **Nutze Design-Sprache:**
   ```
   "Glasmorphism", "Neumorphism", "Brutalism",
   "Gradients", "Parallax", "Micro-interactions"
   ```

3. **Spezifische Details:**
   ```
   "Verwende:
   - Font-Size: 48px für Headline
   - Border-Radius: 16px  
   - Box-Shadow: 0 8px 32px rgba(0,0,0,0.1)
   - Transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
   ```

4. **Performance-First:**
   ```
   "Erstelle mit Fokus auf:
   - Lazy Loading für alle Images
   - CSS Animations (kein JS)
   - Minimal JavaScript
   - Mobile-First Responsive"
   ```

---

## 🚀 Nächste Schritte

1. **Lese** `SECTION-PROMPT-COMPACT.md` einmal durch
2. **Setze** ihn als System-Prompt in Cursor/ChatGPT
3. **Starte** mit einer einfachen Section (z.B. Hero)
4. **Experimentiere** mit Screenshots und Links
5. **Iteriere** basierend auf Feedback
6. **Skaliere** - erstelle dein komplettes Theme!

---

**Viel Erfolg beim Erstellen deiner Premium Shopify Sections! 🎉**

Bei Fragen oder Problemen: Nutze den Standard-Prompt und frage einfach!

