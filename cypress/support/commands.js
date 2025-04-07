Cypress.Commands.add('viewMobile', () => {
  cy.viewport('iphone-x')
})

Cypress.Commands.add('viewTablet', () => {
  cy.viewport('ipad-2')
})

Cypress.Commands.add('viewDesktop', () => {
  cy.viewport(1280, 720)
})
