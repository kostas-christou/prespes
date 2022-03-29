function initializeAccessibilityWidget() {
  const btnAccessibilityBar = document.getElementById('universalAccessBtn');

  let contrastText = '';
  let fontPlusText = '';
  let fontMinusText = '';
  let crosshairText = '';
  let rulerText = '';
  let fontDefaultText = '';
  let resetText = '';
  let accessibilityText = '';

  if (window.location.href.indexOf('de-ger') > -1) {
    contrastText = 'Hoher Kontrast';
    fontPlusText = 'Schriftgröße vergrößern';
    fontMinusText = 'Schriftgröße verkleinern';
    crosshairText = 'Zeichen';
    rulerText = 'Richtlinie';
    fontDefaultText = 'Standardschriftgröße';
    resetText = 'Zurücksetzen';
    accessibilityText = 'Barrierefreiheit';
  } else if (window.location.href.indexOf('en-us') > -1) {
    contrastText = 'High contrast';
    fontPlusText = 'Increase font size';
    fontMinusText = 'Decrease font size';
    crosshairText = 'Mark';
    rulerText = 'Guide line';
    fontDefaultText = 'Default font size';
    resetText = 'Reset';
    accessibilityText = 'Accessibility';
  } else {
    contrastText = 'Υψηλή Αντίθεση';
    fontPlusText = 'Αύξηση γραμματοσειράς';
    fontMinusText = 'Μείωση γραμματοσειράς';
    crosshairText = 'Σημάδι';
    rulerText = 'Κατευθυντήρια γραμμή';
    fontDefaultText = 'Αρχική γραμματοσειρά';
    resetText = 'Επαναφορά';
    accessibilityText = 'Προσβασιμότητα';
  }

  // Create the accessibility bar
  const accessibilityBar = document.createElement('div');
  accessibilityBar.id = 'accessibilityBar';
  document.body.insertBefore(accessibilityBar, document.body.firstChild);

  // Create the accessibility menu buttons
  function createButtons(el) {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add(el.class);
    button.setAttribute('data-accessibility', el.dataAccessibility);
    accessibilityBar.appendChild(button);

    // const wrapIcon = document.createElement('strong');
    // button.appendChild(wrapIcon);

    // if (el.icon === 'FontAwesome') {
    //   const icon = document.createElement('i');
    //   wrapIcon.appendChild(icon);
    //   icon.classList.add(...el.iconClass);
    // } else {
    //   const textIcon = document.createTextNode(el.icon);
    //   wrapIcon.appendChild(textIcon);
    // }

    const textButton = document.createTextNode(el.text);
    button.appendChild(textButton);
  }

  const btns = {
    btnHighContrast: {
      active: true,
      dataAccessibility: 'contrast',
      class: 'setAccessibility',
      icon: 'FontAwesome',
      iconClass: ['fas', 'fa-adjust'],
      text: contrastText,
    },
    btnIncFont: {
      active: true,
      dataAccessibility: 'incFont',
      class: 'setAccessibility',
      icon: 'A+',
      iconClass: '',
      text: fontPlusText,
    },
    btnOriFont: {
      active: true,
      dataAccessibility: 'oriFont',
      class: 'setAccessibility',
      icon: 'Aa',
      iconClass: '',
      text: fontDefaultText,
    },
    btnDecFont: {
      active: true,
      dataAccessibility: 'decFont',
      class: 'setAccessibility',
      icon: 'A-',
      iconClass: '',
      text: fontMinusText,
    },
    btnMarkerLine: {
      active: true,
      dataAccessibility: 'markerLine',
      class: 'setAccessibility',
      icon: 'FontAwesome',
      iconClass: ['fas', 'fa-bullseye'],
      text: crosshairText,
    },
    btnReadingLine: {
      active: true,
      dataAccessibility: 'readingLine',
      class: 'setAccessibility',
      icon: 'FontAwesome',
      iconClass: ['fas', 'fa-ruler-combined'],
      text: rulerText,
    },
    btnReset: {
      active: true,
      dataAccessibility: 'reset',
      class: 'setAccessibility',
      icon: 'FontAwesome',
      iconClass: ['fas', 'fa-redo-alt'],
      text: resetText,
    },
  };

  Object.keys(btns).forEach(function (item) {
    if (btns[item].active) {
      createButtons(btns[item]);
    }
  });

  const html = document.documentElement; //<html> for font-size settings
  const body = document.body; //<body> for the adjusts classes
  const btnAccessibility = document.querySelectorAll('.setAccessibility'); // Getting settings buttons

  if (btnAccessibilityBar) {
    setTimeout(function () {
      btnAccessibilityBar.classList.add('collapsed');
    }, 2000);
  }

  // Reading line
  const readingLine = document.createElement('div');
  readingLine.id = 'readingLine';
  document.body.insertBefore(readingLine, document.body.firstChild);

  html.addEventListener('mousemove', function (e) {
    if (body.classList.contains('accessibility_readingLine')) {
      let linePositionY = e.pageY - 20;
      const elReadingLine = document.querySelector('#readingLine'); // Toggle button
      elReadingLine.style.top = `${linePositionY}px`;
    }
  });

  // Marker line
  const markerLine = document.createElement('div');
  markerLine.id = 'markerLine';
  document.body.insertBefore(markerLine, document.body.firstChild);

  html.addEventListener('mousemove', function (e) {
    if (body.classList.contains('accessibility_markerLine')) {
      let linePositionY = e.pageY - 20;
      const elmarkerLine = document.querySelector('#markerLine'); // Toggle button
      elmarkerLine.style.top = `${linePositionY}px`;
    }
  });

  // Open accessibility bar
  btnAccessibilityBar.addEventListener('click', (e) => {
    e.stopPropagation();
    accessibilityBar.classList.toggle('active');
  });

  // Toggle accessibilities
  function toggleAccessibilities(action) {
    switch (action) {
      case 'contrast':
        window.toggleContrast();
        break;
      case 'incFont':
        window.toggleFontSize(action);
        break;
      case 'oriFont':
        window.toggleFontSize(action);
        break;
      case 'decFont':
        window.toggleFontSize(action);
        break;
      case 'readingLine':
        body.classList.toggle('accessibility_readingLine');
        break;
      case 'markerLine':
        body.classList.toggle('accessibility_markerLine');
        break;
      case 'reset':
        Contrast.currentState === true ? Contrast.setState(false) : null;
        window.toggleFontSize('oriFont');
        body.classList.remove('accessibility_readingLine');
        body.classList.remove('accessibility_markerLine');
        break;
      default:
        break;
    }
    accessibilityBar.classList.toggle('active');
  }

  btnAccessibility.forEach((button) =>
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAccessibilities(button.dataset.accessibility);
    })
  );

  // Font size
  const htmlFontSize = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('font-size')
  );
  const FontSize = {
    storage: 'fontSizeState',
    cssClass: 'fontSize',
    currentState: null,
    check: checkFontSize,
    getState: getFontSizeState,
    setState: setFontSizeState,
    toggle: toggleFontSize,
    updateView: updateViewFontSize,
  };

  window.toggleFontSize = function (action) {
    FontSize.toggle(action);
  };

  FontSize.check();

  function checkFontSize() {
    this.updateView();
  }

  function getFontSizeState() {
    return sessionStorage.getItem(this.storage)
      ? sessionStorage.getItem(this.storage)
      : 100;
  }

  function setFontSizeState(state) {
    sessionStorage.setItem(this.storage, '' + state);
    this.currentState = state;
    this.updateView();
  }

  function updateViewFontSize() {
    if (this.currentState === null) this.currentState = this.getState();

    this.currentState
      ? (html.style.fontSize = (this.currentState / 100) * htmlFontSize + 'px')
      : '';

    this.currentState
      ? body.classList.add(this.cssClass + this.currentState)
      : '';
  }

  function toggleFontSize(action) {
    switch (action) {
      case 'incFont':
        if (parseFloat(this.currentState) < 200) {
          body.classList.remove(this.cssClass + this.currentState);
          this.setState(parseFloat(this.currentState) + 20);
        } else {
          alert('Limite atingido!');
        }
        break;
      case 'oriFont':
        body.classList.remove(this.cssClass + this.currentState);
        this.setState(100);
        break;
      case 'decFont':
        if (parseFloat(this.currentState) > 40) {
          body.classList.remove(this.cssClass + this.currentState);
          this.setState(parseFloat(this.currentState) - 20);
        } else {
          alert('Limite atingido!');
        }
        break;
      default:
        break;
    }
  }

  // High contrast
  const Contrast = {
    storage: 'contrastState',
    cssClass: 'contrast',
    currentState: null,
    check: checkContrast,
    getState: getContrastState,
    setState: setContrastState,
    toggle: toggleContrast,
    updateView: updateViewContrast,
  };

  window.toggleContrast = function () {
    Contrast.toggle();
  };

  Contrast.check();

  function checkContrast() {
    this.updateView();
  }

  function getContrastState() {
    return sessionStorage.getItem(this.storage) === 'true';
  }

  function setContrastState(state) {
    sessionStorage.setItem(this.storage, '' + state);
    this.currentState = state;
    this.updateView();
  }

  function updateViewContrast() {
    if (this.currentState === null) this.currentState = this.getState();

    this.currentState
      ? body.classList.add(this.cssClass)
      : body.classList.remove(this.cssClass);
  }

  function toggleContrast() {
    this.setState(!this.currentState);
    // Dark.currentState === true ? Dark.setState(false) : null;
  }
}

document.addEventListener('DOMContentLoaded', initializeAccessibilityWidget);
