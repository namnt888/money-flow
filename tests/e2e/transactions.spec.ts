import { test, expect } from '@playwright/test';

test.describe('Transactions Page', () => {
  test.beforeEach(async ({ page }) => {
    // bypass login
    await page.context().addCookies([{ name: 'auth', value: 'bypass', domain: 'localhost', path: '/' }]);
    await page.goto('/transactions');
  });

  test('should load transactions page', async ({ page }) => {
    await expect(page.getByTestId('txn-page')).toBeVisible();
  });

  test('should filter by active status', async ({ page }) => {
    await page.getByTestId('txn-filter-active').click();
    // TODO: assert filtered results
  });

  test('should expand transaction row', async ({ page }) => {
    // click first row expand
    const firstExpand = page.getByTestId(/txn-expand-btn-/).first();
    await firstExpand.click();
    await expect(page.getByText('SETTLEMENT & FORMULA')).toBeVisible();
  });
});
