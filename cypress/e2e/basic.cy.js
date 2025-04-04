describe('Basic tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  
  it('should visit the home page on desktop', () => {
    cy.viewDesktop()
    cy.contains('h1', 'Bienvenue').should('be.visible')
  })
  
  it('should visit the home page on mobile', () => {
    cy.viewMobile()
    cy.contains('h1', 'Bienvenue').should('be.visible')
    // Vérifier des éléments spécifiques au mobile
  })
}) 