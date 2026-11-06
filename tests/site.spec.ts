import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const noOverflow = (page: Page) =>
  page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );

const checkPage = async (page: Page) => {
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(
    page.getByRole('heading', { name: 'OMPFinex', exact: true }),
  ).toBeVisible();
  await expect(page.locator('body')).toContainText(
    'K. N. Toosi University of Technology',
  );
  await expect(
    page.locator('main a[href="https://t.me/ErfanM96"]').first(),
  ).toBeVisible();
  await expect(
    page.locator('main a[href="mailto:erfanmirzapour1@gmail.com"]').first(),
  ).toBeVisible();
  const social = page.getByRole('navigation', { name: 'Social links' });
  await expect(social.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/ErfanMirzapour',
  );
  expect(await noOverflow(page)).toBeTruthy();
  // WebKit skips links on Tab by default, so focus the link directly.
  const skipLink = page.getByRole('link', { name: 'Skip to content' });
  await skipLink.focus();
  await expect(skipLink).toBeFocused();
  const scan = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(scan.violations).toEqual([]);
};

test('homepage works across browser engines', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await checkPage(page);
  expect(errors).toEqual([]);
});

test('reduced motion still shows the full name and content', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.letter').first()).toHaveCSS('opacity', '1');
  await expect(page.locator('.about span').first()).toBeVisible();
});

test('the hero name fits whole when text is enlarged', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  // No intro animation, so the letters are measured where they rest.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  // Triple the heading size, like very large system text, then let the page
  // react the way it does to a resize.
  const result = await page.evaluate(async () => {
    const title = document.querySelector<HTMLElement>('#hero-title')!;
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(
      '#hero-title { font-size: calc(clamp(42px, 7vw, 96px) * 3 * var(--fit, 1)) !important; }',
    );
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
    window.dispatchEvent(new Event('resize'));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const words = [...title.querySelectorAll<HTMLElement>('.word')];
    return {
      outside: words
        .filter((word) => word.getBoundingClientRect().right > window.innerWidth)
        .map((word) => word.textContent?.trim()),
      lines: words.map(
        (word) =>
          new Set(
            [...word.querySelectorAll('.letter')].map((letter) =>
              Math.round(letter.getBoundingClientRect().top),
            ),
          ).size,
      ),
    };
  });
  // Every word fits on screen and stays on a single line.
  expect(result.outside).toEqual([]);
  expect(result.lines).toEqual([1, 1]);
});

test('missing pages show the 404 page', async ({ page }) => {
  await page.goto('/blog/');
  await expect(
    page.getByRole('heading', { name: 'Nothing here.' }),
  ).toBeVisible();
});
