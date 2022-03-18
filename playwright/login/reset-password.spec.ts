import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

test('User can reset their password', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // FEATURE: USER PASSWORD RESET
  // SCENARIO: USER CAN RESET THEIR PASSWORD FROM THE LOGIN PAGE
  // GIVEN: I AM ON THE LOGIN PAGE
  // WHEN: I CLICK THE FORGOT PASSWORD LINK
  // THEN: I SHOULD BE DIRECTED TO THE FORGOT PASSWORD PAGE
  // AND: I ENTER MY EMAIL ADDRESS
  // AND: I CLICK THE SUBMIT BUTTON
  // THEN: I SHOULD SEE A CONFIRMATION MESSAGE
  // WHEN: I CLICK THE BACK TO LOGIN LINK
  // THEN: I SHOULD BE DIRECTED TO THE LOGIN

  await page.goto(`/`);

  // CLICK FORGOT PASSWORD BUTTON
  await Promise.all([
    page.waitForNavigation(),
    page.locator('text=Remember meForgot your password? >> a').click()
  ]);

  // EXPECT TO BE ON RESET PASSWORD PAGE
  await expect(page.locator('text=Forgotten Password')).toBeVisible();

  // CLICK EMAIL INPUT
  await page.locator('[placeholder="you\\@example\\.com"]').click();

  // FILL EMAIL INPUT
  await page.locator('[placeholder="you\\@example\\.com"]').fill('dan@dan.com');

  // CLICK RESET PASSWORD BUTTON
  await page.locator('text=Reset password').click();

  // CLICK BACK TO LOGIN BUTTON
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/login' }*/),
    page.locator('text=Back to login').click()
  ]);

  // EXPECT TO BE BACK ON THE LOGIN PAGE
  await expect(page.locator('text=Sign into your account')).toBeVisible();

  // --------------------
  await context.close();
  await browser.close();
});
