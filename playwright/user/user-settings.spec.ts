/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect, Page } from '@playwright/test';
import { login } from '../helpers';

login();

test.describe('User Settings Tests', async () => {
  // SCENARIO: USER NAVIGATES TO SETTINGS AND CHANGES THEIR NAME

  // FEATURE: USER CAN CHANGE THEIR NAME
  test('User can change name', async ({ page }) => {
    // GIVEN I CLICK ON SETTINGS BUTTON
    // AND I AM DIRECTED TO THE SETTINGS PAGE
    await page.locator('text=Settings').first().click();

    // AND I FILL IN A NEW NAME FOR THE USER
    // Triple click input[name="fullName"]
    await page.locator('input[name="fullName"]').click({
      clickCount: 3
    });

    await page.locator('input[name="fullName"]').fill('Joe Bloggs'); // if name is already Joe Bloggs, this fails because save button is disabled

    // WHEN I CLICK THE SAVE BUTTON
    await page
      .locator(
        'text=Personal InformationUpdate your personal informationNameEmail addressSave >> button'
      )
      .click();

    // AND I CLICK THE DASHBOARD BUTTON
    // THEN I SHOULD BE DIRECTED TO THE DASHBOARD PAGE

    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:3000/' }*/),
      page.locator('a:has-text("Dashboard")').click()
    ]);

    // AND MY NEW NAME SHOULD BE DISPLAYED

    // Click text=Personal InformationUpdate your personal informationNameEmail addressSave >> button

    // Click a:has-text("Dashboard")

    await expect(page.locator('h1:has-text("Joe Bloggs")')).toBeVisible();
  });

  // test('User can change password', async ({ page }) => {});

  // test('User SSO shows SSO box', async ({ page }) => {});

  // test('User can update preferences', async ({ page }) => {});

  // test('User can update notifications', async ({ context }) => {
  //   await page.close();
  //   await context.close();
  //   // ------------------
  // });
});
