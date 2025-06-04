# Playwright Testing Guide for Angular Material App

This guide covers end-to-end testing using Playwright for the Angular Material application. Playwright provides reliable, fast, and comprehensive cross-browser testing capabilities.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Angular CLI
- All major browsers (Chromium, Firefox, Safari/WebKit)

### Installation
Playwright is already configured in this project. If you need to reinstall:

```bash
npm install --save-dev @playwright/test playwright
npx playwright install
```

## 🧪 Running Tests

### All Tests (Headless)
```bash
npm run playwright
```

### Interactive UI Mode
```bash
npm run playwright:ui
```
Opens the Playwright Test Runner UI where you can:
- See all test files and results
- Run tests interactively
- Debug test failures
- View test traces and videos

### Headed Mode (Visible Browser)
```bash
npm run playwright:headed
```

### Debug Mode
```bash
npm run playwright:debug
```
Opens browser with debugging tools and pauses on failures.

### View Test Reports
```bash
npm run playwright:report
```
Opens the HTML test report with detailed results, screenshots, and videos.

### Running Specific Tests
```bash
# Run specific test file
npx playwright test e2e/app.spec.ts

# Run specific test by name
npx playwright test -g "should load the application successfully"

# Run tests for specific browser
npx playwright test --project=chromium
```

## 📁 Test Structure

```
e2e/
├── app.spec.ts              # Main application tests
├── mobile.spec.ts           # Cross-device and responsive tests
├── mobile-iphone.spec.ts    # iPhone 12 specific tests
└── fixtures/                # Test data (if needed)
playwright.config.ts         # Playwright configuration
playwright-report/           # Generated test reports
playwright-results/          # Test artifacts (videos, screenshots)
```

## 📋 Test Files Overview

### Main Application Tests (`e2e/app.spec.ts`)
Comprehensive tests covering all pages and Material Design components across all configured browsers.

### Cross-Device Tests (`e2e/mobile.spec.ts`)  
Tests that dynamically change viewport sizes to test responsive behavior without specific device configurations.

### Device-Specific Tests (`e2e/mobile-iphone.spec.ts`)
Tests configured specifically for iPhone 12 device emulation with proper touch interactions and mobile-specific behaviors.

> **Note**: Device configurations using `test.use({ ...devices['device'] })` must be placed at the top level of test files, not inside `describe` blocks. This is why device-specific tests are in separate files.

## 🎯 Test Coverage

### ✅ Core Application Features
- **Navigation & Routing**: All page navigation, active states, URL validation
- **Responsive Design**: Mobile, tablet, desktop layouts
- **Form Validation**: Real-time validation, error states, success scenarios
- **Material Components**: All Material Design components and interactions

### ✅ Page-Specific Testing

#### Home Page
- Welcome content display
- Technology chips
- Tab navigation (Features, Components, About)
- Feature cards with progress bars

#### Dashboard
- Statistics cards (4 cards with values, icons, trends)
- Project progress section with progress bars
- Recent activities list
- Quick action buttons

#### Products
- Search functionality with real-time filtering
- Category dropdown filtering
- Product cards (6 products with ratings, chips, pricing)
- Star ratings (5-star system)
- No results state handling

#### Profile
- Multi-tab interface (Profile, Security, Preferences)
- Form validation (name, email, bio)
- Avatar management
- Slide toggles for preferences
- Skill chips with remove functionality

#### Settings
- Four settings categories (General, Display, Privacy, Notifications)
- Form controls (selects, toggles, sliders)
- Settings persistence simulation
- Action buttons (Save, Reset, Export)

### ✅ Cross-Browser Testing
- **Chromium** (Chrome/Edge)
- **Firefox**
- **WebKit** (Safari)
- **Mobile Chrome** (Pixel 5)
- **Mobile Safari** (iPhone 12)

### ✅ Mobile & Responsive Testing
- Touch interactions
- Viewport adaptations
- Orientation changes
- Touch target accessibility
- Mobile navigation patterns

## 🛠️ Configuration Features

### Playwright Configuration (`playwright.config.ts`)

