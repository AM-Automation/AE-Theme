class LicensePlateCustomizer {
  constructor() {
    this.cityInput = document.getElementById('city-input');
    this.shortInput = document.getElementById('short-input');
    this.numberInput = document.getElementById('number-input');
    this.previewCity = document.getElementById('preview-city');
    this.previewShort = document.getElementById('preview-short');
    this.previewNumber = document.getElementById('preview-number');
    this.resetBtn = document.getElementById('reset-btn');
    this.saveBtn = document.getElementById('save-btn');
    this.form = document.getElementById('license-plate-form');
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.updatePreview();
  }

  bindEvents() {
    // Input event listeners for live preview
    this.cityInput.addEventListener('input', (e) => this.handleCityInput(e));
    this.shortInput.addEventListener('input', (e) => this.handleShortInput(e));
    this.numberInput.addEventListener('input', (e) => this.handleNumberInput(e));
    
    // Button event listeners
    this.resetBtn.addEventListener('click', () => this.resetForm());
    this.saveBtn.addEventListener('click', () => this.savePlate());
    
    // Form validation
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleCityInput(e) {
    let value = e.target.value.toUpperCase();
    value = value.replace(/[^A-Z]/g, ''); // Nur Buchstaben erlauben
    
    if (value.length > 3) {
      value = value.substring(0, 3);
    }
    
    e.target.value = value;
    this.updatePreview();
    this.validateForm();
  }

  handleShortInput(e) {
    let value = e.target.value.toUpperCase();
    value = value.replace(/[^A-Z]/g, ''); // Nur Buchstaben erlauben
    
    if (value.length > 2) {
      value = value.substring(0, 2);
    }
    
    e.target.value = value;
    this.updatePreview();
    this.validateForm();
  }

  handleNumberInput(e) {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, ''); // Nur Zahlen erlauben
    
    if (value.length > 4) {
      value = value.substring(0, 4);
    }
    
    e.target.value = value;
    this.updatePreview();
    this.validateForm();
  }

  updatePreview() {
    const city = this.cityInput.value || 'K';
    const short = this.shortInput.value || 'XP';
    const number = this.numberInput.value || '123';
    
    this.previewCity.textContent = city;
    this.previewShort.textContent = short;
    this.previewNumber.textContent = number;
    
    // Gesamtlänge prüfen (max 8 Zeichen)
    const totalLength = city.length + short.length + number.length;
    if (totalLength > 8) {
      this.showError('Die Gesamtlänge darf 8 Zeichen nicht überschreiten');
    } else {
      this.hideError();
    }
  }

  validateForm() {
    const city = this.cityInput.value;
    const short = this.shortInput.value;
    const number = this.numberInput.value;
    
    const totalLength = city.length + short.length + number.length;
    const isValid = city.length > 0 && short.length > 0 && number.length > 0 && totalLength <= 8;
    
    this.saveBtn.disabled = !isValid;
    this.saveBtn.classList.toggle('disabled', !isValid);
    
    return isValid;
  }

  resetForm() {
    this.cityInput.value = 'K';
    this.shortInput.value = 'XP';
    this.numberInput.value = '123';
    this.updatePreview();
    this.validateForm();
    this.hideError();
  }

  savePlate() {
    if (!this.validateForm()) {
      this.showError('Bitte füllen Sie alle Felder korrekt aus');
      return;
    }
    
    const plateData = {
      city: this.cityInput.value,
      short: this.shortInput.value,
      number: this.numberInput.value,
      fullPlate: this.cityInput.value + this.shortInput.value + this.numberInput.value
    };
    
    // Hier können Sie die Daten an Shopify senden oder lokal speichern
    console.log('Kennzeichen gespeichert:', plateData);
    
    // Erfolgsmeldung anzeigen
    this.showSuccess('Kennzeichen erfolgreich gespeichert!');
    
    // Optional: Daten an Shopify Cart/Product hinzufügen
    this.addToCart(plateData);
  }

  addToCart(plateData) {
    // Beispiel: Kennzeichen als Custom Product zum Warenkorb hinzufügen
    const formData = {
      'items': [{
        'id': 1234567890, // Ihre Product ID für custom Kennzeichen
        'quantity': 1,
        'properties': {
          'Kennzeichen': plateData.fullPlate,
          'Ortskürzel': plateData.city,
          'Kürzel': plateData.short,
          'Zahlen': plateData.number
        }
      }]
    };
    
    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Zum Warenkorb hinzugefügt:', data);
      // Optional: Warenkorb-Drawer öffnen
      if (window.cartDrawer) {
        window.cartDrawer.open();
      }
    })
    .catch(error => {
      console.error('Fehler beim Hinzufügen zum Warenkorb:', error);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.savePlate();
  }

  showError(message) {
    this.hideError();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const form = document.querySelector('.customizer-form');
    form.appendChild(errorDiv);
    
    setTimeout(() => {
      errorDiv.classList.add('show');
    }, 10);
  }

  hideError() {
    const existingError = document.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
  }

  showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const form = document.querySelector('.customizer-form');
    form.appendChild(successDiv);
    
    setTimeout(() => {
      successDiv.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  }
}

// Initialisierung wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('license-plate-form')) {
    new LicensePlateCustomizer();
  }
});

// Für Shopify Theme Events
document.addEventListener('shopify:section:load', () => {
  if (document.getElementById('license-plate-form')) {
    new LicensePlateCustomizer();
  }
});
