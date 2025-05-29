
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
const baseURL = process.env.BURGER_API_URL;
declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
  }
}

Cypress.Commands.add('login', () => {
    cy.intercept(`**/auth/login`, {
      statusCode: 200,
      body: {
        success: true,
        refreshToken: "mock",
        accessToken: "mock",
        user: {
          email: 'test_user@example.com',
          name: 'Test User'
        }
      }
    }).as('loginRequest');

   cy.visit('/login');
  cy.get('input[name="email"]').type('random@random.ru');
  cy.get('input[name="password"]').type('randomrandomiwrejs[g9i4398ru0[39u0-283yu4=09rj04593uy8u2j923g-ujkpo');
  cy.contains('Войти').click();
  cy.wait('@loginRequest');
});
