describe('Navbar Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('Desktop view', () => {
    beforeEach(() => {
      cy.viewDesktop()
    })

    it('should display desktop sidebar correctly', () => {
      // Vérifier que la sidebar est visible
      cy.get('aside').should('be.visible')
      
      // Vérifier que le logo est visible
      cy.get('aside img[alt="CESI Logo"]').should('be.visible')
      
      // Vérifier que les liens de navigation sont visibles
      cy.get('aside a').should('have.length.at.least', 5) // 4 navItems + settings + login
      
      // Vérifier que la navigation mobile n'est pas visible
      cy.get('nav').should('not.be.visible')
    })
    
    it('should highlight active link in sidebar', () => {
      // Vérifier que le lien actif est mis en évidence avec la couleur primaire
      cy.get('aside a').contains('Accueil').should('have.css', 'color')
        .and('include', 'rgb(251, 226, 22)') // Approximation de #fbe216
    })
    
    it('should navigate when clicking links in sidebar', () => {
      // Cliquer sur un lien et vérifier la navigation
      cy.get('aside a').contains('Clubs').click()
      cy.url().should('include', '/clubs')
      
      // Vérifier que le lien Clubs est maintenant actif
      cy.get('aside a').contains('Clubs').should('have.css', 'color')
        .and('include', 'rgb(251, 226, 22)')
    })
    
    it('should display login button in sidebar', () => {
      // Vérifier que le bouton de connexion est visible
      cy.get('aside a').contains('Connexion').should('be.visible')
      cy.get('aside a').contains('Connexion').should('have.css', 'background-color')
    })
  })

  context('Mobile view', () => {
    beforeEach(() => {
      cy.viewMobile()
    })

    it('should display mobile bottom navigation correctly', () => {
      // Vérifier que la navigation mobile est visible
      cy.get('nav').should('be.visible')
      
      // Vérifier que la navigation est fixée en bas
      cy.get('nav').should('have.class', 'fixed')
      cy.get('nav').should('have.class', 'bottom-0')
      
      // Vérifier que les 4 liens de navigation sont visibles
      cy.get('nav a').should('have.length', 4)
      
      // Vérifier que la sidebar desktop n'est pas visible
      cy.get('aside').should('not.be.visible')
    })
    
    it('should highlight active link in mobile navigation', () => {
      // Vérifier que le lien actif est mis en évidence avec la couleur primaire
      cy.get('nav a').first().should('have.css', 'color')
        .and('include', 'rgb(251, 226, 22)') // Approximation de #fbe216
    })
    
    it('should navigate when clicking links in mobile navigation', () => {
      // Cliquer sur un lien et vérifier la navigation
      cy.get('nav a').contains('Clubs').click()
      cy.url().should('include', '/clubs')
      
      // Vérifier que le lien Clubs est maintenant actif
      cy.get('nav a').contains('Clubs').should('have.css', 'color')
        .and('include', 'rgb(251, 226, 22)')
    })
    
    it('should display icons in mobile navigation', () => {
      // Vérifier que les icônes sont visibles
      cy.get('nav svg').should('have.length', 4)
      
      // Vérifier que les labels sont visibles
      cy.get('nav span').contains('Accueil').should('be.visible')
      cy.get('nav span').contains('Clubs').should('be.visible')
      cy.get('nav span').contains('Événements').should('be.visible')
      cy.get('nav span').contains('Profil').should('be.visible')
    })
  })
  
  context('Tablet view', () => {
    beforeEach(() => {
      cy.viewTablet()
    })

    it('should display desktop sidebar on tablet', () => {
      // Vérifier que la sidebar est visible (car md:flex dans votre code)
      cy.get('aside').should('be.visible')
      
      // Vérifier que la navigation mobile n'est pas visible
      cy.get('nav').should('not.be.visible')
      
      // Vérifier que les liens de navigation sont visibles
      cy.get('aside a').should('have.length.at.least', 5)
    })
  })
}) 