```typescript
export default defineConfig({
  testDir: './e2e',                    // Test directory
  fullyParallel: true,                 // Run tests in parallel
  retries: process.env.CI ? 2 : 0,     // Retry failed tests on CI
  workers: process.env.CI ? 1 : undefined, // Worker processes
  
  reporter: [
    ['html'],                          // HTML report
    ['json'],                          // JSON results
    ['junit']                          // JUnit XML for CI
  ],
  
  use: {
    baseURL: 'http://localhost:4200',   // Angular dev server
    trace: 'on-first-retry',           // Trace on failures
    screenshot: 'only-on-failure',     // Screenshots on failures
    video: 'retain-on-failure',        // Videos on failures
  },
  
  webServer: {
    command: 'npm start',              // Start Angular dev server
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
```

### Multi-Browser Testing
Tests run across multiple browser engines and devices:
- Desktop: Chrome, Firefox, Safari, Edge
- Mobile: iPhone 12, Pixel 5
- Tablet: iPad Pro

## 📝 Writing Tests

### Basic Test Structure
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/your-page');
  });

  test('should do something', async ({ page }) => {
    await expect(page.locator('[data-testid="element"]')).toBeVisible();
    await page.click('button');
    await expect(page).toHaveURL(/expected-path/);
  });
});
```

### Testing Material Components

#### Material Buttons
```typescript
await expect(page.locator('button[mat-raised-button]')).toBeVisible();
await page.click('button:has-text("Save")');
```

#### Material Forms
```typescript
await page.fill('input[formControlName="email"]', 'test@example.com');
await expect(page.locator('mat-error')).toContainText('Required field');
```

#### Material Selects
```typescript
await page.click('mat-select');
await page.click('mat-option:has-text("Option Text")');
await expect(page.locator('.cdk-overlay-container')).not.toBeVisible();
```

#### Material Tabs
```typescript
await page.click('mat-tab:has-text("Security")');
await expect(page.locator('mat-tab-body')).toContainText('Security content');
```

#### Material Slide Toggles
```typescript
const toggle = page.locator('mat-slide-toggle').first();
await toggle.click();
// Verify state change
const isChecked = await toggle.getAttribute('class');
expect(isChecked).toContain('mat-checked');
```

### Mobile Testing
```typescript
test.describe('Mobile Tests', () => {
  test.use({ ...devices['iPhone 12'] });
  
  test('should work on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.menu-button')).toBeVisible();
  });
});
```

### Cross-Browser Testing
```typescript
// Run only on Chromium
test.describe('Chromium only', () => {
  test.use({ browserName: 'chromium' });
  
  test('should work in Chrome', async ({ page }) => {
    // Chrome-specific test
  });
});
```

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Playwright Tests
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install dependencies
        run: npm ci
        
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
        
      - name: Run Playwright tests
        run: npm run playwright
        
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### Docker Integration
```dockerfile
FROM mcr.microsoft.com/playwright:v1.40.0-focal

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

CMD ["npm", "run", "playwright"]
```

## 🐛 Debugging Tests

### Debugging Tools
1. **UI Mode**: `npm run playwright:ui` - Interactive debugging
2. **Debug Mode**: `npm run playwright:debug` - Step-by-step debugging
3. **Trace Viewer**: View detailed execution traces
4. **Screenshots**: Automatic on failures
5. **Videos**: Recorded test execution

### Common Debugging Techniques

#### Wait for Elements
```typescript
// Wait for element to be visible
await expect(page.locator('[data-testid="loading"]')).toBeVisible();
await expect(page.locator('[data-testid="loading"]')).not.toBeVisible();

// Wait with timeout
await page.locator('.dynamic-content').waitFor({ timeout: 10000 });
```

#### Handle Async Operations
```typescript
// Wait for network requests
await Promise.all([
  page.waitForResponse('**/api/data'),
  page.click('button[data-action="load"]')
]);

