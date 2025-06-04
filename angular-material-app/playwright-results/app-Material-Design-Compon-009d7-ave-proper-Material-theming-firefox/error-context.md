# Test info

- Name: Material Design Components >> should have proper Material theming
- Location: C:\Games\AngularApp\angular-material-app\e2e\app.spec.ts:395:7

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveClass(expected)

Locator: locator('body')
Expected pattern: /mat-app-background/
Received string:  "mat-typography"
Call log:
  - expect.toHaveClass with timeout 5000ms
  - waiting for locator('body')
    8 × locator resolved to <body class="mat-typography">…</body>
      - unexpected value "mat-typography"

    at C:\Games\AngularApp\angular-material-app\e2e\app.spec.ts:399:40
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
  299 |     await page.click('mat-tab:has-text("Preferences")');
  300 |     
  301 |     const skillChips = page.locator('.skill-chip');
  302 |     await expect(skillChips).toHaveCount(5);
  303 |     
  304 |     // Test removing a skill
  305 |     await page.click('.skill-chip .remove-skill');
  306 |     await expect(page.locator('.skill-chip')).toHaveCount(4);
  307 |   });
  308 | });
  309 |
  310 | test.describe('Settings Page', () => {
  311 |   test.beforeEach(async ({ page }) => {
  312 |     await page.goto('/settings');
  313 |   });
  314 |
  315 |   test('should display settings categories', async ({ page }) => {
  316 |     await expect(page.locator('.settings-card')).toHaveCount(4);
  317 |     await expect(page.locator('mat-card-title:has-text("General")')).toBeVisible();
  318 |     await expect(page.locator('mat-card-title:has-text("Display")')).toBeVisible();
  319 |     await expect(page.locator('mat-card-title:has-text("Privacy")')).toBeVisible();
  320 |     await expect(page.locator('mat-card-title:has-text("Notifications")')).toBeVisible();
  321 |   });
  322 |
  323 |   test('should handle form controls', async ({ page }) => {
  324 |     // Test select dropdown
  325 |     await page.click('mat-select');
  326 |     await expect(page.locator('.cdk-overlay-container mat-option')).toHaveCount(3);
  327 |     await page.click('mat-option:has-text("Spanish")');
  328 |     
  329 |     // Test slide toggle
  330 |     const slideToggle = page.locator('mat-slide-toggle').first();
  331 |     await slideToggle.click();
  332 |     
  333 |     // Test slider
  334 |     const slider = page.locator('mat-slider input');
  335 |     await expect(slider).toBeVisible();
  336 |     await slider.fill('16');
  337 |     await expect(page.locator('.slider-label')).toContainText('16px');
  338 |   });
  339 |
  340 |   test('should handle action buttons', async ({ page }) => {
  341 |     await expect(page.locator('.actions-card')).toBeVisible();
  342 |     await expect(page.locator('button:has-text("Save Settings")')).toBeVisible();
  343 |     await expect(page.locator('button:has-text("Reset to Defaults")')).toBeVisible();
  344 |     await expect(page.locator('button:has-text("Export Settings")')).toBeVisible();
  345 |     
  346 |     // Test save button click
  347 |     await page.click('button:has-text("Save Settings")');
  348 |     // In a real app, this might show a success message
  349 |   });
  350 |
  351 |   test('should reset settings functionality', async ({ page }) => {
  352 |     // Change a setting first
  353 |     await page.click('mat-select');
  354 |     await page.click('mat-option:has-text("Spanish")');
  355 |     
  356 |     // Reset settings
  357 |     await page.click('button:has-text("Reset to Defaults")');
  358 |     
  359 |     // Verify reset (in a real app, you'd check the actual values)
  360 |     await expect(page.locator('mat-select')).toBeVisible();
  361 |   });
  362 | });
  363 |
  364 | test.describe('Material Design Components', () => {
  365 |   test('should display Material buttons correctly', async ({ page }) => {
  366 |     await page.goto('/home');
  367 |     
  368 |     await expect(page.locator('button[mat-raised-button]')).toBeVisible();
  369 |     await expect(page.locator('button[mat-button]')).toBeVisible();
  370 |     
  371 |     // Test button click
  372 |     await page.click('button[mat-raised-button]');
  373 |   });
  374 |
  375 |   test('should display Material icons', async ({ page }) => {
  376 |     await page.goto('/dashboard');
  377 |     
  378 |     const icons = page.locator('mat-icon');
  379 |     const iconCount = await icons.count();
  380 |     expect(iconCount).toBeGreaterThan(10);
  381 |   });
  382 |
  383 |   test('should handle Material overlays', async ({ page }) => {
  384 |     await page.goto('/settings');
  385 |     
  386 |     // Open select overlay
  387 |     await page.click('mat-select');
  388 |     await expect(page.locator('.cdk-overlay-container mat-option')).toBeVisible();
  389 |     
  390 |     // Close by clicking outside
  391 |     await page.click('body', { position: { x: 0, y: 0 } });
  392 |     await expect(page.locator('.cdk-overlay-container mat-option')).not.toBeVisible();
  393 |   });
  394 |
  395 |   test('should have proper Material theming', async ({ page }) => {
  396 |     await page.goto('/');
  397 |     
  398 |     // Check Material theme classes
> 399 |     await expect(page.locator('body')).toHaveClass(/mat-app-background/);
      |                                        ^ Error: Timed out 5000ms waiting for expect(locator).toHaveClass(expected)
  400 |     await expect(page.locator('mat-toolbar')).toHaveClass(/mat-toolbar/);
  401 |     await expect(page.locator('mat-card')).toHaveClass(/mat-card/);
  402 |   });
  403 | }); 
```