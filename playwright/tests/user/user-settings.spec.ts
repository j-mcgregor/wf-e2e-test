/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect } from '@playwright/test';

test.describe('User Settings Tests', async () => {
  // SCENARIO: USER NAVIGATES TO SETTINGS AND CHANGES THEIR NAME
  // FEATURE: USER CAN CHANGE THEIR NAME
  test.skip('User can change their user name', async ({ browser }) => {
    const context = await browser.newContext({
      storageState: './playwright/auth.json'
    });

    const page = await context.newPage();

    // GIVEN I AM ON THE HOME PAGE
    await page.goto('/');

    // accept cookies banner
    if (await page.locator('text=Accept').isVisible()) {
      await page.locator('text=Accept').click();
    }

    // GIVEN I CLICK ON SETTINGS BUTTON
    await page.locator('a:has-text("Settings")').click();

    // THEN I AM DIRECTED TO THE SETTINGS PAGE
    await expect(page).toHaveURL('settings');

    const nameInput = page.locator('input[name="fullName"]');
    const currentUserName = await nameInput.inputValue(); // current name
    const newUserName =
      currentUserName === 'Joe Smith' ? 'Smith Joe' : 'Joe Smith'; // always set new name to enable button

    // WHEN I SELECT THE EXISTING TEXT IN THE NAME INPUT FIELD
    await nameInput.click({
      clickCount: 3
    });

    // AND I TYPE A NEW NAME INTO THE NAME INPUT FIELD
    await nameInput.fill(newUserName);

    // THEN I CLICK THE SAVE BUTTON
    await page
      .locator('div[name="personal_information"]')
      .locator('button:has-text("Save")')
      .click();

    // WHEN I CLICK THE DASHBOARD NAVIGATION BUTTON
    await page.locator('a:has-text("Dashboard")').click();

    // THEN I SHOULD DIRECTED TO THE DASHBOARD PAGE
    await expect(page).toHaveURL('/');

    // AND MY NEW NAME SHOULD BE DISPLAYED AT THE TOP OF THE PAGE
    await expect(page.locator(`h1:has-text("${newUserName}")`)).toBeVisible({
      timeout: 120000
    });
  });

  // --------------------------------------------------

  // SCENARIO: USER NAVIGATES TO SETTINGS AND CHANGES THEIR PASSWORD
  // FEATURE: USER CAN CHANGE THEIR PASSWORD
  test.skip('User can change their password', async ({ browser }) => {
    const context = await browser.newContext({
      storageState: './playwright/auth.json'
    });
    const page = await context.newPage();

    const oldPassword = `${process.env.PLAYWRIGHT_LOGIN_PASSWORD}`;
    const newPassword = `new-${process.env.PLAYWRIGHT_LOGIN_PASSWORD}`;

    // GIVEN I AM ON THE HOME PAGE
    await page.goto('/');

    // accept cookies banner
    if (await page.locator('text=Accept').isVisible()) {
      await page.locator('text=Accept').click();
    }

    // GIVEN I CLICK ON SETTINGS BUTTON
    await page.locator('a:has-text("Settings")').click();

    // THEN I SHOULD BE TAKEN TO THE SETTINGS PAGE
    await expect(page).toHaveURL('settings');

    // WHEN I SELECT THE CURRENT PASSWORD INPUT
    await page.locator('input[name="currentPassword"]').click();

    // AND I TYPE A NEW PASSWORD INTO THE NEW PASSWORD INPUT FIELD
    await page.locator('input[name="currentPassword"]').fill(oldPassword);

    // WHEN I SELECT THE NEW PASSWORD INPUT
    await page.locator('input[name="newPassword"]').click();

    // AND I TYPE A NEW PASSWORD INTO THE NEW PASSWORD INPUT FIELD
    await page.locator('input[name="newPassword"]').fill(newPassword);

    // AND I SELECT THE CONFIRM PASSWORD INPUT
    await page.locator('input[name="confirmPassword"]').click();

    // AND I TYPE A NEW PASSWORD INTO THE CONFIRM PASSWORD INPUT FIELD
    await page.locator('input[name="confirmPassword"]').fill(newPassword); // repeat password

    // THEN THE SAVE BUTTON SHOULD BE ENABLED
    await expect(
      page.locator('div[name="password"]').locator('button:has-text("Save")')
    ).toBeEnabled();
    await page
      .locator('div[name="password"]')
      .locator('button:has-text("Save")')
      .click();

    await expect(
      page.locator('text=Password updated successfully')
    ).toBeVisible();

    // RESET

    await page.locator('input[name="currentPassword"]').fill(newPassword);
    await page.locator('input[name="newPassword"]').fill(oldPassword);
    await page.locator('input[name="confirmPassword"]').fill(oldPassword);
    await page
      .locator('div[name="password"]')
      .locator('button:has-text("Save")')
      .click();
  });

  // --------------------------------------------------

  // SCENARIO: USER NAVIGATES TO THE SETTINGS PAGE AND CHANGES THEIR PREFERENCES
  // FEATURE: USER CAN CHANGE THEIR PREFERENCES
  test.skip('User can change their preferences', async ({ browser }) => {
    const context = await browser.newContext({
      storageState: './playwright/auth.json'
    });
    const page = await context.newPage();

    // GIVEN I AM ON THE HOME PAGE
    await page.goto('/');

    // accept cookies banner
    if (await page.locator('text=Accept').isVisible()) {
      await page.locator('text=Accept').click();
    }

    // GIVEN I CLICK ON SETTINGS BUTTON
    await page.locator('a:has-text("Settings")').click();

    // THEN I SHOULD BE DIRECTED TO THE SETTINGS PAGE
    await expect(page).toHaveURL('settings');

    // selectors
    const saveButton = page
      .locator('div[name="preferences"]')
      .locator('button:has-text("Save")'); // save button
    const resetButton = page.locator('text=Reset to defaults'); // reset button
    const countrySelect = page.locator('select[name="reporting"]'); // locate country select

    // values
    const defaultCountry = 'GB'; // default country
    const currentCountry = await countrySelect.inputValue(); // current country
    const newCountry =
      currentCountry === defaultCountry ? 'US' : defaultCountry; // always set new country to enable button

    // WHEN I CLICK THE 'CHANGE REPORTING COUNTRY' SELECT
    // AND I SELECT A NEW COUNTRY
    await countrySelect.selectOption(newCountry);

    // THEN THE SAVE BUTTON SHOULD BE ENABLED
    await expect(saveButton).toBeEnabled();

    // WHEN I CLICK THE SAVE BUTTON
    await saveButton.click();

    // THEN THE SAVE BUTTON SHOULD BE DISABLED
    await expect(saveButton).toBeDisabled();

    // AND THE RESET TO DEFAULTS BUTTON SHOULD BE ENABLED
    await expect(resetButton).toBeEnabled();

    // WHEN I CLICK THE RESET TO DEFAULTS BUTTON
    await resetButton.click();

    // THEN COUNTRY SELECT MENU SHOULD BE RESET TO THE DEFAULT COUNTRY
    await expect(countrySelect).toHaveValue(defaultCountry);

    // AND BOTH BUTTONS SHOULD BE DISABLED
    await expect(saveButton).toBeDisabled();
    await expect(resetButton).toBeDisabled();
  });

  // --------------------------------------------------

  // SCENARIO: USER NAVIGATES TO SETTINGS AND UPDATES THEIR NOTIFICATIONS
  // FEATURE: USER CAN CHANGE THEIR NOTIFICATIONS
  test.skip('User can update their notifications', async ({ browser }) => {
    const context = await browser.newContext({
      storageState: './playwright/auth.json'
    });
    const page = await context.newPage();

    // GIVEN I AM ON THE HOME PAGE
    await page.goto('/');
    // accept cookies banner
    if (await page.locator('text=Accept').isVisible()) {
      await page.locator('text=Accept').click();
    }

    // GIVEN I CLICK ON SETTINGS BUTTON
    await page.locator('a:has-text("Settings")').click();

    // THEN I SHOULD BE DIRECTED TO THE SETTINGS PAGE
    await expect(page).toHaveURL('settings');

    // selectors etc
    const saveButton = page
      .locator('div[name="communication"]')
      .locator('button:has-text("Save")'); // communications save button
    const reportCheckbox = page.locator('input[name="batch_report_email"]'); // first checkbox
    const reportCheckboxStatus = await reportCheckbox.isChecked(); // initial state of checkbox

    // THEN THE COMMUNICATION SECTION SAVE BUTTON SHOULD BE DISABLED
    await expect(saveButton).toBeDisabled();

    // WHEN I TOGGLE THE BATCH REPORT COMPLETION CHECKBOX
    reportCheckboxStatus
      ? await reportCheckbox.uncheck()
      : await reportCheckbox.check();

    // AND THE CHECKBOX I TOGGLED SHOULD BE IN THE CORRECT STATE (OPPOSITE OF INITIAL STATE)
    reportCheckboxStatus
      ? expect(reportCheckbox).not.toBeChecked()
      : expect(reportCheckbox).toBeChecked();

    // THEN THE SAVE BUTTON SHOULD BE ENABLED
    await expect(saveButton).toBeEnabled();

    // WHEN I CLICK THE SAVE BUTTON
    await saveButton.click();

    // THEN THE SAVE BUTTON SHOULD BE DISABLED
    await expect(saveButton).toBeDisabled();

    await page.pause();
  });
});
