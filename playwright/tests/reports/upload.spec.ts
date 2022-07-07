import { test, expect } from '@playwright/test';
import { testCSVFile } from '../../playwright-helpers';

// SCENARIO: USER NAVIGATES TO NEWLY CREATED REPORT, BOOKMARKS IT, NAVIGATES TO 'REPORTS' TO CHECK IT WAS SUCCESSFULLY BOOKMARKED
test('User can upload additional report data by CSV', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: './playwright/auth.json'
  });
  const page = await context.newPage();

  // GIVEN I AM ON THE HOME PAGE
  await page.goto('/');

  // accept cookies banner
  await page.locator('text=Accept').click();

  // WHEN I NAVIGATE TO THE MOST RECENT REPORT
  await Promise.all([
    page.locator('#Recent\\ Reports tbody tr:nth-child(1)').click(),
    page.waitForNavigation({ timeout: 30000 })
  ]);

  // AND I CLICK THE 'UPLOAD MORE DATA' BUTTON
  await page.locator('a:has-text("Upload")').click();
  await page.waitForNavigation({ timeout: 30000 });

  // THEN I SHOULD BE NAVIGATED TO THE UPLOAD DATA PAGE
  expect(page.url()).toContain('upload-data');

  // WHEN I SELECT A VALID CSV FILE TO UPLOAD
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator('label:has-text("Upload your CSV or Excel file")').click()
  ]);
  await fileChooser.setFiles(`./__mocks__/csv/sme-calculator/${testCSVFile}`);

  const fileName = page.locator(`text=${testCSVFile}`);

  // THEN I SHOULD SEE THE FILE HAS BEEN ADDED TO THE UPLOAD LIST
  await expect(fileName).toBeVisible();

  // AND THERE SHOULD BE NO VALIDATION ERRORS
  await expect(page.locator('#validation-cross')).not.toBeVisible(); // added id to the validation error crosses for easier location

  // WHEN I CLICK GENERATE REPORT I SHOULD BE NAVIGATED TO NEW REPORT PAGE
  await page.locator('text=Generate new report').click();

  // AND 'REPORT' SHOULD BE IN THE URL
  // (not sure how else to test this... possibly too vague?)
  await expect(page.url()).toContain('report');
});
