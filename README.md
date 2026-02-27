# 🛒 Лабораторна робота№9: SauceDemo

Автоматизація тестування [SauceDemo](https://www.saucedemo.com/) за допомогою **Playwright** та патерну **Page Object Model (POM)**.

---

## 🆕 Нові тести (Shopping Cart)
<img width="996" height="603" alt="зображення" src="https://github.com/user-attachments/assets/a21669e8-9580-4737-b133-ab8169f68f61" />

---
## 📊 Загальний звіт
<img width="1008" height="934" alt="зображення" src="https://github.com/user-attachments/assets/96dae604-33a0-4e67-ac28-51b9631fe3b1" />
<img width="983" height="563" alt="зображення" src="https://github.com/user-attachments/assets/6b89adb4-73aa-4469-bc6c-716a703ad5a9" />

---
## ⭐ Використані завдання із "Зірочкою"
```
// ⭐ Використати test.describe() і теги (наприклад @cart)
test.describe("SauceDemo Cart Tests @cart", () => {
```
```
    // ⭐ Додати beforeEach (без логіну) для переходу на /inventory.html
    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.page.goto("/inventory.html");
    });
```
```
    // ⭐ Перевірити, що після додавання товару кнопка змінюється з “Add to cart” на “Remove”
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
```
---
## </> Команди для тестування
1. 🛒Протестувати кошик:
```
npx playwright test test/cart/cart.spec.ts
```
2. 📝 Загальне тестування
```
npx playwright test
```
3. 📊 HTML-звіт тестування
```
npx playwright show-report
```
---

## 🧐 Використати проєкт

**🚀 Клонувати репозиторій:**
```
   git clone https://github.com/Darkc0de-nvm/playwright-saucedemo-LB9-.git 
   cd playwright-saucedemo-LB9-
```
