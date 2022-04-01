/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect } from '@playwright/test';
import { login } from '../playwright-helpers';

const testCSVFile = 'master.csv'; // name of test file for the manual uploads
const batchName = new Date().toISOString(); // weird I know, but it makes a unique batch name for checking, so 🤷

login();

test.describe('Report Creation & Bookmark Tests', async () => {
  // SCENARIO: USER NAVIGATES TO THE SINGLE SME-CALC PAGE, INPUTS A COMPANY SEARCH AND GENERATES A REPORT
  // FEATURE: USER GENERATES A SINGLE REPORT
  test('User can generate report via API search', async ({ page }) => {
    // GIVEN I CLICK THE 'SINGLE COMPANY' NAV LINK
    await page.locator('text=Single Company').first().click();

    // THEN I SHOULD BE TAKEN TO THE SME-CALC PAGE
    await expect(page).toHaveURL('sme-calculator');

    // WHEN I TYPE A COMPANY NAME INTO THE SEARCH BAR
    await page.locator('[placeholder="Enter company name\\.\\.\\."]').click();

    await page
      .locator('[placeholder="Enter company name\\.\\.\\."]')
      .fill('a', { timeout: 5000 });

    // AND I SELECT A COMPANY FROM THE SEARCH RESULTS
    await page
      .locator(
        'button:has-text("A LIMITED117902152019-01-2838 Springfield Road, Gillingham, Kent, England, ME7 1")'
      )
      .click();

    // WHEN I CLICK THE 'GENERATE REPORT' BUTTON
    await page.locator('text=Generate Report').click();

    // hacky but was fastest way to get it working
    await page.waitForTimeout(10000);
    // THEN A REPORT SHOULD GENERATE AND I SHOULD BE DIRECTED TO THE CORRECT COMPANY REPORT PAGE
    await page.waitForSelector('h1:has-text("A LIMITED")', {
      timeout: 40000
    }); // <-- trick is to use waitForSelector()

    await expect(page.locator('h1:has-text("A LIMITED")')).toBeVisible();
  });

  // --------------------------------------------------

  // SCENARIO: USER NAVIGATES TO THE SINGLE SME-CALC PAGE, MAKES AN ADVANCED SEARCH WITH A COMPANY ID AND CHANGES CURRENCY
  // FEATURE: USER CREATES A MANUAL REPORT
  test('User can generate report via company ID & custom currency', async ({
    page
  }) => {
    // GIVEN I CLICK THE 'SINGLE COMPANY' NAV LINK
    await page.locator('text=Single Company').first().click();

    // WHEN I CLICK THE 'ADVANCED SEARCH' BUTTON
    await page.locator('text=Advanced Search').click();

    // THEN I CLICK THE COMPANY REGISTRATION NUMBER INPUT
    await page.locator('[placeholder="\\31 23456789"]').click();

    // AND I ENTER A VALID COMPANY REGISTRATION NUMBER
    await page.locator('[placeholder="\\31 23456789"]').fill('10754754');
    // THEN I CHANGE THE DEFAULT CURRENCY FROM GBP TO USD
    await page.locator('button:has-text("United Kingdom - GBP (£)")').click();
    await page.locator('text=United States - USD ($)').click();

    // WHEN I CLICK THE 'GENERATE REPORT' BUTTON
    await page.locator('text=Generate Report').click();
    await page.waitForSelector('h1:has-text("CHOPOVA LOWENA LIMITED")', {
      timeout: 40000
    });

    // THEN THE REPORT SHOULD GENERATE AND I SHOULD BE DIRECTED TO THE CORRECT COMPANY REPORT PAGE
    await expect(
      page.locator('h1:has-text("CHOPOVA LOWENA LIMITED")')
    ).toBeVisible();

    // AND THE REPORT SHOULD BE GENERATED IN USD
    await expect(page.locator('p:has-text("USD")')).toBeVisible();
  });

  // --------------------------------------------------

  // SCENARIO: USER NAVIGATES TO NEWLY CREATED REPORT, BOOKMARKS IT, NAVIGATES TO 'REPORTS' TO CHECK IT WAS SUCCESSFULLY BOOKMARKED
  // FEATURE: USER CAN BOOKMARK A REPORT
  test('User can bookmark a new report', async ({ page }) => {
    // GIVEN I AM ON THE DASHBOARD PAGE
    await page.goto('/');

    // WHEN I NAVIGATE TO THE MOST RECENT REPORT
    await Promise.all([
      page.waitForNavigation(),
      page.locator('td >> nth=0').click()
    ]);

    const reportID = page.url().split('/')[4]; // store report id from url

    // AND I CLICK THE 'BOOKMARK' ICON
    await page.locator('#bookmark-button').click();

    // AND I NAVIGATE TO RECENT REPORTS
    await Promise.all([
      page.waitForNavigation(),
      page.locator('text=Back to saved reports').click()
    ]);

    const bookmark = page.locator(`#bookmark-card-${reportID}`);

    // THEN I SHOULD SEE A BOOKMARK CARD FOR THE REPORT I JUST BOOKMARKED
    await expect(bookmark).toBeVisible();
  });
  // ----------------------------------
  // SINGLE & BATCH CSV UPLOAD REPORTS
  // ----------------------------------

  test('User can create a manual BATCH report by CSV', async ({ page }) => {
    // GIVEN I CLICK THE MULTIPLE COMPANIES NAV BUTTON
    await page.locator('text=Multiple Companies').first().click();

    // THEN I SHOULD BE DIRECTED TO THE BATCH REPORTS PAGE
    await expect(page).toHaveURL('batch-reports');

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
    await expect(page.locator(`text=${batchName}`)).toBeVisible();
  });

  test('User can create a manual SINGLE report by CSV', async ({ page }) => {
    // GIVEN I CLICK THE SINGLE COMPANY NAV BUTTON
    await page.locator('text=Single Company').first().click();

    // THEN I SHOULD BE DIRECTED TO THE SME-CALC PAGE
    await expect(page).toHaveURL('sme-calculator');

    // WHEN I CLICK PROVIDE OWN DATA BUTTON
    await page.locator('text=Provide own data').click();

    // AND I CLICK THE UPLOAD CSV SELECT
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('text=Upload your CSV').click()
    ]);

    // AND I SELECT A CSV FILE TO UPLOAD
    await fileChooser.setFiles(`./__mocks__/csv/sme-calculator/${testCSVFile}`);

    const fileName = page.locator(`text=${testCSVFile}`);

    // THEN I SHOULD SEE THE FILE HAS BEEN ADDED TO THE UPLOAD LIST
    await expect(fileName).toBeVisible();

    // AND I SHOULD SEE THAT IT HAS BEEN VALIDATED
    await expect(page.locator('#validation-cross')).not.toBeVisible();

    // THEN THE GENERATE REPORT BUTTON SHOULD BE ENABLED
    const generateButton = page.locator(
      'button:has-text("Generate new report")'
    );

    await expect(generateButton).toBeEnabled();

    // WHEN I CLICK THE GENERATE REPORT BUTTON
    await generateButton.click();

    await page.waitForSelector('text=www.example.com', {
      timeout: 30000
    });

    // THEN I SHOULD BE TAKEN TO THE CORRECT COMPANY REPORT PAGE
    await expect(page.locator('text=www.example.com')).toBeVisible();
  });

  // SCENARIO: USER NAVIGATES TO NEWLY CREATED REPORT, BOOKMARKS IT, NAVIGATES TO 'REPORTS' TO CHECK IT WAS SUCCESSFULLY BOOKMARKED
  test('User can upload additional report data by CSV', async ({ page }) => {
    // GIVEN I AM ON THE HOME PAGE
    await page.goto('/');

    // WHEN I NAVIGATE TO THE MOST RECENT REPORT
    await Promise.all([
      page.waitForNavigation(),
      page.locator('td >> nth=0').click()
    ]);

    // AND I CLICK THE 'UPLOAD MORE DATA' BUTTON
    await Promise.all([
      page.waitForNavigation(),
      page.locator('text=Upload').nth(3).click()
    ]);

    // THEN I SHOULD BE NAVIGATED TO THE UPLOAD DATA PAGE
    await expect(page.url()).toContain('upload-data');

    // WHEN I SELECT A VALID CSV FILE TO UPLOAD
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('label:has-text("Upload your CSV")').click()
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
});
