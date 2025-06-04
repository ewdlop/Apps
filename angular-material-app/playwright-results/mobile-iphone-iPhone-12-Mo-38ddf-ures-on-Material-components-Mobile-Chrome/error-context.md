# Test info

- Name: iPhone 12 Mobile Tests >> should handle touch gestures on Material components
- Location: C:\Games\AngularApp\angular-material-app\e2e\mobile-iphone.spec.ts:65:7

# Error details

```
Error: locator.hover: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.product-grid')

    at C:\Games\AngularApp\angular-material-app\e2e\mobile-iphone.spec.ts:69:41
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
- button
- heading "Products" [level=1]
- paragraph: Discover our collection of premium development tools and templates
- text: Search products
- textbox "Search products"
- text: Category
- combobox "Category": All Categories
- paragraph: 6 products found
- text: 🚀 Angular Material Dashboard A comprehensive admin dashboard built with Angular Material components. 4.8 (124 reviews) Angular Material Dashboard $49
- button "Preview"
- button "Buy Now"
- text: ⚡ React Component Library Reusable UI components for React applications with TypeScript support. 4.6 (89 reviews) React TypeScript Components $79
- button "Preview"
- button "Buy Now"
- text: 📱 Mobile App Template Cross-platform mobile app template with modern UI and navigation. 4.9 (156 reviews) React Native Mobile Template $99
- button "Preview"
- button "Buy Now"
- text: 🔧 REST API Backend Scalable Node.js API with authentication and database integration. 4.7 (203 reviews) Node.js API Backend $129
- button "Preview"
- button "Buy Now"
- text: 💻 Desktop Application Cross-platform desktop app built with Electron and modern web technologies. 4.5 (67 reviews) Electron Desktop Cross-platform $159
- button "Preview"
- button "Buy Now"
- text: 🛒 E-commerce Solution Complete e-commerce platform with shopping cart, payments, and admin panel. 4.9 (312 reviews) E-commerce Full-stack Payment $299
- button "Preview"
- button "Buy Now"
```

# Test source

