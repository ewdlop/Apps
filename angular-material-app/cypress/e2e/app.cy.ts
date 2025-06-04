describe('Angular Material App E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Application Layout', () => {
    it('should display the main navigation elements', () => {
      // Check toolbar
      cy.get('.app-toolbar').should('be.visible')
      cy.get('.app-toolbar').should('contain', 'Angular Material App')
      
      // Check sidenav
      cy.get('.app-sidenav').should('be.visible')
      cy.get('.sidenav-header h2').should('contain', 'Angular Material App')
      
      // Check navigation items
      cy.get('mat-nav-list a[mat-list-item]').should('have.length', 5)
      cy.get('mat-nav-list a[mat-list-item]').should('contain', 'Home')
      cy.get('mat-nav-list a[mat-list-item]').should('contain', 'Dashboard')
      cy.get('mat-nav-list a[mat-list-item]').should('contain', 'Profile')
      cy.get('mat-nav-list a[mat-list-item]').should('contain', 'Products')
      cy.get('mat-nav-list a[mat-list-item]').should('contain', 'Settings')
    })

    it('should have responsive navigation', () => {
      // Test mobile menu
      cy.viewport(768, 1024)
      cy.get('.menu-button').should('be.visible')
      
      // Test desktop
      cy.viewport(1280, 720)
      cy.get('.menu-button').should('not.be.visible')
    })
  })

  describe('Navigation', () => {
    it('should navigate to Home page', () => {
      cy.get('a[href="/home"]').click()
      cy.url().should('include', '/home')
      cy.get('h1').should('contain', 'Welcome to Angular Material')
    })

    it('should navigate to Dashboard page', () => {
      cy.get('a[href="/dashboard"]').click()
      cy.url().should('include', '/dashboard')
      cy.get('h1').should('contain', 'Dashboard')
    })

    it('should navigate to Profile page', () => {
      cy.get('a[href="/profile"]').click()
      cy.url().should('include', '/profile')
      cy.get('h1').should('contain', 'Profile Settings')
    })

    it('should navigate to Products page', () => {
      cy.get('a[href="/products"]').click()
      cy.url().should('include', '/products')
      cy.get('h1').should('contain', 'Products')
    })

    it('should navigate to Settings page', () => {
      cy.get('a[href="/settings"]').click()
      cy.url().should('include', '/settings')
      cy.get('h1').should('contain', 'Settings')
    })

    it('should highlight active navigation item', () => {
      cy.get('a[href="/dashboard"]').click()
      cy.get('a[href="/dashboard"]').should('have.class', 'active-link')
    })
  })

  describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('/home')
    })

    it('should display welcome content', () => {
      cy.get('.welcome-card').should('be.visible')
      cy.get('mat-card-title').should('contain', 'Welcome to Angular Material')
      cy.get('mat-card-subtitle').should('contain', 'Build beautiful, usable products faster')
    })

    it('should display technology chips', () => {
      cy.get('.tech-chips mat-chip').should('have.length.greaterThan', 0)
      cy.get('.tech-chips mat-chip').should('contain', 'Angular')
      cy.get('.tech-chips mat-chip').should('contain', 'Material')
    })

    it('should display tabs and their content', () => {
      cy.get('mat-tab-group').should('be.visible')
      cy.get('mat-tab[label="Features"]').should('be.visible')
      cy.get('mat-tab[label="Components"]').should('be.visible')
      cy.get('mat-tab[label="About"]').should('be.visible')
      
      // Test tab switching
      cy.get('mat-tab[label="Components"]').click()
      cy.get('.components-showcase').should('be.visible')
    })

    it('should display feature cards with progress bars', () => {
      cy.get('.feature-card').should('have.length.greaterThan', 0)
      cy.get('.feature-card mat-progress-bar').should('be.visible')
      cy.get('.feature-card .progress-value').should('contain', '%')
    })
  })

  describe('Dashboard Page', () => {
    beforeEach(() => {
      cy.visit('/dashboard')
    })

    it('should display statistics cards', () => {
      cy.get('.stat-card').should('have.length', 4)
      cy.get('.stat-card .stat-value').should('be.visible')
      cy.get('.stat-card .stat-title').should('be.visible')
    })

    it('should display project progress section', () => {
      cy.get('.projects-card').should('be.visible')
      cy.get('mat-card-title').should('contain', 'Project Progress')
      cy.get('.project-item').should('have.length.greaterThan', 0)
      cy.get('.project-item mat-progress-bar').should('be.visible')
    })

    it('should display recent activities', () => {
      cy.get('.activities-card').should('be.visible')
      cy.get('mat-list-item').should('have.length.greaterThan', 0)
    })

    it('should display quick actions', () => {
      cy.get('.quick-actions-card').should('be.visible')
      cy.get('.action-button').should('have.length', 4)
    })
  })

  describe('Products Page', () => {
    beforeEach(() => {
      cy.visit('/products')
    })

    it('should display filters and search', () => {
      cy.get('.filters-card').should('be.visible')
      cy.get('input[placeholder="Search by name or description"]').should('be.visible')
      cy.get('mat-select').should('be.visible')
    })

    it('should display product cards', () => {
      cy.get('.product-card').should('have.length.greaterThan', 0)
      cy.get('.product-card mat-card-title').should('be.visible')
      cy.get('.product-card .price').should('be.visible')
    })

    it('should filter products by search', () => {
      cy.get('input[placeholder="Search by name or description"]').type('Angular')
      cy.get('.product-card').should('contain', 'Angular')
    })

    it('should filter products by category', () => {
      cy.get('mat-select').click()
      cy.get('mat-option').contains('Web Development').click()
      cy.get('.results-info').should('be.visible')
    })

    it('should display product ratings', () => {
      cy.get('.rating-section .stars mat-icon').should('be.visible')
      cy.get('.rating-text').should('contain', 'reviews')
    })
  })

  describe('Profile Page', () => {
    beforeEach(() => {
      cy.visit('/profile')
    })

    it('should display profile tabs', () => {
      cy.get('mat-tab-group').should('be.visible')
      cy.get('mat-tab[label="Profile"]').should('be.visible')
      cy.get('mat-tab[label="Security"]').should('be.visible')
      cy.get('mat-tab[label="Preferences"]').should('be.visible')
    })

    it('should display profile form', () => {
      cy.get('.profile-form-card').should('be.visible')
      cy.get('input[formControlName="name"]').should('be.visible')
      cy.get('input[formControlName="email"]').should('be.visible')
    })

    it('should display avatar section', () => {
      cy.get('.avatar-card').should('be.visible')
      cy.get('.avatar-placeholder').should('be.visible')
      cy.get('.user-info h3').should('be.visible')
    })

    it('should validate required fields', () => {
      cy.get('input[formControlName="name"]').clear()
      cy.get('input[formControlName="email"]').click()
      cy.get('mat-error').should('contain', 'Name is required')
    })

    it('should display notification preferences', () => {
      cy.get('mat-tab[label="Preferences"]').click()
      cy.get('mat-slide-toggle').should('have.length.greaterThan', 0)
    })
  })

  describe('Settings Page', () => {
    beforeEach(() => {
      cy.visit('/settings')
    })

    it('should display settings categories', () => {
      cy.get('.settings-card').should('have.length', 4)
      cy.get('mat-card-title').should('contain', 'General')
      cy.get('mat-card-title').should('contain', 'Display')
      cy.get('mat-card-title').should('contain', 'Privacy')
      cy.get('mat-card-title').should('contain', 'Notifications')
    })

    it('should have working form controls', () => {
      // Test select
      cy.get('mat-select').first().click()
      cy.get('mat-option').first().click()
      
      // Test slide toggles
      cy.get('mat-slide-toggle').first().click()
      
      // Test slider
      cy.get('mat-slider input').should('be.visible')
    })

    it('should have action buttons', () => {
      cy.get('.actions-card').should('be.visible')
      cy.get('button').should('contain', 'Save Settings')
      cy.get('button').should('contain', 'Reset to Defaults')
      cy.get('button').should('contain', 'Export Settings')
    })
  })

  describe('Material Design Components', () => {
    it('should have working buttons with ripple effects', () => {
      cy.visit('/home')
      cy.get('button[mat-raised-button]').should('be.visible')
      cy.get('button[mat-button]').should('be.visible')
    })

    it('should have working Material icons', () => {
      cy.get('mat-icon').should('be.visible')
      cy.get('mat-icon').should('have.length.greaterThan', 10)
    })

    it('should have responsive cards', () => {
      cy.visit('/dashboard')
      cy.get('mat-card').should('be.visible')
      
      // Test hover effects
      cy.get('mat-card').first().trigger('mouseover')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      cy.visit('/profile')
      cy.get('mat-form-field').should('exist')
    })

    it('should be keyboard navigable', () => {
      cy.visit('/home')
      cy.get('a[href="/dashboard"]').focus()
      cy.focused().should('be.visible')
    })

    it('should have proper heading hierarchy', () => {
      cy.visit('/home')
      cy.get('h1').should('exist')
      cy.get('h1').should('have.length', 1)
    })
  })
}) 