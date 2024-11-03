describe('Los estudiantes under monkeys', function() {
  it('visits los estudiantes and survives monkeys', function() {
      cy.visit('https://losestudiantes.co');
      cy.wait(1000);
      randomEvent(10);
  });
});

//evento
function randomEvent(eventsLeft) {
  if (eventsLeft <= 0) return;

  const actions = [
      randomClick,
      randomFillText,
      randomSelectCombo,
      randomClickButton
  ];

  const randomAction = actions[Math.floor(Math.random() * actions.length)];
  randomAction(eventsLeft - 1);
}


//Hacer click en un link al azar
function randomClick(monkeysLeft) {
  function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
  }

  cy.get('a').then($links => {
      const randomLink = $links.get(getRandomInt(0, $links.length));
      if (!Cypress.dom.isHidden(randomLink)) {
          cy.wrap(randomLink).click({ force: true });
          monkeysLeft--;
      }
      cy.wait(1000);
      randomClick(monkeysLeft);
  });
}

//Llenar un campo de texto al azar
function randomFillText(eventsLeft) {
  cy.get('input[type="text"], input[type="email"], textarea').then($inputs => {
      const randomInput = $inputs.get(Math.floor(Math.random() * $inputs.length));
      cy.wrap(randomInput).type('Texto de prueba ' + Math.random());
      cy.wait(1000);
      randomEvent(eventsLeft - 1);
  });
}

//Seleccionar un combo al azar
function randomSelectCombo(eventsLeft) {
  cy.get('select').then($selects => {
      const randomSelect = $selects.get(Math.floor(Math.random() * $selects.length));
      cy.wrap(randomSelect).select(Math.floor(Math.random() * 5));
      cy.wait(1000);
      randomEvent(eventsLeft - 1);
  });
}

//Hacer click en un botón al azar
function randomClickButton(eventsLeft) {
  cy.get('button').then($buttons => {
      const randomButton = $buttons.get(Math.floor(Math.random() * $buttons.length));
      if (!Cypress.dom.isHidden(randomButton)) {
          cy.wrap(randomButton).click({ force: true });
          eventsLeft--;
      }
      cy.wait(1000);
      randomEvent(eventsLeft);
  });
}
