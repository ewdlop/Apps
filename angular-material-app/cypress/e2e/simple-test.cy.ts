describe('Angular Material App - Simple Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the application successfully', () => {
    cy.contains('Angular Material App')
    cy.get('mat-toolbar').should('be.visible')
    cy.get('mat-sidenav').should('be.visible')
  })

  it('should navigate between pages', () => {
    // Navigate to Dashboard
    cy.get('a[href="/dashboard"]').click()
    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')

    // Navigate to Products
    cy.get('a[href="/products"]').click()
    cy.url().should('include', '/products')
    cy.contains('Products').should('be.visible')

    // Navigate to Profile
    cy.get('a[href="/profile"]').click()
    cy.url().should('include', '/profile')
    cy.contains('Profile Settings').should('be.visible')
  })

  it('should display and interact with Material components', () => {
    cy.visit('/dashboard')
    
    // Check statistics cards
    cy.get('.stat-card').should('have.length', 4)
    cy.get('.stat-value').should('be.visible')
    
    // Check progress bars
    cy.get('mat-progress-bar').should('be.visible')
    
    // Check Material icons
    cy.get('mat-icon').should('be.visible')
  })

  it('should handle form interactions', () => {
    cy.visit('/profile')
    
    // Test form inputs
    cy.get('input[formControlName="name"]').should('be.visible')
    cy.get('input[formControlName="email"]').should('be.visible')
    
    // Test form validation
    cy.get('input[formControlName="name"]').clear()
    cy.get('input[formControlName="email"]').click()
    cy.get('mat-error').should('contain', 'Name is required')
  })

  it('should search and filter products', () => {
    cy.visit('/products')
    
    // Test search functionality
    cy.get('input[placeholder="Search by name or description"]').type('Angular')
    cy.get('.product-card').should('contain', 'Angular')
    
    // Test category filter
    cy.get('mat-select').click()
    cy.get('mat-option').contains('Web Development').click()
  })

  it('should display settings and handle toggles', () => {
    cy.visit('/settings')
    
    // Check settings cards
    cy.get('.settings-card').should('have.length', 4)
    
    // Test slide toggle
    cy.get('mat-slide-toggle').first().click()
    
    // Test action buttons
    cy.get('button').contains('Save Settings').should('be.visible')
    cy.get('button').contains('Reset to Defaults').should('be.visible')
  })

  it('should handle tab navigation', () => {
    cy.visit('/home')
    
    // Test tab switching
    cy.get('mat-tab[label="Components"]').click()
    cy.get('.components-showcase').should('be.visible')
    
    cy.get('mat-tab[label="About"]').click()
    cy.get('.about-content').should('be.visible')
  })

  it('should be responsive', () => {
    // Test mobile view
    cy.viewport(768, 1024)
    cy.get('.menu-button').should('be.visible')
    
    // Test desktop view
    cy.viewport(1280, 720)
    cy.get('.menu-button').should('not.be.visible')
  })

  it('should have proper Material theming', () => {
    // Check that Material theme is applied
    cy.get('body').should('have.class', 'mat-app-background')
    cy.get('mat-toolbar').should('have.class', 'mat-toolbar')
    cy.get('mat-card').should('have.class', 'mat-card')
  })

  it('should display progress indicators correctly', () => {
    cy.visit('/dashboard')
    
    cy.get('.project-item mat-progress-bar').each(($progressBar) => {
      cy.wrap($progressBar).should('have.attr', 'value')
    })
  })
}) 