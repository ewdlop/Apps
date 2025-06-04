/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Simple navigation helper
Cypress.Commands.add('navigateToPage', (pageName: string) => {
  const pageMap: { [key: string]: string } = {
    'Home': '/home',
    'Dashboard': '/dashboard',
    'Profile': '/profile',
    'Products': '/products',
    'Settings': '/settings'
  }
  
  const href = pageMap[pageName]
  if (href) {
    cy.get(`a[href="${href}"]`).click()
    cy.url().should('include', href)
  }
})

// Material Select helper
Cypress.Commands.add('selectMatOption', (selectSelector: string, optionText: string) => {
  cy.get(selectSelector).click()
  cy.get('.cdk-overlay-container mat-option').contains(optionText).click()
})

// Wait for animations
Cypress.Commands.add('waitForMatAnimations', () => {
  cy.wait(300)
})

// Form field helper
Cypress.Commands.add('fillMatField', (fieldSelector: string, value: string) => {
  cy.get(fieldSelector).within(() => {
    cy.get('input, textarea').clear().type(value)
  })
})

// Tab navigation
Cypress.Commands.add('switchMatTab', (tabLabel: string) => {
  cy.get(`mat-tab[label="${tabLabel}"]`).click()
})

// Search helper
Cypress.Commands.add('searchProducts', (searchTerm: string) => {
  cy.get('input[placeholder="Search by name or description"]').type(searchTerm)
})

// Toggle helper  
Cypress.Commands.add('toggleMatSlideToggle', (toggleSelector: string) => {
  cy.get(toggleSelector).click()
})

// Card hover check
Cypress.Commands.add('checkMatCardHover', (cardSelector: string) => {
  cy.get(cardSelector).trigger('mouseover')
  cy.get(cardSelector).should('be.visible')
  cy.waitForMatAnimations()
})

// Progress bar verification
Cypress.Commands.add('verifyProgressBarValue', (progressBarSelector: string, expectedValue: number) => {
  cy.get(progressBarSelector).should('have.attr', 'aria-valuenow', expectedValue.toString())
  cy.get(progressBarSelector).should('have.attr', 'value', expectedValue.toString())
})

// Additional utility commands for Angular Material testing

// Form validation helper
Cypress.Commands.add('checkFormValidation', (formSelector: string, fieldName: string, invalidValue: string, expectedError: string) => {
  cy.get(formSelector).within(() => {
    cy.get(`[formControlName="${fieldName}"]`).clear().type(invalidValue)
    cy.get('button[type="submit"]').click()
    cy.get('mat-error').should('contain', expectedError)
  })
})

// Snackbar verification
Cypress.Commands.add('verifyMatSnackbar', (message: string) => {
  cy.get('simple-snack-bar').should('contain', message)
})

// Dialog handling
Cypress.Commands.add('closeMatDialog', () => {
  cy.get('.cdk-overlay-container .mat-dialog-container .mat-dialog-actions button').last().click()
  cy.waitForMatAnimations()
})

// Chip interaction
Cypress.Commands.add('removeMatChip', (chipText: string) => {
  cy.get('mat-chip').contains(chipText).find('mat-icon').click()
  cy.waitForMatAnimations()
})

// Stepper navigation
Cypress.Commands.add('goToMatStep', (stepIndex: number) => {
  cy.get('mat-step-header').eq(stepIndex).click()
  cy.waitForMatAnimations()
})

// Menu interaction
Cypress.Commands.add('openMatMenu', (triggerSelector: string) => {
  cy.get(triggerSelector).click()
  cy.get('.cdk-overlay-container mat-menu').should('be.visible')
})

declare global {
  namespace Cypress {
    interface Chainable {
      navigateToPage(pageName: string): Chainable<Element>
      selectMatOption(selectSelector: string, optionText: string): Chainable<Element>
      waitForMatAnimations(): Chainable<Element>
      fillMatField(fieldSelector: string, value: string): Chainable<Element>
      switchMatTab(tabLabel: string): Chainable<Element>
      searchProducts(searchTerm: string): Chainable<Element>
      toggleMatSlideToggle(toggleSelector: string): Chainable<Element>
      checkFormValidation(formSelector: string, fieldName: string, invalidValue: string, expectedError: string): Chainable<void>
      verifyMatSnackbar(message: string): Chainable<void>
      closeMatDialog(): Chainable<void>
      removeMatChip(chipText: string): Chainable<void>
      goToMatStep(stepIndex: number): Chainable<void>
      openMatMenu(triggerSelector: string): Chainable<void>
    }
  }
}
