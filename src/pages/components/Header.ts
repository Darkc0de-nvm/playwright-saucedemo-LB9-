import { expect, type Locator, type Page } from "@playwright/test";

export class Header {
    readonly page: Page;
    readonly root: Locator;

    constructor(page: Page) {
        this.page = page;
        // SauceDemo top bar container
        this.root = page.locator("#header_container");
    }

    get title(): Locator {
        return this.root.locator(".app_logo");
    }

    async expectVisible(): Promise<void> {
        await expect(this.root).toBeVisible();
    }

    async expectTitle(expected: string): Promise<void> {
        await expect(this.title).toHaveText(expected);
    }
}