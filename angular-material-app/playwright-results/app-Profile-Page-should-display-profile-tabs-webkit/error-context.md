# Test info

- Name: Profile Page >> should display profile tabs
- Location: C:\Games\AngularApp\angular-material-app\e2e\app.spec.ts:244:7

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('mat-tab:has-text("Profile")')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('mat-tab:has-text("Profile")')

    at C:\Games\AngularApp\angular-material-app\e2e\app.spec.ts:246:63
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
  - textbox "Full Name": John Doe
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
  186 |   });
  187 |
  188 |   test('should filter products by search', async ({ page }) => {
  189 |     const searchInput = page.locator('input[placeholder="Search by name or description"]');
  190 |     await searchInput.fill('Angular');
  191 |     
  192 |     // Wait for filtering to occur
  193 |     await page.waitForTimeout(500);
  194 |     
  195 |     const visibleProducts = page.locator('.product-card:visible');
  196 |     const count = await visibleProducts.count();
  197 |     expect(count).toBeLessThan(6);
  198 |     
  199 |     // Check that visible products contain the search term
  200 |     for (let i = 0; i < count; i++) {
  201 |       await expect(visibleProducts.nth(i)).toContainText('Angular');
  202 |     }
  203 |   });
  204 |
  205 |   test('should filter products by category', async ({ page }) => {
  206 |     await page.click('mat-select');
  207 |     await page.click('mat-option:has-text("Web Development")');
  208 |     
  209 |     // Wait for filtering
  210 |     await page.waitForTimeout(500);
  211 |     
  212 |     await expect(page.locator('.results-info')).toBeVisible();
  213 |     await expect(page.locator('.results-info')).toContainText('Web Development');
  214 |   });
  215 |
  216 |   test('should display star ratings correctly', async ({ page }) => {
  217 |     const ratingSection = page.locator('.rating-section');
  218 |     await expect(ratingSection).toHaveCount(6);
  219 |     
  220 |     // Check that each rating has 5 stars
  221 |     for (let i = 0; i < await ratingSection.count(); i++) {
  222 |       await expect(ratingSection.nth(i).locator('.stars mat-icon')).toHaveCount(5);
  223 |     }
  224 |   });
  225 |
  226 |   test('should handle no results state', async ({ page }) => {
  227 |     await page.fill('input[placeholder="Search by name or description"]', 'xyz123nonexistent');
  228 |     await page.waitForTimeout(500);
  229 |     
  230 |     await expect(page.locator('.no-results')).toBeVisible();
  231 |     await expect(page.locator('.no-results mat-icon:has-text("search_off")')).toBeVisible();
  232 |     
  233 |     // Clear search
  234 |     await page.click('.no-results button');
  235 |     await expect(page.locator('.product-card')).toHaveCount(6);
  236 |   });
  237 | });
  238 |
  239 | test.describe('Profile Page', () => {
  240 |   test.beforeEach(async ({ page }) => {
  241 |     await page.goto('/profile');
  242 |   });
  243 |
  244 |   test('should display profile tabs', async ({ page }) => {
  245 |     await expect(page.locator('mat-tab-group')).toBeVisible();
> 246 |     await expect(page.locator('mat-tab:has-text("Profile")')).toBeVisible();
      |                                                               ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  247 |     await expect(page.locator('mat-tab:has-text("Security")')).toBeVisible();
  248 |     await expect(page.locator('mat-tab:has-text("Preferences")')).toBeVisible();
  249 |   });
  250 |
  251 |   test('should display and validate profile form', async ({ page }) => {
  252 |     await expect(page.locator('.profile-form-card')).toBeVisible();
  253 |     await expect(page.locator('input[formControlName="name"]')).toBeVisible();
  254 |     await expect(page.locator('input[formControlName="email"]')).toBeVisible();
  255 |     
  256 |     // Test form validation
  257 |     await page.fill('input[formControlName="name"]', '');
  258 |     await page.click('input[formControlName="email"]');
  259 |     await expect(page.locator('mat-error:has-text("Name is required")')).toBeVisible();
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
```