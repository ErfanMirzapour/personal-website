import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const designs = ['editorial', 'swiss', 'notebook', 'dark', 'journal'];
for (const design of designs) {
  test(`${design}: homepage, navigation, writing, and readable article`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const base = `/designs/${design}`;
    await page.goto(`${base}/`);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(
      page.getByRole('heading', { name: 'OMPFinex', exact: true }),
    ).toBeVisible();
    await expect(page.locator('body')).toContainText('Jul 2025 — Sep 2026');
    await expect(
      page.locator('a[href="mailto:erfanmirzapour1@gmail.com"]').first(),
    ).toHaveAttribute('href', 'mailto:erfanmirzapour1@gmail.com');
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('link', { name: 'Skip to content' }),
    ).toBeFocused();
    await page.keyboard.press('Enter');
    const homeScan = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(homeScan.violations).toEqual([]);
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Writing' })
      .click();
    await expect(page).toHaveURL(new RegExp(`${base}/blog/`));
    await expect(
      page.getByRole('heading', { name: 'The first note is still ahead.' }),
    ).toBeVisible();
    await page
      .getByRole('link', { name: 'A space for longer thoughts' })
      .click();
    await expect(page.locator('.sample-notice')).toContainText(
      'Development sample',
    );
    await expect(page.locator('pre')).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    const articleScan = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(articleScan.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}
test('gallery exposes all five designs and preview metadata', async ({
  page,
}) => {
  await page.goto('/designs/');
  await expect(page.locator('main article')).toHaveCount(5);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, nofollow',
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});

test('selected notebook direction uses the requested production content', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('body')).toHaveClass(/notebook/);
  await expect(page.locator('.notebook-index')).not.toContainText(
    /01|02|03|04|05/,
  );
  await expect(page.locator('.section-label > span')).toHaveCount(0);
  await expect(page.locator('.interest-number')).toHaveCount(0);
  await expect(page.locator('.skill-group li.is-branded')).not.toHaveCount(0);
  await expect(
    page.locator('.skill-group li', { hasText: 'Accessibility' }),
  ).not.toHaveClass(/is-branded/);
  await expect(page.getByRole('link', { name: 'Telegram ↗' })).toHaveAttribute(
    'href',
    'https://t.me/ErfanM96',
  );
  await expect(page.getByRole('link', { name: 'Instagram ↗' })).toHaveAttribute(
    'href',
    'https://www.instagram.com/erfan_m96x/',
  );
  await page
    .getByRole('button', { name: /Copy erfanmirzapour1@gmail.com/ })
    .click();
  await expect(page.locator('.copy-status')).toContainText(
    /Email copied|Copy this address/,
  );
});
