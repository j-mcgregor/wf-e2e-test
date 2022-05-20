import { test, expect } from '@playwright/test';

// SCENARIO: USER IS ON LOGIN PAGE, CLICKS 'FORGOT PASSWORD' BUTTON AND IS DIRECTED TO FORGOT PASSWORD PAGE
// FEATURE: USER CAN CHANGE THEIR PASSWORD
test.describe('Forgotten password', () => {
  test('User can navigate to forgotten password', async ({ page }) => {
    // GIVEN I AM ON THE LOGIN PAGE
    await page.goto('login');

    // WHEN I CLICK THE FORGOT PASSWORD BUTTON
    await page.locator('text=Remember meForgot your password? >> a').click();

    // THEN I SHOULD BE TAKEN TO THE FORGOT PASSWORD PAGE
    await expect(page).toHaveURL('forgotten-password');

    // AND I SHOULD SEE AN EMAIL INPUT FIELD
    await expect(
      page.locator('[placeholder="you\\@example\\.com"]')
    ).toBeVisible();
    // AND I SHOULD SEE A RESET PASSWORD BUTTON
    await expect(
      page.locator('button:has-text("Reset password")')
    ).toBeVisible();
  });
});
