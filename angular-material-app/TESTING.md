# Testing Guide for Angular Material App

This project is configured with Cypress for end-to-end testing of the Angular Material components and application functionality.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Angular CLI
- Chrome/Chromium browser

### Installation
Cypress is already installed and configured. If you need to reinstall:

```bash
npm install --save-dev cypress @cypress/schematic
```

## 🧪 Running Tests

### Interactive Mode (Cypress Test Runner)
```bash
npm run cypress:open
```
This opens the Cypress Test Runner where you can:
- See all test files
- Run tests interactively
- Debug test failures
- See real-time browser execution

### Headless Mode (CI/Command Line)
```bash
npm run cypress:run
```
This runs all tests in headless mode, suitable for CI/CD pipelines.

### Running Specific Tests
```bash
npx cypress run --spec "cypress/e2e/simple-test.cy.ts"
```

## 📁 Test Structure

```
cypress/
├── e2e/                          # End-to-end test files
│   ├── app.cy.ts                 # Comprehensive app tests
│   ├── components.cy.ts          # Material component tests
│   └── simple-test.cy.ts         # Basic functionality tests
├── fixtures/                     # Test data files
│   └── example.json
├── support/                      # Support files and commands
│   ├── commands.ts               # Custom Cypress commands
│   ├── e2e.ts                    # E2E support file
│   └── component.ts              # Component testing support
└── cypress.config.ts             # Cypress configuration
```

## 🎯 Test Coverage

### Application Features Tested

#### ✅ Navigation & Layout
- Sidenav navigation
- Responsive design (mobile/desktop)
- Route transitions
- Active navigation highlighting

#### ✅ Dashboard Components
- Statistics cards display
- Progress bars functionality
- Recent activities list
- Quick actions buttons

#### ✅ Products Page
- Search functionality
- Category filtering
- Product cards display
- Star ratings
- No results state

#### ✅ Profile Management
- Form validation
- Tab navigation
- Slide toggle interactions
- Avatar management
- Settings persistence

#### ✅ Settings Configuration
- Form controls (selects, toggles, sliders)
- Settings save/reset functionality
- Preference management
- Export functionality

#### ✅ Material Design Components
- Buttons and ripple effects
- Cards and hover states
- Form fields and validation
- Progress indicators
- Icons and theming
- Tabs and overlays

## 🛠️ Test Configuration

### Cypress Configuration (`cypress.config.ts`)
- **Base URL**: `http://localhost:4200`
- **Viewport**: 1280x720 (configurable per test)
- **Video Recording**: Enabled for E2E tests
- **Screenshots**: On failure
- **Timeouts**: 10 seconds for commands/requests

### Environment Variables
Configure in `cypress.config.ts`:
```typescript
env: {
  apiUrl: 'http://localhost:3000/api',
  // Add more environment variables as needed
}
```

## 📝 Writing Tests

### Basic Test Structure
```typescript
describe('Feature Name', () => {
  beforeEach(() => {
    cy.visit('/your-page')
  })

  it('should do something', () => {
    cy.get('[data-cy="element"]').should('be.visible')
    cy.get('[data-cy="button"]').click()
    cy.url().should('include', '/expected-route')
  })
})
```

### Testing Material Components

#### Material Buttons
```typescript
cy.get('button[mat-raised-button]').click()
cy.get('button').contains('Save').should('be.enabled')
```

#### Material Forms
```typescript
cy.get('mat-form-field input').type('test input')
cy.get('mat-error').should('contain', 'Required field')
```

#### Material Select
```typescript
cy.get('mat-select').click()
cy.get('mat-option').contains('Option Text').click()
```

#### Material Tabs
```typescript
cy.get('mat-tab[label="Tab Name"]').click()
cy.get('mat-tab-body').should('contain', 'Tab Content')
```

### Best Practices

#### 1. Use Data Attributes
```html
<button mat-button data-cy="save-button">Save</button>
```
```typescript
cy.get('[data-cy="save-button"]').click()
```

#### 2. Wait for Angular & Material Animations
```typescript
// Built-in Angular support
cy.visit('/page')
cy.get('mat-card').should('be.visible')

// For complex animations
cy.wait(300) // Material animation duration
```

#### 3. Test Real User Interactions
```typescript
// Good: Test the complete user flow
cy.get('input[placeholder="Search"]').type('Angular')
cy.get('.search-button').click()
cy.get('.results').should('contain', 'Angular')

// Avoid: Testing implementation details
```

## 🔄 Continuous Integration

### GitHub Actions Example
```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: cypress-io/github-action@v6
        with:
          build: npm run build
          start: npm start
          wait-on: 'http://localhost:4200'
```

### Test Reporting
Cypress generates:
- **Videos**: `cypress/videos/` (on headless runs)
- **Screenshots**: `cypress/screenshots/` (on failures)
- **Test Results**: Console output and optional reporters

## 🐛 Debugging Tests

### Common Issues & Solutions

#### 1. Element Not Found
```typescript
// Wait for element to appear
cy.get('[data-cy="dynamic-element"]', { timeout: 10000 })
  .should('be.visible')

// Check if element exists first
cy.get('body').then($body => {
  if ($body.find('[data-cy="optional-element"]').length > 0) {
    cy.get('[data-cy="optional-element"]').click()
  }
})
```

#### 2. Material Overlays
```typescript
// Wait for overlay to appear
cy.get('.cdk-overlay-container mat-option').should('be.visible')

// Close overlay by clicking outside
cy.get('body').click(0, 0)
```

#### 3. Form Validation Timing
```typescript
// Trigger validation
cy.get('input[formControlName="email"]').type('invalid')
cy.get('input[formControlName="name"]').focus()
cy.get('mat-error').should('be.visible')
```

## 📊 Test Reports

### Viewing Results
- **Interactive Mode**: Real-time results in Test Runner
- **Headless Mode**: Terminal output with pass/fail summary
- **Videos**: Located in `cypress/videos/`
- **Screenshots**: Located in `cypress/screenshots/`

### Custom Reporting
Add reporters in `cypress.config.ts`:
```typescript
reporter: 'mochawesome',
reporterOptions: {
  reportDir: 'cypress/reports',
  overwrite: false,
  html: false,
  json: true
}
```

## 🚀 Advanced Usage

### Page Object Model
```typescript
// cypress/support/pages/dashboard.page.ts
export class DashboardPage {
  visit() {
    cy.visit('/dashboard')
  }

  getStatCard(index: number) {
    return cy.get('.stat-card').eq(index)
  }

  clickQuickAction(action: string) {
    cy.get('.action-button').contains(action).click()
  }
}
```

### Custom Commands
```typescript
// cypress/support/commands.ts
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.request({
    method: 'POST',
    url: '/api/login',
    body: { email, password }
  }).then(response => {
    window.localStorage.setItem('token', response.body.token)
  })
})
```

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Angular Material Testing Guide](https://material.angular.io/guide/testing)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Angular Testing with Cypress](https://docs.cypress.io/guides/component-testing/angular/overview)

## 🤝 Contributing

When adding new features:
1. Write tests for new components/pages
2. Follow the existing test structure
3. Use descriptive test names
4. Add appropriate assertions
5. Test both happy path and error cases

Run tests before submitting PRs:
```bash
npm run cypress:run
``` 