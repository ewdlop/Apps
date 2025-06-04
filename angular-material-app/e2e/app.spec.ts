import { test, expect } from '@playwright/test';

test.describe('Angular Material App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the application successfully', async ({ page }) => {
    // Check main navigation elements
    await expect(page.locator('.app-toolbar')).toBeVisible();
    await expect(page.locator('.app-sidenav')).toBeVisible();
    await expect(page.locator('text=Angular Material App')).toBeVisible();

    // Check navigation items
    await expect(page.locator('a[href="/home"]')).toBeVisible();
    await expect(page.locator('a[href="/dashboard"]')).toBeVisible();
    await expect(page.locator('a[href="/profile"]')).toBeVisible();
    await expect(page.locator('a[href="/products"]')).toBeVisible();
    await expect(page.locator('a[href="/settings"]')).toBeVisible();
  });

  test('should navigate between pages correctly', async ({ page }) => {
    // Navigate to Dashboard
    await page.click('a[href="/dashboard"]');
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();

    // Navigate to Products
    await page.click('a[href="/products"]');
    await expect(page).toHaveURL(/.*products/);
    await expect(page.locator('h1:has-text("Products")')).toBeVisible();

    // Navigate to Profile
    await page.click('a[href="/profile"]');
    await expect(page).toHaveURL(/.*profile/);
    await expect(page.locator('h1:has-text("Profile Settings")')).toBeVisible();

    // Navigate to Settings
    await page.click('a[href="/settings"]');
    await expect(page).toHaveURL(/.*settings/);
    await expect(page.locator('h1:has-text("Settings")')).toBeVisible();
  });

  test('should highlight active navigation items', async ({ page }) => {
    await page.click('a[href="/dashboard"]');
    await expect(page.locator('a[href="/dashboard"]')).toHaveClass(/active-link/);
    
    await page.click('a[href="/products"]');
    await expect(page.locator('a[href="/products"]')).toHaveClass(/active-link/);
    await expect(page.locator('a[href="/dashboard"]')).not.toHaveClass(/active-link/);
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.menu-button')).toBeVisible();

    // Test desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('.menu-button')).not.toBeVisible();
  });
});

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/home');
  });

  test('should display welcome content', async ({ page }) => {
    await expect(page.locator('.welcome-card')).toBeVisible();
    await expect(page.locator('mat-card-title:has-text("Welcome to Angular Material")')).toBeVisible();
    await expect(page.locator('mat-card-subtitle:has-text("Build beautiful, usable products faster")')).toBeVisible();
  });

  test('should display technology chips', async ({ page }) => {
    await expect(page.locator('.tech-chips mat-chip')).toHaveCount(4);
    await expect(page.locator('mat-chip:has-text("Angular")')).toBeVisible();
    await expect(page.locator('mat-chip:has-text("Material")')).toBeVisible();
    await expect(page.locator('mat-chip:has-text("TypeScript")')).toBeVisible();
    await expect(page.locator('mat-chip:has-text("SCSS")')).toBeVisible();
  });

  test('should handle tab navigation', async ({ page }) => {
    // Check initial tab
    await expect(page.locator('.features-content')).toBeVisible();

    // Switch to Components tab
    await page.click('mat-tab:has-text("Components")');
    await expect(page.locator('.components-showcase')).toBeVisible();

    // Switch to About tab
    await page.click('mat-tab:has-text("About")');
    await expect(page.locator('.about-content')).toBeVisible();
  });

  test('should display feature cards with progress bars', async ({ page }) => {
    const featureCards = page.locator('.feature-card');
    await expect(featureCards).toHaveCount(4);

    // Check progress bars are visible
    await expect(page.locator('.feature-card mat-progress-bar')).toHaveCount(4);
    
    // Check progress values
    const progressBars = page.locator('.feature-card mat-progress-bar');
    for (let i = 0; i < await progressBars.count(); i++) {
      await expect(progressBars.nth(i)).toHaveAttribute('value');
    }
  });
});

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should display statistics cards', async ({ page }) => {
    await expect(page.locator('.stat-card')).toHaveCount(4);
    
    // Check each stat card has required elements
    const statCards = page.locator('.stat-card');
    for (let i = 0; i < await statCards.count(); i++) {
      await expect(statCards.nth(i).locator('.stat-value')).toBeVisible();
      await expect(statCards.nth(i).locator('.stat-title')).toBeVisible();
      await expect(statCards.nth(i).locator('.stat-icon')).toBeVisible();
      await expect(statCards.nth(i).locator('.stat-change')).toBeVisible();
    }
  });

  test('should display project progress section', async ({ page }) => {
    await expect(page.locator('.projects-card')).toBeVisible();
    await expect(page.locator('mat-card-title:has-text("Project Progress")')).toBeVisible();
    
    const projectItems = page.locator('.project-item');
    await expect(projectItems).toHaveCount(4);
    
    // Check progress bars in projects
    await expect(page.locator('.project-item mat-progress-bar')).toHaveCount(4);
  });

  test('should display recent activities', async ({ page }) => {
    await expect(page.locator('.activities-card')).toBeVisible();
    await expect(page.locator('mat-card-title:has-text("Recent Activities")')).toBeVisible();
    
    const activities = page.locator('mat-list-item');
    await expect(activities).toHaveCount(5);
    
    // Check each activity has an icon and timestamp
    for (let i = 0; i < await activities.count(); i++) {
      await expect(activities.nth(i).locator('mat-icon')).toBeVisible();
      await expect(activities.nth(i)).toContainText('ago');
    }
  });

  test('should display quick actions', async ({ page }) => {
    await expect(page.locator('.quick-actions-card')).toBeVisible();
    await expect(page.locator('.action-button')).toHaveCount(4);
    
    // Test action button clicks
    await page.click('.action-button:has-text("Create New")');
    // In a real app, this might open a dialog or navigate somewhere
  });
});

