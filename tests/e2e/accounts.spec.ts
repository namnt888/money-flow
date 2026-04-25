import { test, expect } from '@playwright/test';

test.describe('Accounts Page', () => {
  test.beforeEach(async ({ page }) => {
    // bypass login
    await page.context().addCookies([{ name: 'auth', value: 'bypass', domain: 'localhost', path: '/' }]);
    await page.goto('/accounts');
  });

  test('should load accounts page', async ({ page }) => {
    await expect(page.getByTestId('accounts-page')).toBeVisible();
  });

  test('should display account rows', async ({ page }) => {
    await expect(page.getByTestId('account-row-1')).toBeVisible();
    await expect(page.getByTestId('account-row-2')).toBeVisible();
  });

  test('should expand account row', async ({ page }) => {
    await page.getByTestId('account-expand-btn-2').click();
    // TODO: assert expanded content
  });
});
