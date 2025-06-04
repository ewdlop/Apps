# Test info

- Name: Products Page >> should filter products by category
- Location: C:\Games\AngularApp\angular-material-app\e2e\app.spec.ts:205:7

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('.results-info')
Expected string: "Web Development"
Received string: "3 products found"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('.results-info')
    9 × locator resolved to <div class="results-info" _ngcontent-ng-c3230147431="">…</div>
      - unexpected value "3 products found"

    at C:\Games\AngularApp\angular-material-app\e2e\app.spec.ts:213:49
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
- combobox "Category": Web Development
- paragraph: 3 products found
- text: 🚀 Angular Material Dashboard A comprehensive admin dashboard built with Angular Material components. 4.8 (124 reviews) Angular Material Dashboard $49
- button "Preview"
- button "Buy Now"
- text: ⚡ React Component Library Reusable UI components for React applications with TypeScript support. 4.6 (89 reviews) React TypeScript Components $79
- button "Preview"
- button "Buy Now"
- text: 🛒 E-commerce Solution Complete e-commerce platform with shopping cart, payments, and admin panel. 4.9 (312 reviews) E-commerce Full-stack Payment $299
- button "Preview"
- button "Buy Now"
```

# Test source

```ts
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
> 213 |     await expect(page.locator('.results-info')).toContainText('Web Development');
      |                                                 ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
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
  246 |     await expect(page.locator('mat-tab:has-text("Profile")')).toBeVisible();
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
```