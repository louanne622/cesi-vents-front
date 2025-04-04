describe('Responsive Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('Mobile view', () => {
    beforeEach(() => {
      cy.viewMobile()
    })

    it('should display mobile navigation menu', () => {
      // Vérifier que le menu hamburger est visible
      cy.get('[data-testid="mobile-menu-button"]').should('be.visible')
      
      // Vérifier que le titre est visible
      cy.contains('h1', 'Bienvenue').should('be.visible')
      
      // Vérifier que la mise en page est adaptée au mobile
      cy.get('main').should('have.css', 'width', '100%')
    })
  })

  context('Tablet view', () => {
    beforeEach(() => {
      cy.viewTablet()
    })

    it('should display tablet layout', () => {
      // Vérifier les éléments spécifiques à la tablette
      cy.contains('h1', 'Bienvenue').should('be.visible')
      
      // Autres vérifications pour tablette
    })
  })

  context('Desktop view', () => {
    beforeEach(() => {
      cy.viewDesktop()
    })

    it('should display desktop navigation', () => {
      // Vérifier que la navigation desktop est visible
      cy.get('[data-testid="desktop-nav"]').should('be.visible')
      
      // Vérifier que le titre est visible
      cy.contains('h1', 'Bienvenue').should('be.visible')
      
      // Vérifier que la mise en page est adaptée au desktop
      cy.get('main').should('have.css', 'max-width').and('not.eq', '100%')
    })
  })
}) 