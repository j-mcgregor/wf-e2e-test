import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

import { login } from '../helpers';

login();

test('User can generate a single report', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // FEATURE: USER GENERATES A SINGLE REPORT
  // SCENARIO: USER NAVIGATES TO THE SINGLE SME-CALC PAGE, INPUTS A COMPANY SEARCH AND         GENERATES A REPORT
  // GIVEN: I CLICK THE 'SINGLE COMPANY' NAV LINK
  // THEN: I AM DIRECTED TO THE SME-CALC PAGE
  // AND: I TYPE A COMPANY NAME INTO THE SEARCH BAR
  // AND: I SELECT A COMPANY FROM THE SEARCH RESULTS LIST
  // THEN: I SHOULD SEE THE COMPANY DETAILS CARD POPULATED
  // WHEN: I CLICK THE 'GENERATE REPORT' BUTTON
  // THEN: A REPORT SHOULD GENERATE AND I SHOULD BE DIRECTED TO THE CORRECT COMPANY REPORT PAGE

  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/sme-calculator' }*/),
    page.locator('text=Single Company').first().click()
  ]);

  // click 'enter company name' input box
  await page.locator('[placeholder="Enter company name\\.\\.\\."]').click();

  // enter company name into the input box (eg: wiserfunding)
  await page
    .locator('[placeholder="Enter company name\\.\\.\\."]')
    .fill('a', { timeout: 5000 });

  // click result of the company search (eg: wiserfunding)
  await page
    .locator(
      'button:has-text("A LIMITED117902152019-01-2838 Springfield Road, Gillingham, Kent, England, ME7 1")'
    )
    .click();

  // click 'generate report' button
  await page.locator('text=Generate Report').click();

  // get directed to generated report page
  //? this is a bit of a hack, but it works for now - url is my actual report and will not be consistent...
  // await page.goto(
  //   'http://localhost:3000/report/e6d3e666-fe19-4a01-9e5f-25d21be04422'
  // );

  const locator = page.locator('h1:has-text("A LIMITED")');

  // check report is generated correctly by expecting the correct title to be displayed
  await expect(locator).toBeVisible();

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
