import { test, expect } from '@playwright/test';
import { WiserfundingE2E } from '../../playwright-helpers';

test.describe.serial('Bookmark Report', async () => {
  // SCENARIO: USER NAVIGATES TO NEWLY CREATED REPORT, BOOKMARKS IT, NAVIGATES TO 'REPORTS' TO CHECK IT WAS SUCCESSFULLY BOOKMARKED
  // FEATURE: USER CAN BOOKMARK A REPORT
  test('User can add a bookmark to a report', async ({ browser }) => {
    test.setTimeout(120000);

    const page = await WiserfundingE2E.createPage(browser);
    const WF = new WiserfundingE2E(page);

    // GIVEN I AM ON REPORTS
    await WF.goto('/reports');
    // accept cookies banner
    await WF.closeCookieBanner();

    await expect(page).toHaveURL('/reports');

    // CHECK BOOKMARKED REPORTS & ASSERT REPORT ISN'T THERE
    await expect(
      WF.bookmarkContainer.locator(`text=${WF.bookmarkReportName}`)
    ).not.toBeVisible();

    // CREATE REPORT
    await WF.quickCreateADS(WF.bookmarkReportName);
    await page.waitForTimeout(10000);

    await WF.bookmarkBtn.click();
    await expect(page.locator('text=Bookmark added')).toBeVisible();

    // ASSERT REPORT IS NOW BOOKMARKED
    await WF.goto('/reports');

    // TO BE CONTINUED WHEN THE BACKENDD IS DONE
    // await expect(
    //   page
    //     .locator('#bookmark-container')
    //     .locator(`text=${WF.bookmarkReportName}`)
    // ).toBeVisible();
  });
  // FEATURE: USER CAN BOOKMARK A REPORT
  test('User can remove a bookmark from a report', async ({ browser }) => {
    test.setTimeout(120000);

    const page = await WiserfundingE2E.createPage(browser);
    const WF = new WiserfundingE2E(page);

    // GIVEN I AM ON REPORTS
    await WF.goto('/reports');
    // accept cookies banner
    await WF.closeCookieBanner();

    await expect(page).toHaveURL('/reports');

    // IF BOOKMARK IS NOT THERE (IT SHOULD BE THERE) GO AND CREATE IT
    if (
      !(await WF.bookmarkContainer
        .locator(`text=${WF.bookmarkReportName}`)
        .isVisible())
    ) {
      await WF.quickCreateADS(WF.bookmarkReportName);
      await page.waitForTimeout(10000);

      await WF.bookmarkBtn.click();
      await expect(page.locator('text=Bookmark added')).toBeVisible();
      await WF.goto('/reports');
    }

    await expect(
      WF.bookmarkContainer.locator(`text=${WF.bookmarkReportName}`).last()
    ).toBeVisible();

    await WF.bookmarkContainer
      .locator(`text=${WF.bookmarkReportName}`)
      .last()
      .click();

    await page.waitForTimeout(10000);

    await WF.bookmarkBtn.click();
    await expect(page.locator('text=Bookmark removed')).toBeVisible();
    await WF.goto('/reports');

    // TO BE CONTINUED WHEN THE BACKENDD IS DONE
    // await expect(
    //   page
    //     .locator('#bookmark-container')
    //     .locator(`text=${WF.bookmarkReportName}`).last()
    // ).toBeVisible();
  });
});
