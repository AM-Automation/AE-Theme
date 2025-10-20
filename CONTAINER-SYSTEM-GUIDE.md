# 🎯 AE Container System - Rhode-Style Standard

## 📋 Übersicht
Alle Sections verwenden jetzt automatisch das Rhode-Style Container-System für einheitliche Abstände.

## 🔧 Container-Klassen

### 1. **`.section-container`** - Standard für alle Sections
```liquid
<div class="section-container">
  <!-- Section Content -->
</div>
```

### 2. **`.ae-container`** - Für AE-spezifische Sections
```liquid
<div class="ae-container">
  <!-- AE Section Content -->
</div>
```

### 3. **`.container`** - Standard Shopify Container
```liquid
<div class="container">
  <!-- Standard Content -->
</div>
```

## 📐 Container-Padding Werte

### Desktop (1024px+)
- **Standard**: `3rem` (48px)
- **Large Desktop**: `4rem` (64px)

### Mobile (768px)
- **Standard**: `1.5rem` (24px)

### Kleine Mobile (480px)
- **Standard**: `0.75rem` (12px)

## 🎨 Section Template verwenden

### Für neue Sections:
```liquid
{%- comment -%} Kopiere SECTION-TEMPLATE.liquid {%- endcomment -%}
{%- comment -%} Passe section_name, heading, text an {%- endcomment -%}
```

### Für bestehende Sections:
```liquid
<section class="ae-your-section">
  <div class="section-container">
    <!-- Dein Content hier -->
  </div>
</section>
```

## 🔄 Automatische Container-Anwendung

Das System wendet automatisch Container-Styles auf alle Sections an, die:
- `class="ae-*"` haben
- `class="section"` haben

## 📱 Responsive Verhalten

Alle Container passen sich automatisch an:
- **Desktop**: Größere Abstände für bessere Lesbarkeit
- **Tablet**: Moderate Abstände
- **Mobile**: Kompaktere Abstände

## ✅ Best Practices

1. **Immer `.section-container` verwenden** für neue Sections
2. **CSS-Variablen nutzen** für konsistente Abstände
3. **Responsive Padding** über Schema-Einstellungen
4. **Einheitliche max-width** von 1280px

## 🎯 Rhode-Style Prinzipien

- **Konsistente horizontale Abstände** links und rechts
- **Zentriertes Layout** mit maximaler Breite
- **Einheitliche Padding-Werte** über alle Breakpoints
- **Saubere, professionelle Optik**

## 🔧 CSS-Variablen

```css
:root {
  --container-padding: 3rem; /* 48px - Standard */
  --container-xl: 1280px;    /* Max-Breite */
}
```

## 📝 Beispiel Section

```liquid
<section class="ae-hero">
  <div class="section-container">
    <h1 class="ae-hero__heading">Hero Title</h1>
    <p class="ae-hero__text">Hero description</p>
  </div>
</section>
```

**Alle Sections haben jetzt automatisch einheitliche Abstände wie bei Rhode! 🎉**