// Wait for navigation
await Promise.all([
  page.waitForURL('**/new-page'),
  page.click('a[href="/new-page"]')
]);
```

#### Debug with Console Logs
```typescript
test('debug test', async ({ page }) => {
  page.on('console', msg => console.log(msg.text()));
  await page.goto('/');
});
```

## 📊 Test Reports

### HTML Report
The HTML report includes:
- Test results summary
- Failed test details
- Screenshots and videos
- Test execution timeline
- Cross-browser comparison

Access with: `npm run playwright:report`

### Artifacts
- **Videos**: `playwright-results/` (on failures)
- **Screenshots**: `playwright-results/` (on failures)
- **Traces**: Detailed execution traces for debugging

### CI Reports
- **JUnit XML**: For CI integration
- **JSON**: For custom reporting tools

## ⚡ Performance & Best Practices

### Speed Optimization
1. **Parallel Execution**: Tests run in parallel by default
2. **Smart Retries**: Only retry flaky tests
3. **Shared Contexts**: Reuse browser contexts when possible
4. **Selective Testing**: Run only changed test files

### Best Practices

#### 1. Use Data Test IDs
```html
<button data-testid="save-button" mat-raised-button>Save</button>
```
```typescript
await page.click('[data-testid="save-button"]');
```

#### 2. Wait for Elements Properly
```typescript
// Good: Wait for visibility
await expect(page.locator('.result')).toBeVisible();

// Avoid: Fixed delays
await page.waitForTimeout(1000); // Only when necessary
```

#### 3. Test User Workflows
```typescript
test('complete user workflow', async ({ page }) => {
  // Test the complete user journey
  await page.goto('/products');
  await page.fill('[data-testid="search"]', 'Angular');
  await page.click('[data-testid="search-button"]');
  await expect(page.locator('.product-card')).toContainText('Angular');
});
```

#### 4. Group Related Tests
```typescript
test.describe('Product Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
  });
  
  // Related tests here
});
```

## 🚀 Advanced Features

### Page Object Model
```typescript
// pages/dashboard.page.ts
export class DashboardPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/dashboard');
  }

  async getStatValue(index: number) {
    return this.page.locator('.stat-card .stat-value').nth(index).textContent();
  }

  async clickQuickAction(action: string) {
    await this.page.click(`.action-button:has-text("${action}")`);
  }
}

// In test file
test('dashboard test', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.goto();
  const value = await dashboard.getStatValue(0);
  expect(value).toBeTruthy();
});
```

### Custom Fixtures
```typescript
// fixtures.ts
export const test = base.extend<{ dashboard: DashboardPage }>({
  dashboard: async ({ page }, use) => {
    const dashboard = new DashboardPage(page);
    await use(dashboard);
  },
});

// In test
test('with fixture', async ({ dashboard }) => {
  await dashboard.goto();
  // Use dashboard methods
});
```

### API Testing Integration
```typescript
test('API + UI test', async ({ page, request }) => {
  // API setup
  await request.post('/api/users', { data: { name: 'Test User' } });
  
  // UI verification
  await page.goto('/users');
  await expect(page.locator('text=Test User')).toBeVisible();
});
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Angular Testing with Playwright](https://playwright.dev/docs/test-frameworks)
- [Material Design Testing](https://material.angular.io/guide/testing)
- [Best Practices](https://playwright.dev/docs/best-practices)

## 🤝 Contributing

When adding new features:
1. Write Playwright tests for new components/pages
2. Follow the existing test structure
3. Use descriptive test names
4. Add appropriate assertions
5. Test across different browsers/devices
6. Include mobile responsiveness tests

Run tests before submitting PRs:
```bash
npm run playwright
```

## 🔧 Troubleshooting

### Common Issues

#### Browser Installation
```bash
npx playwright install
npx playwright install-deps
```

#### Port Conflicts
Update `baseURL` in `playwright.config.ts` if using different port.

#### Flaky Tests
Add `test.setTimeout()` or use proper waiting strategies instead of fixed delays.

#### Debug Test Failures
```bash
npm run playwright:debug
npm run playwright:ui
```

This comprehensive Playwright setup ensures robust, reliable, and maintainable end-to-end testing for your Angular Material application across all browsers and devices. 