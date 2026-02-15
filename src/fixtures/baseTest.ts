import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

export type SauceUser = {
    username: string;
    password: string;
};

type Fixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    user: SauceUser;
};

export const test = base.extend<Fixtures>({
    // Default user for demos (SauceDemo standard user)
    user: async ({}, use) => {
        await use({
            username: process.env.SAUCE_USERNAME ?? "standard_user",
            password: process.env.SAUCE_PASSWORD ?? "secret_sauce",
        });
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
});

export { expect };