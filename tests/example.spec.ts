import { test, expect } from '@playwright/test';
import * as fs from "node:fs";
import {join} from "node:path";

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//
//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });
//
// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//
//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();
//
//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

test('tag1', async ({ page }) => {
  await page.goto('http://www.cuba-hp.de/24Stunden/index.php?code=2593b7089f7b083ead87f4cec823fd43');

  await page.screenshot({ path: 'screenshot-tag1.png', fullPage: true });
  const html = await page.content()
  // html.replace('./images', 'https://www.cuba-hp.de/24Stunden2/images')
  fs.writeFileSync(join(__dirname, 'tag1.html'), html, {
    flag: 'w',
  });
});

test('tag2', async ({ page }) => {
  await page.goto('http://www.cuba-hp.de/24Stunden2/index.php?code=2fd139f9c633e9847aee9e10d1a10340');

  await page.screenshot({ path: 'screenshot-tag2.png', fullPage: true });
  const html = await page.content()
  // html.replace('./images', 'https://www.cuba-hp.de/24Stunden2/images')
  fs.writeFileSync(join(__dirname, 'tag2.html'), html, {
    flag: 'w',
  });
});
