import { test, expect } from '@playwright/test';

test.describe('Cross-Device Navigation', () => {
  test('should maintain navigation state across viewport changes', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*dashboard/);
    
    // Start on desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
    
    // Switch to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
    await expect(page).toHaveURL(/.*dashboard/);
    
    // Switch to tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should handle form interactions across devices', async ({ page }) => {
    await page.goto('/profile');
    
    // Test form on desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.fill('input[formControlName="name"]', 'John Doe');
    await page.fill('input[formControlName="email"]', 'john@example.com');
    
    // Switch to mobile and verify form state
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('input[formControlName="name"]')).toHaveValue('John Doe');
    await expect(page.locator('input[formControlName="email"]')).toHaveValue('john@example.com');
    
    // Form should still be functional on mobile
    await page.fill('input[formControlName="name"]', 'Jane Doe');
    await expect(page.locator('input[formControlName="name"]')).toHaveValue('Jane Doe');
  });
});

test.describe('Orientation Changes', () => {
  test('should handle portrait to landscape orientation', async ({ page }) => {
    // Start in portrait
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');
    
    await expect(page.locator('.stats-grid')).toBeVisible();
    
    // Switch to landscape
    await page.setViewportSize({ width: 667, height: 375 });
    await expect(page.locator('.stats-grid')).toBeVisible();
    await expect(page.locator('.stat-card')).toHaveCount(4);
  });

  test('should maintain functionality in landscape mode', async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 }); // Landscape mobile
    await page.goto('/profile');
    
    // Form should still be functional
    await expect(page.locator('input[formControlName="name"]')).toBeVisible();
    await page.fill('input[formControlName="name"]', 'Test User');
    
    // Tab navigation should work
    await page.click('mat-tab:has-text("Security")');
    await expect(page.locator('.security-form-card')).toBeVisible();
  });
});

test.describe('Responsive Design Tests', () => {
  test('should show mobile menu button on small screens', async ({ page }) => {
    await page.goto('/');
    
    // Test mobile view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.menu-button')).toBeVisible();
    
    // Test desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('.menu-button')).not.toBeVisible();
  });

  test('should adapt dashboard layout for different screen sizes', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.stats-grid')).toBeVisible();
    await expect(page.locator('.stat-card')).toHaveCount(4);
    
    // Tablet layout
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.stats-grid')).toBeVisible();
    
    // Desktop layout
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('.stats-grid')).toBeVisible();
  });

  test('should handle products grid responsively', async ({ page }) => {
    await page.goto('/products');
    
    // Test search functionality across screen sizes
    const searchInput = page.locator('input[placeholder="Search by name or description"]');
    
    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(searchInput).toBeVisible();
    await searchInput.fill('Angular');
    await page.waitForTimeout(500);
    
    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(searchInput).toBeVisible();
    
    // Desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(searchInput).toBeVisible();
  });
}); 