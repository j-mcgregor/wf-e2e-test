import { test, expect } from '@playwright/test';

import { testCSVFile } from '../../playwright-helpers';

test('User can create a manual SINGLE report by CSV', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: './playwright/auth.json'
  });
  const page = await context.newPage();

  // GIVEN I AM ON THE HOMEPAGE
  await page.goto('/');

  // AND I CLICK SINGLE COMPANY
  await page.locator('text=Single Company').first().click();

  // THEN I SHOULD BE DIRECTED TO THE SME-CALC PAGE
  await expect(page).toHaveURL('sme-calculator');

  // WHEN I CLICK PROVIDE OWN DATA BUTTON
  await page.locator('text=Provide own data').click();

  // AND I CLICK THE UPLOAD CSV SELECT
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator('text=Upload your CSV or Excel file').click()
  ]);

  // AND I SELECT A CSV FILE TO UPLOAD
  await fileChooser.setFiles(`./__mocks__/csv/sme-calculator/${testCSVFile}`);

  const fileName = page.locator(`text=${testCSVFile}`);

  // THEN I SHOULD SEE THE FILE HAS BEEN ADDED TO THE UPLOAD LIST
  await expect(fileName).toBeVisible();

  // AND I SHOULD SEE THAT IT HAS BEEN VALIDATED
  await expect(page.locator('#validation-cross')).not.toBeVisible();

  // THEN THE GENERATE REPORT BUTTON SHOULD BE ENABLED
  const generateButton = page.locator('button:has-text("Generate new report")');

  await expect(generateButton).toBeEnabled();

  // WHEN I CLICK THE GENERATE REPORT BUTTON
  await generateButton.click();

  await page.waitForSelector('text=www.example.com', {
    timeout: 30000
  });

  // THEN I SHOULD BE TAKEN TO THE CORRECT COMPANY REPORT PAGE
  await expect(page.locator('text=www.example.com')).toBeVisible();
});
