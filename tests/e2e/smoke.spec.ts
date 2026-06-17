import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', heading: /web applications/i },
  { path: '/projects', heading: /projects/i },
  { path: '/blog', heading: /writing/i },
  { path: '/about', heading: /more about me/i },
  { path: '/contact', heading: /schedule a call/i },
];

for (const { path, heading } of pages) {
  test(`${path} loads with its heading`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.ok()).toBeTruthy();
    await expect(
      page.getByRole('heading', { name: heading }).first(),
    ).toBeVisible();
  });
}

test('navigates from home to projects', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Projects' }).first().click();
  await expect(page).toHaveURL(/\/projects/);
});

test('contact form shows validation errors when empty', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: /submit message/i }).click();
  await expect(page.getByText(/fix the highlighted fields/i)).toBeVisible();
});
