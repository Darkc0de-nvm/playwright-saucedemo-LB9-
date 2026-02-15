import { test as setup, expect } from "@playwright/test";

const STORAGE_STATE_PATH = "storage/auth.json";

setup("auth: save storageState", async ({ page }) => {
    const username = process.env.SAUCE_USERNAME ?? "standard_user";
    const password = process.env.SAUCE_PASSWORD ?? "secret_sauce";

    await page.goto("/");
    await page.locator('[data-test="username"]').fill(username);
    await page.locator('[data-test="password"]').fill(password);
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await page.context().storageState({ path: STORAGE_STATE_PATH });
});