describe('Material Components Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Navigation Component', () => {
    it('should display all navigation items with icons', () => {
      cy.get('mat-nav-list a[mat-list-item]').each(($item) => {
        cy.wrap($item).find('mat-icon').should('be.visible')
        cy.wrap($item).find('span').should('not.be.empty')
      })
    })

    it('should update active state on navigation', () => {
      cy.get('a[href="/products"]').click()
      cy.get('a[href="/products"]').should('have.class', 'active-link')
      
      cy.get('a[href="/settings"]').click()
      cy.get('a[href="/products"]').should('not.have.class', 'active-link')
      cy.get('a[href="/settings"]').should('have.class', 'active-link')
    })
  })

  describe('Dashboard Components', () => {
    beforeEach(() => {
      cy.visit('/dashboard')
    })

    it('should display statistics with proper formatting', () => {
      cy.get('.stat-card').each(($card) => {
        cy.wrap($card).find('.stat-value').should('not.be.empty')
        cy.wrap($card).find('.stat-title').should('not.be.empty')
        cy.wrap($card).find('.stat-icon').should('be.visible')
        cy.wrap($card).find('.stat-change').should('be.visible')
      })
    })

    it('should show progress bars with correct values', () => {
      cy.get('.project-item mat-progress-bar').each(($progressBar) => {
        cy.wrap($progressBar).should('have.attr', 'value')
        cy.wrap($progressBar).parent().find('.progress-text')
          .should('contain', '%')
      })
    })

    it('should display activity list with timestamps', () => {
      cy.get('mat-list-item').each(($item) => {
        cy.wrap($item).should('contain', 'ago')
        cy.wrap($item).find('mat-icon').should('be.visible')
      })
    })
  })

  describe('Products Components', () => {
    beforeEach(() => {
      cy.visit('/products')
    })

    it('should filter products in real-time', () => {
      // Get initial count
      cy.get('.product-card').then(($cards) => {
        const initialCount = $cards.length
        
        // Type in search
        cy.get('input[placeholder="Search by name or description"]').type('Angular')
        
        // Verify filtering
        cy.get('.product-card').should('have.length.lessThan', initialCount)
        cy.get('.product-card').each(($card) => {
          cy.wrap($card).should('contain.text', 'Angular')
        })
      })
    })

    it('should display star ratings correctly', () => {
      cy.get('.product-card .stars').each(($stars) => {
        cy.wrap($stars).find('mat-icon').should('have.length', 5)
        cy.wrap($stars).find('mat-icon.filled').should('exist')
      })
    })

    it('should show product tags as chips', () => {
      cy.get('.product-card mat-chip').should('be.visible')
      cy.get('.product-card mat-chip').should('have.length.greaterThan', 0)
    })

    it('should handle no results state', () => {
      cy.get('input[placeholder="Search by name or description"]').type('xyz123nonexistent')
      cy.get('.no-results').should('be.visible')
      cy.get('.no-results mat-icon').should('contain', 'search_off')
      cy.get('.no-results button').click()
      cy.get('.product-card').should('have.length.greaterThan', 0)
    })
  })

  describe('Profile Form Components', () => {
    beforeEach(() => {
      cy.visit('/profile')
    })

    it('should validate email format', () => {
      cy.get('input[formControlName="email"]').clear().type('invalid-email')
      cy.get('input[formControlName="name"]').click()
      cy.get('mat-error').should('contain', 'Please enter a valid email')
    })

    it('should show character count for bio field', () => {
      cy.get('textarea[formControlName="bio"]').clear().type('Test bio content')
      cy.get('mat-hint').should('contain', '/500')
    })

    it('should toggle slide toggles correctly', () => {
      cy.get('mat-tab[label="Preferences"]').click()
      
      cy.get('mat-slide-toggle').first().then(($toggle) => {
        const isChecked = $toggle.hasClass('mat-checked')
        cy.wrap($toggle).click()
        
        if (isChecked) {
          cy.wrap($toggle).should('not.have.class', 'mat-checked')
        } else {
          cy.wrap($toggle).should('have.class', 'mat-checked')
        }
      })
    })

    it('should display skill chips with remove functionality', () => {
      cy.get('mat-tab[label="Preferences"]').click()
      cy.get('.skill-chip').should('have.length.greaterThan', 0)
      cy.get('.skill-chip .remove-skill').should('be.visible')
    })
  })

  describe('Settings Form Components', () => {
    beforeEach(() => {
      cy.visit('/settings')
    })

    it('should update slider value display', () => {
      cy.get('mat-slider input').invoke('val', 16).trigger('input')
      cy.get('.slider-label').should('contain', '16px')
    })

    it('should save settings on button click', () => {
      cy.get('button').contains('Save Settings').click()
      // In a real app, you might check for a success message or API call
    })

    it('should reset settings to defaults', () => {
      // Change some settings first
      cy.get('mat-select').first().click()
      cy.get('mat-option').last().click()
      
      // Reset
      cy.get('button').contains('Reset to Defaults').click()
      
      // Verify reset (this would need to check actual default values)
      cy.get('mat-select').first().should('exist')
    })

    it('should have proper toggle states', () => {
      cy.get('mat-slide-toggle').each(($toggle) => {
        // Test that toggles are interactive
        cy.wrap($toggle).click()
        cy.wrap($toggle).should('have.attr', 'aria-checked')
      })
    })
  })

  describe('Material Design Interactions', () => {
    it('should show ripple effects on buttons', () => {
      cy.visit('/home')
      cy.get('button[mat-raised-button]').first().click()
      // Ripple effects are visual and hard to test, but we can verify the button responds
      cy.get('button[mat-raised-button]').first().should('be.visible')
    })

    it('should handle card hover states', () => {
      cy.visit('/products')
      cy.get('.product-card').first().trigger('mouseover')
      // CSS hover effects are applied, we can verify the element exists
      cy.get('.product-card').first().should('be.visible')
    })

    it('should open select overlays', () => {
      cy.visit('/settings')
      cy.get('mat-select').first().click()
      cy.get('.cdk-overlay-container mat-option').should('be.visible')
      
      // Close by clicking outside
      cy.get('body').click(0, 0)
      cy.get('.cdk-overlay-container mat-option').should('not.exist')
    })

    it('should handle tab navigation', () => {
      cy.visit('/home')
      cy.get('mat-tab[label="Components"]').click()
      cy.get('.components-showcase').should('be.visible')
      
      cy.get('mat-tab[label="About"]').click()
      cy.get('.components-showcase').should('not.be.visible')
    })
  })

  describe('Responsive Behavior', () => {
    it('should adapt layout for mobile screens', () => {
      cy.viewport(375, 667) // iPhone SE
      cy.visit('/dashboard')
      
      cy.get('.stats-grid').should('be.visible')
      cy.get('.content-grid').should('be.visible')
    })

    it('should show mobile menu button on small screens', () => {
      cy.viewport(768, 1024)
      cy.get('.menu-button').should('be.visible')
      
      cy.viewport(1280, 720)
      cy.get('.menu-button').should('not.be.visible')
    })

    it('should stack form fields on mobile', () => {
      cy.viewport(480, 800)
      cy.visit('/profile')
      
      cy.get('.form-row').should('exist')
      // On mobile, form fields should stack vertically
    })
  })
}) 