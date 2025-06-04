# Test info

- Name: Orientation Changes >> should maintain functionality in landscape mode
- Location: C:\Games\AngularApp\angular-material-app\e2e\mobile.spec.ts:56:7

# Error details

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('mat-tab:has-text("Security")')

    at C:\Games\AngularApp\angular-material-app\e2e\mobile.spec.ts:65:16
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
- heading "Profile Settings" [level=1]
- paragraph: Manage your account settings and preferences
- tablist:
  - tab "Profile" [selected]
  - tab "Security"
  - tab "Preferences"
- tabpanel "Profile":
  - button
  - heading "John Doe" [level=3]
  - paragraph: john.doe@example.com
  - paragraph: Member since March 2019
  - text: Personal Information Update your profile details Full Name
  - textbox "Full Name": Test User
  - text: Email
  - textbox "Email": john.doe@example.com
  - text: Phone
  - textbox "Phone": +1 (555) 123-4567
  - text: Country
  - combobox "Country": United States
  - text: Location
  - textbox "Location": San Francisco, CA
  - text: Website
  - textbox "Website": https://johndoe.dev
  - text: Bio
  - textbox "Bio": Full-stack developer with 5+ years of experience in Angular and Node.js.
  - text: 72/500
  - button "Save Changes"
  - button "Cancel"
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Cross-Device Navigation', () => {
   4 |   test('should maintain navigation state across viewport changes', async ({ page }) => {
   5 |     await page.goto('/dashboard');
   6 |     await expect(page).toHaveURL(/.*dashboard/);
   7 |     
   8 |     // Start on desktop
   9 |     await page.setViewportSize({ width: 1280, height: 720 });
   10 |     await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
   11 |     
   12 |     // Switch to mobile
   13 |     await page.setViewportSize({ width: 375, height: 667 });
   14 |     await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
   15 |     await expect(page).toHaveURL(/.*dashboard/);
   16 |     
   17 |     // Switch to tablet
   18 |     await page.setViewportSize({ width: 768, height: 1024 });
   19 |     await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
   20 |     await expect(page).toHaveURL(/.*dashboard/);
   21 |   });
   22 |
   23 |   test('should handle form interactions across devices', async ({ page }) => {
   24 |     await page.goto('/profile');
   25 |     
   26 |     // Test form on desktop
   27 |     await page.setViewportSize({ width: 1280, height: 720 });
   28 |     await page.fill('input[formControlName="name"]', 'John Doe');
   29 |     await page.fill('input[formControlName="email"]', 'john@example.com');
   30 |     
   31 |     // Switch to mobile and verify form state
   32 |     await page.setViewportSize({ width: 375, height: 667 });
   33 |     await expect(page.locator('input[formControlName="name"]')).toHaveValue('John Doe');
   34 |     await expect(page.locator('input[formControlName="email"]')).toHaveValue('john@example.com');
   35 |     
   36 |     // Form should still be functional on mobile
   37 |     await page.fill('input[formControlName="name"]', 'Jane Doe');
   38 |     await expect(page.locator('input[formControlName="name"]')).toHaveValue('Jane Doe');
   39 |   });
   40 | });
   41 |
   42 | test.describe('Orientation Changes', () => {
   43 |   test('should handle portrait to landscape orientation', async ({ page }) => {
   44 |     // Start in portrait
   45 |     await page.setViewportSize({ width: 375, height: 667 });
   46 |     await page.goto('/dashboard');
   47 |     
   48 |     await expect(page.locator('.stats-grid')).toBeVisible();
   49 |     
   50 |     // Switch to landscape
   51 |     await page.setViewportSize({ width: 667, height: 375 });
   52 |     await expect(page.locator('.stats-grid')).toBeVisible();
   53 |     await expect(page.locator('.stat-card')).toHaveCount(4);
   54 |   });
   55 |
   56 |   test('should maintain functionality in landscape mode', async ({ page }) => {
   57 |     await page.setViewportSize({ width: 667, height: 375 }); // Landscape mobile
   58 |     await page.goto('/profile');
   59 |     
   60 |     // Form should still be functional
   61 |     await expect(page.locator('input[formControlName="name"]')).toBeVisible();
   62 |     await page.fill('input[formControlName="name"]', 'Test User');
   63 |     
   64 |     // Tab navigation should work
>  65 |     await page.click('mat-tab:has-text("Security")');
      |                ^ Error: page.click: Test timeout of 30000ms exceeded.
   66 |     await expect(page.locator('.security-form-card')).toBeVisible();
   67 |   });
   68 | });
   69 |
   70 | test.describe('Responsive Design Tests', () => {
   71 |   test('should show mobile menu button on small screens', async ({ page }) => {
   72 |     await page.goto('/');
   73 |     
   74 |     // Test mobile view
   75 |     await page.setViewportSize({ width: 768, height: 1024 });
   76 |     await expect(page.locator('.menu-button')).toBeVisible();
   77 |     
   78 |     // Test desktop view
   79 |     await page.setViewportSize({ width: 1280, height: 720 });
   80 |     await expect(page.locator('.menu-button')).not.toBeVisible();
   81 |   });
   82 |
   83 |   test('should adapt dashboard layout for different screen sizes', async ({ page }) => {
   84 |     await page.goto('/dashboard');
   85 |     
   86 |     // Mobile layout
   87 |     await page.setViewportSize({ width: 375, height: 667 });
   88 |     await expect(page.locator('.stats-grid')).toBeVisible();
   89 |     await expect(page.locator('.stat-card')).toHaveCount(4);
   90 |     
   91 |     // Tablet layout
   92 |     await page.setViewportSize({ width: 768, height: 1024 });
   93 |     await expect(page.locator('.stats-grid')).toBeVisible();
   94 |     
   95 |     // Desktop layout
   96 |     await page.setViewportSize({ width: 1280, height: 720 });
   97 |     await expect(page.locator('.stats-grid')).toBeVisible();
   98 |   });
   99 |
  100 |   test('should handle products grid responsively', async ({ page }) => {
  101 |     await page.goto('/products');
  102 |     
  103 |     // Test search functionality across screen sizes
  104 |     const searchInput = page.locator('input[placeholder="Search by name or description"]');
  105 |     
  106 |     // Mobile
  107 |     await page.setViewportSize({ width: 375, height: 667 });
  108 |     await expect(searchInput).toBeVisible();
  109 |     await searchInput.fill('Angular');
  110 |     await page.waitForTimeout(500);
  111 |     
  112 |     // Tablet
  113 |     await page.setViewportSize({ width: 768, height: 1024 });
  114 |     await expect(searchInput).toBeVisible();
  115 |     
  116 |     // Desktop
  117 |     await page.setViewportSize({ width: 1280, height: 720 });
  118 |     await expect(searchInput).toBeVisible();
  119 |   });
  120 | }); 
```