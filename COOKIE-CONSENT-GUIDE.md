# Cookie Consent Banner - Apple Design

Ein moderner Cookie-Consent-Banner im Apple-Design für das AE-Theme.

## Features

- **Apple-Design**: Glassmorphism-Effekt mit Backdrop-Filter
- **Responsive**: Optimiert für alle Bildschirmgrößen
- **Accessibility**: Vollständig barrierefrei mit ARIA-Labels
- **Dark Mode**: Automatische Anpassung an das Theme
- **German Text**: Lokalisierte Texte für deutsche Nutzer
- **LocalStorage**: Speichert Consent-Status lokal
- **Event System**: Dispatched Events für Integration

## Verwendung

Der Cookie-Banner wird automatisch in `layout/theme.liquid` geladen und erscheint nach 1 Sekunde, wenn noch kein Consent gegeben wurde.

### JavaScript API

```javascript
// Consent-Status prüfen
const banner = document.querySelector('cookie-consent-banner');
const status = banner.getConsentStatus();

// Consent zurücksetzen (für Testing)
banner.resetConsent();

// Events abhören
document.addEventListener('cookie-consent', (event) => {
  console.log('Cookie consent:', event.detail.action);
});
```

### CSS Customization

Der Banner nutzt die Theme-Design-Tokens:

```css
.cookie-consent-banner {
  /* Nutzt --primary, --foreground, --background etc. */
  /* Automatische Dark Mode Unterstützung */
}
```

## Anpassungen

### Text ändern

Bearbeite `snippets/cookie-consent-banner.liquid`:

```liquid
<h2 class="cookie-consent-banner__title">
  Ihr eigener Titel
</h2>
```

### Styling anpassen

Bearbeite die CSS-Regeln in `assets/base.css` unter dem Kommentar "Cookie Consent Banner - Apple Design".

### Privacy Policy Link

Der Banner verlinkt automatisch auf `pages.privacy-policy.url`. Stelle sicher, dass eine Privacy Policy Seite existiert.

## Browser Support

- Chrome/Edge: Vollständig unterstützt
- Firefox: Vollständig unterstützt  
- Safari: Vollständig unterstützt
- Mobile: Optimiert für Touch-Geräte

## Accessibility

- ✅ ARIA-Labels für Screen Reader
- ✅ Keyboard Navigation (Tab, Enter, Escape)
- ✅ Focus Management
- ✅ High Contrast Support
- ✅ Reduced Motion Support
