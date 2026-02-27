import { expect, type Locator, type Page } from "@playwright/test";

export class Header {
    readonly page: Page;
    readonly root: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        // SauceDemo top bar container
        this.root = page.locator("#header_container");

        this.cartLink = this.root.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = this.root.locator('[data-test="shopping-cart-badge"]');
    }

    get title(): Locator {
        return this.root.locator(".app_logo");
    }
    // --- Доповнити Header component ---
    /** Клік по іконці кошика для переходу на /cart.html */
    async openCart(): Promise<void> {
        await this.cartLink.click();
    }
    /** Повертає числове значення з бейджа кошика. (якщо немає то 0*/
    async getCartBadgeCount(): Promise<number> {
        if (await this.cartBadge.isVisible()) {
            const text = await this.cartBadge.innerText();
            return parseInt(text);
        }
        return 0;
    }

    async expectVisible(): Promise<void> {
        await expect(this.root).toBeVisible();
    }

    async expectTitle(expected: string): Promise<void> {
        await expect(this.title).toHaveText(expected);
    }
}