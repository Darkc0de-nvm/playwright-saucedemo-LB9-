import { test } from "../../src/fixtures/baseTest";
import {expect} from "@playwright/test";
// ⭐ Використати test.describe() і теги (наприклад @cart)
test.describe("SauceDemo Cart Tests @cart", () => {

    // ⭐ Додати beforeEach (без логіну) для переходу на /inventory.html
    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.page.goto("/inventory.html");
    });


    test("1) Add one item -> badge = 1 -> item in cart ✅", async ({ inventoryPage, cartPage }) => {
        const product = "Sauce Labs Backpack";

        // додаємо товар та перевіряємо лічильник
        await inventoryPage.addItem(product);
        await inventoryPage.expectCartBadge(1);

        // переходимо до кошика та перевіряємо перехід
        await inventoryPage.openCart();
        await cartPage.expectOpened();

        // підтверджуємо наявність товару
        await cartPage.expectItemVisible(product);
    });

    test("2) Add two items → badge = 2 → both in cart ✅✅", async ({ inventoryPage, cartPage }) => {
        const item1 = "Sauce Labs Backpack";
        const item2 = "Sauce Labs Bike Light";
        // додаємо 2 товари
        await inventoryPage.addItem(item1);
        await inventoryPage.addItem(item2);
        // перевіряємо зміну лічильника
        await inventoryPage.expectCartBadge(2);
        // відкриваємо кошик та перевіряємо наявність товарів
        await inventoryPage.openCart();
        await cartPage.expectItemVisible(item1);
        await cartPage.expectItemVisible(item2);
    });

    test("3) Remove item from Inventory → badge updates 🧹", async ({ inventoryPage, cartPage }) => {
        const item1 = "Sauce Labs Backpack";
        const item2 = "Sauce Labs Bike Light";

        // додаємо 2 товари
        await inventoryPage.addItem(item1);
        await inventoryPage.addItem(item2);

        // видаляємо перший
        await inventoryPage.removeItem(item1);

        // перевіряємо оновлення лічильника та переходимо до кошика
        await inventoryPage.expectCartBadge(1);
        await inventoryPage.openCart();

        // підтвердуємо нявність 2-го та відсутність 1-го
        await cartPage.expectItemVisible(item2);
        await cartPage.expectItemNotVisible(item1);
    });

    test("4) Remove item from Cart → badge updates 🧺", async ({ inventoryPage, cartPage }) => {
        const product = "Sauce Labs Backpack";

        // додаємо товар і переходимо до кошика
        await inventoryPage.addItem(product);
        await inventoryPage.openCart();

        // видаляємо цей товар із кошика
        await cartPage.removeItem(product);

        // перевіряємо повне очищення кошика
        await inventoryPage.expectCartBadge(0);
        await cartPage.expectCartEmpty();
    });

    test("5) Continue Shopping returns to Inventory 🏃‍♂️↩️", async ({ inventoryPage, cartPage }) => {
        // додаємо товар за назвою і переходимо до кошика
        await inventoryPage.addItem("Sauce Labs Backpack");
        await inventoryPage.openCart();

        // натискаємо кнопку продовження покупок
        await cartPage.continueShopping();

        // перевіряємо, що повернулися на головну і кошик зберіг товар
        await inventoryPage.expectOpened();
        await inventoryPage.expectCartBadge(1);
    });

    test("⭐ Button changes from 'Add' to 'Remove'", async ({ inventoryPage }) => {
        const productName = "Sauce Labs Backpack";

        // отримуємо локатор конкретного товару
        const item = inventoryPage.itemByName(productName);
        const button = item.locator('button');

        // перевіряємо початковий стан
        await expect(button).toHaveText("Add to cart");

        // додаємо товар
        await inventoryPage.addItem(productName);

        // перевіряємо, що текст кнопки змінився на Remove
        await expect(button).toHaveText("Remove");
    });
});