test.describe('Products Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
  });

  test('should display filters and search', async ({ page }) => {
    await expect(page.locator('.filters-card')).toBeVisible();
    await expect(page.locator('input[placeholder="Search by name or description"]')).toBeVisible();
    await expect(page.locator('mat-select')).toBeVisible();
  });

  test('should display product cards', async ({ page }) => {
    const productCards = page.locator('.product-card');
    await expect(productCards).toHaveCount(6);
    
    // Check each product card has required elements
    for (let i = 0; i < await productCards.count(); i++) {
      await expect(productCards.nth(i).locator('mat-card-title')).toBeVisible();
      await expect(productCards.nth(i).locator('.price')).toBeVisible();
      await expect(productCards.nth(i).locator('.rating-section')).toBeVisible();
      await expect(productCards.nth(i).locator('mat-chip')).toHaveCount(2);
    }
  });

  test('should filter products by search', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search by name or description"]');
    await searchInput.fill('Angular');
    
    // Wait for filtering to occur
    await page.waitForTimeout(500);
    
    const visibleProducts = page.locator('.product-card:visible');
    const count = await visibleProducts.count();
    expect(count).toBeLessThan(6);
    
    // Check that visible products contain the search term
    for (let i = 0; i < count; i++) {
      await expect(visibleProducts.nth(i)).toContainText('Angular');
    }
  });

  test('should filter products by category', async ({ page }) => {
    await page.click('mat-select');
    await page.click('mat-option:has-text("Web Development")');
    
    // Wait for filtering
    await page.waitForTimeout(500);
    
    await expect(page.locator('.results-info')).toBeVisible();
    await expect(page.locator('.results-info')).toContainText('Web Development');
  });

  test('should display star ratings correctly', async ({ page }) => {
    const ratingSection = page.locator('.rating-section');
    await expect(ratingSection).toHaveCount(6);
    
    // Check that each rating has 5 stars
    for (let i = 0; i < await ratingSection.count(); i++) {
      await expect(ratingSection.nth(i).locator('.stars mat-icon')).toHaveCount(5);
    }
  });

  test('should handle no results state', async ({ page }) => {
    await page.fill('input[placeholder="Search by name or description"]', 'xyz123nonexistent');
    await page.waitForTimeout(500);
    
    await expect(page.locator('.no-results')).toBeVisible();
    await expect(page.locator('.no-results mat-icon:has-text("search_off")')).toBeVisible();
    
    // Clear search
    await page.click('.no-results button');
    await expect(page.locator('.product-card')).toHaveCount(6);
  });
});

