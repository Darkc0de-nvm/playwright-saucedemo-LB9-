import { Locator, Page, expect } from '@playwright/test';

export class CartPage {
    // Локатори
    private readonly cartList: Locator;
    private readonly checkoutButton: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly cartItem: Locator;

    constructor(private readonly page: Page) {
        this.cartList = page.locator('.cart_list');
        this.cartItem = page.locator('.cart_item');
        // Використовуємо data-test атрибути для стабільності
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    // Методи

    /** Відкрити сторінку кошика через URL */
    async open() {
        await this.page.goto('/cart.html');
    }

    /** Перевірка, що користувач дійсно на сторінці кошика */
    async expectOpened() {
        await expect(this.page).toHaveURL(/.*cart.html/);
        const title = this.page.locator('.title');
        await expect(title).toHaveText('Your Cart');
    }

    /** Перевірити, що кошик порожній (товарів 0) */
    async expectCartEmpty() {
        await expect(this.cartItem).toHaveCount(0);
    }

    /** Перевірити, що конкретний товар не відображається в кошику */
    async expectItemNotVisible(name: string) {
        const item = this.cartItem.filter({ hasText: name });
        await expect(item).not.toBeVisible();
    }

    /** Перевірка видимості конкретного товару за назвою */
    async expectItemVisible(name: string) {
        const item = this.cartItem.filter({ hasText: name });
        await expect(item).toBeVisible();
    }

    /** Видалення товару за назвою */
    async removeItem(name: string) {
        const itemContainer = this.cartItem.filter({ hasText: name });
        await itemContainer.locator('button:has-text("Remove")').click();
    }

    /** Повернутися до покупок */
    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    /** Перейти до оформлення замовлення */
    async checkout() {
        await this.checkoutButton.click();
    }
}