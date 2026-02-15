import { expect, type Locator, type Page } from "@playwright/test";
import { Header } from "./components/Header";

export class InventoryPage {
    readonly page: Page;
    readonly header: Header;

    readonly container: Locator;
    readonly title: Locator;

    // Inventory UI
    readonly sortSelect: Locator;
    readonly items: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);

        this.container = page.locator('[data-test="inventory-container"]');
        this.title = page.locator('[data-test="title"]');

        this.sortSelect = page.locator('[data-test="product-sort-container"]');
        this.items = page.locator('[data-test="inventory-item"]');

        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    itemByName(name: string): Locator {
        return this.items.filter({ has: this.page.locator('[data-test="inventory-item-name"]', { hasText: name }) }).first();
    }

    async expectOpened(): Promise<void> {
        await expect(this.page).toHaveURL(/.*\/inventory\.html$/);
        await expect(this.container).toBeVisible();
        await expect(this.title).toHaveText("Products");
        await this.header.expectVisible();
    }

    async expectStructure(): Promise<void> {
        await this.expectOpened();

        // Header/cart
        await expect(this.cartLink).toBeVisible();

        // Sort dropdown
        await expect(this.sortSelect).toBeVisible();

        // Items list basics (SauceDemo має 6 товарів стандартно)
        await expect(this.items).toHaveCount(6);

        // Кожен item має базову структуру
        const count = await this.items.count();
        for (let i = 0; i < count; i++) {
            const item = this.items.nth(i);

            await expect(item.locator('[data-test="inventory-item-name"]')).toBeVisible();
            await expect(item.locator('[data-test="inventory-item-desc"]')).toBeVisible();
            await expect(item.locator('[data-test="inventory-item-price"]')).toBeVisible();

            // Кнопка може бути Add або Remove — перевіримо що якась з них є
            const addBtn = item.locator('button:has-text("Add to cart")');
            const removeBtn = item.locator('button:has-text("Remove")');
            await expect(addBtn.or(removeBtn)).toBeVisible();

            // Зображення
            await expect(item.locator("img")).toBeVisible();
        }
    }
}