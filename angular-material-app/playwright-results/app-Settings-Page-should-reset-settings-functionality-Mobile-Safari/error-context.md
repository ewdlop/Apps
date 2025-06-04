# Test info

- Name: Settings Page >> should reset settings functionality
- Location: C:\Games\AngularApp\angular-material-app\e2e\app.spec.ts:351:7

# Error details

```
Error: expect.toBeVisible: Error: strict mode violation: locator('mat-select') resolved to 4 elements:
    1) <mat-select tabindex="0" role="combobox" id="mat-select-0" aria-invalid="false" aria-expanded="false" aria-required="false" aria-disabled="false" aria-haspopup="listbox" _ngcontent-ng-c2716059831="" aria-labelledby="mat-mdc-form-field-label-0" class="mat-mdc-select ng-valid ng-touched ng-dirty">…</mat-select> aka getByRole('combobox', { name: 'Language' })
    2) <mat-select tabindex="0" role="combobox" id="mat-select-1" aria-invalid="false" aria-expanded="false" aria-required="false" aria-disabled="false" aria-haspopup="listbox" _ngcontent-ng-c2716059831="" aria-labelledby="mat-mdc-form-field-label-1" class="mat-mdc-select ng-untouched ng-pristine ng-valid">…</mat-select> aka getByRole('combobox', { name: 'Timezone' })
    3) <mat-select tabindex="0" role="combobox" id="mat-select-2" aria-invalid="false" aria-expanded="false" aria-required="false" aria-disabled="false" aria-haspopup="listbox" _ngcontent-ng-c2716059831="" aria-labelledby="mat-mdc-form-field-label-2" class="mat-mdc-select ng-untouched ng-pristine ng-valid">…</mat-select> aka getByRole('combobox', { name: 'Theme' })
    4) <mat-select tabindex="0" role="combobox" id="mat-select-3" aria-invalid="false" aria-expanded="false" aria-required="false" aria-disabled="false" aria-haspopup="listbox" _ngcontent-ng-c2716059831="" aria-labelledby="mat-mdc-form-field-label-3" class="mat-mdc-select ng-untouched ng-pristine ng-valid">…</mat-select> aka getByRole('combobox', { name: 'Notification Frequency' })

Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('mat-select')

    at C:\Games\AngularApp\angular-material-app\e2e\app.spec.ts:360:46
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
- heading "Settings" [level=1]
- paragraph: Configure your application preferences and account settings
- text: General Basic application settings Language
- combobox "Language": English
- text: Timezone
- combobox "Timezone": (UTC-08:00) Pacific Time (US & Canada)
- text: Theme
- combobox "Theme": Dark Theme
- text: Auto-save Automatically save changes
- switch [checked]
- text: "Display Customize your viewing experience Font Size: 14px"
- slider: "12"
- separator
- text: Show Animations Enable UI animations and transitions
- switch [checked]
- text: Compact Mode Use smaller spacing and components
- switch
- text: Show Tooltips Display helpful tooltips on hover
- switch [checked]
- text: Privacy Control your data and privacy preferences Analytics Help improve the app by sharing usage data
- switch [checked]
- text: Cookies Allow cookies for better experience
- switch [checked]
- text: Personalized Ads Show ads based on your interests
- switch
- text: Data Sharing Share anonymized data with partners
- switch
- text: Notifications Manage how you receive notifications Email Notifications Receive notifications via email
- switch [checked]
- text: Push Notifications Receive browser push notifications
- switch
- text: Sound Play sound for notifications
- switch [checked]
- separator
- text: Notification Frequency
- combobox "Notification Frequency": Instant
- button "Save Settings"
- button "Reset to Defaults"
- button "Export Settings"
```

# Test source

```ts
  260 |     
  261 |     // Test email validation
  262 |     await page.fill('input[formControlName="email"]', 'invalid-email');
  263 |     await page.click('input[formControlName="name"]');
  264 |     await expect(page.locator('mat-error:has-text("Please enter a valid email")')).toBeVisible();
  265 |   });
  266 |
  267 |   test('should display avatar section', async ({ page }) => {
  268 |     await expect(page.locator('.avatar-card')).toBeVisible();
  269 |     await expect(page.locator('.avatar-placeholder')).toBeVisible();
  270 |     await expect(page.locator('.user-info h3')).toBeVisible();
  271 |   });
  272 |
  273 |   test('should handle security tab', async ({ page }) => {
  274 |     await page.click('mat-tab:has-text("Security")');
  275 |     await expect(page.locator('.security-form-card')).toBeVisible();
  276 |     await expect(page.locator('input[formControlName="currentPassword"]')).toBeVisible();
  277 |     await expect(page.locator('input[formControlName="newPassword"]')).toBeVisible();
  278 |     await expect(page.locator('input[formControlName="confirmPassword"]')).toBeVisible();
  279 |   });
  280 |
  281 |   test('should handle preferences tab with toggles', async ({ page }) => {
  282 |     await page.click('mat-tab:has-text("Preferences")');
  283 |     
  284 |     const slideToggles = page.locator('mat-slide-toggle');
  285 |     await expect(slideToggles).toHaveCount(4);
  286 |     
  287 |     // Test toggle functionality
  288 |     const firstToggle = slideToggles.first();
  289 |     const isCheckedBefore = await firstToggle.getAttribute('class');
  290 |     await firstToggle.click();
  291 |     
  292 |     // Verify toggle state changed
  293 |     await page.waitForTimeout(300); // Wait for animation
  294 |     const isCheckedAfter = await firstToggle.getAttribute('class');
  295 |     expect(isCheckedBefore).not.toBe(isCheckedAfter);
  296 |   });
  297 |
  298 |   test('should display and manage skill chips', async ({ page }) => {
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
> 360 |     await expect(page.locator('mat-select')).toBeVisible();
      |                                              ^ Error: expect.toBeVisible: Error: strict mode violation: locator('mat-select') resolved to 4 elements:
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
  399 |     await expect(page.locator('body')).toHaveClass(/mat-app-background/);
  400 |     await expect(page.locator('mat-toolbar')).toHaveClass(/mat-toolbar/);
  401 |     await expect(page.locator('mat-card')).toHaveClass(/mat-card/);
  402 |   });
  403 | }); 
```