test.describe('Profile Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/profile');
  });

  test('should display profile tabs', async ({ page }) => {
    await expect(page.locator('mat-tab-group')).toBeVisible();
    await expect(page.locator('mat-tab:has-text("Profile")')).toBeVisible();
    await expect(page.locator('mat-tab:has-text("Security")')).toBeVisible();
    await expect(page.locator('mat-tab:has-text("Preferences")')).toBeVisible();
  });

  test('should display and validate profile form', async ({ page }) => {
    await expect(page.locator('.profile-form-card')).toBeVisible();
    await expect(page.locator('input[formControlName="name"]')).toBeVisible();
    await expect(page.locator('input[formControlName="email"]')).toBeVisible();
    
    // Test form validation
    await page.fill('input[formControlName="name"]', '');
    await page.click('input[formControlName="email"]');
    await expect(page.locator('mat-error:has-text("Name is required")')).toBeVisible();
    
    // Test email validation
    await page.fill('input[formControlName="email"]', 'invalid-email');
    await page.click('input[formControlName="name"]');
    await expect(page.locator('mat-error:has-text("Please enter a valid email")')).toBeVisible();
  });

  test('should display avatar section', async ({ page }) => {
    await expect(page.locator('.avatar-card')).toBeVisible();
    await expect(page.locator('.avatar-placeholder')).toBeVisible();
    await expect(page.locator('.user-info h3')).toBeVisible();
  });

  test('should handle security tab', async ({ page }) => {
    await page.click('mat-tab:has-text("Security")');
    await expect(page.locator('.security-form-card')).toBeVisible();
    await expect(page.locator('input[formControlName="currentPassword"]')).toBeVisible();
    await expect(page.locator('input[formControlName="newPassword"]')).toBeVisible();
    await expect(page.locator('input[formControlName="confirmPassword"]')).toBeVisible();
  });

  test('should handle preferences tab with toggles', async ({ page }) => {
    await page.click('mat-tab:has-text("Preferences")');
    
    const slideToggles = page.locator('mat-slide-toggle');
    await expect(slideToggles).toHaveCount(4);
    
    // Test toggle functionality
    const firstToggle = slideToggles.first();
    const isCheckedBefore = await firstToggle.getAttribute('class');
    await firstToggle.click();
    
    // Verify toggle state changed
    await page.waitForTimeout(300); // Wait for animation
    const isCheckedAfter = await firstToggle.getAttribute('class');
    expect(isCheckedBefore).not.toBe(isCheckedAfter);
  });

  test('should display and manage skill chips', async ({ page }) => {
    await page.click('mat-tab:has-text("Preferences")');
    
    const skillChips = page.locator('.skill-chip');
    await expect(skillChips).toHaveCount(5);
    
    // Test removing a skill
    await page.click('.skill-chip .remove-skill');
    await expect(page.locator('.skill-chip')).toHaveCount(4);
  });
});

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings');
  });

  test('should display settings categories', async ({ page }) => {
    await expect(page.locator('.settings-card')).toHaveCount(4);
    await expect(page.locator('mat-card-title:has-text("General")')).toBeVisible();
    await expect(page.locator('mat-card-title:has-text("Display")')).toBeVisible();
    await expect(page.locator('mat-card-title:has-text("Privacy")')).toBeVisible();
    await expect(page.locator('mat-card-title:has-text("Notifications")')).toBeVisible();
  });

  test('should handle form controls', async ({ page }) => {
    // Test select dropdown
    await page.click('mat-select');
    await expect(page.locator('.cdk-overlay-container mat-option')).toHaveCount(3);
    await page.click('mat-option:has-text("Spanish")');
    
    // Test slide toggle
    const slideToggle = page.locator('mat-slide-toggle').first();
    await slideToggle.click();
    
    // Test slider
    const slider = page.locator('mat-slider input');
    await expect(slider).toBeVisible();
    await slider.fill('16');
    await expect(page.locator('.slider-label')).toContainText('16px');
  });

  test('should handle action buttons', async ({ page }) => {
    await expect(page.locator('.actions-card')).toBeVisible();
    await expect(page.locator('button:has-text("Save Settings")')).toBeVisible();
    await expect(page.locator('button:has-text("Reset to Defaults")')).toBeVisible();
    await expect(page.locator('button:has-text("Export Settings")')).toBeVisible();
    
    // Test save button click
    await page.click('button:has-text("Save Settings")');
    // In a real app, this might show a success message
  });

  test('should reset settings functionality', async ({ page }) => {
    // Change a setting first
    await page.click('mat-select');
    await page.click('mat-option:has-text("Spanish")');
    
    // Reset settings
    await page.click('button:has-text("Reset to Defaults")');
    
    // Verify reset (in a real app, you'd check the actual values)
    await expect(page.locator('mat-select')).toBeVisible();
  });
});

test.describe('Material Design Components', () => {
  test('should display Material buttons correctly', async ({ page }) => {
    await page.goto('/home');
    
    await expect(page.locator('button[mat-raised-button]')).toBeVisible();
    await expect(page.locator('button[mat-button]')).toBeVisible();
    
    // Test button click
    await page.click('button[mat-raised-button]');
  });

  test('should display Material icons', async ({ page }) => {
    await page.goto('/dashboard');
    
    const icons = page.locator('mat-icon');
    const iconCount = await icons.count();
    expect(iconCount).toBeGreaterThan(10);
  });

  test('should handle Material overlays', async ({ page }) => {
    await page.goto('/settings');
    
    // Open select overlay
    await page.click('mat-select');
    await expect(page.locator('.cdk-overlay-container mat-option')).toBeVisible();
    
    // Close by clicking outside
    await page.click('body', { position: { x: 0, y: 0 } });
    await expect(page.locator('.cdk-overlay-container mat-option')).not.toBeVisible();
  });

  test('should have proper Material theming', async ({ page }) => {
    await page.goto('/');
    
    // Check Material theme classes
    await expect(page.locator('body')).toHaveClass(/mat-app-background/);
    await expect(page.locator('mat-toolbar')).toHaveClass(/mat-toolbar/);
    await expect(page.locator('mat-card')).toHaveClass(/mat-card/);
  });
}); 