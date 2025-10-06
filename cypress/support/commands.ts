declare global {
  namespace Cypress {
    interface Chainable {
      interceptAPI(
        method: string,
        url: string,
        fixture?: string
      ): Chainable<null>;
      fillInput(
        selector: string,
        value: string
      ): Chainable<JQuery<HTMLElement>>;
      openModal(buttonSelector: string): Chainable<JQuery<HTMLElement>>;
      submitForm(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add(
  "interceptAPI",
  (method: string, url: string, fixture?: string) => {
    if (fixture) {
      cy.intercept(method, url, { fixture }).as("apiRequest");
    } else {
      cy.intercept(method, url).as("apiRequest");
    }
  }
);

Cypress.Commands.add("fillInput", (selector: string, value: string) => {
  cy.get(selector).clear().type(value);
});

Cypress.Commands.add("openModal", (buttonSelector: string) => {
  cy.get(buttonSelector).click();
});

Cypress.Commands.add("submitForm", () => {
  cy.get('button[type="submit"]').click();
});

export {};
