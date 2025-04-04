describe('Basic tests', () => {
  it('should visit the home page', () => {
    cy.visit('/')
    // Vérifier simplement que la page se charge
    cy.get('body').should('be.visible')
  })
}) 