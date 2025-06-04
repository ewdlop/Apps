# Test info

- Name: Home Page >> should handle tab navigation
- Location: C:\Games\AngularApp\angular-material-app\e2e\app.spec.ts:83:7

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('.features-content')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('.features-content')

    at C:\Games\AngularApp\angular-material-app\e2e\app.spec.ts:85:53
```

# Page snapshot

```yaml
- heading "Angular Material App" [level=2]
- navigation:
  - link "Home":
    - /url: /home
  - link "Dashboard":
    - /url: /dashboard
  - link "Profile":
    - /url: /profile
  - link "Products":
    - /url: /products
  - link "Settings":
    - /url: /settings
- button
- button
- text: Welcome to Angular Material Build beautiful, usable products faster
- paragraph: Angular Material brings the best of Google's Material Design to Angular applications. This app showcases various Material components working together in a modern, responsive layout.
- text: Angular Material TypeScript SCSS RxJS
- button "Get Started"
- button "Learn More"
- tablist:
  - tab "Features" [selected]
  - tab "Components"
  - tab "About"
- tabpanel "Features":
  - text: Material Design
  - paragraph: Beautiful, accessible components following Material Design principles.
  - text: Implementation Progress
  - progressbar
  - text: 90%
  - button "EXPLORE"
  - button "DOCS"
  - text: Responsive Layout
  - paragraph: Flexible grid system that works on all screen sizes.
  - text: Implementation Progress
  - progressbar
  - text: 85%
  - button "EXPLORE"
  - button "DOCS"
  - text: Modern Angular
  - paragraph: Built with the latest Angular features and best practices.
  - text: Implementation Progress
  - progressbar
  - text: 95%
  - button "EXPLORE"
  - button "DOCS"
  - text: TypeScript
  - paragraph: Type-safe development with excellent IDE support.
  - text: Implementation Progress
  - progressbar
  - text: 88%
  - button "EXPLORE"
  - button "DOCS"
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Angular Material App', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     await page.goto('/');
   6 |   });
   7 |
   8 |   test('should load the application successfully', async ({ page }) => {
   9 |     // Check main navigation elements
   10 |     await expect(page.locator('.app-toolbar')).toBeVisible();
   11 |     await expect(page.locator('.app-sidenav')).toBeVisible();
   12 |     await expect(page.locator('text=Angular Material App')).toBeVisible();
   13 |
   14 |     // Check navigation items
   15 |     await expect(page.locator('a[href="/home"]')).toBeVisible();
   16 |     await expect(page.locator('a[href="/dashboard"]')).toBeVisible();
   17 |     await expect(page.locator('a[href="/profile"]')).toBeVisible();
   18 |     await expect(page.locator('a[href="/products"]')).toBeVisible();
   19 |     await expect(page.locator('a[href="/settings"]')).toBeVisible();
   20 |   });
   21 |
   22 |   test('should navigate between pages correctly', async ({ page }) => {
   23 |     // Navigate to Dashboard
   24 |     await page.click('a[href="/dashboard"]');
   25 |     await expect(page).toHaveURL(/.*dashboard/);
   26 |     await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
   27 |
   28 |     // Navigate to Products
   29 |     await page.click('a[href="/products"]');
   30 |     await expect(page).toHaveURL(/.*products/);
   31 |     await expect(page.locator('h1:has-text("Products")')).toBeVisible();
   32 |
   33 |     // Navigate to Profile
   34 |     await page.click('a[href="/profile"]');
   35 |     await expect(page).toHaveURL(/.*profile/);
   36 |     await expect(page.locator('h1:has-text("Profile Settings")')).toBeVisible();
   37 |
   38 |     // Navigate to Settings
   39 |     await page.click('a[href="/settings"]');
   40 |     await expect(page).toHaveURL(/.*settings/);
   41 |     await expect(page.locator('h1:has-text("Settings")')).toBeVisible();
   42 |   });
   43 |
   44 |   test('should highlight active navigation items', async ({ page }) => {
   45 |     await page.click('a[href="/dashboard"]');
   46 |     await expect(page.locator('a[href="/dashboard"]')).toHaveClass(/active-link/);
   47 |     
   48 |     await page.click('a[href="/products"]');
   49 |     await expect(page.locator('a[href="/products"]')).toHaveClass(/active-link/);
   50 |     await expect(page.locator('a[href="/dashboard"]')).not.toHaveClass(/active-link/);
   51 |   });
   52 |
   53 |   test('should be responsive', async ({ page }) => {
   54 |     // Test mobile view
   55 |     await page.setViewportSize({ width: 768, height: 1024 });
   56 |     await expect(page.locator('.menu-button')).toBeVisible();
   57 |
   58 |     // Test desktop view
   59 |     await page.setViewportSize({ width: 1280, height: 720 });
   60 |     await expect(page.locator('.menu-button')).not.toBeVisible();
   61 |   });
   62 | });
   63 |
   64 | test.describe('Home Page', () => {
   65 |   test.beforeEach(async ({ page }) => {
   66 |     await page.goto('/home');
   67 |   });
   68 |
   69 |   test('should display welcome content', async ({ page }) => {
   70 |     await expect(page.locator('.welcome-card')).toBeVisible();
   71 |     await expect(page.locator('mat-card-title:has-text("Welcome to Angular Material")')).toBeVisible();
   72 |     await expect(page.locator('mat-card-subtitle:has-text("Build beautiful, usable products faster")')).toBeVisible();
   73 |   });
   74 |
   75 |   test('should display technology chips', async ({ page }) => {
   76 |     await expect(page.locator('.tech-chips mat-chip')).toHaveCount(4);
   77 |     await expect(page.locator('mat-chip:has-text("Angular")')).toBeVisible();
   78 |     await expect(page.locator('mat-chip:has-text("Material")')).toBeVisible();
   79 |     await expect(page.locator('mat-chip:has-text("TypeScript")')).toBeVisible();
   80 |     await expect(page.locator('mat-chip:has-text("SCSS")')).toBeVisible();
   81 |   });
   82 |
   83 |   test('should handle tab navigation', async ({ page }) => {
   84 |     // Check initial tab
>  85 |     await expect(page.locator('.features-content')).toBeVisible();
      |                                                     ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
   86 |
   87 |     // Switch to Components tab
   88 |     await page.click('mat-tab:has-text("Components")');
   89 |     await expect(page.locator('.components-showcase')).toBeVisible();
   90 |
   91 |     // Switch to About tab
   92 |     await page.click('mat-tab:has-text("About")');
   93 |     await expect(page.locator('.about-content')).toBeVisible();
   94 |   });
   95 |
   96 |   test('should display feature cards with progress bars', async ({ page }) => {
   97 |     const featureCards = page.locator('.feature-card');
   98 |     await expect(featureCards).toHaveCount(4);
   99 |
  100 |     // Check progress bars are visible
  101 |     await expect(page.locator('.feature-card mat-progress-bar')).toHaveCount(4);
  102 |     
  103 |     // Check progress values
  104 |     const progressBars = page.locator('.feature-card mat-progress-bar');
  105 |     for (let i = 0; i < await progressBars.count(); i++) {
  106 |       await expect(progressBars.nth(i)).toHaveAttribute('value');
  107 |     }
  108 |   });
  109 | });
  110 |
  111 | test.describe('Dashboard Page', () => {
  112 |   test.beforeEach(async ({ page }) => {
  113 |     await page.goto('/dashboard');
  114 |   });
  115 |
  116 |   test('should display statistics cards', async ({ page }) => {
  117 |     await expect(page.locator('.stat-card')).toHaveCount(4);
  118 |     
  119 |     // Check each stat card has required elements
  120 |     const statCards = page.locator('.stat-card');
  121 |     for (let i = 0; i < await statCards.count(); i++) {
  122 |       await expect(statCards.nth(i).locator('.stat-value')).toBeVisible();
  123 |       await expect(statCards.nth(i).locator('.stat-title')).toBeVisible();
  124 |       await expect(statCards.nth(i).locator('.stat-icon')).toBeVisible();
  125 |       await expect(statCards.nth(i).locator('.stat-change')).toBeVisible();
  126 |     }
  127 |   });
  128 |
  129 |   test('should display project progress section', async ({ page }) => {
  130 |     await expect(page.locator('.projects-card')).toBeVisible();
  131 |     await expect(page.locator('mat-card-title:has-text("Project Progress")')).toBeVisible();
  132 |     
  133 |     const projectItems = page.locator('.project-item');
  134 |     await expect(projectItems).toHaveCount(4);
  135 |     
  136 |     // Check progress bars in projects
  137 |     await expect(page.locator('.project-item mat-progress-bar')).toHaveCount(4);
  138 |   });
  139 |
  140 |   test('should display recent activities', async ({ page }) => {
  141 |     await expect(page.locator('.activities-card')).toBeVisible();
  142 |     await expect(page.locator('mat-card-title:has-text("Recent Activities")')).toBeVisible();
  143 |     
  144 |     const activities = page.locator('mat-list-item');
  145 |     await expect(activities).toHaveCount(5);
  146 |     
  147 |     // Check each activity has an icon and timestamp
  148 |     for (let i = 0; i < await activities.count(); i++) {
  149 |       await expect(activities.nth(i).locator('mat-icon')).toBeVisible();
  150 |       await expect(activities.nth(i)).toContainText('ago');
  151 |     }
  152 |   });
  153 |
  154 |   test('should display quick actions', async ({ page }) => {
  155 |     await expect(page.locator('.quick-actions-card')).toBeVisible();
  156 |     await expect(page.locator('.action-button')).toHaveCount(4);
  157 |     
  158 |     // Test action button clicks
  159 |     await page.click('.action-button:has-text("Create New")');
  160 |     // In a real app, this might open a dialog or navigate somewhere
  161 |   });
  162 | });
  163 |
  164 | test.describe('Products Page', () => {
  165 |   test.beforeEach(async ({ page }) => {
  166 |     await page.goto('/products');
  167 |   });
  168 |
  169 |   test('should display filters and search', async ({ page }) => {
  170 |     await expect(page.locator('.filters-card')).toBeVisible();
  171 |     await expect(page.locator('input[placeholder="Search by name or description"]')).toBeVisible();
  172 |     await expect(page.locator('mat-select')).toBeVisible();
  173 |   });
  174 |
  175 |   test('should display product cards', async ({ page }) => {
  176 |     const productCards = page.locator('.product-card');
  177 |     await expect(productCards).toHaveCount(6);
  178 |     
  179 |     // Check each product card has required elements
  180 |     for (let i = 0; i < await productCards.count(); i++) {
  181 |       await expect(productCards.nth(i).locator('mat-card-title')).toBeVisible();
  182 |       await expect(productCards.nth(i).locator('.price')).toBeVisible();
  183 |       await expect(productCards.nth(i).locator('.rating-section')).toBeVisible();
  184 |       await expect(productCards.nth(i).locator('mat-chip')).toHaveCount(2);
  185 |     }
```