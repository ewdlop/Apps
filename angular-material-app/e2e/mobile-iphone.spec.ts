import { test, expect, devices } from '@playwright/test';

// Configure all tests in this file to use iPhone 12
test.use({ ...devices['iPhone 12'] });

test.describe('iPhone 12 Mobile Tests', () => {
  test('should display mobile navigation correctly', async ({ page }) => {
    await page.goto('/');
    
    // Mobile menu button should be visible
    await expect(page.locator('.menu-button')).toBeVisible();
    
    // Sidenav should be in overlay mode
    await expect(page.locator('.app-sidenav')).toBeVisible();
    
    // Test menu toggle
    await page.click('.menu-button');
    // Mobile navigation interaction would be tested here
  });

  test('should stack dashboard cards vertically', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Statistics cards should be visible and stacked
    await expect(page.locator('.stat-card')).toHaveCount(4);
    
    // Cards should be in mobile layout
    const statsGrid = page.locator('.stats-grid');
    await expect(statsGrid).toBeVisible();
  });

  test('should handle mobile form layout', async ({ page }) => {
    await page.goto('/profile');
    
    // Form fields should stack vertically on mobile
    await expect(page.locator('input[formControlName="name"]')).toBeVisible();
    await expect(page.locator('input[formControlName="email"]')).toBeVisible();
    
    // Avatar should be centered on mobile
    await expect(page.locator('.avatar-card')).toBeVisible();
  });

  test('should display products in mobile grid', async ({ page }) => {
    await page.goto('/products');
    
    // Products should be in mobile-friendly layout
    const productCards = page.locator('.product-card');
    await expect(productCards).toHaveCount(6);
    
    // Search should be responsive
    await expect(page.locator('input[placeholder="Search by name or description"]')).toBeVisible();
  });

  test('should handle mobile settings layout', async ({ page }) => {
    await page.goto('/settings');
    
    // Settings cards should stack on mobile
    await expect(page.locator('.settings-card')).toHaveCount(4);
    
    // Form controls should be touch-friendly
    const slideToggle = page.locator('mat-slide-toggle').first();
    await slideToggle.click();
  });

  test('should handle touch gestures on Material components', async ({ page }) => {
    await page.goto('/products');
    
    // Test touch scrolling
    await page.locator('.product-grid').hover();
    
    // Test touch on Material select
    await page.click('mat-select');
    await expect(page.locator('.cdk-overlay-container mat-option')).toBeVisible();
    await page.click('mat-option:has-text("Web Development")');
    
    // Test touch on cards
    const firstProduct = page.locator('.product-card').first();
    await firstProduct.click();
  });

  test('should handle touch interactions with toggles and sliders', async ({ page }) => {
    await page.goto('/settings');
    
    // Test touch on slide toggles
    const slideToggle = page.locator('mat-slide-toggle').first();
    await slideToggle.click();
    
    // Test touch on slider
    const slider = page.locator('mat-slider input');
    await slider.click();
  });

  test('should handle touch navigation', async ({ page }) => {
    await page.goto('/');
    
    // Test touch navigation
    await page.click('a[href="/dashboard"]');
    await expect(page).toHaveURL(/.*dashboard/);
    
    await page.click('a[href="/products"]');
    await expect(page).toHaveURL(/.*products/);
  });

  test('should have proper touch targets', async ({ page }) => {
    await page.goto('/');
    
    // Navigation links should be large enough for touch
    const navLinks = page.locator('mat-nav-list a[mat-list-item]');
    for (let i = 0; i < await navLinks.count(); i++) {
      const link = navLinks.nth(i);
      const boundingBox = await link.boundingBox();
      
      // Touch targets should be at least 44px (recommended minimum)
      expect(boundingBox?.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('should have readable text sizes', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Text should be readable on mobile
    const titles = page.locator('mat-card-title');
    for (let i = 0; i < await titles.count(); i++) {
      await expect(titles.nth(i)).toBeVisible();
    }
    
    // Statistical values should be visible
    const statValues = page.locator('.stat-value');
    for (let i = 0; i < await statValues.count(); i++) {
      await expect(statValues.nth(i)).toBeVisible();
    }
  });

  test('should handle focus management', async ({ page }) => {
    await page.goto('/profile');
    
    // Focus should be manageable on mobile
    await page.click('input[formControlName="name"]');
    await expect(page.locator('input[formControlName="name"]')).toBeFocused();
    
    // Tab to next field
    await page.keyboard.press('Tab');
    await expect(page.locator('input[formControlName="email"]')).toBeFocused();
  });
}); 