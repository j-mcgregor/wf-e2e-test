import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

import { login } from '../helpers';

login();

/**
 * Nice work on the GIVEN-WHEN-THEN
 *
 * I made some changes to split them up and removed a couple of statements
 * Makes it easier to follow imho
 *
 * FYI to run a single test, replace test(...) with test.only(...)
 */

// SCENARIO: USER NAVIGATES TO THE SINGLE SME-CALC PAGE, INPUTS A COMPANY SEARCH AND         GENERATES A REPORT

// FEATURE: USER GENERATES A SINGLE REPORT
test('User can generate a single report', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // GIVEN I CLICK THE 'SINGLE COMPANY' NAV LINK
  // AND I AM DIRECTED TO THE SME-CALC PAGE
  await page.locator('text=Single Company').first().click();

  // AND I TYPE A COMPANY NAME INTO THE SEARCH BAR
  // click 'enter company name' input box
  await page.locator('[placeholder="Enter company name\\.\\.\\."]').click();

  // enter company name into the input box (eg: wiserfunding)
  await page
    .locator('[placeholder="Enter company name\\.\\.\\."]')
    .fill('a', { timeout: 5000 });

  // AND I SELECT A COMPANY FROM THE SEARCH RESULTS LIST
  // click result of the company search (eg: wiserfunding)
  await page
    .locator(
      'button:has-text("A LIMITED117902152019-01-2838 Springfield Road, Gillingham, Kent, England, ME7 1")'
    )
    .click();

  // click 'generate report' button
  await page.locator('text=Accept').click(); // <-- accept the cookie; could be in a helper or find a way to disable

  // WHEN I CLICK THE 'GENERATE REPORT' BUTTON
  await page.locator('text=Generate Report').click();

  // THEN A REPORT SHOULD GENERATE AND I SHOULD BE DIRECTED TO THE CORRECT COMPANY REPORT PAGE
  // get directed to generated report page
  await page.waitForSelector('h1:has-text("A LIMITED")', { timeout: 30000 }); // <-- trick is to use waitForSelector()

  // ---------------------
  await context.close();
  await browser.close();
});

// FOR A FUTURE TEST WHEN CHECKING FOR A BOOKMARK
// BOOKMARK THE REPORT

//   // click the 'bookmark' button
//   await page.locator('#bookmark-button').click();

//   // click 'back to saved reports' button
//   await Promise.all([
//     page.waitForNavigation(/*{ url: 'http://localhost:3000/reports' }*/),
//     page.locator('text=Back to saved reports').click()
//   ]);

//   // should be directed back to the reports page
//   await expect(page).toHaveURL('/reports');

//   // bookmark for the new report should be visible (bookmark text has a p tag, recent reports are td, so this differentiates it)
//   await expect(page.locator('text=WISERFUNDING')).toBeVisible();

//   // ---------------------
//   await context.close();
//   await browser.close();
// });
