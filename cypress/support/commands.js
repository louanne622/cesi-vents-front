// ***********************************************
// This example commands.js shows you how to
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

// Commande pour passer en mode mobile
Cypress.Commands.add('viewMobile', () => {
  cy.viewport('iphone-x')
})

// Commande pour passer en mode tablette
Cypress.Commands.add('viewTablet', () => {
  cy.viewport('ipad-2')
})

// Commande pour passer en mode desktop
Cypress.Commands.add('viewDesktop', () => {
  cy.viewport(1280, 720)
})

// Autres commandes personnalisées... 