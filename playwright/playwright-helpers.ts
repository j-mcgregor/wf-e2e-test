/* eslint-disable sonarjs/no-small-switch */
import {
  Browser,
  chromium,
  expect,
  FullConfig,
  Locator,
  Page
} from '@playwright/test';

export const testCSVFile = 'master.csv'; // name of test file for the manual uploads
// playwright-dev-page.ts

export class WiserfundingE2E {
  readonly page: Page;
  readonly acceptCookie: Locator;
  readonly singleCompany: Locator;
  readonly singleCompanySearch: Locator;
  readonly generateReportBtn: Locator;
  readonly advancedSearchBtn: Locator;
  readonly companyRegInput: Locator;
  readonly currencySelect: Locator;
  readonly exportCsvBtn: Locator;
  readonly exportPdfBtn: Locator;
  readonly batchInProgressTitle: Locator;
  readonly batchCompletedTitle: Locator;
  readonly batchFailedTitle: Locator;
  readonly batchCreateTitle: Locator;
  readonly batchCreateBtn: Locator;
  readonly batchFilenameInput: Locator;
  readonly runBatchBtn: Locator;
  readonly showMoreBtn: Locator;
  readonly bookmarkBtn: Locator;
  readonly bookmarkContainer: Locator;
  readonly uploadCsvLabel: Locator;
  readonly testCSVFile = 'master.csv';
  readonly batchAutoName = `batch-auto-${Date.now()}`;
  readonly batchManualName = `batch-manual-${Date.now()}`;
  readonly bookmarkReportName = `AARDVARK LIMITED`;
  readonly batchAutoFilepath = `./__mocks__/csv/batch/auto/${this.testCSVFile}`;
  readonly batchManualFilepath = `./__mocks__/csv/batch/manual/${this.testCSVFile}`;

  constructor(page: Page) {
    this.page = page;

    this.acceptCookie = page.locator('text=Accept');
    this.singleCompany = page.locator('text=Single Company').first();
    // sme-calculator
    this.advancedSearchBtn = page.locator('text=Advanced Search');
    this.generateReportBtn = page.locator('text=Generate Report');
    this.singleCompanySearch = page.locator(
      '[placeholder="Enter company name\\.\\.\\."]'
    );
    this.companyRegInput = page.locator('input[name="company_number"]');
    this.currencySelect = page.locator(
      'button:has-text("United Kingdom - GBP (£)")'
    );
    // view report
    this.exportCsvBtn = page.locator('text=Export CSV');
    this.exportPdfBtn = page.locator('text=Export PDF');
    this.bookmarkBtn = page.locator('#bookmark-button');
    this.bookmarkContainer = page.locator('#bookmark-container');
    // batch
    this.batchCreateTitle = page.locator(
      'p:has-text("Create a new Batch Report")'
    );
    this.batchCreateBtn = page.locator('p:has-text("Create a Batch Report")');
    this.batchInProgressTitle = page.locator('text=In Progress Batch Reports');
    this.batchCompletedTitle = page.locator('text=Completed Batch Reports');
    this.batchFailedTitle = page.locator('text=Failed Batch Reports');
    this.batchFilenameInput = page.locator('input[name="filename"]');
    this.runBatchBtn = page.locator('button:has-text("Run Batch")');
    this.showMoreBtn = page.locator('text="Show more"');
    this.uploadCsvLabel = page.locator(
      'label:has-text("Upload your CSV/Excel file")'
    );
  }

  async goto(endpoint = '/') {
    await this.page.goto(endpoint);
  }

  async closeCookieBanner() {
    if (await this.acceptCookie.isVisible()) {
      await this.acceptCookie.click();
    }
  }

  async navigateTo(to: 'single') {
    switch (to) {
      case 'single':
        this.singleCompany.click();
        break;
      default:
        break;
    }
  }

  async downloadReport(type: 'csv' | 'pdf') {
    const btn = type === 'csv' ? this.exportCsvBtn : this.exportPdfBtn;

    const [download] = await Promise.all([
      // It is important to call waitForEvent before click to set up waiting.
      this.page.waitForEvent('download'),
      // Triggers the download.
      btn.click()
    ]);

    // wait for download to complete
    return await download.path();
  }

  async downloadBatchReport(reportName: string) {
    const [download] = await Promise.all([
      // It is important to call waitForEvent before click to set up waiting.
      this.page.waitForEvent('download'),
      // Triggers the download.
      this.page.locator(`button:has-text("${reportName}")`).click()
    ]);

    // wait for download to complete
    return await download.path();
  }

  async waitForNavigation(timeout = 60000) {
    await this.page.waitForNavigation({ timeout });
  }

  async uploadFile(filePath: string) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      await this.uploadCsvLabel.click()
    ]);
    await fileChooser.setFiles(filePath);
  }

  async clickShowMoreButtons() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (await this.showMoreBtn.isVisible()) {
        await this.showMoreBtn.click();
      } else {
        break;
      }
    }
  }

  async quickCreateADS(reportName: string) {
    await this.goto('/sme-calculator');
    await this.singleCompanySearch.click({ delay: 500 });
    await this.singleCompanySearch.fill(reportName, {
      timeout: 5000
    });
    await this.page.locator(`#result-aardvark-limited-0`).click();
    await this.generateReportBtn.click();
    await this.waitForNavigation();
  }

  // STATIC

  static async login(config: FullConfig) {
    const { baseURL, storageState } = config.projects[0].use;
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // go to base URL
    await page.goto(baseURL!);
    // fill in email input
    await page.fill(
      'input[placeholder="you\\@example\\.com"]',
      `${process.env.PLAYWRIGHT_LOGIN_USERNAME}`
    );
    // fill in password input
    await page.fill(
      'input[placeholder="Password"]',
      `${process.env.PLAYWRIGHT_LOGIN_PASSWORD}`
    );

    // click sign in button
    await Promise.all([
      page.waitForNavigation(),
      page.locator('[placeholder="Password"]').press('Enter')
    ]);

    await page.context().storageState({ path: storageState as string });

    // accept cookies banner
    if (await page.locator('text=Accept').isVisible()) {
      await page.locator('text=Accept').click();
    }

    await browser.close();
  }

  static async createPage(browser: Browser) {
    const context = await browser.newContext({
      storageState: './playwright/auth.json'
    });
    return await context.newPage();
  }
}