```ts
   1 | import { test, expect, devices } from '@playwright/test';
   2 |
   3 | // Configure all tests in this file to use iPhone 12
   4 | test.use({ ...devices['iPhone 12'] });
   5 |
   6 | test.describe('iPhone 12 Mobile Tests', () => {
   7 |   test('should display mobile navigation correctly', async ({ page }) => {
   8 |     await page.goto('/');
   9 |     
   10 |     // Mobile menu button should be visible
   11 |     await expect(page.locator('.menu-button')).toBeVisible();
   12 |     
   13 |     // Sidenav should be in overlay mode
   14 |     await expect(page.locator('.app-sidenav')).toBeVisible();
   15 |     
   16 |     // Test menu toggle
   17 |     await page.click('.menu-button');
   18 |     // Mobile navigation interaction would be tested here
   19 |   });
   20 |
   21 |   test('should stack dashboard cards vertically', async ({ page }) => {
   22 |     await page.goto('/dashboard');
   23 |     
   24 |     // Statistics cards should be visible and stacked
   25 |     await expect(page.locator('.stat-card')).toHaveCount(4);
   26 |     
   27 |     // Cards should be in mobile layout
   28 |     const statsGrid = page.locator('.stats-grid');
   29 |     await expect(statsGrid).toBeVisible();
   30 |   });
   31 |
   32 |   test('should handle mobile form layout', async ({ page }) => {
   33 |     await page.goto('/profile');
   34 |     
   35 |     // Form fields should stack vertically on mobile
   36 |     await expect(page.locator('input[formControlName="name"]')).toBeVisible();
   37 |     await expect(page.locator('input[formControlName="email"]')).toBeVisible();
   38 |     
   39 |     // Avatar should be centered on mobile
   40 |     await expect(page.locator('.avatar-card')).toBeVisible();
   41 |   });
   42 |
   43 |   test('should display products in mobile grid', async ({ page }) => {
   44 |     await page.goto('/products');
   45 |     
   46 |     // Products should be in mobile-friendly layout
   47 |     const productCards = page.locator('.product-card');
   48 |     await expect(productCards).toHaveCount(6);
   49 |     
   50 |     // Search should be responsive
   51 |     await expect(page.locator('input[placeholder="Search by name or description"]')).toBeVisible();
   52 |   });
   53 |
   54 |   test('should handle mobile settings layout', async ({ page }) => {
   55 |     await page.goto('/settings');
   56 |     
   57 |     // Settings cards should stack on mobile
   58 |     await expect(page.locator('.settings-card')).toHaveCount(4);
   59 |     
   60 |     // Form controls should be touch-friendly
   61 |     const slideToggle = page.locator('mat-slide-toggle').first();
   62 |     await slideToggle.click();
   63 |   });
   64 |
   65 |   test('should handle touch gestures on Material components', async ({ page }) => {
   66 |     await page.goto('/products');
   67 |     
   68 |     // Test touch scrolling
>  69 |     await page.locator('.product-grid').hover();
      |                                         ^ Error: locator.hover: Test timeout of 30000ms exceeded.
   70 |     
   71 |     // Test touch on Material select
   72 |     await page.click('mat-select');
   73 |     await expect(page.locator('.cdk-overlay-container mat-option')).toBeVisible();
   74 |     await page.click('mat-option:has-text("Web Development")');
   75 |     
   76 |     // Test touch on cards
   77 |     const firstProduct = page.locator('.product-card').first();
   78 |     await firstProduct.click();
   79 |   });
   80 |
   81 |   test('should handle touch interactions with toggles and sliders', async ({ page }) => {
   82 |     await page.goto('/settings');
   83 |     
   84 |     // Test touch on slide toggles
   85 |     const slideToggle = page.locator('mat-slide-toggle').first();
   86 |     await slideToggle.click();
   87 |     
   88 |     // Test touch on slider
   89 |     const slider = page.locator('mat-slider input');
   90 |     await slider.click();
   91 |   });
   92 |
   93 |   test('should handle touch navigation', async ({ page }) => {
   94 |     await page.goto('/');
   95 |     
   96 |     // Test touch navigation
   97 |     await page.click('a[href="/dashboard"]');
   98 |     await expect(page).toHaveURL(/.*dashboard/);
   99 |     
  100 |     await page.click('a[href="/products"]');
  101 |     await expect(page).toHaveURL(/.*products/);
  102 |   });
  103 |
  104 |   test('should have proper touch targets', async ({ page }) => {
  105 |     await page.goto('/');
  106 |     
  107 |     // Navigation links should be large enough for touch
  108 |     const navLinks = page.locator('mat-nav-list a[mat-list-item]');
  109 |     for (let i = 0; i < await navLinks.count(); i++) {
  110 |       const link = navLinks.nth(i);
  111 |       const boundingBox = await link.boundingBox();
  112 |       
  113 |       // Touch targets should be at least 44px (recommended minimum)
  114 |       expect(boundingBox?.height).toBeGreaterThanOrEqual(44);
  115 |     }
  116 |   });
  117 |
  118 |   test('should have readable text sizes', async ({ page }) => {
  119 |     await page.goto('/dashboard');
  120 |     
  121 |     // Text should be readable on mobile
  122 |     const titles = page.locator('mat-card-title');
  123 |     for (let i = 0; i < await titles.count(); i++) {
  124 |       await expect(titles.nth(i)).toBeVisible();
  125 |     }
  126 |     
  127 |     // Statistical values should be visible
  128 |     const statValues = page.locator('.stat-value');
  129 |     for (let i = 0; i < await statValues.count(); i++) {
  130 |       await expect(statValues.nth(i)).toBeVisible();
  131 |     }
  132 |   });
  133 |
  134 |   test('should handle focus management', async ({ page }) => {
  135 |     await page.goto('/profile');
  136 |     
  137 |     // Focus should be manageable on mobile
  138 |     await page.click('input[formControlName="name"]');
  139 |     await expect(page.locator('input[formControlName="name"]')).toBeFocused();
  140 |     
  141 |     // Tab to next field
  142 |     await page.keyboard.press('Tab');
  143 |     await expect(page.locator('input[formControlName="email"]')).toBeFocused();
  144 |   });
  145 | }); 
```