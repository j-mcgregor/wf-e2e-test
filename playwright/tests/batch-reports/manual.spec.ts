import { test, expect } from '@playwright/test';
import { login, testCSVFile } from '../../playwright-helpers';

const batchName = new Date().toISOString(); // weird I know, but it makes a unique batch name for checking, so 🤷

// ----------------------------------
// BATCH CSV UPLOAD REPORTS
// ----------------------------------

test.describe('Batch report', () => {
  test('User can create a manual BATCH report by CSV', async ({ browser }) => {
    const context = await browser.newContext({
      storageState: './playwright/auth.json'
    });
    const page = await context.newPage();

    // GIVEN IAM ON THE BATCH-REPORTS PAGE
    await page.goto('batch-reports');

    // AND I SHOULD SEE A CREATE BATCH REPORT LINK
    const createBatchReportLink = page.locator('text=Create a Batch Report');
    await expect(createBatchReportLink).toBeVisible();

    // WHEN I CLICK THE CREATE BATCH REPORT LINK
    await createBatchReportLink.click();

    // THEN I SHOULD BE TAKEN TO THE BATCH REPORTS/NEW PAGE
    await expect(page).toHaveURL('batch-reports/new');

    const runBatchButton = page.locator('button:has-text("Run Batch")');

    // WHEN I CLICK THE NAME REPORT INPUT FIELD
    const nameReportInput = page.locator(
      '[placeholder="Name your batched report"]'
    );

    await nameReportInput.click();

    // AND I ENTER A NAME FOR THE BATCH REPORT
    await nameReportInput.fill(batchName);

    // WHEN I SELECT A VALID CSV FILE TO UPLOAD
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('label:has-text("Upload your CSV")').click()
    ]);
    await fileChooser.setFiles(`./__mocks__/csv/batch/manual/${testCSVFile}`);

    const fileName = page.locator(`text=${testCSVFile}`);

    // THEN I SHOULD SEE THE FILE HAS BEEN ADDED TO THE UPLOAD LIST
    await expect(fileName).toBeVisible();

    // AND I SHOULD SEE THAT IT HAS BEEN VALIDATED
    await expect(page.locator('text=File is a valid CSV')).toBeVisible();

    // AND THERE SHOULD BE NO VALIDATION ERRORS
    await expect(page.locator('#validation-cross')).not.toBeVisible(); // added id to the validation error crosses for easier location

    // AND THE RUN BATCH BUTTON SHOULD BE ENABLED
    await expect(runBatchButton).toBeEnabled();

    // WHEN I CLICK THE RUN BATCH BUTTON
    await runBatchButton.click();

    // THEN I SHOULD BE TAKEN TO THE BATCH REPORTS
    await expect(page).toHaveURL('batch-reports');

    // AND I SHOULD SEE THE NEW BATCH REPORT CARD IN THE LIST
    await expect(page.locator(`text=${batchName}`)).toBeVisible({
      timeout: 120000
    });
  });
});
